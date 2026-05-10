# Citadel Nexus Supabase Backup Decision and Restore Test Plan v1.0

## Purpose

This document defines the backup decision and restore test plan required before Citadel Nexus can move from production-dev readiness toward public launch readiness.

This plan directly addresses:

- BLK-001: Supabase restore test not performed
- BLK-002: Supabase Free Plan has no scheduled project backups

---

## Current Supabase Backup Reality

Current project:

- Project name: citadel-nexus-backend
- Plan: Free Plan
- Region: East US / Ohio
- Database status: Healthy
- Current database size: approximately 25.57 MB
- Scheduled backups: Not included on Free Plan
- Restore test: Not yet performed

---

## Current Decision

Status: DECISION REQUIRED

Citadel Nexus must choose one of the following backup postures before public launch.

---

## Option A — Stay on Free Plan With Manual Export Baseline

Description:

Remain on Supabase Free Plan and manually export the database before risky changes, major migrations, launch events, or public user onboarding.

Advantages:

- No monthly cost
- Acceptable for controlled production-dev
- Simple short-term operating model

Risks:

- No automated scheduled backups
- Recovery depends on manual discipline
- Higher risk if real users begin using the system
- Not ideal for public launch

Decision status:

Acceptable for production-dev only.

Not recommended for public launch unless public usage remains extremely limited and low-risk.

---

## Option B — Upgrade to Supabase Pro Before Public Launch

Description:

Upgrade Supabase before meaningful public launch so scheduled backups and stronger operational safeguards are available.

Advantages:

- Daily backups included
- Better production posture
- Reduced recovery risk
- More appropriate for public-facing system

Risks:

- Adds monthly cost
- Still requires restore procedure knowledge
- Restore testing should still be documented

Decision status:

Recommended before public launch if Citadel Nexus will accept real users, wallet-linked identities, progression data, entitlements, or economically meaningful records.

---

## Option C — Keep Public Launch on Hold Until Backup Upgrade Is Justified

Description:

Continue controlled production-dev testing, but do not publicly launch until revenue, funding, or operational maturity justifies the backup upgrade.

Advantages:

- Avoids premature monthly cost
- Keeps risk bounded
- Maintains disciplined launch gate

Risks:

- Delays public launch
- Limits user onboarding
- Requires clear public messaging discipline

Decision status:

Recommended if budget discipline is more important than launch speed.

---

## Recommended Decision

Recommended current decision:

Use Option A for production-dev.

Require Option B or a tested manual export/restore procedure before public launch.

This means:

- Continue using Free Plan for controlled internal testing.
- Perform manual exports before risky database changes.
- Do not claim public launch readiness yet.
- Upgrade to Pro before real public user onboarding or economically meaningful activity.

---

## Restore Test Strategy

The restore test must not be performed against the active production-dev project.

A safe restore test should use one of the following:

1. A separate non-production Supabase project.
2. A local PostgreSQL restore target.
3. A temporary test database environment.

Preferred approach:

Create a separate non-production Supabase project named:

citadel-nexus-restore-test

Purpose:

Validate whether schema and data can be exported from the current project and restored into a safe test target.

---

## Restore Test Scope

The restore test should verify:

- Schema export works.
- Data export works where applicable.
- Prisma tables restore correctly.
- Key Citadel Nexus tables exist after restore.
- Restored database can be queried.
- No production secrets are exposed in the restore target.
- Restore timing and limitations are documented.

---

## Key Tables To Verify

Minimum verification list:

- public.User
- public.AccessState
- public.Entitlement
- public.AscensionProfile
- public.AscensionAdminAction
- public.AscensionAdminSnapshot
- public.AscensionPrizePool
- public.DiscordRoleSyncAudit
- public._prisma_migrations

---

## Manual Export Baseline

Before risky changes, run a manual export using Supabase-supported tools or PostgreSQL-compatible export tools.

The export should include:

- Schema
- Data
- Migration history
- Required enums/types
- Required indexes
- Required constraints

Storage buckets are currently not in production use.

Storage backup remains deferred until Supabase Storage is used.

---

## Restore Test Procedure Draft

1. Create non-production restore target.
2. Confirm target is clearly labeled as test/non-production.
3. Export current database schema.
4. Export current database data if appropriate.
5. Import into restore target.
6. Verify key tables.
7. Verify row counts where safe.
8. Confirm Prisma migration table exists.
9. Confirm no production app is pointed at restore target.
10. Document result.
11. Update public launch blocker register.

---

## Pass Criteria

BLK-001 can move to PASS only when:

- Restore test is performed.
- Restore target is non-production.
- Key tables are verified.
- Recovery limitations are documented.
- Results are committed to GitHub.

BLK-002 can move to PASS or accepted-with-mitigation only when:

- Backup strategy is selected.
- Cost/risk tradeoff is documented.
- Manual export or Pro upgrade decision is recorded.
- Public launch gate is updated.

---

## Current Status

Production-dev backup posture: ACCEPTABLE WITH MANUAL EXPORT DISCIPLINE

Public launch backup posture: HOLD

BLK-001: OPEN

BLK-002: OPEN

Recommended next action:

Create a non-production restore target or decide whether to upgrade Supabase before public launch.

