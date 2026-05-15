# Citadel Nexus Backend OAuth Environment Activation Plan

## Status

PROPOSED PLAN.

## Date

2026-05-15 UTC

## Purpose

This document defines the controlled activation plan for backend Discord OAuth/session environment values.

It exists to prevent secret exposure, redirect mismatch, cookie misconfiguration, CORS drift, and unsafe OAuth activation.

## Current Verified Runtime State

Current verified backend commit:

- `ee0b2e9` — Merge pull request #18 from `docs/backend-oauth-state-route-wiring-runtime-checkpoint`

Current OAuth route state:

- `GET /auth/discord/start -> 503`
- `GET /auth/discord/callback -> 503`

Current expected reason:

- `{"error":"Discord OAuth is not configured"}`

Current safe auth behavior:

- `GET /health -> 200`
- `GET /session/me -> 401`
- `POST /session/dev-login -> 403`

This is the correct fail-closed state before OAuth environment activation.

## Activation Principle

OAuth must be activated by environment configuration only after:

1. Required environment values are prepared.
2. Discord Developer Portal redirect URI matches the backend callback exactly.
3. Secrets are inserted only on the server.
4. PM2 reload is performed with environment update.
5. Runtime checks confirm safe behavior.

No secret values may be committed, logged, pasted into chat, or stored in documentation.

## Canonical Domain Decision

Canonical frontend origin:

- `https://www.citadelnexus.app`

Backend API origin:

- `https://api.citadelnexus.app`

Discord OAuth callback URL:

- `https://api.citadelnexus.app/auth/discord/callback`

Post-login frontend destination:

- `https://www.citadelnexus.app/app`

Preferred production CORS value:

- `CORS_ORIGINS=https://www.citadelnexus.app,https://citadelnexus.app`

## Required Backend Environment Values

Discord OAuth:

- `DISCORD_CLIENT_ID`
- `DISCORD_CLIENT_SECRET`
- `DISCORD_OAUTH_REDIRECT_URI`
- `DISCORD_OAUTH_SCOPES`

Session:

- `SESSION_SECRET`
- `SESSION_COOKIE_NAME`
- `SESSION_COOKIE_DOMAIN`
- `SESSION_COOKIE_SECURE`
- `SESSION_COOKIE_SAME_SITE`
- `SESSION_COOKIE_HTTP_ONLY`

Frontend / CORS:

- `FRONTEND_ORIGIN`
- `CORS_ORIGINS`

## Required Production Values Without Secrets

These values may be documented because they are not secrets:

- `DISCORD_OAUTH_REDIRECT_URI=https://api.citadelnexus.app/auth/discord/callback`
- `DISCORD_OAUTH_SCOPES=identify`
- `SESSION_COOKIE_NAME=cnx_session`
- `SESSION_COOKIE_DOMAIN=.citadelnexus.app`
- `SESSION_COOKIE_SECURE=true`
- `SESSION_COOKIE_SAME_SITE=lax`
- `SESSION_COOKIE_HTTP_ONLY=true`
- `FRONTEND_ORIGIN=https://www.citadelnexus.app`
- `CORS_ORIGINS=https://www.citadelnexus.app,https://citadelnexus.app`

These values must never be documented with real values:

- `DISCORD_CLIENT_ID`
- `DISCORD_CLIENT_SECRET`
- `SESSION_SECRET`

Note:

- `DISCORD_CLIENT_ID` is not a private secret, but it should still be treated as operational configuration and not repeatedly printed.
- `DISCORD_CLIENT_SECRET` is a secret.
- `SESSION_SECRET` is a secret.

## Discord Developer Portal Checklist

Before backend activation:

1. Open the Discord Developer Portal.
2. Select the Citadel Nexus Discord application.
3. Confirm OAuth2 redirect URI includes exactly:
   - `https://api.citadelnexus.app/auth/discord/callback`
4. Confirm OAuth2 scope required for the current implementation:
   - `identify`
5. Do not enable unnecessary scopes.
6. Do not expose the client secret in frontend code, GitHub, logs, screenshots, or chat.

## Server Environment Update Plan

Environment values should be added directly on the backend server.

Preferred target file:

- `/home/deploy/apps/citadel-nexus-backend/.env`

Rules:

- Do not commit `.env`.
- Do not print `.env`.
- Do not paste secret values into chat.
- Do not use commands that expose real secrets in logs or chat.
- After editing `.env`, verify only `SET` / `MISSING` status.

## Safe SESSION_SECRET Generation

Generate `SESSION_SECRET` directly on the server.

Allowed command:

- `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

Handling rule:

- Copy the generated value directly into `.env`.
- Do not paste it into chat.
- Do not commit it.
- Do not screenshot it.

## Safe Activation Sequence

1. Confirm backend main is clean.
2. Confirm `.env.example` contains placeholders.
3. Edit `.env` manually on the server.
4. Add missing OAuth/session values.
5. Run a safe presence-only env check.
6. Run `npm run build`.
7. Reload backend with updated environment:
   - `pm2 reload citadel-backend --update-env`
8. Wait for runtime to settle.
9. Verify health.
10. Verify OAuth behavior.

## Expected Behavior After Environment Activation

After OAuth environment values are present and PM2 is reloaded:

- `GET /auth/discord/start` should no longer return `503`
- Expected result: `302` redirect to Discord OAuth authorize URL

The redirect URL should include:

- `client_id`
- `redirect_uri`
- `response_type=code`
- `scope=identify`
- `state`

The redirect URL must not include:

- Discord client secret
- session secret
- session cookie value
- backend private state store contents

## Expected Callback Behavior After Environment Activation

Without a real state generated by the start route:

- `GET /auth/discord/callback?code=test&state=test`

Expected result after environment activation:

- `400`

Expected response:

- `{"error":"Invalid Discord OAuth state"}`

## Auth Safety Checks After Activation

After OAuth environment activation, these must remain true:

- `GET /health -> 200`
- `GET /session/me -> 401`
- `POST /session/dev-login -> 403`

OAuth activation must not:

- issue a session before Discord identity verification
- bypass state validation
- enable dev-login
- weaken session protection
- mutate users
- mutate roles
- mutate CNX
- mutate NFTs
- mutate rewards
- mutate progression state

## Failure Conditions

Stop immediately if any of the following occur:

- `GET /health` is not `200`
- public API returns `502`
- PM2 restart loop begins
- `/session/me` stops returning `401` while unauthenticated
- `/session/dev-login` stops returning `403` in production
- `/auth/discord/start` exposes secret values
- `/auth/discord/callback` accepts invalid state
- `.env` or secrets appear in `git status`
- any secret appears in terminal output intended for logs or chat

## Rollback Plan

If runtime fails after environment activation:

1. Restore previous `.env` from secure server-side backup if needed.
2. Reload backend:
   - `pm2 reload citadel-backend --update-env`
3. Verify:
   - `GET /health -> 200`
   - `GET /session/me -> 401`
   - `POST /session/dev-login -> 403`

If code rollback is needed, use the last verified runtime checkpoint.

## Non-Goals

This step does not implement:

- Discord token exchange
- Discord identity lookup
- session issuance
- frontend login button changes
- user database mutation
- role mutation
- CNX mutation
- NFT mutation
- reward mutation
- progression mutation
- package changes
- schema changes
- production secrets

## Next Authorized Step

Next step:

- Step 92 — Backend OAuth Environment Activation Plan Merge Verification

Then:

- Step 93 — Server-Side OAuth Environment Value Insertion

No OAuth secrets should be pasted into chat or committed to Git.
