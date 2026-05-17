# Citadel Nexus CNX Utility Rules

## Document Purpose

This document defines the official internal rules for CNX utility inside Citadel Nexus.

It explains what CNX may do, what CNX must never do, how CNX tiers work, how CNX modifiers apply, how wallet verification should be phased, and how CNX must remain separated from pay-to-win mechanics.

This file is not public marketing copy.

This file supports:

- backend CNX tier logic
- Discord holder role design
- future wallet verification
- future dashboard monitoring
- economy balancing
- compliance-safe token utility boundaries
- AI agent implementation limits

`AGENTS.md` remains the controlling operating law.

`CITADEL_NEXUS_V3_DOCTRINE.md` remains the master doctrine.

`ECONOMY_AND_XP_RULES.md` defines how CNX interacts with XP and caps.

---

## 1. Master CNX Doctrine

CNX is an optional utility and recognition layer.

CNX must enhance the Citadel Nexus experience without replacing effort, contribution, gameplay, or progression requirements.

CNX must never become a pay-to-win system.

The player with zero CNX must still be able to:

- join the ecosystem
- play Citadel Ascension
- earn Game XP
- earn Contribution XP
- earn Discord Rank
- earn Game Rank
- progress through allowed Stages
- participate in standard events
- build a Citadel
- become a respected member
- qualify for non-token rewards where eligible

CNX may improve convenience, recognition, access priority, and cosmetic identity.

CNX must not purchase achievement.

---

## 2. CNX Non-Negotiable Rules

CNX must not:

- directly buy Game XP
- directly buy Contribution XP
- directly buy Arcade XP
- directly buy Game Rank
- directly buy Discord Rank
- directly buy Stage progression
- directly buy building upgrades
- directly buy mission completion
- directly buy leaderboard placement
- directly buy prize eligibility
- guarantee prize awards
- bypass daily caps
- bypass weekly caps
- bypass hard XP caps
- bypass account eligibility checks
- bypass abuse checks
- bypass moderation locks
- grant admin authority
- grant moderator authority
- unlock required gameplay paths
- create exclusive high-power missions
- create uncapped rewards
- create guaranteed rare drops
- create wallet-based dominance

CNX may:

- provide modest XP multipliers within hard caps
- provide holder recognition roles
- provide cosmetic/status recognition
- provide limited claim cooldown improvement
- provide early access to non-power features
- provide beta feedback access
- provide advisor-room access
- provide priority support or priority review
- provide non-power event access priority
- provide future profile badges
- provide non-transferable recognition records where appropriate

---

## 3. CNX Tier Table

| Tier | CNX Required | XP Multiplier | Claim Cooldown | Status |
|---|---:|---:|---:|---|
| Unranked | 0 | 1.00x | 8h | Default |
| Signal Holder | 100 | 1.10x | 8h | Entry holder |
| Node Holder | 500 | 1.15x | 7h | Support holder |
| Citadel Holder | 2,000 | 1.20x | 6h | Advanced holder |
| Nexus Holder | 10,000 | 1.25x | 5h | High holder |
| Founder Tier | 50,000 | 1.30x | 5h | Top recognition |

These values are canonical for v3.

Do not replace these values with older or alternate values without explicit approval.

---

## 4. CNX Multiplier Rules

## 4.1 Multiplier Purpose

The CNX multiplier exists to recognize support and participation without replacing core effort.

The multiplier should feel meaningful but not dominant.

## 4.2 Multiplier Limits

| Rule | Requirement |
|---|---|
| Minimum multiplier | 1.00x |
| Maximum multiplier | 1.30x |
| Applies before hard cap | Yes |
| Can bypass hard cap | No |
| Can apply to invalid actions | No |
| Can apply to future-phase locked actions | No |
| Can apply to admin grants | No unless explicitly approved |
| Can apply to prize rewards | No |
| Can apply to non-XP resources | No unless approved in later phase |

## 4.3 Required Multiplier Order

The multiplier application order is locked:

1. Validate user.
2. Validate action.
3. Validate current phase.
4. Validate cooldown.
5. Validate resource cost.
6. Validate cap eligibility.
7. Calculate base XP.
8. Apply action/category limits.
9. Apply CNX multiplier.
10. Apply absolute hard cap.
11. Write economy/audit log.
12. Update aggregate state.
13. Update seasonal Nexus Score if applicable.
14. Return result.

CNX multiplier must never be applied before validation.

CNX multiplier must never be applied after the hard cap in a way that exceeds the hard cap.

## 4.4 Game XP Hard Cap Interaction

Game XP hard caps:

| Cap | Value |
|---|---:|
| Pre-multiplier Game XP cap | 375/day |
| Post-multiplier absolute Game XP cap | 475/day |

CNX can help a user reach the post-multiplier cap faster.

CNX cannot exceed the post-multiplier cap.

## 4.5 Contribution XP Interaction

Contribution XP automation is Phase 2.

CNX multiplier behavior for Contribution XP should remain disabled until Contribution XP is active and tested.

If enabled later, CNX multiplier must not bypass:

- message caps
- verified action caps
- weekly caps
- moderation locks
- duplicate checks
- cooldown checks
- total Contribution XP daily cap

## 4.6 Arcade XP Interaction

Arcade XP is Phase 4.

CNX must not allow Arcade XP to dominate Nexus Score.

Arcade XP remains weighted at 0.5 in Nexus Score regardless of CNX status.

---

## 5. Claim Cooldown Rules

## 5.1 Cooldown Table

| Tier | Claim Cooldown |
|---|---:|
| Unranked | 8h |
| Signal Holder | 8h |
| Node Holder | 7h |
| Citadel Holder | 6h |
| Nexus Holder | 5h |
| Founder Tier | 5h |

## 5.2 Cooldown Boundaries

CNX cooldown reduction must not:

- reduce cooldown below 5 hours
- remove cooldown entirely
- stack with unapproved event reductions
- bypass account locks
- bypass current phase rules
- create unlimited claim loops

Cooldown changes must be logged or derivable from tier snapshot records.

---

## 6. CNX Phase Rules

## 6.1 Phase 1 — Current State

CNX utility should remain mostly read-only or manually verified.

Allowed:

- documentation
- static holder logic design
- backend service scaffolding with disabled execution
- read-only token route review
- safe tier constants
- dashboard mock/read-only planning

Not allowed:

- automated wallet reads
- automated multiplier activation
- automated holder role sync expansion
- token spending
- CNX-to-resource conversion
- prize eligibility based on CNX
- production role mutation beyond current approved logic

## 6.2 Phase 2 — Community Layer

CNX remains optional.

No new CNX power should be added in Phase 2 unless specifically approved.

Focus remains Contribution XP and Discord Rank safety.

## 6.3 Phase 3 — Seasonal Layer

CNX may be shown in seasonal profile metadata.

CNX must not directly decide leaderboard winners.

CNX must not guarantee seasonal rewards.

CNX may be used for optional non-power recognition.

## 6.4 Phase 4 — Arcade Layer

CNX must not allow Arcade XP dominance.

CNX must not create special arcade score multipliers unless separately approved.

## 6.5 Phase 5 — CNX Automation

Allowed only after approval:

- automated wallet reads
- CNX tier snapshots
- holder role sync automation
- multiplier automation
- tier grace periods
- CNX freeze controls
- dashboard read-only CNX monitor

Still forbidden:

- CNX spending
- CNX-to-resource conversion
- CNX-to-prize guarantee
- purchasable Power
- purchasable XP
- pay-to-win boosts

## 6.6 Phase 6 — Prestige / NFT Eligibility

CNX may contribute to identity, proof, cosmetics, or recognition.

CNX must not replace earned eligibility.

NFT or prestige eligibility must be based primarily on earned progress, not token balance.

---

## 7. Wallet Verification Rules

## 7.1 Phase 1 Verification

Phase 1 should use manual or controlled verification only.

Rules:

- no required wallet connection for basic gameplay
- no automated production wallet reads unless approved
- no exchange-held tokens counted unless policy changes
- no direct token spending
- no wallet signature requirements for standard play
- no treasury access
- no private key handling

## 7.2 Phase 5 Verification

When authorized, automated wallet verification may include:

- user-submitted wallet address
- read-only balance check
- CNX tier calculation
- snapshot record
- Discord holder role sync
- 48-hour grace logic
- audit log for tier changes

## 7.3 Wallet Verification Must Never

Wallet verification must never:

- request seed phrases
- request private keys
- custody user funds
- execute token transfers
- execute mainnet actions without approval
- require wallet for basic gameplay
- expose wallet data unnecessarily
- silently assign power benefits without logs

---

## 8. CNX Tier Snapshot Rules

CNX tier state should be stored as snapshots once automation is active.

A tier snapshot should record:

- user ID
- wallet address
- observed CNX balance
- calculated tier
- multiplier
- cooldown value
- verification timestamp
- verification source
- previous tier
- new tier
- grace period status
- failure reason if failed
- audit metadata

Snapshots should support:

- historical review
- role reconciliation
- multiplier validation
- dashboard monitoring
- dispute resolution

---

## 9. Discord Holder Role Rules

Discord holder roles must reflect backend CNX tier truth.

Discord roles must not define CNX truth.

Role sync must be:

- backend-driven
- idempotent
- logged
- reversible
- dry-run capable where possible
- protected by approval gates
- monitored by audit records

Live Discord role mutation requires approval unless already part of an approved production workflow.

CNX holder roles must not grant moderation/admin permissions.

---

## 10. CNX and Prize Pool Rules

CNX must not guarantee prize pool access.

CNX must not guarantee prize pool payout.

Prize eligibility must include:

- account age
- activity requirements
- no active moderation lock
- no unresolved abuse flag
- season/event eligibility
- ledger record
- human approval

CNX may be used for optional non-power recognition categories only after review.

Token-related rewards require additional compliance and treasury review.

---

## 11. CNX and Resources

CNX must not directly purchase required gameplay resources in early phases.

Forbidden unless explicitly approved in a later phase:

- CNX-to-Credits conversion
- CNX-to-Intel conversion
- CNX-to-Power conversion
- CNX-to-Relics conversion
- CNX-to-Honor conversion
- CNX-based Power refills
- CNX-based building cost reductions
- CNX-based mission skip

Any future resource-related CNX utility must be:

- non-pay-to-win
- capped
- logged
- phase-gated
- reviewed
- optional
- reversible or correctable

---

## 12. CNX and Public Messaging

Public messaging must not describe CNX as:

- an investment
- a yield product
- guaranteed earnings
- guaranteed prize access
- guaranteed appreciation
- required for participation
- required for success
- a way to buy rank
- a way to buy power

Public messaging may describe CNX as:

- an optional utility layer
- a support/recognition token
- a holder recognition mechanism
- a future-compatible ecosystem utility
- a non-required enhancement layer

All public CNX wording requires careful review before publication.

---

## 13. CNX Dashboard Monitoring

The future Command Control Dashboard should eventually show:

- CNX verification health
- tier distribution
- failed wallet reads
- stale snapshots
- grace period users
- role sync status
- multiplier impact
- suspicious tier hopping
- CNX-related incidents
- CNX freeze state

Dashboard CNX controls should eventually include:

- freeze CNX tier updates
- disable future CNX multiplier application
- force snapshot refresh
- export CNX verification report
- review tier discrepancy
- dry-run role reconciliation

Dashboard CNX write controls must remain disabled until authentication, permissions, logging, and confirmation systems exist.

---

## 14. CNX Emergency Controls

Future emergency controls may include:

## 14.1 CNX Verification Freeze

Effect:

- stop new tier updates
- preserve existing snapshots
- block automated tier changes
- keep gameplay available
- log freeze reason

## 14.2 Disable CNX Multipliers

Effect:

- future XP calculations use 1.00x temporarily
- historical logs remain unchanged
- holder roles are not automatically removed
- investigation can proceed safely

## 14.3 Holder Role Sync Pause

Effect:

- stop Discord holder role mutation
- preserve backend tier truth
- allow dry-run reconciliation

All emergency controls require:

- permission check
- reason code
- audit log
- incident record
- owner or authorized operator approval

---

## 15. CNX Abuse Signals

The system should monitor:

- rapid tier changes
- repeated wallet verification failures
- wallet hopping
- suspicious role sync errors
- multiplier over-application
- tier/state mismatch
- attempts to use CNX during locked phase
- attempts to access future-phase CNX functionality
- inconsistent snapshot data

Abuse flags must not automatically punish users without review unless the action is clearly invalid and low-risk to block.

---

## 16. CNX Implementation Requirements

Any CNX implementation must:

- use constants for tier values
- check current phase
- perform read-only validation before writes
- avoid secret exposure
- avoid private key handling
- avoid treasury access
- write audit records
- support dry-run where role mutation is involved
- fail safely when wallet reads fail
- never block non-CNX gameplay
- never exceed XP hard caps
- never create pay-to-win mechanics

---

## 17. CNX QA Requirements

CNX QA must test:

- zero CNX returns Unranked
- 100 CNX returns Signal Holder
- 500 CNX returns Node Holder
- 2,000 CNX returns Citadel Holder
- 10,000 CNX returns Nexus Holder
- 50,000 CNX returns Founder Tier
- multiplier applies after validation
- multiplier does not bypass hard cap
- cooldown floor remains 5 hours
- locked accounts do not gain benefits
- failed wallet reads fail safely
- tier change writes audit/snapshot
- role sync can be dry-run
- CNX cannot activate locked features early

---

## 18. Final CNX Directive

CNX should enhance the journey, not replace the journey.

CNX should recognize support, not purchase power.

CNX should be useful, but never mandatory.

No player should need CNX to matter.

No holder should be able to break the economy.
