/**
 * ============================================================
 * CITADEL ASCENSION — PIE Service Layer
 * Version: 2.3.1 — All audit fixes applied
 * ============================================================
 *
 * Exports:
 *   generateItem        — create + register a new item
 *   awardItem           — add item to player inventory
 *   equipRelic          — equip relic (max 2, no dupes)
 *   unequipRelic        — unequip relic
 *   getInventory        — get full inventory with item details
 *   rollMissionDrop     — roll for item drop after mission
 *   formatItemEmbed     — format item into Discord embed data
 *   checkIntelCatchUp   — bonus Intel if player < 20
 *   checkMomentumEvent  — bonus event every 3rd session
 *   getUpgradeMessage   — narrative upgrade response text
 */

const { ProceduralIdentityEngine } = require('./pie');
const { GeneratedItem, UniquenessRegistry, PlayerInventory } = require('./schema');

const engine = new ProceduralIdentityEngine();

// ─── DROP RATES ───────────────────────────────────────────────────────────────
// LOCKED v2.3.1 — Legendary at 0.01% weight
// Effective Legendary rate: 0.35 × 0.0001 = 0.0035% per high-risk mission

const DROP_RATES = {
  safe:   { chance: 0.10, rarityWeights: { common: 70,    uncommon: 25,   rare: 5     } },
  medium: { chance: 0.20, rarityWeights: { uncommon: 55,  rare: 40,       epic: 5     } },
  high:   { chance: 0.35, rarityWeights: { rare: 60,      epic: 39.99,    legendary: 0.01 } },
};

// Mission → item class, origin, and theme bias (80% bias rate)
const MISSION_ITEM_MAP = {
  recon:          { item_class: 'collectible', origin: 'nexus_broadcast', theme_bias: ['data', 'dark']       },
  trade_run:      { item_class: 'relic',       origin: 'trade_lane',      theme_bias: ['radiant', 'corrupted'] },
  archive_dive:   { item_class: 'artifact',    origin: 'nexus_archive',   theme_bias: ['data', 'ancient']    },
  stabilize_node: { item_class: 'collectible', origin: 'dormant_signal',  theme_bias: ['dark', 'ancient']    },
  black_market:   { item_class: 'artifact',    origin: 'black_market',    theme_bias: ['corrupted', 'dark']  },
  deep_scan:      { item_class: 'artifact',    origin: 'deep_scan',       theme_bias: ['data', 'ancient']    },
};

// ─── UNIQUENESS CHECK ─────────────────────────────────────────────────────────

async function isUnique(hash) {
  const existing = await UniquenessRegistry.findOne({ uniqueness_hash: hash });
  return !existing;
}

// ─── ITEM GENERATION ─────────────────────────────────────────────────────────

async function generateItem(opts) {
  const { item_class, rarity, owner_id, acquired_from = 'mission' } = opts;

  if (!['rare', 'epic', 'legendary'].includes(rarity)) {
    const rawItem = engine._buildItem({ item_class, rarity, ...opts });
    return GeneratedItem.create({ ...rawItem, owner_id, acquired_from });
  }

  const rawItem = await engine.generate({
    item_class, rarity,
    origin: opts.origin,
    theme:  opts.theme,
    isUnique,
  });

  await UniquenessRegistry.create({
    uniqueness_hash: rawItem.uniqueness_hash,
    rarity,
    item_class,
    is_permanent: rarity === 'legendary',
  });

  return GeneratedItem.create({ ...rawItem, owner_id, acquired_from });
}

// ─── INVENTORY ────────────────────────────────────────────────────────────────

async function awardItem(item, owner_id) {
  const field = `${item.item_class}s`;
  await PlayerInventory.findOneAndUpdate(
    { owner_id },
    { $push: { [field]: item.uniqueness_hash }, $set: { updated_at: new Date() } },
    { upsert: true, new: true }
  );
}

async function equipRelic(owner_id, relicHash) {
  const inv = await PlayerInventory.findOne({ owner_id });
  if (!inv) return { success: false, message: 'Inventory not found.' };
  const equipped = inv.equipped_relics || [];
  if (equipped.includes(relicHash)) return { success: false, message: 'Relic already equipped.' };
  if (equipped.length >= 2)         return { success: false, message: 'You already have 2 Relics equipped. Unequip one first.' };
  if (!inv.relics.includes(relicHash)) return { success: false, message: 'You do not own this Relic.' };
  equipped.push(relicHash);
  await PlayerInventory.findOneAndUpdate({ owner_id }, { $set: { equipped_relics: equipped, updated_at: new Date() } });
  return { success: true, message: 'Relic equipped.' };
}

async function unequipRelic(owner_id, relicHash) {
  const inv = await PlayerInventory.findOne({ owner_id });
  if (!inv) return { success: false, message: 'Inventory not found.' };
  const newEquipped = (inv.equipped_relics || []).filter(h => h !== relicHash);
  await PlayerInventory.findOneAndUpdate({ owner_id }, { $set: { equipped_relics: newEquipped, updated_at: new Date() } });
  return { success: true, message: 'Relic unequipped.' };
}

async function getInventory(owner_id) {
  const inv = await PlayerInventory.findOne({ owner_id });
  if (!inv) return null;
  const allHashes = [
    ...(inv.relics || []), ...(inv.artifacts || []), ...(inv.cosmetics || []),
    ...(inv.collectibles || []), ...(inv.titles || []),
  ];
  const items   = await GeneratedItem.find({ uniqueness_hash: { $in: allHashes } });
  const itemMap = Object.fromEntries(items.map(i => [i.uniqueness_hash, i]));
  return {
    relics:          (inv.relics        || []).map(h => itemMap[h]).filter(Boolean),
    artifacts:       (inv.artifacts     || []).map(h => itemMap[h]).filter(Boolean),
    cosmetics:       (inv.cosmetics     || []).map(h => itemMap[h]).filter(Boolean),
    collectibles:    (inv.collectibles  || []).map(h => itemMap[h]).filter(Boolean),
    titles:          (inv.titles        || []).map(h => itemMap[h]).filter(Boolean),
    equipped_relics: (inv.equipped_relics || []).map(h => itemMap[h]).filter(Boolean),
  };
}

// ─── MISSION DROP ─────────────────────────────────────────────────────────────

async function rollMissionDrop(owner_id, mission_type, risk_level) {
  const config = DROP_RATES[risk_level] || DROP_RATES.safe;
  if (Math.random() > config.chance) return null;

  const rarity = weightedRandom(config.rarityWeights);
  const missionConfig = MISSION_ITEM_MAP[mission_type] || MISSION_ITEM_MAP.recon;

  // 80% bias toward mission-appropriate theme
  const theme = Math.random() < 0.80
    ? missionConfig.theme_bias[Math.floor(Math.random() * missionConfig.theme_bias.length)]
    : null;

  const item = await generateItem({
    item_class: missionConfig.item_class,
    rarity,
    owner_id,
    origin: missionConfig.origin,
    theme,
    acquired_from: 'mission',
  });

  await awardItem(item, owner_id);
  return item;
}

// ─── INTEL CATCH-UP ───────────────────────────────────────────────────────────

function checkIntelCatchUp(playerResources) {
  if (playerResources.intel < 20) {
    return {
      active:      true,
      bonus_intel: 10,
      message:     'Your knowledge networks were running thin. The Nexus compensates.',
    };
  }
  return { active: false, bonus_intel: 0, message: null };
}

// ─── MOMENTUM EVENT ───────────────────────────────────────────────────────────

function checkMomentumEvent(session_count) {
  if (session_count > 0 && session_count % 3 === 0) {
    const EVENTS = [
      { id: 'data_surge',      name: 'Data Surge',      bonus: { intel: 25, xp: 30 },            narrative: 'A wave of raw signal floods your Node from an unknown source.' },
      { id: 'market_spike',    name: 'Market Spike',    bonus: { credits: 40, xp: 20 },          narrative: 'A momentary fracture in the trade lanes sends a windfall your way.' },
      { id: 'node_resonance',  name: 'Node Resonance',  bonus: { xp: 50, node_score: 5 },        narrative: 'Something stirs in the Nexus. Your Node grows stronger from the echo.' },
      { id: 'signal_recovery', name: 'Signal Recovery', bonus: { intel: 15, credits: 20, xp: 20 }, narrative: 'The Nexus remembers. Fragments long thought lost return to your archive.' },
    ];
    return { active: true, event: EVENTS[session_count % EVENTS.length] };
  }
  return { active: false, event: null };
}

// ─── UPGRADE MESSAGES ─────────────────────────────────────────────────────────

function getUpgradeMessage(building, new_level) {
  const MESSAGES = {
    knowledge_core: {
      headline: 'KNOWLEDGE CORE — EXPANDED',
      narratives: [
        'Deeper data streams open across the Nexus. Your intelligence network grows.',
        'The archive stacks realign. New signal pathways crystallize in the dark.',
        'Your Core reaches further into the Nexus than before. Something notices.',
        'Data flows faster now. The patterns you once missed are becoming clear.',
        'The Knowledge Core hums at a new frequency. The Nexus responds in kind.',
      ],
      system_line: 'Intel output per mission increased.',
    },
    trade_hub: {
      headline: 'TRADE HUB — UPGRADED',
      narratives: [
        'New trade lanes open. The Credits begin to flow.',
        'Your economic reach extends further into the fractured Nexus markets.',
        'The Trade Hub establishes new connections. The economy shifts in your favor.',
        'A new route becomes viable. Cargo moves. Credits accumulate.',
        'The Nexus trade network recognizes your growing footprint.',
      ],
      system_line: 'Credit generation increased.',
    },
    power_reactor: {
      headline: 'POWER REACTOR — OVERCLOCKED',
      narratives: [
        'Your Node pulses with new capacity. The Nexus feels the expansion.',
        'Power flows deeper into your systems. More actions become possible.',
        'The Reactor core stabilizes at a higher output. The grid holds.',
        'Your Citadel breathes differently now. The power is there when you need it.',
        'New capacity. New reach. The Nexus shifts to accommodate your growth.',
      ],
      system_line: 'Maximum Power capacity increased.',
    },
    security_layer: {
      headline: 'SECURITY LAYER — REINFORCED',
      narratives: [
        'Your defenses harden. The Nexus takes note of the fortification.',
        'The Security Layer extends its watch. Risk exposure reduced.',
        'New defensive protocols activate. Your Citadel is harder to compromise.',
        'The walls of your Node grow thicker. What was dangerous becomes manageable.',
        'Reinforced. The signals that once threatened you now turn away.',
      ],
      system_line: 'Risk damage reduction increased.',
    },
  };

  const config = MESSAGES[building] || MESSAGES.knowledge_core;
  return {
    headline:    config.headline,
    narrative:   config.narratives[(new_level - 1) % config.narratives.length],
    system_line: config.system_line,
    level:       new_level,
  };
}

// ─── DISCORD EMBED FORMATTER ──────────────────────────────────────────────────

function formatItemEmbed(item) {
  const RARITY_COLORS = {
    common: 0x9CA3AF, uncommon: 0x4ADE80, rare: 0x60A5FA, epic: 0xA855F7, legendary: 0xF59E0B,
  };
  const RARITY_EMOJI = {
    common: '⬜', uncommon: '🟩', rare: '🟦', epic: '🟪', legendary: '🟨',
  };

  const modifierLines = Object.entries(item.modifiers || {})
    .map(([k, v]) => `+${v}% ${k.replace(/_/g, ' ')}`)
    .join('\n') || 'No modifiers';

  const fields = [
    { name: 'Rarity',  value: `${RARITY_EMOJI[item.rarity]} ${item.rarity.toUpperCase()}`, inline: true },
    { name: 'Type',    value: item.item_class.charAt(0).toUpperCase() + item.item_class.slice(1), inline: true },
    { name: 'Origin',  value: item.origin_family.replace(/_/g, ' '), inline: true },
    { name: 'Effect',  value: modifierLines },
    { name: 'Lore',    value: `*${item.flavor}*` },
  ];

  if (item.hidden_trait) {
    fields.push({ name: '✨ Hidden Trait', value: `*${item.hidden_trait}*` });
  }

  return {
    title:  `🏛️ ${item.name}`,
    color:  RARITY_COLORS[item.rarity] || RARITY_COLORS.common,
    fields,
    footer: { text: `ID: ${item.uniqueness_hash.slice(0, 12)}...  |  Citadel Ascension` },
  };
}

// ─── UTILITY ─────────────────────────────────────────────────────────────────

function weightedRandom(weights) {
  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  let rand = Math.random() * total;
  for (const [key, weight] of Object.entries(weights)) {
    rand -= weight;
    if (rand <= 0) return key;
  }
  return Object.keys(weights)[0];
}

// ─── EXPORTS ─────────────────────────────────────────────────────────────────

module.exports = {
  generateItem,
  awardItem,
  equipRelic,
  unequipRelic,
  getInventory,
  rollMissionDrop,
  formatItemEmbed,
  checkIntelCatchUp,
  checkMomentumEvent,
  getUpgradeMessage,
};