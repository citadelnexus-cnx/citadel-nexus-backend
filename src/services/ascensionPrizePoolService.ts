//backend/src/services/ascensionPrizePoolService.ts
import { prisma } from "../lib/prisma";
import { createAscensionAdminAction } from "./ascensionAuditService";
import { getAscensionProfileByUserId } from "./ascensionProfileService";

export type AscensionPrizePoolRecord = {
  id: string;
  poolName: string;
  totalXpAvailable: number;
  totalXpAdded: number;
  totalXpAwarded: number;
  totalXpRemoved: number;
  notes: string | null;
  seasonId: string | null;
  updatedAt: string;
  createdAt: string;
};

function toPrizePoolRecord(record: {
  id: string;
  poolName: string;
  totalXpAvailable: number;
  totalXpAdded: number;
  totalXpAwarded: number;
  totalXpRemoved: number;
  notes: string | null;
  seasonId: string | null;
  updatedAt: Date;
  createdAt: Date;
}): AscensionPrizePoolRecord {
  return {
    id: record.id,
    poolName: record.poolName,
    totalXpAvailable: record.totalXpAvailable,
    totalXpAdded: record.totalXpAdded,
    totalXpAwarded: record.totalXpAwarded,
    totalXpRemoved: record.totalXpRemoved,
    notes: record.notes,
    seasonId: record.seasonId,
    updatedAt: record.updatedAt.toISOString(),
    createdAt: record.createdAt.toISOString(),
  };
}

export async function getOrCreateAscensionPrizePool(): Promise<AscensionPrizePoolRecord> {
  const saved = await prisma.ascensionPrizePool.upsert({
    where: { poolName: "main" },
    update: {},
    create: { poolName: "main" },
  });

  return toPrizePoolRecord(saved);
}

export async function addXpToPrizePool(input: {
  adminUserId: string;
  adminUsername?: string | null;
  amount: number;
  sourceNote: string;
  reason: string;
}): Promise<AscensionPrizePoolRecord> {
  if (input.amount <= 0) {
    throw new Error("Amount must be positive.");
  }

  const current = await getOrCreateAscensionPrizePool();

  const updated = await prisma.ascensionPrizePool.update({
    where: { poolName: "main" },
    data: {
      totalXpAvailable: { increment: input.amount },
      totalXpAdded: { increment: input.amount },
      notes: input.sourceNote,
    },
  });

  await createAscensionAdminAction({
    adminUserId: input.adminUserId,
    adminUsername: input.adminUsername ?? null,
    actionType: "prize_pool_add",
    amount: input.amount,
    valueBefore: current.totalXpAvailable,
    valueAfter: updated.totalXpAvailable,
    reason: input.reason,
    metadataJson: { sourceNote: input.sourceNote },
  });

  return toPrizePoolRecord(updated);
}

export async function removeXpFromPrizePool(input: {
  adminUserId: string;
  adminUsername?: string | null;
  amount: number;
  reason: string;
}): Promise<AscensionPrizePoolRecord> {
  if (input.amount <= 0) {
    throw new Error("Amount must be positive.");
  }

  const current = await getOrCreateAscensionPrizePool();
  const nextAvailable = Math.max(0, current.totalXpAvailable - input.amount);
  const removedAmount = current.totalXpAvailable - nextAvailable;

  const updated = await prisma.ascensionPrizePool.update({
    where: { poolName: "main" },
    data: {
      totalXpAvailable: nextAvailable,
      totalXpRemoved: { increment: removedAmount },
    },
  });

  await createAscensionAdminAction({
    adminUserId: input.adminUserId,
    adminUsername: input.adminUsername ?? null,
    actionType: "prize_pool_remove",
    amount: removedAmount,
    valueBefore: current.totalXpAvailable,
    valueAfter: updated.totalXpAvailable,
    reason: input.reason,
  });

  return toPrizePoolRecord(updated);
}

export async function awardXpFromPrizePoolToUser(input: {
  adminUserId: string;
  adminUsername?: string | null;
  targetUserId: string;
  targetUsername?: string | null;
  amount: number;
  reason: string;
}): Promise<{
  pool: AscensionPrizePoolRecord;
  playerXpBefore: number;
  playerXpAfter: number;
  playerRankAfter: string;
}> {
  if (input.amount <= 0) {
    throw new Error("Amount must be positive.");
  }

  const profile = await getAscensionProfileByUserId(input.targetUserId);
  if (!profile) {
    throw new Error("Ascension profile not found.");
  }

  const pool = await getOrCreateAscensionPrizePool();
  if (pool.totalXpAvailable < input.amount) {
    throw new Error(`Insufficient pool balance. Available: ${pool.totalXpAvailable} XP.`);
  }

  const playerXpBefore = profile.xp;
  const playerXpAfter = profile.xp + input.amount;
  const playerRankAfter = calcRank(playerXpAfter);

  const result = await prisma.$transaction(async (tx) => {
    const updatedPool = await tx.ascensionPrizePool.update({
      where: { poolName: "main" },
      data: {
        totalXpAvailable: { decrement: input.amount },
        totalXpAwarded: { increment: input.amount },
      },
    });

    await tx.ascensionProfile.update({
      where: { userId: input.targetUserId },
      data: {
        xp: playerXpAfter,
        rank: playerRankAfter,
      },
    });

    await tx.ascensionAdminAction.create({
      data: {
        adminUserId: input.adminUserId,
        adminUsername: input.adminUsername ?? null,
        targetUserId: input.targetUserId,
        targetUsername: input.targetUsername ?? profile.username,
        actionType: "prize_pool_award",
        amount: input.amount,
        valueBefore: playerXpBefore,
        valueAfter: playerXpAfter,
        reason: input.reason,
        metadataJson: {
          poolBalanceAfter: updatedPool.totalXpAvailable,
        },
      },
    });

    return updatedPool;
  });

  return {
    pool: toPrizePoolRecord(result),
    playerXpBefore,
    playerXpAfter,
    playerRankAfter,
  };
}

function calcRank(xp: number): string {
  if (xp >= 40000) return "sentinel";
  if (xp >= 15000) return "warden";
  if (xp >= 5000) return "architect";
  if (xp >= 1500) return "builder";
  if (xp >= 500) return "operator";
  return "initiate";
}