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

