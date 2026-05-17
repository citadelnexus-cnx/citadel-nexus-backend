# Citadel Nexus Current Build Status

## Document Purpose

This document records the current verified build status of Citadel Nexus as of the v3 knowledge-core bootstrap.

This file is an internal build reference for humans, Claude, ChatGPT, Codex, GitHub agents, and future MCAOS build operators.

This file should be updated whenever the verified build state changes.

This file is not public marketing copy.

AGENTS.md remains the controlling operating law.

CLAUDE.md defines Claude-specific operating guidance.

CITADEL_NEXUS_V3_DOCTRINE.md remains the master doctrine.

---

## 1. Current Build Phase

Current phase:

Phase 1 — Stabilize Current Build

Primary focus:

- preserve current backend/frontend/bot functionality
- document the v3 doctrine
- make the repo safe for AI-assisted development
- avoid overloading active systems
- prevent premature activation of future economy, CNX, dashboard, prize, NFT, or agentic automation systems

Current branch for knowledge-core work:

agent/bootstrap-v3-knowledge-core

---

## 2. Current Repository

Current repository being updated:

citadelnexus-cnx/citadel-nexus-backend

Working path:

~/apps/citadel-nexus-backend

Current purpose of this branch:

Create the Citadel Nexus v3 Knowledge Core inside the backend repository.

This branch is documentation-first.

Application logic changes are not part of the current task.

---

## 3. Completed Control Files

The following control files have been created and pushed:

- AGENTS.md
- CLAUDE.md

AGENTS.md defines operating law for all AI agents.

CLAUDE.md defines Claude-specific operating behavior and points back to AGENTS.md.

---

## 4. Completed Doctrine Files

The following doctrine files have been created and pushed:

- docs/DOCTRINE/CITADEL_NEXUS_V3_DOCTRINE.md
- docs/DOCTRINE/ECONOMY_AND_XP_RULES.md
- docs/DOCTRINE/CNX_UTILITY_RULES.md
- docs/DOCTRINE/ANTI_ABUSE_RULES.md
- docs/DOCTRINE/COMMAND_CONTROL_DASHBOARD_SPEC.md

Doctrine folder status:

COMPLETE for current bootstrap pass.

Future doctrine changes require review and must stay aligned with AGENTS.md.

---

## 5. Completed Architecture Files

The following architecture files have been created and pushed:

- docs/ARCHITECTURE/SYSTEM_OVERVIEW.md
- docs/ARCHITECTURE/BACKEND_ARCHITECTURE.md
- docs/ARCHITECTURE/DISCORD_BOT_ARCHITECTURE.md
- docs/ARCHITECTURE/DATABASE_SCHEMA_REFERENCE.md
- docs/ARCHITECTURE/AGENTIC_AI_ARCHITECTURE.md

Architecture folder status:

COMPLETE for current bootstrap pass.

Known note:

SYSTEM_OVERVIEW.md is usable but should receive a later formatting cleanup pass because a previous paste lost some markdown formatting. It was restored to the committed version and should not block the current knowledge-core build.

---

## 6. Current Verified Backend Stack

Verified backend stack:

- Node.js
- TypeScript
- Express.js
- Prisma ORM
- PostgreSQL through Supabase
- Discord.js for bot runtime
- dotenv
- CORS configured by environment
- PM2 runtime outside repo
- Nginx reverse proxy outside repo
- Hedera SDK present but controlled/deferred

The backend is the source of truth.

Discord reflects backend truth.

Frontend surfaces backend truth.

AI agents assist execution.

Anthony Hammon holds final authority.

---

## 7. Current Verified Frontend Stack

Verified frontend stack:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Vercel deployment

Frontend responsibilities:

- public website
- member-facing surface
- public profile display
- project information pages
- future dashboard UI

Frontend must not directly mutate backend economy state.

---

## 8. Current Verified Database Foundation

Current verified Prisma models:

- User
- AccessState
- Entitlement
- DiscordRoleSyncAudit
- AscensionProfile
- AscensionPrizePool
- AscensionAdminAction
- AscensionAdminSnapshot

Current database role:

- persistent user state
- access state
- entitlement state
- Discord role sync audit
- Ascension gameplay state
- admin action records
- admin snapshots
- prize pool records

Database schema changes require explicit approval.

Prisma migrations must not be created or run by agents without approval.

---

## 9. Current Verified Backend Route Areas

Current verified backend route areas include:

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

Routes must remain service-backed.

Route handlers should stay thin.

Business logic belongs in service layers.

---

## 10. Current Verified Service Areas

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

Future economy services should be centralized and audit-backed.

---

## 11. Current Discord Bot Status

Current bot status:

Active Phase 1 gameplay bot.

Verified bot runtime entry:

src/modules/ascension/runtime/bot-entry.js

The bot is separate from the Express API runtime.

Current bot scope includes:

- start/onboarding
- claim
- mission
- build
- status
- admin commands
- admin audit support
- profile state interactions

The bot must not override backend truth.

Live Discord role mutation changes require approval.

Production bot restart/deploy changes require approval.

---

## 12. Current Ascension Gameplay Status

Current Ascension gameplay foundation includes:

- Guardian identity
- Ascension profile
- Stage
- rank
- XP
- level
- Node Score
- session count
- missions completed
- Power
- max Power
- Credits
- Intel
- buildings
- claim timestamp
- lock state
- admin action support

Current active gameplay phase:

Phase 1 only.

Locked future gameplay systems:

- Contribution XP automation
- automated Discord Rank system
- Seasons
- Nexus Score automation
- Arcade XP
- CNX automation
- Prestige
- NFT eligibility

---

## 13. Current CNX Status

CNX status:

Controlled / deferred.

CNX must remain optional.

CNX must not be required for basic gameplay.

CNX must not buy rank, Stage, XP, resources, prizes, admin access, or moderation authority.

Future CNX automation is Phase 5.

Current allowed CNX work:

- documentation
- utility rule definition
- constants planning
- read-only design
- future dashboard monitoring plans

Current disallowed CNX work:

- spending
- resource conversion
- production wallet automation
- production multiplier activation
- prize guarantee
- pay-to-win mechanics

---

## 14. Current Prize Pool Status

Prize pool status:

Foundation exists, but execution must remain controlled.

Prize pool logic is high risk.

Prize pool records must remain separate from XP and gameplay resources.

Prize awards require:

- eligibility check
- ledger/prize record
- admin audit
- reason
- approval
- season/event reference where applicable

Automated prize execution is not authorized.

---

## 15. Current Command Control Dashboard Status

Dashboard status:

Planned.

Current dashboard work allowed:

- documentation
- static prototype planning
- read-only architecture planning
- monitoring model design
- UI/UX specification

Current dashboard work not allowed:

- production write controls
- emergency controls
- economy lockdown endpoints
- CNX freeze endpoints
- live role mutation controls
- prize controls
- database destructive controls

Dashboard write controls require:

- authentication
- authorization
- reason codes
- audit logs
- confirmation flows
- owner approval

---

## 16. Current Agentic AI Status

Agentic AI status:

Planning and repo-readiness phase.

Current allowed AI agent capabilities:

- documentation
- repo audits
- gap reports
- issue/backlog preparation
- safe code scaffolding after approval
- test planning
- PR summaries

Current disallowed AI agent capabilities:

- production deployment
- merge to main
- migrations
- live Discord role mutation
- XP issuance
- prize issuance
- CNX automation
- wallet/treasury access
- destructive data actions

Agentic AI must remain approval-gated.

---

## 17. Current Security Status

Security doctrine is partially documented through:

- AGENTS.md
- CLAUDE.md
- docs/DOCTRINE/
- docs/ARCHITECTURE/

Dedicated security docs still need to be filled:

- docs/SECURITY/DO_NOT_TOUCH.md
- docs/SECURITY/SECRETS_POLICY.md
- docs/SECURITY/PERMISSION_MODEL.md
- docs/SECURITY/WALLET_AND_TREASURY_BOUNDARIES.md

Security folder status:

PENDING.

---

## 18. Current QA Status

QA doctrine is partially documented through:

- AGENTS.md
- CLAUDE.md
- economy rules
- anti-abuse rules
- architecture docs

Dedicated QA docs still need to be filled:

- docs/QA/V3_ACCEPTANCE_TESTS.md
- docs/QA/ECONOMY_TEST_PLAN.md
- docs/QA/PRODUCTION_READINESS_CHECKLIST.md

QA folder status:

PENDING.

---

## 19. Current Build Docs Status

Build docs currently being created.

Required build files:

- docs/BUILD/CURRENT_BUILD_STATUS.md
- docs/BUILD/MASTER_BACKLOG.md
- docs/BUILD/IMPLEMENTATION_PHASES.md
- docs/BUILD/APPROVAL_GATES.md
- docs/BUILD/OPEN_DECISIONS.md

Build folder status:

IN PROGRESS.

---

## 20. Current Completed Commit Trail

Recent completed knowledge-core commits include:

- docs(agents): add Citadel Nexus agent operating law
- docs(claude): add Claude operating guide
- docs(doctrine): add Citadel Nexus v3 doctrine
- docs(doctrine): add economy and XP rules
- docs(doctrine): add CNX utility rules
- docs(doctrine): add anti-abuse rules
- docs(doctrine): add command control dashboard spec
- docs(architecture): add system overview
- docs(architecture): add backend architecture
- docs(architecture): add Discord bot architecture
- docs(architecture): add database schema reference
- docs(architecture): add agentic AI architecture

---

## 21. Current Known Issues

Known issue 1:

SYSTEM_OVERVIEW.md may need a later markdown cleanup pass.

Impact:

Low.

Reason:

The file is still usable as an architecture reference, and architecture work is not blocked.

Known issue 2:

Some remaining docs exist as empty untracked files/folders until filled.

Impact:

Low.

Reason:

They are being filled one at a time in controlled order.

Known issue 3:

No application logic has been changed during knowledge-core bootstrap.

Impact:

Positive.

Reason:

The current branch is intentionally documentation-first.

---

## 22. Current Locked Systems

The following must remain locked unless explicitly approved:

- Contribution XP automation
- Discord Rank automation
- Seasons
- Nexus Score automation
- Arcade XP
- CNX automation
- CNX spending
- CNX-to-resource conversion
- prize payouts
- NFT eligibility
- prestige
- dashboard write controls
- emergency controls
- production agent write authority
- schema migrations
- destructive database actions
- live Discord role mutation expansion
- production deployment changes

---

## 23. Current Next Steps

Immediate next files after this one:

1. docs/BUILD/MASTER_BACKLOG.md
2. docs/BUILD/IMPLEMENTATION_PHASES.md
3. docs/BUILD/APPROVAL_GATES.md
4. docs/BUILD/OPEN_DECISIONS.md
5. docs/SECURITY/DO_NOT_TOUCH.md
6. docs/SECURITY/SECRETS_POLICY.md
7. docs/SECURITY/PERMISSION_MODEL.md
8. docs/SECURITY/WALLET_AND_TREASURY_BOUNDARIES.md
9. docs/QA/V3_ACCEPTANCE_TESTS.md
10. docs/QA/ECONOMY_TEST_PLAN.md
11. docs/QA/PRODUCTION_READINESS_CHECKLIST.md

---

## 24. Completion Standard for Current Bootstrap

The v3 Knowledge Core bootstrap is complete when the repo includes:

- AGENTS.md
- CLAUDE.md
- all doctrine docs
- all architecture docs
- all build docs
- all security docs
- all QA docs

After that, the next work should be:

1. Review docs for formatting.
2. Create a pull request from agent/bootstrap-v3-knowledge-core.
3. Run documentation-only verification.
4. Merge only after owner approval.
5. Begin repo audit against the new knowledge core.

---

## 25. Final Current Status

Current status:

Knowledge-core bootstrap is actively progressing.

Doctrine folder:

Complete for current pass.

Architecture folder:

Complete for current pass.

Build folder:

In progress.

Security folder:

Pending.

QA folder:

Pending.

Application logic:

Unchanged during this bootstrap.

Overall risk:

Low, because work is documentation-only and being committed one file at a time.
