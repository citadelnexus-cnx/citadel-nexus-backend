# Citadel Nexus Supabase Recovery Objectives and Restore Warning Classification v1.0

## Purpose

This document defines the current Supabase recovery-time objective, recovery-point posture, and restore warning classification for Citadel Nexus.

This document is based on the completed production export and restore-test import procedure.

This document does not contain database credentials.

This document does not contain production connection strings.

This document does not contain restore-test connection strings.

---

## Source Evidence

This document depends on the following verified records:

- docs/SUPABASE_PRODUCTION_EXPORT_VERIFICATION.md
- docs/SUPABASE_RESTORE_TEST_IMPORT_VERIFICATION.md
- docs/SUPABASE_SECRET_SAFE_EXPORT_PLAN.md
- docs/SUPABASE_BACKUP_DECISION_RESTORE_TEST_PLAN.md
- docs/SUPABASE_BACKUP_RESTORE_BASELINE.md

---

## Recovery Posture Summary

Current recovery posture:

    Manual export plus restore-test validation

Current operating stage:

    Production-dev

Production-dev readiness:

    PASS

Public launch readiness:

    HOLD

Reason public launch remains on hold:

    Final launch gate review has not yet been updated after restore-test validation.

---

## Recovery Point Objective

### Current RPO

Current recovery point objective:

    Manual snapshot based

Meaning:

    Recovery can restore to the most recent confirmed manual export.

Confirmed recovery point:

    Production export created during Step 29.

Recovery point status:

    PROVEN

Reason:

    The production database export was successfully imported into the restore-test Supabase project, and Citadel Nexus application tables were validated after restore.

---

## Recovery Time Objective

### Current RTO Classification

Current recovery time objective:

    Manual recovery window

Current RTO status:

    DOCUMENTED / NOT YET SLA-GRADE

Target production-dev recovery window:

    Same-day recovery after incident detection, assuming credentials, Supabase access, GitHub access, and server access remain available.

Operational target:

    2-4 hours for a controlled manual database recovery rehearsal once operator is available.

Conservative incident target:

    Same business day.

Public SLA status:

    Not approved.

Reason:

    The recovery process has been proven functionally, but has not yet been timed end-to-end with a formal stopwatch record.

---

## What Step 30 Proved

Step 30 proved:

- A production Supabase export can be created.
- The export can be imported into a non-production Supabase project.
- Citadel Nexus public application tables restored.
- Application row counts were queryable after restore.
- Prisma migration records restored.
- Restore-test target was separate from production.
- Database URLs were not committed.
- Database URLs were not documented.
- Temporary restore variables were cleared after use.
- Backup and restore artifacts were ignored by Git.

---

## What Step 30 Did Not Prove

Step 30 did not prove:

- A fully automated database recovery process.
- A public SLA-grade recovery time.
- Restoration of every Supabase-managed internal object without warnings.
- Recovery of Supabase storage buckets, because production storage is not currently used.
- Full application runtime cutover from production to restore-test.
- A complete disaster recovery failover architecture.

---

## Restore Warning Classification

The restore log contained warnings and errors related to Supabase-managed objects.

These warnings are classified as:

    ACCEPTED MANAGED-PLATFORM LIMITATION

Current severity:

    Low for production-dev

Public launch severity:

    Review required before final public launch

Reason:

    Supabase-managed projects include internal schemas, roles, extensions, triggers, and ownership boundaries that cannot always be recreated cleanly by a standard project-level restore user.

The restore target already contains platform-managed schemas and objects.

The restore user is not a full unmanaged PostgreSQL superuser.

Therefore, full-cluster internal object restore warnings are expected when restoring a broad Supabase dump into another managed Supabase project.

---

## Accepted Warning Categories

The following warning categories are accepted for the current recovery baseline if Citadel Nexus public application tables restore successfully:

- Existing schema warnings.
- Existing extension warnings.
- Supabase-managed role ownership warnings.
- Supabase-managed trigger warnings.
- Supabase-managed storage object warnings when storage is not used by the application.
- Supabase realtime/internal object warnings.
- Permission limitations for Supabase-managed internal objects.

---

## Non-Acceptable Restore Failures

The following would fail the restore baseline:

- Production was used as the restore target.
- Restore-test connection string was committed.
- Production connection string was committed.
- Restore dump file was committed.
- `public.User` missing after restore.
- `public.AccessState` missing after restore.
- `public.AscensionProfile` missing after restore.
- `public.Entitlement` missing after restore.
- `public._prisma_migrations` missing after restore.
- Restore-test database could not be queried after restore.
- Git status showed tracked dump or credential artifacts.
- Secret variables were not cleared after restore.

---

## Application Table Recovery Classification

The following Citadel Nexus public application tables restored and were validated:

| Table | Classification | Restore Status |
|---|---|---|
| public.User | Application identity table | PASS |
| public.AccessState | Application access-state table | PASS |
| public.Entitlement | Application entitlement table | PASS |
| public.AscensionProfile | Application gameplay profile table | PASS |
| public.AscensionAdminAction | Admin/action audit table | PASS |
| public.AscensionAdminSnapshot | Admin snapshot table | PASS |
| public.AscensionPrizePool | Prize-pool state table | PASS |
| public.DiscordRoleSyncAudit | Discord role sync audit table | PASS |
| public._prisma_migrations | Migration metadata table | PASS |

---

## Current Recovery Runbook Summary

If production database recovery is needed:

1. Stop active schema changes.
2. Capture incident details.
3. Confirm production database state.
4. Locate latest verified dump.
5. Confirm restore target is non-production unless executing an approved production recovery.
6. Disable shell history before entering database URLs.
7. Assign database URL to a temporary shell variable only.
8. Use PostgreSQL 17 client tooling.
9. Restore with `pg_restore`.
10. Clear database URL variable immediately.
11. Re-enable shell history.
12. Verify no secrets entered shell history.
13. Validate application tables.
14. Validate application row counts.
15. Confirm Prisma migration table.
16. Document result.
17. Only perform production cutover after final approval.

---

## Required Tooling

Current required database tooling:

    PostgreSQL client 17.x

Verified tooling:

    psql 17.9
    pg_dump 17.9
    pg_restore 17.9

Reason:

    Supabase production database runs PostgreSQL 17.x.
    Older pg_dump versions may fail due to server version mismatch.

---

## Current Recovery Decision

Recovery baseline decision:

    ACCEPTED FOR PRODUCTION-DEV

Public launch decision:

    HOLD UNTIL FINAL LAUNCH GATE REVIEW

Rationale:

    The system now has a proven production export and restore-test validation path for Citadel Nexus application tables.

    However, a public launch should still wait until the final launch gate review is updated and any remaining non-database launch blockers are classified.

---

## Remaining Improvements

Recommended future improvements:

1. Time the full recovery process with a stopwatch.
2. Create a clean application-schema-only restore profile.
3. Create a dedicated restore rehearsal checklist.
4. Upgrade Supabase if automated scheduled backups become required.
5. Document storage bucket backup only when storage becomes production-used.
6. Add a monthly or pre-launch restore rehearsal cadence.
7. Consider separating Supabase platform-object restore from application-table restore.
8. Create a short emergency operator checklist.

---

## Step 31 Status

Status:

    PASS

Recovery time objective documented:

    YES

Recovery point objective documented:

    YES

Supabase-managed warning classification documented:

    YES

Production-dev recovery baseline accepted:

    YES

Public launch readiness:

    HOLD

Reason public launch remains on hold:

    Final launch gate review must be updated after Steps 29-31.

---

## Restore-Test Security Advisor Follow-Up

After restore, the restore-test Supabase Security Advisor reported warning-level findings for:

    public.rls_auto_enable()

Warning category:

    SECURITY DEFINER function executable by anon and authenticated roles.

Classification:

    RESTORE-TEST CLEANUP ITEM

Current production recovery impact:

    Not a blocker to the recovery baseline because the restore-test successfully proved application-table recovery.

Required handling:

    Do not treat this function as approved for public launch until reviewed.

Recommended remediation path:

    Review whether public.rls_auto_enable() is still needed.
    If not needed, remove it from restore-test and confirm whether it exists in production.
    If needed, revoke EXECUTE from anon and authenticated roles.
    Document the final decision in the RLS/security baseline.

Launch gate impact:

    Production-dev recovery baseline: PASS
    Public launch readiness: HOLD pending final security review.
