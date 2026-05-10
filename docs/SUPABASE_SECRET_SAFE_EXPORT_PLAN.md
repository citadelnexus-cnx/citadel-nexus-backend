# Citadel Nexus Supabase Secret-Safe Export Plan v1.0

## Purpose

This document defines the secret-safe handling procedure for future Supabase manual export and restore-test operations.

This document does not contain database credentials.

This document does not contain production connection strings.

This document does not perform an export or restore.

---

## Core Security Rule

Supabase database connection strings are secrets.

They must never be committed to Git, pasted into documentation, pasted into chat, included in screenshots, or stored in terminal history.

---

## Protected Secret Types

The following values are considered protected secrets:

- Production Supabase database connection string
- Restore-test Supabase database connection string
- Supabase database password
- Supabase service role key
- Supabase anon key if not intentionally public
- Supabase access token
- JWT secrets
- OAuth client secrets
- Discord bot token
- Any backend `.env` secret

---

## Approved Handling Method

For manual database export/restore work, the approved temporary method is:

1. Disable shell history for the current session.
2. Paste the connection string into a temporary shell variable.
3. Use the variable in commands.
4. Clear the variable after the operation.
5. Re-enable shell history only after secrets are cleared.
6. Confirm no secrets were written to Git.

---

## Shell History Safety Procedure

Before entering a database connection string:

    set +o history

After the operation is complete:

    unset PROD_DB_URL
    unset RESTORE_DB_URL
    set -o history

Then verify:

    history | tail -20

No database URL should appear.

---

## Approved Temporary Variables

Production database connection string:

    PROD_DB_URL

Restore-test database connection string:

    RESTORE_DB_URL

These variables are temporary shell-session variables only.

They must not be committed.

They must not be added to documentation.

They must not be written into scripts.

---

## Approved Future Export Pattern

Production export should use a temporary environment variable:

    pg_dump "$PROD_DB_URL" --format=custom --no-owner --no-acl --file backups/<timestamp>/citadel_nexus_prod.dump

The exact command will be finalized during the controlled export step.

---

## Approved Future Restore-Test Pattern

Restore-test import should use a temporary environment variable:

    pg_restore --dbname "$RESTORE_DB_URL" --clean --if-exists --no-owner --no-acl backups/<timestamp>/citadel_nexus_prod.dump

The exact command will be finalized during the controlled restore-test step.

---

## File Storage Rule

Backup files must not be committed to Git.

Backup files should be stored outside tracked source paths when possible.

If stored temporarily inside the repository folder, they must be ignored by `.gitignore`.

Required ignored paths:

    backups/
    *.dump
    *.backup
    *.sql
    *.tar

---

## Documentation Rule

Documentation may include command patterns using variable names.

Documentation must not include real database URLs.

Safe example:

    pg_dump "$PROD_DB_URL"

Unsafe example:

    pg_dump "postgresql://..."

---

## Screenshot Rule

No screenshots should show:

- Full connection strings
- Database passwords
- API keys
- Tokens
- `.env` contents
- Supabase service role keys

If screenshots are needed, secrets must be covered or cropped out.

---

## Git Safety Checks

Before every commit related to backup/restore work:

    git status
    git diff --cached
    git diff

Confirm:

- No database URL is present.
- No password is present.
- No dump file is staged.
- No `.env` file is staged.
- No secret-bearing file is staged.

---

## Current Status

Status: PLANNED

Production export performed: NO

Restore-test import performed: NO

Production credentials handled: NO

Restore-test credentials handled: NO

Secret-safe procedure documented: YES

---

## Launch Gate Impact

Production-dev readiness: PASS

Public launch readiness: HOLD

Remaining blockers:

- Production manual export not yet performed.
- Restore-test import not yet performed.
- Restored schema/data not yet validated.
- Recovery procedure not yet proven.
