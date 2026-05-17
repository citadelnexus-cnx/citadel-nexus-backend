# Diagnostic Templates (CNMA-v5.0)

Root authority: ../../AGENTS.md

This file provides focused diagnostic templates referenced by AGENTS.md and the Obsidian export workflow. Use these templates when generating system health diagnostics, economy audit reports, or production incident reports. Export to `docs/OBSIDIAN_EXPORT_QUEUE/` for human import into the Obsidian vault.

---

## System Health Diagnostic (Template)

CITADEL NEXUS SYSTEM HEALTH DIAGNOSTIC
══════════════════════════════════════════════════════════════════
Timestamp:    [ISO 8601 date-time]
Repo:         [backend / frontend / both]
Branch:       [current branch]
Agent:        [agent identifier]
Session mode: [mode from Section 28]
Risk level:   [GREEN / YELLOW / RED]

── GIT STATUS ──────────────────────────────────────────────────
Branch:           [output of: git branch --show-current]
Uncommitted:      [output of: git status --short]
Last commit:      [output of: git log --oneline -1]

── BUILD STATUS ────────────────────────────────────────────────
npm run build:    [ ] PASS  [ ] FAIL  [ ] NOT RUN
Errors:           [paste or "none"]

── LINT STATUS ─────────────────────────────────────────────────
npm run lint:     [ ] PASS  [ ] FAIL  [ ] NOT RUN
Warnings:         [count or "none"]

── TEST STATUS ─────────────────────────────────────────────────
npm run test:     [ ] PASS  [ ] FAIL  [ ] NOT RUN  [ ] NO TESTS YET
Coverage:         [if available]
Failures:         [paste exact or "none"]

── SCHEMA STATUS ───────────────────────────────────────────────
npx prisma validate:  [ ] PASS  [ ] FAIL  [ ] NOT RUN
Pending migrations:   [list or "none"]

── PHASE STATUS ───────────────────────────────────────────────
Current phase:    [Phase X — name]
Phase source:     AGENTS.md + docs/BUILD/CURRENT_BUILD_STATUS.md
Deferred active:  [ ] None detected  [ ] Issue found: ___

── ECONOMY INTEGRITY ───────────────────────────────────────────
Uncapped loops:   [ ] None detected  [ ] Issue found: ___
Pay-to-win:       [ ] None detected  [ ] Issue found: ___
Audit logging:    [ ] Present  [ ] Missing in: ___

── SECRETS SCAN ────────────────────────────────────────────────
.env committed:   [ ] No  [ ] YES — CRITICAL — list files
Secrets in code:  [ ] None detected  [ ] Found in: ___
Secrets in docs:  [ ] None detected  [ ] Found in: ___

── OPEN DECISIONS ──────────────────────────────────────────────
docs/BUILD/OPEN_DECISIONS.md: [open count or "file not found"]
Critical items:   [list or "none"]

── APPROVAL GATES ──────────────────────────────────────────────
RED gates pending Anthony: [list or "none"]
YELLOW items needing scope confirmation: [list or "none"]

── RECOMMENDATION ──────────────────────────────────────────────
Overall status:  [ ] HEALTHY  [ ] ATTENTION NEEDED  [ ] CRITICAL
Priority action: [one sentence]
══════════════════════════════════════════════════════════════════

---

## Economy Audit Report (Template)

ECONOMY AUDIT REPORT
══════════════════════════════════════════════════════════════════
Timestamp:  [date-time]
Scope:      [files reviewed]
Auditor:    [Economy Guardian sub-agent or auditor name]

── XP CAP COMPLIANCE ───────────────────────────────────────────
Base Game XP daily ceiling:    [ ] ENFORCED  [ ] VIOLATED
Hard daily cap post-modifier:  [ ] ENFORCED  [ ] VIOLATED
Daily mission limit:           [ ] ENFORCED  [ ] VIOLATED
High-risk mission limit:       [ ] ENFORCED  [ ] VIOLATED
Contribution XP daily cap:     [ ] ENFORCED  [ ] VIOLATED
Arcade XP daily cap:           [ ] ENFORCED  [ ] VIOLATED

── MULTIPLIER ORDER ───────────────────────────────────────────
1. Validate eligibility
2. Calculate base XP
3. Apply action-specific cap
4. Apply category daily cap
5. Apply CNX multiplier
6. Apply hard daily cap
7. Write audit log
8. Update user state

── PAY-TO-WIN SCAN ─────────────────────────────────────────────
CNX bypasses rank threshold:   [ ] No  [ ] YES — VIOLATION
CNX purchases XP directly:     [ ] No  [ ] YES — VIOLATION
CNX bypasses anti-abuse:       [ ] No  [ ] YES — VIOLATION

── AUDIT LOGGING SCAN ─────────────────────────────────────────
Every XP mutation logged:      [ ] YES  [ ] NO — list missing
reason field always set:       [ ] YES  [ ] NO — list locations
adminUserId always set:        [ ] YES  [ ] NO — list locations
valueBefore/After set:         [ ] YES  [ ] NO — list locations

── VERDICT ───────────────────────────────────────────────────
Economy integrity:  [ ] PASS  [ ] VIOLATIONS FOUND
Violations:         [list or "none"]
Approval needed:    [ ] No  [ ] Yes — escalate to Anthony
══════════════════════════════════════════════════════════════════

---

## Production Incident Report (Template)

PRODUCTION INCIDENT REPORT
══════════════════════════════════════════════════════════════════
Timestamp:       [date-time]
Severity:        [ ] LOW  [ ] MEDIUM  [ ] HIGH  [ ] CRITICAL
Type:            [ ] Build failure  [ ] Test failure  [ ] Security
                 [ ] Economy anomaly  [ ] Discord issue  [ ] Database
                 [ ] Deployment issue  [ ] Other: ___

── DESCRIPTION ─────────────────────────────────────────────────
What happened:   ___
When detected:   ___
Affected system: ___

── EVIDENCE ────────────────────────────────────────────────────
Exact error output:
[paste exact output]

Relevant files:
[list]

── IMPACT ASSESSMENT ───────────────────────────────────────────
Users affected:        [ ] None  [ ] Unknown  [ ] N users
Economy affected:      [ ] No  [ ] Yes — describe
Data integrity:        [ ] No impact  [ ] Risk — describe
Security exposure:     [ ] No  [ ] Yes — describe (redacted)

── ROLLBACK AVAILABLE ──────────────────────────────────────────
[ ] Yes — describe rollback path: ___
[ ] No — explain why: ___

── RECOMMENDED ACTION ──────────────────────────────────────────
Immediate:  ___
Short-term: ___
Long-term:  ___

── APPROVAL REQUIRED ───────────────────────────────────────────
Anthony notified:  [ ] Yes  [ ] No
Gate triggered:    [ ] RED  [ ] YELLOW  [ ] None
Prepared by:  [agent identifier]
══════════════════════════════════════════════════════════════════

---

## Usage

1. Copy the appropriate template into a new markdown file in `docs/OBSIDIAN_EXPORT_QUEUE/`.
2. Fill in evidence fields with exact output; do NOT summarize.
3. Mark gates and escalate to Anthony for any RED items.
4. Reference AGENTS.md sections for canonical doctrine and definitions.

*These templates are focused copies of AGENTS.md diagnostic sections intended for Obsidian export. Avoid duplicating more than necessary.*