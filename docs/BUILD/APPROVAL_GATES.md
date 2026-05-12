# Citadel Nexus Approval Gates

## Document Purpose

This document defines the official approval gates for Citadel Nexus development.

It explains which actions require explicit approval, which actions are forbidden without approval, when AI agents must stop, and how high-risk decisions must be routed.

This file is not public marketing copy.

AGENTS.md remains the controlling operating law.

CITADEL_NEXUS_V3_DOCTRINE.md remains the master doctrine.

IMPLEMENTATION_PHASES.md defines phase boundaries.

MASTER_BACKLOG.md defines backlog order.

---

## 1. Master Approval Rule

Anthony Hammon holds final authority for Citadel Nexus.

All major decisions route through him.

All irreversible or high-risk actions require explicit approval.

Silence is not approval.

Assumption is not approval.

Future documentation is not approval.

A prototype is not approval.

A partial implementation is not approval.

---

## 2. Approval Categories

| Category | Approval Required |
|---|---|
| Documentation-only | Usually no, unless doctrine changes meaning |
| Formatting cleanup | Usually no, if meaning does not change |
| Read-only audit | Usually no |
| Read-only endpoint proposal | Yes before implementation |
| App logic change | Yes if behavior changes |
| Economy logic change | Always |
| Database/schema change | Always |
| Discord role mutation change | Always |
| CNX utility change | Always |
| Prize/reward logic | Always |
| Wallet/treasury logic | Always |
| Dashboard write control | Always |
| Production deployment | Always |
| Public announcement | Always |

---

## 3. Low-Risk Work

Low-risk work usually includes:

- documentation creation
- documentation cleanup
- typo fixes
- markdown formatting
- repo audit reports
- gap analysis
- implementation plans
- test plans
- issue drafts
- PR summaries

Low-risk work must still avoid:

- changing doctrine meaning silently
- exposing secrets
- claiming unverified facts
- deleting important files
- merging to main without approval

---

## 4. Medium-Risk Work

Medium-risk work includes:

- frontend UI changes
- read-only API endpoint scaffolding
- non-critical refactors
- test additions
- logging improvements
- read-only dashboard prototype
- user-facing copy changes
- bot response wording changes

Medium-risk work requires approval when it affects:

- user behavior
- public messaging
- backend responses
- Discord bot behavior
- role visibility
- member profile display
- production deployment path

---

## 5. High-Risk Work

High-risk work always requires approval.

High-risk work includes:

- economy constants
- XP formulas
- mission rewards
- claim cooldowns
- building costs
- resource rewards
- Game Rank thresholds
- Discord Rank thresholds
- Stage thresholds
- Contribution XP logic
- Arcade XP logic
- Nexus Score logic
- Discord role sync
- admin commands
- auth and permissions
- database schema
- migrations
- CNX verification
- CNX multipliers
- dashboard write controls
- prize pool logic
- production deployment

---

## 6. Critical-Risk Work

Critical-risk work requires explicit approval and a written plan.

Critical-risk work includes:

- token transfers
- treasury access
- private key handling
- wallet custody
- production database destructive actions
- prize payout execution
- emergency lockdown controls
- safe mode controls
- production role mutation expansion
- production migrations
- production secret rotation
- NFT minting
- automated agent production write authority

Critical-risk work must include:

- purpose
- exact action
- affected systems
- rollback plan
- audit plan
- test plan
- owner approval
- execution window if production
- post-action verification plan

---

## 7. AI Agent Stop Conditions

AI agents must stop and request approval before:

- changing XP values
- changing rank thresholds
- changing Stage thresholds
- changing resource values
- changing mission outcomes
- changing claim cooldowns
- changing CNX tier thresholds
- changing CNX multipliers
- changing Discord role IDs
- changing role sync behavior
- adding admin permissions
- changing auth
- adding Prisma models
- changing Prisma fields
- creating migrations
- running migrations
- changing production env behavior
- adding dashboard write endpoints
- adding emergency controls
- adding prize logic
- adding wallet verification logic
- touching token transfer logic
- touching treasury logic
- deleting files
- deleting data
- merging to main
- deploying production
- posting public announcements

When uncertain, stop and ask.

---

## 8. Doctrine Change Gates

Doctrine docs may be updated, but changing doctrine meaning requires approval.

Approval required before changing:

- zero pay-to-win rules
- backend truth hierarchy
- CNX optional utility rule
- phase boundaries
- economy caps
- rank thresholds
- Stage requirements
- Contribution XP limits
- Arcade XP weighting
- Nexus Score formula
- anti-abuse enforcement ladder
- dashboard emergency control rules
- agent authority rules
- wallet/treasury boundaries

Documentation cleanup that preserves meaning is allowed.

---

## 9. Economy Approval Gates

Economy changes always require approval.

Economy areas include:

- Game XP
- Contribution XP
- Arcade XP
- Nexus Score
- Credits
- Intel
- Power
- Relics
- Honor
- mission rewards
- mission costs
- building costs
- building rewards
- rank thresholds
- Stage thresholds
- daily caps
- weekly caps
- cooldowns
- multipliers
- prize eligibility
- event score conversion

Economy work must include:

- current value
- proposed value
- reason
- abuse risk
- player impact
- test plan
- rollback plan

---

## 10. CNX Approval Gates

CNX changes always require approval.

Approval required before:

- changing CNX tier thresholds
- changing multiplier values
- changing claim cooldown benefits
- enabling wallet verification
- enabling holder role sync
- enabling CNX multiplier automation
- creating CNX snapshot tables
- adding CNX dashboard controls
- using CNX for event eligibility
- using CNX for rewards
- changing public CNX wording
- adding token transfer logic

Forbidden without separate explicit approval:

- CNX spending
- CNX-to-resource conversion
- CNX-to-prize guarantee
- private key handling
- treasury interaction
- seed phrase request
- wallet custody
- pay-to-win utility

---

## 11. Discord Approval Gates

Discord-related changes require approval when they affect live behavior.

Approval required before:

- changing slash commands
- registering commands in production
- deploying bot changes
- changing admin commands
- changing command permissions
- changing role IDs
- changing role sync logic
- changing holder role behavior
- changing moderation role behavior
- mutating live roles
- adding Contribution XP message tracking
- adding invite tracking
- adding voice XP tracking

Low-risk wording changes may still require review if public-facing.

---

## 12. Database Approval Gates

Database changes always require approval.

Approval required before:

- editing prisma/schema.prisma
- creating a migration
- running a migration
- adding a model
- deleting a model
- renaming a model
- changing field types
- changing defaults
- changing relations
- changing indexes
- changing unique constraints
- adding cascade behavior
- deleting production data
- running destructive SQL

Database work must include:

- reason
- affected models
- migration plan
- rollback/recovery plan
- test plan
- owner approval

---

## 13. Dashboard Approval Gates

Dashboard work must advance in phases.

Allowed without high-risk approval:

- static prototype
- mock monitor wall
- disabled controls
- read-only UI planning
- dashboard documentation

Approval required before:

- connecting live read endpoints
- adding admin-only routes
- adding dashboard auth
- adding incident write controls
- adding player flag controls
- adding module pause controls
- adding CNX freeze controls
- adding economy freeze controls
- adding emergency controls

Forbidden until explicitly approved:

- real emergency buttons
- production write controls
- direct XP edits
- direct role mutation
- direct prize payout
- direct deployment control

---

## 14. Security Approval Gates

Security-sensitive work requires approval.

Approval required before:

- changing auth
- changing permissions
- changing admin role logic
- changing CORS behavior
- changing production env values
- rotating production secrets
- exposing new admin endpoints
- adding wallet verification
- changing token logic
- changing deployment config
- changing server/firewall/Nginx/PM2 behavior

AI agents must not request secrets in chat.

Secrets must be handled through secure environment/platform settings.

---

## 15. Production Approval Gates

Production work always requires approval.

Approval required before:

- production deploy
- production bot restart
- production migration
- production env change
- production role sync change
- production database write
- production rollback
- production incident announcement
- production emergency mode

Production work must include:

- exact command or platform action
- reason
- affected system
- risk
- backup/recovery state
- rollback plan
- verification steps
- owner approval

---

## 16. Public Messaging Approval Gates

Public-facing messages require approval when they involve:

- CNX
- rewards
- token utility
- roadmap dates
- live/not-live systems
- prize language
- NFT eligibility
- public launch claims
- Discord announcements
- website claims
- investor/compliance-sensitive wording

Public messages must not claim:

- guaranteed rewards
- investment returns
- guaranteed appreciation
- required CNX purchase
- pay-to-win mechanics
- systems are live when they are not live

---

## 17. Approval Record Format

When approval is needed, record:

APPROVAL REQUEST

Action:
Reason:
Risk level:
Affected files:
Affected systems:
Phase:
What changes:
What does not change:
Tests/checks:
Rollback plan:
Approval needed from:
Decision:
Date:

Do not proceed until decision is clear.

---

## 18. Open Decision Format

If a decision is not approved yet, record it in:

docs/BUILD/OPEN_DECISIONS.md

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

## 19. Approval Does Not Transfer Automatically

Approval for one task does not approve:

- future similar tasks
- broader system activation
- production deployment
- schema migration
- role mutation
- economy changes
- public announcement
- CNX automation

Each high-risk action needs its own approval.

---

## 20. Final Approval Directive

When risk is low, document clearly.

When risk is medium, ask before behavior changes.

When risk is high, stop and request approval.

When risk is critical, prepare a written plan and wait.

Do not treat speed as safety.

Do not treat AI confidence as approval.

Do not bypass Anthony Hammon.

