// backend/src/services/discordRoleSyncVerificationService.ts
import {
  getDiscordRoleSyncAuditRecord,
  updateDiscordRoleSyncAuditRecord,
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

function sameRoleSet(a: string[], b: string[]): boolean {
  return JSON.stringify(normalizeRoleIds(a)) === JSON.stringify(normalizeRoleIds(b));
}

export type DiscordRoleSyncVerificationResult = {
  auditId: string;
  verificationPassed: boolean;
  expectedRoleIds: string[];
  actualRoleIds: string[];
  mismatch: {
    missing: string[];
    unexpected: string[];
  };
};

export function verifyDiscordRoleSyncResult(params: {
  auditId: string;
  actualMemberRoleIds: string[];
}): DiscordRoleSyncVerificationResult | null {
  const record = getDiscordRoleSyncAuditRecord(params.auditId);
  if (!record) return null;

  const expectedRoleIds = normalizeRoleIds(record.finalMemberRoleIds ?? []);
  const actualRoleIds = normalizeRoleIds(params.actualMemberRoleIds ?? []);

  const verificationPassed = sameRoleSet(expectedRoleIds, actualRoleIds);

  const missing = expectedRoleIds.filter((roleId) => !actualRoleIds.includes(roleId));
  const unexpected = actualRoleIds.filter((roleId) => !expectedRoleIds.includes(roleId));

  const nextStatus = verificationPassed ? "verified" : "failed";

  updateDiscordRoleSyncAuditRecord(record.id, {
    verificationPassed,
    status: nextStatus,
  });

  return {
    auditId: record.id,
    verificationPassed,
    expectedRoleIds,
    actualRoleIds,
    mismatch: {
      missing,
      unexpected,
    },
  };
}