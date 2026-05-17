// backend/src/services/oauthStateService.ts
import crypto from "node:crypto";

export const OAUTH_STATE_TTL_MS = 1000 * 60 * 10;

export type OAuthStateRecord = {
  state: string;
  createdAt: number;
  expiresAt: number;
};

const oauthStateStore = new Map<string, OAuthStateRecord>();

function nowMs(): number {
  return Date.now();
}

export function cleanupExpiredOAuthStates(): number {
  const now = nowMs();
  let deleted = 0;

  for (const [state, record] of oauthStateStore.entries()) {
    if (record.expiresAt <= now) {
      oauthStateStore.delete(state);
      deleted += 1;
    }
  }

  return deleted;
}

export function createOAuthState(): OAuthStateRecord {
  cleanupExpiredOAuthStates();

  const state = crypto.randomBytes(32).toString("hex");
  const now = nowMs();

  const record: OAuthStateRecord = {
    state,
    createdAt: now,
    expiresAt: now + OAUTH_STATE_TTL_MS,
  };

  oauthStateStore.set(state, record);
  return record;
}

export function consumeOAuthState(state: string): boolean {
  cleanupExpiredOAuthStates();

  const normalizedState = state.trim();

  if (!normalizedState) {
    return false;
  }

  const record = oauthStateStore.get(normalizedState);

  if (!record) {
    return false;
  }

  oauthStateStore.delete(normalizedState);

  if (record.expiresAt <= nowMs()) {
    return false;
  }

  return true;
}

export function getOAuthStateStoreSize(): number {
  cleanupExpiredOAuthStates();
  return oauthStateStore.size;
}
