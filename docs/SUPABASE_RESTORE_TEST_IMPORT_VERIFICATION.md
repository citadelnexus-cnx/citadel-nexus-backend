# Citadel Nexus Supabase Restore-Test Import Verification v1.0

## Purpose

This document records the first restore-test import procedure for the Citadel Nexus Supabase production database export.

This document does not contain database credentials.

This document does not contain production connection strings.

This document does not contain restore-test connection strings.

This document does not contain database passwords.

---

## Source Export

Source dump file:

    backups/20260511T090239Z/citadel_nexus_prod.dump

Source dump format:

    PostgreSQL custom database dump

Source dump status:

    VERIFIED

---

## Restore Target

Restore target project:

    citadel-nexus-restore-test

Restore target project ref:

    xmsfzxmkqejztgweayew

Restore target type:

    Non-production Supabase project

Production database used as restore target:

    NO

---

## Restore Summary

Restore timestamp UTC:

    20260511T093657Z

Restore log directory:

    backups/restore-test-20260511T093657Z

Restore log file:

    backups/restore-test-20260511T093657Z/restore_test_import.log

Restore command used:

    /usr/lib/postgresql/17/bin/pg_restore

PostgreSQL client version:

    17.9

Restore log result:

    Completed with Supabase-managed object warnings/errors.

Interpretation:

    Acceptable for current recovery baseline because Citadel Nexus public application tables restored successfully.

---

## Secret Handling Verification

Production database URL used during restore:

    NO

Restore-test database URL entered into documentation:

    NO

Restore-test database URL committed to Git:

    NO

Restore-test database URL pasted into chat:

    NO

Temporary shell variable used:

    RESTORE_DB_URL

Temporary shell variable cleared after restore and validation:

    YES

Shell history checked after cleanup:

    YES

No database URL visible in shell history check:

    YES

---

## Restore Validation

Restore-test import performed:

    YES

Restore log created:

    YES

Restore target was non-production:

    YES

Public table check performed:

    YES

Key table existence check performed:

    YES

Application row count check performed:

    YES

Prisma migration table check performed:

    YES

Prisma migration count:

    7

---

## Restored Public Application Tables

| Table | Restored | Row Count |
|---|---:|---:|
| public.AccessState | YES | 3 |
| public.AscensionAdminAction | YES | 13 |
| public.AscensionAdminSnapshot | YES | 0 |
| public.AscensionPrizePool | YES | 1 |
| public.AscensionProfile | YES | 2 |
| public.DiscordRoleSyncAudit | YES | 0 |
| public.Entitlement | YES | 0 |
| public.User | YES | 3 |
| public._prisma_migrations | YES | 7 |

---

## Git Safety Verification

Restore log ignored by Git:

    YES

Backup directory ignored by Git:

    YES

Git working tree clean after validation:

    YES

No restore artifact committed:

    YES

Confirmed ignore rule:

    .gitignore:12:backups/

---

## Current Step 30 Status

Status:

    PASS

Restore-test import performed:

    YES

Restored application schema/data validated:

    YES

Recovery point proven:

    YES

Recovery time proven:

    PARTIAL

---

## Launch Gate Impact

Production-dev readiness:

    PASS

Public launch readiness:

    HOLD

Remaining blockers:

- Recovery time target still needs formal timing documentation.
- Supabase-managed-object restore warnings should be documented as expected managed-platform limitations.
- Public launch should still wait until final launch gate review is updated.
