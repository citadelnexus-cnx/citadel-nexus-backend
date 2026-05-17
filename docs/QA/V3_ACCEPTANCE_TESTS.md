# Citadel Nexus v3 Acceptance Tests

## Document Purpose

This document defines the acceptance tests for the Citadel Nexus v3 Knowledge Core and future v3-aligned system work.

It explains what must be true before the v3 Knowledge Core can be considered complete, what future implementation work must prove, and what must remain locked until approved.

This file is not public marketing copy.

AGENTS.md remains the controlling operating law.

CITADEL_NEXUS_V3_DOCTRINE.md remains the master doctrine.

APPROVAL_GATES.md defines approval requirements.

IMPLEMENTATION_PHASES.md defines phase boundaries.

---

## 1. Master Acceptance Rule

A task is not complete because it was written.

A task is complete only when it is verified.

Acceptance requires evidence.

Evidence may include:

- file exists
- file line count checked
- head/tail checked
- git diff reviewed
- git status checked
- commit created
- branch pushed
- tests run
- checks passed
- risk documented
- owner approval obtained where required

Do not claim completion without verification.

---

## 2. Acceptance Status Values

Allowed statuses:

- PASS
- FAIL
- BLOCKED
- NOT_TESTED
- NOT_APPLICABLE
- NEEDS_REVIEW

Do not mark PASS unless verified.

---

## 3. Knowledge Core Acceptance Tests

## 3.1 AGENTS.md Exists

Acceptance criteria:

- AGENTS.md exists at repository root
- file is committed
- file is pushed
- file defines AI agent operating law
- file states backend authority
- file states Anthony Hammon final authority
- file contains approval-gate language
- file does not contain secrets

Expected status:

PASS after verification.

## 3.2 CLAUDE.md Exists

Acceptance criteria:

- CLAUDE.md exists at repository root
- file is committed
- file is pushed
- file points Claude toward AGENTS.md
- file does not replace AGENTS.md
- file does not contain secrets

Expected status:

PASS after verification.

---

## 4. Doctrine Folder Acceptance Tests

Required files:

- docs/DOCTRINE/CITADEL_NEXUS_V3_DOCTRINE.md
- docs/DOCTRINE/ECONOMY_AND_XP_RULES.md
- docs/DOCTRINE/CNX_UTILITY_RULES.md
- docs/DOCTRINE/ANTI_ABUSE_RULES.md
- docs/DOCTRINE/COMMAND_CONTROL_DASHBOARD_SPEC.md

Acceptance criteria:

- all required files exist
- all required files are committed
- all required files are pushed
- doctrine defines zero pay-to-win
- doctrine defines backend truth
- doctrine defines CNX optional utility
- doctrine defines economy boundaries
- doctrine defines anti-abuse boundaries
- doctrine defines dashboard phase rules
- doctrine does not expose secrets

Expected status:

PASS after verification.

---

## 5. Architecture Folder Acceptance Tests

Required files:

- docs/ARCHITECTURE/SYSTEM_OVERVIEW.md
- docs/ARCHITECTURE/BACKEND_ARCHITECTURE.md
- docs/ARCHITECTURE/DISCORD_BOT_ARCHITECTURE.md
- docs/ARCHITECTURE/DATABASE_SCHEMA_REFERENCE.md
- docs/ARCHITECTURE/AGENTIC_AI_ARCHITECTURE.md

Acceptance criteria:

- all required files exist
- all required files are committed
- all required files are pushed
- system overview explains ecosystem layers
- backend architecture defines backend source of truth
- Discord bot architecture defines bot as interaction layer
- database schema reference lists current Prisma models
- agentic AI architecture defines approval-gated agents
- no file grants agents production authority
- no file exposes secrets

Expected status:

PASS after verification.

Known review note:

SYSTEM_OVERVIEW.md may need later markdown cleanup. This does not block current bootstrap if content remains usable.

---

## 6. Build Folder Acceptance Tests

Required files:

- docs/BUILD/CURRENT_BUILD_STATUS.md
- docs/BUILD/MASTER_BACKLOG.md
- docs/BUILD/IMPLEMENTATION_PHASES.md
- docs/BUILD/APPROVAL_GATES.md
- docs/BUILD/OPEN_DECISIONS.md

Acceptance criteria:

- all required files exist
- all required files are committed
- all required files are pushed
- current build status reflects documentation-first branch
- master backlog defines next task order
- implementation phases define locked future phases
- approval gates define stop conditions
- open decisions prevent assumptions from being treated as approvals
- no file exposes secrets

Expected status:

PASS after verification.

---

## 7. Security Folder Acceptance Tests

Required files:

- docs/SECURITY/DO_NOT_TOUCH.md
- docs/SECURITY/SECRETS_POLICY.md
- docs/SECURITY/PERMISSION_MODEL.md
- docs/SECURITY/WALLET_AND_TREASURY_BOUNDARIES.md

Acceptance criteria:

- all required files exist
- all required files are committed
- all required files are pushed
- do-not-touch list protects high-risk systems
- secrets policy forbids secret exposure
- permission model defines least privilege
- wallet and treasury boundaries forbid custody and private key handling
- no file contains real secrets
- no file grants agents treasury access

Expected status:

PASS after verification.

---

## 8. QA Folder Acceptance Tests

Required files:

- docs/QA/V3_ACCEPTANCE_TESTS.md
- docs/QA/ECONOMY_TEST_PLAN.md
- docs/QA/PRODUCTION_READINESS_CHECKLIST.md

Acceptance criteria:

- all required files exist
- all required files are committed
- all required files are pushed
- acceptance tests define verification requirements
- economy test plan defines safe economy validation
- production readiness checklist blocks unsafe production work
- no file activates future systems

Expected status:

PENDING until complete.

---

## 9. Documentation-Only Branch Acceptance Tests

The v3 Knowledge Core branch is documentation-first.

Acceptance criteria:

- no application logic files changed without approval
- no Prisma schema changes
- no migrations created
- no production env changes
- no Discord role mutation changes
- no economy constants changed
- no bot deployment changes
- no production config changes
- no secrets committed

Verification commands:

- git status
- git diff main...HEAD --stat
- git diff main...HEAD --name-only
- git log --oneline

Expected status:

PASS if only approved docs are changed.

---

## 10. Secret Safety Acceptance Tests

Acceptance criteria:

- no real BOT_TOKEN committed
- no real DATABASE_URL committed
- no private keys committed
- no seed phrases committed
- no Supabase service role key committed
- no GitHub token committed
- no payment secret committed
- no production .env committed
- docs use placeholders only

Suggested checks:

- search for BOT_TOKEN values
- search for DATABASE_URL values
- search for private key markers
- search for seed phrase language
- search for .env files in git status
- review .gitignore

Expected status:

PASS only after repository scan.

---

## 11. Backend Authority Acceptance Tests

Acceptance criteria:

- docs consistently state backend defines truth
- docs consistently state Discord reflects truth
- docs consistently state frontend surfaces truth
- docs consistently state AI agents assist execution
- docs consistently state Anthony Hammon final authority
- no doc gives Discord final authority
- no doc gives frontend final authority
- no doc gives AI agents final authority

Expected status:

PASS after doc review.

---

## 12. Phase Boundary Acceptance Tests

Acceptance criteria:

- Phase 0 is documentation bootstrap
- Phase 1 is current product stabilization
- Phase 2 Contribution XP remains locked
- Phase 3 Seasons/Nexus Score remains locked
- Phase 4 Arcade remains locked
- Phase 5 CNX automation remains locked
- Phase 6 Prestige/NFT eligibility remains locked
- Phase 7 dashboard operations remain future/controlled
- Phase 8 agentic operations remain future/controlled

Expected status:

PASS after doc review.

---

## 13. Economy Safety Acceptance Tests

Acceptance criteria:

- zero pay-to-win rule documented
- Game XP cannot be bought
- Game Rank cannot be bought
- Stage cannot be bought
- CNX cannot buy resources
- CNX cannot guarantee prizes
- CNX cannot bypass caps
- CNX cannot bypass locks
- prizes remain separate from XP/resources
- admin changes require auditability
- future economy changes require approval

Expected status:

PASS after doc review.

---

## 14. CNX Safety Acceptance Tests

Acceptance criteria:

- CNX is optional utility
- CNX is not required for basic gameplay
- CNX automation remains locked
- CNX spending remains forbidden
- CNX-to-resource conversion remains forbidden
- CNX-to-prize guarantee remains forbidden
- wallet verification remains future/deferred
- private key handling is forbidden
- seed phrase handling is forbidden
- treasury access for agents is forbidden

Expected status:

PASS after doc review.

---

## 15. Discord Bot Safety Acceptance Tests

Acceptance criteria:

- bot is defined as interaction layer
- bot does not define truth
- bot must use service-backed logic
- admin commands require permission checks
- live role mutation requires approval
- role sync must be auditable
- slash command production changes require approval
- bot token must remain secret
- bot deployment changes require approval

Expected status:

PASS after doc review.

---

## 16. Database Safety Acceptance Tests

Acceptance criteria:

- database is truth storage
- Prisma schema changes require approval
- migrations require approval
- destructive SQL requires approval
- production DB writes require approval
- audit records must not be deleted
- evidence must not be deleted
- future tables are documented as future only
- no migration was created during bootstrap

Expected status:

PASS after verification.

---

## 17. Dashboard Safety Acceptance Tests

Acceptance criteria:

- dashboard starts static/read-only
- write controls remain locked
- emergency controls remain locked
- dashboard write controls require auth
- dashboard write controls require authorization
- dashboard write controls require reason codes
- dashboard write controls require audit logs
- dashboard write controls require confirmation flows
- dashboard write controls require owner approval

Expected status:

PASS after doc review.

---

## 18. Agentic AI Safety Acceptance Tests

Acceptance criteria:

- AI agents are assistants, not authorities
- agents cannot approve themselves
- agents cannot deploy production autonomously
- agents cannot merge to main autonomously
- agents cannot run migrations without approval
- agents cannot mutate live Discord roles
- agents cannot issue XP
- agents cannot issue prizes
- agents cannot access treasury/private keys
- agents must produce completion reports

Expected status:

PASS after doc review.

---

## 19. Open Decision Acceptance Tests

Acceptance criteria:

- open decisions file exists
- approved decisions are clearly marked
- open decisions are clearly marked
- deferred decisions are clearly marked
- placeholder templates are not treated as approvals
- blocking decisions are visible
- future phases remain blocked where decisions are open

Expected status:

PASS after verification.

---

## 20. Pull Request Readiness Acceptance Tests

The knowledge-core branch is ready for PR only when:

- all doctrine docs exist
- all architecture docs exist
- all build docs exist
- all security docs exist
- all QA docs exist
- formatting pass is complete or known issues are documented
- git status is clean except intentional files before commit
- branch is pushed
- no secrets are present
- no application logic changed unexpectedly
- owner review is requested

Expected status:

PENDING until QA docs are complete.

---

## 21. Required Final Verification Commands

Before the knowledge-core branch is considered ready for review, run:

- git status
- git log --oneline -20
- find docs -maxdepth 2 -type f | sort
- git diff main...HEAD --stat
- git diff main...HEAD --name-only
- grep checks for obvious pasted command artifacts
- grep checks for obvious secret markers
- optional markdown lint if available

Do not claim final readiness until verification is complete.

---

## 22. Failure Conditions

The v3 Knowledge Core fails acceptance if:

- secrets are committed
- production config is changed without approval
- Prisma schema is changed without approval
- migrations are added without approval
- economy constants are changed without approval
- Discord role IDs are changed without approval
- dashboard write controls are implemented early
- agent authority is expanded without approval
- CNX automation is activated early
- future phases are treated as live
- open decisions are hidden
- documentation contradicts AGENTS.md

---

## 23. Final Acceptance Directive

Verify before claiming complete.

Document failures honestly.

Do not hide known issues.

Do not treat future plans as live systems.

Do not treat recommendations as approvals.

Do not move to implementation until the knowledge core passes review.
