# Citadel Nexus Phase 1 Repo Audit

## Document Purpose

This document records the Phase 1 repository audit against the Citadel Nexus v3 Knowledge Core.

The purpose of this audit is to inspect the current repository, identify gaps, confirm boundaries, and prepare safe next actions.

This audit is read-only/documentation-only.

No application logic, Prisma schema, migrations, bot runtime behavior, Discord role mutation logic, production deployment behavior, token logic, wallet logic, or economy constants should be changed during this audit.

---

## 1. Audit Branch

Branch:

audit/phase-1-repo-audit

Base branch:

main

Current audit type:

Documentation and repository inspection.

---

## 2. Audit Authority

Required reference files:

- AGENTS.md
- CLAUDE.md
- docs/DOCTRINE/CITADEL_NEXUS_V3_DOCTRINE.md
- docs/BUILD/CURRENT_BUILD_STATUS.md
- docs/BUILD/MASTER_BACKLOG.md
- docs/BUILD/IMPLEMENTATION_PHASES.md
- docs/BUILD/APPROVAL_GATES.md
- docs/SECURITY/DO_NOT_TOUCH.md
- docs/QA/V3_ACCEPTANCE_TESTS.md
- docs/QA/PRODUCTION_READINESS_CHECKLIST.md

Authority rules:

- Backend defines truth.
- Discord reflects truth.
- Frontend surfaces truth.
- AI agents assist execution.
- Anthony Hammon holds final authority.

---

## 3. Audit Scope

This audit will inspect:

- repository structure
- package scripts
- environment examples
- backend entry points
- route files
- service files
- Prisma schema
- migrations
- Discord bot runtime
- Ascension module
- role sync module
- admin command surfaces
- audit/logging coverage
- security-sensitive files
- production/deployment references
- documentation alignment

---

## 4. Out of Scope

This audit will not:

- change application logic
- change economy values
- create migrations
- run migrations
- edit Prisma schema
- mutate live Discord roles
- restart production bot
- deploy production
- change production environment variables
- touch secrets
- touch wallet or treasury logic
- activate CNX automation
- activate future phases

---

## 5. Audit Status Values

Allowed statuses:

- PASS
- FAIL
- NEEDS_REVIEW
- BLOCKED
- NOT_TESTED
- NOT_APPLICABLE

Do not mark PASS unless verified.

---

## 6. Initial Repository State

Status:

NEEDS_REVIEW

Known starting point:

- v3 Knowledge Core merged into main.
- local main synced with origin/main.
- new audit branch created from main.
- working tree clean at audit start.

Verification command:

git status

Result:

PENDING FINAL AUDIT LOG ENTRY.

---

## 7. Audit Checklist

## 7.1 File Tree Audit

Goal:

Map the repository structure and identify major code/documentation areas.

Commands run:

find . -maxdepth 2 -type d | sort

find . -maxdepth 3 -type f | sort | sed 's#^\\./##' | head -n 250

find . \
  -path "./node_modules" -prune -o \
  -path "./.git" -prune -o \
  -path "./dist" -prune -o \
  -type f -print | sort | sed 's#^\\./##' | head -n 300

find . -maxdepth 1 -type f | sort | sed 's#^\\./##'

find src prisma docs -maxdepth 3 -type d | sort

Status:

PASS WITH SECURITY REVIEW NOTE

Verified major directories:

- backups/
- dist/
- docs/
- docs/ARCHITECTURE/
- docs/BUILD/
- docs/DASHBOARD/
- docs/DOCTRINE/
- docs/QA/
- docs/SECURITY/
- node_modules/
- prisma/
- prisma/migrations/
- src/
- src/config/
- src/lib/
- src/modules/
- src/modules/ascension/
- src/modules/ascension/admin/
- src/modules/ascension/docs/
- src/modules/ascension/handlers/
- src/modules/ascension/loot/
- src/modules/ascension/runtime/
- src/routes/
- src/services/

Verified top-level files:

- .env
- .env.backup-step8-db
- .env.backup-step8a-sslmode
- .env.example
- .gitignore
- AGENTS.md
- CLAUDE.md
- README.txt
- package-lock.json
- package.json
- prisma.config.ts
- test-run-01.http
- test.http
- tsconfig.json

Verified source areas:

- src/config contains Discord/Hedera configuration files.
- src/lib contains Prisma client helper files.
- src/routes contains backend route files.
- src/services contains backend service files.
- src/modules/ascension contains Discord/Ascension module runtime, handlers, admin files, loot files, and module documentation.
- prisma contains schema and migrations.
- docs contains existing operational docs plus the v3 Knowledge Core docs.
- dist contains compiled JavaScript output.
- backups contains database backup/export/restore artifacts.

Security review note:

Local environment files exist:

- .env
- .env.backup-step8-db
- .env.backup-step8a-sslmode
- .env.example

The audit did not print secret contents.

Follow-up required:

- verify which .env files are tracked versus ignored
- confirm .env backup files are not committed
- confirm .gitignore protects local secret files
- review backup artifacts handling policy

Findings:

The repository is organized into expected backend areas: source code, Prisma schema/migrations, compiled dist output, documentation, backups, and dependencies.

The v3 Knowledge Core documentation exists in the expected docs subfolders.

No application logic was changed during this file tree audit.

---

## 7.2 Package and Script Audit

Goal:

Identify available npm scripts and confirm what commands exist before using them.

Commands run:

cat package.json

npm run

Status:

PASS WITH FOLLOW-UP REVIEW NOTE

Verified package metadata:

- package name: backend
- version: 1.0.0
- description: Citadel Nexus backend services and gameplay modules
- main entry: dist/index.js
- module type: commonjs
- package is marked private as the string value "true"

Verified npm scripts:

- dev: nodemon --watch src --ext ts --exec ts-node src/index.ts
- build: tsc
- start: node dist/index.js
- ascension:start: node src/modules/ascension/runtime/bot-entry.js
- ascension:dev: nodemon src/modules/ascension/runtime/bot-entry.js
- ascension:deploy: node src/modules/ascension/runtime/deploy-commands.js

Verified major runtime dependencies:

- @hashgraph/sdk
- @prisma/adapter-pg
- @prisma/client
- cors
- discord.js
- dotenv
- express
- mongoose
- pg
- prisma

Verified major dev dependencies:

- @types/cors
- @types/express
- @types/node
- nodemon
- ts-node
- typescript

Findings:

The backend has scripts for local API development, TypeScript build, compiled production start, Ascension bot start/dev, and Discord command deployment.

No npm test script is currently listed.

No npm lint script is currently listed.

The build command exists and should be used later for safe validation.

The ascension:deploy script exists and must be treated as approval-gated because it deploys Discord commands.

Follow-up required:

- confirm whether "private" should be boolean true instead of string "true"
- confirm whether mongoose is actively used or legacy/deprecated
- consider adding test/lint scripts in a future approved implementation task
- do not run ascension:deploy without explicit approval

---

## 7.3 Environment File Audit

Goal:

Review environment templates without exposing secrets.

Commands run:

find . -maxdepth 3 -name ".env*" -type f -print

find . -maxdepth 3 -iname "*example*" -type f -print

git ls-files | grep -E '(^|/)\\.env' || true

cat .gitignore

Status:

PASS WITH SECURITY REVIEW NOTE

Verified local environment files present:

- .env
- .env.backup-step8-db
- .env.backup-step8a-sslmode
- .env.example

Verified tracked environment files:

- .env.example

Verified ignored environment patterns:

- .env
- .env.*
- node_modules
- dist
- backups/
- *.dump
- *.backup
- *.sql
- *.tar

Verified allowlist exception:

- !.env.example

Findings:

Only .env.example is tracked by Git.

Local real environment files and backup environment files exist on the server but are ignored by .gitignore.

The audit did not print secret contents.

The .gitignore file is correctly configured to ignore local env files while allowing .env.example.

Backup and restore artifacts are ignored by .gitignore.

Security review note:

The local .env backup files should be kept out of Git and treated as sensitive.

The repository currently contains local backup/export artifacts under backups/, and .gitignore is configured to ignore backups/.

Follow-up required:

- confirm .env.example contains placeholders only
- confirm backup env files are still needed
- confirm local backup artifacts retention policy
- avoid printing .env contents during future audits

---

## 7.4 Backend Entry Point Audit

Goal:

Identify backend runtime entry points and confirm current source-of-truth flow.

Commands run:

ls -la src

find src -maxdepth 2 -type f | sort

grep -n '"main"\|"dev"\|"start"\|"build"' package.json

sed -n '1,260p' src/index.ts

Status:

PASS WITH FOLLOW-UP REVIEW NOTE

Verified entry files:

- src/index.ts
- dist/index.js through package.json main/start script

Verified package entry references:

- main: dist/index.js
- dev: nodemon --watch src --ext ts --exec ts-node src/index.ts
- build: tsc
- start: node dist/index.js

Verified API runtime behavior:

- src/index.ts imports dotenv/config.
- src/index.ts creates an Express app.
- src/index.ts loads Prisma from src/lib/prisma.
- src/index.ts configures CORS from CORS_ORIGINS, FRONTEND_ORIGIN, or fallback http://localhost:3000.
- src/index.ts enables express.json().
- src/index.ts exposes root GET /.
- src/index.ts exposes GET /health.
- src/index.ts exposes GET /health/db.
- src/index.ts starts on BACKEND_HOST or fallback 127.0.0.1.
- src/index.ts starts on BACKEND_PORT, PORT, or fallback 3001.

Verified mounted route prefixes:

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

Verified route imports:

- tokenRoutes
- userRoutes
- payoutRoutes
- accessRoutes
- tempAccessRoutes
- entitlementRoutes
- roleSyncRoutes
- discordSyncWorkerRoutes
- sessionRoutes
- memberStateRoutes
- ascensionSummaryRoutes

Verified bot/API boundary:

- Ascension Discord runtime is not started from src/index.ts.
- src/index.ts includes a comment stating the bot runtime is disabled for the API production host.
- src/index.ts states Ascension should be started separately with its own PM2 process after backend API is stable.
- The bot-entry require line is commented out.

Findings:

The backend API entry point is src/index.ts for development and dist/index.js for compiled runtime.

The API host mounts the expected route groups and keeps the Discord bot runtime separate from the API process.

The database health endpoint performs a Prisma SELECT 1 check.

The root and health routes are public status routes.

Follow-up required:

- confirm production CORS_ORIGINS/FRONTEND_ORIGIN values are configured securely
- confirm production BACKEND_HOST and BACKEND_PORT values match deployment expectations
- review whether /health/db should expose environment value publicly
- review database health error logging for safe production behavior
- verify each mounted route in the dedicated route audit section

---

## 7.5 Route Audit

Goal:

List backend routes and compare them against the v3 architecture docs.

Commands run:

find src/routes -maxdepth 1 -type f | sort

grep -RInE "router\\.|Router\\(|app\\.use|export default" src/routes src/index.ts

for f in src/routes/*.ts; do
  echo "===== $f ====="
  sed -n '1,220p' "$f"
done

Status:

PASS WITH HIGH-RISK REVIEW NOTES

Verified route files:

- src/routes/accessRoutes.ts
- src/routes/ascensionSummaryRoutes.ts
- src/routes/discordSyncWorkerRoutes.ts
- src/routes/entitlementRoutes.ts
- src/routes/memberStateRoutes.ts
- src/routes/payoutRoutes.ts
- src/routes/roleSyncRoutes.ts
- src/routes/sessionRoutes.ts
- src/routes/tempAccessRoutes.ts
- src/routes/tokenRoutes.ts
- src/routes/userRoutes.ts

Verified mounted route prefixes from src/index.ts:

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

Verified route endpoint groups:

accessRoutes:

- GET /access
- POST /access/expire/run
- GET /access/:userId/modifiers
- POST /access/:userId/refresh
- GET /access/:userId

ascensionSummaryRoutes:

- GET /ascension-summary/me
- GET /ascension-summary/discord/:discordId
- GET /ascension-summary/user/:userId
- GET /ascension-summary/public/discord/:discordId

discordSyncWorkerRoutes:

- GET /discord-sync-worker
- GET /discord-sync-worker/:userId
- POST /discord-sync-worker/:userId/mark-synced

entitlementRoutes:

- GET /entitlements
- GET /entitlements/user/:userId
- GET /entitlements/user/:userId/active
- GET /entitlements/:id

memberStateRoutes:

- GET /member-state/me
- GET /member-state/:userId

payoutRoutes:

- GET /payout/log/all
- POST /payout/:userId/queue
- POST /payout/:payoutId/approve
- POST /payout/:payoutId/reject
- POST /payout/:payoutId/send
- POST /payout/:payoutId/confirm
- POST /payout/:payoutId/fail
- GET /payout/:payoutId

roleSyncRoutes:

- GET /role-sync
- GET /role-sync/:userId
- POST /role-sync/:userId/mark-synced

sessionRoutes:

- POST /session/dev-login
- GET /session/me
- POST /session/logout

tempAccessRoutes:

- POST /temp-access/:id/purchase

tokenRoutes:

- GET /token/info

userRoutes:

- POST /user/create
- POST /user/:id/discord
- POST /user/:id/wallet
- GET /user/:id/payout-ready
- GET /user/:id
- POST /user/:id/xp
- GET /user/:id/balance

Findings:

The route files match the mounted route groups documented in the v3 Knowledge Core.

Most route handlers are service-backed and call functions from src/services.

Routes include safe validation patterns for missing IDs, required body fields, and common 404/500 responses.

High-risk review notes:

- POST /user/:id/xp mutates XP and appears route-accessible without visible auth/permission checks in the route.
- Payout routes mutate payout lifecycle state and appear route-accessible without visible auth/permission checks in the route.
- POST /session/dev-login exists and should be reviewed before production exposure.
- Role sync and Discord sync worker mark-synced routes mutate sync timestamps and should be permission-reviewed.
- POST /access/expire/run triggers entitlement expiration logic and should be permission-reviewed.
- POST /temp-access/:id/purchase may affect CNX/access state and should be economy/CNX reviewed.
- GET /access and GET /entitlements expose all records through route handlers and should be reviewed for production access control.
- GET /payout/log/all exposes payout log data and should be reviewed for production access control.
- GET /member-state/:userId and internal ascension summary routes should be reviewed for intended public/private data boundaries.

Documentation/cleanup notes:

- src/routes/entitlementRoutes.ts contains a header typo: backend/src/rputes/entitlementRoutes.ts.
- src/routes/ascensionSummaryRoutes.ts contains duplicate header comments.
- sessionRoutes uses an in-memory devSessionStore, so session persistence may not survive process restarts.

Follow-up required:

- perform dedicated service boundary audit
- perform dedicated permission/auth audit
- perform dedicated economy mutation audit for XP/access/CNX-related routes
- perform dedicated payout/prize risk review
- confirm which routes are intended to be public, member-only, admin-only, or internal worker-only
- do not change route behavior during this audit

---

## 7.6 Service Boundary Audit

Goal:

Confirm business logic is organized in service files and identify any route-heavy logic.

Commands run:

find src/services -maxdepth 1 -type f | sort

grep -RInE "export async function|export function|export const|export type" src/services | sort

grep -RInE "from \"../services|from '../services" src/routes | sort

Status:

PASS WITH HIGH-RISK REVIEW NOTES

Verified service files:

- src/services/accessStateService.ts
- src/services/ascensionAdminService.ts
- src/services/ascensionAuditService.ts
- src/services/ascensionGameplayService.ts
- src/services/ascensionPrizePoolService.ts
- src/services/ascensionProfileService.ts
- src/services/ascensionSummaryService.ts
- src/services/discordRoleMutationService.ts
- src/services/discordRoleSyncAuditStore.ts
- src/services/discordRoleSyncExecutionService.ts
- src/services/discordRoleSyncVerificationService.ts
- src/services/discordSyncWorkerService.ts
- src/services/entitlementExpiryService.ts
- src/services/entitlementStore.ts
- src/services/memberStateService.ts
- src/services/payoutService.ts
- src/services/roleSyncService.ts
- src/services/tempAccessService.ts
- src/services/tokenService.ts
- src/services/userService.ts

Verified route-to-service imports:

- accessRoutes imports accessStateService and entitlementExpiryService.
- ascensionSummaryRoutes imports ascensionSummaryService.
- discordSyncWorkerRoutes imports roleSyncService and accessStateService.
- entitlementRoutes imports entitlementStore.
- memberStateRoutes imports memberStateService.
- payoutRoutes imports payoutService.
- roleSyncRoutes imports roleSyncService and accessStateService.
- sessionRoutes imports userService.
- tempAccessRoutes imports tempAccessService.
- tokenRoutes imports tokenService.
- userRoutes imports userService.

Verified major service boundary areas:

Access and entitlement services:

- accessStateService exports AccessState, AccessModifiers, updateAccessState, getAccessState, getOrCreateAccessState, refreshAccessState, getAccessModifiers, markRoleSync, and getAllAccessStates.
- entitlementStore exports entitlement/access record types and create/update/get/expire/upsert functions.
- entitlementExpiryService exports expireExpiredEntitlements.

Ascension services:

- ascensionGameplayService exports rank/stage/cooldown helper functions, player profile functions, applyDelta, and actor resolution.
- ascensionProfileService exports profile record and get/create/upsert profile functions.
- ascensionSummaryService exports member and public card summary functions.
- ascensionAdminService exports player view, lock, unlock, reset, delete, and restore functions.
- ascensionAuditService exports admin action and snapshot record functions.
- ascensionPrizePoolService exports prize pool get/create, add XP, remove XP, and award XP functions.

Discord role sync services:

- roleSyncService exports backend role keys and role sync payload builders.
- discordSyncWorkerService exports Discord sync decision builders and role key preview.
- discordRoleMutationService exports Discord role mutation result type and mutation function.
- discordRoleSyncExecutionService exports execution attempt result type and execution function.
- discordRoleSyncVerificationService exports verification result type and verification function.
- discordRoleSyncAuditStore exports role sync audit types, hash/idempotency helpers, snapshot helpers, create/update/get/find audit functions, and user record lookup functions.

Member, payout, token, temp access, and user services:

- memberStateService exports member state response types and getMemberState.
- payoutService exports payout record/status types and queue/approve/reject/send/confirm/fail/get functions.
- tokenService exports getTokenInfo.
- tempAccessService exports temp access purchase result type and purchaseTemporaryAccess.
- userService exports user/reward types and create/get/addXP/linkDiscord/bindWallet/CNX balance and reserve/finalize functions.

Findings:

Routes are generally thin and call service-layer functions for business logic.

The repository has a clear service layer for access, entitlements, Ascension gameplay/admin/audit/prize pool, Discord role sync, member state, payout, temporary access, token, and user operations.

High-risk review notes:

- userService exports addXP and CNX balance/reserve/release/finalize functions. These require economy/CNX review.
- ascensionGameplayService exports applyDelta, calcRank, calcStage, claim cooldown helpers, and profile mutation functions. These require economy pacing review.
- ascensionAdminService exports lock, unlock, reset, delete, restore functions. These require admin permission and audit review.
- ascensionPrizePoolService exports add/remove/award XP functions. These require prize/economy review.
- payoutService exports payout lifecycle mutation functions. These require permission and payout risk review.
- tempAccessService exports purchaseTemporaryAccess. This requires CNX/access review.
- accessStateService and entitlementStore export state mutation functions. These require access-control review.
- discordRoleMutationService and discordRoleSyncExecutionService indicate live Discord role mutation capability exists and must remain approval-gated.
- discordRoleSyncAuditStore appears to define role sync audit storage/helpers and requires persistence/retention review in the role sync audit section.

Follow-up required:

- perform dedicated economy mutation audit for addXP, applyDelta, prize pool XP, temp access, and CNX balance functions
- perform dedicated admin action audit for Ascension admin functions
- perform dedicated role sync audit for Discord mutation/execution/audit services
- perform dedicated payout/prize review for payoutService and ascensionPrizePoolService
- confirm whether service functions are protected by route-level auth, service-level checks, or both
- do not change service logic during this audit

---

## 7.7 Prisma Schema Audit

Goal:

Compare current Prisma schema to DATABASE_SCHEMA_REFERENCE.md.

Commands run:

ls -la prisma

sed -n '1,320p' prisma/schema.prisma

find prisma/migrations -maxdepth 2 -type f | sort

Status:

PASS WITH HIGH-RISK REVIEW NOTES

Verified Prisma directory contents:

- prisma/migrations/
- prisma/prisma.config.ts
- prisma/schema.prisma

Verified datasource:

- provider: postgresql

Verified generator:

- provider: prisma-client-js

Verified Prisma models:

- User
- AccessState
- Entitlement
- DiscordRoleSyncAudit
- AscensionProfile
- AscensionPrizePool
- AscensionAdminAction
- AscensionAdminSnapshot

Verified migrations:

- prisma/migrations/20260402020723_init_core/migration.sql
- prisma/migrations/20260402100719_expand_persistence_models/migration.sql
- prisma/migrations/20260406081731_add_entitlement_model/migration.sql
- prisma/migrations/20260416103711_make_username_unique/migration.sql
- prisma/migrations/20260417110430_add_ascension_profile/migration.sql
- prisma/migrations/20260418214028_add_ascension_admin_and_prize_pool/migration.sql
- prisma/migrations/20260419091330_add_ascension_admin_and_prize_pool/migration.sql
- prisma/migrations/migration_lock.toml

Verified User model areas:

- identity: id, username, discordId, discordTag, wallet
- progression/economy: xp, level, cnxBalance, reservedCnx
- status: isVerified, payoutEligible
- timestamps: joinedAt, lastActiveAt, createdAt, updatedAt
- rewardLog Json
- relations to AccessState, AscensionProfile, DiscordRoleSyncAudit, Entitlement

Verified AccessState model areas:

- userId unique relation
- tier
- active
- isCnxHolder
- holderTierInternal
- xpBoost
- cooldownReduction
- temporary access fields
- lastEvaluatedAt
- lastRoleSyncAt
- timestamps

Verified Entitlement model areas:

- userId
- entitlementType
- entitlementKey
- status
- source
- grantedAt
- expiresAt
- updatedAt
- metadataJson
- indexes on userId/grantedAt and status/expiresAt

Verified DiscordRoleSyncAudit model areas:

- userId
- contractVersion
- executionSource
- status
- canExecute
- reasonsBlocked
- warnings
- unsupportedTempAccessType
- unresolvedRoleKeys
- desired/current/final role ID arrays
- payloadJson
- verificationPassed
- rollbackSnapshotJson
- errorMessage
- idempotencyKey unique
- executionHash unique
- rateLimitBucket
- executionDurationMs
- attemptCount
- timestamps
- index on userId/createdAt

Verified AscensionProfile model areas:

- userId unique relation
- discordId unique optional
- username
- guardian default nova
- stage default 1
- rank default initiate
- xp default 0
- level default 1
- nodeScore default 0
- sessionCount
- missionsCompleted
- lock state and reason
- power and maxPower
- credits
- intel
- lastClaimAt
- buildingsJson default starter building JSON
- timestamps
- index on stage/rank

Verified AscensionPrizePool model areas:

- poolName unique default main
- totalXpAvailable
- totalXpAdded
- totalXpAwarded
- totalXpRemoved
- notes
- seasonId
- timestamps

Verified AscensionAdminAction model areas:

- adminUserId
- adminUsername
- targetUserId
- targetUsername
- actionType
- resourceType
- amount
- valueBefore Json
- valueAfter Json
- reason
- metadataJson
- createdAt
- indexes on adminUserId/createdAt, targetUserId/createdAt, actionType/createdAt

Verified AscensionAdminSnapshot model areas:

- actionId
- targetUserId
- snapshotType
- profileState Json
- inventoryState Json
- createdAt
- indexes on actionId and targetUserId/createdAt

Findings:

The Prisma schema matches the expected core backend, access, entitlement, Discord role sync, Ascension progression, prize pool, and admin audit domains.

The schema includes 8 current models.

The repository currently contains 7 timestamped migration folders plus migration_lock.toml.

No Prisma schema or migration changes were made during this audit.

High-risk review notes:

- User.cnxBalance and User.reservedCnx are Float values and should be reviewed before any financial/token-like accounting is treated as production-grade.
- User.xp and User.level exist alongside AscensionProfile.xp and AscensionProfile.level, so the distinction between platform/user XP and Ascension game XP must remain clearly documented.
- AccessState contains isCnxHolder, holderTierInternal, xpBoost, and cooldownReduction fields, so CNX utility behavior must remain locked/approval-gated until reviewed.
- AscensionProfile contains gameplay economy fields such as xp, level, nodeScore, power, credits, intel, lastClaimAt, and buildingsJson. These require economy pacing and anti-abuse review.
- AscensionPrizePool stores XP pool state and requires prize/economy separation review.
- AscensionAdminAction and AscensionAdminSnapshot provide audit/snapshot infrastructure and should not be deleted or bypassed.
- DiscordRoleSyncAudit stores role sync execution evidence and should be preserved for auditability.

Follow-up required:

- compare schema against docs/ARCHITECTURE/DATABASE_SCHEMA_REFERENCE.md
- review duplicate migration names for Ascension admin/prize pool additions
- run npx prisma validate later as a safe validation check if approved
- review whether Float is acceptable for CNX balance/reserved accounting or should later become integer base units/Decimal
- do not edit prisma/schema.prisma during this audit
- do not create or run migrations during this audit

---

## 7.8 Discord Bot Runtime Audit

Goal:

Confirm Discord bot runtime files, command structure, and admin surfaces.

Commands run:

find src/modules/ascension -maxdepth 4 -type f | sort

sed -n '1,260p' src/modules/ascension/runtime/bot-entry.js

sed -n '1,260p' src/modules/ascension/runtime/deploy-commands.js

sed -n '1,260p' src/modules/ascension/index.js

grep -n "sed -n\|ASCENSION INDEX\|new SlashCommandBuilder()" src/modules/ascension/runtime/deploy-commands.js | head -n 80

nl -ba src/modules/ascension/runtime/deploy-commands.js | sed -n '100,190p'

Status:

PASS WITH HIGH-RISK REVIEW NOTES

Verified Ascension module files:

- src/modules/ascension/admin/admin-handler.js
- src/modules/ascension/admin/admin-schema.js
- src/modules/ascension/admin/admin-service.js
- src/modules/ascension/admin/prize-pool-schema.js
- src/modules/ascension/docs/ASCENSION_MODULE_STATUS.md
- src/modules/ascension/handlers/claim-handler.js
- src/modules/ascension/handlers/mission-handler.js
- src/modules/ascension/handlers/player-service.js
- src/modules/ascension/handlers/start-handler.js
- src/modules/ascension/handlers/status-handler.js
- src/modules/ascension/index.js
- src/modules/ascension/loot/pie-service.js
- src/modules/ascension/loot/pie.js
- src/modules/ascension/loot/schema.js
- src/modules/ascension/runtime/bot-entry.js
- src/modules/ascension/runtime/deploy-commands.js

Verified bot runtime:

- bot-entry.js loads dotenv.
- bot-entry.js registers ts-node with transpileOnly true and skipProject true.
- bot-entry.js uses discord.js Client, GatewayIntentBits, and Events.
- bot-entry.js loads Prisma from src/lib/prisma through relative require.
- bot-entry.js imports player handlers: start, guardian select, claim, mission, build, status.
- bot-entry.js imports handleAdminCommand.
- bot-entry.js creates a Discord client with Guilds and GuildMessages intents.
- bot-entry.js checks Prisma/Supabase connectivity on ClientReady with SELECT 1.
- bot-entry.js logs current phase from CURRENT_PHASE or fallback 1.
- bot-entry.js logs player commands and admin commands separately.
- bot-entry.js routes admin command names through handleAdminCommand.
- bot-entry.js routes player commands through switch cases.
- bot-entry.js handles guardian button interactions by customId prefix guardian_.
- bot-entry.js logs in with BOT_TOKEN.

Verified player commands in runtime/deploy command registration:

- start
- claim
- mission
- build
- status

Verified admin command set in bot-entry.js:

- admin_help
- admin_player_view
- admin_inventory_view
- admin_add_xp
- admin_remove_xp
- admin_set_xp
- admin_grant_resource
- admin_remove_resource
- admin_set_resource
- admin_reset_player
- admin_delete_player
- admin_reset_all
- admin_recalc_player
- admin_lock_player
- admin_unlock_player
- admin_restore_player
- admin_award_all
- admin_award_top
- admin_prize_pool_view
- admin_prize_pool_add
- admin_prize_pool_award
- admin_prize_pool_remove

Verified deploy-commands behavior:

- deploy-commands.js loads dotenv.
- deploy-commands.js uses REST, Routes, and SlashCommandBuilder from discord.js.
- deploy-commands.js defines 5 player commands.
- deploy-commands.js defines admin commands for player view, inventory view, XP changes, resource changes, reset/delete/recalc/lock/unlock/restore, awards, and prize pool operations.
- deploy-commands.js registers commands using Routes.applicationGuildCommands with CLIENT_ID and GUILD_ID.
- deploy-commands.js uses BOT_TOKEN for REST auth.

Verified Ascension index:

- src/modules/ascension/index.js exports runtime.botEntry requiring ./runtime/bot-entry.

Artifact verification:

- A suspected pasted-command artifact appeared in terminal output during initial inspection.
- Follow-up grep and numbered file inspection confirmed the artifact is not present in deploy-commands.js.
- deploy-commands.js mid-section cleanly flows from admin_delete_player to admin_reset_all.

Findings:

The Discord Ascension bot is a separate runtime from the backend API and is started through npm scripts, not src/index.ts.

The bot runtime can execute player gameplay commands and a broad admin command surface.

The command deployment script registers both player and admin slash commands to a guild.

High-risk review notes:

- ascension:deploy registers Discord slash commands and must remain approval-gated.
- BOT_TOKEN, CLIENT_ID, and GUILD_ID are required for bot/deploy command operation and must remain secret-managed.
- Admin commands include XP mutation, resource mutation, reset, delete, lock/unlock, restore, award all, award top, and prize pool mutation.
- Admin command authorization must be verified in the dedicated admin action audit.
- Prize pool commands affect XP awards and require prize/economy separation review.
- admin_reset_all exists and must remain protected by confirmation and environment flag controls.
- bot-entry.js uses ts-node runtime registration with strict false and skipProject true; this should be reviewed before production hardening.
- bot-entry.js requests GuildMessages intent even though slash commands are interaction-based; required intents should be reviewed for least privilege.
- command registration includes admin commands, so accidental deployment could expose commands if Discord permissions or handler authorization are misconfigured.

Follow-up required:

- inspect admin-handler.js and admin-service.js in the admin action audit
- inspect gameplay handlers in the economy mutation audit
- inspect deploy-commands.js command registration controls before any use of ascension:deploy
- confirm Discord command permissions and visibility expectations
- confirm PM2/process separation between backend API and Ascension bot
- do not run ascension:start, ascension:dev, or ascension:deploy during this audit without explicit approval

---

## 7.9 Role Sync Audit

Goal:

Identify role sync files and confirm role mutation remains approval-gated.

Commands run:

find src -type f | grep -Ei "role|sync|mutation" | sort

sed -n '1,260p' src/config/discordRoleRegistry.ts

sed -n '1,260p' src/config/discordRoleMap.ts

sed -n '1,260p' src/services/roleSyncService.ts

sed -n '1,260p' src/services/discordSyncWorkerService.ts

grep -RInE "VICE ----|ER SERVICE ----|DISCORD SYNC WORK|sed -n|echo \"" src/config/discordRoleMap.ts src/services/roleSyncService.ts src/services/discordSyncWorkerService.ts || true

sed -n '92,106p' src/services/roleSyncService.ts

git show HEAD:src/services/roleSyncService.ts | nl -ba | sed -n '92,106p'

git show main:src/services/roleSyncService.ts | nl -ba | sed -n '92,106p'

npm run build

Status:

PASS WITH HIGH-RISK REVIEW NOTES

Verified role/sync/mutation files:

- src/config/discordRoleMap.ts
- src/config/discordRoleRegistry.ts
- src/routes/discordSyncWorkerRoutes.ts
- src/routes/roleSyncRoutes.ts
- src/services/discordRoleMutationService.ts
- src/services/discordRoleSyncAuditStore.ts
- src/services/discordRoleSyncExecutionService.ts
- src/services/discordRoleSyncVerificationService.ts
- src/services/discordSyncWorkerService.ts
- src/services/roleSyncService.ts

Verified role registry categories:

- authority
- identity
- cosmetic
- progression
- utility
- system

Verified authority roles in registry:

- FOUNDER
- MODERATOR

Verified identity/cosmetic/progression roles in registry:

- MEMBER
- GENESIS
- CITIZEN
- BUILDER
- GUARDIAN
- ARCHITECT
- ELITE

Verified utility roles in registry:

- CNX_HOLDER
- NEXUS_HOLDER
- PREMIUM
- TEMPORARY_ACCESS
- CNX_HOLDER_TIER_1
- CNX_HOLDER_TIER_2
- CNX_HOLDER_TIER_3
- TEMP_PREMIUM_ALPHA

Verified system roles in registry:

- ARCANE_BOT
- CARL_BOT

Verified backend-managed roles in registry:

- CNX_HOLDER
- CNX_HOLDER_TIER_1
- CNX_HOLDER_TIER_2
- CNX_HOLDER_TIER_3
- TEMP_PREMIUM_ALPHA

Verified Discord role map keys:

- cnx_holder
- cnx_holder_tier_1
- cnx_holder_tier_2
- cnx_holder_tier_3
- temp_premium_alpha

Verified role map helpers:

- getAllMappedBackendRoleKeys
- getDiscordRoleIdForKey
- validateDiscordRoleMap

Verified role sync payload behavior:

- roleSyncService builds role sync payloads from AccessState.
- roleSyncService uses contractVersion role_sync_prep_v1.
- roleSyncService maps isCnxHolder to cnx_holder.
- roleSyncService maps holderTierInternal 1 to cnx_holder_tier_1.
- roleSyncService maps holderTierInternal 2 to cnx_holder_tier_2.
- roleSyncService maps holderTierInternal 3 to cnx_holder_tier_3.
- roleSyncService warns on unsupported nonzero holderTierInternal.
- roleSyncService maps tempAccessType premium_alpha to temp_premium_alpha.
- roleSyncService warns on unsupported temp access types.
- roleSyncService normalizes role sets so should-have roles are removed from should-not-have roles.
- roleSyncService sorts and deduplicates role keys.
- roleSyncService can build one user payload or all access state payloads.

Verified Discord sync worker behavior:

- discordSyncWorkerService converts backend role keys into Discord role IDs.
- discordSyncWorkerService compares desired role IDs against current member role IDs.
- discordSyncWorkerService calculates desiredAddRoleIds.
- discordSyncWorkerService calculates desiredRemoveRoleIds.
- discordSyncWorkerService tracks unresolvedRoleKeys.
- discordSyncWorkerService blocks execution when unsupported temp access types exist.
- discordSyncWorkerService blocks execution when payload warnings exist.
- discordSyncWorkerService blocks execution when role keys do not resolve to usable role IDs.
- discordSyncWorkerService exposes getRoleKeyToRoleIdPreview.

Artifact verification:

- Terminal output previously showed pasted-command fragments during role sync inspection.
- Targeted grep confirmed those fragments are not present in discordRoleMap.ts, roleSyncService.ts, or discordSyncWorkerService.ts.
- Raw roleSyncService section is clean.
- HEAD roleSyncService section is clean.
- main roleSyncService section is clean.
- npm run build passed after verification.
- git status remained clean.

Findings:

The role sync planning layer is backend-driven and derives desired Discord role state from AccessState.

The role sync service produces role-key payloads, while discordSyncWorkerService resolves those keys into Discord role IDs and creates executable decisions.

The inspected services appear to prepare role sync decisions rather than directly mutating Discord roles.

Live mutation capability exists elsewhere in discordRoleMutationService and discordRoleSyncExecutionService and must remain approval-gated until inspected in detail.

High-risk review notes:

- Backend-managed CNX holder and temporary access roles exist and are mapped to hardcoded Discord role IDs.
- CNX holder role behavior depends on AccessState.isCnxHolder and AccessState.holderTierInternal.
- Temporary access role behavior depends on AccessState.tempAccessType.
- Unsupported holder tiers and unsupported temp access types create warnings/blocks, which supports fail-closed behavior.
- There are two role definition sources: discordRoleRegistry.ts and discordRoleMap.ts. These must remain synchronized.
- roleSyncRoutes and discordSyncWorkerRoutes include mark-synced endpoints that mutate lastRoleSyncAt and require permission review.
- Live mutation services must be inspected before any role sync execution is considered production-ready.
- Discord role IDs are not secrets, but changing them can break live Discord role behavior.

Follow-up required:

- inspect discordRoleMutationService.ts
- inspect discordRoleSyncExecutionService.ts
- inspect discordRoleSyncVerificationService.ts
- inspect discordRoleSyncAuditStore.ts
- confirm role registry and role map consistency
- confirm which roles are intentionally backend-managed
- confirm role sync route permissions
- confirm Discord bot permissions for role mutation
- do not execute live role mutation during this audit

---

## 7.10 Economy Mutation Audit

Goal:

Identify where XP, resources, claims, missions, builds, and admin economy changes happen.

Commands to run:

grep -RInE "xp|XP|credits|intel|power|claim|mission|build|rank|stage|level" src prisma docs/ARCHITECTURE docs/DOCTRINE | head -n 250

Status:

NOT_TESTED

Findings:

PENDING.

Rule:

Do not change economy constants during this audit.

---

## 7.11 Admin Action Audit

Goal:

Identify admin commands, admin services, reset controls, and audit records.

Commands to run:

grep -RInE "admin|Admin|founder|FOUNDER|reset|lock|unlock|snapshot|audit" src prisma | head -n 250

Status:

NOT_TESTED

Findings:

PENDING.

---

## 7.12 Secret Exposure Audit

Goal:

Check for obvious committed secret patterns without printing real secrets into reports.

Commands to run:

grep -RInE "BOT_TOKEN|DATABASE_URL|PRIVATE KEY|BEGIN.*KEY|seed phrase|service_role|SUPABASE|DISCORD_TOKEN" . --exclude-dir=node_modules --exclude-dir=.git || true

Status:

NOT_TESTED

Findings:

PENDING.

Rule:

If real secrets are found, stop and do not repeat them in this document.

---

## 7.13 Documentation Alignment Audit

Goal:

Confirm docs match current implementation and identify stale or conflicting docs.

Commands to run:

find docs -maxdepth 2 -type f | sort
grep -RInE "Phase 2|Phase 3|CNX automation|prize|NFT|dashboard write|production deploy" docs | head -n 250

Status:

NOT_TESTED

Findings:

PENDING.

---

## 8. Initial Risk Register

| ID | Risk | Severity | Status |
|---|---|---|---|
| R-001 | Unknown current route/service gaps | MEDIUM | OPEN |
| R-002 | Economy mutation points not fully mapped | HIGH | OPEN |
| R-003 | Admin command surfaces need review | HIGH | OPEN |
| R-004 | Role sync mutation paths need review | HIGH | OPEN |
| R-005 | Future-phase docs may describe locked systems that are not live | MEDIUM | OPEN |

---

## 9. Audit Output Requirements

This audit must produce:

- verified repo map
- route list
- service list
- Prisma model/migration summary
- Discord bot runtime summary
- role sync summary
- economy mutation point summary
- admin command summary
- security findings
- documentation mismatch list
- recommended next tasks
- approval-gated action list

---

## 10. Completion Criteria

This audit is complete only when:

- all checklist sections are filled
- findings are separated from recommendations
- high-risk items are clearly flagged
- no application logic was changed
- git status is clean after commit
- audit document is committed and pushed
- next tasks are listed in safe order

---

## 11. Current Result

Status:

IN PROGRESS.

Next action:

Run the first audit command group and update this file with verified findings.

