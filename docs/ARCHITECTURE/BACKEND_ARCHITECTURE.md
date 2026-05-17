# Citadel Nexus Backend Architecture

## Document Purpose

This document defines the internal backend architecture for Citadel Nexus.

It explains the backend runtime, source-of-truth responsibilities, verified routes, service boundaries, Prisma/database responsibilities, Ascension module structure, role sync layer, audit layer, environment boundaries, and future dashboard/API expansion rules.

This file is an internal technical reference.

This file is not public marketing copy.

AGENTS.md remains the controlling operating law.

CITADEL_NEXUS_V3_DOCTRINE.md remains the master doctrine.

SYSTEM_OVERVIEW.md defines the ecosystem-level architecture.

---

## 1. Backend Authority Rule

The backend is the source of truth for Citadel Nexus.

The backend defines:

- user state
- access state
- entitlements
- Ascension profile state
- XP state
- rank state
- Stage state
- resource state
- building state
- admin action history
- prize pool records
- Discord role sync intent
- public member summaries
- public Ascension summaries
- future economy events
- future dashboard status

Discord reflects backend truth.

Frontend surfaces backend truth.

AI agents assist backend-safe work only.

No system may bypass backend validation.

---

## 2. Verified Backend Stack

The backend stack is:

- Node.js
- TypeScript
- Express.js
- Prisma ORM
- PostgreSQL through Supabase
- Discord.js for the Ascension bot runtime
- dotenv for environment loading
- CORS configured by environment
- PM2 for process management outside the repo
- Nginx reverse proxy outside the repo
- Hedera SDK present but deferred/testnet-controlled

The backend is expected to run as an API service and also support a separate Ascension bot process.

The Express API and Discord bot runtime must not be confused as the same process.

---

## 3. Runtime Responsibilities

## 3.1 Express API Runtime

The Express API is responsible for:

- handling HTTP routes
- returning member/public state
- managing user/access/entitlement endpoints
- exposing health checks
- exposing role sync endpoints
- exposing Ascension summary endpoints
- supporting future read-only dashboard endpoints
- routing requests to service layers

The Express API must not:

- hard-code economy values inside route handlers
- mutate gameplay state without service-layer validation
- expose secrets
- bypass audit logging
- activate future-phase systems without approval

## 3.2 Ascension Bot Runtime

The Ascension bot runtime is responsible for:

- Discord slash command handling
- Citadel Ascension gameplay commands
- admin commands
- Discord interaction responses
- invoking approved Ascension services
- writing audit records through approved services

The bot must not:

- become the source of truth
- store canonical state outside the database
- silently grant XP
- mutate roles outside approved sync logic
- bypass backend services
- bypass AGENTS.md

---

## 4. Verified Backend Routes

The backend currently includes route areas for:

- user
- payout
- token
- access
- temp-access
- entitlements
- role-sync
- discord-sync-worker
- session
- member-state
- ascension-summary
- health
- health/db

These routes must remain service-backed.

Future routes must follow the same architecture:

Route -> validation -> service -> Prisma/database -> audit where required -> response.

Routes must not contain core economy/business logic directly.

---

## 5. Health Routes

Health routes exist to verify system availability.

Current health responsibilities include:

- API availability
- database connectivity

Future dashboard read-only health monitoring may consume these routes.

Health routes must not expose:

- database URLs
- secrets
- tokens
- private keys
- internal credentials
- sensitive config values

Health routes may expose sanitized status such as:

- ok
- degraded
- database connected
- database unavailable
- timestamp
- environment label where safe
- version/commit where safe

---

## 6. Prisma and Database Boundary

The canonical schema lives in:

- prisma/schema.prisma

Current verified Prisma models:

- User
- AccessState
- Entitlement
- DiscordRoleSyncAudit
- AscensionProfile
- AscensionPrizePool
- AscensionAdminAction
- AscensionAdminSnapshot

Prisma is the backend persistence boundary.

Direct database writes outside approved backend logic are not allowed for normal operations.

AI agents must not create or run Prisma migrations without explicit approval.

Schema changes require:

- documented reason
- affected models
- migration plan
- rollback or recovery plan
- test plan
- owner approval

---

## 7. Current Data Ownership

## 7.1 User

User records represent core member identity.

User records may connect to:

- access state
- entitlements
- Discord state
- Ascension profile
- public member state

User records must not be casually deleted.

## 7.2 AccessState

AccessState represents backend-controlled access status.

It must not be confused with gameplay rank.

Access state can influence permissions or membership state, but it does not define earned Ascension progress.

## 7.3 Entitlement

Entitlements represent specific access rights or time-bound grants.

Entitlements must be backend-controlled.

Future entitlement expansion must not create pay-to-win progression.

## 7.4 DiscordRoleSyncAudit

DiscordRoleSyncAudit records role sync actions and outcomes.

It supports:

- role mutation auditability
- debugging role mismatches
- verifying backend-to-Discord reflection
- future dashboard monitoring

Role sync audit records must not be deleted through normal tools.

## 7.5 AscensionProfile

AscensionProfile stores gameplay state.

It includes gameplay concepts such as:

- guardian
- stage
- rank
- XP
- level
- Node Score
- session count
- missions completed
- lock state
- Power
- max Power
- Credits
- Intel
- claim timestamps
- building JSON/state

AscensionProfile is the primary gameplay state record.

## 7.6 AscensionPrizePool

AscensionPrizePool supports prize/reward governance.

Prize records must remain separate from XP and gameplay resources.

Prize pool functionality must remain locked unless explicitly approved.

## 7.7 AscensionAdminAction

AscensionAdminAction records admin/founder/moderator economy or gameplay actions.

It is used for auditability.

Admin actions must include reason and before/after state where applicable.

Founder actions are not exempt from logs.

## 7.8 AscensionAdminSnapshot

AscensionAdminSnapshot supports rollback and review.

Snapshots should be treated as evidence and recovery support.

Snapshots must not be deleted casually.

---

## 8. Service Layer Doctrine

Backend service files own business logic.

Route handlers should stay thin.

Command handlers should stay thin.

Service layers should own:

- validation
- phase checks
- cap checks
- cooldown checks
- resource checks
- audit creation
- database mutation
- response shaping

Current service areas include:

- access state service
- user service
- token service
- payout service
- entitlement service
- temp access service
- member state service
- role sync service
- Discord role mutation service
- Discord role sync audit store
- Discord role sync execution service
- Discord role sync verification service
- Discord sync worker service
- Ascension profile service
- Ascension gameplay service
- Ascension admin service
- Ascension audit service
- Ascension prize pool service
- Ascension summary service

Future economy services should follow the same principle.

---

## 9. Ascension Backend Module

The Ascension module is the gameplay backend layer.

It should contain or coordinate:

- profile creation
- Guardian selection/state
- claim logic
- mission logic
- build logic
- status logic
- admin profile view
- admin corrections
- prize pool records
- summary views
- audit records
- bot command integration

Ascension must follow v3 doctrine:

- earned progress
- no pay-to-win
- caps and cooldowns
- auditability
- phase gates
- no silent admin power
- service-layer economy logic

---

## 10. Ascension Bot Entry

The verified bot entry is:

- src/modules/ascension/runtime/bot-entry.js

The bot should run separately from the Express API.

The bot entry must not be casually imported into the API server.

Bot deployment and API deployment should remain operationally distinct.

Bot changes require extra caution because they affect Discord interactions directly.

---

## 11. Role Sync Backend Architecture

Role sync is a backend-controlled reflection system.

Role sync components should support:

- backend truth lookup
- role eligibility calculation
- Discord role mapping
- mutation execution
- mutation audit
- verification
- retry or worker processing where applicable

Role sync must be:

- idempotent
- auditable
- backend-driven
- reversible where possible
- safe to dry-run where possible

Role sync must not:

- define truth from Discord
- assign admin/mod roles from CNX
- mutate live roles without approved logic
- bypass audit records
- change role IDs without approval

---

## 12. Token and CNX Backend Boundary

Token/CNX logic must remain controlled.

The backend may include token-related routes or services, but v3 doctrine requires that CNX remain optional utility.

CNX backend logic must not:

- require wallet for basic gameplay
- request private keys
- execute token transfers without explicit approval
- access treasury assets
- spend CNX
- convert CNX to gameplay resources
- guarantee prizes
- bypass caps
- bypass moderation locks

Future CNX automation requires Phase 5 approval.

---

## 13. Payout and Prize Boundary

Payout/prize logic must be treated as high risk.

Prize and payout systems must remain separate from XP.

Prize-related backend actions require:

- eligibility check
- ledger record
- admin audit
- approval status
- season or event reference where applicable
- reason code

No automated prize execution should exist without explicit approval.

---

## 14. Environment Variables

Backend environment variables must be handled carefully.

Known backend environment categories include:

- database connection
- Discord bot token
- Discord guild ID
- founder/admin IDs
- current phase
- strict economy flag
- admin mode
- backend port
- backend host
- CORS origins
- frontend origin
- Node environment

Rules:

- do not commit .env
- do not print real secrets
- do not request private keys
- do not expose tokens
- do not change production env values without approval
- update .env.example only when documenting expected variables

Sensitive variables include:

- DATABASE_URL
- BOT_TOKEN
- private keys
- wallet secrets
- production URLs if sensitive
- admin/founder control variables

---

## 15. Phase and Strict Economy Flags

The backend must respect phase controls.

Important phase/safety environment concepts include:

- CURRENT_PHASE
- STRICT_ECONOMY
- ADMIN_MODE
- ALLOW_GLOBAL_RESET

Rules:

- CURRENT_PHASE controls which systems are active.
- STRICT_ECONOMY should block unsafe economy mutations.
- ADMIN_MODE must not bypass auditability.
- ALLOW_GLOBAL_RESET is dangerous and should remain false in production unless explicitly approved for controlled recovery.

Future systems must check phase gates before activation.

---

## 16. Backend Security Rules

The backend must protect:

- secrets
- database access
- Discord bot token
- role mutation authority
- admin endpoints
- economy state
- audit records
- wallet/token boundaries
- future dashboard controls

Backend code must not:

- log secrets
- expose stack traces publicly in production
- accept unauthenticated admin writes
- trust frontend-only validation
- trust Discord-only truth
- skip audit records
- run destructive actions without approval

---

## 17. API Response Rules

API responses should be:

- sanitized
- minimal
- explicit
- stable
- safe for frontend consumption

API responses must not expose:

- secrets
- internal tokens
- private keys
- raw database URLs
- unnecessary wallet details
- unfiltered internal audit metadata
- sensitive role IDs in public contexts where not needed

Public endpoints should only return public-safe data.

Admin endpoints require authentication and authorization before production use.

---

## 18. Future Dashboard Backend Rules

Future dashboard backend endpoints must start read-only.

Allowed early dashboard endpoints:

- health summary
- economy summary
- role sync status
- Ascension summary
- audit log reads
- CNX status reads
- incident/status reads when available

Write endpoints must wait for:

- authentication
- authorization
- reason code
- audit log
- confirmation flow
- owner approval

Dashboard write controls must never bypass service boundaries.

---

## 19. Future Economy Backend Rules

Future economy implementation must centralize logic in service layers.

Economy write flow should be:

Request
-> identify user
-> validate phase
-> validate action
-> validate cooldown
-> validate resource cost
-> validate caps
-> calculate base reward
-> apply modifiers
-> apply hard cap
-> write economy/audit record
-> update aggregate state
-> return result

Economy values must come from constants or approved config.

Handlers must not hard-code economy values.

---

## 20. Testing and Validation

Backend changes should run available checks.

Expected checks may include:

- npm run build
- npm run test if available
- npm run lint if available
- npx prisma validate
- targeted manual route verification
- bot command dry-run where available

If a script does not exist, report that it does not exist.

Do not claim tests passed unless they were run.

---

## 21. Backend Change Approval Rules

Approval is required before:

- schema changes
- Prisma migrations
- production env changes
- role mutation changes
- economy constant changes
- CNX logic changes
- payout/prize logic changes
- auth changes
- admin permission changes
- destructive data actions
- bot deployment changes
- production deployment changes

When uncertain, stop and ask.

---

## 22. Backend Architecture Completion Standard

A backend change is complete only when it includes:

- clear files changed
- reason for change
- service boundary respected
- audit path preserved
- phase gate respected
- tests/checks run or noted as unavailable
- risks documented
- follow-up tasks listed

Documentation-only backend changes should at minimum check:

- git diff --stat
- git status

---

## 23. Final Backend Directive

The backend is the Citadel Nexus source of truth.

Protect it.

Keep handlers thin.

Keep services authoritative.

Keep secrets out.

Keep audit records intact.

Keep future-phase systems locked.

Do not let Discord, frontend, CNX, dashboard controls, or AI agents override backend authority.
