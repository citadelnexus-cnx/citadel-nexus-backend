// backend/src/services/discordRoleMutationService.ts
import { executeDiscordRoleSyncAttempt } from "./discordRoleSyncExecutionService";
import {
  updateDiscordRoleSyncAuditRecord,
  type DiscordRoleSyncAuditStatus,
  type DiscordRoleSyncExecutionSource,
} from "./discordRoleSyncAuditStore";

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

function sortValues(values: string[]): string[] {
  return [...values].sort();
}

function normalizeRoleIds(values: string[]): string[] {
  return sortValues(unique(values));
}

export type DiscordRoleMutationResult = {
  userId: string;
  mutationApplied: boolean;
  mutationBlocked: boolean;
  mutationReason: string | null;
  auditId: string;
  executionSource: DiscordRoleSyncExecutionSource;
  beforeRoleIds: string[];
  addedRoleIds: string[];
  removedRoleIds: string[];
  finalRoleIds: string[];
  auditStatusAfterMutation: DiscordRoleSyncAuditStatus;
};

export async function mutateDiscordRolesForUser(params: {
  userId: string;
  currentMemberRoleIds: string[];
  executionSource: DiscordRoleSyncExecutionSource;
  idempotencyKey?: string;
}): Promise<DiscordRoleMutationResult | null> {
  const executionResult = await executeDiscordRoleSyncAttempt({
    userId: params.userId,
    currentMemberRoleIds: params.currentMemberRoleIds,
    executionSource: params.executionSource,
    idempotencyKey: params.idempotencyKey,
  });

  if (!executionResult) {
    return null;
  }

  const { decision, auditRecord, meta } = executionResult;

  const beforeRoleIds = normalizeRoleIds(decision.currentMemberRoleIds);
  const addedRoleIds = normalizeRoleIds(decision.desiredAddRoleIds);
  const removedRoleIds = normalizeRoleIds(decision.desiredRemoveRoleIds);

  if (!decision.canExecute) {
    const blockedStatus: DiscordRoleSyncAuditStatus = "blocked";

    await updateDiscordRoleSyncAuditRecord(auditRecord.id, {
      status: blockedStatus,
    });

    return {
      userId: decision.userId,
      mutationApplied: false,
      mutationBlocked: true,
      mutationReason: "Decision cannot execute",
      auditId: auditRecord.id,
      executionSource: params.executionSource,
      beforeRoleIds,
      addedRoleIds: [],
      removedRoleIds: [],
      finalRoleIds: normalizeRoleIds(
        auditRecord.finalMemberRoleIds ?? beforeRoleIds
      ),
      auditStatusAfterMutation: blockedStatus,
    };
  }

  const finalRoleIds = normalizeRoleIds(
    beforeRoleIds
      .filter((roleId) => !removedRoleIds.includes(roleId))
      .concat(addedRoleIds)
  );

  const isNoOp =
    meta.isNoOp === true ||
    JSON.stringify(beforeRoleIds) === JSON.stringify(finalRoleIds);

  const nextStatus: DiscordRoleSyncAuditStatus = isNoOp ? "no_op" : "mutated";

  await updateDiscordRoleSyncAuditRecord(auditRecord.id, {
    status: nextStatus,
    finalMemberRoleIds: finalRoleIds,
  });

  return {
    userId: decision.userId,
    mutationApplied: !isNoOp,
    mutationBlocked: false,
    mutationReason: null,
    auditId: auditRecord.id,
    executionSource: params.executionSource,
    beforeRoleIds,
    addedRoleIds: isNoOp ? [] : addedRoleIds,
    removedRoleIds: isNoOp ? [] : removedRoleIds,
    finalRoleIds,
    auditStatusAfterMutation: nextStatus,
  };
}