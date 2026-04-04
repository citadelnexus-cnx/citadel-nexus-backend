//backend/src/services/tempAccessService.ts
import { deductCnxBalance, getUser } from "./userService";
import { updateAccessState } from "./accessStateService";
import {
  createEntitlement,
  getUserActiveEntitlements,
} from "./entitlementStore";

export type TempAccessPurchaseResult = {
  userId: string;
  accessType: string;
  cost: number;
  expiresAt: string;
  remainingCnxBalance: number;
  entitlementId: string;
};

const TEMP_ACCESS_CONFIG = {
  premium_alpha: {
    cost: 25,
    durationHours: 24,
  },
  partner_offers: {
    cost: 15,
    durationHours: 24,
  },
} as const;

function isSupportedAccessType(
  value: string
): value is keyof typeof TEMP_ACCESS_CONFIG {
  return value in TEMP_ACCESS_CONFIG;
}

async function hasActiveTemporaryAccess(userId: string): Promise<boolean> {
  const entitlements = await getUserActiveEntitlements(userId);

  return entitlements.some(
    (e) =>
      e.entitlementType === "temporary_access" &&
      e.expiresAt &&
      new Date(e.expiresAt) > new Date()
  );
}

export async function purchaseTemporaryAccess(
  userId: string,
  accessType: string
): Promise<TempAccessPurchaseResult | null> {
  const user = await getUser(userId);
  if (!user) return null;

  if (!isSupportedAccessType(accessType)) {
    return null;
  }

  if (await hasActiveTemporaryAccess(userId)) {
    return null;
  }

  const config = TEMP_ACCESS_CONFIG[accessType];
  const updatedUser = await deductCnxBalance(userId, config.cost);

  if (!updatedUser) {
    return null;
  }

  const expiresAt = new Date(
    Date.now() + config.durationHours * 60 * 60 * 1000
  ).toISOString();

  const entitlement = await createEntitlement({
    userId,
    entitlementType: "temporary_access",
    entitlementKey: accessType,
    source: "cnx_spend",
    expiresAt,
    metadataJson: JSON.stringify({ cost: config.cost }),
  });

  await updateAccessState(userId);

  return {
    userId,
    accessType,
    cost: config.cost,
    expiresAt,
    remainingCnxBalance: updatedUser.cnxBalance,
    entitlementId: entitlement.id,
  };
}