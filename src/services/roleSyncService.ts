// backend/src/services/roleSyncService.ts
import {
  getAccessState,
  getAllAccessStates,
} from "./accessStateService";

export const BACKEND_ROLE_KEYS = Object.freeze({
  CNX_HOLDER: "cnx_holder",
  CNX_HOLDER_TIER_1: "cnx_holder_tier_1",
  CNX_HOLDER_TIER_2: "cnx_holder_tier_2",
  CNX_HOLDER_TIER_3: "cnx_holder_tier_3",
  TEMP_PREMIUM_ALPHA: "temp_premium_alpha",
} as const);

const TEMP_ACCESS_ROLE_MAP: Record<string, string> = {
  premium_alpha: BACKEND_ROLE_KEYS.TEMP_PREMIUM_ALPHA,
};

function uniqueRoles(roles: string[]): string[] {
  return [...new Set(roles)];
}

function sortRoles(roles: string[]): string[] {
  return [...roles].sort();
}

function normalizeRoleSets(
  shouldHaveRoles: string[],
  shouldNotHaveRoles: string[]
): { shouldHaveRoles: string[]; shouldNotHaveRoles: string[] } {
  const haveSet = new Set(shouldHaveRoles);
  const notHaveSet = new Set(shouldNotHaveRoles);

  for (const role of haveSet) {
    if (notHaveSet.has(role)) {
      notHaveSet.delete(role);
    }
  }

  return {
    shouldHaveRoles: [...haveSet],
    shouldNotHaveRoles: [...notHaveSet],
  };
}

export type RoleSyncPayload = {
  userId: string;
  contractVersion: "role_sync_prep_v1";
  shouldHaveRoles: string[];
  shouldNotHaveRoles: string[];
  accessState: {
    isCnxHolder: boolean;
    holderTierInternal: number;
    tempAccessType: string | null;
    tempAccessExpiresAt: string | null;
  };
  warnings: string[];
  unsupportedTempAccessType: string | null;
  lastEvaluatedAt: string;
  lastRoleSyncAt: string | null;
};

export function buildRoleSyncPayload(userId: string): RoleSyncPayload | null {
  const state = getAccessState(userId);
  if (!state) return null;

  const shouldHaveRoles: string[] = [];
  const shouldNotHaveRoles: string[] = [
    BACKEND_ROLE_KEYS.CNX_HOLDER,
    BACKEND_ROLE_KEYS.CNX_HOLDER_TIER_1,
    BACKEND_ROLE_KEYS.CNX_HOLDER_TIER_2,
    BACKEND_ROLE_KEYS.CNX_HOLDER_TIER_3,
    ...Object.values(TEMP_ACCESS_ROLE_MAP),
  ];

  const warnings: string[] = [];
  let unsupportedTempAccessType: string | null = null;

  if (state.isCnxHolder) {
    shouldHaveRoles.push(BACKEND_ROLE_KEYS.CNX_HOLDER);

    if (state.holderTierInternal === 1) {
      shouldHaveRoles.push(BACKEND_ROLE_KEYS.CNX_HOLDER_TIER_1);
    } else if (state.holderTierInternal === 2) {
      shouldHaveRoles.push(BACKEND_ROLE_KEYS.CNX_HOLDER_TIER_2);
    } else if (state.holderTierInternal === 3) {
      shouldHaveRoles.push(BACKEND_ROLE_KEYS.CNX_HOLDER_TIER_3);
    } else if (state.holderTierInternal !== 0) {
      warnings.push(`Unsupported holderTierInternal: ${state.holderTierInternal}`);
    }
  }

  const mappedTempRole =
    state.tempAccessType ? TEMP_ACCESS_ROLE_MAP[state.tempAccessType] : null;

  if (state.tempAccessType && !mappedTempRole) {
    unsupportedTempAccessType = state.tempAccessType;
    warnings.push(`Unsupported temp access type: ${state.tempAccessType}`);
  }

  if (mappedTempRole) {
    shouldHaveRoles.push(mappedTempRole);
  }

  const normalized = normalizeRoleSets(
    uniqueRoles(shouldHaveRoles),
    uniqueRoles(shouldNotHaveRoles)
  );

  return {
    userId,
    contractVersion: "role_sync_prep_v1",
    shouldHaveRoles: sortRoles(normalized.shouldHaveRoles),
    shouldNotHaveRoles: sortRoles(normalized.shouldNotHaveRoles),
    accessState: {
      isCnxHolder: state.isCnxHolder,
      holderTierInternal: state.holderTierInternal,
      tempAccessType: state.tempAccessType,
      tempAccessExpiresAt: state.tempAccessExpiresAt,
    },
    warnings,
    unsupportedTempAccessType,
    lastEvaluatedAt: state.lastEvaluatedAt,
    lastRoleSyncAt: state.lastRoleSyncAt ?? null,
  };
}

export function buildAllRoleSyncPayloads(): RoleSyncPayload[] {
  return getAllAccessStates()
    .map((state) => buildRoleSyncPayload(state.userId))
    .filter((payload): payload is RoleSyncPayload => payload !== null);
}

export function getRoleSyncPayload(userId: string): RoleSyncPayload | null {
  return buildRoleSyncPayload(userId);
}

export function getAllRoleSyncPayloads(): RoleSyncPayload[] {
  return buildAllRoleSyncPayloads();
}