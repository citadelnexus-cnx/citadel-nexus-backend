/**
 * ============================================================
 * CITADEL ASCENSION — Admin Service Layer
 * All founder control logic. Every action is logged.
 * ============================================================
 */

const mongoose = require('mongoose');
const { AdminAction, AdminSnapshot } = require('./admin-schema');
const { PrizePool, getPool }         = require('./prize-pool-schema');

// Lazy-load player model to avoid circular deps
function getPlayerModel() {
  return mongoose.model('Player');
}

// ─── RATE LIMITER ─────────────────────────────────────────────────────────────
// Simple in-process cooldown per admin+command. Prevents accidental spam.

const _rateLimitMap = new Map();
const RATE_LIMIT_MS = 2000; // 2 seconds between same command from same admin

function checkRateLimit(adminId, commandKey) {
  const key  = `${adminId}:${commandKey}`;
  const last = _rateLimitMap.get(key) || 0;
  const now  = Date.now();
  if (now - last < RATE_LIMIT_MS) {
    const remaining = ((RATE_LIMIT_MS - (now - last)) / 1000).toFixed(1);
    throw new Error(`Rate limit: wait ${remaining}s before using this command again.`);
  }
  _rateLimitMap.set(key, now);
}



const LIMITS = {
  MAX_XP_GRANT:       100_000,
  MAX_RESOURCE_GRANT: 1_000_000,
  MAX_PRIZE_AWARD:    Infinity, // capped by pool balance
};

// ─── PHASE CAPS (v2.4) ────────────────────────────────────────────────────────

const PHASE_CAPS = {
  1: { stage: 2, building: 2 },
  2: { stage: 3, building: 3 },
  3: { stage: 4, building: 4 },
  4: { stage: 5, building: 5 }, // endgame
};

// ─── LOGGING HELPER ───────────────────────────────────────────────────────────

async function log(opts) {
  return AdminAction.create({
    admin_user_id:   opts.admin_user_id,
    admin_username:  opts.admin_username || 'founder',
    target_user_id:  opts.target_user_id  || null,
    target_username: opts.target_username || null,
    action_type:     opts.action_type,
    resource_type:   opts.resource_type   || null,
    amount:          opts.amount          ?? null,
    value_before:    opts.value_before    ?? null,
    value_after:     opts.value_after     ?? null,
    reason:          opts.reason,
    metadata:        opts.metadata        || {},
  });
}

async function snapshot(actionId, targetUserId, type, playerState, inventoryState = null) {
  return AdminSnapshot.create({
    action_id:       actionId.toString(),
    target_user_id:  targetUserId,
    snapshot_type:   type,
    player_state:    playerState,
    inventory_state: inventoryState,
  });
}

// ─── A. INSPECTION ────────────────────────────────────────────────────────────

async function getPlayerView(targetUserId) {
  const Player = getPlayerModel();
  const player = await Player.findOne({ user_id: targetUserId });
  if (!player) return null;
  return player.toObject();
}

async function getInventoryView(targetUserId) {
  // Pull from PIE schema
  const PlayerInventory = mongoose.model('PlayerInventory');
  const GeneratedItem   = mongoose.model('GeneratedItem');

  const inv = await PlayerInventory.findOne({ owner_id: targetUserId });
  if (!inv) return null;

  const allHashes = [
    ...(inv.relics || []), ...(inv.artifacts || []), ...(inv.cosmetics || []),
    ...(inv.collectibles || []), ...(inv.titles || []),
  ];

  const items = await GeneratedItem.find({ uniqueness_hash: { $in: allHashes } });

  const byRarity = { common: 0, uncommon: 0, rare: 0, epic: 0, legendary: 0 };
  items.forEach(i => { if (byRarity[i.rarity] !== undefined) byRarity[i.rarity]++; });

  return {
    relic_count:      (inv.relics        || []).length,
    artifact_count:   (inv.artifacts     || []).length,
    cosmetic_count:   (inv.cosmetics     || []).length,
    collectible_count:(inv.collectibles  || []).length,
    title_count:      (inv.titles        || []).length,
    equipped_relics:  (inv.equipped_relics || []).length,
    rarity_summary:   byRarity,
    total_items:      items.length,
  };
}

// ─── B. XP CONTROL ───────────────────────────────────────────────────────────

async function addXP(adminId, adminName, targetUserId, amount, reason) {
  checkRateLimit(adminId, 'add_xp');
  checkEconomyMode('add_xp');
  if (amount <= 0 || amount > LIMITS.MAX_XP_GRANT) {
    throw new Error(`Amount must be 1–${LIMITS.MAX_XP_GRANT}.`);
  }

  const Player = getPlayerModel();
  const player = await Player.findOne({ user_id: targetUserId });
  if (!player) throw new Error('Player not found.');

  const before = player.xp;
  player.xp   += amount;
  player.rank  = calcRank(player.xp);
  await player.save();

  await log({
    admin_user_id: adminId, admin_username: adminName,
    target_user_id: targetUserId, target_username: player.username,
    action_type: 'add_xp', amount,
    value_before: before, value_after: player.xp,
    reason,
  });

  return { before, after: player.xp, rank: player.rank };
}

async function removeXP(adminId, adminName, targetUserId, amount, reason) {
  checkRateLimit(adminId, 'remove_xp');
  if (amount <= 0 || amount > LIMITS.MAX_XP_GRANT) {
    throw new Error(`Amount must be 1–${LIMITS.MAX_XP_GRANT}.`);
  }

  const Player = getPlayerModel();
  const player = await Player.findOne({ user_id: targetUserId });
  if (!player) throw new Error('Player not found.');

  const before = player.xp;
  player.xp    = Math.max(0, player.xp - amount);
  player.rank  = calcRank(player.xp);
  await player.save();

  await log({
    admin_user_id: adminId, admin_username: adminName,
    target_user_id: targetUserId, target_username: player.username,
    action_type: 'remove_xp', amount,
    value_before: before, value_after: player.xp,
    reason,
  });

  return { before, after: player.xp, rank: player.rank };
}

async function setXP(adminId, adminName, targetUserId, value, reason) {
  if (value < 0) throw new Error('Value must be >= 0.');

  const Player = getPlayerModel();
  const player = await Player.findOne({ user_id: targetUserId });
  if (!player) throw new Error('Player not found.');

  const before = player.xp;
  player.xp    = value;
  player.rank  = calcRank(player.xp);
  await player.save();

  await log({
    admin_user_id: adminId, admin_username: adminName,
    target_user_id: targetUserId, target_username: player.username,
    action_type: 'set_xp',
    value_before: before, value_after: value,
    reason,
  });

  return { before, after: value, rank: player.rank };
}

// ─── C. RESOURCE CONTROL ─────────────────────────────────────────────────────

const VALID_RESOURCES = ['credits', 'intel', 'power', 'node_score'];

async function grantResource(adminId, adminName, targetUserId, resourceType, amount, reason) {
  checkRateLimit(adminId, 'grant_resource');
  checkEconomyMode('grant_resource');
  if (!VALID_RESOURCES.includes(resourceType)) throw new Error(`Invalid resource. Use: ${VALID_RESOURCES.join(', ')}`);
  if (amount <= 0 || amount > LIMITS.MAX_RESOURCE_GRANT) throw new Error('Invalid amount.');

  const Player = getPlayerModel();
  const player = await Player.findOne({ user_id: targetUserId });
  if (!player) throw new Error('Player not found.');

  const before = player[resourceType];
  if (resourceType === 'power') {
    player.power = Math.min(player.max_power, player.power + amount);
  } else {
    player[resourceType] = (player[resourceType] || 0) + amount;
  }
  await player.save();

  await log({
    admin_user_id: adminId, admin_username: adminName,
    target_user_id: targetUserId, target_username: player.username,
    action_type: 'grant_resource', resource_type: resourceType, amount,
    value_before: before, value_after: player[resourceType],
    reason,
  });

  return { resource: resourceType, before, after: player[resourceType] };
}

async function removeResource(adminId, adminName, targetUserId, resourceType, amount, reason) {
  if (!VALID_RESOURCES.includes(resourceType)) throw new Error(`Invalid resource.`);
  if (amount <= 0) throw new Error('Amount must be positive.');

  const Player = getPlayerModel();
  const player = await Player.findOne({ user_id: targetUserId });
  if (!player) throw new Error('Player not found.');

  const before = player[resourceType];
  player[resourceType] = Math.max(0, (player[resourceType] || 0) - amount);
  await player.save();

  await log({
    admin_user_id: adminId, admin_username: adminName,
    target_user_id: targetUserId, target_username: player.username,
    action_type: 'remove_resource', resource_type: resourceType, amount,
    value_before: before, value_after: player[resourceType],
    reason,
  });

  return { resource: resourceType, before, after: player[resourceType] };
}

async function setResource(adminId, adminName, targetUserId, resourceType, value, reason) {
  if (!VALID_RESOURCES.includes(resourceType)) throw new Error(`Invalid resource.`);
  if (value < 0) throw new Error('Value must be >= 0.');

  const Player = getPlayerModel();
  const player = await Player.findOne({ user_id: targetUserId });
  if (!player) throw new Error('Player not found.');

  const before = player[resourceType];
  if (resourceType === 'power') {
    player.power = Math.min(player.max_power, value);
  } else {
    player[resourceType] = value;
  }
  await player.save();

  await log({
    admin_user_id: adminId, admin_username: adminName,
    target_user_id: targetUserId, target_username: player.username,
    action_type: 'set_resource', resource_type: resourceType,
    value_before: before, value_after: value,
    reason,
  });

  return { resource: resourceType, before, after: value };
}

// ─── D. PLAYER STATE CONTROL ─────────────────────────────────────────────────

const STARTER_STATE = {
  stage: 1, rank: 'initiate', xp: 0, node_score: 0,
  session_count: 0, power: 5, max_power: 10,
  credits: 50, intel: 10, last_claim: null,
  buildings: { knowledge_core: 1, trade_hub: 1, power_reactor: 1, security_layer: 1 },
};

async function resetPlayer(adminId, adminName, targetUserId, reason) {
  const Player = getPlayerModel();
  const player = await Player.findOne({ user_id: targetUserId });
  if (!player) throw new Error('Player not found.');

  const stateBefore = player.toObject();

  const actionDoc = await log({
    admin_user_id: adminId, admin_username: adminName,
    target_user_id: targetUserId, target_username: player.username,
    action_type: 'reset_player',
    value_before: stateBefore,
    value_after:  { ...STARTER_STATE, guardian: player.guardian },
    reason,
  });

  await snapshot(actionDoc._id, targetUserId, 'pre_reset', stateBefore);

  // Apply starter state (preserve guardian and username)
  Object.assign(player, STARTER_STATE);
  await player.save();

  return { username: player.username, guardian: player.guardian };
}

async function deletePlayer(adminId, adminName, targetUserId, reason) {
  const Player = getPlayerModel();
  const player = await Player.findOne({ user_id: targetUserId });
  if (!player) throw new Error('Player not found.');

  const stateBefore = player.toObject();

  const actionDoc = await log({
    admin_user_id: adminId, admin_username: adminName,
    target_user_id: targetUserId, target_username: player.username,
    action_type: 'delete_player',
    value_before: stateBefore,
    reason,
  });

  await snapshot(actionDoc._id, targetUserId, 'pre_delete', stateBefore);
  await Player.deleteOne({ user_id: targetUserId });

  return { username: stateBefore.username };
}

async function resetAll(adminId, adminName, reason) {
  const isAllowed = process.env.ALLOW_GLOBAL_RESET === 'true';
  if (!isAllowed) throw new Error('ALLOW_GLOBAL_RESET is not enabled. Set it in .env to use this command.');

  const Player  = getPlayerModel();
  const players = await Player.find({});
  const count   = players.length;

  // Snapshot all players before bulk reset
  const actionDoc = await log({
    admin_user_id: adminId, admin_username: adminName,
    action_type: 'reset_all',
    value_before: { player_count: count },
    value_after:  { player_count: count, reset_to: 'starter_state' },
    reason,
    metadata: { player_ids: players.map(p => p.user_id) },
  });

  for (const player of players) {
    const stateBefore = player.toObject();
    await snapshot(actionDoc._id, player.user_id, 'pre_bulk_reset', stateBefore);
    Object.assign(player, STARTER_STATE);
    await player.save();
  }

  return { count };
}

async function recalcPlayer(adminId, adminName, targetUserId, reason) {
  const Player = getPlayerModel();
  const player = await Player.findOne({ user_id: targetUserId });
  if (!player) throw new Error('Player not found.');

  const before = { rank: player.rank, stage: player.stage, max_power: player.max_power };

  player.rank      = calcRank(player.xp);
  player.stage     = calcStage(player.node_score);
  player.max_power = 10 + (player.buildings.power_reactor - 1) * 2;
  await player.save();

  await log({
    admin_user_id: adminId, admin_username: adminName,
    target_user_id: targetUserId, target_username: player.username,
    action_type: 'recalc_player',
    value_before: before,
    value_after:  { rank: player.rank, stage: player.stage, max_power: player.max_power },
    reason,
  });

  return { before, after: { rank: player.rank, stage: player.stage, max_power: player.max_power } };
}

// ─── E. PRIZE POOL ────────────────────────────────────────────────────────────

async function prizePoolView() {
  return getPool();
}

async function prizePoolAdd(adminId, adminName, amount, sourceNote, reason) {
  if (amount <= 0) throw new Error('Amount must be positive.');

  const pool = await getPool();
  pool.total_xp_available += amount;
  pool.total_xp_added     += amount;
  pool.updated_at          = new Date();
  await pool.save();

  await log({
    admin_user_id: adminId, admin_username: adminName,
    action_type: 'prize_pool_add', amount,
    value_before: pool.total_xp_available - amount,
    value_after:  pool.total_xp_available,
    reason,
    metadata: { source_note: sourceNote },
  });

  return pool;
}

async function prizePoolAward(adminId, adminName, targetUserId, amount, reason) {
  checkRateLimit(adminId, 'prize_pool_award');
  if (amount <= 0) throw new Error('Amount must be positive.');

  const pool = await getPool();
  if (pool.total_xp_available < amount) {
    throw new Error(`Insufficient pool balance. Available: ${pool.total_xp_available} XP.`);
  }

  const Player = getPlayerModel();
  const player = await Player.findOne({ user_id: targetUserId });
  if (!player) throw new Error('Player not found.');

  const xpBefore = player.xp;

  // Deduct from pool
  pool.total_xp_available -= amount;
  pool.total_xp_awarded   += amount;
  pool.updated_at          = new Date();
  await pool.save();

  // Add to player
  player.xp   += amount;
  player.rank  = calcRank(player.xp);
  await player.save();

  await log({
    admin_user_id: adminId, admin_username: adminName,
    target_user_id: targetUserId, target_username: player.username,
    action_type: 'prize_pool_award', amount,
    value_before: xpBefore, value_after: player.xp,
    reason,
    metadata: { pool_balance_after: pool.total_xp_available },
  });

  return {
    player_xp_before: xpBefore,
    player_xp_after:  player.xp,
    player_rank:      player.rank,
    pool_balance:     pool.total_xp_available,
  };
}

async function prizePoolRemove(adminId, adminName, amount, reason) {
  if (amount <= 0) throw new Error('Amount must be positive.');

  const pool = await getPool();
  const before = pool.total_xp_available;
  pool.total_xp_available = Math.max(0, pool.total_xp_available - amount);
  pool.total_xp_removed  += amount;
  pool.updated_at         = new Date();
  await pool.save();

  await log({
    admin_user_id: adminId, admin_username: adminName,
    action_type: 'prize_pool_remove', amount,
    value_before: before, value_after: pool.total_xp_available,
    reason,
  });

  return pool;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

// v2.4 XP ladder
const RANK_LADDER = [
  { rank: 'initiate',  xp_required: 0      },
  { rank: 'operator',  xp_required: 500     },
  { rank: 'builder',   xp_required: 1_500   },
  { rank: 'architect', xp_required: 5_000   },
  { rank: 'warden',    xp_required: 15_000  },
  { rank: 'sentinel',  xp_required: 40_000  },
];

const EVOLUTION_STAGES = [
  { stage: 1, node_score_required: 0    },
  { stage: 2, node_score_required: 50   },
  { stage: 3, node_score_required: 200  },
  { stage: 4, node_score_required: 750  },
  { stage: 5, node_score_required: 2500 },
];

function calcRank(xp) {
  let rank = 'initiate';
  for (const tier of RANK_LADDER) {
    if (xp >= tier.xp_required) rank = tier.rank;
  }
  return rank;
}

function calcStage(node_score) {
  let stage = 1;
  for (const s of EVOLUTION_STAGES) {
    if (node_score >= s.node_score_required) stage = s.stage;
  }
  return stage;
}

// ─── GAP 1: PLAYER LOCK / UNLOCK ─────────────────────────────────────────────

async function lockPlayer(adminId, adminName, targetUserId, reason) {
  const Player = getPlayerModel();
  const player = await Player.findOne({ user_id: targetUserId });
  if (!player) throw new Error('Player not found.');
  if (player.is_locked) throw new Error('Player is already locked.');

  player.is_locked   = true;
  player.lock_reason = reason;
  await player.save();

  await log({
    admin_user_id: adminId, admin_username: adminName,
    target_user_id: targetUserId, target_username: player.username,
    action_type: 'lock_player',
    value_before: false, value_after: true,
    reason,
  });

  return { username: player.username };
}

async function unlockPlayer(adminId, adminName, targetUserId, reason) {
  const Player = getPlayerModel();
  const player = await Player.findOne({ user_id: targetUserId });
  if (!player) throw new Error('Player not found.');
  if (!player.is_locked) throw new Error('Player is not locked.');

  player.is_locked   = false;
  player.lock_reason = null;
  await player.save();

  await log({
    admin_user_id: adminId, admin_username: adminName,
    target_user_id: targetUserId, target_username: player.username,
    action_type: 'lock_player',
    value_before: true, value_after: false,
    reason,
    metadata: { action: 'unlock' },
  });

  return { username: player.username };
}

// ─── GAP 4: RESTORE FROM SNAPSHOT ────────────────────────────────────────────

async function restorePlayer(adminId, adminName, targetUserId, reason) {
  const Player = getPlayerModel();

  // Find the most recent pre-reset or pre-delete snapshot for this player
  const snap = await AdminSnapshot.findOne(
    { target_user_id: targetUserId, snapshot_type: { $in: ['pre_reset', 'pre_delete'] } },
    null,
    { sort: { created_at: -1 } }
  );

  if (!snap) throw new Error('No restorable snapshot found for this player.');

  const state = snap.player_state;
  if (!state) throw new Error('Snapshot exists but player_state is empty.');

  // Upsert player back to snapshot state
  await Player.findOneAndUpdate(
    { user_id: targetUserId },
    { $set: { ...state, updated_at: new Date() } },
    { upsert: true, new: true }
  );

  await log({
    admin_user_id: adminId, admin_username: adminName,
    target_user_id: targetUserId, target_username: state.username,
    action_type: 'recalc_player', // closest existing type — extend enum if desired
    value_before: null,
    value_after:  { restored_from_snapshot: snap._id, snapshot_type: snap.snapshot_type, snapshot_date: snap.created_at },
    reason,
    metadata: { snapshot_id: snap._id.toString() },
  });

  return {
    username:      state.username,
    snapshot_type: snap.snapshot_type,
    snapshot_date: snap.created_at,
  };
}

// ─── GAP 3: BULK AWARD TOOLS ─────────────────────────────────────────────────

/**
 * Award XP from prize pool to ALL current players.
 * Useful for participation rewards and season events.
 */
async function bulkAwardAll(adminId, adminName, amountEach, reason) {
  checkRateLimit(adminId, 'bulk_award_all');

  const Player = getPlayerModel();
  const players = await Player.find({ is_locked: { $ne: true } }); // skip locked
  const pool    = await getPool();
  const total   = amountEach * players.length;

  if (pool.total_xp_available < total) {
    throw new Error(`Insufficient pool balance. Need ${total} XP, have ${pool.total_xp_available}.`);
  }

  // Deduct from pool first
  pool.total_xp_available -= total;
  pool.total_xp_awarded   += total;
  pool.updated_at          = new Date();
  await pool.save();

  // Award each player
  for (const player of players) {
    player.xp   += amountEach;
    player.rank  = calcRank(player.xp);
    await player.save();
  }

  await log({
    admin_user_id: adminId, admin_username: adminName,
    action_type: 'prize_pool_award', amount: total,
    value_before: pool.total_xp_available + total,
    value_after:  pool.total_xp_available,
    reason,
    metadata: { type: 'bulk_all', players_awarded: players.length, amount_each: amountEach },
  });

  return { players_awarded: players.length, total_xp_spent: total, pool_balance: pool.total_xp_available };
}

/**
 * Award XP from prize pool to a list of specific player IDs.
 * Useful for contest top-N, event winners, group rewards.
 */
async function bulkAwardGroup(adminId, adminName, targetUserIds, amountEach, reason) {
  checkRateLimit(adminId, 'bulk_award_group');

  const Player = getPlayerModel();
  const pool   = await getPool();
  const total  = amountEach * targetUserIds.length;

  if (pool.total_xp_available < total) {
    throw new Error(`Insufficient pool balance. Need ${total} XP, have ${pool.total_xp_available}.`);
  }

  pool.total_xp_available -= total;
  pool.total_xp_awarded   += total;
  pool.updated_at          = new Date();
  await pool.save();

  const results = [];
  for (const uid of targetUserIds) {
    const player = await Player.findOne({ user_id: uid });
    if (!player || player.is_locked) {
      results.push({ user_id: uid, status: 'skipped' });
      continue;
    }
    player.xp   += amountEach;
    player.rank  = calcRank(player.xp);
    await player.save();
    results.push({ user_id: uid, username: player.username, new_xp: player.xp, status: 'awarded' });
  }

  await log({
    admin_user_id: adminId, admin_username: adminName,
    action_type: 'prize_pool_award', amount: total,
    value_before: pool.total_xp_available + total,
    value_after:  pool.total_xp_available,
    reason,
    metadata: { type: 'bulk_group', targets: targetUserIds.length, amount_each: amountEach, results },
  });

  return {
    awarded: results.filter(r => r.status === 'awarded').length,
    skipped: results.filter(r => r.status === 'skipped').length,
    total_xp_spent: total,
    pool_balance: pool.total_xp_available,
    results,
  };
}

/**
 * Award XP to the top N players by node_score.
 * Leaderboard event payouts.
 */
async function bulkAwardTop(adminId, adminName, topN, amountEach, reason) {
  checkRateLimit(adminId, 'bulk_award_top');

  const Player = getPlayerModel();
  const top    = await Player.find({ is_locked: { $ne: true } })
    .sort({ node_score: -1 })
    .limit(topN);

  const ids = top.map(p => p.user_id);
  return bulkAwardGroup(adminId, adminName, ids, amountEach, reason);
}

// ─── GAP 5: ECONOMY HARDENING ─────────────────────────────────────────────────

/**
 * Check if direct XP/resource injection is permitted in current mode.
 * In STRICT_ECONOMY mode, only prize pool distribution is allowed.
 */
function checkEconomyMode(actionType) {
  const strict = process.env.STRICT_ECONOMY === 'true';
  if (!strict) return; // open mode — all actions allowed

  const POOL_ONLY_ACTIONS = ['add_xp', 'remove_xp', 'set_xp', 'grant_resource', 'set_resource'];
  if (POOL_ONLY_ACTIONS.includes(actionType)) {
    throw new Error(
      'STRICT_ECONOMY mode is active. Direct XP/resource injection is disabled. ' +
      'Use /admin_prize_pool_award instead.'
    );
  }
}

// ─── EXPORTS ─────────────────────────────────────────────────────────────────

module.exports = {
  // Inspection
  getPlayerView,
  getInventoryView,
  // XP
  addXP,
  removeXP,
  setXP,
  // Resources
  grantResource,
  removeResource,
  setResource,
  // Player state
  resetPlayer,
  deletePlayer,
  resetAll,
  recalcPlayer,
  // Lock / Unlock (Gap 1)
  lockPlayer,
  unlockPlayer,
  // Restore (Gap 4)
  restorePlayer,
  // Bulk award (Gap 3)
  bulkAwardAll,
  bulkAwardGroup,
  bulkAwardTop,
  // Prize pool
  prizePoolView,
  prizePoolAdd,
  prizePoolAward,
  prizePoolRemove,
  // Economy mode check (Gap 5)
  checkEconomyMode,
  // Constants
  PHASE_CAPS,
  VALID_RESOURCES,
};