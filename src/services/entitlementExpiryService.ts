// backend/src/services/entitlementExpiryService.ts
import { refreshAccessState } from "./accessStateService";
import { expireDueEntitlements } from "./entitlementStore";

export async function expireExpiredEntitlements() {
  const expiredRecords = await expireDueEntitlements();

  const expiredEntitlementIds: string[] = [];
  const expiredUserIds = new Set<string>();

  for (const record of expiredRecords) {
    expiredEntitlementIds.push(record.id);
    expiredUserIds.add(record.userId);
  }

  for (const userId of expiredUserIds) {
    await refreshAccessState(userId);
  }

  return {
    expiredCount: expiredRecords.length,
    expiredEntitlementIds,
    affectedUserIds: Array.from(expiredUserIds),
  };
}