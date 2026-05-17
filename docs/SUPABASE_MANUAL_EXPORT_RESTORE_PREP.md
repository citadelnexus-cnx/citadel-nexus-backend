# Citadel Nexus Supabase Manual Export / Restore Preparation v1.0

## Purpose

This document prepares the manual export and restore process for the Citadel Nexus Supabase database.

This is a preparation document only.

It does not perform an export.

It does not perform a restore.

It does not modify the production-dev database.

It does not connect the live backend runtime to the restore-test project.

---

## Current Context

Production-dev Supabase project:

- Project name: citadel-nexus-backend
- Purpose: current production-dev database
- Runtime connection: live backend and Ascension runtime
- Public launch status: HOLD

Restore-test Supabase project:

- Project name: citadel-nexus-restore-test
- Purpose: non-production restore validation
- Runtime connection: none
- GitHub repository: not connected
- Production API connection: not connected

---

## Backup Strategy Decision

Current backup strategy:

Manual logical export discipline.

Reason:

The project is currently on Supabase Free Plan and public launch is not approved.

Manual export is acceptable for production-dev while usage is low and launch remains gated.

Public launch should not proceed until restore testing is completed and backup risk is formally accepted or improved.

---

## Approved Export Method

Approved export method:

Supabase CLI logical dump.

Expected dump components:

1. roles.sql
2. schema.sql
3. data.sql

Recommended command pattern:

    supabase db dump --db-url "$PROD_DB_URL" -f roles.sql --role-only
    supabase db dump --db-url "$PROD_DB_URL" -f schema.sql
    supabase db dump --db-url "$PROD_DB_URL" -f data.sql --use-copy --data-only -x "storage.buckets_vectors" -x "storage.vector_indexes"

No export file should be committed to Git.

No production database URL should be committed to Git.

No database password should be committed to Git.

---

## Approved Restore Target

Approved restore target:

citadel-nexus-restore-test

This project is isolated from the live runtime.

The restore-test project may be used only for controlled recovery validation.

The restore-test project must not receive production traffic.

The restore-test project must not be used by PM2 production runtime.

The restore-test project must not be added to production `.env`.

---

## Connection String Handling

Required connection variables for the restore test:

- PROD_DB_URL
- RESTORE_TEST_DB_URL

Rules:

- Store these only in the active shell session during the test.
- Do not write them into tracked documentation.
- Do not paste them into Git.
- Do not save them into PM2 environment.
- Do not save restore-test credentials into production `.env`.
- Do not expose passwords in screenshots or terminal logs.

Preferred connection path:

- Use Supabase Session Pooler connection string by default.
- Use Direct Connection only if the environment supports it.
- Do not use transaction pooler mode for dump/restore unless specifically validated.

---

## Backup Storage Location

Manual exports should be stored outside the Git repository.

Preferred server-side directory pattern:

    /home/deploy/secure-backups/supabase/manual/YYYY-MM-DD_HHMMSS/

Expected files:

    roles.sql
    schema.sql
    data.sql
    manifest.txt

Optional compressed archive:

    citadel-nexus-supabase-manual-export-YYYY-MM-DD_HHMMSS.tar.gz

Security rules:

- Backup directory should not be web-accessible.
- Backup directory should not be inside the application repo.
- Backup files should not be committed.
- Backup files should not be copied into public folders.
- Backup files should be treated as sensitive.

---

## Restore Preparation Checklist

Before performing the restore test:

1. Confirm production backend health passes.
2. Confirm database health passes.
3. Confirm PM2 status is stable.
4. Confirm Git working tree is clean.
5. Confirm restore-test project is healthy.
6. Confirm restore-test project is not connected to GitHub.
7. Confirm restore-test project is not referenced in production `.env`.
8. Confirm export directory exists outside the repo.
9. Confirm Supabase CLI is available or install plan is documented.
10. Confirm psql is available or install plan is documented.
11. Confirm production database URL is available only in shell memory.
12. Confirm restore-test database URL is available only in shell memory.
13. Confirm no PM2 process uses restore-test credentials.

---

## Restore Verification Checklist

After restore is performed in a later step, verify the following in the restore-test project:

Required tables:

- public.User
- public.AccessState
- public.Entitlement
- public.AscensionProfile
- public.AscensionAdminAction
- public.AscensionAdminSnapshot
- public.AscensionPrizePool
- public.DiscordRoleSyncAudit
- public._prisma_migrations

Required checks:

- Database connection works.
- Prisma migration table exists.
- Core tables exist.
- Row counts can be reviewed where safe.
- No production runtime points to restore-test database.
- Restore limitations are documented.
- Public launch blocker register is updated.

---

## Explicitly Prohibited Actions

Do not:

- Restore into the production-dev project.
- Overwrite production-dev database.
- Point production backend `.env` to restore-test database.
- Restart PM2 with restore-test credentials.
- Store database passwords in Git.
- Store dump files in Git.
- Connect restore-test project to public frontend.
- Use restore-test project for live Discord runtime.
- Treat this preparation document as proof of recovery.

---

## Step 25 Status

Status: PREPARED

Manual export performed: NO

Restore performed: NO

Restore-test project available: YES

Public launch approved: NO

Next step:

Step 26 — Supabase CLI / psql Tooling Verification.
