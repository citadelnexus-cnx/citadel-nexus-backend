# Citadel Nexus Phase 2 Auth & Permission Review

## 1. Purpose

This document audits authentication, authorization, route permissions, admin controls, and exposed mutation paths.

## 2. Branch

audit/phase-2-auth-permission-review

## 3. Scope

Review only. Do not change application behavior yet.

## 4. Priority Targets

- POST /user/:id/xp
- payout mutation routes
- session dev login
- role-sync mark-synced routes
- discord-sync-worker mark-synced routes
- access expiration runner
- temp access purchase
- all-record read routes
- admin command permission boundaries

## 5. Rules

- Do not expose secrets.
- Do not edit route behavior during audit.
- Do not run migrations.
- Do not deploy Discord commands.
- Do not mutate roles.
- Do not change economy constants.
- Document findings before implementation.

## 6. Initial Status

Status:

IN_PROGRESS.


---

## 7.1 Initial Auth Surface Inventory

Status:

PASS WITH HIGH-RISK FINDINGS.

Commands run:

find src -type f | grep -Ei "auth|permission|guard|middleware|session|jwt|role|access|verify|admin" | sort

git grep -nE "router\\.(get|post|put|patch|delete)|app\\.use" -- src/routes src/index.ts

git grep -nE "isFounder|FOUNDER_IDS|ADMIN|admin|session|dev-login|authorization|Authorization|Bearer|token|req\\.headers|req\\.user|isVerified|payoutEligible|canExecute|permission|role|mark-synced|expire/run|purchase" -- src/routes src/services src/modules/ascension | head -n 300

sed -n '1,260p' src/routes/userRoutes.ts
sed -n '1,260p' src/routes/payoutRoutes.ts
sed -n '1,220p' src/routes/sessionRoutes.ts

Verified auth/permission/session-related files surfaced:

- src/config/discordRoleMap.ts
- src/config/discordRoleRegistry.ts
- src/modules/ascension/admin/admin-handler.js
- src/modules/ascension/admin/admin-schema.js
- src/modules/ascension/admin/admin-service.js
- src/modules/ascension/admin/prize-pool-schema.js
- src/routes/accessRoutes.ts
- src/routes/roleSyncRoutes.ts
- src/routes/sessionRoutes.ts
- src/routes/tempAccessRoutes.ts
- src/services/accessStateService.ts
- src/services/ascensionAdminService.ts
- src/services/discordRoleMutationService.ts
- src/services/discordRoleSyncAuditStore.ts
- src/services/discordRoleSyncExecutionService.ts
- src/services/discordRoleSyncVerificationService.ts
- src/services/roleSyncService.ts
- src/services/tempAccessService.ts

Verified mounted route groups:

- /user
- /payout
- /token
- /access
- /temp-access
- /entitlements
- /role-sync
- /discord-sync-worker
- /session
- /member-state
- /ascension-summary

Initial high-risk route findings:

- POST /user/:id/xp is route-accessible and mutates XP through addXP.
- POST /user/:id/discord links Discord identity by body input.
- POST /user/:id/wallet binds wallet by body input.
- GET /user/:id exposes user record by route param.
- GET /user/:id/balance exposes CNX balance, reserved CNX, and available CNX.
- GET /user/:id/payout-ready exposes payout readiness by route param.
- GET /payout/log/all exposes the payout log.
- POST /payout/:userId/queue queues payout by route param.
- POST /payout/:payoutId/approve approves payout using body adminId.
- POST /payout/:payoutId/reject rejects payout using body reason/adminId.
- POST /payout/:payoutId/send marks payout sent using body txId.
- POST /payout/:payoutId/confirm confirms payout by route param.
- POST /payout/:payoutId/fail fails payout using body reason.
- GET /payout/:payoutId exposes payout by route param.
- POST /session/dev-login creates an in-memory session from userId or username.
- GET /session/me reads session from cookie.
- POST /session/logout clears session cookie.

Initial auth findings:

- The inspected user route file does not show route-level authentication middleware.
- The inspected user route file does not show route-level authorization checks.
- The inspected payout route file does not show route-level authentication middleware.
- The inspected payout route file does not show route-level authorization checks.
- Payout approval depends on a body-provided adminId, not an authenticated principal in the route.
- The inspected session route file provides dev-login behavior and uses an in-memory session store.
- The inspected session route file sets HttpOnly cookies and uses Secure only when NODE_ENV is production.
- The admin Discord command surface uses FOUNDER_IDS and isFounder checks, but this is separate from HTTP API route protection.

Terminal artifact note:

Some terminal output contained pasted-command interleaving during the first inventory run. The route and file findings above rely on readable route output and should be verified again before implementation work.

Follow-up required:

- inspect accessRoutes.ts
- inspect tempAccessRoutes.ts
- inspect roleSyncRoutes.ts
- inspect discordSyncWorkerRoutes.ts
- inspect entitlementRoutes.ts
- inspect memberStateRoutes.ts
- inspect ascensionSummaryRoutes.ts
- inspect whether any HTTP auth middleware exists outside the initial filename search
- classify every route as public, session-user, admin-only, internal-worker-only, or disabled-in-production
- do not change route behavior during this review


---

## 7.2 Remaining Route Permission Review

Status:

PASS WITH HIGH-RISK FINDINGS.

Commands run:

sed -n '1,180p' src/routes/accessRoutes.ts
sed -n '1,120p' src/routes/tempAccessRoutes.ts
sed -n '1,120p' src/routes/roleSyncRoutes.ts
sed -n '1,120p' src/routes/discordSyncWorkerRoutes.ts
sed -n '1,140p' src/routes/entitlementRoutes.ts
sed -n '1,100p' src/routes/memberStateRoutes.ts
sed -n '1,190p' src/routes/ascensionSummaryRoutes.ts
npm run build
git status

Verified route files reviewed:

- src/routes/accessRoutes.ts
- src/routes/tempAccessRoutes.ts
- src/routes/roleSyncRoutes.ts
- src/routes/discordSyncWorkerRoutes.ts
- src/routes/entitlementRoutes.ts
- src/routes/memberStateRoutes.ts
- src/routes/ascensionSummaryRoutes.ts

Verified build result:

- npm run build completed successfully.

Route permission findings:

accessRoutes:

- GET /access returns all access states.
- POST /access/expire/run triggers entitlement expiration.
- GET /access/:userId/modifiers returns access modifiers by userId.
- POST /access/:userId/refresh refreshes access state by userId.
- GET /access/:userId returns access state by userId.
- No visible route-level authentication middleware was present.
- No visible route-level authorization checks were present.

tempAccessRoutes:

- POST /temp-access/:id/purchase attempts to purchase temporary access for a route-provided user id.
- accessType is accepted from request body.
- No visible route-level authentication middleware was present.
- No visible route-level authorization check confirms the caller owns the user id.
- Important implementation note: purchaseTemporaryAccess is async, but the inspected route does not await it. This should be reviewed before implementation work.

roleSyncRoutes:

- GET /role-sync returns all role sync payloads.
- GET /role-sync/:userId returns role sync payload by userId.
- POST /role-sync/:userId/mark-synced mutates lastRoleSyncAt.
- No visible route-level authentication middleware was present.
- No visible route-level authorization checks were present.

discordSyncWorkerRoutes:

- GET /discord-sync-worker returns all role sync payloads.
- GET /discord-sync-worker/:userId returns role sync payload by userId.
- POST /discord-sync-worker/:userId/mark-synced mutates lastRoleSyncAt.
- No visible route-level authentication middleware was present.
- No visible internal-worker authorization checks were present.

entitlementRoutes:

- GET /entitlements returns all entitlements.
- GET /entitlements/user/:userId returns all entitlements for a user.
- GET /entitlements/user/:userId/active returns active entitlements for a user.
- GET /entitlements/:id returns entitlement by id.
- No visible route-level authentication middleware was present.
- No visible route-level authorization checks were present.
- Header comment contains path typo: backend/src/rputes/entitlementRoutes.ts.

memberStateRoutes:

- GET /member-state/me uses session cookie through getSessionUserIdFromRequest.
- GET /member-state/:userId returns member state by userId.
- /me has a session requirement.
- /:userId has no visible route-level ownership/admin check.

ascensionSummaryRoutes:

- GET /ascension-summary/me uses session cookie through getSessionUserIdFromRequest.
- GET /ascension-summary/discord/:discordId returns internal/member-safe summary by Discord ID.
- GET /ascension-summary/user/:userId returns internal/member-safe summary by platform userId.
- GET /ascension-summary/public/discord/:discordId returns public-safe card by Discord ID.
- /me has a session requirement.
- /discord/:discordId and /user/:userId have no visible route-level session, ownership, or admin check despite comments describing them as internal/member-safe.
- /public/discord/:discordId appears intentionally public-facing.

High-risk findings:

- All-record routes exist for access states, entitlements, role sync payloads, and Discord sync worker payloads.
- Multiple mutation routes exist without visible route-level auth: access refresh, entitlement expiration runner, role-sync mark-synced, discord-sync-worker mark-synced, and temporary access purchase.
- Internal/worker routes are exposed as HTTP routes without visible internal-worker guard.
- Member-safe/internal summary routes can be queried by route param without visible session ownership checks.
- Temporary access purchase can be requested for any route-provided id unless protected elsewhere.
- The temp access route may have an async handling issue because purchaseTemporaryAccess is not awaited.

Follow-up required:

- classify each route as public, session-user, owner-only, admin-only, internal-worker-only, or disabled-in-production
- design a shared auth/permission middleware strategy
- decide whether all-record routes should be admin-only or disabled in production
- decide whether worker routes require an internal secret, local-only binding, allowlist, or removal
- decide whether member-safe routes require session ownership or admin permission
- fix tempAccessRoutes async behavior only in an implementation branch after audit approval
- do not change route behavior during this review


---

## 7.3 Middleware and Session Infrastructure Review

Status:

PASS WITH HIGH-RISK FINDINGS.

Commands run:

find src -type f | sort

git grep -nE "function .*middleware|const .*middleware|app.use|router.use|next\\(|RequestHandler|express.Router|req.headers|req.cookies|getSessionUserIdFromRequest|SESSION_COOKIE_NAME" -- src | head -n 300

sed -n '1,130p' src/index.ts

sed -n '1,240p' src/routes/sessionRoutes.ts

git status

Verified source structure:

- no dedicated src/middleware directory was present
- no dedicated src/auth directory was present
- no dedicated HTTP permission guard file was surfaced by filename search
- route files are mounted directly from src/index.ts
- session helper is currently implemented inside src/routes/sessionRoutes.ts

Verified global Express middleware:

- CORS middleware is configured globally
- express.json() is configured globally
- no global auth middleware was visible in src/index.ts
- no global admin middleware was visible in src/index.ts
- no global internal-worker middleware was visible in src/index.ts
- no route-level router.use middleware was surfaced by grep

Verified CORS behavior:

- CORS origins are loaded from CORS_ORIGINS or FRONTEND_ORIGIN
- fallback origin is http://localhost:3000
- no-origin requests are allowed
- credentials are enabled

Verified public status routes:

- GET /
- GET /health
- GET /health/db

Verified route mounts:

- /user
- /payout
- /token
- /access
- /temp-access
- /entitlements
- /role-sync
- /discord-sync-worker
- /session
- /member-state
- /ascension-summary

Verified session implementation:

- session cookie name is cnx_session
- session TTL is 7 days
- session records are stored in an in-memory Map
- session tokens are generated with crypto.randomBytes(32).toString("hex")
- session cookies are HttpOnly
- session cookies use SameSite=Lax
- session cookies use Secure only when NODE_ENV is production
- session lookup reads the Cookie header manually
- expired sessions are deleted from the in-memory store
- getSessionUserIdFromRequest returns the userId from a valid session record
- POST /session/dev-login creates a session from userId or username
- POST /session/dev-login can create a new user when username does not exist
- GET /session/me requires a valid session cookie
- POST /session/logout clears the cookie and deletes the session token if present

Verified session usage:

- memberStateRoutes imports getSessionUserIdFromRequest
- ascensionSummaryRoutes imports getSessionUserIdFromRequest
- /member-state/me uses session lookup
- /ascension-summary/me uses session lookup

High-risk findings:

- HTTP route protection is not centralized.
- There is no visible reusable requireAuth middleware.
- There is no visible reusable requireOwnerOrAdmin middleware.
- There is no visible reusable requireAdmin middleware for HTTP routes.
- There is no visible reusable requireInternalWorker middleware.
- The dev session system is in-memory and will reset on process restart.
- POST /session/dev-login is reachable as an HTTP route and can create a session without external identity verification.
- POST /session/dev-login can create a user by username.
- The session cookie is not visibly signed.
- The session cookie does not visibly include CSRF protection.
- CORS allows no-origin requests, which may be acceptable for server-to-server/local checks but should be reviewed for production API exposure.
- Credentials are enabled in CORS, so session-cookie routes should be protected carefully.
- Health routes expose environment value and should remain intentionally public or be reviewed.

Follow-up required:

- design a centralized HTTP auth middleware layer
- decide whether dev-login should be disabled in production
- decide whether sessions should move from in-memory Map to database-backed or signed token-backed storage
- decide whether CSRF protection is required for cookie-authenticated mutation routes
- decide whether no-origin CORS requests should remain allowed
- decide whether /health/db should expose environment value publicly
- classify every route before implementation
- do not change middleware or session behavior during this review

