# Citadel Nexus Supabase Dashboard Verification v1.0

## Purpose

This document records the current Supabase project verification baseline for Citadel Nexus.

This document does not include passwords, connection strings, Supabase access tokens, service role keys, Discord tokens, or private secrets.

---

## Verified Project Identity

Project name: citadel-nexus-backend

Project ref: pgghddckrjwatsivylcy

Organization: CitadelNexus

Organization ID: hemlupgnillgpodsvltj

Organization plan: free

Region: us-east-2

Project status: ACTIVE_HEALTHY

Created at: 2026-04-01T22:24:21.798442Z

---

## Verified Database Baseline

Database host: db.pgghddckrjwatsivylcy.supabase.co

Postgres engine: 17

Database version: 17.6.1.084

Release channel: ga

Current database role:

- Backend API state
- Session/member-state data
- Ascension runtime database connection
- Future progression/state expansion
- Future wallet, entitlement, and verification records

Backend remains the source of truth.

Discord is not the source of truth.

Frontend is not the source of truth.

---

## Verified Table Baseline

Detected public tables:

- public._prisma_migrations
- public.User
- public.AccessState
- public.DiscordRoleSyncAudit
- public.Entitlement
- public.AscensionProfile
- public.AscensionPrizePool
- public.AscensionAdminAction
- public.AscensionAdminSnapshot

Detected storage tables:

- storage.buckets
- storage.objects

Storage object count at verification: 0

Storage bucket count at verification: 0

Storage backup policy status: DEFERRED

Reason: Supabase Storage is not currently operationally important for Citadel Nexus.

---

## Verified Installed Extensions

Installed extensions detected:

- pg_stat_statements
- uuid-ossp
- supabase_vault
- plpgsql
- pgcrypto

Extension status: PASS

No additional extension change is authorized by this document.

---

## Backup / Restore Verification

Supabase organization plan: free

Managed backup status: NOT FULLY VERIFIED

Backup retention window: NOT VERIFIED

Point-in-Time Recovery status: NOT VERIFIED

Manual logical export status: NOT YET CREATED

Restore test status: NOT YET PERFORMED

Public launch status: HOLD

Reason:

The backup and restore procedure is documented, but a non-production restore test has not yet been performed.

---

## Dashboard Items Still Requiring Manual Verification

The following must be checked directly in the Supabase dashboard:

1. Database > Backups
   - Confirm whether backups are available on the current plan.
   - Confirm backup retention window.
   - Confirm whether downloadable logical backups are available.
   - Confirm whether PITR is available or disabled.

2. Database > Extensions
   - Confirm installed extensions match the verified baseline.
   - Do not enable new extensions unless separately approved.

3. Storage
   - Confirm no production-critical buckets or objects exist.
   - If storage becomes important later, create a separate object backup policy.

4. Organization / Project Members
   - Confirm who has owner/admin access.
   - Confirm at least one recovery-capable admin account exists.
   - Confirm private recovery notes are stored outside GitHub.

5. Project Settings
   - Confirm project ref matches: pgghddckrjwatsivylcy.
   - Confirm region matches: us-east-2.
   - Confirm database version matches current baseline.

---

## Required Pre-Launch Actions

Before public launch:

- Verify managed backup availability.
- Verify backup retention.
- Decide whether PITR remains deferred.
- Create a manual logical database export.
- Store the export outside GitHub.
- Perform restore test against a non-production Supabase project.
- Confirm backend `/health/db` works against restored database.
- Document restore test result.
- Confirm database admin/recovery owner.
- Confirm private secret storage location.

---

## Current Decision

Supabase project identity: PASS

Database connection health: PASS

Storage dependency status: PASS

Extension baseline: PASS

Backup retention verification: PENDING

Restore test: PENDING

Public launch readiness: HOLD

---

## Status

Step 16 status: PARTIAL PASS

Reason:

Project identity, health, database baseline, storage baseline, and extension baseline are verified. Backup retention, PITR, admin access, and restore testing still require manual dashboard verification before public launch.
