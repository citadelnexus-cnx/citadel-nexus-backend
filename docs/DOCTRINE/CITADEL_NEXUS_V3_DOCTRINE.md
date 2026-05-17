# Citadel Nexus v3 Doctrine

## Document Purpose

This document defines the master operating doctrine for Citadel Nexus v3.

It is the internal reference for economy design, progression logic, CNX utility limits, anti-abuse rules, phased rollout, moderation controls, admin safety, dashboard readiness, and agentic AI boundaries.

This file is not public marketing copy.

This file is for the build team, AI agents, technical operators, moderators, and internal governance use.

---

## 1. Master Doctrine

Citadel Nexus is an earned-progress ecosystem.

Progress must come from real participation, gameplay, contribution, verified activity, and long-term consistency.

The ecosystem must never reward spam, loopholes, hidden admin grants, direct purchase of power, or uncapped automation.

The core rule is:

Backend defines truth.
Discord reflects truth.
Frontend surfaces truth.
AI agents assist execution.
Anthony Hammon holds final authority.

---

## 2. System Identity

Citadel Nexus is a governed Discord-native ecosystem built around:

- Citadel Ascension gameplay
- Discord community progression
- backend-controlled member state
- XP and rank progression
- CNX utility recognition
- seasonal Nexus Score
- future Command Control Dashboard
- future MCAOS agentic automation
- future prestige and NFT eligibility systems

Citadel Nexus must be treated as a connected operating ecosystem, not a loose collection of features.

Every major system must have:

- clear ownership
- clear limits
- clear logs
- clear approval gates
- clear failure handling
- clear rollout phase
- clear abuse protections

---

## 3. Non-Negotiable Rules

### 3.1 Zero Pay-to-Win

CNX must never purchase progression.

CNX must not:

- skip Game Rank
- skip Discord Rank
- skip Stage requirements
- skip mission requirements
- skip building requirements
- directly buy XP
- directly buy required gameplay resources
- guarantee prize eligibility
- bypass daily caps
- bypass weekly caps
- bypass abuse checks
- grant moderation authority
- grant admin authority
- unlock required gameplay paths

CNX may provide:

- modest XP multiplier within hard caps
- holder recognition roles
- controlled claim cooldown improvement
- cosmetic access
- beta or feedback access
- advisor-room access
- non-power status benefits

### 3.2 Backend Truth

The backend database is the source of truth for:

- user identity
- XP
- rank
- Stage
- resources
- buildings
- CNX tier state
- access state
- entitlements
- prize eligibility
- moderation locks
- admin actions

Discord reflects backend state.

Frontend displays backend state.

No Discord role, frontend state, or AI agent output may override backend truth.

### 3.3 Progress Must Be Earned

XP and progress must require at least one of:

- time
- cooldown
- resource cost
- gameplay success
- mission risk
- moderator verification
- meaningful contribution
- event participation
- streak consistency
- building/resource planning

Low-effort actions must earn no XP or small capped XP.

### 3.4 Tracks Stay Separate

Game XP controls Game Rank.

Contribution XP controls Discord Rank.

Arcade XP supports seasonal Nexus Score at reduced weight.

CNX modifies eligible earnings but does not control rank.

Nexus Score controls seasonal leaderboard placement only.

These tracks must not be merged.

### 3.5 No Infinite Reward Loops

Every repeatable reward path must include one or more protections:

- cooldown
- daily cap
- weekly cap
- resource cost
- success chance
- verification requirement
- diminishing returns
- hard absolute cap
- account eligibility check
- phase gate

### 3.6 Every Economy Mutation Is Logged

Every meaningful economy change must create an audit record or economy event record.

Logged events include:

- XP gain
- XP loss
- resource gain
- resource spend
- mission outcome
- build upgrade
- rank change
- Stage change
- CNX tier change
- multiplier application
- admin grant
- admin correction
- prize award
- event reward
- moderation lock
- rollback
- recalculation

Admin and founder actions must use `AscensionAdminAction` or the approved admin audit service.

Gameplay and player economy events must use the approved economy audit log or current equivalent until a dedicated `economy_events` table exists.

---

## 4. Core Ecosystem Layers

### 4.1 Permanent Layers

Permanent layers do not reset seasonally.

They include:

- Game XP
- Contribution XP
- Game Rank
- Discord Rank
- Stage
- building levels
- Guardian identity
- verified contribution history
- achievement history
- moderation history

### 4.2 Seasonal Layers

Seasonal layers reset or archive by season.

They include:

- Nexus Score
- seasonal leaderboard
- seasonal titles
- seasonal reward eligibility
- season-specific event overlays

Season history must be archived before reset.

### 4.3 Temporary Event Layers

Event layers are event-scoped.

They include:

- event score
- event submissions
- event participation
- event-specific leaderboard
- event reward eligibility

Event score must not automatically become permanent XP unless a capped conversion rule is approved.

### 4.4 Modifier Layer

CNX is the modifier layer.

It may modify valid earned XP within approved caps.

It must not replace gameplay, contribution, rank, Stage, or eligibility requirements.

---

## 5. XP System Doctrine

### 5.1 Game XP

Game XP is the primary gameplay progression track.

Game XP controls:

- Game Rank
- mission access
- building progression
- Stage gates
- long-term gameplay identity

Expected design:

- Casual player: slow but steady progress
- Regular player: meaningful weekly progress
- Active player: strong progression without breaking caps
- Hardcore player: rewarded for consistency, not loopholes

Game XP must include:

- daily caps
- mission limits
- Power costs
- cooldowns
- failure rules
- diminishing returns
- hard post-modifier cap

### 5.2 Contribution XP

Contribution XP rewards meaningful Discord/community participation.

Contribution XP controls:

- Discord Rank
- community trust
- contribution recognition
- channel access
- event priority signals

Contribution XP must reward quality, not volume.

Required protections:

- 8-word minimum for qualifying messages
- duplicate message rejection
- 90-second cooldown
- daily category caps
- weekly verified-action caps
- moderator verification for high-value actions
- no XP for locked or ineligible accounts

Contribution XP automation remains Phase 2 unless explicitly authorized.

### 5.3 Arcade XP

Arcade XP is companion engagement.

Arcade XP must not replace Game XP.

Arcade XP must:

- be capped daily
- be weighted at 0.5 in Nexus Score
- provide only small capped Game XP bonuses
- include anti-cheat checks
- delay high-value leaderboard rewards when suspicious

Arcade systems remain locked until the Arcade phase is authorized.

### 5.4 Bonus XP

Bonus XP may exist for:

- onboarding milestones
- first claim
- first mission
- first building upgrade
- streaks
- rank promotions
- Stage evolution
- rare drops

Bonus XP must be:

- one-time or capped
- logged
- non-repeatable unless designed as a recurring capped bonus
- included in hard cap logic where applicable

---

## 6. Rank Doctrine

### 6.1 Game Rank

Game Rank is based only on Game XP.

Game Rank cannot be purchased by CNX.

Game Rank cannot be inflated by Discord Rank.

Game Rank cannot be manually changed without audit record and approval.

### 6.2 Discord Rank

Discord Rank is based only on Contribution XP.

Discord Rank cannot be purchased by CNX.

Discord Rank cannot be inflated by Game XP.

Discord Rank must reflect real community contribution.

### 6.3 Stage

Stage represents total Citadel development.

Stage cannot advance from XP alone.

Stage requirements may include:

- Node Score
- building count
- missions completed
- Game XP
- Game Rank gate
- phase authorization

Stage 6 must remain locked until the required later phase is approved.

---

## 7. CNX Utility Doctrine

CNX is optional utility.

A player with zero CNX must still be able to:

- play
- progress
- reach high ranks
- participate in events
- earn recognition
- qualify for non-token rewards
- build their Citadel

CNX may provide:

- modest XP multiplier
- holder status
- cosmetic recognition
- limited cooldown improvement
- early access
- advisor access

CNX must not provide:

- direct XP purchase
- direct rank purchase
- direct Stage purchase
- direct prize guarantee
- exclusive required gameplay path
- uncapped rewards
- admin authority
- moderation authority

Canonical CNX thresholds:

- Signal Holder: 100 CNX
- Node Holder: 500 CNX
- Citadel Holder: 2,000 CNX
- Nexus Holder: 10,000 CNX
- Founder Tier: 50,000 CNX

Canonical CNX multipliers:

- Unranked: 1.00x
- Signal Holder: 1.10x
- Node Holder: 1.15x
- Citadel Holder: 1.20x
- Nexus Holder: 1.25x
- Founder Tier: 1.30x

Multiplier order:

1. Validate action.
2. Calculate base XP.
3. Check action cap.
4. Check category cap.
5. Apply CNX multiplier.
6. Apply absolute hard cap.
7. Write audit/economy log.
8. Update aggregate state.
9. Update seasonal score if applicable.

---

## 8. Nexus Score Doctrine

Nexus Score is seasonal.

Nexus Score measures total seasonal ecosystem participation.

Formula:

Nexus Score = Seasonal Game XP + Seasonal Contribution XP + (Seasonal Arcade XP × 0.5)

Nexus Score must not replace:

- Game Rank
- Discord Rank
- Stage
- permanent XP
- moderation state
- CNX tier

Season reset rules:

- Nexus Score resets.
- Game XP does not reset.
- Contribution XP does not reset.
- Game Rank does not reset.
- Discord Rank does not reset.
- Stage does not reset.
- CNX tier does not reset.
- Season standings are archived.

Seasonal reward eligibility must include abuse checks.

---

## 9. Resource Doctrine

Core resources:

- Credits
- Intel
- Power
- Relics
- Honor

Gameplay resources are not money.

Gameplay resources must not be exchangeable for money.

Gameplay resources must not be exchangeable for CNX.

CNX must not directly buy required gameplay dominance.

Resource faucets must have sinks.

Resource sinks may include:

- building upgrades
- event entries
- cosmetics
- profile banners
- future prestige costs
- community goals

Resource inflation must be monitored.

---

## 10. Anti-Abuse Doctrine

The system must assume users will test limits.

Abuse categories include:

- message spam
- duplicate message farming
- AFK voice farming
- fake invites
- invite churn
- mission loop farming
- XP spike abuse
- arcade score manipulation
- CNX tier hopping
- alt account patterns
- admin grant misuse
- event reward farming

Player trust states:

- Normal
- Watched
- Limited
- Locked
- Banned

Enforcement ladder:

1. Ignore invalid XP event.
2. Soft warning.
3. Temporary XP lock.
4. Leaderboard disqualification.
5. Rank rollback review.
6. Ban or permanent lock.

All enforcement actions must be logged.

---

## 11. Admin and Moderator Doctrine

Moderators verify contribution quality.

Moderators do not own the economy.

Economy admins may review and correct controlled economy issues.

Founder/Master Command has final authority.

All admin/founder actions must be logged.

Admin actions require:

- actor ID
- target ID
- action type
- reason
- before value
- after value
- timestamp
- approval status where applicable

No silent admin power is allowed.

---

## 12. Prize Pool Doctrine

Prize pools are separate from XP and resources.

Prize pools must never be treated as automatic gameplay rewards.

Prize awards require:

- eligibility check
- ledger record
- admin audit record
- human approval
- season or event reference
- reason code

Prize pool logic must remain inactive until authorized.

Token-related rewards require additional review before activation.

---

## 13. Command Control Dashboard Doctrine

The Command Control Dashboard is future operational infrastructure.

It must be built in phases:

Phase A: static prototype
Phase B: read-only live monitor
Phase C: controlled admin actions
Phase D: emergency controls

Dashboard modules should eventually include:

- global system health
- economy health
- player risk queue
- Discord operations
- CNX verification
- season control
- event control
- prize ledger
- admin action ledger
- deployment safety
- MCAOS agent oversight
- incident rail
- emergency controls

Dashboard write controls must not exist until:

- authentication exists
- permissions exist
- audit logs exist
- reason codes exist
- confirmation controls exist
- safe mode logic exists

No decorative emergency buttons.

Every dashboard control must perform a real, logged, permissioned function.

---

## 14. Agentic AI Doctrine

AI agents may assist with:

- audits
- documentation
- code generation
- tests
- issue creation
- PR summaries
- read-only monitoring
- anomaly reports
- implementation plans

AI agents must not autonomously:

- deploy production
- change economy constants
- mutate live Discord roles
- issue XP
- issue rewards
- send token transactions
- access treasury assets
- approve prize payouts
- merge to main
- delete production data
- bypass approval gates

AI agents prepare work.

Humans approve major actions.

---

## 15. Build Phase Doctrine

### Phase 1 — Stabilize Current Build

Allowed:

- Game XP
- Game Rank
- `/claim`
- `/mission`
- `/build`
- `/status`
- resource balances
- basic caps
- audit logs
- Stage 1–3
- manual admin views
- health endpoints
- backend read endpoints

Not allowed:

- automated Contribution XP
- prize payouts
- NFT eligibility
- prestige
- automated CNX utility
- emergency dashboard writes
- AI production write authority

### Phase 2 — Community Layer

Adds:

- Contribution XP
- Discord Rank
- message cooldowns
- duplicate detection
- verified contribution queue
- weekly caps
- moderator verification

### Phase 3 — Seasonal Layer

Adds:

- season lifecycle
- Nexus Score
- leaderboard eligibility
- season archive
- event score isolation

### Phase 4 — Arcade Layer

Adds:

- arcade sessions
- Arcade XP caps
- anti-cheat checks
- weighted score integration

### Phase 5 — CNX Automation

Adds:

- wallet reads
- tier snapshots
- holder role sync
- multiplier automation
- CNX freeze controls

Still forbidden:

- CNX spending
- CNX-to-resource conversion
- pay-to-win boosts

### Phase 6 — Prestige / NFT Eligibility

Adds only after stability:

- Stage 6 activation
- prestige checks
- NFT eligibility checks
- achievement archive
- non-power cosmetic utility

---

## 16. Acceptance Standard

A v3-compliant feature must have:

- clear phase authorization
- centralized service implementation
- cap/cooldown enforcement
- audit logging
- permission checks where needed
- no pay-to-win behavior
- no secret exposure
- no direct production mutation without approval
- test or test plan
- documented risk level
- clear rollback or reconciliation path

A feature is not complete if:

- it bypasses service boundaries
- it hard-codes economy values
- it creates uncapped rewards
- it weakens admin auditability
- it changes CNX utility without approval
- it changes Discord role behavior without approval
- it activates future-phase systems early

---

## 17. Final Doctrine

Citadel Nexus must be built slowly, safely, and correctly.

The goal is not maximum feature speed.

The goal is a stable, fair, earned-progress ecosystem that can scale without confusion, exploitation, or economy collapse.

Protect the economy.

Protect the community.

Protect the codebase.

Protect the IP.

Preserve auditability.

Preserve human command authority.
