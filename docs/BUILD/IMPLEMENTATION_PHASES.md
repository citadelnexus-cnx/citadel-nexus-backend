# Citadel Nexus Implementation Phases

## Document Purpose

This document defines the official internal implementation phases for Citadel Nexus after the v3 Knowledge Core bootstrap.

It explains what may be built in each phase, what must remain locked, what dependencies must be complete first, and what acceptance criteria must be met before moving forward.

This file is not public marketing copy.

AGENTS.md remains the controlling operating law.

CITADEL_NEXUS_V3_DOCTRINE.md remains the master doctrine.

MASTER_BACKLOG.md defines the broader backlog.

CURRENT_BUILD_STATUS.md records the current verified build state.

---

## 1. Master Phase Doctrine

Citadel Nexus must be built in controlled phases.

Each phase must stabilize before the next phase activates.

Future systems must not be activated early.

Documentation may describe future systems, but implementation must remain locked until dependencies and approvals are complete.

Core rule:

Backend defines truth.
Discord reflects truth.
Frontend surfaces truth.
AI agents assist execution.
Anthony Hammon holds final authority.

---

## 2. Phase Overview

| Phase | Name | Status |
|---|---|---|
| Phase 0 | Knowledge Core Bootstrap | Active current branch |
| Phase 1 | Stabilize Current Build | Current product phase |
| Phase 2 | Community Contribution Layer | Locked |
| Phase 3 | Seasons and Nexus Score | Locked |
| Phase 4 | Arcade Layer | Locked |
| Phase 5 | CNX Automation | Locked |
| Phase 6 | Prestige / NFT Eligibility | Locked |
| Phase 7 | Command Control Operations | Future controlled expansion |
| Phase 8 | MCAOS Agentic Operations | Future controlled expansion |

---

## 3. Phase 0 — Knowledge Core Bootstrap

Status:

IN PROGRESS.

Purpose:

Create the internal source-of-truth documentation required to safely continue development.

Allowed work:

- AGENTS.md
- CLAUDE.md
- doctrine docs
- architecture docs
- build docs
- security docs
- QA docs
- markdown cleanup
- documentation-only verification
- branch push
- PR preparation

Forbidden work:

- app logic changes
- schema migrations
- production deployment
- Discord role mutation
- economy value changes
- CNX automation
- prize execution
- dashboard write controls

Exit criteria:

- AGENTS.md exists
- CLAUDE.md exists
- DOCTRINE docs complete
- ARCHITECTURE docs complete
- BUILD docs complete
- SECURITY docs complete
- QA docs complete
- documentation formatting reviewed
- branch pushed
- PR prepared
- owner review requested

Risk:

LOW.

---

## 4. Phase 1 — Stabilize Current Build

Status:

CURRENT PRODUCT PHASE.

Purpose:

Stabilize the existing backend, Discord bot, frontend, database, and Phase 1 Ascension gameplay before new systems are added.

Allowed work:

- bug fixes
- health endpoint verification
- database connectivity checks
- service boundary cleanup
- safe refactors
- current command verification
- current route verification
- current Ascension profile flow verification
- claim flow verification
- mission flow verification
- build flow verification
- status flow verification
- admin command review
- audit logging improvements
- read-only summaries
- documentation alignment
- non-production tests
- QA checklists
- repo audit

Allowed gameplay scope:

- start/onboarding
- claim
- mission
- build
- status
- profile state
- basic resources
- basic buildings
- admin visibility
- audit records
- locked profile behavior

Forbidden work:

- automated Contribution XP
- automated Discord Rank
- seasons
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
- production AI write authority

Exit criteria:

- repo audit completed
- current route audit completed
- current bot command audit completed
- Prisma schema audit completed
- secrets/security review completed
- claim flow verified or gaps documented
- mission flow verified or gaps documented
- build flow verified or gaps documented
- status flow verified or gaps documented
- admin commands reviewed
- high-risk gaps entered into backlog
- owner approves move to Phase 2 preparation

Risk:

MEDIUM.

---

## 5. Phase 2 — Community Contribution Layer

Status:

LOCKED.

Purpose:

Add contribution-based community progression after Phase 1 is stable.

Primary systems:

- Contribution XP
- Discord Rank
- quality message tracking
- verified contribution queue
- moderator verification
- daily contribution caps
- weekly verified caps
- duplicate detection
- anti-spam controls
- contribution audit events

Allowed only after Phase 1 exit approval:

- Contribution XP service proposal
- Discord Rank threshold proposal
- message qualification logic
- verified action workflow
- moderator review tools
- read-only contribution summaries
- anti-abuse flag proposal

Forbidden until explicitly approved:

- live message XP automation
- voice XP automation
- invite XP automation
- automatic Discord Rank role mutation
- public leaderboard rewards
- uncapped contribution rewards
- CNX multiplier on Contribution XP

Exit criteria:

- contribution service designed
- contribution caps implemented and tested
- duplicate/spam checks implemented and tested
- verified action queue tested
- moderator verification works
- Contribution XP does not affect Game Rank
- Discord Rank does not affect Game Rank
- abuse protections documented
- owner approves Phase 3 preparation

Risk:

HIGH.

---

## 6. Phase 3 — Seasons and Nexus Score

Status:

LOCKED.

Purpose:

Add seasonal scoring and leaderboard structures without disrupting permanent progression.

Primary systems:

- seasons
- Nexus Score
- seasonal leaderboard
- seasonal archive
- eligibility checks
- leaderboard freeze
- event score isolation
- seasonal reports

Nexus Score formula:

Nexus Score = Seasonal Game XP + Seasonal Contribution XP + (Seasonal Arcade XP × 0.5)

Allowed only after Phase 2 stabilization:

- season model proposal
- Nexus Score read-only calculation
- leaderboard read endpoint
- season archive proposal
- leaderboard eligibility checks
- dashboard read-only season cards

Forbidden until explicitly approved:

- automatic season reset
- live prize-linked leaderboard rewards
- unreviewed final leaderboard rewards
- event reward automation
- CNX-based prize advantage
- Arcade XP dominance

Exit criteria:

- season state designed
- score formula implemented safely
- permanent XP does not reset
- season archive works
- leaderboard eligibility works
- flagged users can be held from rewards
- owner approves Phase 4 preparation

Risk:

HIGH.

---

## 7. Phase 4 — Arcade Layer

Status:

LOCKED.

Purpose:

Add arcade engagement as a companion layer without letting arcade activity dominate the main ecosystem.

Primary systems:

- arcade session tracking
- Arcade XP
- arcade daily caps
- score validation
- anti-cheat checks
- weighted Nexus Score integration
- delayed leaderboard review

Allowed only after Phase 3 stabilization:

- arcade model proposal
- arcade session logging proposal
- arcade XP cap service
- arcade anti-cheat plan
- read-only arcade leaderboard
- weighted Nexus Score integration test

Forbidden until explicitly approved:

- live arcade prize rewards
- uncapped arcade Game XP bonuses
- arcade score-driven prize auto-awards
- external game integration without security review
- CNX arcade dominance boosts

Exit criteria:

- Arcade XP capped
- Arcade XP weighted at 0.5 in Nexus Score
- suspicious scores can be flagged
- high-value results can be delayed for review
- arcade cannot dominate Game XP or seasonal score
- owner approves Phase 5 preparation

Risk:

HIGH.

---

## 8. Phase 5 — CNX Automation

Status:

LOCKED.

Purpose:

Activate controlled read-only CNX utility automation after core gameplay, community, and season systems are stable.

Primary systems:

- wallet read-only verification
- CNX tier snapshots
- CNX holder roles
- controlled XP multiplier
- claim cooldown modifier
- CNX dashboard monitor
- CNX freeze controls

Allowed only after Phase 4 stabilization and explicit owner approval:

- CNX constants file
- read-only wallet verification
- tier snapshot model proposal
- holder role dry-run
- multiplier service with hard cap enforcement
- stale snapshot handling
- grace period logic
- CNX verification dashboard read-only panel

Still forbidden:

- CNX spending
- CNX-to-resource conversion
- CNX-to-prize guarantee
- token transfer execution
- treasury access
- private key handling
- seed phrase handling
- pay-to-win utility
- CNX rank purchase
- CNX Stage purchase

Exit criteria:

- CNX verification is read-only
- no private keys stored
- CNX tiers calculated correctly
- multipliers cannot bypass hard caps
- holder roles reflect backend truth
- freeze controls designed and approved
- no gameplay path requires CNX
- owner approves Phase 6 preparation

Risk:

HIGH / CRITICAL depending on wallet scope.

---

## 9. Phase 6 — Prestige / NFT Eligibility

Status:

LOCKED.

Purpose:

Add long-term identity, prestige, and future NFT eligibility rules without creating pay-to-win mechanics.

Primary systems:

- prestige eligibility
- Stage 6 activation
- achievement archive
- non-power cosmetics
- NFT eligibility checks
- public eligibility display
- future mint-readiness documentation

Allowed only after Phase 5 stabilization and explicit owner approval:

- prestige rule proposal
- non-power achievement archive
- Stage 6 activation proposal
- NFT eligibility read-only check
- cosmetic utility proposal
- public-safe NFT wording

Forbidden until explicitly approved:

- NFT minting
- token-gated power
- automatic mint authority
- paid rank advantage
- NFT prize guarantee
- financial return claims
- unreviewed token marketing

Exit criteria:

- prestige cannot be purchased
- NFT eligibility is earned-first
- CNX/NFT utility remains non-power or carefully capped
- public messaging reviewed
- owner approves any mint-related action separately

Risk:

HIGH / CRITICAL.

---

## 10. Phase 7 — Command Control Operations

Status:

FUTURE / PARTIALLY PLANNED.

Purpose:

Build the Command Control Master Dashboard as an operational monitoring and control interface.

Phase 7A:

Static prototype.

Allowed:

- UI prototype
- mock data
- disabled controls
- dashboard layout
- monitor wall concept
- incident rail design

Phase 7B:

Read-only live monitor.

Allowed:

- health status
- economy summary
- Discord status
- CNX status
- season status
- admin audit reads
- incident reads

Phase 7C:

Controlled admin actions.

Allowed only after auth, permissions, audit logs, reason codes, and approval:

- open incident
- export report
- mark reviewed
- clear false positive
- run dry-run
- pause approved non-critical module

Phase 7D:

Emergency controls.

Allowed only after explicit approval:

- safe mode
- economy lockdown
- leaderboard freeze
- prize freeze
- CNX verification freeze
- Discord mutation stop

Forbidden before Phase 7C/7D approval:

- real emergency buttons
- production write controls
- direct XP edits
- direct role mutation
- direct prize action
- direct deployment controls

Risk:

LOW for prototype.
HIGH/CRITICAL for write controls.

---

## 11. Phase 8 — MCAOS Agentic Operations

Status:

FUTURE / LOCKED.

Purpose:

Allow controlled AI-assisted operations after the system has strong documentation, auditability, dashboard visibility, and human approval controls.

Allowed early:

- repo audits
- issue creation
- PR summaries
- read-only monitoring
- anomaly reports
- test plans
- safe scaffolding on branches

Allowed later only with approval:

- controlled task execution
- read-only dashboard monitoring
- draft incident reports
- draft PRs
- dry-run operations

Forbidden:

- autonomous production deployment
- autonomous merge to main
- autonomous role mutation
- autonomous XP issuance
- autonomous prize issuance
- autonomous token actions
- autonomous migrations
- treasury access
- bypassing Anthony Hammon approval

Exit criteria:

No full autonomous operations are currently planned as an exit goal.

Agentic systems must remain human-commanded.

Risk:

HIGH.

---

## 12. Phase Advancement Rules

A phase may advance only when:

- prior phase exit criteria are complete
- open critical issues are resolved or accepted
- owner approves advancement
- required docs are updated
- tests/checks are complete or gaps documented
- security risks are reviewed
- rollback or recovery plan exists where applicable

A phase must not advance because:

- a feature is exciting
- an AI agent recommends it
- public pressure exists
- CNX holders request it
- a dashboard mockup exists
- code was partially scaffolded
- future docs describe it

Documentation does not equal authorization.

---

## 13. Phase Regression Rules

A phase may move backward if:

- economy abuse is detected
- role sync breaks
- database risk appears
- production instability occurs
- Discord bot breaks core commands
- CNX verification becomes unsafe
- leaderboard integrity is compromised
- security issue appears

Regression actions may include:

- pause module
- freeze leaderboard
- disable multiplier
- stop role sync
- revert deployment
- rollback feature flag
- open incident
- return to previous phase

Regression is not failure.

Regression is safety.

---

## 14. Cross-Phase Locked Systems

These systems remain locked until specifically approved:

- automated Contribution XP
- Discord Rank automation
- seasons
- Nexus Score automation
- arcade rewards
- CNX automation
- CNX spending
- wallet verification automation
- prize payouts
- prestige
- NFT eligibility
- dashboard write controls
- emergency controls
- production AI write authority
- schema migrations
- treasury interactions

---

## 15. Final Phase Directive

Do not skip phases.

Do not merge phase boundaries.

Do not activate future systems early.

Build the foundation first.

Stabilize what exists.

Audit before expansion.

Test before activation.

Protect the economy.

Protect the community.

Protect backend truth.

