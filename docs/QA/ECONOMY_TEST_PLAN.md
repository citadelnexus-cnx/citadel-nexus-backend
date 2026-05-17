# Citadel Nexus Economy Test Plan

## Document Purpose

This document defines the internal economy testing plan for Citadel Nexus.

It explains how XP, ranks, stages, missions, claims, resources, caps, cooldowns, CNX utility, anti-abuse logic, prize separation, and future economy expansions must be tested before activation.

This file is not public marketing copy.

AGENTS.md remains the controlling operating law.

ECONOMY_AND_XP_RULES.md remains the economy doctrine.

ANTI_ABUSE_RULES.md defines abuse prevention rules.

CNX_UTILITY_RULES.md defines CNX utility boundaries.

APPROVAL_GATES.md defines approval requirements.

---

## 1. Master Economy Testing Rule

No economy system is safe until it is tested.

No reward rule is safe until abuse paths are reviewed.

No multiplier is safe until hard caps are verified.

No progression curve is safe until pacing is simulated.

No prize system is safe until eligibility, audit, and abuse review exist.

Do not activate economy changes without verification and approval.

---

## 2. Economy Testing Scope

This test plan covers:

- Game XP
- Contribution XP
- Arcade XP
- Nexus Score
- ranks
- stages
- missions
- claims
- Power
- Credits
- Intel
- buildings
- cooldowns
- caps
- multipliers
- admin corrections
- locks
- abuse flags
- prize separation
- CNX utility boundaries
- future seasons
- future arcade systems
- future dashboard monitoring

---

## 3. Current Phase Scope

Current active phase:

Phase 1 — Stabilize Current Build.

Current Phase 1 economy systems may include:

- claim rewards
- mission rewards
- mission costs
- build costs
- basic XP
- Power
- Credits
- Intel
- buildings
- profile progression
- admin corrections
- lock state

Future systems remain locked:

- Contribution XP automation
- Discord Rank automation
- Seasons
- Nexus Score automation
- Arcade XP
- CNX automation
- Prestige
- NFT eligibility
- prize automation

Testing future systems is allowed only as planning or simulation until approved.

---

## 4. Test Status Values

Allowed statuses:

- PASS
- FAIL
- BLOCKED
- NOT_TESTED
- NOT_APPLICABLE
- NEEDS_REVIEW

Do not mark PASS unless verified.

Do not mark NOT_APPLICABLE if the system exists but has not been tested.

---

## 5. Economy Risk Levels

LOW:

- documentation-only economy explanation
- read-only economy summary
- static simulation notes

MEDIUM:

- UI display of economy values
- read-only API economy summaries
- non-production test helpers

HIGH:

- XP values
- resource values
- mission rewards
- claim cooldowns
- rank thresholds
- stage thresholds
- caps
- multipliers
- admin economy actions

CRITICAL:

- prize payout logic
- token/CNX spending
- treasury-linked rewards
- automated reward distribution
- production economy migrations
- emergency economy controls

---

## 6. Core Economy Invariants

The following must always remain true:

- Game XP cannot be purchased.
- Game Rank cannot be purchased.
- Stage cannot be purchased.
- CNX cannot buy gameplay resources.
- CNX cannot guarantee prizes.
- CNX cannot bypass locks.
- CNX cannot bypass hard caps.
- Admin actions must be auditable.
- Prizes must remain separate from XP and resources.
- Future phases must remain locked until approved.
- Backend defines economy truth.
- Discord only reflects or triggers approved service logic.
- Frontend only surfaces approved state.
- AI agents cannot issue XP, resources, or prizes.

---

## 7. Claim Flow Test Plan

## 7.1 Claim Cooldown Test

Purpose:

Verify claim rewards cannot be farmed repeatedly.

Test steps:

1. Create or identify a test profile.
2. Run claim once.
3. Record reward and last claim timestamp.
4. Run claim again immediately.
5. Verify second claim is blocked.
6. Wait or simulate valid cooldown only in safe test environment.
7. Run claim after cooldown.
8. Verify claim succeeds only after cooldown.

Expected result:

- first claim succeeds
- immediate second claim fails
- cooldown message is safe and clear
- claim timestamp updates correctly
- no duplicate rewards are granted

Status:

NOT_TESTED.

## 7.2 Claim Cap Test

Purpose:

Verify claim rewards cannot exceed approved resource caps.

Test steps:

1. Set test profile near Power/resource cap.
2. Run claim.
3. Verify final resource value does not exceed cap.
4. Verify response explains capped result if applicable.
5. Verify no overflow or negative values occur.

Expected result:

Resources remain within approved caps.

Status:

NOT_TESTED.

## 7.3 Locked Profile Claim Test

Purpose:

Verify locked profiles cannot earn claim rewards.

Test steps:

1. Lock a test profile through approved admin/test path.
2. Attempt claim.
3. Verify claim is blocked.
4. Verify no XP/resources are granted.
5. Verify lock reason is respected.

Expected result:

Locked profile cannot claim rewards.

Status:

NOT_TESTED.

---

## 8. Mission Flow Test Plan

## 8.1 Valid Mission Test

Purpose:

Verify valid missions process correctly.

Test steps:

1. Select a valid test mission.
2. Verify user has enough Power.
3. Run mission.
4. Verify Power cost applies.
5. Verify XP/resource result is within approved range.
6. Verify missions completed increments.
7. Verify response is safe and accurate.

Expected result:

Mission succeeds or fails according to approved logic and updates state correctly.

Status:

NOT_TESTED.

## 8.2 Invalid Mission Test

Purpose:

Verify invalid mission types are rejected.

Test steps:

1. Attempt an invalid mission name.
2. Verify the command/API rejects it.
3. Verify no resources are spent.
4. Verify no XP is granted.
5. Verify error response is safe.

Expected result:

Invalid mission is rejected with no state mutation.

Status:

NOT_TESTED.

## 8.3 Insufficient Power Test

Purpose:

Verify missions cannot run without enough Power.

Test steps:

1. Set test profile Power below mission cost.
2. Attempt mission.
3. Verify mission is blocked.
4. Verify Power does not go negative.
5. Verify no reward is granted.

Expected result:

Mission fails safely before mutation.

Status:

NOT_TESTED.

## 8.4 Mission Farming Test

Purpose:

Verify repeated mission use cannot break pacing.

Test steps:

1. Run repeated missions on a test profile.
2. Track XP gained over time.
3. Track resources gained over time.
4. Compare against daily/expected caps.
5. Flag if progression is too fast.
6. Verify cooldowns/caps/diminishing returns where implemented.

Expected result:

Mission farming cannot bypass approved progression pace.

Status:

NOT_TESTED.

---

## 9. Build Flow Test Plan

## 9.1 Valid Building Upgrade Test

Purpose:

Verify building upgrades spend resources and update state correctly.

Test steps:

1. Select valid building key.
2. Confirm test profile has required resources.
3. Run build command/action.
4. Verify resource cost is deducted.
5. Verify building level increases by one.
6. Verify any one-time reward is applied once only.
7. Verify response is clear.

Expected result:

Building upgrade succeeds with correct state mutation.

Status:

NOT_TESTED.

## 9.2 Invalid Building Key Test

Purpose:

Verify invalid building keys are rejected.

Test steps:

1. Attempt build with invalid building key.
2. Verify action is rejected.
3. Verify no resources are spent.
4. Verify no building state changes.
5. Verify no XP is granted.

Expected result:

Invalid building key causes no mutation.

Status:

NOT_TESTED.

## 9.3 Insufficient Resource Build Test

Purpose:

Verify building upgrades cannot create negative balances.

Test steps:

1. Set test profile below required resource cost.
2. Attempt upgrade.
3. Verify upgrade is blocked.
4. Verify resources remain unchanged.
5. Verify no negative values occur.

Expected result:

No negative resources and no upgrade.

Status:

NOT_TESTED.

## 9.4 Repeat Upgrade Reward Test

Purpose:

Verify one-time upgrade rewards cannot be claimed repeatedly.

Test steps:

1. Upgrade building once.
2. Record reward.
3. Attempt same upgrade state again or replay command if possible.
4. Verify duplicate reward is not granted.
5. Verify building level cannot skip unexpectedly.

Expected result:

No duplicate upgrade reward.

Status:

NOT_TESTED.

---

## 10. XP and Rank Test Plan

## 10.1 XP Increase Test

Purpose:

Verify XP increases only through approved actions.

Test steps:

1. Record starting XP.
2. Run approved XP action.
3. Verify XP increases by expected amount.
4. Verify source is valid.
5. Verify audit/economy record exists where implemented.

Expected result:

XP increases only through approved path.

Status:

NOT_TESTED.

## 10.2 XP Floor Test

Purpose:

Verify XP cannot become invalid or negative through normal actions.

Test steps:

1. Run failure scenarios.
2. Run admin correction scenarios in test environment if approved.
3. Verify XP does not fall below valid lower bound.
4. Verify errors do not corrupt profile.

Expected result:

XP remains valid.

Status:

NOT_TESTED.

## 10.3 Rank Threshold Test

Purpose:

Verify rank changes occur only at approved thresholds.

Test steps:

1. Identify current threshold rules.
2. Set test profile below threshold.
3. Verify rank does not advance early.
4. Set or earn XP to threshold.
5. Verify rank advances only when criteria are met.
6. Verify rank cannot be bought or manually granted without audit.

Expected result:

Rank progression follows approved rules.

Status:

NOT_TESTED.

## 10.4 Stage Threshold Test

Purpose:

Verify Stage changes occur only through approved earned progression.

Test steps:

1. Identify Stage criteria.
2. Test below threshold.
3. Test at threshold.
4. Test above threshold.
5. Verify Stage does not advance from CNX holding or payment.
6. Verify Stage changes are auditable where applicable.

Expected result:

Stage progression cannot be purchased or bypassed.

Status:

NOT_TESTED.

---

## 11. Resource Test Plan

## 11.1 Power Test

Purpose:

Verify Power is spent and restored safely.

Test steps:

1. Record starting Power.
2. Run action that spends Power.
3. Verify cost applies.
4. Run claim/restoration action.
5. Verify restoration respects max Power.
6. Verify Power never becomes negative or exceeds max.

Expected result:

Power remains within valid bounds.

Status:

NOT_TESTED.

## 11.2 Credit Test

Purpose:

Verify Credits are earned and spent safely.

Test steps:

1. Record starting Credits.
2. Run approved earning action.
3. Verify earned amount.
4. Run spending/build action.
5. Verify cost applies.
6. Verify Credits never become negative.

Expected result:

Credits remain valid.

Status:

NOT_TESTED.

## 11.3 Intel Test

Purpose:

Verify Intel is earned and spent safely.

Test steps:

1. Record starting Intel.
2. Run approved earning action.
3. Verify earned amount.
4. Run spending/build action where applicable.
5. Verify cost applies.
6. Verify Intel never becomes negative.

Expected result:

Intel remains valid.

Status:

NOT_TESTED.

---

## 12. Admin Economy Test Plan

## 12.1 Admin XP Grant Test

Purpose:

Verify admin XP changes are permissioned and audited.

Test steps:

1. Attempt admin XP change as unauthorized user.
2. Verify blocked.
3. Attempt admin XP change as authorized test admin.
4. Verify reason is required.
5. Verify before/after state is recorded.
6. Verify AscensionAdminAction or approved audit record exists.

Expected result:

Admin XP changes require authorization and audit.

Status:

NOT_TESTED.

## 12.2 Admin Resource Correction Test

Purpose:

Verify admin resource corrections are safe.

Test steps:

1. Attempt correction with missing reason.
2. Verify blocked or flagged.
3. Attempt authorized correction with reason.
4. Verify value changes correctly.
5. Verify audit record.
6. Verify no negative or invalid resource state.

Expected result:

Corrections are permissioned, bounded, and audited.

Status:

NOT_TESTED.

## 12.3 Admin Reset Test

Purpose:

Verify reset behavior is protected.

Test steps:

1. Confirm environment protection for global reset.
2. Attempt unauthorized reset.
3. Verify blocked.
4. Review reset command requirements.
5. Verify reset creates audit/snapshot where supported.

Expected result:

Reset cannot be executed casually.

Status:

NOT_TESTED.

---

## 13. Lock State Test Plan

## 13.1 Lock Prevents Earnings

Purpose:

Verify locked profiles cannot earn rewards.

Test steps:

1. Lock test profile.
2. Attempt claim.
3. Attempt mission.
4. Attempt build reward path.
5. Verify no rewards are earned.
6. Verify lock message is safe.

Expected result:

Locked profiles cannot earn economy rewards.

Status:

NOT_TESTED.

## 13.2 Unlock Restores Approved Access

Purpose:

Verify unlocking restores only approved access.

Test steps:

1. Unlock test profile.
2. Run allowed command.
3. Verify command works normally.
4. Verify no bonus reward is granted from unlock.
5. Verify unlock is audited.

Expected result:

Unlock restores access without extra rewards.

Status:

NOT_TESTED.

---

## 14. CNX Utility Economy Test Plan

Current status:

Future / locked.

CNX economy testing should remain simulation-only until Phase 5 approval.

## 14.1 CNX No Purchase Progression Test

Purpose:

Verify CNX cannot buy core progression.

Acceptance criteria:

- CNX cannot buy Game XP
- CNX cannot buy Game Rank
- CNX cannot buy Stage
- CNX cannot buy Credits
- CNX cannot buy Intel
- CNX cannot buy Power
- CNX cannot guarantee prizes

Status:

NOT_TESTED.

## 14.2 CNX Multiplier Cap Test

Purpose:

Verify any future multiplier cannot bypass hard caps.

Test approach:

1. Define base XP.
2. Apply approved multiplier.
3. Apply hard cap after multiplier.
4. Verify final reward never exceeds cap.
5. Verify locked users receive no multiplier.

Status:

FUTURE / NOT_TESTED.

## 14.3 CNX Read-Only Verification Test

Purpose:

Verify future CNX verification is read-only.

Acceptance criteria:

- no private key required
- no seed phrase required
- no token transfer required
- no custody
- no signing
- no treasury access
- no direct reward issuance

Status:

FUTURE / NOT_TESTED.

---

## 15. Contribution XP Test Plan

Current status:

Future / locked until Phase 2.

## 15.1 Message Spam Test

Purpose:

Verify message spam cannot farm Contribution XP.

Acceptance criteria:

- repeated low-value messages do not earn unlimited XP
- cooldowns apply
- daily caps apply
- duplicate content is flagged
- suspicious patterns are flagged

Status:

FUTURE / NOT_TESTED.

## 15.2 Verified Contribution Test

Purpose:

Verify high-value contributions require approval or verification where needed.

Acceptance criteria:

- bug reports can be reviewed
- guides can be reviewed
- helpful answers can be reviewed
- moderator verification can approve/deny
- audit trail exists

Status:

FUTURE / NOT_TESTED.

## 15.3 Discord Rank Separation Test

Purpose:

Verify Discord Rank does not alter Game Rank.

Acceptance criteria:

- Contribution XP affects Discord/community rank only
- Contribution XP does not directly increase Game Rank
- Discord Rank cannot bypass Stage
- Discord Rank cannot grant prizes alone

Status:

FUTURE / NOT_TESTED.

---

## 16. Arcade XP Test Plan

Current status:

Future / locked until Phase 4.

## 16.1 Arcade Cap Test

Purpose:

Verify Arcade XP cannot dominate Nexus Score.

Acceptance criteria:

- Arcade XP has caps
- Arcade XP is weighted at approved formula
- suspicious scores can be delayed
- leaderboard entries can be reviewed
- arcade results do not auto-award prizes

Status:

FUTURE / NOT_TESTED.

## 16.2 Arcade Anti-Cheat Test

Purpose:

Verify suspicious arcade scores can be flagged.

Acceptance criteria:

- impossible scores are flagged
- repeated suspicious sessions are flagged
- score spikes are flagged
- flagged users can be excluded from rewards pending review

Status:

FUTURE / NOT_TESTED.

---

## 17. Season and Nexus Score Test Plan

Current status:

Future / locked until Phase 3.

## 17.1 Nexus Score Formula Test

Approved planned formula:

Nexus Score = Seasonal Game XP + Seasonal Contribution XP + (Seasonal Arcade XP × 0.5)

Acceptance criteria:

- formula uses seasonal values only
- permanent XP is not erased
- Arcade XP weighting is applied correctly
- score cannot include locked/fraudulent entries
- score can be recalculated or audited

Status:

FUTURE / NOT_TESTED.

## 17.2 Season Reset Test

Purpose:

Verify season reset does not destroy permanent progress.

Acceptance criteria:

- seasonal values reset/archive
- permanent Game XP remains
- permanent Contribution XP remains if applicable
- season archive is preserved
- leaderboard finalization is reviewable

Status:

FUTURE / NOT_TESTED.

---

## 18. Prize Separation Test Plan

Current status:

Prize execution locked.

## 18.1 Prize Is Not XP Test

Purpose:

Verify prize systems remain separate from economy progression.

Acceptance criteria:

- XP does not equal prize entitlement
- CNX holding does not equal prize entitlement
- leaderboard rank does not auto-pay
- eligibility requires review
- abuse flags can block review
- prize records are auditable

Status:

NOT_TESTED.

## 18.2 Prize Approval Test

Purpose:

Verify prize actions require approval.

Acceptance criteria:

- no auto-payout
- reason required
- eligibility required
- audit required
- owner or authorized approval required
- payout action separated from gameplay reward

Status:

NOT_TESTED.

---

## 19. Economy Abuse Test Plan

## 19.1 Duplicate Action Test

Purpose:

Verify duplicate submissions do not duplicate rewards.

Acceptance criteria:

- repeated command/action does not grant duplicate reward
- idempotency exists where needed
- replay attack risk is flagged

Status:

NOT_TESTED.

## 19.2 Cooldown Bypass Test

Purpose:

Verify users cannot bypass cooldowns.

Acceptance criteria:

- repeated claim blocked
- repeated mission farming controlled
- bot restart does not reset cooldown incorrectly
- timestamp manipulation is not trusted from client

Status:

NOT_TESTED.

## 19.3 Negative Balance Test

Purpose:

Verify economy balances cannot become invalid.

Acceptance criteria:

- resources cannot go negative
- XP cannot become invalid
- overflow does not occur
- failed actions do not partially mutate state

Status:

NOT_TESTED.

---

## 20. Economy Simulation Plan

Before major economy activation, simulate:

Casual member:

- low activity
- occasional claims
- few missions
- slow progression

Regular member:

- daily claims
- moderate missions
- occasional builds
- steady progression

Active member:

- multiple sessions
- optimized missions
- frequent builds
- faster but bounded progression

Hardcore member:

- near-max allowed activity
- cap testing
- exploit attempt patterns
- fastest possible legal progression

Simulation should answer:

- time to early rank
- time to mid rank
- time to high rank
- time to Stage advancement
- resource bottlenecks
- exploit points
- cap effectiveness
- reward inflation risk

Status:

NOT_TESTED.

---

## 21. Economy Readiness Gates

Economy systems are not ready unless:

- values are documented
- caps are documented
- cooldowns are documented
- service logic is located
- mutation points are known
- audit paths are known
- abuse paths are reviewed
- tests are run or gaps documented
- owner approval is obtained for changes

---

## 22. Final Economy Test Directive

Test before activation.

Simulate before balancing.

Cap before multiplying.

Audit before rewarding.

Review before paying.

Do not allow CNX to buy progress.

Do not allow spam to farm progress.

Do not allow agents to issue rewards.

Do not move economy systems forward without approval.
