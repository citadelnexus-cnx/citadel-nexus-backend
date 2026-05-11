# Citadel Nexus Public Launch Blocker Register v2.0

## Purpose

This document tracks the remaining blockers before Citadel Nexus can move from controlled production-dev operation to full public launch.

---

## Current Launch Position

Production-dev readiness:

    PASS

Public launch readiness:

    HOLD

Reason:

    Core infrastructure, backup, restore, recovery, and production security advisor checks have passed for production-dev.

    Full public launch still requires final launch-scope, monitoring, incident, and RLS/direct-access decisions.

---

## Resolved / Reduced Blockers

| ID | Blocker | Status | Notes |
|---|---|---:|---|
| BLK-001 | Production database restore test | RESOLVED FOR PRODUCTION-DEV | Production export restored into non-production restore-test project. |
| BLK-002 | Backup strategy undefined | RESOLVED FOR PRODUCTION-DEV | Manual export + restore-test baseline documented. |
| BLK-003 | Production security advisor errors | RESOLVED | Production advisor shows 0 errors. |
| BLK-004 | Production security advisor warnings | RESOLVED | Production advisor shows 0 warnings. |
| BLK-005 | PostgreSQL client tooling mismatch | RESOLVED | PostgreSQL 17 tooling installed and verified. |
| BLK-006 | Secret-safe export process | RESOLVED | Temporary variable method documented and tested. |
| BLK-007 | Restore-test project availability | RESOLVED | Non-production restore-test project exists and was used. |
| BLK-008 | Git backup artifact safety | RESOLVED | Backup/restore artifacts ignored by Git. |
| BLK-009 | Supabase RLS posture undocumented | RESOLVED FOR PRODUCTION-DEV | RLS access model documented. |

---

## Remaining Public Launch Blockers

| ID | Blocker | Status | Required Action |
|---|---|---:|---|
| BLK-010 | Public feature scope undefined | OPEN | Define exactly which routes, Discord commands, pages, and user flows are public at launch. |
| BLK-011 | RLS/direct frontend access decision | OPEN | Confirm direct Supabase table access remains disabled, or complete tested user-scoped policies. |
| BLK-012 | Recovery time SLA decision | OPEN | Accept manual same-day recovery or upgrade Supabase backup strategy before public launch. |
| BLK-013 | Monitoring cadence undefined | OPEN | Define daily/weekly checks for API, bot, Supabase, logs, and Git status. |
| BLK-014 | Incident operator checklist missing | RESOLVED | Incident operator checklist documented in docs/INCIDENT_OPERATOR_CHECKLIST.md. |
| BLK-015 | Restore-test cleanup item | OPEN / NON-PRODUCTION | Decide whether to remove or restrict public.rls_auto_enable() in restore-test. |
| BLK-016 | Public launch final approval | OPEN | Update final launch gate after blockers are resolved or accepted. |

---

## Current Security Position

Production Supabase advisor:

    0 errors
    0 warnings
    9 info items

Restore-test Supabase advisor:

    0 errors
    2 warnings
    9 info items

Restore-test warning:

    public.rls_auto_enable()

Classification:

    Non-production cleanup item.

---

## Launch Decision

Current decision:

    HOLD

Citadel Nexus may continue controlled production-dev operations.

Citadel Nexus is not yet approved for full public launch.

---

## Recommended Next Step

Step 34 — Public Feature Scope Freeze

Goal:

    Define the exact public launch surface before final monitoring and incident checklist work.
