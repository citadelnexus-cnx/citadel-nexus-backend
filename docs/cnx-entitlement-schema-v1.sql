-- CNX ACCESS STATE
CREATE TABLE IF NOT EXISTS cnx_access_state (
  user_id TEXT PRIMARY KEY,

  is_cnx_holder INTEGER NOT NULL DEFAULT 0,
  holder_tier_internal INTEGER NOT NULL DEFAULT 0,

  xp_boost REAL NOT NULL DEFAULT 0,
  cooldown_reduction REAL NOT NULL DEFAULT 0,

  temp_access_type TEXT,
  temp_access_expires_at TEXT,

  last_evaluated_at TEXT NOT NULL,
  last_role_sync_at TEXT
);

-- CNX ENTITLEMENTS
CREATE TABLE IF NOT EXISTS cnx_entitlements (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,

  entitlement_type TEXT NOT NULL,
  entitlement_key TEXT NOT NULL,

  status TEXT NOT NULL, -- active, expired, revoked
  source TEXT NOT NULL, -- cnx_spend, admin_grant, future_nft, premium

  granted_at TEXT NOT NULL,
  expires_at TEXT,
  updated_at TEXT NOT NULL,

  metadata_json TEXT
);

CREATE INDEX IF NOT EXISTS idx_cnx_entitlements_user_id
  ON cnx_entitlements(user_id);

CREATE INDEX IF NOT EXISTS idx_cnx_entitlements_status
  ON cnx_entitlements(status);

CREATE INDEX IF NOT EXISTS idx_cnx_entitlements_expires_at
  ON cnx_entitlements(expires_at);