# Citadel Nexus Supabase Production Export Dry-Run Setup v1.0

## Purpose

This document records the dry-run setup for the future production Supabase database manual export.

This step does not perform a database export.

This step does not use production credentials.

This step does not connect to the production database.

This step only verifies folder structure, naming convention, ignored backup artifacts, and command pattern safety.

---

## Prior Requirement

Step 27 must be complete before this step.

Required Step 27 outcomes:

- Secret-safe export plan documented.
- `.gitignore` protects backup/export artifacts.
- No database URLs committed.
- No secrets entered into chat, docs, screenshots, or Git.
- Temporary variable method approved.

---

## Dry-Run Folder Pattern

Backup folders use UTC timestamps.

Pattern:

    backups/dry-run-YYYYMMDDTHHMMSSZ/

Example:

    backups/dry-run-20260510T223000Z/

The `backups/` directory is ignored by Git.

---

## Planned Real Export Folder Pattern

Real export folders will use UTC timestamps.

Pattern:

    backups/YYYYMMDDTHHMMSSZ/

Example:

    backups/20260510T223000Z/

Planned dump filename:

    citadel_nexus_prod.dump

Full planned output path pattern:

    backups/YYYYMMDDTHHMMSSZ/citadel_nexus_prod.dump

---

## Approved Export Command Pattern

The approved future command pattern is:

    pg_dump "$PROD_DB_URL" \
      --format=custom \
      --no-owner \
      --no-acl \
      --file "backups/<timestamp>/citadel_nexus_prod.dump"

This command must only be used after shell history is disabled and the production connection string has been assigned to the temporary `PROD_DB_URL` variable.

---

## Required Secret-Safe Sequence for Real Export

Before entering production database credentials:

    set +o history

Then assign the production database URL only as a temporary shell variable:

    export PROD_DB_URL='postgresql://REDACTED'

Run the export.

After export:

    unset PROD_DB_URL
    set -o history

Then verify:

    history | tail -20
    git status

No database URL may appear in history.

No backup artifact may appear in Git status.

---

## Git Ignore Verification

The following backup artifacts are ignored:

    backups/
    *.dump
    *.backup
    *.sql
    *.tar

Dry-run ignore check status:

    PASS

---

## Current Step 28 Status

Status: DRY-RUN PREPARED

Production database credential entered: NO

Production database connection opened: NO

Production export performed: NO

Restore-test import performed: NO

Backup artifact ignore protection verified: YES

Command pattern documented: YES

---

## Launch Gate Impact

Production-dev readiness: PASS

Public launch readiness: HOLD

Remaining blockers:

- Real production manual export not yet performed.
- Restore-test import not yet performed.
- Restored schema/data not yet validated.
- Recovery point and recovery time not yet proven.
