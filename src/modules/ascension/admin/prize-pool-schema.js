/**
 * ============================================================
 * CITADEL ASCENSION — Prize Pool Schema
 * Single-record ledger. Every move is logged.
 * ============================================================
 */

const mongoose = require('mongoose');

const PrizePoolSchema = new mongoose.Schema({

  pool_name:          { type: String, default: 'main', unique: true },

  // Running totals
  total_xp_available: { type: Number, default: 0 }, // current balance
  total_xp_added:     { type: Number, default: 0 }, // cumulative added
  total_xp_awarded:   { type: Number, default: 0 }, // cumulative paid out
  total_xp_removed:   { type: Number, default: 0 }, // cumulative corrections

  // Optional metadata
  notes:     { type: String, default: null },
  season_id: { type: String, default: null },

  updated_at: { type: Date, default: Date.now },

}, { collection: 'prize_pool' });

const PrizePool = mongoose.model('PrizePool', PrizePoolSchema);

/**
 * Get or create the main prize pool ledger record.
 */
async function getPool() {
  let pool = await PrizePool.findOne({ pool_name: 'main' });
  if (!pool) pool = await PrizePool.create({ pool_name: 'main' });
  return pool;
}

module.exports = { PrizePool, getPool };