/**
 * ============================================================
 * CITADEL ASCENSION — Player DB Service
 * v2.4: Updated XP curve, phase caps, stage gating, mission rewards
 * ============================================================
 */

const mongoose = require('mongoose');

// ─── PLAYER SCHEMA ────────────────────────────────────────────────────────────

const PlayerSchema = new mongoose.Schema({
  user_id:       { type: String, required: true, unique: true, index: true },
  username:      { type: String },
  guardian:      { type: String, enum: ['nova', 'tarin', 'raxa'], default: 'nova' },
  stage:         { type: Number, default: 1, min: 1, max: 5 },
  rank:          { type: String, default: 'initiate' },
  xp:            { type: Number, default: 0 },
  level:         { type: Number, default: 1 },
  node_score:    { type: Number, default: 0 },
  session_count: { type: Number, default: 0 },
  missions_completed: { type: Number, default: 0 }, // v2.4 stage gating
  is_locked:          { type: Boolean, default: false }, // admin lock flag
  lock_reason:        { type: String, default: null },
  power:         { type: Number, default: 5 },
  max_power:     { type: Number, default: 10 },
  credits:       { type: Number, default: 50 },
  intel:         { type: Number, default: 10 },
  buildings: {
    knowledge_core:  { type: Number, default: 1 },
    trade_hub:       { type: Number, default: 1 },
    power_reactor:   { type: Number, default: 1 },
    security_layer:  { type: Number, default: 1 },
  },
  last_claim:  { type: Date, default: null },
  created_at:  { type: Date, default: Date.now },
  updated_at:  { type: Date, default: Date.now },
}, { collection: 'players' });

PlayerSchema.pre('findOneAndUpdate', function () { this.set({ updated_at: new Date() }); });

const Player = mongoose.model('Player', PlayerSchema);

// ─── v2.4 CONSTANTS ───────────────────────────────────────────────────────────

// XP ladder — widened midgame
const RANK_LADDER = [
  { rank: 'initiate',  xp_required: 0      },
  { rank: 'operator',  xp_required: 500     },
  { rank: 'builder',   xp_required: 1_500   },
  { rank: 'architect', xp_required: 5_000   },
  { rank: 'warden',    xp_required: 15_000  },
  { rank: 'sentinel',  xp_required: 40_000  },
];

// Stage evolution with full multi-gate requirements
const EVOLUTION_STAGES = [
  { stage: 1, name: 'Dormant Node',      node_score_required: 0,    min_buildings: 1, min_missions: 0,   min_xp: 0      },
  { stage: 2, name: 'Stabilized Core',   node_score_required: 50,   min_buildings: 1, min_missions: 5,   min_xp: 0      },
  { stage: 3, name: 'Emerging Citadel',  node_score_required: 200,  min_buildings: 2, min_missions: 25,  min_xp: 500    },
  { stage: 4, name: 'Developed Citadel', node_score_required: 750,  min_buildings: 3, min_missions: 100, min_xp: 5_000  },
  { stage: 5, name: 'Ascended Citadel',  node_score_required: 2500, min_buildings: 4, min_missions: 400, min_xp: 40_000 },
];

// Phase caps
const PHASE_CAPS = {
  current_phase: parseInt(process.env.CURRENT_PHASE || '1'),
  1: { max_stage: 2, max_building: 2 },
  2: { max_stage: 3, max_building: 3 },
  3: { max_stage: 4, max_building: 4 },
  4: { max_stage: 5, max_building: 5 },
};

// Mission rewards — tightened v2.4
const MISSION_REWARDS = {
  safe:   { credits: 25, intel: 10, xp: 20, power_cost: 2 },
  medium: { credits: 40, intel: 20, xp: 35, power_cost: 3 },
  high:   { credits: 70, intel: 35, xp: 60, power_cost: 4 },
};

// Build cost multipliers — hardened late game
function getBuildCostMultiplier(currentLevel) {
  const multipliers = [1, 1.8, 2.1, 2.5];
  return multipliers[Math.min(currentLevel - 1, multipliers.length - 1)];
}

// ─── CONNECTION ───────────────────────────────────────────────────────────────

async function connect(uri) {
  await mongoose.connect(uri);
  console.log('[DB] Connected');
}

// ─── PLAYER CRUD ──────────────────────────────────────────────────────────────

async function getPlayer(user_id) {
  return Player.findOne({ user_id });
}

async function createPlayer(user_id, username, guardian) {
  return Player.create({ user_id, username, guardian });
}

async function applyDelta(user_id, delta) {
  const player = await Player.findOne({ user_id });
  if (!player) return null;

  if (delta.credits      !== undefined) player.credits      = Math.max(0, player.credits      + delta.credits);
  if (delta.intel        !== undefined) player.intel        = Math.max(0, player.intel        + delta.intel);
  if (delta.xp           !== undefined) player.xp           = Math.max(0, player.xp           + delta.xp);
  if (delta.node_score   !== undefined) player.node_score   = Math.max(0, player.node_score   + delta.node_score);
  if (delta.session_count!== undefined) player.session_count+= delta.session_count;
  if (delta.missions_completed !== undefined) player.missions_completed = Math.max(0, (player.missions_completed || 0) + delta.missions_completed);
  if (delta.power !== undefined) player.power = Math.min(player.max_power, Math.max(0, player.power + delta.power));
  if (delta.last_claim !== undefined) player.last_claim = delta.last_claim;

  if (delta.buildings) {
    for (const [key, lvl] of Object.entries(delta.buildings)) {
      if (player.buildings[key] !== undefined) player.buildings[key] = lvl;
    }
    player.max_power = 10 + (player.buildings.power_reactor - 1) * 2;
  }

  player.rank = calcRank(player.xp);

  const newStage = calcStage(player);
  const evolved  = newStage > player.stage;
  if (evolved) player.stage = newStage;

  await player.save();
  return { player, evolved };
}

// ─── HQ GATING ────────────────────────────────────────────────────────────────

function canUpgrade(buildings, target) {
  const phase    = PHASE_CAPS.current_phase;
  const cap      = PHASE_CAPS[phase]?.max_building || 2;
  const levels   = Object.values(buildings);
  const minLevel = Math.min(...levels);
  const current  = buildings[target] || 1;

  if (current >= 5) return { allowed: false, reason: 'Already at maximum level (L5).' };

  if (current >= cap) return { allowed: false, reason: `Phase ${phase} cap: max building level is L${cap}.` };

  if (current >= minLevel + 1) {
    const lagging = Object.entries(buildings)
      .filter(([k, v]) => v === minLevel && k !== target)
      .map(([k]) => k.replace(/_/g, ' '))
      .join(', ');
    return { allowed: false, reason: `HQ gating active. Upgrade: **${lagging}** (L${minLevel}) first.` };
  }

  return { allowed: true, reason: null };
}

// ─── COOLDOWN ─────────────────────────────────────────────────────────────────

function checkClaimCooldown(player) {
  const COOLDOWN_MS = 8 * 60 * 60 * 1000;
  if (!player.last_claim) return { onCooldown: false, remainingMs: 0 };
  const remaining = COOLDOWN_MS - (Date.now() - new Date(player.last_claim).getTime());
  return { onCooldown: remaining > 0, remainingMs: Math.max(0, remaining) };
}

function formatCooldown(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function calcRank(xp) {
  let rank = 'initiate';
  for (const tier of RANK_LADDER) { if (xp >= tier.xp_required) rank = tier.rank; }
  return rank;
}

function calcStage(player) {
  let stage = 1;
  const minBuilding = Math.min(...Object.values(player.buildings));
  for (const s of EVOLUTION_STAGES) {
    if (
      player.node_score            >= s.node_score_required &&
      minBuilding                  >= s.min_buildings &&
      (player.missions_completed || 0) >= s.min_missions &&
      player.xp                   >= s.min_xp
    ) { stage = s.stage; }
  }
  return Math.min(stage, PHASE_CAPS[PHASE_CAPS.current_phase]?.max_stage || 2);
}

function getStageName(stage) {
  return EVOLUTION_STAGES.find(s => s.stage === stage)?.name || 'Dormant Node';
}

function getNextStage(stage) {
  return EVOLUTION_STAGES.find(s => s.stage === stage + 1) || null;
}

function xpToNextRank(xp) {
  for (const tier of RANK_LADDER) { if (xp < tier.xp_required) return tier.xp_required; }
  return null;
}

/**
 * Check if a player is locked. Call this at the top of every gameplay handler.
 * @returns {{ locked: boolean, reason: string|null }}
 */
function checkLocked(player) {
  if (player?.is_locked) {
    return { locked: true, reason: player.lock_reason || 'Account locked by admin.' };
  }
  return { locked: false, reason: null };
}



module.exports = {
  connect, getPlayer, createPlayer, applyDelta,
  canUpgrade, checkClaimCooldown, formatCooldown, checkLocked,
  calcRank, calcStage, getStageName, getNextStage, xpToNextRank,
  getBuildCostMultiplier,
  RANK_LADDER, EVOLUTION_STAGES, PHASE_CAPS, MISSION_REWARDS,
};