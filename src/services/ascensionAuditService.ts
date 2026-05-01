//backend/src/services/ascensionAuditService.ts
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export type AscensionAdminActionRecord = {
  id: string;
  adminUserId: string;
  adminUsername: string | null;
  targetUserId: string | null;
  targetUsername: string | null;
  actionType: string;
  resourceType: string | null;
  amount: number | null;
  valueBefore: unknown;
  valueAfter: unknown;
  reason: string;
  metadataJson: unknown;
  createdAt: string;
};

export type AscensionAdminSnapshotRecord = {
  id: string;
  actionId: string;
  targetUserId: string;
  snapshotType: string;
  profileState: unknown;
  inventoryState: unknown;
  createdAt: string;
};

function toNullableJsonValue(
  value: unknown
): Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput | undefined {
  if (value === undefined) return undefined;
  if (value === null) return Prisma.JsonNull;
  return value as Prisma.InputJsonValue;
}

function toAdminActionRecord(record: {
  id: string;
  adminUserId: string;
  adminUsername: string | null;
  targetUserId: string | null;
  targetUsername: string | null;
  actionType: string;
  resourceType: string | null;
  amount: number | null;
  valueBefore: Prisma.JsonValue | null;
  valueAfter: Prisma.JsonValue | null;
  reason: string;
  metadataJson: Prisma.JsonValue | null;
  createdAt: Date;
}): AscensionAdminActionRecord {
  return {
    id: record.id,
    adminUserId: record.adminUserId,
    adminUsername: record.adminUsername,
    targetUserId: record.targetUserId,
    targetUsername: record.targetUsername,
    actionType: record.actionType,
    resourceType: record.resourceType,
    amount: record.amount,
    valueBefore: record.valueBefore,
    valueAfter: record.valueAfter,
    reason: record.reason,
    metadataJson: record.metadataJson,
    createdAt: record.createdAt.toISOString(),
  };
}

function toAdminSnapshotRecord(record: {
  id: string;
  actionId: string;
  targetUserId: string;
  snapshotType: string;
  profileState: Prisma.JsonValue | null;
  inventoryState: Prisma.JsonValue | null;
  createdAt: Date;
}): AscensionAdminSnapshotRecord {
  return {
    id: record.id,
    actionId: record.actionId,
    targetUserId: record.targetUserId,
    snapshotType: record.snapshotType,
    profileState: record.profileState,
    inventoryState: record.inventoryState,
    createdAt: record.createdAt.toISOString(),
  };
}

export async function createAscensionAdminAction(input: {
  adminUserId: string;
  adminUsername?: string | null;
  targetUserId?: string | null;
  targetUsername?: string | null;
  actionType: string;
  resourceType?: string | null;
  amount?: number | null;
  valueBefore?: unknown;
  valueAfter?: unknown;
  reason: string;
  metadataJson?: unknown;
}): Promise<AscensionAdminActionRecord> {
  const created = await prisma.ascensionAdminAction.create({
    data: {
      adminUserId: input.adminUserId,
      adminUsername: input.adminUsername ?? null,
      targetUserId: input.targetUserId ?? null,
      targetUsername: input.targetUsername ?? null,
      actionType: input.actionType,
      resourceType: input.resourceType ?? null,
      amount: input.amount ?? null,
      valueBefore: toNullableJsonValue(input.valueBefore),
      valueAfter: toNullableJsonValue(input.valueAfter),
      reason: input.reason,
      metadataJson: toNullableJsonValue(input.metadataJson),
    },
  });

  return toAdminActionRecord(created);
}

export async function createAscensionAdminSnapshot(input: {
  actionId: string;
  targetUserId: string;
  snapshotType: string;
  profileState?: unknown;
  inventoryState?: unknown;
}): Promise<AscensionAdminSnapshotRecord> {
  const created = await prisma.ascensionAdminSnapshot.create({
    data: {
      actionId: input.actionId,
      targetUserId: input.targetUserId,
      snapshotType: input.snapshotType,
      profileState: toNullableJsonValue(input.profileState),
      inventoryState: toNullableJsonValue(input.inventoryState),
    },
  });

  return toAdminSnapshotRecord(created);
}

export async function getLatestAscensionSnapshotForUser(
  targetUserId: string,
  snapshotTypes: string[]
): Promise<AscensionAdminSnapshotRecord | null> {
  const snapshot = await prisma.ascensionAdminSnapshot.findFirst({
    where: {
      targetUserId,
      snapshotType: {
        in: snapshotTypes,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!snapshot) return null;
  return toAdminSnapshotRecord(snapshot);
}