# Citadel Nexus Public Launch Blocker Register v1.0

## Purpose

This document defines the remaining blockers that must be resolved before Citadel Nexus can move from production-dev readiness to public launch readiness.

The current runtime is operational for controlled internal development and testing.

Public launch remains on hold until the blockers in this register are resolved, tested, documented, and approved.

---

## Current Launch Decision

Production-dev readiness: PASS

Public launch readiness: HOLD

Reason:

Citadel Nexus has a working backend API, database connection, Discord Ascension runtime, PM2 persistence, Nginx reverse proxy, security headers, firewall posture, and documented operations baseline.

However, public launch requires stronger proof around recovery, database access policy, user-facing claims, and launch-safe operating procedures.

---

## Launch Gate Rule

No public launch claim may be made until every required blocker is marked PASS or formally deferred with an approved mitigation.

A blocker is not considered resolved until:

1. The issue is tested.
2. The result is documented.
3. Any code/config changes are committed.
4. Runtime checks still pass.
5. The launch decision document is updated.

---

## Blocker Severity Legend

### Critical

Blocks public launch completely.

### Major

Blocks public launch unless mitigated or formally deferred.

### Moderate

Does not block internal testing but should be resolved before wider user exposure.

### Minor

Documentation, clarity, or polish issue.

---

## Blocker Status Legend

### OPEN

Work has not been completed.

### IN PROGRESS

Work has started but is not validated.

### PASS

Validated and documented.

### DEFERRED

Intentionally postponed with clear risk acceptance.

---

## Public Launch Blockers

| ID | Blocker | Severity | Status | Owner | Required Action | Pass Criteria |
|---|---|---:|---:|---|---|---|
| BLK-001 | Supabase restore test not performed | Critical | OPEN | Command / Backend Operator | Test database restore path using non-production target or documented export/import process | Restore process is tested, documented, and recovery assumptions are known |
| BLK-002 | Supabase Free Plan has no scheduled project backups | Critical | OPEN | Command | Decide whether to upgrade Supabase or implement manual export baseline before launch | Backup posture is acceptable for public launch and documented |
| BLK-003 | User-scoped RLS policies not tested | Critical | OPEN | Backend / Security | Test RLS behavior in non-production before allowing direct frontend database access | No anonymous exposure, no cross-user exposure, policies documented |
| BLK-004 | Public frontend database access model not finalized | Major | OPEN | Backend / Frontend | Decide whether frontend uses only backend API routes or direct Supabase reads | Data access model is documented and matches implementation |
| BLK-005 | Public launch claims not reconciled | Major | OPEN | Command / Narrative | Review all public messaging against validated live system behavior | No public claim exceeds implemented reality |
| BLK-006 | Production rollback procedure not tested | Major | OPEN | Backend Operator | Confirm rollback using Git history and PM2 restart process | Known-good rollback process is documented and tested |
| BLK-007 | Secret rotation procedure not tested | Major | OPEN | Backend / Security | Document how to rotate Supabase, Discord, API, and session secrets | Rotation procedure exists and does not break runtime when tested safely |
| BLK-008 | Session/auth production behavior not fully launch-tested | Major | OPEN | Backend / Frontend | Test logged-out, logged-in, expired-session, and unauthorized access flows | Auth behavior is predictable and documented |
| BLK-009 | Discord command production UX not fully verified | Moderate | OPEN | Discord / Ascension | Test Phase 1 commands in live Discord environment | Commands respond correctly and no unsafe role mutation occurs |
| BLK-010 | Monitoring cadence not assigned | Moderate | OPEN | Command | Define who performs daily/weekly checks and where results are logged | Monitoring owner and cadence are documented |
| BLK-011 | Incident communication process not finalized | Moderate | OPEN | Command / Narrative | Define what is said publicly if downtime or security issue occurs | Internal and public incident language is documented |
| BLK-012 | Supabase RLS advisor notices still unresolved by design | Moderate | DOCUMENTED | Backend / Security | Keep documented as restrictive posture unless frontend direct DB access is introduced | RLS access model remains aligned with actual architecture |
| BLK-013 | Performance advisor unused index notices not reviewed | Minor | OPEN | Backend | Review after meaningful production traffic exists | No premature index removal before usage baseline exists |
| BLK-014 | Supabase project not connected to repository | Minor | DEFERRED | Command | Keep project-level GitHub integration disabled unless intentionally needed | Manual deployment remains source of truth |
| BLK-015 | Storage bucket policy not needed yet | Minor | DEFERRED | Backend | Revisit only when Supabase Storage is used | No storage claims are made until storage is implemented |

---

## Critical Blocker Details

### BLK-001 — Supabase Restore Test Not Performed

Severity: Critical

Current status: OPEN

Why this matters:

A backup is not launch-grade until recovery has been tested.

Current known state:

- Supabase project is healthy.
- Database health endpoint returns connected.
- Free Plan does not include scheduled project backups.
- Restore test has not been performed.

Required action:

1. Create or designate a non-production Supabase restore target.
2. Export current schema/data or use an available Supabase restore method.
3. Restore into non-production target.
4. Confirm key tables exist.
5. Confirm application can connect to restored target in a safe test mode.
6. Record recovery time and recovery limitations.
7. Update backup baseline.

Pass criteria:

- Restore procedure is tested.
- Restored database is verified.
- Recovery assumptions are documented.
- Public launch gate is updated.

---

### BLK-002 — Supabase Free Plan Backup Limitation

Severity: Critical

Current status: OPEN

Why this matters:

The current project is on the Free Plan, and scheduled project backups are not included.

Required decision:

Choose one:

1. Upgrade Supabase before public launch.
2. Keep Free Plan but implement a manual export schedule.
3. Keep public launch on hold until revenue justifies upgrade.

Recommended production posture:

For public launch, upgrade to Supabase Pro when the system becomes user-facing or financially meaningful.

Temporary acceptable production-dev posture:

Manual exports before risky changes.

Pass criteria:

- Backup approach is selected.
- Cost/risk tradeoff is documented.
- Backup procedure is updated.
- Public launch gate is updated.

---

### BLK-003 — User-Scoped RLS Policies Not Tested

Severity: Critical

Current status: OPEN

Why this matters:

RLS mistakes can expose user, entitlement, wallet, or gameplay data.

Current decision:

Direct browser-to-table access is not authorized.

Current production-dev posture:

RLS enabled with no policies is intentionally restrictive from the public/client perspective.

Required action if direct frontend Supabase access is introduced:

1. Define user identity mapping.
2. Define record ownership mapping.
3. Create policies in non-production only.
4. Test anonymous access.
5. Test user A accessing user B data.
6. Test authenticated own-record access.
7. Document results.

Pass criteria:

- Policies are tested in non-production.
- No anonymous data exposure exists.
- No cross-user data exposure exists.
- Policies are committed/documented.
- Frontend behavior matches policy design.

---

### BLK-004 — Public Frontend Database Access Model Not Finalized

Severity: Major

Current status: OPEN

Current safe direction:

Frontend should use backend API routes for sensitive data.

Direct Supabase client access should remain disabled/deferred until RLS is tested.

Pass criteria:

- Public frontend data flow is documented.
- Sensitive data goes through backend-controlled routes.
- No unauthorized direct Supabase table reads are required.
- Auth/session design matches actual implementation.

---

### BLK-005 — Public Launch Claims Not Reconciled

Severity: Major

Current status: OPEN

Why this matters:

Citadel Nexus must not publicly claim production reliability, economy utility, token enforcement, NFT gating, automated payouts, or backend-authoritative role mutation until those systems are actually validated.

Required action:

Review public-facing language across:

- Website
- Discord
- Social posts
- Docs
- Whitepaper-style pages
- Launch announcements

Pass criteria:

- Live features are separated from roadmap features.
- Deferred systems are clearly labeled.
- No financial, token, security, or utility claim exceeds implementation.
- Public messaging is approved by Command.

---

## Current Deferred Items

The following remain intentionally deferred:

- CNX utility enforcement
- Wallet entitlement logic
- Payout automation
- Prize-pool automation
- NFT-gated access
- Token-gated access
- Automatic Discord role mutation
- Project-level Supabase GitHub automation
- Supabase Storage production usage

These deferred items must not appear as live public features.

---

## Required Before Public Launch

Minimum required launch gate pass:

- BLK-001 PASS
- BLK-002 PASS or formally accepted with mitigation
- BLK-003 PASS or direct frontend Supabase access explicitly disabled
- BLK-004 PASS
- BLK-005 PASS
- BLK-006 PASS
- BLK-007 PASS
- BLK-008 PASS
- BLK-009 PASS

---

## Current Decision

Status: HOLD

Citadel Nexus remains approved for controlled production-dev operation.

Citadel Nexus is not yet approved for public launch.

---

## Recommended Next Step

Step 22 — Supabase Backup Decision and Restore Test Plan

Goal:

Resolve BLK-001 and BLK-002 by choosing the backup strategy, documenting the restore test path, and preparing the test procedure.

