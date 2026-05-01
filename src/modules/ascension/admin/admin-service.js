/**
 * ============================================================
 * CITADEL ASCENSION — Admin Service Layer
 * Prisma/Supabase-backed founder control logic
 * Every action is logged to AscensionAdminAction / Snapshot
 * ============================================================
 */

const { prisma } = require("../../../lib/prisma");

const RATE_LIMIT_MS = 2000;
const rateLimitMap = new Map();

const LIMITS = {
  MAX_XP_GRANT: 100_000,
  MAX_RESOURCE_GRANT: 1_000_000
};

const VALID_RESOURCES = ["credits", "intel", "power", "node_score"];

const STARTER_BUILDINGS = {
  knowledge_core: 1,
  trade_hub: 1,
  power_reactor: 1,
  security_layer: 1
};

const STARTER_STATE = {
  stage: 1,
  rank: "initiate",
  xp: 0,
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
  buildingsJson: STARTER_BUILDINGS
};

const PHASE_CAPS = {
  1: { stage: 2, building: 2 },
  2: { stage: 3, building: 3 },
  3: { stage: 4, building: 4 },
  4: { stage: 5, building: 5 }
};

const RANK_LADDER = [
  { rank: "initiate", xp_required: 0 },
  { rank: "operator", xp_required: 500 },
  { rank: "builder", xp_required: 1500 },
  { rank: "architect", xp_required: 5000 },
  { rank: "warden", xp_required: 15000 },
  { rank: "sentinel", xp_required: 40000 }
];

const EVOLUTION_STAGES = [
  { stage: 1, node_score_required: 0 },
  { stage: 2, node_score_required: 50 },
  { stage: 3, node_score_required: 200 },
  { stage: 4, node_score_required: 750 },
  { stage: 5, node_score_required: 2500 }
];

function getAdminMode() {
  return (process.env.ADMIN_MODE || "dev").trim().toLowerCase();
}

function isDevMode() {
  return getAdminMode() === "dev";
}

function isStrictEconomy() {
  return process.env.STRICT_ECONOMY === "true";
}

function isGlobalResetEnabled() {
  return process.env.ALLOW_GLOBAL_RESET === "true";
}

function getAdminModeStatus() {
  return {
    adminMode: getAdminMode(),
    currentPhase: Number(process.env.CURRENT_PHASE || 1),
    strictEconomy: isStrictEconomy(),
    allowGlobalReset: isGlobalResetEnabled(),
    phaseCaps: PHASE_CAPS
  };
}

function assertAdminMutationAllowed(actionType) {
  const destructiveActions = new Set([
    "reset_player",
    "delete_player",
    "reset_all"
  ]);

  if (!isDevMode() && destructiveActions.has(actionType)) {
    throw new Error(`Admin action "${actionType}" is disabled in ${getAdminMode()} mode.`);
  }

  if (
    !isDevMode() &&
    actionType === "grant_resource"
  ) {
    throw new Error("Direct node_score admin mutation is disabled outside dev mode.");
  }
}

function checkRateLimit(adminId, commandKey) {
  const key = `${adminId}:${commandKey}`;
  const last = rateLimitMap.get(key) || 0;
  const now = Date.now();

  if (now - last < RATE_LIMIT_MS) {
    const remaining = ((RATE_LIMIT_MS - (now - last)) / 1000).toFixed(1);
    throw new Error(`Rate limit: wait ${remaining}s before using this command again.`);
  }

  rateLimitMap.set(key, now);
}

function calcRank(xp) {
  let rank = "initiate";
  for (const tier of RANK_LADDER) {
    if (xp >= tier.xp_required) rank = tier.rank;
  }
  return rank;
}

function calcStage(nodeScore) {
  let stage = 1;
  for (const s of EVOLUTION_STAGES) {
    if (nodeScore >= s.node_score_required) stage = s.stage;
  }
  return stage;
}

function getBuildingsJson(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return {
      knowledge_core: Number(value.knowledge_core ?? 1),
      trade_hub: Number(value.trade_hub ?? 1),
      power_reactor: Number(value.power_reactor ?? 1),
      security_layer: Number(value.security_layer ?? 1)
    };
  }

  return { ...STARTER_BUILDINGS };
}

function mapResourceKey(resourceType) {
  switch (resourceType) {
    case "node_score":
      return "nodeScore";
    case "power":
      return "power";
    case "credits":
      return "credits";
    case "intel":
      return "intel";
    default:
      throw new Error(`Invalid resource. Use: ${VALID_RESOURCES.join(", ")}`);
  }
}

function toLegacyPlayerShape(user, profile) {
  const buildings = getBuildingsJson(profile.buildingsJson);

  return {
    user_id: user.discordId || null,
    platform_user_id: user.id,
    username: profile.username,
    guardian: profile.guardian,
    stage: profile.stage,
    rank: profile.rank,
    xp: profile.xp,
    level: profile.level,
    node_score: profile.nodeScore,
    session_count: profile.sessionCount,
    missions_completed: profile.missionsCompleted,
    is_locked: profile.isLocked,
    lock_reason: profile.lockReason,
    power: profile.power,
    max_power: profile.maxPower,
    credits: profile.credits,
    intel: profile.intel,
    last_claim: profile.lastClaimAt,
    buildings,
    created_at: profile.createdAt,
    updated_at: profile.updatedAt
  };
}

async function log(opts) {
  return prisma.ascensionAdminAction.create({
    data: {
      adminUserId: opts.admin_user_id,
      adminUsername: opts.admin_username || "founder",
      targetUserId: opts.target_user_id || null,
      targetUsername: opts.target_username || null,
      actionType: opts.action_type,
      resourceType: opts.resource_type || null,
      amount: opts.amount ?? null,
      valueBefore: opts.value_before ?? null,
      valueAfter: opts.value_after ?? null,
      reason: opts.reason,
      metadataJson: opts.metadata ?? {}
    }
  });
}

async function snapshot(actionId, targetUserId, type, playerState, inventoryState = null) {
  return prisma.ascensionAdminSnapshot.create({
    data: {
      actionId: String(actionId),
      targetUserId,
      snapshotType: type,
      profileState: playerState ?? null,
      inventoryState: inventoryState ?? null
    }
  });
}

async function resolveTargetByDiscordId(discordId) {
  const user = await prisma.user.findUnique({
    where: { discordId },
    include: { ascensionProfile: true }
  });

  if (!user) {
    throw new Error("No platform user linked to that Discord account.");
  }

  if (!user.ascensionProfile) {
    throw new Error("Ascension profile not found for that user.");
  }

  return {
    user,
    profile: user.ascensionProfile
  };
}

async function getPool() {
  let pool = await prisma.ascensionPrizePool.findUnique({
    where: { poolName: "main" }
  });

  if (!pool) {
    pool = await prisma.ascensionPrizePool.create({
      data: { poolName: "main" }
    });
  }

  return pool;
}

function checkEconomyMode(actionType) {
  const strict = isStrictEconomy();
  if (!strict) return;

  const poolOnlyActions = [
    "add_xp",
    "remove_xp",
    "set_xp",
    "grant_resource",
    "set_resource"
  ];

  if (poolOnlyActions.includes(actionType)) {
    throw new Error(
      "STRICT_ECONOMY mode is active. Direct XP/resource injection is disabled. Use /admin_prize_pool_award instead."
    );
  }
}

// ─── A. INSPECTION ────────────────────────────────────────────

async function getPlayerView(targetDiscordId) {
  const { user, profile } = await resolveTargetByDiscordId(targetDiscordId);
  return toLegacyPlayerShape(user, profile);
}

async function getInventoryView(_targetDiscordId) {
  return {
    relic_count: 0,
    artifact_count: 0,
    cosmetic_count: 0,
    collectible_count: 0,
    title_count: 0,
    equipped_relics: 0,
    rarity_summary: {
      common: 0,
      uncommon: 0,
      rare: 0,
      epic: 0,
      legendary: 0
    },
    total_items: 0,
    unavailable: true
  };
}

// ─── B. XP CONTROL ───────────────────────────────────────────

async function addXP(adminId, adminName, targetDiscordId, amount, reason) {
  checkRateLimit(adminId, "add_xp");
  checkEconomyMode("add_xp");

  if (amount <= 0 || amount > LIMITS.MAX_XP_GRANT) {
    throw new Error(`Amount must be 1–${LIMITS.MAX_XP_GRANT}.`);
  }

  const { user, profile } = await resolveTargetByDiscordId(targetDiscordId);

  const before = profile.xp;
  const after = before + amount;
  const rank = calcRank(after);

  await prisma.ascensionProfile.update({
    where: { userId: user.id },
    data: { xp: after, rank }
  });

  await log({
    admin_user_id: adminId,
    admin_username: adminName,
    target_user_id: user.id,
    target_username: profile.username,
    action_type: "add_xp",
    amount,
    value_before: before,
    value_after: after,
    reason
  });

  return { before, after, rank };
}

async function removeXP(adminId, adminName, targetDiscordId, amount, reason) {
  checkRateLimit(adminId, "remove_xp");
  checkEconomyMode("remove_xp");

  if (amount <= 0 || amount > LIMITS.MAX_XP_GRANT) {
    throw new Error(`Amount must be 1–${LIMITS.MAX_XP_GRANT}.`);
  }

  const { user, profile } = await resolveTargetByDiscordId(targetDiscordId);

  const before = profile.xp;
  const after = Math.max(0, before - amount);
  const rank = calcRank(after);

  await prisma.ascensionProfile.update({
    where: { userId: user.id },
    data: { xp: after, rank }
  });

  await log({
    admin_user_id: adminId,
    admin_username: adminName,
    target_user_id: user.id,
    target_username: profile.username,
    action_type: "remove_xp",
    amount,
    value_before: before,
    value_after: after,
    reason
  });

  return { before, after, rank };
}

async function setXP(adminId, adminName, targetDiscordId, value, reason) {
  checkRateLimit(adminId, "set_xp");
  checkEconomyMode("set_xp");

  if (value < 0) {
    throw new Error("Value must be >= 0.");
  }

  const { user, profile } = await resolveTargetByDiscordId(targetDiscordId);

  const before = profile.xp;
  const after = value;
  const rank = calcRank(after);

  await prisma.ascensionProfile.update({
    where: { userId: user.id },
    data: { xp: after, rank }
  });

  await log({
    admin_user_id: adminId,
    admin_username: adminName,
    target_user_id: user.id,
    target_username: profile.username,
    action_type: "set_xp",
    value_before: before,
    value_after: after,
    reason
  });

  return { before, after, rank };
}

// ─── C. RESOURCE CONTROL ─────────────────────────────────────

async function grantResource(adminId, adminName, targetDiscordId, resourceType, amount, reason) {
  checkRateLimit(adminId, "grant_resource");
  checkEconomyMode("grant_resource");

  if (!VALID_RESOURCES.includes(resourceType)) {
    throw new Error(`Invalid resource. Use: ${VALID_RESOURCES.join(", ")}`);
  }

  if (amount <= 0 || amount > LIMITS.MAX_RESOURCE_GRANT) {
    throw new Error("Invalid amount.");
  }

  if (resourceType === "node_score") {
    assertAdminMutationAllowed("grant_resource");
  }

  const { user, profile } = await resolveTargetByDiscordId(targetDiscordId);
  const key = mapResourceKey(resourceType);
  const before = profile[key];

  let after;
  if (resourceType === "power") {
    after = Math.min(profile.maxPower, profile.power + amount);
  } else {
    after = (before || 0) + amount;
  }

  const updateData = { [key]: after };

  if (resourceType === "node_score") {
    updateData.stage = calcStage(after);
  }

  await prisma.ascensionProfile.update({
    where: { userId: user.id },
    data: updateData
  });

  await log({
    admin_user_id: adminId,
    admin_username: adminName,
    target_user_id: user.id,
    target_username: profile.username,
    action_type: "grant_resource",
    resource_type: resourceType,
    amount,
    value_before: before,
    value_after: after,
    reason
  });

  return { resource: resourceType, before, after };
}

async function removeResource(adminId, adminName, targetDiscordId, resourceType, amount, reason) {
  checkRateLimit(adminId, "remove_resource");

  if (!VALID_RESOURCES.includes(resourceType)) {
    throw new Error("Invalid resource.");
  }

  if (amount <= 0) {
    throw new Error("Amount must be positive.");
  }

  const { user, profile } = await resolveTargetByDiscordId(targetDiscordId);
  const key = mapResourceKey(resourceType);
  const before = profile[key];
  const after = Math.max(0, (before || 0) - amount);

  const updateData = { [key]: after };

  if (resourceType === "node_score") {
    updateData.stage = calcStage(after);
  }

  await prisma.ascensionProfile.update({
    where: { userId: user.id },
    data: updateData
  });

  await log({
    admin_user_id: adminId,
    admin_username: adminName,
    target_user_id: user.id,
    target_username: profile.username,
    action_type: "remove_resource",
    resource_type: resourceType,
    amount,
    value_before: before,
    value_after: after,
    reason
  });

  return { resource: resourceType, before, after };
}

async function setResource(adminId, adminName, targetDiscordId, resourceType, value, reason) {
  checkRateLimit(adminId, "set_resource");
  checkEconomyMode("set_resource");

  if (!VALID_RESOURCES.includes(resourceType)) {
    throw new Error("Invalid resource.");
  }

  if (value < 0) {
    throw new Error("Value must be >= 0.");
  }

  if (resourceType === "node_score") {
    assertAdminMutationAllowed("grant_resource");
  }

  const { user, profile } = await resolveTargetByDiscordId(targetDiscordId);
  const key = mapResourceKey(resourceType);
  const before = profile[key];

  let after;
  if (resourceType === "power") {
    after = Math.min(profile.maxPower, value);
  } else {
    after = value;
  }

  const updateData = { [key]: after };

  if (resourceType === "node_score") {
    updateData.stage = calcStage(after);
  }

  await prisma.ascensionProfile.update({
    where: { userId: user.id },
    data: updateData
  });

  await log({
    admin_user_id: adminId,
    admin_username: adminName,
    target_user_id: user.id,
    target_username: profile.username,
    action_type: "set_resource",
    resource_type: resourceType,
    value_before: before,
    value_after: after,
    reason
  });

  return { resource: resourceType, before, after };
}

// ─── D. PLAYER STATE CONTROL ─────────────────────────────────

async function resetPlayer(adminId, adminName, targetDiscordId, reason) {
  assertAdminMutationAllowed("reset_player");

  const { user, profile } = await resolveTargetByDiscordId(targetDiscordId);
  const stateBefore = toLegacyPlayerShape(user, profile);

  const actionDoc = await log({
    admin_user_id: adminId,
    admin_username: adminName,
    target_user_id: user.id,
    target_username: profile.username,
    action_type: "reset_player",
    value_before: stateBefore,
    value_after: { ...STARTER_STATE, guardian: profile.guardian },
    reason
  });

  await snapshot(actionDoc.id, user.id, "pre_reset", stateBefore, null);

  await prisma.ascensionProfile.update({
    where: { userId: user.id },
    data: {
      ...STARTER_STATE,
      guardian: profile.guardian,
      username: profile.username,
      discordId: user.discordId
    }
  });

  return { username: profile.username, guardian: profile.guardian };
}

async function deletePlayer(adminId, adminName, targetDiscordId, reason) {
  assertAdminMutationAllowed("delete_player");

  const { user, profile } = await resolveTargetByDiscordId(targetDiscordId);
  const stateBefore = toLegacyPlayerShape(user, profile);

  const actionDoc = await log({
    admin_user_id: adminId,
    admin_username: adminName,
    target_user_id: user.id,
    target_username: profile.username,
    action_type: "delete_player",
    value_before: stateBefore,
    reason
  });

  await snapshot(actionDoc.id, user.id, "pre_delete", stateBefore, null);

  await prisma.ascensionProfile.delete({
    where: { userId: user.id }
  });

  return { username: profile.username };
}

async function resetAll(adminId, adminName, reason) {
  assertAdminMutationAllowed("reset_all");

  if (!isGlobalResetEnabled()) {
    throw new Error("ALLOW_GLOBAL_RESET is not enabled. Set it in .env to use this command.");
  }

  const profiles = await prisma.ascensionProfile.findMany({
    include: { user: true }
  });

  const count = profiles.length;

  const actionDoc = await log({
    admin_user_id: adminId,
    admin_username: adminName,
    action_type: "reset_all",
    value_before: { player_count: count },
    value_after: { player_count: count, reset_to: "starter_state" },
    reason,
    metadata: {
      player_ids: profiles.map((p) => p.userId)
    }
  });

  for (const profile of profiles) {
    const stateBefore = toLegacyPlayerShape(profile.user, profile);

    await snapshot(actionDoc.id, profile.userId, "pre_bulk_reset", stateBefore, null);

    await prisma.ascensionProfile.update({
      where: { userId: profile.userId },
      data: {
        ...STARTER_STATE,
        guardian: profile.guardian,
        username: profile.username,
        discordId: profile.discordId
      }
    });
  }

  return { count };
}

async function recalcPlayer(adminId, adminName, targetDiscordId, reason) {
  const { user, profile } = await resolveTargetByDiscordId(targetDiscordId);
  const buildings = getBuildingsJson(profile.buildingsJson);

  const before = {
    rank: profile.rank,
    stage: profile.stage,
    max_power: profile.maxPower
  };

  const nextRank = calcRank(profile.xp);
  const nextStage = calcStage(profile.nodeScore);
  const nextMaxPower = 10 + (buildings.power_reactor - 1) * 2;

  await prisma.ascensionProfile.update({
    where: { userId: user.id },
    data: {
      rank: nextRank,
      stage: nextStage,
      maxPower: nextMaxPower
    }
  });

  await log({
    admin_user_id: adminId,
    admin_username: adminName,
    target_user_id: user.id,
    target_username: profile.username,
    action_type: "recalc_player",
    value_before: before,
    value_after: {
      rank: nextRank,
      stage: nextStage,
      max_power: nextMaxPower
    },
    reason
  });

  return {
    before,
    after: {
      rank: nextRank,
      stage: nextStage,
      max_power: nextMaxPower
    }
  };
}

// ─── E. PRIZE POOL ────────────────────────────────────────────

async function prizePoolView() {
  const pool = await getPool();

  return {
    total_xp_available: pool.totalXpAvailable,
    total_xp_added: pool.totalXpAdded,
    total_xp_awarded: pool.totalXpAwarded,
    total_xp_removed: pool.totalXpRemoved,
    updated_at: pool.updatedAt
  };
}

async function prizePoolAdd(adminId, adminName, amount, sourceNote, reason) {
  if (amount <= 0) {
    throw new Error("Amount must be positive.");
  }

  const pool = await getPool();

  const updated = await prisma.ascensionPrizePool.update({
    where: { id: pool.id },
    data: {
      totalXpAvailable: pool.totalXpAvailable + amount,
      totalXpAdded: pool.totalXpAdded + amount
    }
  });

  await log({
    admin_user_id: adminId,
    admin_username: adminName,
    action_type: "prize_pool_add",
    amount,
    value_before: pool.totalXpAvailable,
    value_after: updated.totalXpAvailable,
    reason,
    metadata: { source_note: sourceNote }
  });

  return {
    total_xp_available: updated.totalXpAvailable,
    total_xp_added: updated.totalXpAdded,
    total_xp_awarded: updated.totalXpAwarded,
    total_xp_removed: updated.totalXpRemoved,
    updated_at: updated.updatedAt
  };
}

async function prizePoolAward(adminId, adminName, targetDiscordId, amount, reason) {
  checkRateLimit(adminId, "prize_pool_award");

  if (amount <= 0) {
    throw new Error("Amount must be positive.");
  }

  const pool = await getPool();
  if (pool.totalXpAvailable < amount) {
    throw new Error(`Insufficient pool balance. Available: ${pool.totalXpAvailable} XP.`);
  }

  const { user, profile } = await resolveTargetByDiscordId(targetDiscordId);
  const xpBefore = profile.xp;
  const xpAfter = profile.xp + amount;
  const playerRank = calcRank(xpAfter);

  await prisma.$transaction([
    prisma.ascensionPrizePool.update({
      where: { id: pool.id },
      data: {
        totalXpAvailable: pool.totalXpAvailable - amount,
        totalXpAwarded: pool.totalXpAwarded + amount
      }
    }),
    prisma.ascensionProfile.update({
      where: { userId: user.id },
      data: {
        xp: xpAfter,
        rank: playerRank
      }
    })
  ]);

  await log({
    admin_user_id: adminId,
    admin_username: adminName,
    target_user_id: user.id,
    target_username: profile.username,
    action_type: "prize_pool_award",
    amount,
    value_before: xpBefore,
    value_after: xpAfter,
    reason,
    metadata: { pool_balance_after: pool.totalXpAvailable - amount }
  });

  return {
    player_xp_before: xpBefore,
    player_xp_after: xpAfter,
    player_rank: playerRank,
    pool_balance: pool.totalXpAvailable - amount
  };
}

async function prizePoolRemove(adminId, adminName, amount, reason) {
  if (amount <= 0) {
    throw new Error("Amount must be positive.");
  }

  const pool = await getPool();
  const before = pool.totalXpAvailable;
  const after = Math.max(0, before - amount);

  const updated = await prisma.ascensionPrizePool.update({
    where: { id: pool.id },
    data: {
      totalXpAvailable: after,
      totalXpRemoved: pool.totalXpRemoved + amount
    }
  });

  await log({
    admin_user_id: adminId,
    admin_username: adminName,
    action_type: "prize_pool_remove",
    amount,
    value_before: before,
    value_after: updated.totalXpAvailable,
    reason
  });

  return {
    total_xp_available: updated.totalXpAvailable,
    total_xp_added: updated.totalXpAdded,
    total_xp_awarded: updated.totalXpAwarded,
    total_xp_removed: updated.totalXpRemoved,
    updated_at: updated.updatedAt
  };
}

// ─── LOCK / UNLOCK ────────────────────────────────────────────

async function lockPlayer(adminId, adminName, targetDiscordId, reason) {
  const { user, profile } = await resolveTargetByDiscordId(targetDiscordId);

  if (profile.isLocked) {
    throw new Error("Player is already locked.");
  }

  await prisma.ascensionProfile.update({
    where: { userId: user.id },
    data: {
      isLocked: true,
      lockReason: reason
    }
  });

  await log({
    admin_user_id: adminId,
    admin_username: adminName,
    target_user_id: user.id,
    target_username: profile.username,
    action_type: "lock_player",
    value_before: false,
    value_after: true,
    reason
  });

  return { username: profile.username };
}

async function unlockPlayer(adminId, adminName, targetDiscordId, reason) {
  const { user, profile } = await resolveTargetByDiscordId(targetDiscordId);

  if (!profile.isLocked) {
    throw new Error("Player is not locked.");
  }

  await prisma.ascensionProfile.update({
    where: { userId: user.id },
    data: {
      isLocked: false,
      lockReason: null
    }
  });

  await log({
    admin_user_id: adminId,
    admin_username: adminName,
    target_user_id: user.id,
    target_username: profile.username,
    action_type: "unlock_player",
    value_before: true,
    value_after: false,
    reason
  });

  return { username: profile.username };
}

// ─── RESTORE ──────────────────────────────────────────────────

async function restorePlayer(adminId, adminName, targetDiscordId, reason) {
  const { user } = await resolveTargetByDiscordId(targetDiscordId);

  const snap = await prisma.ascensionAdminSnapshot.findFirst({
    where: {
      targetUserId: user.id,
      snapshotType: { in: ["pre_reset", "pre_delete"] }
    },
    orderBy: { createdAt: "desc" }
  });

  if (!snap) {
    throw new Error("No restorable snapshot found for this player.");
  }

  const state = snap.profileState;
  if (!state || typeof state !== "object") {
    throw new Error("Snapshot exists but profileState is empty.");
  }

  const buildings = getBuildingsJson(state.buildings || state.buildingsJson);

  const restored = await prisma.ascensionProfile.upsert({
    where: { userId: user.id },
    update: {
      discordId: user.discordId,
      username: state.username || user.username,
      guardian: state.guardian || "nova",
      stage: Number(state.stage ?? 1),
      rank: state.rank || "initiate",
      xp: Number(state.xp ?? 0),
      level: Number(state.level ?? 1),
      nodeScore: Number(state.node_score ?? state.nodeScore ?? 0),
      sessionCount: Number(state.session_count ?? state.sessionCount ?? 0),
      missionsCompleted: Number(state.missions_completed ?? state.missionsCompleted ?? 0),
      isLocked: Boolean(state.is_locked ?? state.isLocked ?? false),
      lockReason: state.lock_reason ?? state.lockReason ?? null,
      power: Number(state.power ?? 5),
      maxPower: Number(state.max_power ?? state.maxPower ?? 10),
      credits: Number(state.credits ?? 50),
      intel: Number(state.intel ?? 10),
      lastClaimAt: state.last_claim ?? state.lastClaimAt ?? null,
      buildingsJson: buildings
    },
    create: {
      userId: user.id,
      discordId: user.discordId,
      username: state.username || user.username,
      guardian: state.guardian || "nova",
      stage: Number(state.stage ?? 1),
      rank: state.rank || "initiate",
      xp: Number(state.xp ?? 0),
      level: Number(state.level ?? 1),
      nodeScore: Number(state.node_score ?? state.nodeScore ?? 0),
      sessionCount: Number(state.session_count ?? state.sessionCount ?? 0),
      missionsCompleted: Number(state.missions_completed ?? state.missionsCompleted ?? 0),
      isLocked: Boolean(state.is_locked ?? state.isLocked ?? false),
      lockReason: state.lock_reason ?? state.lockReason ?? null,
      power: Number(state.power ?? 5),
      maxPower: Number(state.max_power ?? state.maxPower ?? 10),
      credits: Number(state.credits ?? 50),
      intel: Number(state.intel ?? 10),
      lastClaimAt: state.last_claim ?? state.lastClaimAt ?? null,
      buildingsJson: buildings
    }
  });

  await log({
    admin_user_id: adminId,
    admin_username: adminName,
    target_user_id: user.id,
    target_username: restored.username,
    action_type: "restore_player",
    value_before: null,
    value_after: {
      restored_from_snapshot: snap.id,
      snapshot_type: snap.snapshotType,
      snapshot_date: snap.createdAt
    },
    reason,
    metadata: { snapshot_id: snap.id }
  });

  return {
    username: restored.username,
    snapshot_type: snap.snapshotType,
    snapshot_date: snap.createdAt
  };
}

// ─── BULK AWARD ───────────────────────────────────────────────

async function bulkAwardAll(adminId, adminName, amountEach, reason) {
  checkRateLimit(adminId, "bulk_award_all");

  if (amountEach <= 0) {
    throw new Error("Amount must be positive.");
  }

  const players = await prisma.ascensionProfile.findMany({
    where: { isLocked: false }
  });

  const pool = await getPool();
  const total = amountEach * players.length;

  if (pool.totalXpAvailable < total) {
    throw new Error(`Insufficient pool balance. Need ${total} XP, have ${pool.totalXpAvailable}.`);
  }

  for (const player of players) {
    const nextXp = player.xp + amountEach;
    await prisma.ascensionProfile.update({
      where: { userId: player.userId },
      data: {
        xp: nextXp,
        rank: calcRank(nextXp)
      }
    });
  }

  await prisma.ascensionPrizePool.update({
    where: { id: pool.id },
    data: {
      totalXpAvailable: pool.totalXpAvailable - total,
      totalXpAwarded: pool.totalXpAwarded + total
    }
  });

  await log({
    admin_user_id: adminId,
    admin_username: adminName,
    action_type: "bulk_award_all",
    amount: total,
    value_before: pool.totalXpAvailable,
    value_after: pool.totalXpAvailable - total,
    reason,
    metadata: {
      players_awarded: players.length,
      amount_each: amountEach
    }
  });

  return {
    players_awarded: players.length,
    total_xp_spent: total,
    pool_balance: pool.totalXpAvailable - total
  };
}

async function bulkAwardGroup(adminId, adminName, targetDiscordIds, amountEach, reason) {
  checkRateLimit(adminId, "bulk_award_group");

  if (amountEach <= 0) {
    throw new Error("Amount must be positive.");
  }

  const resolved = [];
  for (const discordId of targetDiscordIds) {
    try {
      const target = await resolveTargetByDiscordId(discordId);
      resolved.push(target);
    } catch (_err) {
      resolved.push(null);
    }
  }

  const validTargets = resolved.filter(Boolean);
  const pool = await getPool();
  const total = amountEach * validTargets.length;

  if (pool.totalXpAvailable < total) {
    throw new Error(`Insufficient pool balance. Need ${total} XP, have ${pool.totalXpAvailable}.`);
  }

  const results = [];

  for (const entry of resolved) {
    if (!entry || entry.profile.isLocked) {
      results.push({
        user_id: entry?.user?.discordId || "unknown",
        status: "skipped"
      });
      continue;
    }

    const nextXp = entry.profile.xp + amountEach;
    await prisma.ascensionProfile.update({
      where: { userId: entry.user.id },
      data: {
        xp: nextXp,
        rank: calcRank(nextXp)
      }
    });

    results.push({
      user_id: entry.user.discordId,
      username: entry.profile.username,
      new_xp: nextXp,
      status: "awarded"
    });
  }

  await prisma.ascensionPrizePool.update({
    where: { id: pool.id },
    data: {
      totalXpAvailable: pool.totalXpAvailable - total,
      totalXpAwarded: pool.totalXpAwarded + total
    }
  });

  await log({
    admin_user_id: adminId,
    admin_username: adminName,
    action_type: "bulk_award_group",
    amount: total,
    value_before: pool.totalXpAvailable,
    value_after: pool.totalXpAvailable - total,
    reason,
    metadata: {
      targets: targetDiscordIds.length,
      amount_each: amountEach,
      results
    }
  });

  return {
    awarded: results.filter((r) => r.status === "awarded").length,
    skipped: results.filter((r) => r.status === "skipped").length,
    total_xp_spent: total,
    pool_balance: pool.totalXpAvailable - total,
    results
  };
}

async function bulkAwardTop(adminId, adminName, topN, amountEach, reason) {
  checkRateLimit(adminId, "bulk_award_top");

  const top = await prisma.ascensionProfile.findMany({
    where: { isLocked: false },
    orderBy: { nodeScore: "desc" },
    take: topN,
    include: { user: true }
  });

  const discordIds = top.map((p) => p.user?.discordId).filter(Boolean);
  return bulkAwardGroup(adminId, adminName, discordIds, amountEach, reason);
}

module.exports = {
  getAdminModeStatus,
  getPlayerView,
  getInventoryView,
  addXP,
  removeXP,
  setXP,
  grantResource,
  removeResource,
  setResource,
  resetPlayer,
  deletePlayer,
  resetAll,
  recalcPlayer,
  prizePoolView,
  prizePoolAdd,
  prizePoolAward,
  prizePoolRemove,
  lockPlayer,
  unlockPlayer,
  restorePlayer,
  bulkAwardAll,
  bulkAwardGroup,
  bulkAwardTop,
  checkEconomyMode,
  PHASE_CAPS,
  VALID_RESOURCES
};