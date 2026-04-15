import { getUser } from "./userService";
import { getOrCreateAccessState } from "./accessStateService";

export type MemberIdentityBlock = {
  memberId: string;
  displayName: string;
  username: string;
  discordTag: string | null;
  avatarUrl: string | null;
  memberSince: string | null;
  accountStatus: "active" | "restricted" | "pending" | "unknown";
  isVerified: boolean;
  payoutEligible: boolean;
  wallet: string | null;
};

export type MemberAccessBlock = {
  accessStatus: "member" | "elevated" | "restricted" | "pending" | "unknown";
  tier: string;
  active: boolean;
  isCnxHolder: boolean;
  cnxHolderTier: number | null;
  xpBoost: number;
  cooldownReduction: number;
  tempAccessType: string | null;
  tempAccessExpiresAt: string | null;
  lockState: "unlocked" | "locked" | "unknown";
  lockReason: string | null;
  lastEvaluatedAt: string | null;
  lastRoleSyncAt: string | null;
};

export type MemberProgressionBlock = {
  level: number | null;
  xp: number | null;
  xpToNextLevel: number | null;
  nextLevel: number | null;
  cnxBalance: number | null;
  reservedCnx: number | null;
  availableCnx: number | null;
  progressionStatusText: string | null;
};

export type MemberMetaBlock = {
  loadedAt: string;
  dataCompleteness: "full" | "partial" | "minimal";
  environment: "local" | "staging" | "production" | "unknown";
};

export type MemberStateResponse = {
  identity: MemberIdentityBlock;
  access: MemberAccessBlock;
  progression: MemberProgressionBlock;
  meta: MemberMetaBlock;
};

function resolveAccountStatus(input: {
  isVerified: boolean;
  payoutEligible: boolean;
}): MemberIdentityBlock["accountStatus"] {
  if (input.isVerified) return "active";
  if (!input.isVerified && input.payoutEligible) return "pending";
  return "unknown";
}

function resolveAccessStatus(input: {
  active: boolean;
  tier: string;
  tempAccessType: string | null;
}): MemberAccessBlock["accessStatus"] {
  if (!input.active) return "pending";
  if (input.tempAccessType) return "elevated";
  if (input.tier && input.tier !== "none") return "member";
  return "member";
}

function resolveLockState(_input: {
  active: boolean;
}): MemberAccessBlock["lockState"] {
  return "unlocked";
}

function getXpThresholdForLevel(level: number): number {
  return Math.max(level, 1) * 100;
}

function buildProgressionStatusText(input: {
  level: number;
  xp: number;
  xpToNextLevel: number;
}): string {
  if (input.xpToNextLevel <= 0) {
    return `Level ${input.level} threshold reached.`;
  }

  return `${input.xpToNextLevel} XP until Level ${input.level + 1}.`;
}

export async function getMemberState(
  userId: string
): Promise<MemberStateResponse | null> {
  const user = await getUser(userId);
  if (!user) return null;

  const access = await getOrCreateAccessState(user.id);
  if (!access) return null;

  const nextThreshold = getXpThresholdForLevel(user.level);
  const xpToNextLevel = Math.max(nextThreshold - user.xp, 0);
  const availableCnx = user.cnxBalance - user.reservedCnx;

  const response: MemberStateResponse = {
    identity: {
      memberId: user.id,
      displayName: user.username,
      username: user.username,
      discordTag: user.discordTag ?? null,
      avatarUrl: null,
      memberSince: user.joinedAt ?? null,
      accountStatus: resolveAccountStatus({
        isVerified: user.isVerified,
        payoutEligible: user.payoutEligible,
      }),
      isVerified: user.isVerified,
      payoutEligible: user.payoutEligible,
      wallet: user.wallet ?? null,
    },
    access: {
      accessStatus: resolveAccessStatus({
        active: access.active,
        tier: access.tier,
        tempAccessType: access.tempAccessType,
      }),
      tier: access.tier,
      active: access.active,
      isCnxHolder: access.isCnxHolder,
      cnxHolderTier: access.holderTierInternal || null,
      xpBoost: access.xpBoost,
      cooldownReduction: access.cooldownReduction,
      tempAccessType: access.tempAccessType,
      tempAccessExpiresAt: access.tempAccessExpiresAt,
      lockState: resolveLockState({
        active: access.active,
      }),
      lockReason: null,
      lastEvaluatedAt: access.lastEvaluatedAt,
      lastRoleSyncAt: access.lastRoleSyncAt ?? null,
    },
    progression: {
      level: user.level,
      xp: user.xp,
      xpToNextLevel,
      nextLevel: user.level + 1,
      cnxBalance: user.cnxBalance,
      reservedCnx: user.reservedCnx,
      availableCnx,
      progressionStatusText: buildProgressionStatusText({
        level: user.level,
        xp: user.xp,
        xpToNextLevel,
      }),
    },
    meta: {
      loadedAt: new Date().toISOString(),
      dataCompleteness: "full",
      environment:
        process.env.NODE_ENV === "production"
          ? "production"
          : process.env.NODE_ENV === "test"
          ? "staging"
          : "local",
    },
  };

  return response;
}