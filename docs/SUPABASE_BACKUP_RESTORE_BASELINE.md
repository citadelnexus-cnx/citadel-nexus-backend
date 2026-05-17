# Citadel Nexus Supabase Backup / Restore Baseline v1.0

## Purpose

This document defines the current Supabase backup, restore, and recovery baseline for Citadel Nexus.

The goal is to protect the production-dev database from accidental data loss, failed deployments, broken migrations, destructive commands, credential loss, or project-level failure.

This document does not contain database passwords, connection strings, service role keys, Supabase access tokens, Discord tokens, or private secrets.

---

## Current Database Role

Supabase currently supports the Citadel Nexus backend as the production-dev database layer.

The database supports:

- Backend API state
- Member/session-related backend data
- Ascension runtime database connection
- Future progression/state expansion
- Future wallet, entitlement, and verification records

The backend remains the source of truth.

Discord is not the source of truth.

The frontend is not the source of truth.

---

## Current Backup Classification

Current status: BASELINE DOCUMENTED

Backup status: PARTIAL UNTIL SUPABASE PROJECT PLAN AND RETENTION ARE VERIFIED

Restore status: DOCUMENTED / NOT TESTED

Incident recovery status: DOCUMENTED

Public launch status: HOLD UNTIL RESTORE TEST IS PERFORMED AGAINST A NON-PRODUCTION PROJECT

---

## Backup Layers

Citadel Nexus backup strategy uses multiple layers.

### Layer 1 — Supabase Managed Backups

Supabase managed backups are the primary platform-level backup layer.

Expected Supabase dashboard location:

Database > Backups

Plan-based backup retention must be verified inside the Supabase dashboard.

Required verification fields:

- Supabase project reference
- Supabase plan
- Backup availability
- Backup retention window
- Whether Point-in-Time Recovery is enabled
- Whether the project uses Storage API objects
- Whether custom database roles exist
- Whether any non-default extensions are enabled

No destructive restore action should be performed during verification.

---

### Layer 2 — Manual Logical Database Exports

Manual logical exports are required before major risky changes.

Manual exports should be created before:

- Schema migrations
- Auth/session route changes
- Wallet logic changes
- Entitlement logic changes
- Payout logic changes
- Discord role mutation logic
- Production launch
- Any command that could modify large amounts of data

Recommended export files:

- roles.sql
- schema.sql
- data.sql

These files must not be committed to GitHub unless explicitly sanitized and approved.

---

### Layer 3 — GitHub Code Recovery

GitHub protects source code and operational documents.

GitHub does not protect:

- Supabase database contents
- Supabase project settings
- Supabase secrets
- Runtime `.env`
- PM2 runtime state unless documented separately
- Discord bot token
- Private production credentials

---

### Layer 4 — Local / Offline Recovery Notes

Critical recovery data must be stored securely outside the server.

Required private recovery records:

- Supabase project URL
- Supabase project reference
- Supabase dashboard owner/admin account
- Database password location
- Backend `.env` secure storage location
- GitHub repository URL
- Discord developer application location
- Domain/DNS provider
- Server IP
- SSH key location
- Emergency contact/process notes

These records must not be committed to GitHub.

---

## Manual Backup Procedure

This procedure is for creating a manual logical backup.

Do not paste database passwords into chat.

Do not commit dump files to GitHub.

Run from a secure local/admin machine with Supabase CLI installed, or from a controlled server environment if approved.

Expected Supabase CLI dump pattern:

    supabase db dump --db-url "$DATABASE_URL" -f roles.sql --role-only
    supabase db dump --db-url "$DATABASE_URL" -f schema.sql
    supabase db dump --db-url "$DATABASE_URL" -f data.sql --use-copy --data-only

Recommended backup folder naming:

    citadel-nexus-db-backup-YYYY-MM-DD-HHMM

Recommended backup contents:

    roles.sql
    schema.sql
    data.sql
    BACKUP_NOTES.md

Recommended BACKUP_NOTES.md fields:

- Date/time UTC
- Operator
- Reason for backup
- Source Supabase project reference
- App/backend commit hash
- Whether restore was tested
- Known limitations

---

## Manual Restore Procedure

Do not restore into the production Supabase project unless a Severity 1 incident requires it and Command approves.

Preferred restore target:

- A new Supabase project
- A staging Supabase project
- A temporary recovery project

Restore procedure:

1. Create or select target Supabase project.
2. Confirm required extensions.
3. Confirm database password.
4. Confirm target connection string.
5. Restore roles.
6. Restore schema.
7. Restore data.
8. Re-enable required publications or realtime settings if needed.
9. Reconfigure app environment variables for the target.
10. Run backend health checks.
11. Run database health checks.
12. Run controlled functional tests.
13. Document the result.

Expected psql restore pattern:

    psql \
      --single-transaction \
      --variable ON_ERROR_STOP=1 \
      --file roles.sql \
      --file schema.sql \
      --command 'SET session_replication_role = replica' \
      --file data.sql \
      --dbname "$TARGET_DATABASE_URL"

Production restore requires separate approval.

---

## Dashboard Restore Procedure

Supabase dashboard restore may be used when managed backups are available.

Dashboard path:

Database > Backups

Before dashboard restore:

1. Stop active deployments.
2. Notify project operators.
3. Capture incident reason.
4. Capture latest known good commit.
5. Verify selected restore point.
6. Confirm expected downtime.
7. Confirm whether data after restore point will be lost.
8. Confirm whether storage objects are involved.
9. Confirm whether custom roles/passwords need reset.
10. Proceed only after approval.

After dashboard restore:

1. Confirm database is available.
2. Restart backend if needed.
3. Restart Ascension if needed.
4. Run `/health`.
5. Run `/health/db`.
6. Test session routes.
7. Test Discord runtime.
8. Document result.

---

## Point-in-Time Recovery Policy

Point-in-Time Recovery is not required for the current production-dev phase unless the project begins holding important live user data, paid accounts, wallet-linked records, payout records, or irreversible progression data.

PITR should be reconsidered before:

- Public launch
- Paid user onboarding
- Wallet verification launch
- CNX utility enforcement
- Payout queue activation
- NFT entitlement activation
- Any real-money or irreversible user-state system

Current PITR status:

- Not verified in this document
- Must be checked in Supabase dashboard

---

## Storage Object Limitation

Supabase database backups do not automatically restore deleted Storage API objects.

If Citadel Nexus later uses Supabase Storage for avatars, files, generated assets, credentials, proofs, or uploads, a separate object backup policy is required.

Storage backup policy status:

- Deferred
- Not required unless Supabase Storage becomes operationally important

---

## Recovery Point Objective

Current production-dev RPO target:

- Before public launch: manual backup before risky changes
- After public launch: daily backup minimum
- After paid/wallet/payout systems: PITR or scheduled export required

Current baseline RPO:

- PARTIAL until Supabase plan retention is verified

---

## Recovery Time Objective

Current production-dev RTO target:

- Backend restart: under 10 minutes
- PM2 process recovery: under 10 minutes
- Nginx config recovery: under 30 minutes
- Code redeploy from GitHub: under 60 minutes
- Database restore from managed backup: depends on Supabase project size and plan
- Database restore from manual dump: depends on dump size and target project

Current baseline RTO:

- DOCUMENTED / NOT YET TESTED

---

## Pre-Launch Requirements

Before public launch, complete the following:

- Verify Supabase project plan.
- Verify managed backup retention.
- Confirm whether PITR is enabled or deferred.
- Create first manual logical database backup.
- Store backup outside GitHub.
- Perform restore test into non-production Supabase project.
- Confirm `/health/db` passes against restored project.
- Document restore test result.
- Confirm database admin access owner.
- Confirm secret storage location.

---

## Incident Rules

If database issue occurs:

1. Stop active changes.
2. Do not run destructive commands.
3. Capture error output.
4. Check `/health`.
5. Check `/health/db`.
6. Check backend logs.
7. Check Supabase dashboard.
8. Identify last known good point.
9. Decide between config fix, code rollback, managed restore, or manual restore.
10. Document the incident.

If a secret is exposed:

1. Rotate the secret immediately.
2. Restart affected services.
3. Verify runtime health.
4. Document exposure and rotation.
5. Do not commit exposed secret history.

---

## Current Baseline Decision

Citadel Nexus will use this recovery posture:

- Supabase managed backups remain the primary platform backup layer.
- Manual logical exports are required before risky backend/database changes.
- Restore testing must occur against a non-production Supabase project before public launch.
- Database backup baseline remains PARTIAL until plan retention and restore test are confirmed.
- Public launch remains HOLD until database recovery is tested.

---

## Status

Backup baseline: PARTIAL

Restore procedure: DOCUMENTED

Restore test: NOT YET PERFORMED

Storage object backup: DEFERRED

PITR: NOT VERIFIED

Public launch readiness: HOLD
