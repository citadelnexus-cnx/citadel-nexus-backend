//backend/src/services/ascensionProfileService.ts
import { prisma } from "../lib/prisma";

export type AscensionProfileRecord = {
  id: string;
  userId: string;
  discordId: string | null;
  username: string;
  guardian: string;
  stage: number;
  rank: string;
  xp: number;
  level: number;
  nodeScore: number;
  sessionCount: number;
  missionsCompleted: number;
  isLocked: boolean;
  lockReason: string | null;
  power: number;
  maxPower: number;
  credits: number;
  intel: number;
  lastClaimAt: string | null;
  buildingsJson: unknown;
  createdAt: string;
  updatedAt: string;
};

function toAscensionProfileRecord(record: {
  id: string;
  userId: string;
  discordId: string | null;
  username: string;
  guardian: string;
  stage: number;
  rank: string;
  xp: number;
  level: number;
  nodeScore: number;
  sessionCount: number;
  missionsCompleted: number;
  isLocked: boolean;
  lockReason: string | null;
  power: number;
  maxPower: number;
  credits: number;
  intel: number;
  lastClaimAt: Date | null;
  buildingsJson: unknown;
  createdAt: Date;
  updatedAt: Date;
}): AscensionProfileRecord {
  return {
    id: record.id,
    userId: record.userId,
    discordId: record.discordId,
    username: record.username,
    guardian: record.guardian,
    stage: record.stage,
    rank: record.rank,
    xp: record.xp,
    level: record.level,
    nodeScore: record.nodeScore,
    sessionCount: record.sessionCount,
    missionsCompleted: record.missionsCompleted,
    isLocked: record.isLocked,
    lockReason: record.lockReason,
    power: record.power,
    maxPower: record.maxPower,
    credits: record.credits,
    intel: record.intel,
    lastClaimAt: record.lastClaimAt ? record.lastClaimAt.toISOString() : null,
    buildingsJson: record.buildingsJson,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}

export async function getAscensionProfileByUserId(
  userId: string
): Promise<AscensionProfileRecord | null> {
  const profile = await prisma.ascensionProfile.findUnique({
    where: { userId },
  });

  if (!profile) return null;
  return toAscensionProfileRecord(profile);
}

export async function getAscensionProfileByDiscordId(
  discordId: string
): Promise<AscensionProfileRecord | null> {
  const profile = await prisma.ascensionProfile.findUnique({
    where: { discordId },
  });

  if (!profile) return null;
  return toAscensionProfileRecord(profile);
}

export async function createAscensionProfile(input: {
  userId: string;
  discordId?: string | null;
  username: string;
  guardian?: string;
}): Promise<AscensionProfileRecord> {
  const created = await prisma.ascensionProfile.create({
    data: {
      userId: input.userId,
      discordId: input.discordId ?? null,
      username: input.username,
      guardian: input.guardian ?? "nova",
    },
  });

  return toAscensionProfileRecord(created);
}

export async function upsertAscensionProfile(input: {
  userId: string;
  discordId?: string | null;
  username: string;
  guardian?: string;
}): Promise<AscensionProfileRecord> {
  const saved = await prisma.ascensionProfile.upsert({
    where: { userId: input.userId },
    update: {
      discordId: input.discordId ?? null,
      username: input.username,
      ...(input.guardian ? { guardian: input.guardian } : {}),
    },
    create: {
      userId: input.userId,
      discordId: input.discordId ?? null,
      username: input.username,
      guardian: input.guardian ?? "nova",
    },
  });

  return toAscensionProfileRecord(saved);
}