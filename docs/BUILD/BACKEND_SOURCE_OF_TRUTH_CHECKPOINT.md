# Citadel Nexus Backend Source-of-Truth Checkpoint

## Status

VERIFIED COMPLETE.

## Date

2026-05-14 UTC

## Scope

This checkpoint verifies the current protected backend baseline after:

- PR #4 — HTTP auth permission layer
- PR #5 — HTTP auth runtime validation docs
- PR #6 — Authorized HTTP auth validation docs
- PR #7 — Harden Hedera token info config
- PR #8 — Parse Hedera operator key as ECDSA

## Source Control Baseline

- Branch checked: `main`
- Local main status: up to date with `origin/main`
- Latest confirmed main commit: `c38e82b`
- Latest confirmed merge: PR #8 from `fix/hedera-private-key-parser`

## Build Verification

- `npm run build` passed

## Runtime Verification

- PM2 restarted `citadel-backend` from current main
- `citadel-backend` returned online after restart

## Health Checks

- `GET /health -> 200`
- `GET /health/db -> 200`

## Token Source-of-Truth Check

- `GET /token/info -> 200`

Returned token payload:

- name: `Citadel Nexus`
- symbol: `CNX`
- tokenId: `0.0.8315924`
- decimals: `8`
- totalSupply: `1000000000000000`
- treasury: `0.0.8315923`
- maxSupply: `10000000000000000`

## Fail-Closed No-Auth Checks

- `GET /session/me -> 401`
- `GET /access -> 403`
- `GET /entitlements -> 403`
- `GET /role-sync -> 403`
- `GET /payout/log/all -> 403`
- `GET /discord-sync-worker -> 403`

## Production-Disabled Route Checks

- `POST /session/dev-login -> 403`
- `POST /user/create -> 403`

## Owner Routes Without Session

- `GET /user/step44-smoke-user -> 401`
- `GET /member-state/step44-smoke-user -> 401`
- `GET /access/step44-smoke-user -> 401`
- `GET /entitlements/user/step44-smoke-user -> 401`

## Secret Tracking Check

- `.env` is not tracked
- no real private keys were committed
- tracked files matching `secret` are documentation-only security files:
  - `docs/SECURITY/SECRETS_POLICY.md`
  - `docs/SUPABASE_SECRET_SAFE_EXPORT_PLAN.md`

## Intentional Public Routes

The following unauthenticated routes remain intentional public/read-only endpoints:

- `GET /ascension-summary/public/discord/:discordId`
- `GET /token/info`

## Result

Backend source-of-truth checkpoint verified. The backend is now in a clean protected baseline state before the next build layer.
