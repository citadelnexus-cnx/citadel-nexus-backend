// backend/src/services/accessStateService.ts
import { prisma } from "../lib/prisma";
import { getUser } from "./userService";
import { getUserActiveEntitlements } from "./entitlementStore";

export type AccessState = {
  id?: string;
  userId: string;
  tier: string;
  active: boolean;
  isCnxHolder: boolean;
  holderTierInternal: number;
  xpBoost: number;
  cooldownReduction: number;
  tempAccessType: string | null;
  tempAccessExpiresAt: string | null;
  lastEvaluatedAt: string;
  lastRoleSyncAt?: string | null;
};

export type AccessModifiers = {
  userId: string;
  xpBoost: number;
  cooldownReduction: number;
  isCnxHolder: boolean;
  holderTierInternal: number;
  tempAccessType: string | null;
  tempAccessExpiresAt: string | null;
};

const CNX_THRESHOLDS = {
  HOLDER: 10,
  BOOST_TIER_1: 1000,
  BOOST_TIER_2: 10000,
};

function toAccessState(record: {
  id: string;
  userId: string;
  tier: string;
  active: boolean;
  isCnxHolder: boolean;
  holderTierInternal: number;
  xpBoost: number;
  cooldownReduction: number;
  tempAccessType: string | null;
  tempAccessExpiresAt: Date | null;
  lastEvaluatedAt: Date;
  lastRoleSyncAt: Date | null;
}): AccessState {
  return {
    id: record.id,
    userId: record.userId,
    tier: record.tier,
    active: record.active,
    isCnxHolder: record.isCnxHolder,
    holderTierInternal: record.holderTierInternal,
    xpBoost: record.xpBoost,
    cooldownReduction: record.cooldownReduction,
    tempAccessType: record.tempAccessType,
    tempAccessExpiresAt: record.tempAccessExpiresAt
      ? record.tempAccessExpiresAt.toISOString()
      : null,
    lastEvaluatedAt: record.lastEvaluatedAt.toISOString(),
    lastRoleSyncAt: record.lastRoleSyncAt
      ? record.lastRoleSyncAt.toISOString()
      : null,
  };
}

async function getActiveTempEntitlement(userId: string) {
  const entitlements = await getUserActiveEntitlements(userId);

  return (
    entitlements.find(
      (e) =>
        e.entitlementType === "temporary_access" &&
        e.status === "active" &&
        e.expiresAt &&
        new Date(e.expiresAt) > new Date()
    ) || null
  );
}

function resolveTier(holderTierInternal: number): string {
  switch (holderTierInternal) {
    case 3:
      return "boost_tier_2";
    case 2:
      return "boost_tier_1";
    case 1:
      return "holder";
    default:
      return "none";
  }
}

async function evaluateAccessStateFromBalance(
  userId: string,
  cnxBalance: number
): Promise<AccessState> {
  const isCnxHolder = cnxBalance >= CNX_THRESHOLDS.HOLDER;

  let holderTierInternal = 0;
  let xpBoost = 0;
  let cooldownReduction = 0;

  if (cnxBalance >= CNX_THRESHOLDS.HOLDER) {
    holderTierInternal = 1;
  }

  if (cnxBalance >= CNX_THRESHOLDS.BOOST_TIER_1) {
    xpBoost = 0.05;
    cooldownReduction = 0.1;
    holderTierInternal = 2;
  }

  if (cnxBalance >= CNX_THRESHOLDS.BOOST_TIER_2) {
    xpBoost = 0.1;
    cooldownReduction = 0.2;
    holderTierInternal = 3;
  }

  const tempEntitlement = await getActiveTempEntitlement(userId);

  return {
    userId,
    tier: resolveTier(holderTierInternal),
    active: isCnxHolder || Boolean(tempEntitlement),
    isCnxHolder,
    holderTierInternal,
    xpBoost,
    cooldownReduction,
    tempAccessType: tempEntitlement ? tempEntitlement.entitlementKey : null,
    tempAccessExpiresAt: tempEntitlement ? tempEntitlement.expiresAt : null,
    lastEvaluatedAt: new Date().toISOString(),
    lastRoleSyncAt: null,
  };
}

export async function updateAccessState(
  userId: string
): Promise<AccessState | null> {
  const user = await getUser(userId);
  if (!user) return null;

  const existing = await prisma.accessState.findUnique({
    where: { userId },
  });

  const evaluated = await evaluateAccessStateFromBalance(user.id, user.cnxBalance);

  const saved = await prisma.accessState.upsert({
    where: { userId },
    update: {
      tier: evaluated.tier,
      active: evaluated.active,
      isCnxHolder: evaluated.isCnxHolder,
      holderTierInternal: evaluated.holderTierInternal,
      xpBoost: evaluated.xpBoost,
      cooldownReduction: evaluated.cooldownReduction,
      tempAccessType: evaluated.tempAccessType,
      tempAccessExpiresAt: evaluated.tempAccessExpiresAt
        ? new Date(evaluated.tempAccessExpiresAt)
        : null,
      lastEvaluatedAt: new Date(evaluated.lastEvaluatedAt),
      lastRoleSyncAt: existing?.lastRoleSyncAt ?? null,
    },
    create: {
      userId: evaluated.userId,
      tier: evaluated.tier,
      active: evaluated.active,
      isCnxHolder: evaluated.isCnxHolder,
      holderTierInternal: evaluated.holderTierInternal,
      xpBoost: evaluated.xpBoost,
      cooldownReduction: evaluated.cooldownReduction,
      tempAccessType: evaluated.tempAccessType,
      tempAccessExpiresAt: evaluated.tempAccessExpiresAt
        ? new Date(evaluated.tempAccessExpiresAt)
        : null,
      lastEvaluatedAt: new Date(evaluated.lastEvaluatedAt),
      lastRoleSyncAt: null,
    },
  });

  return toAccessState(saved);
}

export async function getAccessState(
  userId: string
): Promise<AccessState | null> {
  const state = await prisma.accessState.findUnique({
    where: { userId },
  });

  if (!state) return null;
  return toAccessState(state);
}

export async function getOrCreateAccessState(
  userId: string
): Promise<AccessState | null> {
  const existing = await getAccessState(userId);
  if (existing) return existing;

  return updateAccessState(userId);
}

export async function refreshAccessState(
  userId: string
): Promise<AccessState | null> {
  return updateAccessState(userId);
}

export async function getAccessModifiers(
  userId: string
): Promise<AccessModifiers> {
  const state = await getOrCreateAccessState(userId);

  if (!state) {
    return {
      userId,
      xpBoost: 0,
      cooldownReduction: 0,
      isCnxHolder: false,
      holderTierInternal: 0,
      tempAccessType: null,
      tempAccessExpiresAt: null,
    };
  }

  return {
    userId: state.userId,
    xpBoost: state.xpBoost,
    cooldownReduction: state.cooldownReduction,
    isCnxHolder: state.isCnxHolder,
    holderTierInternal: state.holderTierInternal,
    tempAccessType: state.tempAccessType,
    tempAccessExpiresAt: state.tempAccessExpiresAt,
  };
}

export async function markRoleSync(
  userId: string
): Promise<AccessState | null> {
  const existing = await prisma.accessState.findUnique({
    where: { userId },
  });

  if (!existing) return null;

  const updated = await prisma.accessState.update({
    where: { userId },
    data: {
      lastRoleSyncAt: new Date(),
    },
  });

  return toAccessState(updated);
}

export async function getAllAccessStates(): Promise<AccessState[]> {
  const states = await prisma.accessState.findMany({
    orderBy: { lastEvaluatedAt: "desc" },
  });

  return states.map(toAccessState);
}