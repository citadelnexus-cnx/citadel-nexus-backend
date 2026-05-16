# Citadel Nexus Backend Discord OAuth Token Exchange Contract

## Status

PROPOSED CONTRACT.

## Date

2026-05-16 UTC

## Purpose

This document defines the backend Discord OAuth token exchange contract before implementation.

It exists to prevent auth drift, secret exposure, unsafe session issuance, and accidental user/role/progression mutation.

---

## Current Verified Runtime State

Current backend runtime checkpoint:

- Step 95 — Backend OAuth Environment Activation Runtime Checkpoint

Current verified commit:

- `765b784` — Merge pull request #20 from `docs/backend-oauth-environment-activation-runtime-checkpoint`

Current OAuth start behavior:

- `GET /auth/discord/start -> 302`
- redirects to Discord OAuth authorize endpoint
- includes `client_id`
- includes `redirect_uri`
- includes `response_type=code`
- includes `scope=identify`
- includes `state`

Current invalid callback behavior:

- `GET /auth/discord/callback?code=test&state=test -> 400`
- response: `{"error":"Invalid Discord OAuth state"}`

Current auth safety behavior:

- `GET /health -> 200`
- `GET /session/me -> 401`
- `POST /session/dev-login -> 403`

---

## Token Exchange Boundary

The next implementation layer may add Discord OAuth token exchange only after:

1. OAuth state validation succeeds.
2. `code` is present.
3. required OAuth environment values are present.
4. backend performs the token exchange server-side only.
5. no token or secret is returned to the frontend.
6. no session is issued until Discord identity is verified in a later authorized layer.

---

## Allowed Token Exchange Route

Route:

- `GET /auth/discord/callback`

Allowed behavior after valid state:

- accept `code`
- exchange `code` for Discord token response server-side
- validate token exchange response shape
- avoid logging token values
- avoid returning token values
- stop before session issuance unless separately authorized

---

## Required Discord Token Endpoint

Discord token endpoint:

- `https://discord.com/api/oauth2/token`

Required request method:

- `POST`

Required content type:

- `application/x-www-form-urlencoded`

Required request fields:

- `client_id`
- `client_secret`
- `grant_type=authorization_code`
- `code`
- `redirect_uri`

Expected configured redirect URI:

- `https://api.citadelnexus.app/auth/discord/callback`

---

## Token Response Handling

The backend may receive:

- `access_token`
- `token_type`
- `expires_in`
- `refresh_token`
- `scope`

Handling rules:

- do not log tokens
- do not send tokens to frontend
- do not store tokens yet
- do not commit token examples
- do not expose tokens in error messages
- do not issue a session from token exchange alone

---

## Expected Success Behavior For This Layer

After token exchange is implemented, a real Discord callback with valid state and valid code should:

- pass OAuth state validation
- exchange code successfully
- receive Discord token response
- continue to the next controlled stop point
- not issue a session yet
- not mutate users
- not mutate roles
- not mutate CNX
- not mutate NFTs
- not mutate rewards
- not mutate progression state

The temporary expected response may be a controlled non-secret message such as:

- `Discord OAuth token exchange completed, identity lookup is not implemented yet`

---

## Expected Failure Behavior

Missing code:

- `400`

Invalid/missing state:

- `400`

Missing OAuth configuration:

- `503`

Discord token exchange failure:

- `502` or controlled `401` depending on failure type

Network or provider failure:

- fail closed
- no session issued
- no token values logged
- no token values returned

---

## Logging Rules

Allowed logs:

- callback started
- state valid
- token exchange attempted
- token exchange succeeded
- token exchange failed with safe reason/category

Forbidden logs:

- `client_secret`
- `access_token`
- `refresh_token`
- raw token response body
- session secret
- cookie value
- full authorization URL query string
- full callback query string containing `code`

---

## Security Requirements

The implementation must:

- keep token exchange server-side
- never expose `DISCORD_CLIENT_SECRET`
- never expose `SESSION_SECRET`
- never expose Discord tokens
- never issue session before identity verification
- never bypass OAuth state validation
- never enable production dev-login
- never mutate user state before explicit identity contract
- never mutate role state before explicit role contract

---

## Non-Goals

This contract does not implement:

- token exchange code
- Discord identity lookup
- session issuance
- user creation
- user linking
- role sync
- CNX mutation
- NFT mutation
- reward mutation
- progression mutation
- frontend login UI changes
- package changes
- schema changes
- migrations

---

## Next Authorized Step

Next step:

- Step 98 — Backend Discord OAuth Token Exchange Contract Merge Verification

Then:

- Step 99 — Backend Discord OAuth Token Exchange Implementation

No token exchange code should be written until this contract is merged and verified.
