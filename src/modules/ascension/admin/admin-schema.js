/**
 * ============================================================
 * CITADEL ASCENSION — Admin Schema
 * admin_actions audit log + admin_snapshots for destructive ops
 * ============================================================
 */

const mongoose = require('mongoose');

// ─── ADMIN ACTIONS (audit log — every founder action logged here) ─────────────

const AdminActionSchema = new mongoose.Schema({

  // Who did it
  admin_user_id:    { type: String, required: true, index: true },
  admin_username:   { type: String },

  // Who was affected (null for bulk/pool ops)
  target_user_id:   { type: String, default: null, index: true },
  target_username:  { type: String, default: null },

  // What happened
  action_type: {
    type: String,
    required: true,
    enum: [
      'add_xp', 'remove_xp', 'set_xp',
      'grant_resource', 'remove_resource', 'set_resource',
      'reset_player', 'delete_player', 'reset_all',
      'lock_player', 'unlock_player',
      'restore_player',
      'prize_pool_add', 'prize_pool_award', 'prize_pool_remove',
      'recalc_player', 'bulk_award_all', 'bulk_award_group', 'bulk_award_top',
    ],
  },

  resource_type: { type: String, default: null }, // credits | intel | power | node_score
  amount:        { type: Number, default: null },
  value_before:  { type: mongoose.Schema.Types.Mixed, default: null },
  value_after:   { type: mongoose.Schema.Types.Mixed, default: null },

  reason:    { type: String, required: true },
  metadata:  { type: mongoose.Schema.Types.Mixed, default: {} },

  created_at: { type: Date, default: Date.now, index: true },

}, { collection: 'admin_actions' });

AdminActionSchema.index({ admin_user_id: 1, created_at: -1 });
AdminActionSchema.index({ target_user_id: 1, created_at: -1 });
AdminActionSchema.index({ action_type: 1, created_at: -1 });

// ─── ADMIN SNAPSHOTS (pre-destructive-action player state archive) ────────────

const AdminSnapshotSchema = new mongoose.Schema({

  action_id:       { type: String, required: true, index: true }, // links to AdminAction
  target_user_id:  { type: String, required: true, index: true },
  snapshot_type:   { type: String, required: true, enum: ['pre_reset', 'pre_delete', 'pre_bulk_reset'] },
  player_state:    { type: mongoose.Schema.Types.Mixed }, // full player document snapshot
  inventory_state: { type: mongoose.Schema.Types.Mixed }, // inventory snapshot
  created_at:      { type: Date, default: Date.now },

}, { collection: 'admin_snapshots' });

// ─── EXPORTS ─────────────────────────────────────────────────────────────────

const AdminAction   = mongoose.model('AdminAction',   AdminActionSchema);
const AdminSnapshot = mongoose.model('AdminSnapshot', AdminSnapshotSchema);

module.exports = { AdminAction, AdminSnapshot };