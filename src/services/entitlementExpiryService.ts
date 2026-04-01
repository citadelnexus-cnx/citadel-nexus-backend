// backend/src/services/entitlementExpiryService.ts

import {
  expireDueEntitlements,
  getAllEntitlements,
} from "./entitlementStore";

export function expireExpiredEntitlements() {
  const expiredRecords = expireDueEntitlements();

  const expiredEntitlementIds: string[] = [];
  const expiredUserIds = new Set<string>();

  for (const record of expiredRecords) {
    expiredEntitlementIds.push(record.id);
    expiredUserIds.add(record.userId);
  }

  return {
    expiredCount: expiredEntitlementIds.length,
    expiredEntitlementIds,
    expiredUserIds: Array.from(expiredUserIds),
  };
}