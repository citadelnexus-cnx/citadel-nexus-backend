// backend/src/services/discordRoleSyncAuditStore.ts
import { randomUUID, createHash } from "crypto";
import type { DiscordSyncDecision } from "./discordSyncWorkerService";

export type DiscordRoleSyncExecutionSource =
  | "manual"
  | "worker"
  | "scheduler"
  | "retry"
  | "verification"
  | "rollback";

export type DiscordRoleSyncAuditStatus =
  | "planned"
  | "blocked"
  | "executed"
  | "mutated"
  | "verified"
  | "failed"
  | "rolled_back"
  | "no_op";

export type DiscordRoleSyncAuditRecord = {
  id: string;
  userId: string;
  contractVersion: string;
  executionSource: DiscordRoleSyncExecutionSource;
  status: DiscordRoleSyncAuditStatus;
  canExecute: boolean;
  reasonsBlocked: string[];
  warnings: string[];
  unsupportedTempAccessType: string | null;
  unresolvedRoleKeys: string[];
  desiredAddRoleIds: string[];
  desiredRemoveRoleIds: string[];
  currentMemberRoleIds: string[];
  finalMemberRoleIds: string[] | null;
  payloadJson: string;
  verificationPassed: boolean | null;
  rollbackSnapshotJson: string | null;
  errorMessage: string | null;
  idempotencyKey: string;
  executionHash: string;
  rateLimitBucket: string;
  executionDurationMs: number | null;
  attemptCount: number;
  createdAt: string;
  updatedAt: string;
};

type AuditStore = Record<string, DiscordRoleSyncAuditRecord>;

const discordRoleSyncAuditStore: AuditStore = {};

function nowIso(): string {
  return new Date().toISOString();
}

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

function stableSort(values: string[]): string[] {
  return [...values].sort();
}

export function buildRollbackSnapshotJson(currentMemberRoleIds: string[]): string {
  return JSON.stringify({
    currentMemberRoleIds: stableSort(unique(currentMemberRoleIds)),
  });
}

export function buildExecutionHash(input: {
  userId: string;
  contractVersion: string;
  executionSource: DiscordRoleSyncExecutionSource;
  currentMemberRoleIds: string[];
  desiredAddRoleIds: string[];
  desiredRemoveRoleIds: string[];
  canExecute: boolean;
  reasonsBlocked: string[];
  warnings?: string[];
  unsupportedTempAccessType?: string | null;
}): string {
  const normalized = {
    userId: input.userId,
    contractVersion: input.contractVersion,
    executionSource: input.executionSource,
    currentMemberRoleIds: stableSort(unique(input.currentMemberRoleIds)),
    desiredAddRoleIds: stableSort(unique(input.desiredAddRoleIds)),
    desiredRemoveRoleIds: stableSort(unique(input.desiredRemoveRoleIds)),
    canExecute: input.canExecute,
    reasonsBlocked: stableSort(unique(input.reasonsBlocked)),
    warnings: stableSort(unique(input.warnings ?? [])),
    unsupportedTempAccessType: input.unsupportedTempAccessType ?? null,
  };

  return createHash("sha256")
    .update(JSON.stringify(normalized))
    .digest("hex");
}

export function buildRateLimitBucket(userId: string): string {
  return `discord_role_sync:${userId}`;
}

export function createDiscordRoleSyncAuditRecord(params: {
  executionSource: DiscordRoleSyncExecutionSource;
  decision: DiscordSyncDecision;
  status?: DiscordRoleSyncAuditStatus;
  finalMemberRoleIds: string[] | null;
  verificationPassed: boolean | null;
  rollbackSnapshotJson: string | null;
  errorMessage?: string | null;
  idempotencyKey?: string;
  executionHash?: string;
  executionDurationMs?: number | null;
  attemptCount?: number;
}): DiscordRoleSyncAuditRecord {
  const timestamp = nowIso();

  const record: DiscordRoleSyncAuditRecord = {
    id: randomUUID(),
    userId: params.decision.userId,
    contractVersion: params.decision.contractVersion,
    executionSource: params.executionSource,
    status: params.status ?? (params.decision.canExecute ? "planned" : "blocked"),
    canExecute: params.decision.canExecute,
    reasonsBlocked: unique(params.decision.reasonsBlocked),
    warnings: unique(params.decision.warnings ?? []),
    unsupportedTempAccessType: params.decision.unsupportedTempAccessType ?? null,
    unresolvedRoleKeys: unique(params.decision.unresolvedRoleKeys),
    desiredAddRoleIds: unique(params.decision.desiredAddRoleIds),
    desiredRemoveRoleIds: unique(params.decision.desiredRemoveRoleIds),
    currentMemberRoleIds: unique(params.decision.currentMemberRoleIds),
    finalMemberRoleIds:
      params.finalMemberRoleIds !== null ? unique(params.finalMemberRoleIds) : null,
    payloadJson: JSON.stringify(params.decision.payload),
    verificationPassed: params.verificationPassed ?? null,
    rollbackSnapshotJson: params.rollbackSnapshotJson ?? null,
    errorMessage: params.errorMessage ?? null,
    idempotencyKey: params.idempotencyKey ?? randomUUID(),
    executionHash:
      params.executionHash ??
      buildExecutionHash({
        userId: params.decision.userId,
        contractVersion: params.decision.contractVersion,
        executionSource: params.executionSource,
        currentMemberRoleIds: params.decision.currentMemberRoleIds,
        desiredAddRoleIds: params.decision.desiredAddRoleIds,
        desiredRemoveRoleIds: params.decision.desiredRemoveRoleIds,
        canExecute: params.decision.canExecute,
        reasonsBlocked: params.decision.reasonsBlocked,
        warnings: params.decision.warnings ?? [],
        unsupportedTempAccessType: params.decision.unsupportedTempAccessType ?? null,
      }),
    rateLimitBucket: buildRateLimitBucket(params.decision.userId),
    executionDurationMs: params.executionDurationMs ?? null,
    attemptCount: params.attemptCount ?? 1,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  discordRoleSyncAuditStore[record.id] = record;
  return record;
}

export function updateDiscordRoleSyncAuditRecord(
  id: string,
  updates: Partial<
    Omit<DiscordRoleSyncAuditRecord, "id" | "userId" | "contractVersion" | "createdAt">
  >
): DiscordRoleSyncAuditRecord | null {
  const existing = discordRoleSyncAuditStore[id];
  if (!existing) return null;

  const updated: DiscordRoleSyncAuditRecord = {
    ...existing,
    ...updates,
    reasonsBlocked: updates.reasonsBlocked
      ? unique(updates.reasonsBlocked)
      : existing.reasonsBlocked,
    warnings: updates.warnings ? unique(updates.warnings) : existing.warnings,
    unresolvedRoleKeys: updates.unresolvedRoleKeys
      ? unique(updates.unresolvedRoleKeys)
      : existing.unresolvedRoleKeys,
    desiredAddRoleIds: updates.desiredAddRoleIds
      ? unique(updates.desiredAddRoleIds)
      : existing.desiredAddRoleIds,
    desiredRemoveRoleIds: updates.desiredRemoveRoleIds
      ? unique(updates.desiredRemoveRoleIds)
      : existing.desiredRemoveRoleIds,
    currentMemberRoleIds: updates.currentMemberRoleIds
      ? unique(updates.currentMemberRoleIds)
      : existing.currentMemberRoleIds,
    finalMemberRoleIds:
      updates.finalMemberRoleIds !== undefined
        ? updates.finalMemberRoleIds
          ? unique(updates.finalMemberRoleIds)
          : null
        : existing.finalMemberRoleIds,
    updatedAt: nowIso(),
  };

  discordRoleSyncAuditStore[id] = updated;
  return updated;
}

export function getDiscordRoleSyncAuditRecord(
  id: string
): DiscordRoleSyncAuditRecord | null {
  return discordRoleSyncAuditStore[id] ?? null;
}

export function findDiscordRoleSyncAuditRecordByExecutionHash(
  executionHash: string
): DiscordRoleSyncAuditRecord | null {
  const records = Object.values(discordRoleSyncAuditStore);
  return records.find((record) => record.executionHash === executionHash) ?? null;
}

export function findDiscordRoleSyncAuditRecordByIdempotencyKey(
  idempotencyKey: string
): DiscordRoleSyncAuditRecord | null {
  const records = Object.values(discordRoleSyncAuditStore);
  return records.find((record) => record.idempotencyKey === idempotencyKey) ?? null;
}

export function getDiscordRoleSyncAuditRecords(params?: {
  limit?: number;
  offset?: number;
}): DiscordRoleSyncAuditRecord[] {
  const limit = Math.min(Math.max(params?.limit ?? 25, 1), 100);
  const offset = Math.max(params?.offset ?? 0, 0);

  return Object.values(discordRoleSyncAuditStore)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(offset, offset + limit);
}

export function getDiscordRoleSyncAuditRecordsByUserId(
  userId: string,
  params?: {
    limit?: number;
    offset?: number;
  }
): DiscordRoleSyncAuditRecord[] {
  const limit = Math.min(Math.max(params?.limit ?? 25, 1), 100);
  const offset = Math.max(params?.offset ?? 0, 0);

  return Object.values(discordRoleSyncAuditStore)
    .filter((record) => record.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(offset, offset + limit);
}