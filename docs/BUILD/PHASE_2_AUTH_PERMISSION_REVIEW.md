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


---

## 7.4 Route Classification Draft

Status:

PASS WITH HIGH-RISK FINDINGS.

Commands run:

git grep -nE "router\\.(get|post|put|patch|delete)" -- src/routes

git grep -nE "getSessionUserIdFromRequest|cnx_session|dev-login" -- src/routes src/services

git grep -nE "router\\.post|router\\.put|router\\.patch|router\\.delete" -- src/routes

git grep -nE "getAll|buildAll|getPayoutLog|router\\.get\\(\"/\"" -- src/routes src/services

git status

Verified session-using routes:

- GET /session/me
- GET /member-state/me
- GET /ascension-summary/me

Verified mutation routes:

- POST /access/expire/run
- POST /access/:userId/refresh
- POST /discord-sync-worker/:userId/mark-synced
- POST /payout/:userId/queue
- POST /payout/:payoutId/approve
- POST /payout/:payoutId/reject
- POST /payout/:payoutId/send
- POST /payout/:payoutId/confirm
- POST /payout/:payoutId/fail
- POST /role-sync/:userId/mark-synced
- POST /session/dev-login
- POST /session/logout
- POST /temp-access/:id/purchase
- POST /user/create
- POST /user/:id/discord
- POST /user/:id/wallet
- POST /user/:id/xp

Verified read-all routes:

- GET /access
- GET /discord-sync-worker
- GET /entitlements
- GET /payout/log/all
- GET /role-sync

Draft route classification:

Public-safe candidates:

- GET /
- GET /health
- GET /token/info
- GET /ascension-summary/public/discord/:discordId

Public-with-review candidates:

- GET /health/db

Session-user routes:

- GET /session/me
- POST /session/logout
- GET /member-state/me
- GET /ascension-summary/me

Owner-only route candidates:

- GET /user/:id
- GET /user/:id/balance
- GET /user/:id/payout-ready
- POST /user/:id/discord
- POST /user/:id/wallet
- GET /access/:userId
- GET /access/:userId/modifiers
- POST /access/:userId/refresh
- GET /entitlements/user/:userId
- GET /entitlements/user/:userId/active
- GET /member-state/:userId
- GET /ascension-summary/user/:userId

Admin-only route candidates:

- POST /user/:id/xp
- GET /payout/log/all
- GET /payout/:payoutId
- POST /payout/:userId/queue
- POST /payout/:payoutId/approve
- POST /payout/:payoutId/reject
- POST /payout/:payoutId/send
- POST /payout/:payoutId/confirm
- POST /payout/:payoutId/fail
- GET /access
- GET /entitlements
- GET /entitlements/:id
- GET /ascension-summary/discord/:discordId

Internal-worker-only route candidates:

- POST /access/expire/run
- GET /role-sync
- GET /role-sync/:userId
- POST /role-sync/:userId/mark-synced
- GET /discord-sync-worker
- GET /discord-sync-worker/:userId
- POST /discord-sync-worker/:userId/mark-synced

Disabled-in-production candidate:

- POST /session/dev-login

High-risk classification findings:

- POST /user/:id/xp should not remain public because it mutates XP and can indirectly affect CNX rewards.
- Payout routes should not trust adminId from the request body without an authenticated admin principal.
- Read-all routes should not remain public because they expose access states, entitlements, payout logs, and role sync payloads.
- Worker routes should not remain public because they expose and mutate role sync state.
- Owner-scoped routes need an authenticated session user and an ownership check.
- Internal/member-safe Ascension summary routes need session ownership or admin permission.
- POST /session/dev-login should be disabled in production or replaced with real identity authentication.
- POST /temp-access/:id/purchase should require authenticated ownership and should await the async service call.
- Public-safe route classification must be intentionally narrow.

Recommended permission model:

- public: no auth required, read-only, safe for public exposure
- session-user: requires valid session
- owner-only: requires valid session and session userId must match route userId
- admin-only: requires verified admin/founder authority
- internal-worker-only: requires internal worker secret, local-only access, or trusted service identity
- disabled-in-production: blocked when NODE_ENV is production

Follow-up required:

- implement shared middleware only after review approval
- define authenticated principal shape for HTTP requests
- decide how admin authority is represented for HTTP routes
- decide how internal worker routes authenticate
- decide whether dev-login is removed, guarded, or production-disabled
- confirm final route classification before implementation
- do not change route behavior during this audit


---

## 7.5 Service-Level Authorization Gap Review

Status:

PASS WITH HIGH-RISK FINDINGS.

Commands run:

git status

git log --oneline -5

git grep -nE "export async function|async function|\\$transaction|prisma\\.|update\\(|create\\(|delete\\(|findMany|adminId|isVerified|payoutEligible|reservedCnx|cnxBalance|markRoleSync|expireExpiredEntitlements|purchaseTemporaryAccess" -- src/services | head -n 500

sed -n '1,420p' src/services/userService.ts

sed -n '1,320p' src/services/payoutService.ts

sed -n '1,340p' src/services/accessStateService.ts

sed -n '1,220p' src/services/entitlementExpiryService.ts

sed -n '1,220p' src/services/tempAccessService.ts

sed -n '1,220p' src/services/roleSyncService.ts

sed -n '1,180p' src/services/discordSyncWorkerService.ts

git status

Verified working state:

- branch was audit/phase-2-auth-permission-review
- working tree was clean before review
- working tree was clean after review
- latest audit commits were present on the branch

Service-level authorization summary:

The inspected services perform business logic and persistence operations, but they do not appear to enforce HTTP caller identity, route ownership, admin authority, or internal-worker authority directly.

This means route/middleware authorization is required before exposing these services through HTTP routes.

Verified userService behavior:

- createUser creates a user and initializes access state.
- getUserByUsername returns a user by username.
- getUser returns a user by id.
- addXP mutates user XP, level, CNX balance, and access state.
- createUserWithDiscord creates a verified user with Discord identity.
- ensureUserForDiscord links or creates Discord-backed users.
- linkDiscord mutates Discord identity fields and verification state.
- bindWallet mutates wallet and payout eligibility.
- getPayoutReadyUser checks verification, wallet, CNX balance, and reserved CNX.
- deductCnxBalance mutates CNX balance and payout eligibility inside a transaction.
- reserveCnx mutates reserved CNX inside a transaction.
- releaseReservedCnx mutates reserved CNX inside a transaction.
- finalizeReservedCnx mutates reserved CNX, CNX balance, and payout eligibility inside a transaction.

userService high-risk notes:

- addXP can indirectly award CNX through level rewards.
- linkDiscord can mark a user verified.
- bindWallet can make payout eligibility true if the user is verified.
- balance reservation/finalization functions are powerful and must be called only through approved flows.
- no caller authorization or ownership check is visible inside these service functions.

Verified payoutService behavior:

- payout records are stored in an in-memory payoutLog array.
- queuePayout checks payout readiness and reserves available CNX.
- queuePayout creates a queued payout record.
- approvePayout changes a queued payout to approved and records adminId.
- rejectPayout releases reserved CNX and records reason/adminId.
- markPayoutSent records txId and marks payout as sent.
- confirmPayout finalizes reserved CNX and marks payout confirmed.
- failPayout releases reserved CNX and marks payout failed.
- getPayoutLog returns the payout log.
- getPayoutById returns a payout by id.

payoutService high-risk notes:

- payoutLog is in-memory and may reset on process restart.
- approvePayout trusts the adminId argument.
- rejectPayout trusts the optional adminId argument.
- markPayoutSent trusts the txId argument.
- payout lifecycle functions do not authenticate the caller.
- payout lifecycle functions do not verify admin/founder authority.
- payout lifecycle functions must be protected by route middleware or replaced by an approved admin command path.

Verified accessStateService behavior:

- updateAccessState evaluates access state from user CNX balance and active temp entitlements.
- refreshAccessState calls updateAccessState.
- getAccessModifiers can create access state if missing.
- markRoleSync mutates lastRoleSyncAt.
- getAllAccessStates returns all access states.

accessStateService high-risk notes:

- CNX thresholds are used to derive holder/tier/modifier state.
- getAccessModifiers can initialize state as a side effect.
- markRoleSync mutates role sync metadata.
- getAllAccessStates exposes all access states.
- no caller authorization, ownership, admin, or worker check is visible inside these functions.

Verified entitlementExpiryService behavior:

- expireExpiredEntitlements expires due entitlements.
- it refreshes access state for affected users.
- it returns expired counts, entitlement ids, and affected user ids.

entitlementExpiryService high-risk notes:

- expiration is a system/worker operation.
- it should not be public-triggerable without internal-worker authorization.
- service function itself does not authenticate the caller.

Verified tempAccessService behavior:

- supported temporary access types include premium_alpha and partner_offers.
- purchaseTemporaryAccess validates user existence.
- purchaseTemporaryAccess validates supported access type.
- purchaseTemporaryAccess blocks purchase if active temporary access already exists.
- purchaseTemporaryAccess deducts CNX balance.
- purchaseTemporaryAccess creates a temporary_access entitlement.
- purchaseTemporaryAccess updates access state.
- purchaseTemporaryAccess returns remaining CNX balance and entitlement id.

tempAccessService high-risk notes:

- purchaseTemporaryAccess spends user CNX.
- purchaseTemporaryAccess creates entitlement records.
- purchaseTemporaryAccess updates access state.
- service function does not authenticate caller ownership.
- route layer must ensure caller owns the userId or has approved admin authority.

Verified roleSyncService behavior:

- builds role sync payload from access state.
- builds all role sync payloads from all access states.
- maps CNX holder tiers to backend role keys.
- maps premium_alpha temporary access to temp_premium_alpha.
- returns warnings and unsupported temp access type signals.

roleSyncService high-risk notes:

- all-role payload generation can expose role sync state for all users.
- service function does not authenticate caller.
- route layer must make all-payload access internal-worker-only or admin-only.

Verified discordSyncWorkerService behavior:

- builds Discord sync decision from role sync payload and current member role ids.
- resolves backend role keys to Discord role ids.
- calculates desired add/remove role ids.
- blocks execution if unsupported temp access type exists.
- blocks execution if warnings exist.
- blocks execution if role keys cannot resolve to Discord role ids.
- exposes role-key-to-role-id preview.

discordSyncWorkerService high-risk notes:

- service builds executable role mutation decisions.
- service does not authenticate caller.
- route layer must ensure worker-only or admin-only access.
- this service should remain planning/decision-only unless called through approved execution flow.

Core finding:

The backend needs a centralized HTTP permission layer because service functions are not designed to be the trust boundary.

Recommended boundary:

- services validate business rules
- middleware validates caller identity and permissions
- routes connect authenticated callers to allowed service actions
- worker routes require internal-worker authentication
- admin routes require verified admin/founder authority
- owner routes require session ownership checks

Follow-up required:

- add middleware design section
- define AuthenticatedRequest principal shape
- define requireSession middleware
- define requireOwnerOrAdmin middleware
- define requireAdmin middleware
- define requireInternalWorker middleware
- decide production behavior for dev-login
- decide persistence model for payout log and session store
- do not change service behavior during this audit


---

## 7.6 Admin, Worker, and Role Execution Review

Status:

PASS WITH HIGH-RISK FINDINGS.

Commands run:

sed -n '1,260p' src/services/discordRoleMutationService.ts

sed -n '1,260p' src/services/discordRoleSyncExecutionService.ts

sed -n '1,240p' src/services/discordRoleSyncVerificationService.ts

sed -n '1,220p' src/services/discordRoleSyncAuditStore.ts

sed -n '1,220p' src/services/ascensionAdminService.ts

sed -n '1,240p' src/services/ascensionPrizePoolService.ts

git grep -nE "discordRole|executeDiscord|mutateDiscord|admin|prize|FOUNDER|worker|mark-synced|canExecute" -- src/routes src/services src/modules/ascension | head -n 400

npm run build

git status

Verified build result:

- npm run build completed successfully.

Verified git state:

- working tree was clean after review.

Verified Discord role mutation service behavior:

- mutateDiscordRolesForUser calls executeDiscordRoleSyncAttempt.
- mutation result includes before roles, added roles, removed roles, final roles, audit id, execution source, and mutation status.
- mutation blocks when decision.canExecute is false.
- no-op detection is performed before recording mutation as applied.
- audit status is updated to blocked, no_op, or mutated.
- service does not authenticate caller authority.
- service does not verify internal worker identity.
- service does not verify Discord bot permission hierarchy.
- service appears to simulate/record role mutation state, but actual Discord API mutation should still be treated as high-risk if connected elsewhere.

Verified Discord role sync execution behavior:

- executeDiscordRoleSyncAttempt builds a Discord sync decision.
- execution hash is built from decision inputs.
- idempotency key reuse is supported.
- execution hash reuse is supported.
- audit attempt count increments on reuse.
- rollback snapshot JSON is created from current member roles.
- audit record status can be blocked, no_op, or executed.
- service does not authenticate caller authority.
- service does not verify internal worker identity.

Verified Discord role sync verification behavior:

- verifyDiscordRoleSyncResult compares expected final roles against actual member role ids.
- verification updates audit status to verified or failed.
- verification service does not authenticate caller authority.
- verification service does not verify internal worker identity.

Verified Discord role sync audit store behavior:

- audit records are stored in an in-memory object.
- audit records include idempotency key, execution hash, rate limit bucket, final roles, current roles, desired add/remove roles, warnings, and rollback snapshot.
- audit store has execution source values: manual, worker, scheduler, retry, verification, rollback.
- audit store does not persist to database.
- audit store does not authenticate caller authority.
- audit store does not enforce route/worker permission.

Verified Ascension admin service behavior:

- admin service includes rate limiting by adminId and command key.
- lock player mutates isLocked and lockReason.
- unlock player clears lock state.
- reset player creates audit action and pre-reset snapshot.
- delete player creates audit action and pre-delete snapshot.
- restore player restores from snapshots.
- service accepts adminUserId/adminUsername as input.
- service does not itself prove that adminUserId is founder/admin.
- caller layer must verify admin authority before calling these methods.

Verified Ascension prize pool service behavior:

- getOrCreateAscensionPrizePool upserts the main prize pool.
- addXpToPrizePool mutates total available/added XP and logs admin action.
- removeXpFromPrizePool mutates total available/removed XP and logs admin action.
- awardXpFromPrizePoolToUser mutates prize pool and target player XP/rank in a transaction.
- service accepts adminUserId/adminUsername as input.
- service does not itself prove that adminUserId is founder/admin.
- caller layer must verify admin authority before calling these methods.

Verified Discord admin command boundary:

- src/modules/ascension/admin/admin-handler.js loads FOUNDER_IDS from environment.
- isFounder checks interaction.user.id against FOUNDER_IDS.
- admin command handler denies non-founder users at the Discord command layer.
- Discord admin command protection is separate from HTTP route protection.
- HTTP routes should not rely on Discord command handler checks.

High-risk findings:

- HTTP admin/worker route protection is still not centralized.
- Role sync worker routes must not be public because they can expose or mutate sync metadata.
- Discord role sync execution/mutation services rely on caller authorization.
- Discord role sync audit store is in-memory and may reset on process restart.
- Ascension admin/prize services rely on caller authorization.
- Prize pool mutation can alter gameplay XP and ranks.
- Destructive Ascension admin actions can lock, reset, delete, or restore players.
- Payout admin routes currently trust body-provided adminId, while Ascension Discord commands use environment-gated founder checks.
- Authority model is inconsistent across HTTP API and Discord bot surfaces.
- Any future HTTP admin action should use authenticated principal authority, not body-provided adminId.

Recommended authority model:

- Discord bot admin commands: keep FOUNDER_IDS check at command handler boundary.
- HTTP admin routes: require authenticated admin/founder principal.
- Internal worker routes: require internal-worker secret or service identity.
- Role sync execution: require internal-worker or founder/admin authority.
- Prize/payout execution: require founder/admin authority and audit logging.
- Destructive actions: require founder/admin authority, reason, audit record, and confirmation phrase where appropriate.

Follow-up required:

- define a single HTTP authority model
- decide whether HTTP admin authority maps to Discord user id, internal admin allowlist, or future dashboard auth
- add internal-worker authentication design
- protect role sync worker endpoints before production exposure
- protect payout routes before production exposure
- protect Ascension admin HTTP services if exposed later
- persist role sync audit records if they become production-critical
- do not execute live role mutation during this audit
- do not change code during this review


---

## 8. Phase 2 Implementation Plan

Status:

READY FOR REVIEW.

Implementation branch required:

Do not implement on this audit branch.

Recommended implementation branch:

feature/http-auth-permission-layer

Primary goal:

Add a centralized HTTP authentication and permission layer before production exposure of high-risk API routes.

Implementation principles:

- services keep business-rule validation
- middleware verifies caller identity and authority
- routes apply the correct permission class before calling services
- no route should trust body-provided adminId as proof of authority
- no worker route should be public
- owner-scoped routes must verify session ownership
- development-only routes must be disabled in production
- high-risk changes require tests before merge

Recommended implementation order:

1. Add shared HTTP auth types.

Create authenticated request typing for:

- session user id
- admin/founder identity
- internal worker identity
- auth source
- request permission class

2. Extract session parsing.

Move session parsing out of sessionRoutes.ts into a reusable helper or middleware module.

Required helpers:

- getSessionUserIdFromRequest
- requireSession
- optionalSession

3. Add owner authorization middleware.

Required middleware:

- requireOwnerParam(paramName)
- requireOwnerOrAdmin(paramName)

Use for:

- /user/:id
- /user/:id/balance
- /user/:id/payout-ready
- /user/:id/discord
- /user/:id/wallet
- /access/:userId
- /access/:userId/modifiers
- /access/:userId/refresh
- /entitlements/user/:userId
- /entitlements/user/:userId/active
- /member-state/:userId
- /ascension-summary/user/:userId

4. Add admin authorization middleware.

Required middleware:

- requireAdmin
- requireFounder for destructive or treasury-like actions if needed

Use for:

- POST /user/:id/xp
- all payout mutation routes
- payout log read routes
- all-record access state routes
- all-record entitlement routes
- internal/member-safe summary lookup by Discord id unless intentionally public
- any future HTTP admin action

5. Add internal worker authorization middleware.

Required middleware:

- requireInternalWorker

Preferred protection:

- internal worker secret header
- strict constant-time comparison
- no secret logging
- environment variable required in production

Use for:

- POST /access/expire/run
- GET /role-sync
- GET /role-sync/:userId
- POST /role-sync/:userId/mark-synced
- GET /discord-sync-worker
- GET /discord-sync-worker/:userId
- POST /discord-sync-worker/:userId/mark-synced

6. Disable or guard development login.

POST /session/dev-login should be one of:

- disabled when NODE_ENV is production
- protected behind explicit DEV_LOGIN_ENABLED=true
- removed after real auth is implemented

Recommended minimum:

- block in production unless DEV_LOGIN_ENABLED=true
- document that it is not production authentication

7. Fix temporary access route async behavior.

POST /temp-access/:id/purchase should:

- require session ownership or admin authority
- await purchaseTemporaryAccess
- return safe error output
- never allow spending CNX for another user without authorization

8. Replace body-provided adminId trust.

Payout routes should:

- derive admin id from authenticated principal
- ignore or reject body-provided adminId as authority
- keep reason/txId as request body fields where appropriate
- log authenticated admin identity

9. Add route-level tests.

Minimum tests:

- unauthenticated requests fail for protected routes
- wrong-user requests fail for owner-only routes
- same-user requests pass for owner-only routes
- admin requests pass for admin routes
- non-admin requests fail for admin routes
- missing worker secret fails for worker routes
- invalid worker secret fails for worker routes
- valid worker secret passes for worker routes
- dev-login is blocked in production mode
- temp-access purchase awaits async result and blocks wrong-user spend

10. Add safe documentation update.

Update docs after implementation:

- route classification table
- middleware description
- production environment requirements
- internal worker secret policy
- dev-login production behavior
- admin authority source

Recommended route permission matrix:

| Route group | Required permission |
|---|---|
| /health | public |
| /health/db | public-with-review or internal |
| /token/info | public |
| /session/me | session-user |
| /session/logout | session-user |
| /session/dev-login | disabled-in-production |
| /user/:id read routes | owner-or-admin |
| /user/:id mutation routes | owner-or-admin except XP |
| /user/:id/xp | admin-only |
| /payout/* | admin-only |
| /access all-record routes | admin-only |
| /access/expire/run | internal-worker-only |
| /access/:userId routes | owner-or-admin |
| /temp-access/:id/purchase | owner-or-admin |
| /entitlements all-record routes | admin-only |
| /entitlements/user/:userId routes | owner-or-admin |
| /role-sync/* | internal-worker-only |
| /discord-sync-worker/* | internal-worker-only |
| /member-state/me | session-user |
| /member-state/:userId | owner-or-admin |
| /ascension-summary/me | session-user |
| /ascension-summary/public/discord/:discordId | public |
| /ascension-summary/user/:userId | owner-or-admin |
| /ascension-summary/discord/:discordId | admin-only or owner-resolved |

High-risk implementation blockers:

- final admin authority source must be selected
- internal worker secret variable name must be selected
- production behavior for dev-login must be selected
- route classification must be approved before code changes
- no secrets should be pasted into docs or chat

Recommended environment variables:

- INTERNAL_WORKER_SECRET
- DEV_LOGIN_ENABLED
- HTTP_ADMIN_DISCORD_IDS or future dashboard/admin identity source

Approval required before implementation:

YES.


---

## 9. Final Phase 2 Review Summary

Status:

COMPLETE.

Final result:

Phase 2 Auth & Permission Review is complete as documentation-only / inspection-only work.

No application behavior was changed.

No middleware was implemented on this branch.

No route behavior was changed.

No migrations were created or run.

No Discord commands were deployed.

No Discord role mutation was executed.

No secrets were printed into this document.

Primary conclusion:

The backend needs a centralized HTTP authentication and authorization layer before production exposure of high-risk API routes.

Highest-priority implementation risks:

- unauthenticated mutation routes
- public read-all routes
- body-provided adminId trust
- internal worker routes without visible worker authentication
- owner-scoped routes without ownership enforcement
- production-accessible dev login
- temporary access route async/ownership issue
- inconsistent authority model between Discord bot commands and HTTP API routes

Approved next branch type:

feature branch only.

Recommended next branch:

feature/http-auth-permission-layer

Do not implement on this audit branch.

---

## 10. PR Readiness

Status:

READY FOR PR REVIEW.

PR target:

main

PR source:

audit/phase-2-auth-permission-review

Merge guidance:

Review before merge.

Do not merge if any non-documentation files changed.

Do not begin implementation work until this audit PR is reviewed and merged.

