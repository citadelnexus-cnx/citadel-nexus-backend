# Citadel Nexus Backend Discord OAuth Implementation Plan

## Status

PROPOSED PLAN.

## Date

2026-05-15 UTC

## Purpose

This document defines the safe implementation plan for backend Discord OAuth before code changes begin.

The goal is to add production login without breaking the existing backend session authority model.

## Current Approved Direction

Production login method:

- Discord OAuth

Session authority:

- backend

Session cookie:

- `cnx_session`

Frontend responsibility:

- redirect to backend OAuth start route
- consume backend session state only

Backend responsibility:

- handle OAuth flow
- validate callback state
- resolve Discord identity
- issue backend session
- fail closed on all auth errors

## Existing Backend Foundation

Existing backend session routes:

- `GET /session/me`
- `POST /session/logout`
- `POST /session/dev-login`

Existing production behavior:

- unauthenticated `GET /session/me -> 401`
- production `POST /session/dev-login -> 403`

Existing source-of-truth documents:

- `docs/BUILD/BACKEND_DISCORD_OAUTH_CONTRACT_DESIGN.md`
- `docs/BUILD/BACKEND_DISCORD_OAUTH_ENVIRONMENT_CONTRACT.md`

## Implementation Phases

### Phase 1 — Environment Placeholder Alignment

Update `.env.example` with placeholder names only.

Expected placeholders:

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

No real secrets may be committed.

### Phase 2 — OAuth Route Skeleton

Add backend OAuth routes:

- `GET /auth/discord/start`
- `GET /auth/discord/callback`

Initial route behavior should fail closed if required environment variables are missing.

No session should be issued until Discord identity verification is complete.

### Phase 3 — OAuth State Protection

Implement state creation and validation.

State must be:

- unpredictable
- short-lived
- validated on callback
- rejected if missing
- rejected if mismatched
- rejected if expired

### Phase 4 — Discord Server-Side Exchange

Backend exchanges the Discord authorization code server-side.

Backend must not expose:

- Discord client secret
- OAuth access token
- OAuth refresh token
- session secret

### Phase 5 — Discord Identity Resolution

Backend fetches Discord user identity server-side.

Minimum required identity:

- Discord user ID

Optional safe metadata:

- username
- global name or display name
- avatar

Login must not mutate:

- rewards
- roles
- CNX balances
- progression state
- NFT state

### Phase 6 — Session Issuance

Backend creates a valid `cnx_session` only after Discord identity is verified.

Cookie must be:

- HTTP-only
- secure in production
- same-site protected
- cleared by logout
- unavailable to frontend JavaScript

### Phase 7 — Callback Redirect

Successful login redirects to:

- `https://www.citadelnexus.app/app`

Failed login redirects to:

- `https://www.citadelnexus.app/app?auth=failed`

Failure must not issue a session cookie.

### Phase 8 — Runtime Verification

Required runtime checks after implementation:

- `GET /auth/discord/start` redirects to Discord OAuth
- invalid callback fails closed
- valid callback creates backend session
- `GET /session/me` returns `200` after login
- `POST /session/logout` clears session
- `GET /session/me` returns `401` after logout
- production `POST /session/dev-login` remains `403`

## Files Likely In Scope Later

Likely backend files:

- `src/routes/sessionRoutes.ts`
- `src/services/sessionService.ts`
- `src/middleware/httpAuth.ts`
- `src/types/httpAuth.ts`
- `src/index.ts` or route registration file
- `.env.example`

Possible new backend files:

- `src/routes/authRoutes.ts`
- `src/services/discordOAuthService.ts`
- `src/services/oauthStateService.ts`
- `src/types/discordOAuth.ts`

## Explicit Non-Goals

Do not implement in the first OAuth code step:

- Discord role mutation
- CNX gating
- NFT gating
- wallet login
- email/password login
- Supabase Auth
- rewards changes
- progression mutations
- frontend dashboard redesign

## Security Requirements

The implementation must:

- keep secrets backend-only
- validate OAuth state
- fail closed when config is missing
- fail closed on invalid callback
- avoid wildcard credentialed CORS
- avoid logging secrets
- avoid logging tokens
- avoid public dev-login restoration
- avoid committing `.env`
- preserve current production dev-login disablement

## First Code Step Recommendation

The first implementation step should be:

- Step 73 — Backend OAuth Environment Placeholder Update

Reason:

- it updates `.env.example` only
- it creates no live behavior
- it gives future code a stable config contract
- it is low-risk and easy to review

## Completion Standard

This implementation plan is complete when:

- it is merged into backend main
- backend build passes
- working tree is clean
- merged branch is deleted locally and remotely
