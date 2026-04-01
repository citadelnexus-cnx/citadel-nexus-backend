// backend/src/services/accessStateService.ts
import { getUser } from "./userService";
import {
  upsertAccessState,
  getAccessStateRecord,
  getAllAccessStateRecords,
  getUserActiveEntitlements,
  type CnxAccessStateRecord,
} from "./entitlementStore";

export type AccessState = CnxAccessStateRecord;

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

function getActiveTempEntitlement(userId: string) {
  const entitlements = getUserActiveEntitlements(userId);

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

function evaluateAccessStateFromBalance(
  userId: string,
  cnxBalance: number
): AccessState {
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

  const tempEntitlement = getActiveTempEntitlement(userId);

  return {
    userId,
    isCnxHolder,
    holderTierInternal,
    xpBoost,
    cooldownReduction,
    tempAccessType: tempEntitlement ? tempEntitlement.entitlementKey : null,
    tempAccessExpiresAt: tempEntitlement ? tempEntitlement.expiresAt : null,
    lastEvaluatedAt: new Date().toISOString(),
  };
}

export function updateAccessState(userId: string): AccessState | null {
  const user = getUser(userId);
  if (!user) return null;

  const existing = getAccessStateRecord(userId);
  const evaluated = evaluateAccessStateFromBalance(user.id, user.cnxBalance);

  if (existing?.lastRoleSyncAt) {
    evaluated.lastRoleSyncAt = existing.lastRoleSyncAt;
  }

  return upsertAccessState(evaluated);
}

export function getAccessState(userId: string): AccessState | null {
  return getAccessStateRecord(userId);
}

export function getOrCreateAccessState(userId: string): AccessState | null {
  const existing = getAccessStateRecord(userId);
  if (existing) return existing;

  return updateAccessState(userId);
}

export function refreshAccessState(userId: string): AccessState | null {
  return updateAccessState(userId);
}

export function getAccessModifiers(userId: string): AccessModifiers {
  const state = getOrCreateAccessState(userId);

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

export function markRoleSync(userId: string): AccessState | null {
  const state = getAccessStateRecord(userId);
  if (!state) return null;

  const updated: AccessState = {
    ...state,
    lastRoleSyncAt: new Date().toISOString(),
  };

  return upsertAccessState(updated);
}

export function getAllAccessStates(): AccessState[] {
  return getAllAccessStateRecords();
}