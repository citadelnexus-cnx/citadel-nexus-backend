//backend/src/services/ascensionAdminService.ts
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import {
  createAscensionAdminAction,
  createAscensionAdminSnapshot,
  getLatestAscensionSnapshotForUser,
} from "./ascensionAuditService";
import { getAscensionProfileByUserId } from "./ascensionProfileService";

const RATE_LIMIT_MS = 2000;
const rateLimitMap = new Map<string, number>();

function checkRateLimit(adminId: string, commandKey: string): void {
  const key = `${adminId}:${commandKey}`;
  const last = rateLimitMap.get(key) ?? 0;
  const now = Date.now();

  if (now - last < RATE_LIMIT_MS) {
    const remaining = ((RATE_LIMIT_MS - (now - last)) / 1000).toFixed(1);
    throw new Error(`Rate limit: wait ${remaining}s before using this command again.`);
  }

  rateLimitMap.set(key, now);
}

const STARTER_BUILDINGS = {
  knowledge_core: 1,
  trade_hub: 1,
  power_reactor: 1,
  security_layer: 1,
};

function toBuildingsJsonInput(value: unknown): Prisma.InputJsonValue {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return value as Prisma.InputJsonValue;
  }

  return STARTER_BUILDINGS as Prisma.InputJsonValue;
}

const STARTER_STATE = {
  stage: 1,
  rank: "initiate",
  xp: 0,
  level: 1,
  nodeScore: 0,
  sessionCount: 0,
  missionsCompleted: 0,
  isLocked: false,
  lockReason: null,
  power: 5,
  maxPower: 10,
  credits: 50,
  intel: 10,
  lastClaimAt: null,
  buildingsJson: STARTER_BUILDINGS,
};

export async function getAscensionPlayerView(targetUserId: string) {
  return getAscensionProfileByUserId(targetUserId);
}

export async function lockAscensionPlayer(input: {
  adminUserId: string;
  adminUsername?: string | null;
  targetUserId: string;
  reason: string;
}) {
  checkRateLimit(input.adminUserId, "lock_player");

  const profile = await getAscensionProfileByUserId(input.targetUserId);
  if (!profile) throw new Error("Ascension profile not found.");
  if (profile.isLocked) throw new Error("Player is already locked.");

  const updated = await prisma.ascensionProfile.update({
    where: { userId: input.targetUserId },
    data: {
      isLocked: true,
      lockReason: input.reason,
    },
  });

  await createAscensionAdminAction({
    adminUserId: input.adminUserId,
    adminUsername: input.adminUsername ?? null,
    targetUserId: input.targetUserId,
    targetUsername: profile.username,
    actionType: "lock_player",
    valueBefore: false,
    valueAfter: true,
    reason: input.reason,
  });

  return updated;
}

export async function unlockAscensionPlayer(input: {
  adminUserId: string;
  adminUsername?: string | null;
  targetUserId: string;
  reason: string;
}) {
  checkRateLimit(input.adminUserId, "unlock_player");

  const profile = await getAscensionProfileByUserId(input.targetUserId);
  if (!profile) throw new Error("Ascension profile not found.");
  if (!profile.isLocked) throw new Error("Player is not locked.");

  const updated = await prisma.ascensionProfile.update({
    where: { userId: input.targetUserId },
    data: {
      isLocked: false,
      lockReason: null,
    },
  });

  await createAscensionAdminAction({
    adminUserId: input.adminUserId,
    adminUsername: input.adminUsername ?? null,
    targetUserId: input.targetUserId,
    targetUsername: profile.username,
    actionType: "unlock_player",
    valueBefore: true,
    valueAfter: false,
    reason: input.reason,
  });

  return updated;
}

export async function resetAscensionPlayer(input: {
  adminUserId: string;
  adminUsername?: string | null;
  targetUserId: string;
  reason: string;
}) {
  const profile = await getAscensionProfileByUserId(input.targetUserId);
  if (!profile) throw new Error("Ascension profile not found.");

  const action = await createAscensionAdminAction({
    adminUserId: input.adminUserId,
    adminUsername: input.adminUsername ?? null,
    targetUserId: input.targetUserId,
    targetUsername: profile.username,
    actionType: "reset_player",
    valueBefore: profile,
    valueAfter: {
      ...STARTER_STATE,
      guardian: profile.guardian,
      username: profile.username,
      discordId: profile.discordId,
    },
    reason: input.reason,
  });

  await createAscensionAdminSnapshot({
    actionId: action.id,
    targetUserId: input.targetUserId,
    snapshotType: "pre_reset",
    profileState: profile,
    inventoryState: null,
  });

  return prisma.ascensionProfile.update({
    where: { userId: input.targetUserId },
    data: {
      ...STARTER_STATE,
    },
  });
}

export async function deleteAscensionPlayer(input: {
  adminUserId: string;
  adminUsername?: string | null;
  targetUserId: string;
  reason: string;
}) {
  const profile = await getAscensionProfileByUserId(input.targetUserId);
  if (!profile) throw new Error("Ascension profile not found.");

  const action = await createAscensionAdminAction({
    adminUserId: input.adminUserId,
    adminUsername: input.adminUsername ?? null,
    targetUserId: input.targetUserId,
    targetUsername: profile.username,
    actionType: "delete_player",
    valueBefore: profile,
    reason: input.reason,
  });

  await createAscensionAdminSnapshot({
    actionId: action.id,
    targetUserId: input.targetUserId,
    snapshotType: "pre_delete",
    profileState: profile,
    inventoryState: null,
  });

  await prisma.ascensionProfile.delete({
    where: { userId: input.targetUserId },
  });

  return { deleted: true, username: profile.username };
}

export async function restoreAscensionPlayer(input: {
  adminUserId: string;
  adminUsername?: string | null;
  targetUserId: string;
  reason: string;
}) {
  const snapshot = await getLatestAscensionSnapshotForUser(input.targetUserId, [
    "pre_reset",
    "pre_delete",
  ]);

  if (!snapshot) {
    throw new Error("No restorable snapshot found for this player.");
  }

  const state = snapshot.profileState as Record<string, unknown> | null;
  if (!state) {
    throw new Error("Snapshot exists but profileState is empty.");
  }

  const saved = await prisma.ascensionProfile.upsert({
    where: { userId: input.targetUserId },
    update: {
      discordId: (state.discordId as string | null) ?? null,
      username: String(state.username ?? ""),
      guardian: String(state.guardian ?? "nova"),
      stage: Number(state.stage ?? 1),
      rank: String(state.rank ?? "initiate"),
      xp: Number(state.xp ?? 0),
      level: Number(state.level ?? 1),
      nodeScore: Number(state.nodeScore ?? 0),
      sessionCount: Number(state.sessionCount ?? 0),
      missionsCompleted: Number(state.missionsCompleted ?? 0),
      isLocked: Boolean(state.isLocked ?? false),
      lockReason: (state.lockReason as string | null) ?? null,
      power: Number(state.power ?? 5),
      maxPower: Number(state.maxPower ?? 10),
      credits: Number(state.credits ?? 50),
      intel: Number(state.intel ?? 10),
      lastClaimAt: state.lastClaimAt ? new Date(String(state.lastClaimAt)) : null,
      buildingsJson: toBuildingsJsonInput(state.buildingsJson),
    },
    create: {
      userId: input.targetUserId,
      discordId: (state.discordId as string | null) ?? null,
      username: String(state.username ?? ""),
      guardian: String(state.guardian ?? "nova"),
      stage: Number(state.stage ?? 1),
      rank: String(state.rank ?? "initiate"),
      xp: Number(state.xp ?? 0),
      level: Number(state.level ?? 1),
      nodeScore: Number(state.nodeScore ?? 0),
      sessionCount: Number(state.sessionCount ?? 0),
      missionsCompleted: Number(state.missionsCompleted ?? 0),
      isLocked: Boolean(state.isLocked ?? false),
      lockReason: (state.lockReason as string | null) ?? null,
      power: Number(state.power ?? 5),
      maxPower: Number(state.maxPower ?? 10),
      credits: Number(state.credits ?? 50),
      intel: Number(state.intel ?? 10),
      lastClaimAt: state.lastClaimAt ? new Date(String(state.lastClaimAt)) : null,
      buildingsJson: toBuildingsJsonInput(state.buildingsJson),
    },
  });

  await createAscensionAdminAction({
    adminUserId: input.adminUserId,
    adminUsername: input.adminUsername ?? null,
    targetUserId: input.targetUserId,
    targetUsername: saved.username,
    actionType: "restore_player",
    valueAfter: {
      restoredFromSnapshotId: snapshot.id,
      snapshotType: snapshot.snapshotType,
    },
    reason: input.reason,
    metadataJson: {
      snapshotId: snapshot.id,
      snapshotType: snapshot.snapshotType,
    },
  });

  return saved;
}