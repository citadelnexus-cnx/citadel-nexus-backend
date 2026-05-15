# Citadel Nexus Backend Discord OAuth Environment Contract

## Status

PROPOSED CONTRACT.

## Date

2026-05-15 UTC

## Purpose

This document defines the required environment contract for the future backend Discord OAuth implementation before OAuth code is written.

## Production Domains

Frontend production origin:

- `https://www.citadelnexus.app`

Backend production API origin:

- `https://api.citadelnexus.app`

Backend Discord OAuth callback URL:

- `https://api.citadelnexus.app/auth/discord/callback`

Frontend post-login return URL:

- `https://www.citadelnexus.app/app`

Frontend post-auth failure URL:

- `https://www.citadelnexus.app/app?auth=failed`

## Required Backend Environment Variables

Discord OAuth:

- `DISCORD_CLIENT_ID`
- `DISCORD_CLIENT_SECRET`
- `DISCORD_OAUTH_REDIRECT_URI`
- `DISCORD_OAUTH_SCOPES`

Expected OAuth values:

- `DISCORD_OAUTH_REDIRECT_URI=https://api.citadelnexus.app/auth/discord/callback`
- `DISCORD_OAUTH_SCOPES=identify`

Session security:

- `SESSION_SECRET`
- `SESSION_COOKIE_NAME`
- `SESSION_COOKIE_DOMAIN`
- `SESSION_COOKIE_SECURE`
- `SESSION_COOKIE_SAME_SITE`
- `SESSION_COOKIE_HTTP_ONLY`

Expected session values:

- `SESSION_COOKIE_NAME=cnx_session`
- `SESSION_COOKIE_SECURE=true`
- `SESSION_COOKIE_SAME_SITE=lax`
- `SESSION_COOKIE_HTTP_ONLY=true`

Frontend and CORS:

- `FRONTEND_ORIGIN`
- `CORS_ORIGINS`

Expected frontend/CORS values:

- `FRONTEND_ORIGIN=https://www.citadelnexus.app`
- `CORS_ORIGINS=https://www.citadelnexus.app`

Runtime:

- `NODE_ENV=production`

## Required Frontend Environment Variables

Frontend variables already expected by the current frontend contract:

- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_BACKEND_URL`

Expected production value:

- `https://api.citadelnexus.app`

Frontend login CTA should redirect to:

- `${NEXT_PUBLIC_API_BASE_URL}/auth/discord/start`

## Discord Developer Portal Requirements

Discord application settings must include this exact OAuth redirect URI:

- `https://api.citadelnexus.app/auth/discord/callback`

Required OAuth scope:

- `identify`

Do not enable broader scopes until needed.

## Security Rules

The implementation must:

- keep `DISCORD_CLIENT_SECRET` backend-only
- keep `SESSION_SECRET` backend-only
- validate OAuth state
- reject invalid callbacks
- reject missing Discord identity
- set secure HTTP-only cookie in production
- avoid wildcard credentialed CORS
- avoid public dev-login restoration
- avoid committing `.env`
- avoid logging OAuth tokens
- avoid logging session material
- avoid role mutation during login
- avoid CNX gating during login

## Required `.env.example` Update In Future Code Step

A future implementation step may update `.env.example` with placeholder names only.

Allowed placeholder format:

```env
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
DISCORD_OAUTH_REDIRECT_URI=
DISCORD_OAUTH_SCOPES=identify
SESSION_SECRET=
SESSION_COOKIE_NAME=cnx_session
SESSION_COOKIE_DOMAIN=
SESSION_COOKIE_SECURE=true
SESSION_COOKIE_SAME_SITE=lax
SESSION_COOKIE_HTTP_ONLY=true
FRONTEND_ORIGIN=https://www.citadelnexus.app
CORS_ORIGINS=https://www.citadelnexus.app
```

Do not add real secret values.

## Missing Environment Behavior

If required Discord OAuth variables are missing:

/auth/discord/start must fail closed
/auth/discord/callback must fail closed
no session cookie should be issued
no Discord client secret should be logged

If required session variables are missing:

session issuance must fail closed
no partial or insecure cookie should be issued

If required CORS variables are missing:

backend should not default to broad credentialed access
## Non-Goals For This Step

This document does not implement:

Discord OAuth routes
Discord Developer Portal setup
backend session code
frontend login UI
database migrations
cookie changes
CORS code changes
package dependency changes
## Success Criteria For Future Implementation

The environment contract is satisfied when:

backend production env contains required Discord OAuth values
backend production env contains required session values
backend production env contains required frontend/CORS values
Discord Developer Portal contains exact callback URL
frontend public env points to backend API
no real secrets are committed
backend fails closed when required auth env is missing
production dev-login remains disabled
## Next Authorized Step

Next step:

Step 72 — Backend Discord OAuth Implementation Plan

No OAuth code should be written until this environment contract is merged and verified.
