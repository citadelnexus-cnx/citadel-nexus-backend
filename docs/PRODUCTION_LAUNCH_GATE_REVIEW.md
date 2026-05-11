# Citadel Nexus Production Launch Gate Review v2.0

## Purpose

This document reconciles Citadel Nexus production-dev readiness and public launch readiness after the completed infrastructure, security, backup, restore, and recovery baseline work.

This document is the active launch gate record.

---

## Current Decision

Production-dev readiness:

    PASS

Public launch readiness:

    HOLD

Reason:

    Citadel Nexus is approved for controlled production-dev operation, but not yet approved for full public launch.

The prior backup/restore blocker has been reduced because production export and restore-test validation have now been completed.

Public launch remains on hold because final security cleanup, launch-scope decisions, and public-facing feature boundaries still need final review.

---

## Evidence Documents

This launch gate review depends on the following documentation:

- docs/PRODUCTION_RUNBOOK.md
- docs/PRODUCTION_LAUNCH_GATE_REVIEW.md
- docs/BACKUP_RECOVERY_INCIDENT_RESPONSE.md
- docs/SUPABASE_BACKUP_RESTORE_BASELINE.md
- docs/SUPABASE_BACKUP_DECISION_RESTORE_TEST_PLAN.md
- docs/SUPABASE_MANUAL_EXPORT_RESTORE_PREP.md
- docs/SUPABASE_TOOLING_VERIFICATION.md
- docs/SUPABASE_SECRET_SAFE_EXPORT_PLAN.md
- docs/SUPABASE_PRODUCTION_EXPORT_DRY_RUN.md
- docs/SUPABASE_PRODUCTION_EXPORT_VERIFICATION.md
- docs/SUPABASE_RESTORE_TEST_IMPORT_VERIFICATION.md
- docs/SUPABASE_RECOVERY_OBJECTIVES_AND_WARNINGS.md
- docs/SUPABASE_SECURITY_BASELINE.md
- docs/RLS_ACCESS_MODEL.md
- docs/PUBLIC_LAUNCH_BLOCKER_REGISTER.md

---

## Infrastructure Gate

Status:

    PASS

Confirmed:

- Backend API is online behind Nginx.
- HTTPS API route is live.
- Nginx configuration validates successfully.
- UFW is active.
- Only SSH and HTTPS are publicly exposed.
- Backend app port is bound to localhost.
- PM2 manages backend and Ascension runtime.
- PM2 process list is saved.
- Health endpoint returns healthy.
- Database health endpoint returns connected.
- GitHub main branch is current.
- Production runbook exists.

Current infrastructure decision:

    Approved for production-dev.

---

## API Security Header Gate

Status:

    PASS

Confirmed active security headers:

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: no-referrer
- Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
- Strict-Transport-Security: max-age=31536000; includeSubDomains

Current security header decision:

    Approved for production-dev.

---

## Network Exposure Gate

Status:

    PASS

Confirmed:

- Public exposed ports are limited to SSH and HTTPS.
- Backend API runtime is bound to localhost.
- Nginx proxies public API traffic to local backend.
- Direct public access to backend port is blocked by binding and firewall posture.

Current network decision:

    Approved for production-dev.

---

## Runtime Gate

Status:

    PASS

Confirmed:

- citadel-backend PM2 process is online.
- citadel-ascension PM2 process is online.
- Ascension logs confirm bot online.
- Ascension logs confirm Prisma/Supabase connection verified.
- Ascension logs confirm Phase 1 caps active.

Current runtime decision:

    Approved for production-dev.

---

## Supabase Project Gate

Status:

    PASS FOR PRODUCTION-DEV

Confirmed:

- Production Supabase project is healthy.
- Restore-test Supabase project is healthy.
- Production database version is PostgreSQL 17.x.
- Restore-test database version is PostgreSQL 17.x.
- Supabase dashboard usage is within free-plan limits at time of review.
- Supabase account owner authenticator app is configured.
- Classic Supabase access tokens are not currently created.
- Account audit logs are visible.
- Supabase telemetry sharing is disabled.
- Project-level GitHub integration is not active.

Current Supabase decision:

    Approved for production-dev.

Public launch note:

    Free-plan backup limitations must remain accepted intentionally or be upgraded before a higher-risk public launch.

---

## Backup Gate

Status:

    PASS FOR PRODUCTION-DEV

Confirmed:

- Backup and recovery baseline documented.
- Manual export preparation documented.
- Secret-safe export process documented.
- PostgreSQL 17 client tooling installed and verified.
- Production database manual export completed.
- Export file was created successfully.
- Export file was verified as PostgreSQL custom database dump.
- pg_restore could list dump contents.
- Backup artifacts are ignored by Git.
- Production connection string was not committed.
- Production connection string was not documented.
- Temporary production database URL variable was cleared.
- Shell history was checked after cleanup.

Current backup decision:

    Approved for production-dev.

---

## Restore Gate

Status:

    PASS FOR PRODUCTION-DEV

Confirmed:

- Restore-test project exists and is separate from production.
- Production dump was imported into restore-test.
- Restore-test database was queryable after import.
- Citadel Nexus application tables restored.
- Application row counts were validated.
- Prisma migration table restored.
- Restore-test connection string was not committed.
- Restore-test connection string was not documented.
- Temporary restore-test database URL variable was cleared.
- Restore logs are ignored by Git.

Validated restored public application tables:

| Table | Status | Row Count |
|---|---:|---:|
| public.AccessState | PASS | 3 |
| public.AscensionAdminAction | PASS | 13 |
| public.AscensionAdminSnapshot | PASS | 0 |
| public.AscensionPrizePool | PASS | 1 |
| public.AscensionProfile | PASS | 2 |
| public.DiscordRoleSyncAudit | PASS | 0 |
| public.Entitlement | PASS | 0 |
| public.User | PASS | 3 |
| public._prisma_migrations | PASS | 7 |

Current restore decision:

    Approved for production-dev.

---

## Recovery Objective Gate

Status:

    PASS FOR PRODUCTION-DEV

Confirmed:

- Recovery Point Objective is documented.
- Recovery point is proven by successful restore-test import.
- Recovery Time Objective is documented.
- RTO is not yet SLA-grade.
- Current production-dev target is same-day manual recovery.
- Operational target is 2-4 hours once operator is available.
- Public SLA is not approved.

Current recovery decision:

    Approved for production-dev.

Public launch note:

    Public launch may proceed only if the project accepts manual same-day recovery or upgrades to stronger backup automation.

---

## Supabase Restore Warning Classification Gate

Status:

    PASS WITH DOCUMENTED LIMITATION

Confirmed:

- Restore log contained Supabase-managed object warnings/errors.
- Warnings were documented as accepted managed-platform limitations for production-dev.
- Citadel Nexus application tables restored despite managed-platform warnings.
- Supabase-managed internal object restore perfection is not required for the current production-dev recovery baseline.

Accepted warning categories:

- Existing schema warnings.
- Existing extension warnings.
- Supabase-managed role ownership warnings.
- Supabase-managed trigger warnings.
- Storage object warnings while storage is not production-used.
- Realtime/internal object warnings.
- Managed-platform permission limitations.

Current warning classification decision:

    Accepted for production-dev.

---

## RLS and Direct Database Access Gate

Status:

    PASS FOR PRODUCTION-DEV / HOLD FOR PUBLIC DIRECT ACCESS

Confirmed:

- Current architecture is backend-driven.
- Direct public browser access to Supabase application tables is not authorized.
- Public anonymous Supabase table access is not part of the architecture.
- Authenticated direct table access is deferred until identity mapping and RLS policy testing are complete.
- RLS access model is documented.
- RLS enabled with no policy is currently restrictive, not permissive.
- User-scoped policies are future work only.

Current RLS decision:

    Approved for production-dev because backend/runtime credentials control database access.

Public launch note:

    Do not enable direct frontend Supabase table access until RLS policies are designed, tested in non-production, and approved.

---

## Restore-Test Security Advisor Gate

Status:

    REVIEW REQUIRED BEFORE PUBLIC LAUNCH

Restore-test advisor warning:

    public.rls_auto_enable()

Classification:

    Restore-test cleanup item

Reason:

    Restore-test Security Advisor reported the function as a SECURITY DEFINER function executable by anon and authenticated roles.

Current decision:

    Not a blocker to the recovery baseline.

Public launch decision:

    Must be reviewed before public launch.

Required action:

    Confirm whether public.rls_auto_enable() exists in production.
    Confirm whether it is needed.
    If not needed, remove it.
    If needed, revoke EXECUTE from anon and authenticated roles.
    Document the final result in the Supabase security baseline.

---

## Git and Documentation Gate

Status:

    PASS

Confirmed:

- Production runbook committed.
- Backup/recovery baseline committed.
- Supabase backup/restore baseline committed.
- Supabase manual export preparation committed.
- Supabase tooling verification committed.
- Supabase secret-safe export plan committed.
- Supabase production export dry-run committed.
- Supabase production export verification committed.
- Supabase restore-test import verification committed.
- Supabase recovery objectives and warnings committed.
- Public launch blocker register committed.
- Git working tree clean after each phase.

Current Git/documentation decision:

    Approved for production-dev.

---

## Public Launch Blocker Register

Current blocker status:

    REDUCED BUT NOT CLEARED

Resolved or reduced blockers:

- BLK-001 database restore test: RESOLVED FOR PRODUCTION-DEV
- BLK-002 backup strategy: RESOLVED FOR PRODUCTION-DEV
- Recovery point proof: RESOLVED
- Manual export process: RESOLVED
- Restore-test application-table validation: RESOLVED

Remaining launch blockers:

| Blocker | Status | Required Before Public Launch |
|---|---:|---|
| Final security review | OPEN | Review production Security Advisor, restore-test warnings, and any exposed functions. |
| RLS public/direct access decision | OPEN | Confirm no direct frontend table access or complete RLS policy test. |
| Recovery time SLA decision | OPEN | Accept same-day/manual recovery or upgrade backup strategy. |
| Supabase plan decision | OPEN | Stay free with accepted limitations or upgrade for scheduled backups. |
| Public-facing feature scope | OPEN | Define exactly what is publicly enabled at launch. |
| Monitoring cadence | OPEN | Define daily/weekly checks after launch. |
| Incident operator checklist | OPEN | Finalize short emergency checklist. |

---

## Final Decision

Production-dev status:

    PASS

Public launch status:

    HOLD

Citadel Nexus may continue controlled production-dev operations.

Citadel Nexus is not yet approved for full public launch.

Reason public launch remains on hold:

    The backup/restore blocker has been resolved for production-dev, but final public launch still requires security review, public feature-scope confirmation, RLS/direct-access confirmation, recovery-time acceptance, and monitoring cadence documentation.

---

## Recommended Next Step

Step 33 — Public Launch Security Cleanup and Final Advisor Review

Goal:

    Review the production Supabase Security Advisor, classify any remaining warnings, resolve or document the restore-test rls_auto_enable warning, and update the public launch blocker register.
