# Citadel Nexus Master Backlog

## Document Purpose

This document defines the master internal backlog for Citadel Nexus after the v3 Knowledge Core bootstrap.

It organizes remaining work into controlled phases, dependencies, risk levels, approval requirements, and implementation order.

This file is not public marketing copy.

AGENTS.md remains the controlling operating law.

CITADEL_NEXUS_V3_DOCTRINE.md remains the master doctrine.

CURRENT_BUILD_STATUS.md records the current verified build state.

---

## 1. Backlog Doctrine

The Citadel Nexus backlog must be executed slowly, safely, and in dependency order.

Do not build future-phase systems before the foundation is stable.

Do not activate high-risk systems early.

Do not overload the current backend, Discord bot, database, or frontend.

Do not mix documentation, schema changes, economy logic, Discord role mutation, CNX automation, dashboard write controls, and production deployment in the same task unless explicitly approved.

Every task must have:

- purpose
- phase
- risk level
- dependencies
- approval gates
- files likely affected
- acceptance criteria
- testing or verification requirements

---

## 2. Priority System

Backlog priorities:

| Priority | Meaning |
|---|---|
| P0 | Critical safety, blockers, corruption, security, production incident |
| P1 | Required foundation before next build phase |
| P2 | Important but not blocking current phase |
| P3 | Useful enhancement |
| P4 | Future idea / parked |

Risk levels:

| Risk | Meaning |
|---|---|
| LOW | Documentation or read-only change |
| MEDIUM | App logic or UI change with limited blast radius |
| HIGH | Economy, auth, role sync, database, deployment, or admin logic |
| CRITICAL | Treasury, token transfer, destructive DB, prize execution, emergency controls |

---

## 3. Current Active Epic

## Epic A — v3 Knowledge Core Bootstrap

Status:

IN PROGRESS.

Purpose:

Create complete internal repo knowledge so humans and AI agents can continue building Citadel Nexus safely.

Completed:

- AGENTS.md
- CLAUDE.md
- docs/DOCTRINE/
- docs/ARCHITECTURE/
- docs/BUILD/CURRENT_BUILD_STATUS.md

Remaining:

- docs/BUILD/MASTER_BACKLOG.md
- docs/BUILD/IMPLEMENTATION_PHASES.md
- docs/BUILD/APPROVAL_GATES.md
- docs/BUILD/OPEN_DECISIONS.md
- docs/SECURITY/
- docs/QA/

Risk:

LOW.

Application logic impact:

None.

---

## 4. Epic A Tasks — Knowledge Core Completion

### A1 — Add Master Backlog

File:

docs/BUILD/MASTER_BACKLOG.md

Status:

IN PROGRESS.

Risk:

LOW.

Acceptance criteria:

- backlog phases are defined
- priority system is defined
- current tasks are listed
- locked future tasks are listed
- approval-sensitive work is flagged

### A2 — Add Implementation Phases

File:

docs/BUILD/IMPLEMENTATION_PHASES.md

Status:

PENDING.

Risk:

LOW.

Acceptance criteria:

- Phase 1 through Phase 6 are documented
- allowed work per phase is listed
- forbidden early work is listed
- exit criteria are defined

### A3 — Add Approval Gates

File:

docs/BUILD/APPROVAL_GATES.md

Status:

PENDING.

Risk:

LOW.

Acceptance criteria:

- approval-required actions are listed
- high-risk domains are separated
- agent stop conditions are clear
- owner approval model is defined

### A4 — Add Open Decisions

File:

docs/BUILD/OPEN_DECISIONS.md

Status:

PENDING.

Risk:

LOW.

Acceptance criteria:

- unresolved build decisions are listed
- each decision has status
- no fake assumptions are treated as approved
- dependencies are visible

### A5 — Add Security Docs

Files:

- docs/SECURITY/DO_NOT_TOUCH.md
- docs/SECURITY/SECRETS_POLICY.md
- docs/SECURITY/PERMISSION_MODEL.md
- docs/SECURITY/WALLET_AND_TREASURY_BOUNDARIES.md

Status:

PENDING.

Risk:

LOW for docs, HIGH for any future implementation.

### A6 — Add QA Docs

Files:

- docs/QA/V3_ACCEPTANCE_TESTS.md
- docs/QA/ECONOMY_TEST_PLAN.md
- docs/QA/PRODUCTION_READINESS_CHECKLIST.md

Status:

PENDING.

Risk:

LOW for docs.

---

## 5. Epic B — Documentation Review and Cleanup

Status:

PENDING.

Purpose:

Review and clean the new knowledge-core documents after all required docs are present.

Risk:

LOW.

Dependencies:

- Epic A complete

Tasks:

### B1 — Formatting Review

Purpose:

Fix markdown formatting issues, headings, code blocks, tables, and paste artifacts.

Known target:

- docs/ARCHITECTURE/SYSTEM_OVERVIEW.md

Acceptance criteria:

- markdown renders cleanly
- no malformed code fences
- no pasted command artifacts
- no duplicate sections
- no broken heading levels

### B2 — Cross-Reference Review

Purpose:

Ensure all docs reference each other accurately.

Acceptance criteria:

- AGENTS.md references required docs
- doctrine docs align with build docs
- architecture docs align with current repo
- security docs align with approval gates
- QA docs align with economy rules

### B3 — Terminology Review

Purpose:

Normalize language across docs.

Important terms:

- backend truth
- Discord reflection
- frontend surface
- AI assistance
- Anthony Hammon final authority
- zero pay-to-win
- Phase 1 stabilization
- CNX optional utility
- Command Control Dashboard
- MCAOS

---

## 6. Epic C — Repo Audit Against v3 Knowledge Core

Status:

PENDING.

Purpose:

Audit the current backend repo against the newly created v3 Knowledge Core.

Risk:

LOW for audit, MEDIUM/HIGH for later fixes.

Dependencies:

- Epic A complete
- Epic B preferred but not required

Tasks:

### C1 — File Tree Audit

Purpose:

Map current repo structure against architecture docs.

Acceptance criteria:

- current directories listed
- major modules mapped
- unknown files flagged
- dead or duplicate areas flagged

### C2 — Route Audit

Purpose:

Confirm actual backend routes and compare to docs.

Acceptance criteria:

- route list verified
- route ownership mapped
- route risk level assigned
- routes with business logic flagged

### C3 — Service Boundary Audit

Purpose:

Confirm business logic lives in services rather than route or command handlers.

Acceptance criteria:

- service files listed
- handlers with heavy logic flagged
- economy logic locations identified
- audit path gaps flagged

### C4 — Prisma Schema Audit

Purpose:

Compare Prisma schema to DATABASE_SCHEMA_REFERENCE.md.

Acceptance criteria:

- models verified
- fields summarized
- migrations listed
- future schema needs separated from current schema
- no migration created

### C5 — Bot Runtime Audit

Purpose:

Confirm Discord bot runtime, commands, and admin controls.

Acceptance criteria:

- bot entry verified
- command files listed
- admin commands identified
- role mutation paths identified
- risky bot actions flagged

### C6 — Security Audit

Purpose:

Review secrets, environment files, permissions, and dangerous flags.

Acceptance criteria:

- .env not committed
- .env.example reviewed
- dangerous env vars documented
- no secrets printed
- security docs updated if needed

---

## 7. Epic D — Phase 1 Stabilization

Status:

PENDING.

Purpose:

Stabilize the current active build before adding new systems.

Risk:

MEDIUM to HIGH depending on task.

Dependencies:

- Knowledge core complete
- repo audit complete
- owner-approved implementation plan

Allowed Phase 1 focus:

- current gameplay stability
- health checks
- service boundary cleanup
- audit improvements
- read-only summaries
- documentation alignment
- test coverage
- bug fixes
- safe admin visibility
- no future-system activation

Tasks:

### D1 — Verify Health Endpoints

Risk:

LOW/MEDIUM.

Acceptance criteria:

- /health returns safe status
- /health/db verifies database connectivity safely
- no secrets exposed
- failures are handled cleanly

### D2 — Verify Ascension Profile Flow

Risk:

MEDIUM.

Acceptance criteria:

- profile creation works
- duplicate creation prevented
- profile fields persist correctly
- locked profile behavior reviewed

### D3 — Verify Claim Flow

Risk:

MEDIUM.

Acceptance criteria:

- cooldown enforced
- Power/resources update correctly
- no infinite loop
- no future CNX automation active
- errors are user-safe

### D4 — Verify Mission Flow

Risk:

MEDIUM/HIGH.

Acceptance criteria:

- mission types validate
- Power costs apply
- failure logic works
- XP cannot go below 0
- mission cap gaps identified
- audit gaps identified

### D5 — Verify Build Flow

Risk:

MEDIUM/HIGH.

Acceptance criteria:

- building keys validate
- resource cost behavior reviewed
- building level behavior reviewed
- one-time reward behavior reviewed
- negative resource prevention verified or flagged

### D6 — Verify Status Flow

Risk:

LOW/MEDIUM.

Acceptance criteria:

- status command returns safe data
- no admin-only internals exposed
- profile display is accurate

### D7 — Verify Admin Commands

Risk:

HIGH.

Acceptance criteria:

- permissions reviewed
- admin actions log correctly
- reasons required where applicable
- global reset protections reviewed
- dangerous commands flagged

---

## 8. Epic E — Economy Audit and Hardening

Status:

PENDING.

Purpose:

Prepare current and future economy systems for safe scaling.

Risk:

HIGH.

Dependencies:

- Epic C audit
- owner approval before implementation

Tasks:

### E1 — Locate Economy Constants

Purpose:

Find all current XP, resource, mission, claim, rank, and building values.

Acceptance criteria:

- values located
- source files listed
- hard-coded values flagged
- mismatch with ECONOMY_AND_XP_RULES.md flagged

### E2 — Economy Event Gap Report

Purpose:

Identify where economy mutations are not currently logged.

Acceptance criteria:

- mutation points listed
- current audit paths listed
- missing logs flagged
- future EconomyEvent plan drafted

### E3 — Cap Enforcement Gap Report

Purpose:

Identify missing or partial cap enforcement.

Acceptance criteria:

- claim caps reviewed
- mission caps reviewed
- daily XP cap reviewed
- resource caps reviewed
- CNX cap interaction confirmed inactive or safe

### E4 — Economy Simulation Plan

Purpose:

Design a non-production simulation for progression pacing.

Acceptance criteria:

- casual/regular/active/hardcore player models defined
- expected XP ranges tested conceptually
- exploit paths identified
- no production changes made

---

## 9. Epic F — Contribution XP / Discord Rank Preparation

Status:

FUTURE / LOCKED.

Phase:

Phase 2.

Risk:

HIGH.

Do not start until Phase 1 stabilization is approved complete.

Potential tasks:

- define Contribution XP service
- define qualifying message logic
- define cooldown logic
- define duplicate detection
- define verified action queue
- define moderator verification flow
- define daily/weekly caps
- define Discord Rank thresholds
- define abuse flags

Forbidden before approval:

- live message XP automation
- automatic Discord Rank roles
- growth XP rewards
- voice XP rewards
- invite XP rewards

---

## 10. Epic G — Seasons and Nexus Score

Status:

FUTURE / LOCKED.

Phase:

Phase 3.

Risk:

HIGH.

Potential tasks:

- create season model proposal
- define active season state
- define Nexus Score calculation
- define leaderboard read endpoint
- define season archive plan
- define leaderboard freeze behavior
- define eligibility checks

Forbidden before approval:

- live leaderboard rewards
- automatic season reset
- prize-linked scoring
- event score conversion

---

## 11. Epic H — Arcade Layer

Status:

FUTURE / LOCKED.

Phase:

Phase 4.

Risk:

HIGH.

Potential tasks:

- define arcade session tracking
- define Arcade XP rules
- define anti-cheat checks
- define daily arcade caps
- define weighted Nexus Score integration
- define delayed leaderboard review

Forbidden before approval:

- arcade rewards
- arcade score prize eligibility
- uncapped game bonuses

---

## 12. Epic I — CNX Automation

Status:

FUTURE / LOCKED.

Phase:

Phase 5.

Risk:

HIGH / CRITICAL depending on wallet scope.

Potential tasks:

- define CNX constants file
- define tier calculation read-only service
- define wallet verification proposal
- define tier snapshot proposal
- define holder role dry-run
- define multiplier service proposal
- define CNX freeze status

Forbidden before approval:

- wallet private key handling
- token spending
- CNX-to-resource conversion
- automatic production wallet reads
- automatic multiplier activation
- prize guarantees
- treasury access

---

## 13. Epic J — Command Control Dashboard

Status:

FUTURE / PARTIALLY PLANNED.

Risk:

LOW for static prototype.

Risk:

HIGH for write controls.

Phase order:

1. Static prototype
2. Read-only live monitor
3. Controlled admin actions
4. Emergency controls

Potential safe tasks:

- static UI concept
- read-only status card design
- dashboard route planning
- module status model planning
- incident rail design
- admin audit viewer plan

Forbidden before approval:

- dashboard write controls
- emergency buttons
- live freeze controls
- direct admin mutations
- production deploy controls

---

## 14. Epic K — Prestige / NFT Eligibility

Status:

FUTURE / LOCKED.

Phase:

Phase 6.

Risk:

HIGH.

Potential tasks:

- define non-power prestige rules
- define achievement archive
- define NFT eligibility requirements
- define cosmetic-only utility
- define public eligibility wording

Forbidden before approval:

- NFT minting
- token-gated power
- pay-to-win eligibility
- guaranteed financial claims
- automatic mint authority

---

## 15. Epic L — Production Readiness

Status:

PENDING FUTURE.

Risk:

HIGH.

Dependencies:

- QA docs complete
- security docs complete
- repo audit complete
- owner-approved deployment plan

Tasks:

- build verification
- lint/typecheck review
- Prisma validation
- environment review
- PM2 process review
- Nginx review
- backup/recovery review
- Discord bot deployment review
- rollback plan
- production incident plan

No production deployment changes are allowed without approval.

---

## 16. Epic M — Public Narrative and Launch Alignment

Status:

PENDING FUTURE.

Risk:

MEDIUM.

Purpose:

Prepare accurate public-facing messaging without overpromising.

Tasks:

- public announcement review
- Discord server alignment
- what-is-live post
- what-is-not-live post
- roadmap explanation
- token utility wording review
- no investment claim review
- Discord channel pin review

Public messages must not claim:

- guaranteed rewards
- investment value
- required CNX purchase
- live systems that are not live
- prize eligibility without rules

---

## 17. Parked Ideas

The following ideas are parked until foundations are ready:

- full MCAOS autonomous operator
- multi-agent automated production build system
- live Command Control emergency room
- NFT minting
- automated token utility expansion
- public Reputation Passport
- TrustLayer-style credential system
- advanced arcade integrations
- public API for partner integrations
- mobile app
- enterprise dashboard

Parked does not mean rejected.

Parked means not now.

---

## 18. Current Next Task Order

Recommended next task order:

1. Complete BUILD docs.
2. Complete SECURITY docs.
3. Complete QA docs.
4. Run documentation formatting cleanup.
5. Create pull request for knowledge-core branch.
6. Review branch diff.
7. Merge only after approval.
8. Start repo audit epic.
9. Create issue backlog from this document.
10. Begin Phase 1 stabilization tasks.

---

## 19. Final Backlog Directive

Build in order.

Document first.

Audit second.

Stabilize third.

Expand later.

Do not skip to high-risk systems because they are exciting.

Do not activate future systems before current systems are stable.

Protect the economy, community, codebase, and human command authority.
