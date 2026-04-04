// backend/src/services/discordRoleSyncExecutionService.ts

import {
  buildDiscordSyncDecision,
  type DiscordSyncDecision,
} from "./discordSyncWorkerService";
import {
  buildExecutionHash,
  buildRateLimitBucket,
  buildRollbackSnapshotJson,
  createDiscordRoleSyncAuditRecord,
  findDiscordRoleSyncAuditRecordByExecutionHash,
  findDiscordRoleSyncAuditRecordByIdempotencyKey,
  updateDiscordRoleSyncAuditRecord,
  type DiscordRoleSyncAuditRecord,
  type DiscordRoleSyncExecutionSource,
} from "./discordRoleSyncAuditStore";

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

function sortValues(values: string[]): string[] {
  return [...values].sort();
}

function sameRoleSet(a: string[], b: string[]): boolean {
  return JSON.stringify(sortValues(unique(a))) === JSON.stringify(sortValues(unique(b)));
}

export type DiscordRoleSyncExecutionAttemptResult = {
  decision: DiscordSyncDecision;
  auditRecord: DiscordRoleSyncAuditRecord;
  meta: {
    reusedExisting: boolean;
    isNoOp: boolean;
    rateLimitBucket: string;
    auditSnapshotIsHistorical?: boolean;
    reuseReason?: "idempotency_key" | "execution_hash" | null;
  };
};

export async function executeDiscordRoleSyncAttempt(params: {
  userId: string;
  currentMemberRoleIds: string[];
  executionSource: DiscordRoleSyncExecutionSource;
  idempotencyKey?: string;
}): Promise<DiscordRoleSyncExecutionAttemptResult | null> {
  const decision = await buildDiscordSyncDecision(
    params.userId,
    params.currentMemberRoleIds
  );

  if (!decision) {
    return null;
  }

  const startTime = Date.now();

  const executionHash = buildExecutionHash({
    userId: decision.userId,
    contractVersion: decision.contractVersion,
    executionSource: params.executionSource,
    currentMemberRoleIds: decision.currentMemberRoleIds,
    desiredAddRoleIds: decision.desiredAddRoleIds,
    desiredRemoveRoleIds: decision.desiredRemoveRoleIds,
    canExecute: decision.canExecute,
    reasonsBlocked: decision.reasonsBlocked,
    warnings: decision.warnings ?? [],
    unsupportedTempAccessType: decision.unsupportedTempAccessType ?? null,
  });

  const rateLimitBucket = buildRateLimitBucket(decision.userId);

  let existing: DiscordRoleSyncAuditRecord | null = null;
  let reuseReason: "idempotency_key" | "execution_hash" | null = null;

  if (params.idempotencyKey) {
    existing = await findDiscordRoleSyncAuditRecordByIdempotencyKey(
      params.idempotencyKey
    );

    if (existing) {
      reuseReason = "idempotency_key";
    }
  }

  if (!existing) {
    existing = await findDiscordRoleSyncAuditRecordByExecutionHash(executionHash);

    if (existing) {
      reuseReason = "execution_hash";
    }
  }

  if (existing) {
    const persistedReuse = await updateDiscordRoleSyncAuditRecord(existing.id, {
      attemptCount: existing.attemptCount + 1,
    });

    const reusedRecord = persistedReuse ?? {
      ...existing,
      attemptCount: existing.attemptCount + 1,
    };

    return {
      decision,
      auditRecord: reusedRecord,
      meta: {
        reusedExisting: true,
        isNoOp: reusedRecord.status === "no_op",
        rateLimitBucket: reusedRecord.rateLimitBucket,
        auditSnapshotIsHistorical: true,
        reuseReason,
      },
    };
  }

  const finalMemberRoleIds = unique(
    decision.currentMemberRoleIds
      .filter((roleId) => !decision.desiredRemoveRoleIds.includes(roleId))
      .concat(decision.desiredAddRoleIds)
  );

  const isNoOp = decision.canExecute
    ? sameRoleSet(finalMemberRoleIds, decision.currentMemberRoleIds)
    : false;

  const status = !decision.canExecute
    ? "blocked"
    : isNoOp
      ? "no_op"
      : "executed";

  const executionDurationMs = Date.now() - startTime;

  const auditRecord = await createDiscordRoleSyncAuditRecord({
    executionSource: params.executionSource,
    decision,
    status,
    finalMemberRoleIds,
    verificationPassed: null,
    rollbackSnapshotJson: buildRollbackSnapshotJson(decision.currentMemberRoleIds),
    errorMessage: null,
    idempotencyKey: params.idempotencyKey,
    executionHash,
    executionDurationMs,
    attemptCount: 1,
    rateLimitBucket,
  });

  return {
    decision,
    auditRecord,
    meta: {
      reusedExisting: false,
      isNoOp,
      rateLimitBucket,
      auditSnapshotIsHistorical: false,
      reuseReason: null,
    },
  };
}