# Citadel Nexus Backend OAuth Environment Activation Runtime Checkpoint

## Status

VERIFIED COMPLETE.

## Date

2026-05-16 UTC

## Purpose

This checkpoint records the controlled backend OAuth environment activation reload.

It confirms that Discord OAuth/session environment values were inserted server-side, PM2 was reloaded with updated environment values, backend health remained stable, OAuth start now redirects to Discord, invalid callback state is rejected, and existing auth protections remain intact.

---

## Repository

Repository:

- `citadelnexus-cnx/citadel-nexus-backend`

Source-of-truth branch:

- `main`

Verified runtime commit:

- `92ad4c4` — Merge pull request #19 from `docs/backend-oauth-environment-activation-plan`

Activation plan commit:

- `e7038c9` — `docs(build): add backend OAuth environment activation plan`

---

## Environment Activation Summary

Environment values were inserted server-side only.

No real secrets were committed.

No real secrets were pasted into documentation.

No real secrets were printed in the shared verification output.

Required values confirmed as present before reload:

- `DISCORD_CLIENT_ID`
- `DISCORD_CLIENT_SECRET`
- `DISCORD_OAUTH_REDIRECT_URI`
- `DISCORD_OAUTH_SCOPES`
- `SESSION_SECRET`
- `SESSION_COOKIE_NAME`
- `SESSION_COOKIE_DOMAIN`
- `SESSION_COOKIE_SECURE`
- `SESSION_COOKIE_SAME_SITE`
- `SESSION_COOKIE_HTTP_ONLY`
- `FRONTEND_ORIGIN`
- `CORS_ORIGINS`

---

## Discord Developer Portal State

Discord OAuth redirect URI configured:

- `https://api.citadelnexus.app/auth/discord/callback`

OAuth scope selected:

- `identify`

Public Client:

- disabled / off

This matches the intended server-side OAuth flow.

---

## Runtime Deployment Action

Controlled reload performed:

- `pm2 reload citadel-backend --update-env`

Backend process changed from:

- previous PID: `81665`

To:

- new PID: `89559`

PM2 status after reload:

- `citadel-backend` online
- `citadel-ascension` online
- backend process stable after wait period

---

## Verified Health Results

Local backend health:

- `LOCAL GET /health -> 200`

Public backend health:

- `PUBLIC GET /health -> 200`

Result:

- backend API remained healthy after reload
- public Nginx/API path remained healthy after reload

---

## Verified OAuth Start Behavior

Public OAuth start route:

- `PUBLIC GET /auth/discord/start -> 302`

Redirect target:

- `REDIRECT_TARGET -> DISCORD_OAUTH_AUTHORIZE`

Sanitized redirect target:

- `LOCATION_ORIGIN_PATH -> https://discord.com/oauth2/authorize`

Required redirect parameters confirmed present:

- `client_id`
- `redirect_uri`
- `response_type=code`
- `scope=identify`
- `state`

Result:

- OAuth start route is active
- backend generates OAuth state
- backend redirects to Discord OAuth authorize endpoint
- redirect does not expose client secret
- redirect does not expose session secret
- redirect does not expose session cookie value
- redirect does not expose backend private state store contents

---

## Verified OAuth Callback Invalid State Behavior

Public OAuth callback route with invalid state:

- `PUBLIC GET /auth/discord/callback -> 400`

Expected response:

- `{"error":"Invalid Discord OAuth state"}`

Result:

- callback route rejects invalid state
- state validation remains active
- callback does not proceed to token exchange on invalid state
- callback does not issue a session on invalid state

---

## Verified Existing Auth Safety Results

Public unauthenticated session check:

- `PUBLIC GET /session/me -> 401`

Expected response:

- `{"error":"Authentication required"}`

Public production dev-login check:

- `PUBLIC POST /session/dev-login -> 403`

Expected response:

- `{"error":"This route is disabled in production"}`

Result:

- session protection remains intact
- production dev-login remains disabled
- OAuth environment activation did not weaken existing auth behavior

---

## Current Safe Runtime State

The backend is now in the correct OAuth activation state:

- backend health is good
- public API health is good
- OAuth environment values are present
- OAuth start route returns `302`
- OAuth start route redirects to Discord OAuth authorize endpoint
- OAuth start route includes required safe OAuth parameters
- OAuth callback rejects invalid state with `400`
- existing unauthenticated session protection returns `401`
- production dev-login returns `403`
- no Discord token exchange is active
- no Discord identity lookup is active
- no session issuance occurs through OAuth routes yet
- no user mutation occurs through OAuth routes
- no role mutation occurs through OAuth routes
- no CNX, NFT, reward, or progression mutation occurs through OAuth routes

---

## Known Follow-Up

Discord OAuth start is active.

Discord OAuth callback still intentionally stops before token exchange/session issuance.

Next implementation layer should add token exchange only after a separate plan, branch, build, PR, merge, runtime test, and checkpoint.

---

## Scope

Documentation only.

No backend code, route behavior, auth logic, session logic, cookie behavior, CORS behavior, package dependencies, environment values, deployment settings, database migrations, or secrets changed in this checkpoint.

---

## Next Authorized Step

Next step:

- Step 96 — Backend OAuth Environment Activation Runtime Checkpoint Branch Cleanup

Then continue with the next OAuth implementation layer only after checkpoint cleanup is complete.
