//backend/src/services/ascensionSummaryService.ts
import { prisma } from "../lib/prisma";

type GuardianKey = "nova" | "tarin" | "raxa";
type RankKey =
  | "initiate"
  | "operator"
  | "builder"
  | "architect"
  | "warden"
  | "sentinel";

const GUARDIAN_LABELS: Record<GuardianKey, string> = {
  nova: "Nova",
  tarin: "Tarin",
  raxa: "Raxa",
};

const STAGE_LABELS: Record<number, string> = {
  1: "Dormant Node",
  2: "Stabilized Core",
  3: "Emerging Citadel",
  4: "Developed Citadel",
  5: "Ascended Citadel",
};

const RANK_LABELS: Record<RankKey, string> = {
  initiate: "Initiate",
  operator: "Operator",
  builder: "Builder",
  architect: "Architect",
  warden: "Warden",
  sentinel: "Sentinel",
};

type BuildingsJson = {
  knowledge_core?: number;
  trade_hub?: number;
  power_reactor?: number;
  security_layer?: number;
};

function normalizeBuildings(input: unknown) {
  const value =
    input && typeof input === "object" && !Array.isArray(input)
      ? (input as BuildingsJson)
      : {};

  return {
    knowledgeCoreLevel: Number(value.knowledge_core ?? 1),
    tradeHubLevel: Number(value.trade_hub ?? 1),
    powerReactorLevel: Number(value.power_reactor ?? 1),
    securityLayerLevel: Number(value.security_layer ?? 1),
  };
}

function getGuardianLabel(guardian: string | null | undefined) {
  if (!guardian) return "Unknown";
  return GUARDIAN_LABELS[guardian as GuardianKey] ?? guardian;
}

function getStageLabel(stage: number | null | undefined) {
  if (!stage) return "Dormant Node";
  return STAGE_LABELS[stage] ?? `Stage ${stage}`;
}

function getRankLabel(rank: string | null | undefined) {
  if (!rank) return "Initiate";
  return RANK_LABELS[rank as RankKey] ?? rank;
}

function buildPublicHeadline(input: {
  guardian: string | null;
  stage: number;
  missionsCompleted: number;
}) {
  const guardianLabel = getGuardianLabel(input.guardian);
  const stageLabel = getStageLabel(input.stage);

  if (input.missionsCompleted <= 0) {
    return `${guardianLabel}-bound operator beginning Citadel reconstruction.`;
  }

  return `${guardianLabel}-bound operator advancing through ${stageLabel.toLowerCase()} progression.`;
}

export async function getAscensionMemberSummaryByDiscordId(discordId: string) {
  const normalized = discordId.trim();
  if (!normalized) return null;

  const user = await prisma.user.findUnique({
    where: { discordId: normalized },
    include: {
      ascensionProfile: true,
    },
  });

  if (!user?.ascensionProfile) return null;

  const profile = user.ascensionProfile;
  const buildings = normalizeBuildings(profile.buildingsJson);

  return {
    memberId: user.id,
    discordId: user.discordId,
    displayName: profile.username || user.username,
    guardian: {
      value: profile.guardian,
      label: getGuardianLabel(profile.guardian),
    },
    stage: {
      value: profile.stage,
      label: getStageLabel(profile.stage),
    },
    rank: {
      value: profile.rank,
      label: getRankLabel(profile.rank),
    },
    nodeScore: profile.nodeScore,
    xp: profile.xp,
    missionsCompleted: profile.missionsCompleted,
    sessionCount: profile.sessionCount,
    citadelSummary: buildings,
    status: {
      isLocked: profile.isLocked,
    },
    meta: {
      ascensionLinked: true,
      updatedAt: profile.updatedAt,
    },
  };
}

export async function getAscensionMemberSummaryByUserId(userId: string) {
  const normalized = userId.trim();
  if (!normalized) return null;

  const user = await prisma.user.findUnique({
    where: { id: normalized },
    include: {
      ascensionProfile: true,
    },
  });

  if (!user?.ascensionProfile) return null;

  const profile = user.ascensionProfile;
  const buildings = normalizeBuildings(profile.buildingsJson);

  return {
    memberId: user.id,
    discordId: user.discordId,
    displayName: profile.username || user.username,
    guardian: {
      value: profile.guardian,
      label: getGuardianLabel(profile.guardian),
    },
    stage: {
      value: profile.stage,
      label: getStageLabel(profile.stage),
    },
    rank: {
      value: profile.rank,
      label: getRankLabel(profile.rank),
    },
    nodeScore: profile.nodeScore,
    xp: profile.xp,
    missionsCompleted: profile.missionsCompleted,
    sessionCount: profile.sessionCount,
    citadelSummary: buildings,
    status: {
      isLocked: profile.isLocked,
    },
    meta: {
      ascensionLinked: true,
      updatedAt: profile.updatedAt,
    },
  };
}

export async function getAscensionPublicCardByDiscordId(discordId: string) {
  const summary = await getAscensionMemberSummaryByDiscordId(discordId);
  if (!summary) return null;

  return {
    displayName: summary.displayName,
    guardian: summary.guardian.label,
    stageLabel: summary.stage.label,
    rankLabel: summary.rank.label,
    nodeScore: summary.nodeScore,
    missionsCompleted: summary.missionsCompleted,
    headline: buildPublicHeadline({
      guardian: summary.guardian.value,
      stage: summary.stage.value,
      missionsCompleted: summary.missionsCompleted,
    }),
  };
}