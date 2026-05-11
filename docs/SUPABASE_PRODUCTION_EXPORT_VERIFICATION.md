# Citadel Nexus Supabase Production Export Verification v1.0

## Purpose

This document records the first manual production Supabase database export verification.

This document does not contain database credentials.

This document does not contain production connection strings.

This document does not contain database passwords.

---

## Export Summary

Status: COMPLETED

Export timestamp UTC:

    20260511T090239Z

Export directory:

    backups/20260511T090239Z

Export file:

    backups/20260511T090239Z/citadel_nexus_prod.dump

Export format:

    PostgreSQL custom dump

Export file size:

    219K

Dump verification:

    PostgreSQL custom database dump - v1.16-0

Dumped from database version:

    17.6

Dumped by pg_dump version:

    17.9

---

## Secret Handling Verification

Production connection string entered into documentation: NO

Production connection string committed to Git: NO

Production connection string pasted into chat: NO

Production connection string stored in backup document: NO

Temporary shell variable used:

    PROD_DB_URL

Temporary shell variable cleared after export: YES

Shell history re-enabled after cleanup: YES

History checked after cleanup: YES

No database URL visible in shell history check: YES

---

## Export Command Pattern Used

The production export used this safe command pattern:

    /usr/lib/postgresql/17/bin/pg_dump "$PROD_DB_URL" \
      --format=custom \
      --no-owner \
      --no-acl \
      --file "$EXPORT_FILE"

---

## Tooling Verification

PostgreSQL client tooling used:

    psql 17.9
    pg_dump 17.9
    pg_restore 17.9

Reason PostgreSQL 17 tooling was required:

    Supabase production database reported server version 17.6.
    Ubuntu default pg_dump 14.22 was rejected due to server version mismatch.

---

## Git Safety Verification

Backup directory ignored by Git: YES

Dump file ignored by Git: YES

Git working tree clean after export: YES

No dump artifact committed: YES

Ignore rule confirmed by:

    git check-ignore -v "$EXPORT_FILE"

Confirmed ignore rule:

    .gitignore:12:backups/

---

## Verification Performed

Confirmed:

- Export file exists.
- Export file has non-zero size.
- File type identifies as PostgreSQL custom database dump.
- pg_restore can list dump contents.
- Git does not track the backup artifact.
- Production database URL was not committed.
- Production database URL was not documented.
- Production database URL was cleared from shell variable.
- Shell history was checked after cleanup.

---

## Current Step 29 Status

Status: PASS

Production manual export performed: YES

Restore-test import performed: NO

Restored schema/data validated: NO

Recovery point proven: PARTIAL

Recovery time proven: NO

---

## Launch Gate Impact

Production-dev readiness: PASS

Public launch readiness: HOLD

Remaining blockers:

- Restore-test import not yet performed.
- Restored schema/data not yet validated.
- Recovery time not yet proven.
