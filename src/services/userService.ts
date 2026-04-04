//backend/src/services/userService.ts
import { prisma } from "../lib/prisma";
import { updateAccessState } from "./accessStateService";

export type RewardLogEntry = {
  type: "LEVEL_UP_REWARD";
  levelReached: number;
  cnxAwarded: number;
  timestamp: string;
};

export type User = {
  id: string;
  username: string;

  discordId?: string;
  discordTag?: string;

  wallet?: string;

  xp: number;
  level: number;
  cnxBalance: number;
  reservedCnx: number;

  isVerified: boolean;
  payoutEligible: boolean;

  joinedAt: string;
  lastActiveAt: string;

  rewardLog: RewardLogEntry[];
};

type PrismaUserRecord = {
  id: string;
  username: string;
  discordId: string | null;
  discordTag: string | null;
  wallet: string | null;
  xp: number;
  level: number;
  cnxBalance: number;
  reservedCnx: number;
  isVerified: boolean;
  payoutEligible: boolean;
  createdAt: Date;
  lastActiveAt: Date;
};

function toUser(record: PrismaUserRecord): User {
  return {
    id: record.id,
    username: record.username,
    discordId: record.discordId ?? undefined,
    discordTag: record.discordTag ?? undefined,
    wallet: record.wallet ?? undefined,
    xp: record.xp,
    level: record.level,
    cnxBalance: record.cnxBalance,
    reservedCnx: record.reservedCnx,
    isVerified: record.isVerified,
    payoutEligible: record.payoutEligible,
    joinedAt: record.createdAt.toISOString(),
    lastActiveAt: record.lastActiveAt.toISOString(),
    rewardLog: [],
  };
}

function calculateLevelReward(level: number): number {
  return level * 5;
}

export async function createUser(username: string): Promise<User> {
  const created = await prisma.user.create({
    data: {
      username,
      xp: 0,
      level: 1,
      cnxBalance: 0,
      reservedCnx: 0,
      isVerified: false,
      payoutEligible: false,
      lastActiveAt: new Date(),
    },
  });

  await updateAccessState(created.id);

  return toUser(created);
}

export async function getUser(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) return null;
  return toUser(user);
}

export async function addXP(id: string, amount: number): Promise<User | null> {
  if (amount <= 0) return getUser(id);

  const current = await prisma.user.findUnique({
    where: { id },
  });

  if (!current) return null;

  let nextXp = current.xp + amount;
  let nextLevel = current.level;
  let nextCnxBalance = current.cnxBalance;

  while (nextXp >= nextLevel * 100) {
    nextLevel += 1;
    nextCnxBalance += calculateLevelReward(nextLevel);
  }

  const updated = await prisma.user.update({
    where: { id },
    data: {
      xp: nextXp,
      level: nextLevel,
      cnxBalance: nextCnxBalance,
      lastActiveAt: new Date(),
    },
  });

  await updateAccessState(updated.id);

  return toUser(updated);
}

export async function linkDiscord(
  id: string,
  discordId: string,
  discordTag: string
): Promise<User | null> {
  const current = await prisma.user.findUnique({
    where: { id },
  });

  if (!current) return null;

  const updated = await prisma.user.update({
    where: { id },
    data: {
      discordId,
      discordTag,
      isVerified: true,
      payoutEligible: Boolean(current.wallet),
      lastActiveAt: new Date(),
    },
  });

  await updateAccessState(updated.id);

  return toUser(updated);
}

export async function bindWallet(
  id: string,
  wallet: string
): Promise<User | null> {
  const current = await prisma.user.findUnique({
    where: { id },
  });

  if (!current) return null;

  const updated = await prisma.user.update({
    where: { id },
    data: {
      wallet,
      payoutEligible: current.isVerified,
      lastActiveAt: new Date(),
    },
  });

  await updateAccessState(updated.id);

  return toUser(updated);
}

export async function getPayoutReadyUser(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) return null;
  if (!user.isVerified) return null;
  if (!user.wallet) return null;
  if (user.cnxBalance <= 0) return null;

  const available = user.cnxBalance - user.reservedCnx;
  if (available <= 0) return null;

  return toUser(user);
}

export async function deductCnxBalance(
  id: string,
  amount: number
): Promise<User | null> {
  if (amount <= 0) return null;

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    const available = user.cnxBalance - user.reservedCnx;
    if (available < amount) return null;

    return tx.user.update({
      where: { id },
      data: {
        cnxBalance: user.cnxBalance - amount,
        payoutEligible: user.cnxBalance - amount > 0 ? user.payoutEligible : false,
        lastActiveAt: new Date(),
      },
    });
  });

  if (!result) return null;

  await updateAccessState(result.id);

  return toUser(result);
}

export async function getAvailableCnx(id: string): Promise<number | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      cnxBalance: true,
      reservedCnx: true,
    },
  });

  if (!user) return null;

  return user.cnxBalance - user.reservedCnx;
}

export async function reserveCnx(
  id: string,
  amount: number
): Promise<User | null> {
  if (amount <= 0) return null;

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    const available = user.cnxBalance - user.reservedCnx;
    if (available < amount) return null;

    return tx.user.update({
      where: { id },
      data: {
        reservedCnx: user.reservedCnx + amount,
        lastActiveAt: new Date(),
      },
    });
  });

  if (!result) return null;
  return toUser(result);
}

export async function releaseReservedCnx(
  id: string,
  amount: number
): Promise<User | null> {
  if (amount <= 0) return null;

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id },
    });

    if (!user) return null;
    if (user.reservedCnx < amount) return null;

    return tx.user.update({
      where: { id },
      data: {
        reservedCnx: user.reservedCnx - amount,
        lastActiveAt: new Date(),
      },
    });
  });

  if (!result) return null;
  return toUser(result);
}

export async function finalizeReservedCnx(
  id: string,
  amount: number
): Promise<User | null> {
  if (amount <= 0) return null;

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id },
    });

    if (!user) return null;
    if (user.reservedCnx < amount) return null;
    if (user.cnxBalance < amount) return null;

    const nextBalance = user.cnxBalance - amount;

    return tx.user.update({
      where: { id },
      data: {
        reservedCnx: user.reservedCnx - amount,
        cnxBalance: nextBalance,
        payoutEligible: nextBalance > 0 ? user.payoutEligible : false,
        lastActiveAt: new Date(),
      },
    });
  });

  if (!result) return null;

  await updateAccessState(result.id);

  return toUser(result);
}