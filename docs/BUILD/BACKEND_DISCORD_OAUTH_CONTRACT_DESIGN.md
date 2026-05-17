# Citadel Nexus Backend Discord OAuth Contract Design

## Status

PROPOSED CONTRACT.

## Date

2026-05-14 UTC

## Purpose

This document defines the backend Discord OAuth contract before implementation.

It exists to prevent auth drift, protect session authority, and ensure the frontend only consumes backend-issued session state.

---

## Decision Basis

The approved production login method is Discord OAuth.

The backend remains the source of truth for authentication and session issuance.

The frontend must not issue, fake, store, or recover sessions.

---

## Production Auth Authority

Session authority:

- backend

Session cookie:

- `cnx_session`

Primary identity provider:

- Discord OAuth

Primary member identifier:

- Discord user ID

Frontend responsibility:

- redirect user to backend login route
- consume backend session state
- show no-session state when unauthenticated

Backend responsibility:

- own Discord OAuth flow
- validate OAuth state
- exchange authorization code server-side
- resolve or create member identity
- issue secure HTTP-only session cookie
- fail closed on invalid or missing auth

---

## Proposed Backend Routes

### Start Discord OAuth

Route:

- `GET /auth/discord/start`

Purpose:

- begins Discord OAuth login flow

Expected behavior:

- creates a signed or stored OAuth state value
- redirects user to Discord authorization URL
- does not expose Discord client secret
- does not create a member session yet

Expected success result:

- `302` redirect to Discord OAuth authorization URL

Expected failure result:

- `500` or safe error redirect if Discord OAuth config is missing

---

### Discord OAuth Callback

Route:

- `GET /auth/discord/callback`

Purpose:

- handles Discord OAuth callback after user authorization

Expected behavior:

- validates `state`
- validates `code`
- exchanges authorization code for access token server-side
- fetches Discord user profile server-side
- resolves or creates Citadel Nexus member identity using Discord user ID
- creates backend session
- sets `cnx_session` as an HTTP-only secure cookie
- redirects user to frontend member surface

Expected success result:

- `302` redirect to frontend `/app`

Expected failure result:

- `302` redirect to frontend no-session/error state
- no session cookie issued on failure

---

### Current Session Check

Existing route:

- `GET /session/me`

Purpose:

- returns current backend-authenticated user/session state

Expected authenticated result:

- `200`
- user/session payload

Expected unauthenticated result:

- `401`

Current production result:

- unauthenticated `GET /session/me -> 401`

---

### Logout

Existing route:

- `POST /session/logout`

Purpose:

- clears backend session

Expected result:

- clears `cnx_session`
- returns safe logout response
- future `GET /session/me` returns `401`

---

### Dev Login

Existing route:

- `POST /session/dev-login`

Production requirement:

- must remain disabled in production

Current production result:

- `403`
- `{"error":"This route is disabled in production"}`

This route must not become a production login path.

---

## Required Backend Environment Variables

Required future backend variables:

- `DISCORD_CLIENT_ID`
- `DISCORD_CLIENT_SECRET`
- `DISCORD_OAUTH_REDIRECT_URI`
- `DISCORD_OAUTH_SCOPES`
- `SESSION_SECRET`
- `FRONTEND_ORIGIN`
- `CORS_ORIGINS`

Rules:

- do not commit real values
- do not print secrets in logs
- do not expose `DISCORD_CLIENT_SECRET` to frontend code
- validate required variables at startup or route execution
- fail closed when required variables are missing

---

## Required Frontend Environment Variables

Expected frontend variables already aligned:

- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_BACKEND_URL`

Frontend login CTA should target backend route:

- `${NEXT_PUBLIC_API_BASE_URL}/auth/discord/start`

The frontend must not store:

- Discord client secret
- session secret
- OAuth tokens
- backend session material

---

## OAuth State Requirements

The backend OAuth flow must validate state.

State must protect against:

- forged callbacks
- CSRF attempts
- callback replay
- unintended redirect abuse

Acceptable implementation options:

- signed state cookie
- short-lived server-side state store
- signed encoded state with expiry

Minimum requirements:

- state must be unpredictable
- state must expire
- callback must reject missing state
- callback must reject mismatched state
- callback must reject reused/invalid state

---

## Cookie Requirements

The backend session cookie must be:

- HTTP-only
- secure in production
- same-site protected
- scoped to the correct domain/path
- cleared on logout
- not accessible to frontend JavaScript

Cookie name:

- `cnx_session`

Cookie behavior must support:

- frontend origin: `https://www.citadelnexus.app`
- backend origin: `https://api.citadelnexus.app`
- credentialed requests from frontend to backend

---

## CORS Requirements

Backend must allow the production frontend origin:

- `https://www.citadelnexus.app`

Backend credentialed requests must support:

- `Access-Control-Allow-Credentials: true`

Backend must not allow broad unsafe production origins.

Allowed origins should come from config.

---

## Member Resolution Requirements

Discord OAuth callback must resolve member identity by Discord user ID.

Minimum member identity fields:

- Discord user ID
- Discord username or display name
- Discord avatar, if available
- session creation timestamp
- last login timestamp

Existing member/progression state should remain backend-controlled.

If no existing member exists:

- create a new backend member record only after valid Discord identity is confirmed

If existing member exists:

- update safe profile metadata only
- do not reset progression
- do not mutate roles or rewards during login

---

## Security Requirements

Implementation must:

- exchange OAuth code server-side only
- keep Discord client secret server-side only
- validate OAuth state
- reject invalid callbacks
- issue session only after Discord identity is verified
- use secure HTTP-only cookies
- fail closed on auth errors
- avoid public dev-login restoration
- avoid logging secrets or tokens
- avoid committing `.env` files
- avoid role mutation during login
- avoid CNX/token gating during login

---

## Non-Goals For This Step

This contract does not implement:

- Discord OAuth routes
- database migrations
- frontend login UI changes
- wallet login
- email/password login
- Supabase Auth
- Discord role mutation
- CNX entitlement checks
- NFT gating
- rewards logic

---

## Success Criteria For Future Implementation

The future implementation will be considered successful only when:

- `GET /auth/discord/start` redirects to Discord OAuth
- `GET /auth/discord/callback` validates callback state
- valid callback creates a backend session
- `cnx_session` is issued as secure HTTP-only cookie
- frontend `/app` loads authenticated state after callback
- `GET /session/me` returns `200` for valid session
- `POST /session/logout` clears session
- `GET /session/me` returns `401` after logout
- invalid callback does not issue a session
- production `POST /session/dev-login` remains `403`
- no secrets are committed
- backend build passes
- backend working tree remains clean after merge

---

## Next Authorized Step

Next step:

- Step 71 — Backend Discord OAuth Environment Contract

No OAuth code should be written until required environment names, redirect URIs, cookie domain behavior, and failure modes are finalized.
