# Citadel Nexus Anti-Abuse Rules

## Document Purpose

This document defines the official internal anti-abuse, anti-farming, moderation safety, exploit prevention, and enforcement doctrine for Citadel Nexus v3.

This file supports:

- gameplay economy protection
- Discord contribution protection
- CNX utility safety
- leaderboard integrity
- event reward safety
- future Command Control Dashboard alerts
- admin review workflows
- AI agent implementation boundaries

This file is not public marketing copy.

`AGENTS.md` remains the controlling operating law.

`CITADEL_NEXUS_V3_DOCTRINE.md` remains the master doctrine.

`ECONOMY_AND_XP_RULES.md` defines XP values and caps.

`CNX_UTILITY_RULES.md` defines CNX-specific utility limits.

---

## 1. Master Anti-Abuse Doctrine

Citadel Nexus must assume that users will test limits.

The system must prevent rewards from being farmed through spam, bots, duplicate actions, fake invites, AFK behavior, alt accounts, CNX tier manipulation, admin misuse, or leaderboard exploitation.

The goal is not to punish normal members.

The goal is to protect earned progress.

Invalid actions should be blocked quietly where possible.

Suspicious actions should be flagged for review.

Severe actions should trigger locks, leaderboard disqualification, or escalation.

---

## 2. Abuse Categories

Citadel Nexus must monitor the following abuse categories:

| Category | Description | Risk |
|---|---|---|
| Message spam | Low-quality repeated Discord messages | Contribution XP farming |
| Duplicate content | Same or near-same messages/actions | XP farming |
| AFK voice farming | Idle voice presence without participation | Contribution XP farming |
| Fake invites | Invites that leave quickly or are alt accounts | Growth XP farming |
| Invite churn | High join/leave pattern | Community manipulation |
| Mission loop farming | Repeating optimal missions beyond intended limits | Game XP farming |
| Power loop abuse | Finding ways to refill or bypass Power | Game XP farming |
| Arcade score manipulation | Impossible or suspicious arcade performance | Leaderboard abuse |
| CNX tier hopping | Rapid wallet/tier movement to gain benefits | Utility abuse |
| Alt account farming | Multiple accounts controlled by one user | Multi-system abuse |
| Admin grant misuse | Unjustified manual rewards | Economy corruption |
| Prize pool abuse | Payout attempts without eligibility | Reward corruption |
| Role sync abuse | Discord role mismatch or unauthorized mutation | Permission risk |
| Dashboard misuse | Unsafe control actions | Operational risk |
| Automation abuse | AI or bot actions bypassing gates | Systemic risk |

---

## 3. Player Trust States

Each player should have one active trust state.

| State | Meaning | System Effect |
|---|---|---|
| Normal | No active issue | Full earning allowed |
| Watched | Unusual activity detected | Earning allowed, monitored |
| Limited | Risk confirmed or under review | Reduced or blocked earning |
| Locked | Active integrity issue | No XP/reward earning |
| Banned | Removed from system access | No access or earning |

Trust state changes must be logged.

Trust state changes must include:

- target user ID
- previous state
- new state
- reason
- source module
- reviewer/admin ID if manual
- timestamp
- related evidence if available

---

## 4. Enforcement Ladder

| Level | Action | Use Case |
|---:|---|---|
| 1 | Ignore invalid XP event | Clear invalid action |
| 2 | Soft warning | Low-risk suspicious activity |
| 3 | Temporary XP lock | Repeated suspicious activity |
| 4 | Leaderboard disqualification | Competitive integrity issue |
| 5 | Rank rollback review | Confirmed exploit gain |
| 6 | Ban or permanent lock | Severe abuse or malicious behavior |

Enforcement must be proportional.

False positives must be reversible.

Severe enforcement requires audit logs.

---

## 5. Message XP Abuse Rules

Message XP must not reward spam.

A message should earn Contribution XP only if:

- it meets the minimum word count
- it is not duplicate content
- it is outside cooldown
- it is in an eligible channel
- the user is not locked or limited
- the daily category cap has not been reached
- the content is not obviously low effort

Required protections:

| Protection | Rule |
|---|---|
| Minimum length | 8+ words |
| Cooldown | 90 seconds per qualifying message |
| Duplicate check | repeated messages earn 0 XP |
| Daily cap | message category cap applies |
| Channel check | only eligible channels count |
| Lock check | locked users earn 0 XP |

Flag patterns:

- repeated similar messages
- rapid attempts below cooldown
- copy/paste behavior
- message chains designed only to hit word count
- coordinated reaction farming
- repeated deleted/moderated messages

---

## 6. Verified Contribution Abuse Rules

Verified contribution XP requires quality review.

Actions that require verification include:

- helpful answers
- bug reports
- feature suggestions
- guide posts
- event recaps
- gameplay clips
- rule reports
- feedback forms where applicable

Verified actions must include:

- user ID
- action type
- XP amount
- verifier ID
- evidence or reference
- timestamp
- weekly cap state

A verified action without verifier ID must be rejected.

A verifier cannot approve unlimited actions without review.

Repeated low-quality verified submissions should create a watch flag.

---

## 7. Voice XP Abuse Rules

Voice XP must reward participation, not idle presence.

Voice XP should require:

- eligible voice channel
- minimum session time
- active participation signal where possible
- no muted/deafened farming where policy applies
- daily voice cap
- no active lock

Flag patterns:

- long idle sessions
- repeated mute/deafen sessions
- identical session lengths
- suspicious daily maximum hitting
- voice presence with no related activity
- multiple suspected alt accounts in same channel

AFK voice farming should result in reduced XP eligibility or review.

---

## 8. Invite and Growth Abuse Rules

Growth XP has high abuse risk.

Invite XP should not be fully awarded on join alone.

Recommended invite validation layers:

1. Invite joins.
2. Invite remains for 7 days.
3. Invite reaches basic activity threshold.
4. Invite reaches Operator or approved milestone.
5. Invite is not flagged as alt/fake.

Flag patterns:

- high join/leave churn
- many invites with no activity
- repeated accounts from suspicious patterns
- new accounts joining only for rewards
- invite rings
- coordinated fake growth

Growth XP must remain capped.

Invite rewards should be delayed or staged where possible.

---

## 9. Mission and Game XP Abuse Rules

Game XP abuse prevention must protect the main progression loop.

Mission protections must include:

- Power cost
- mission count cap
- mission type cap
- same mission diminishing returns
- daily Game XP cap
- post-modifier hard cap
- high-risk failure rule
- locked account check

Flag patterns:

- hitting maximum every day with identical pattern
- repeated same mission beyond normal use
- impossible XP totals
- mission attempts without Power
- mission success patterns outside expected probability
- exploiting failed mission behavior
- bypassing cooldowns

Invalid mission attempts should not grant XP.

---

## 10. Power Abuse Rules

Power is the main anti-loop resource.

Power abuse includes:

- gaining Power beyond max cap
- bypassing regen timing
- stacking event Power incorrectly
- using CNX to refill Power before approved phase
- exploiting claim cooldown
- mission execution without Power spend

Power changes must be logged or derivable from economy events.

Power cannot become negative.

Locked accounts may have Power earning paused depending on enforcement state.

---

## 11. Arcade Abuse Rules

Arcade XP is high risk for leaderboard manipulation.

Arcade anti-cheat should monitor:

- impossible scores
- repeated identical scores
- too-short sessions
- abnormal score jumps
- abnormal input patterns where available
- new accounts reaching top rank instantly
- suspicious repeated leaderboard wins
- multiple accounts with similar score behavior

Arcade rewards should remain locked until Phase 4.

High-value arcade leaderboard rewards should support delayed review before finalization.

Arcade XP must remain weighted at 0.5 in Nexus Score.

---

## 12. CNX Abuse Rules

CNX abuse includes:

- tier hopping
- wallet hopping
- repeated failed wallet checks
- attempting locked-phase utility
- multiplier over-application
- role sync mismatch
- stale tier exploitation
- using CNX to request rank/prize exceptions

CNX protections must include:

- phase checks
- read-only verification first
- tier snapshots
- audit logs
- hard cap enforcement
- role sync audit
- freeze capability in future dashboard

CNX must never bypass moderation locks or reward caps.

---

## 13. Leaderboard Abuse Rules

Leaderboard integrity requires:

- active season ID
- score source separation
- Nexus Score formula enforcement
- arcade 0.5 weighting
- eligibility checks
- anti-cheat checks
- frozen final review before rewards

Leaderboard reward eligibility should require:

- account age at least 14 days
- no active moderation lock
- at least 5 active season days
- at least 20% score from Game XP or verified contribution
- no unresolved anti-cheat flag
- wallet verification only for token-related rewards

Suspicious leaderboard users should be reviewed before rewards are issued.

---

## 14. Prize Pool Abuse Rules

Prize pool rewards are separate from XP.

Prize pool abuse includes:

- reward without ledger
- reward without eligibility
- duplicate payout
- unapproved admin reward
- event result manipulation
- CNX-based prize guarantee
- unresolved anti-cheat flag ignored

Prize pool actions require:

- ledger record
- admin audit record
- reason code
- recipient ID
- season/event reference
- eligibility proof
- approval status
- timestamp

Prize execution remains locked until authorized.

---

## 15. Admin Abuse Rules

Admin actions are powerful and must be auditable.

Admin abuse includes:

- XP grant without reason
- resource grant without reason
- rank change without audit
- user lock without evidence
- prize award without ledger
- deleting evidence
- bypassing approval gates
- changing constants silently

Admin actions must log:

- admin ID
- target user ID
- action type
- reason
- value before
- value after
- timestamp
- related incident or event

Founder actions are not exempt from logs.

---

## 16. Role Sync Abuse Rules

Discord role sync must reflect backend truth.

Role sync abuse or failure includes:

- wrong role assigned
- stale role not removed
- backend tier mismatch
- repeated Discord API failures
- unauthorized role mutation
- role ID mismatch
- dry-run not performed where required

Role sync changes must be:

- backend-driven
- logged
- idempotent
- reversible
- verifiable
- protected by approval gates

---

## 17. Automation and Agent Abuse Rules

AI agents and automation must not bypass human command authority.

Automation abuse includes:

- deploying without approval
- mutating production without logs
- changing economy constants
- issuing XP or rewards
- changing Discord roles
- executing token actions
- merging to main
- deleting files
- hiding failed checks

AI agents may recommend, draft, test, and report.

AI agents must not independently approve major actions.

---

## 18. Abuse Flag Record Requirements

Each abuse flag should include:

- flag ID
- user ID
- flag type
- severity
- source module
- evidence payload
- related action ID
- related event ID if applicable
- created timestamp
- status
- reviewer ID if reviewed
- resolution reason
- resolved timestamp if resolved

Statuses:

- open
- under_review
- resolved_valid
- resolved_false_positive
- escalated
- dismissed

---

## 19. Severity Levels

| Severity | Meaning | Action |
|---|---|---|
| LOW | Minor anomaly | Monitor |
| MEDIUM | Pattern or repeated issue | Review |
| HIGH | Active abuse likely | Limit/lock pending review |
| CRITICAL | Economy or reward integrity risk | Freeze affected module |
| EMERGENCY | System-wide integrity risk | Safe mode or lockdown |

Critical and Emergency issues must create incident records in the future Command Control Dashboard system.

---

## 20. Module Freeze Rules

When an abuse issue affects a module, the system should support freezing only the affected module where possible.

Possible module freezes:

- Game XP freeze
- Contribution XP freeze
- Arcade reward freeze
- CNX multiplier freeze
- CNX verification freeze
- leaderboard freeze
- prize pool freeze
- Discord role sync pause

Freezing should preserve logs and evidence.

Freezing should not delete data.

Freezing should not punish unaffected systems unless necessary.

---

## 21. False Positive Rules

False positives must be handled carefully.

When a flag is false:

- mark as resolved_false_positive
- record reviewer ID
- record reason
- restore eligibility if needed
- do not delete the original flag
- preserve audit trail

False positive correction should not erase history.

It should create a resolution record.

---

## 22. Dashboard Monitoring Requirements

The future Command Control Dashboard should monitor:

- open abuse flags
- high-risk users
- XP spikes
- cap hit rates
- mission pattern anomalies
- invite churn
- voice XP flags
- arcade score anomalies
- CNX tier mismatches
- role sync failures
- admin grant anomalies
- prize pool holds
- module freeze states

Dashboard controls should include:

- flag user
- clear false positive
- lock XP earning
- freeze leaderboard
- pause module
- export abuse report
- escalate incident

Write controls must remain disabled until authentication, permissions, reason codes, confirmation, and audit logging exist.

---

## 23. QA Requirements

Anti-abuse QA must test:

- duplicate message earns 0 XP
- short message earns 0 XP
- message cooldown blocks earning
- daily caps block earning
- verified action without verifier fails
- weekly caps block verified farming
- locked user earns 0 XP
- mission cap blocks extra mission XP
- same mission diminishing returns applies
- high-risk mission failure cannot drop XP below 0
- CNX multiplier cannot bypass hard cap
- arcade suspicious session can be flagged
- admin grant requires reason
- prize award requires ledger
- leaderboard eligibility blocks flagged user

---

## 24. Final Anti-Abuse Directive

Reward effort.

Block spam.

Flag suspicious patterns.

Preserve evidence.

Protect honest users.

Protect the economy.

Protect the leaderboard.

Protect the community.

