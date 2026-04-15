/**
 * ============================================================
 * CITADEL ASCENSION — PIE Database Schema (MongoDB / Mongoose)
 * ============================================================
 */

const mongoose = require('mongoose');

// ─── GENERATED ITEMS ─────────────────────────────────────────────────────────

const GeneratedItemSchema = new mongoose.Schema({
  name:            { type: String, required: true },
  flavor:          { type: String, required: true },
  rarity:          { type: String, required: true, enum: ['common','uncommon','rare','epic','legendary'] },
  item_class:      { type: String, required: true, enum: ['artifact','cosmetic','relic','title','collectible'] },
  origin_family:   { type: String, required: true },
  theme:           [{ type: String }],
  modifiers:       { type: mongoose.Schema.Types.Mixed, default: {} },
  hidden_trait:    { type: String, default: null },
  uniqueness_hash: { type: String, required: true, unique: true, index: true },
  visual_seed:     { type: String, required: true },
  owner_id:        { type: String, required: true, index: true },
  acquired_from:   { type: String },
  is_minted:       { type: Boolean, default: false },
  token_id:        { type: String, default: null },
  created_at:      { type: Date, default: Date.now },
}, { collection: 'generated_items' });

GeneratedItemSchema.index({ owner_id: 1, rarity: 1, item_class: 1 });
GeneratedItemSchema.index({ is_minted: 1, rarity: 1 });

// ─── UNIQUENESS REGISTRY ──────────────────────────────────────────────────────

const UniquenessRegistrySchema = new mongoose.Schema({
  uniqueness_hash: { type: String, required: true, unique: true, index: true },
  rarity:          { type: String, required: true },
  item_class:      { type: String, required: true },
  is_permanent:    { type: Boolean, default: false }, // Legendary: never delete
  registered_at:   { type: Date, default: Date.now },
}, { collection: 'uniqueness_registry' });

// ─── PLAYER INVENTORY ─────────────────────────────────────────────────────────

const PlayerInventorySchema = new mongoose.Schema({
  owner_id:        { type: String, required: true, unique: true, index: true },
  relics:          [{ type: String }],
  artifacts:       [{ type: String }],
  cosmetics:       [{ type: String }],
  collectibles:    [{ type: String }],
  titles:          [{ type: String }],
  equipped_relics: [{ type: String }], // max 2 — enforced in service layer
  updated_at:      { type: Date, default: Date.now },
}, { collection: 'player_inventory' });

// ─── EXPORTS ─────────────────────────────────────────────────────────────────

const GeneratedItem      = mongoose.model('GeneratedItem',      GeneratedItemSchema);
const UniquenessRegistry = mongoose.model('UniquenessRegistry', UniquenessRegistrySchema);
const PlayerInventory    = mongoose.model('PlayerInventory',    PlayerInventorySchema);

module.exports = { GeneratedItem, UniquenessRegistry, PlayerInventory };