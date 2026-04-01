//backend/src/services/entitlementStore.ts
export type CnxAccessStateRecord = {
  userId: string;

  isCnxHolder: boolean;
  holderTierInternal: number;

  xpBoost: number;
  cooldownReduction: number;

  tempAccessType: string | null;
  tempAccessExpiresAt: string | null;

  lastEvaluatedAt: string;
  lastRoleSyncAt?: string;
};

export type EntitlementStatus = "active" | "expired" | "revoked";

export type EntitlementSource =
  | "cnx_spend"
  | "admin_grant"
  | "future_nft"
  | "premium";

export type CnxEntitlementRecord = {
  id: string;
  userId: string;

  entitlementType: string;
  entitlementKey: string;

  status: EntitlementStatus;
  source: EntitlementSource;

  grantedAt: string;
  expiresAt: string | null;
  updatedAt: string;

  metadataJson?: string;
};

const accessStateStore: Record<string, CnxAccessStateRecord> = {};
const entitlementStore: Record<string, CnxEntitlementRecord> = {};

export function upsertAccessState(
  record: CnxAccessStateRecord
): CnxAccessStateRecord {
  accessStateStore[record.userId] = record;
  return record;
}

export function getAccessStateRecord(
  userId: string
): CnxAccessStateRecord | null {
  return accessStateStore[userId] || null;
}

export function getAllAccessStateRecords(): CnxAccessStateRecord[] {
  return Object.values(accessStateStore);
}

export function createEntitlement(input: {
  userId: string;
  entitlementType: string;
  entitlementKey: string;
  source: EntitlementSource;
  expiresAt?: string | null;
  metadataJson?: string;
}): CnxEntitlementRecord {
  const now = new Date().toISOString();

  const record: CnxEntitlementRecord = {
    id: Date.now().toString(),
    userId: input.userId,
    entitlementType: input.entitlementType,
    entitlementKey: input.entitlementKey,
    status: "active",
    source: input.source,
    grantedAt: now,
    expiresAt: input.expiresAt ?? null,
    updatedAt: now,
    metadataJson: input.metadataJson,
  };

  entitlementStore[record.id] = record;
  return record;
}

export function updateEntitlement(
  id: string,
  updates: Partial<CnxEntitlementRecord>
): CnxEntitlementRecord | null {
  const existing = entitlementStore[id];
  if (!existing) return null;

  const updated: CnxEntitlementRecord = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  entitlementStore[id] = updated;
  return updated;
}

export function expireEntitlement(id: string): CnxEntitlementRecord | null {
  const existing = entitlementStore[id];
  if (!existing) return null;
  if (existing.status !== "active") return existing;

  existing.status = "expired";
  existing.updatedAt = new Date().toISOString();

  return existing;
}

export function expireDueEntitlements(): CnxEntitlementRecord[] {
  const now = new Date();
  const expired: CnxEntitlementRecord[] = [];

  for (const entitlement of Object.values(entitlementStore)) {
    if (entitlement.status !== "active") continue;
    if (!entitlement.expiresAt) continue;

    if (new Date(entitlement.expiresAt) <= now) {
      entitlement.status = "expired";
      entitlement.updatedAt = new Date().toISOString();
      expired.push(entitlement);
    }
  }

  return expired;
}

export function getEntitlementById(id: string): CnxEntitlementRecord | null {
  return entitlementStore[id] || null;
}

export function getUserEntitlements(userId: string): CnxEntitlementRecord[] {
  return Object.values(entitlementStore).filter((e) => e.userId === userId);
}

export function getUserActiveEntitlements(
  userId: string
): CnxEntitlementRecord[] {
  return Object.values(entitlementStore).filter(
    (e) => e.userId === userId && e.status === "active"
  );
}

export function getAllEntitlements(): CnxEntitlementRecord[] {
  return Object.values(entitlementStore);
}