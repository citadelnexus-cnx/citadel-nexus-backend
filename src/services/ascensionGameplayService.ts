// backend/src/services/ascensionGameplayService.ts
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { getAscensionProfileByUserId, upsertAscensionProfile } from "./ascensionProfileService";
import { ensureUserForDiscord } from "./userService";

const STARTER_BUILDINGS = {
  knowledge_core: 1,
  trade_hub: 1,
  power_reactor: 1,
  security_layer: 1,
};

const RANK_LADDER = [
  { rank: "initiate", xpRequired: 0 },
  { rank: "operator", xpRequired: 500 },
  { rank: "builder", xpRequired: 1500 },
  { rank: "architect", xpRequired: 5000 },
  { rank: "warden", xpRequired: 15000 },
  { rank: "sentinel", xpRequired: 40000 },
];

const EVOLUTION_STAGES = [
  { stage: 1, name: "Dormant Node", nodeScoreRequired: 0 },
  { stage: 2, name: "Stabilized Core", nodeScoreRequired: 50 },
  { stage: 3, name: "Emerging Citadel", nodeScoreRequired: 200 },
  { stage: 4, name: "Developed Citadel", nodeScoreRequired: 750 },
  { stage: 5, name: "Ascended Citadel", nodeScoreRequired: 2500 },
];

function toBuildingsJsonInput(value: unknown): Prisma.InputJsonValue {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Prisma.InputJsonValue;
  }

  return STARTER_BUILDINGS as Prisma.InputJsonValue;
}

export function calcRank(xp: number): string {
  let rank = "initiate";

  for (const tier of RANK_LADDER) {
    if (xp >= tier.xpRequired) {
      rank = tier.rank;
    }
  }

  return rank;
}

export function calcStage(nodeScore: number): number {
  let stage = 1;

  for (const tier of EVOLUTION_STAGES) {
    if (nodeScore >= tier.nodeScoreRequired) {
      stage = tier.stage;
    }
  }

  return stage;
}

export function getStageName(stage: number): string {
  return (
    EVOLUTION_STAGES.find((item) => item.stage === stage)?.name ??
    "Dormant Node"
  );
}

export function getNextStage(stage: number) {
  return EVOLUTION_STAGES.find((item) => item.stage === stage + 1) ?? null;
}

export function xpToNextRank(xp: number): number | null {
  for (const tier of RANK_LADDER) {
    if (xp < tier.xpRequired) {
      return tier.xpRequired;
    }
  }

  return null;
}

export function checkClaimCooldown(profile: { lastClaimAt: string | Date | null }) {
  const COOLDOWN_MS = 8 * 60 * 60 * 1000;

  if (!profile.lastClaimAt) {
    return { onCooldown: false, remainingMs: 0 };
  }

  const lastClaimAt =
    profile.lastClaimAt instanceof Date
      ? profile.lastClaimAt
      : new Date(profile.lastClaimAt);

  const remainingMs = COOLDOWN_MS - (Date.now() - lastClaimAt.getTime());

  return {
    onCooldown: remainingMs > 0,
    remainingMs: Math.max(0, remainingMs),
  };
}

export function formatCooldown(ms: number): string {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function checkLocked(profile: {
  isLocked: boolean;
  lockReason: string | null;
}) {
  if (profile.isLocked) {
    return {
      locked: true,
      reason: profile.lockReason || "Account locked by admin.",
    };
  }

  return { locked: false, reason: null };
}

export async function getPlayerProfile(userId: string) {
  return prisma.ascensionProfile.findUnique({
    where: { userId },
  });
}

export async function ensurePlayerProfileForDiscord(input: {
  username: string;
  discordId: string;
  discordTag: string;
  guardian?: string;
}) {
  const user = await ensureUserForDiscord({
    username: input.username,
    discordId: input.discordId,
    discordTag: input.discordTag,
  });

  const saved = await upsertAscensionProfile({
    userId: user.id,
    discordId: input.discordId,
    username: input.username,
    guardian: input.guardian,
  });

  return {
    user,
    profile: saved,
  };
}

export async function createPlayerProfile(input: {
  username: string;
  discordId: string;
  discordTag: string;
  guardian: string;
}) {
  return ensurePlayerProfileForDiscord(input);
}

export async function applyDelta(
  userId: string,
  delta: {
    xp?: number;
    credits?: number;
    intel?: number;
    nodeScore?: number;
    power?: number;
    missionsCompleted?: number;
    sessionCount?: number;
    lastClaimAt?: Date | null;
    buildingsJson?: unknown;
  }
) {
  const profile = await prisma.ascensionProfile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  const newXp = Math.max(0, profile.xp + (delta.xp ?? 0));
  const newNodeScore = Math.max(0, profile.nodeScore + (delta.nodeScore ?? 0));
  const newCredits = Math.max(0, profile.credits + (delta.credits ?? 0));
  const newIntel = Math.max(0, profile.intel + (delta.intel ?? 0));
  const newMissionsCompleted = Math.max(
    0,
    profile.missionsCompleted + (delta.missionsCompleted ?? 0)
  );
  const newSessionCount = profile.sessionCount + (delta.sessionCount ?? 0);
  const newPower = Math.min(
    profile.maxPower,
    Math.max(0, profile.power + (delta.power ?? 0))
  );

  const updated = await prisma.ascensionProfile.update({
    where: { userId },
    data: {
      xp: newXp,
      nodeScore: newNodeScore,
      credits: newCredits,
      intel: newIntel,
      missionsCompleted: newMissionsCompleted,
      sessionCount: newSessionCount,
      power: newPower,
      rank: calcRank(newXp),
      stage: calcStage(newNodeScore),
      ...(delta.lastClaimAt !== undefined
        ? { lastClaimAt: delta.lastClaimAt }
        : {}),
      ...(delta.buildingsJson !== undefined
        ? { buildingsJson: toBuildingsJsonInput(delta.buildingsJson) }
        : {}),
    },
  });

  return updated;
}

export async function getResolvedAscensionActor(input: {
  discordId: string;
  username: string;
  discordTag: string;
}) {
  const user = await ensureUserForDiscord({
    username: input.username,
    discordId: input.discordId,
    discordTag: input.discordTag,
  });

  const profile = await getAscensionProfileByUserId(user.id);

  return {
    user,
    profile,
  };
}