// backend/src/services/tempAccessService.ts
import { deductCnxBalance, getUser } from "./userService";
import { updateAccessState } from "./accessStateService";
import {
  createEntitlement,
  getUserActiveEntitlements,
  type CnxEntitlementRecord,
} from "./entitlementStore";

type TempAccessPurchaseResult = {
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
};

function hasActiveTemporaryAccess(userId: string): boolean {
  return getUserActiveEntitlements(userId).some(
    (e) =>
      e.entitlementType === "temporary_access" &&
      e.expiresAt &&
      new Date(e.expiresAt) > new Date()
  );
}

export function purchaseTemporaryAccess(
  userId: string,
  accessType: keyof typeof TEMP_ACCESS_CONFIG
): TempAccessPurchaseResult | null {
  const user = getUser(userId);
  if (!user) return null;

  if (hasActiveTemporaryAccess(userId)) {
    return null;
  }

  const config = TEMP_ACCESS_CONFIG[accessType];
  if (!config) return null;

  const updatedUser = deductCnxBalance(userId, config.cost);
  if (!updatedUser) return null;

  const now = new Date().toISOString();
  const expiresAt = new Date(
    Date.now() + 5000
  ).toISOString();

  const entitlement: CnxEntitlementRecord = {
    id: Date.now().toString(),
    userId,
    entitlementType: "temporary_access",
    entitlementKey: accessType,
    status: "active",
    source: "cnx_spend",
    grantedAt: now,
    expiresAt,
    updatedAt: now,
    metadataJson: JSON.stringify({ cost: config.cost }),
  };

  createEntitlement(entitlement);
  updateAccessState(userId);

  return {
    userId,
    accessType,
    cost: config.cost,
    expiresAt,
    remainingCnxBalance: updatedUser.cnxBalance,
    entitlementId: entitlement.id,
  };
}