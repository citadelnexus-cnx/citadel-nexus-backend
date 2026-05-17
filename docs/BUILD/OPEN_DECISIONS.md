# Citadel Nexus Open Decisions

## Document Purpose

This document tracks open, pending, deferred, and approved decisions for Citadel Nexus.

It prevents assumptions from being treated as approved decisions.

It supports humans, Claude, ChatGPT, Codex, GitHub agents, and future MCAOS build operators by keeping unresolved decisions visible.

This file is not public marketing copy.

AGENTS.md remains the controlling operating law.

APPROVAL_GATES.md defines how decisions are approved.

IMPLEMENTATION_PHASES.md defines phase boundaries.

MASTER_BACKLOG.md defines backlog order.

---

## 1. Master Open Decision Rule

If a decision is not explicitly approved, it remains open.

Silence is not approval.

Future documentation is not approval.

A prototype is not approval.

A recommendation is not approval.

An AI-generated plan is not approval.

A decision becomes approved only when Anthony Hammon clearly approves it or when it is already proven by committed, verified, intended repo state.

---

## 2. Decision Status Values

Allowed statuses:

- OPEN
- PENDING_REVIEW
- APPROVED
- REJECTED
- DEFERRED
- BLOCKED
- SUPERSEDED

Do not invent new decision statuses unless this file is updated.

---

## 3. Decision Risk Levels

Allowed risk levels:

- LOW
- MEDIUM
- HIGH
- CRITICAL

Risk definitions follow APPROVAL_GATES.md.

---

## 4. Decision Record Format

Use this format for every future decision:

DECISION

ID:
Title:
Status:
Owner:
Risk:
Affected systems:
Options:
Recommendation:
Blocking:
Decision:
Date:

---

## 5. Currently Approved Foundation Decisions

### DECISION D-001

ID: D-001

Title: Backend remains source of truth

Status: APPROVED

Owner: Anthony Hammon

Risk: HIGH

Affected systems:

- backend
- Discord
- frontend
- dashboard
- AI agents

Options:

- backend defines truth
- Discord defines truth
- frontend defines truth
- agents define truth

Recommendation:

Backend defines truth.

Blocking:

None.

Decision:

Approved. Backend defines truth. Discord reflects truth. Frontend surfaces truth. AI agents assist execution. Anthony Hammon holds final authority.

Date:

2026-05-12

---

### DECISION D-002

ID: D-002

Title: v3 Knowledge Core branch is documentation-first

Status: APPROVED

Owner: Anthony Hammon

Risk: LOW

Affected systems:

- docs
- repo workflow
- AI agent readiness

Options:

- documentation-first bootstrap
- code-first implementation
- mixed docs/code implementation

Recommendation:

Documentation-first bootstrap.

Blocking:

None.

Decision:

Approved. The current branch creates the v3 Knowledge Core through docs only. Application logic remains unchanged during this bootstrap.

Date:

2026-05-12

---

### DECISION D-003

ID: D-003

Title: CNX remains optional utility

Status: APPROVED

Owner: Anthony Hammon

Risk: HIGH

Affected systems:

- CNX
- economy
- gameplay
- Discord roles
- public messaging

Options:

- CNX required for participation
- CNX optional utility
- CNX power/purchase layer

Recommendation:

CNX optional utility.

Blocking:

None.

Decision:

Approved. CNX may enhance recognition and limited utility later, but must not be required for basic gameplay and must not create pay-to-win mechanics.

Date:

2026-05-12

---

### DECISION D-004

ID: D-004

Title: Zero pay-to-win rule

Status: APPROVED

Owner: Anthony Hammon

Risk: HIGH

Affected systems:

- economy
- CNX
- gameplay
- seasons
- prizes
- NFT eligibility

Options:

- allow paid progression
- allow limited paid shortcuts
- zero pay-to-win

Recommendation:

Zero pay-to-win.

Blocking:

None.

Decision:

Approved. Progress must be earned through gameplay, contribution, participation, and verified activity. CNX cannot buy rank, Stage, XP, prize eligibility, or power.

Date:

2026-05-12

---

### DECISION D-005

ID: D-005

Title: Command Control Dashboard starts as static/read-only

Status: APPROVED

Owner: Anthony Hammon

Risk: HIGH

Affected systems:

- dashboard
- backend
- admin actions
- incident response
- security

Options:

- build full write-control dashboard immediately
- build static/read-only dashboard first
- defer dashboard entirely

Recommendation:

Build static/read-only first.

Blocking:

None.

Decision:

Approved. The Command Control Dashboard may be planned and prototyped, but write controls and emergency controls remain locked until auth, permissions, reason codes, audit logs, confirmation flows, and owner approval exist.

Date:

2026-05-12

---

### DECISION D-006

ID: D-006

Title: Agentic AI remains approval-gated

Status: APPROVED

Owner: Anthony Hammon

Risk: HIGH

Affected systems:

- AI agents
- repo workflow
- production operations
- dashboard
- security

Options:

- fully autonomous AI operator
- approval-gated build assistant
- no AI assistance

Recommendation:

Approval-gated build assistant.

Blocking:

None.

Decision:

Approved. AI agents may assist with docs, audits, planning, code scaffolding, checks, and reports. Agents may not autonomously deploy, merge to main, mutate production, issue XP, issue prizes, run migrations, mutate live roles, or touch treasury/wallet keys.

Date:

2026-05-12

---

## 6. Open Phase Decisions

### DECISION D-007

ID: D-007

Title: When Phase 1 stabilization is complete

Status: OPEN

Owner: Anthony Hammon

Risk: HIGH

Affected systems:

- backend
- bot
- database
- gameplay
- QA

Options:

- declare Phase 1 complete after documentation
- declare Phase 1 complete after repo audit
- declare Phase 1 complete after route/bot/database/gameplay verification

Recommendation:

Declare Phase 1 complete only after repo audit, route audit, bot command audit, Prisma schema audit, security review, and gameplay flow verification.

Blocking:

Phase 2 Contribution XP preparation.

Decision:

OPEN.

Date:

OPEN.

---

### DECISION D-008

ID: D-008

Title: Contribution XP activation timing

Status: DEFERRED

Owner: Anthony Hammon

Risk: HIGH

Affected systems:

- Discord
- Contribution XP
- Discord Rank
- anti-abuse
- database

Options:

- activate immediately
- design during Phase 1 but keep disabled
- wait until Phase 2 approval

Recommendation:

Wait until Phase 2 approval.

Blocking:

Contribution XP service implementation.

Decision:

Deferred. Contribution XP automation remains locked.

Date:

OPEN.

---

### DECISION D-009

ID: D-009

Title: Season and Nexus Score model

Status: DEFERRED

Owner: Anthony Hammon

Risk: HIGH

Affected systems:

- seasons
- Nexus Score
- leaderboard
- prize eligibility
- database

Options:

- build now
- design now, implement later
- defer until Contribution XP exists

Recommendation:

Defer until Phase 3.

Blocking:

Season schema and leaderboard implementation.

Decision:

Deferred. Seasons and Nexus Score automation remain locked.

Date:

OPEN.

---

### DECISION D-010

ID: D-010

Title: CNX wallet verification implementation

Status: DEFERRED

Owner: Anthony Hammon

Risk: CRITICAL

Affected systems:

- CNX
- wallet verification
- Discord holder roles
- dashboard
- security

Options:

- implement production wallet verification now
- design read-only architecture only
- defer until Phase 5

Recommendation:

Defer until Phase 5.

Blocking:

CNX automation, holder roles, tier snapshots, multiplier activation.

Decision:

Deferred. CNX automation remains locked.

Date:

OPEN.

---

### DECISION D-011

ID: D-011

Title: Command Control Dashboard first implementation location

Status: OPEN

Owner: Anthony Hammon

Risk: MEDIUM

Affected systems:

- frontend
- backend
- dashboard
- auth
- admin visibility

Options:

- build inside existing frontend
- build as separate admin app
- build as static prototype first
- build only after repo audit

Recommendation:

Build a static prototype first, then decide whether it belongs inside the existing frontend or a separate admin app.

Blocking:

Dashboard implementation task.

Decision:

OPEN.

Date:

OPEN.

---

### DECISION D-012

ID: D-012

Title: Agent ops repository timing

Status: OPEN

Owner: Anthony Hammon

Risk: MEDIUM

Affected systems:

- AI agents
- GitHub
- tooling
- workflow

Options:

- create citadel-nexus-agent-ops now
- wait until knowledge core is merged
- wait until repo audit is complete

Recommendation:

Wait until the v3 Knowledge Core is merged and the repo audit produces clear agent tasks.

Blocking:

Separate agent orchestration tooling.

Decision:

OPEN.

Date:

OPEN.

---

## 7. Security Decisions

### DECISION D-013

ID: D-013

Title: Production secrets handling

Status: APPROVED

Owner: Anthony Hammon

Risk: CRITICAL

Affected systems:

- backend
- Discord bot
- database
- wallets
- deployment

Options:

- paste secrets into chats
- commit secrets into repo
- use secure environment/platform settings

Recommendation:

Use secure environment/platform settings.

Blocking:

None.

Decision:

Approved. Secrets must not be pasted into chat or committed to the repository. Secrets belong only in secure environment/platform settings.

Date:

2026-05-12

---

### DECISION D-014

ID: D-014

Title: Treasury/private key access for agents

Status: APPROVED

Owner: Anthony Hammon

Risk: CRITICAL

Affected systems:

- treasury
- wallets
- token operations
- AI agents

Options:

- allow agent treasury access
- allow read-only treasury summaries
- block treasury/private key access

Recommendation:

Block treasury/private key access.

Blocking:

None.

Decision:

Approved. AI agents must not receive treasury access, private keys, seed phrases, or signing authority.

Date:

2026-05-12

---

## 8. Build Process Decisions

### DECISION D-015

ID: D-015

Title: Commit strategy for knowledge-core files

Status: APPROVED

Owner: Anthony Hammon

Risk: LOW

Affected systems:

- Git
- docs
- repo workflow

Options:

- commit all files at once
- commit one folder at a time
- commit one file at a time

Recommendation:

Commit one file at a time.

Blocking:

None.

Decision:

Approved. Knowledge-core files are committed one at a time for safety and review clarity.

Date:

2026-05-12

---

### DECISION D-016

ID: D-016

Title: Pull request before merge

Status: OPEN

Owner: Anthony Hammon

Risk: MEDIUM

Affected systems:

- GitHub
- branch workflow
- review process

Options:

- merge directly
- open PR after all docs complete
- open PR now

Recommendation:

Open a PR only after BUILD, SECURITY, and QA docs are complete and a formatting pass is done.

Blocking:

Knowledge-core merge to main.

Decision:

OPEN.

Date:

OPEN.

---

## 9. Rejected Decisions

None currently recorded.

---

## 10. Superseded Decisions

None currently recorded.

---

## 11. Final Open Decisions Directive

Do not invent approvals.

Do not mark a decision approved unless it is clearly approved.

Do not treat placeholder fields as real decisions.

Do not hide open decisions.

Do not move into future phases while blocking decisions remain open.
