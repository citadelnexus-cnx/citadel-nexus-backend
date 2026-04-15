/**
 * ============================================================
 * CITADEL ASCENSION — Procedural Identity Engine (PIE)
 * Version: 1.0 | System: v2.3 Unified Uniqueness Layer
 * ============================================================
 *
 * Generates unique item identities for all Epic+ items.
 * Lightweight: string assembly + SHA-256 hash check.
 * Target: <10ms per item. No image generation.
 */

const crypto = require('crypto');

// ─── DESCRIPTOR POOLS ────────────────────────────────────────────────────────

const POOLS = {

  adjectives: {
    dark:      ['Obsidian', 'Void', 'Shadow', 'Nullpoint', 'Abyss'],
    data:      ['Signal', 'Echo', 'Fractured', 'Encoded', 'Cipher'],
    ancient:   ['Ninth', 'Lost', 'Recovered', 'Dormant', 'Cascade'],
    radiant:   ['Coldfire', 'Gilded', 'Arc', 'Prism', 'Ember'],
    corrupted: ['Shard', 'Broken', 'Glitch', 'Errant', 'Unstable'],
  },

  nouns: {
    artifact:   ['Archive', 'Relic', 'Fragment', 'Core', 'Vault', 'Sigil', 'Node', 'Ember'],
    cosmetic:   ['Citadel', 'Aura', 'Banner', 'Gate', 'Wall', 'Spire'],
    relic:      ['Lens', 'Shard', 'Trace', 'Pattern', 'Signal', 'Key'],
    title:      ['Warden', 'Archivist', 'Operator', 'Sentinel', 'Keeper'],
    collectible:['Fragment', 'Broadcast', 'Trace', 'Record', 'Imprint'],
  },

  suffixes: {
    variant: ['Variant', 'Form', 'Echo', 'Iteration', 'Instance'],
    pattern: ['Pattern', 'Burn', 'Weave', 'Scar', 'Mark'],
    epoch:   ['Epoch', 'Era', 'Age', 'Cycle', 'Phase'],
    origin:  ['of Node-{n}', 'of the Nexus', 'of the Cascade', 'of the Archive'],
  },

  origins: {
    nexus_archive:   'Recovered from the deep archive stacks of the Nexus.',
    cascade_ruins:   'Salvaged from the wreckage of the original Cascade event.',
    nexus_broadcast: 'Recovered from a broadcast signal that repeats differently each time.',
    black_market:    'Obtained through channels that no longer officially exist.',
    node_seven:      'Last known record places this at Node-7, before it went dark.',
    deep_scan:       'Detected on a deep scan sweep — origin coordinates corrupted.',
    trade_lane:      'Found drifting in the fractured trade lanes of the outer Nexus.',
    dormant_signal:  'Pulled from a dormant signal that should have been silent.',
  },

  flavor: {
    dark:      [
      'Its surface absorbs light in ways that shouldn\'t be possible.',
      'Examination logs show it was accessed — but never by anyone who remembers.',
      'The data within is intact. What it describes is not.',
    ],
    data:      [
      'The signal it emits matches no known frequency in the Nexus.',
      'Recovered from a broadcast that repeats differently each time.',
      'Its encoding predates the Cascade. Its content does not.',
    ],
    ancient:   [
      'The archive entry has no timestamp. Only coordinates that no longer exist.',
      'Last catalogued in a system that hasn\'t responded in fourteen cycles.',
      'The provenance trail ends at a Node that went dark before records began.',
    ],
    radiant:   [
      'Emits a warmth inconsistent with its apparent age.',
      'Observed to pulse faintly when other Nodes evolve nearby.',
      'Its brightness increases in proximity to Legendary-tier items.',
    ],
    corrupted: [
      'The corruption appears intentional — as if it was designed to look broken.',
      'Three separate scans returned three different readings. All were accurate.',
      'Handle with a security layer active. Reason: unspecified in original logs.',
    ],
  },

  hiddenTraits: [
    'Resonates with other items from the same origin family.',
    'Emits a passive signal detectable only during Nexus events.',
    'Gain an additional +1% bonus on missions matching its origin.',
    'Unlocks a unique flavor line on your /status display.',
    'Visually evolves when your Citadel reaches Stage 4+.',
  ],
};

// ─── STAT BOUNDS ─────────────────────────────────────────────────────────────

const STAT_BOUNDS = {
  common:    { min: 1,  max: 3  },
  uncommon:  { min: 3,  max: 5  },
  rare:      { min: 5,  max: 7  },
  epic:      { min: 6,  max: 10 },
  legendary: { min: 9,  max: 14 },
};

const MODIFIER_TYPES = {
  artifact:   ['intel_bonus', 'mission_bonus', 'xp_bonus'],
  relic:      ['credit_bonus', 'intel_bonus', 'power_bonus'],
  cosmetic:   [],
  collectible:['xp_bonus', 'drop_rate_bonus'],
  title:      [],
};

// ─── CORE ENGINE ─────────────────────────────────────────────────────────────

class ProceduralIdentityEngine {

  async generate(opts) {
    const { item_class, rarity, isUnique } = opts;
    const maxAttempts = rarity === 'legendary' ? 3 : 2;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const item = this._buildItem(opts, attempt);
      if (['epic', 'legendary'].includes(rarity)) {
        const unique = await isUnique(item.uniqueness_hash);
        if (!unique) continue;
      }
      return item;
    }

    // Escalation: force unique with timestamp seed
    return this._buildItem({ ...opts, force_unique_seed: Date.now().toString() }, 99);
  }

  _buildItem(opts, attempt = 0) {
    const { item_class, rarity } = opts;
    const theme  = opts.theme  || this._pick(Object.keys(POOLS.adjectives));
    const origin = opts.origin || this._pick(Object.keys(POOLS.origins));
    const seed   = opts.force_unique_seed || `${Date.now()}-${Math.random()}-${attempt}`;

    const adj  = this._pick(POOLS.adjectives[theme] || POOLS.adjectives.data);
    const noun = this._pick(POOLS.nouns[item_class] || POOLS.nouns.artifact);
    const sfxKey = this._pick(Object.keys(POOLS.suffixes));
    let   sfx    = this._pick(POOLS.suffixes[sfxKey]);

    if (sfx.includes('{n}')) {
      sfx = sfx.replace('{n}', Math.floor(Math.random() * 20 + 1).toString());
    }

    const name   = `${adj} ${noun} — ${sfx}`;
    const flavor = `${POOLS.origins[origin]} ${this._pick(POOLS.flavor[theme] || POOLS.flavor.data)}`;

    const modifiers   = this._generateModifiers(item_class, rarity);
    const hiddenTrait = rarity === 'legendary' ? this._pick(POOLS.hiddenTraits) : null;
    const visual_seed = this._hash(`visual:${name}:${seed}`).slice(0, 16);
    const uniqueness_hash = this._hash(`${name}:${rarity}:${item_class}:${origin}:${seed}`);
    const themes = [theme, ...this._pickN(Object.keys(POOLS.adjectives), 2).filter(t => t !== theme)];

    return {
      name,
      flavor,
      rarity,
      item_class,
      origin_family: origin,
      theme: themes,
      modifiers,
      hidden_trait: hiddenTrait,
      visual_seed,
      uniqueness_hash,
      created_at: new Date().toISOString(),
    };
  }

  _generateModifiers(item_class, rarity) {
    const types  = MODIFIER_TYPES[item_class] || [];
    const bounds = STAT_BOUNDS[rarity];
    const result = {};
    if (types.length === 0) return result;

    const primary = this._pick(types);
    result[primary] = this._boundedRandom(bounds.min, bounds.max);

    if (['epic', 'legendary'].includes(rarity) && types.length > 1) {
      const secondary = this._pick(types.filter(t => t !== primary));
      result[secondary] = Math.max(1, Math.floor(result[primary] * 0.3));
    }

    return result;
  }

  _pick(arr)              { return arr[Math.floor(Math.random() * arr.length)]; }
  _pickN(arr, n)          { return [...arr].sort(() => Math.random() - 0.5).slice(0, n); }
  _boundedRandom(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; }
  _hash(input)            { return crypto.createHash('sha256').update(input).digest('hex'); }
}

module.exports = { ProceduralIdentityEngine, STAT_BOUNDS, MODIFIER_TYPES };