// backend/src/services/entitlementStore.ts
import { prisma } from "../lib/prisma";

export type CnxAccessStateRecord = {
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

type RawAccessStateRecord = {
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
};

type RawEntitlementRecord = {
  id: string;
  userId: string;
  entitlementType: string;
  entitlementKey: string;
  status: string;
  source: string;
  grantedAt: Date;
  expiresAt: Date | null;
  updatedAt: Date;
  metadataJson: string | null;
};

function getEntitlementDelegate() {
  const prismaWithPossibleDelegates = prisma as unknown as {
    entitlement?: {
      create: (args: unknown) => Promise<RawEntitlementRecord>;
      findUnique: (args: unknown) => Promise<RawEntitlementRecord | null>;
      findMany: (args: unknown) => Promise<RawEntitlementRecord[]>;
      update: (args: unknown) => Promise<RawEntitlementRecord>;
      updateMany: (args: unknown) => Promise<unknown>;
    };
    cnxEntitlement?: {
      create: (args: unknown) => Promise<RawEntitlementRecord>;
      findUnique: (args: unknown) => Promise<RawEntitlementRecord | null>;
      findMany: (args: unknown) => Promise<RawEntitlementRecord[]>;
      update: (args: unknown) => Promise<RawEntitlementRecord>;
      updateMany: (args: unknown) => Promise<unknown>;
    };
  };

  const delegate =
    prismaWithPossibleDelegates.entitlement ??
    prismaWithPossibleDelegates.cnxEntitlement;

  if (!delegate) {
    throw new Error(
      "Prisma entitlement delegate not found. Confirm your schema model name and regenerate Prisma client."
    );
  }

  return delegate;
}

function toAccessStateRecord(record: RawAccessStateRecord): CnxAccessStateRecord {
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

function toEntitlementRecord(record: RawEntitlementRecord): CnxEntitlementRecord {
  return {
    id: record.id,
    userId: record.userId,
    entitlementType: record.entitlementType,
    entitlementKey: record.entitlementKey,
    status: record.status as EntitlementStatus,
    source: record.source as EntitlementSource,
    grantedAt: record.grantedAt.toISOString(),
    expiresAt: record.expiresAt ? record.expiresAt.toISOString() : null,
    updatedAt: record.updatedAt.toISOString(),
    metadataJson: record.metadataJson ?? undefined,
  };
}

export async function upsertAccessState(
  record: CnxAccessStateRecord
): Promise<CnxAccessStateRecord> {
  const saved = await prisma.accessState.upsert({
    where: { userId: record.userId },
    update: {
      tier: record.tier,
      active: record.active,
      isCnxHolder: record.isCnxHolder,
      holderTierInternal: record.holderTierInternal,
      xpBoost: record.xpBoost,
      cooldownReduction: record.cooldownReduction,
      tempAccessType: record.tempAccessType,
      tempAccessExpiresAt: record.tempAccessExpiresAt
        ? new Date(record.tempAccessExpiresAt)
        : null,
      lastEvaluatedAt: new Date(record.lastEvaluatedAt),
      lastRoleSyncAt: record.lastRoleSyncAt
        ? new Date(record.lastRoleSyncAt)
        : null,
    },
    create: {
      userId: record.userId,
      tier: record.tier,
      active: record.active,
      isCnxHolder: record.isCnxHolder,
      holderTierInternal: record.holderTierInternal,
      xpBoost: record.xpBoost,
      cooldownReduction: record.cooldownReduction,
      tempAccessType: record.tempAccessType,
      tempAccessExpiresAt: record.tempAccessExpiresAt
        ? new Date(record.tempAccessExpiresAt)
        : null,
      lastEvaluatedAt: new Date(record.lastEvaluatedAt),
      lastRoleSyncAt: record.lastRoleSyncAt
        ? new Date(record.lastRoleSyncAt)
        : null,
    },
  });

  return toAccessStateRecord(saved);
}

export async function getAccessStateRecord(
  userId: string
): Promise<CnxAccessStateRecord | null> {
  const record = await prisma.accessState.findUnique({
    where: { userId },
  });

  if (!record) return null;
  return toAccessStateRecord(record);
}

export async function getAllAccessStateRecords(): Promise<CnxAccessStateRecord[]> {
  const records = await prisma.accessState.findMany({
    orderBy: { lastEvaluatedAt: "desc" },
  });

  return records.map(toAccessStateRecord);
}

export async function createEntitlement(input: {
  userId: string;
  entitlementType: string;
  entitlementKey: string;
  source: EntitlementSource;
  expiresAt?: string | null;
  metadataJson?: string;
}): Promise<CnxEntitlementRecord> {
  const entitlement = getEntitlementDelegate();

  const saved = await entitlement.create({
    data: {
      userId: input.userId,
      entitlementType: input.entitlementType,
      entitlementKey: input.entitlementKey,
      status: "active",
      source: input.source,
      grantedAt: new Date(),
      expiresAt: input.expiresAt ? new Date(input.expiresAt) : null,
      metadataJson: input.metadataJson ?? null,
    },
  });

  return toEntitlementRecord(saved);
}

export async function updateEntitlement(
  id: string,
  updates: Partial<CnxEntitlementRecord>
): Promise<CnxEntitlementRecord | null> {
  const entitlement = getEntitlementDelegate();

  const existing = await entitlement.findUnique({
    where: { id },
  });

  if (!existing) return null;

  const saved = await entitlement.update({
    where: { id },
    data: {
      entitlementType: updates.entitlementType,
      entitlementKey: updates.entitlementKey,
      status: updates.status,
      source: updates.source,
      expiresAt:
        updates.expiresAt === undefined
          ? undefined
          : updates.expiresAt
            ? new Date(updates.expiresAt)
            : null,
      metadataJson:
        updates.metadataJson === undefined ? undefined : updates.metadataJson,
      updatedAt: new Date(),
    },
  });

  return toEntitlementRecord(saved);
}

export async function expireEntitlement(
  id: string
): Promise<CnxEntitlementRecord | null> {
  const entitlement = getEntitlementDelegate();

  const existing = await entitlement.findUnique({
    where: { id },
  });

  if (!existing) return null;
  if (existing.status !== "active") return toEntitlementRecord(existing);

  const saved = await entitlement.update({
    where: { id },
    data: {
      status: "expired",
      updatedAt: new Date(),
    },
  });

  return toEntitlementRecord(saved);
}

export async function expireDueEntitlements(): Promise<CnxEntitlementRecord[]> {
  const entitlement = getEntitlementDelegate();
  const now = new Date();

  const due = await entitlement.findMany({
    where: {
      status: "active",
      expiresAt: {
        not: null,
        lte: now,
      },
    },
  });

  if (due.length === 0) return [];

  await entitlement.updateMany({
    where: {
      status: "active",
      expiresAt: {
        not: null,
        lte: now,
      },
    },
    data: {
      status: "expired",
      updatedAt: now,
    },
  });

  const expired = await entitlement.findMany({
    where: {
      id: {
        in: due.map((e) => e.id),
      },
    },
  });

  return expired.map(toEntitlementRecord);
}

export async function getEntitlementById(
  id: string
): Promise<CnxEntitlementRecord | null> {
  const entitlement = getEntitlementDelegate();

  const record = await entitlement.findUnique({
    where: { id },
  });

  if (!record) return null;
  return toEntitlementRecord(record);
}

export async function getUserEntitlements(
  userId: string
): Promise<CnxEntitlementRecord[]> {
  const entitlement = getEntitlementDelegate();

  const records = await entitlement.findMany({
    where: { userId },
    orderBy: { grantedAt: "desc" },
  });

  return records.map(toEntitlementRecord);
}

export async function getUserActiveEntitlements(
  userId: string
): Promise<CnxEntitlementRecord[]> {
  const entitlement = getEntitlementDelegate();

  const records = await entitlement.findMany({
    where: {
      userId,
      status: "active",
    },
    orderBy: { grantedAt: "desc" },
  });

  return records.map(toEntitlementRecord);
}

export async function getAllEntitlements(): Promise<CnxEntitlementRecord[]> {
  const entitlement = getEntitlementDelegate();

  const records = await entitlement.findMany({
    orderBy: { grantedAt: "desc" },
  });

  return records.map(toEntitlementRecord);
}