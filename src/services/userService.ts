// backend/src/services/userService.ts
import { updateAccessState } from "./accessStateService";

type RewardLogEntry = {
  type: "LEVEL_UP_REWARD";
  levelReached: number;
  cnxAwarded: number;
  timestamp: string;
};

type User = {
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

const users: Record<string, User> = {};

export function createUser(username: string): User {
  const id = Date.now().toString();

  const user: User = {
    id,
    username,

    discordId: undefined,
    discordTag: undefined,
    wallet: undefined,

    xp: 0,
    level: 1,
    cnxBalance: 0,
    reservedCnx: 0,

    isVerified: false,
    payoutEligible: false,

    joinedAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),

    rewardLog: [],
  };

  users[id] = user;
  updateAccessState(user.id);

  return user;
}

export function getUser(id: string): User | null {
  return users[id] || null;
}

function calculateLevelReward(level: number): number {
  return level * 5;
}

export function addXP(id: string, amount: number): User | null {
  const user = users[id];
  if (!user) return null;

  user.xp += amount;
  user.lastActiveAt = new Date().toISOString();

  while (user.xp >= user.level * 100) {
    user.level += 1;

    const reward = calculateLevelReward(user.level);
    user.cnxBalance += reward;

    user.rewardLog.push({
      type: "LEVEL_UP_REWARD",
      levelReached: user.level,
      cnxAwarded: reward,
      timestamp: new Date().toISOString(),
    });
  }

  updateAccessState(user.id);
  return user;
}

export function linkDiscord(
  id: string,
  discordId: string,
  discordTag: string
): User | null {
  const user = users[id];
  if (!user) return null;

  user.discordId = discordId;
  user.discordTag = discordTag;
  user.isVerified = true;
  user.lastActiveAt = new Date().toISOString();

  if (user.wallet) {
    user.payoutEligible = true;
  }

  updateAccessState(user.id);
  return user;
}

export function bindWallet(id: string, wallet: string): User | null {
  const user = users[id];
  if (!user) return null;

  user.wallet = wallet;
  user.lastActiveAt = new Date().toISOString();

  if (user.isVerified) {
    user.payoutEligible = true;
  }

  updateAccessState(user.id);
  return user;
}

export function getPayoutReadyUser(id: string): User | null {
  const user = users[id];
  if (!user) return null;

  if (!user.isVerified) return null;
  if (!user.wallet) return null;
  if (user.cnxBalance <= 0) return null;

  const available = user.cnxBalance - user.reservedCnx;
  if (available <= 0) return null;

  return user;
}

export function deductCnxBalance(id: string, amount: number): User | null {
  const user = users[id];
  if (!user) return null;
  if (amount <= 0) return null;

  const available = user.cnxBalance - user.reservedCnx;
  if (available < amount) return null;

  user.cnxBalance -= amount;
  user.lastActiveAt = new Date().toISOString();

  updateAccessState(user.id);
  return user;
}

export function getAvailableCnx(id: string): number | null {
  const user = users[id];
  if (!user) return null;

  return user.cnxBalance - user.reservedCnx;
}

export function reserveCnx(id: string, amount: number): User | null {
  const user = users[id];
  if (!user) return null;
  if (amount <= 0) return null;

  const available = user.cnxBalance - user.reservedCnx;
  if (available < amount) return null;

  user.reservedCnx += amount;
  user.lastActiveAt = new Date().toISOString();

  return user;
}

export function releaseReservedCnx(id: string, amount: number): User | null {
  const user = users[id];
  if (!user) return null;
  if (amount <= 0) return null;
  if (user.reservedCnx < amount) return null;

  user.reservedCnx -= amount;
  user.lastActiveAt = new Date().toISOString();

  return user;
}

export function finalizeReservedCnx(id: string, amount: number): User | null {
  const user = users[id];
  if (!user) return null;
  if (amount <= 0) return null;
  if (user.reservedCnx < amount) return null;
  if (user.cnxBalance < amount) return null;

  user.reservedCnx -= amount;
  user.cnxBalance -= amount;
  user.lastActiveAt = new Date().toISOString();

  if (user.cnxBalance <= 0) {
    user.payoutEligible = false;
  }

  updateAccessState(user.id);
  return user;
}