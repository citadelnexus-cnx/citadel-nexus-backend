// backend/src/services/discordSyncWorkerService.ts

import {
  getDiscordRoleIdForKey,
  discordRoleMap,
  type BackendRoleKey,
} from "../config/discordRoleMap";
import {
  getRoleSyncPayload,
  type RoleSyncPayload,
} from "./roleSyncService";

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

function sortStrings(values: string[]): string[] {
  return [...values].sort();
}

export type DiscordSyncDecision = {
  userId: string;
  contractVersion: string;
  canExecute: boolean;
  reasonsBlocked: string[];
  unresolvedRoleKeys: string[];
  desiredAddRoleIds: string[];
  desiredRemoveRoleIds: string[];
  currentMemberRoleIds: string[];
  payload: RoleSyncPayload;
  warnings: string[];
  unsupportedTempAccessType: string | null;
};

export async function buildDiscordSyncDecision(
  userId: string,
  currentMemberRoleIds: string[]
): Promise<DiscordSyncDecision | null> {
  const payload = await getRoleSyncPayload(userId);
  if (!payload) return null;

  const normalizedCurrentMemberRoleIds = sortStrings(unique(currentMemberRoleIds));
  const desiredAddRoleIds: string[] = [];
  const desiredRemoveRoleIds: string[] = [];
  const unresolvedRoleKeys: string[] = [];
  const reasonsBlocked: string[] = [];

  for (const key of payload.shouldHaveRoles) {
    const roleId = getDiscordRoleIdForKey(key as BackendRoleKey);

    if (!roleId) {
      unresolvedRoleKeys.push(key);
      continue;
    }

    if (!normalizedCurrentMemberRoleIds.includes(roleId)) {
      desiredAddRoleIds.push(roleId);
    }
  }

  for (const key of payload.shouldNotHaveRoles) {
    const roleId = getDiscordRoleIdForKey(key as BackendRoleKey);

    if (!roleId) {
      unresolvedRoleKeys.push(key);
      continue;
    }

    if (normalizedCurrentMemberRoleIds.includes(roleId)) {
      desiredRemoveRoleIds.push(roleId);
    }
  }

  if (payload.unsupportedTempAccessType) {
    reasonsBlocked.push(
      `Unsupported temp access type present: ${payload.unsupportedTempAccessType}`
    );
  }

  if (payload.warnings.length > 0) {
    reasonsBlocked.push(...payload.warnings);
  }

  if (unresolvedRoleKeys.length > 0) {
    reasonsBlocked.push(
      "One or more backend role keys do not have usable Discord role IDs"
    );
  }

  return {
    userId,
    contractVersion: payload.contractVersion,
    canExecute: reasonsBlocked.length === 0,
    reasonsBlocked: unique(reasonsBlocked),
    unresolvedRoleKeys: sortStrings(unique(unresolvedRoleKeys)),
    desiredAddRoleIds: sortStrings(unique(desiredAddRoleIds)),
    desiredRemoveRoleIds: sortStrings(unique(desiredRemoveRoleIds)),
    currentMemberRoleIds: normalizedCurrentMemberRoleIds,
    payload,
    warnings: unique(payload.warnings ?? []),
    unsupportedTempAccessType: payload.unsupportedTempAccessType ?? null,
  };
}

export async function buildAllDiscordSyncDecisions(
  memberRoleStateByUserId: Record<string, string[]>
): Promise<DiscordSyncDecision[]> {
  const decisions = await Promise.all(
    Object.entries(memberRoleStateByUserId).map(([userId, roleIds]) =>
      buildDiscordSyncDecision(userId, roleIds)
    )
  );

  return decisions.filter(
    (item): item is DiscordSyncDecision => item !== null
  );
}

export function getRoleKeyToRoleIdPreview(): Record<string, string | null> {
  const preview: Record<string, string | null> = {};

  for (const key of Object.keys(discordRoleMap) as BackendRoleKey[]) {
    preview[key] = getDiscordRoleIdForKey(key);
  }

  return preview;
}