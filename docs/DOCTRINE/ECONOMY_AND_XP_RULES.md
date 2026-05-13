# Citadel Nexus Economy and XP Rules

## Document Purpose

This document defines the buildable economy, XP, rank, resource, CNX, Nexus Score, and anti-farming rules for Citadel Nexus v3.

This is an internal technical reference.

This file is not public marketing copy.

This file supports:

- backend economy implementation
- Ascension gameplay balancing
- Discord contribution systems
- CNX utility safeguards
- seasonal Nexus Score logic
- future Command Control Dashboard monitoring
- QA test planning
- AI agent build instructions

`AGENTS.md` remains the controlling operating law for all AI agents.

`CITADEL_NEXUS_V3_DOCTRINE.md` remains the master doctrine.

This file provides the detailed economy values and implementation rules.

---

## 1. Economy Design Goals

Citadel Nexus economy design must support:

1. Fair earned progression.
2. Zero pay-to-win.
3. Long-term engagement.
4. Clear player goals.
5. Strong anti-abuse controls.
6. Separate permanent and seasonal systems.
7. Safe CNX utility.
8. Transparent admin correction.
9. Scalable future dashboard monitoring.
10. Controlled phased rollout.

The system must reward:

- consistent gameplay
- meaningful contribution
- verified help
- event participation
- good resource planning
- long-term activity

The system must not reward:

- spam
- bots
- alt farming
- fake invites
- AFK activity
- uncapped loops
- hidden admin grants
- CNX-based rank purchasing
- exploit behavior

---

## 2. Economy Layer Map

| Layer | Purpose | Permanent | Seasonal | Current Phase |
|---|---|---:|---:|---|
| Game XP | Main gameplay progression | Yes | Counted into Nexus Score | Phase 1 |
| Contribution XP | Discord/community progression | Yes | Counted into Nexus Score | Phase 2 |
| Arcade XP | Companion engagement | Optional archive | Weighted at 0.5 | Phase 4 |
| CNX Boost | Optional utility modifier | Snapshot-based | Applies when active | Phase 5 |
| Nexus Score | Seasonal leaderboard | No | Yes | Phase 3 |
| Event Score | Event-specific scoring | No | Event-scoped | Phase 3+ |
| Resources | Gameplay economy | Yes | Some event resources may expire | Phase 1 |
| Prize Pool | Separate reward ledger | Yes | Season/event linked | Locked |

---

## 3. XP Track Separation

## 3.1 Game XP

Game XP controls:

- Game Rank
- gameplay identity
- mission access
- building progression
- Stage requirements
- future prestige eligibility

Game XP does not control:

- Discord Rank
- CNX tier
- token ownership
- prize eligibility by itself
- moderator status

## 3.2 Contribution XP

Contribution XP controls:

- Discord Rank
- community trust
- contribution recognition
- contribution-based channel access
- future community privileges

Contribution XP does not control:

- Game Rank
- Game XP
- Stage by itself
- CNX tier
- prize eligibility by itself

## 3.3 Arcade XP

Arcade XP controls:

- arcade achievement tracking
- arcade participation records
- weighted Nexus Score contribution
- limited capped Game XP bonus

Arcade XP does not control:

- Game Rank directly
- Discord Rank
- CNX tier
- Stage progression by itself

## 3.4 CNX Boost

CNX Boost controls:

- optional XP multiplier
- optional cooldown improvement
- recognition roles
- future cosmetic access

CNX Boost does not control:

- rank skips
- Stage skips
- prize guarantees
- admin access
- moderator access
- exclusive required gameplay

## 3.5 Nexus Score

Nexus Score controls:

- seasonal leaderboard placement
- seasonal recognition
- seasonal eligibility checks

Nexus Score does not control:

- permanent Game Rank
- permanent Discord Rank
- permanent Stage
- CNX tier
- moderation immunity

---

## 4. Game XP Rules

## 4.1 Game XP Purpose

Game XP is the primary progression system for Citadel Ascension gameplay.

Game XP should make players feel steady progress while preventing extreme speedrunning, farming loops, or exploit-driven progression.

## 4.2 Daily Game XP Targets

| Player Type | Intended Daily Game XP | Notes |
|---|---:|---|
| Casual | 25–75 | Claim plus light actions |
| Regular | 90–175 | Multiple missions and some progress |
| Active | 180–300 | Full daily loop |
| Hardcore | 300–375 | Near-perfect daily loop |
| Absolute Maximum | 475 | Post-modifier hard cap |

## 4.3 Game XP Caps

| Cap Type | Value | Rule |
|---|---:|---|
| Base design range | 280–350/day | Expected highly active play |
| Pre-multiplier hard cap | 375/day | Base Game XP before CNX modifier |
| Post-multiplier absolute cap | 475/day | Final Game XP after all modifiers |

The post-multiplier cap must always be enforced.

CNX cannot bypass it.

Events cannot bypass it unless explicitly marked as seasonal-only and approved.

## 4.4 Game XP Sources

| Source | Base Game XP | Phase | Repeatable | Notes |
|---|---:|---|---:|---|
| `/start` onboarding | 0–25 | Phase 1 | No | Optional onboarding award |
| `/claim` | 10 | Phase 1 | Yes | Cooldown-gated |
| Safe mission | 20 | Phase 1 | Yes | Power-gated |
| Medium mission | 35 | Phase 1 | Yes | Power + success-gated |
| High-risk mission | 60 | Phase 1 | Yes | Power + failure risk |
| Building upgrade L1→L2 | 15 | Phase 1 | No per building | One-time |
| Building upgrade L2→L3 | 20 | Phase 1 | No per building | One-time |
| Building upgrade L3→L4 | 30 | Phase 1 | No per building | One-time |
| Building upgrade L4→L5 | 45 | Phase 1 | No per building | One-time |
| Daily challenge | 60 | Future | 1/day | Locked until authorized |
| Rank promotion | 150 | Phase 1 | No per rank | Automatic threshold |
| Stage evolution | 100 | Phase 1+ | No per Stage | Automatic threshold |
| Rare drop bonus | variable | Future | Capped | Must be logged |

---

## 5. Mission Economy

## 5.1 Mission Types

| Mission Type | Risk | Power Cost | Base XP | Success Rate | Failure Result |
|---|---|---:|---:|---:|---|
| Recon | Safe | 2 | 20 | 100% | None |
| Trade Run | Safe | 2 | 20 | 100% | None |
| Stabilize Node | Safe | 2 | 20 | 100% | None |
| Archive Dive | Medium | 3 | 35 | 80% | 0 XP |
| Black Market | High | 4 | 60 | 50% | -15 XP |
| Deep Scan | High | 4 | 60 | 50% | -15 XP |

## 5.2 Mission Limits

| Limit | Value |
|---|---:|
| Total missions per day | 12 |
| Safe missions per day | 10 |
| Medium-risk missions per day | 6 |
| High-risk missions per day | 4 |
| Same mission full XP count | 5/day |
| Same mission reduced XP count | 6–8/day |
| Same mission hard reduction | 9+/day |

## 5.3 Mission Diminishing Returns

| Same Mission Count Per Day | XP Earned |
|---:|---:|
| 1–5 | 100% |
| 6–8 | 60% |
| 9+ | 25% or blocked if cap reached |

## 5.4 Mission Failure Rules

| Failure Type | Rule |
|---|---|
| Safe mission | No failure |
| Medium mission failure | 0 XP |
| High-risk failure | -15 XP |
| Account XP floor | Total Game XP cannot go below 0 |
| Seasonal XP floor | Seasonal score cannot go below 0 from failure |
| Resource cost | Power is still spent on failed missions |

## 5.5 Mission Abuse Protections

The system must track:

- mission count per day
- mission type count per day
- same mission repeat count
- XP gained per mission type
- Power spent
- failure count
- abnormal success patterns
- mission attempts while locked
- mission attempts without enough Power

---

## 6. Power Economy

## 6.1 Power Purpose

Power is the main gameplay loop limiter.

Power prevents infinite mission farming.

## 6.2 Power Rules

| Rule | Value |
|---|---:|
| Starting Power | 5 |
| Starting Max Power | 10 |
| Base Regen | 1 Power / 30 minutes |
| Claim Bonus | +2 Power |
| Base Claim Cooldown | 8 hours |
| Minimum Max Power | 10 |
| Future Max Power Ceiling | 20 |

## 6.3 Power Reactor Scaling

| Power Reactor Level | Max Power |
|---:|---:|
| 1 | 10 |
| 2 | 12 |
| 3 | 14 |
| 4 | 16 |
| 5 | 18 |
| Future Prestige | 20 |

## 6.4 Power Abuse Protections

Power must not:

- exceed max cap except controlled event grants
- be directly purchased with CNX in early phases
- be granted without logs
- silently regenerate for locked accounts if lock policy blocks earning
- create infinite mission loops

Event-granted Power should expire after the event if used in future phases.

---

## 7. Building Economy

## 7.1 Building Types

| Building | Purpose | Primary Resource Impact |
|---|---|---|
| Knowledge Core | Research and Intel identity | Intel generation/unlocks |
| Trade Hub | Economy and Credits identity | Credit generation/sinks |
| Power Reactor | Activity pacing | Max Power |
| Security Layer | Risk protection | Failure/risk mitigation |

## 7.2 Building Upgrade Requirements

Building upgrades should require:

- current building level
- enough Credits
- enough Intel
- minimum Game Rank where applicable
- minimum Stage where applicable
- cooldown where applicable
- audit/economy log
- one-time XP grant

## 7.3 Recommended Upgrade Table

| Upgrade | XP Reward | Credit Cost | Intel Cost | Rank Gate | Cooldown |
|---|---:|---:|---:|---|---|
| L1→L2 | 15 | 100 | 25 | Initiate | None |
| L2→L3 | 20 | 300 | 75 | Operator | 6h |
| L3→L4 | 30 | 900 | 200 | Builder | 12h |
| L4→L5 | 45 | 2,000 | 500 | Architect | 24h |
| L5→Prestige | 75 | 5,000 | 1,250 | Sentinel | 72h |

Prestige upgrades remain locked until the prestige phase.

## 7.4 Building Abuse Protections

Building XP is awarded only once per building upgrade.

CNX cannot reduce building costs in early phases.

Building upgrades must not silently fail.

Building upgrades must not create negative resources.

Resource spend and building level change must be transactional where possible.

---

## 8. Resource Economy

## 8.1 Core Resources

| Resource | Purpose | Earned From | Used For | Risk |
|---|---|---|---|---|
| Credits | General progression currency | Claims, Trade Run, events | Building upgrades, entries | High inflation risk |
| Intel | Research currency | Recon, Archive Dive | Unlocks, upgrades | Medium inflation risk |
| Power | Action energy | Regen, claims | Missions | Loop risk |
| Relics | Rare collectible | Drops, events | Cosmetics, future crafting | Low if capped |
| Honor | Verified contribution currency | Verified actions | Reputation/cosmetics | Low |

## 8.2 Resource Rules

Gameplay resources are not money.

Gameplay resources cannot be exchanged for CNX.

Gameplay resources cannot be exchanged for fiat currency.

Gameplay resources cannot guarantee prizes.

Gameplay resources must be logged when gained or spent.

## 8.3 Resource Sink Rules

Required sinks:

- building upgrades
- optional event entries
- cosmetics
- profile banners
- community goals
- future prestige costs

Inflation must be monitored before increasing resource rewards.

---

## 9. Game Rank Rules

## 9.1 Game Rank Table

| Rank | Game XP Required | Intended Active Time | Notes |
|---|---:|---|---|
| Initiate | 0 | Day 1 | Starting rank |
| Operator | 500 | 3–7 days | Basic loop proven |
| Builder | 1,500 | 10–20 days | Building system engaged |
| Architect | 5,000 | 30–45 days | Midgame |
| Warden | 15,000 | 75–120 days | Advanced player |
| Sentinel | 40,000 | 120–180 days | Top regular rank |
| Sovereign Sentinel | 100,000 | 8–12+ months | Future endgame status |

## 9.2 Game Rank Rules

Game Rank is based only on Game XP.

Game Rank cannot be bought.

Game Rank cannot be granted by CNX.

Game Rank promotion must be logged.

Rank promotion rewards are one-time only.

---

## 10. Discord Rank Rules

## 10.1 Discord Rank Table

| Rank | Contribution XP | Estimated Active Time | Unlock |
|---|---:|---|---|
| Newcomer | 0 | Day 1 | Standard channels |
| Scout | 200 | 3–7 days | Strategy/build channels |
| Regular | 750 | 2–4 weeks | Feedback/early access |
| Contributor | 2,000 | 5–8 weeks | Contributor lounge |
| Veteran | 5,000 | 3–5 months | Veteran room |
| Nexus Elder | 15,000 | 8–12 months | Elder council |
| Legend | 40,000 | 18+ months | Permanent recognition |

## 10.2 Discord Rank Rules

Discord Rank is based only on Contribution XP.

Discord Rank cannot be bought.

Discord Rank cannot be granted by CNX.

Discord Rank cannot be inflated by Game XP.

Discord Rank requires community activity and/or verified contribution.

Contribution XP automation is locked until Phase 2.

---

## 11. Stage Progression Rules

## 11.1 Stage Table

| Stage | Name | Node Score | Buildings | Missions | Game XP | Rank Gate | Unlock |
|---:|---|---:|---:|---:|---:|---|---|
| 1 | Dormant Node | 0 | 1 | 0 | 0 | None | Basic commands |
| 2 | Stabilized Core | 50 | 1 | 5 | 0 | None | Mission risk tiers |
| 3 | Emerging Citadel | 200 | 2 | 25 | 500 | Operator | Phase 2 commands |
| 4 | Developed Citadel | 750 | 3 | 100 | 5,000 | Builder | Advanced events |
| 5 | Ascended Citadel | 2,500 | 4 | 400 | 40,000 | Warden | Leaderboard/cosmetics |
| 6 | Sovereign | 7,500 | 4 all | 1,000 | 100,000 | Sentinel | Future prestige/NFT eligibility |

## 11.2 Stage Rules

Stage cannot advance from XP alone.

Stage changes must be logged.

Stage 6 remains locked until authorized.

Stage advancement rewards are one-time only.

---

## 12. Contribution XP Rules

## 12.1 Contribution XP Daily Caps

| Category | Daily Cap |
|---|---:|
| Message XP | 60 |
| Social / reaction XP | 40 |
| Voice XP | 60 |
| Growth XP | 150 |
| Verified XP | 100 |
| Total Contribution XP | 225/day before CNX |

## 12.2 Message Actions

| Action Type | XP | Daily Cap | Requirement |
|---|---:|---:|---|
| msg_standard | 1 | 30 messages | 8+ words, cooldown |
| msg_game_channel | 2 | 15 messages | Game-related |
| msg_builds_channel | 3 | 10 messages | Build-related |
| msg_detailed | 8 | 5 posts | 50+ words |
| msg_helpful_answer | 20 | 3/day | Verified |
| msg_build_screenshot | 15 | 2/day | Valid screenshot |

## 12.3 Social Actions

| Action Type | XP | Daily Cap | Requirement |
|---|---:|---:|---|
| reaction_received_5 | 10 | 3/day | Organic |
| reaction_announcement | 2 | 3/day | Server announcement |
| tag_resource | 5 | 2/day | Useful resource |
| welcome_new_member | 5 | 5/day | Welcome channel |

## 12.4 Voice Actions

| Action Type | XP | Limit | Requirement |
|---|---:|---|---|
| voice_per_30min | 10 | 4 sessions/day | Active voice |
| voice_event | 25 | Per event | Event channel |
| voice_game_session | 15 | 2/day | Game voice |

## 12.5 Growth Actions

| Action Type | XP | Rule |
|---|---:|---|
| invite_joins | 50 | Join tracked |
| invite_stays_7d | 100 | Invite remains 7 days |
| invite_reaches_operator | 150 | Invite reaches Operator |
| server_boost_once | 500 | Once per boost |
| server_boost_monthly | 50 | While boosting |
| referral_verified | 75 | Verified referral |

## 12.6 Verified Actions

| Action Type | XP | Weekly Cap | Verification |
|---|---:|---:|---|
| bug_report | 50 | 3/week | Mod required |
| feature_suggestion | 35 | 2/week | Mod required |
| guide_post | 75 | 1/week | Mod required |
| event_recap | 60 | 1/week | Mod required |
| gameplay_clip | 40 | 2/week | Review or link validation |
| feedback_form | 20 | 1/week | Form webhook |
| rule_report_acted | 30 | Case-based | Mod required |

## 12.7 Event Actions

| Action Type | XP | Verification |
|---|---:|---|
| event_participate | 30 | Attendance |
| event_challenge | 50 | Challenge-specific |
| event_top3 | 100 | Mod required |
| event_win | 200 | Mod required |
| event_host | 150 | Mod required |
| event_submission | 40 | Submission validation |

Contribution XP rules are Phase 2 unless explicitly authorized.

---

## 13. Arcade XP Rules

## 13.1 Arcade Limits

| Rule | Value |
|---|---:|
| Max Arcade XP/day | 100 |
| Max Game XP bonus/day from Arcade | 55 |
| Nexus Score weight | 0.5 |
| Minimum rewarded session | 5 minutes |
| Standard rewarded sessions/day | 1 |

## 13.2 Arcade Actions

| Action | Arcade XP | Game XP Bonus | Limit |
|---|---:|---:|---|
| Daily play session | 15 | 0 | 1/day |
| Beat personal best | 25 | 5 | 1/day |
| Complete daily challenge | 40 | 10 | 1/day |
| Top 10 daily leaderboard | 50 | 15 | 1/day |
| Top 3 daily leaderboard | 75 | 25 | 1/day |
| #1 daily leaderboard | 100 | 40 | 1/day |
| Achievement unlock | 20–50 | 0 | Once |
| 7-day arcade streak | 75 | 20 | Every 7 days |
| New arcade rank tier | 100 | 0 | Per tier |

Arcade rewards remain locked until Phase 4.

---

## 14. CNX Utility Rules

## 14.1 CNX Tier Table

| Tier | CNX Required | XP Multiplier | Claim Cooldown |
|---|---:|---:|---:|
| Unranked | 0 | 1.00x | 8h |
| Signal Holder | 100 | 1.10x | 8h |
| Node Holder | 500 | 1.15x | 7h |
| Citadel Holder | 2,000 | 1.20x | 6h |
| Nexus Holder | 10,000 | 1.25x | 5h |
| Founder Tier | 50,000 | 1.30x | 5h |

## 14.2 CNX Rules

CNX is optional.

CNX is not required to play.

CNX does not purchase rank.

CNX does not purchase Stage.

CNX does not purchase prize eligibility.

CNX multipliers apply only after validation.

CNX multipliers must never bypass hard caps.

Automated CNX utility remains locked until Phase 5.

---

## 15. Nexus Score Rules

## 15.1 Formula

Nexus Score = Seasonal Game XP + Seasonal Contribution XP + (Seasonal Arcade XP × 0.5)

## 15.2 Reset Rules

At season end:

- Nexus Score resets.
- permanent Game XP remains.
- permanent Contribution XP remains.
- Game Rank remains.
- Discord Rank remains.
- Stage remains.
- CNX tier remains.
- season standings archive.

## 15.3 Eligibility Rules

Seasonal reward eligibility requires:

- account age at least 14 days
- no active moderation lock
- at least 5 active days in the season
- at least 20% of score from Game XP or verified contribution
- no unresolved anti-cheat flag
- wallet verification only for token-related rewards

---

## 16. Anti-Farming Boundaries

The system must reject or flag:

- duplicate messages
- repeated message structures
- messages under minimum quality
- rapid message attempts
- mission attempts beyond cap
- same mission overuse
- impossible arcade scores
- AFK voice farming
- fake invite churn
- suspicious XP spikes
- repeated failed wallet checks
- admin grants without reason
- prize awards without ledger

---

## 17. Implementation Requirements

Economy implementation must:

- use centralized services
- enforce caps transactionally where possible
- write audit/economy logs
- use constants instead of hard-coded values
- check current phase
- block future-phase systems
- avoid silent failure
- expose read-only health/status where useful
- support future dashboard monitoring

---

## 18. QA Requirements

Economy QA must test:

- claim cooldown
- Power spending
- mission caps
- same mission diminishing returns
- high-risk failure XP floor
- building upgrade resource spend
- one-time building XP
- Game XP daily cap
- post-modifier hard cap
- Contribution XP cooldown
- verified action requirement
- weekly cap enforcement
- Arcade XP weighting
- CNX multiplier order
- Nexus Score formula
- season reset behavior
- admin audit creation

---

## 19. Final Economy Directive

Progress should feel rewarding, but never farmable.

The strongest members should be those who consistently play, contribute meaningfully, help others, participate in events, and stay over time.

CNX should enhance the journey, not replace it.

The economy should reward commitment, not loopholes.

