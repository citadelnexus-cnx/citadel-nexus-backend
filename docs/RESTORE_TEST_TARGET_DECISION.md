# Citadel Nexus Restore Test Target Decision v1.0

## Purpose

This document defines the restore test target decision for Citadel Nexus.

The goal is to confirm that database recovery can be tested safely without risking the current production-dev Supabase project.

---

## Current Production Database

Current production-dev Supabase project:

- Project name: citadel-nexus-backend
- Project region: us-east-2
- Plan: Free
- Scheduled backups: Not available on Free Plan
- Current backup posture: Manual export discipline required
- Public launch status: HOLD

---

## Restore Testing Principle

Production data must not be restored directly into the active production-dev project.

Restore testing must occur in a separate non-production target.

The restore target must be disposable, clearly labeled, and isolated from the live runtime.

---

## Approved Restore Target Options

### Option A — Separate Supabase Test Project

Status: Preferred

Description:

Create a second Supabase project used only for restore testing.

Recommended project name:

citadel-nexus-restore-test

Purpose:

- Import schema/data export safely
- Confirm key tables restore correctly
- Verify Prisma migration table exists
- Verify application-critical tables exist
- Confirm no live runtime points to the restore test project

Pros:

- Safest option
- Closest to real Supabase recovery flow
- Keeps production-dev untouched
- Easy to delete after testing

Cons:

- Free Plan limits may restrict number of active projects
- May require pausing/deleting unused Supabase projects if limit is reached

---

### Option B — Local PostgreSQL Restore Test

Status: Acceptable fallback

Description:

Export the Supabase database and restore it into a local or droplet-hosted PostgreSQL instance.

Purpose:

- Verify export file integrity
- Confirm schema can restore
- Confirm key tables and migrations are present

Pros:

- Does not require another Supabase project
- Useful for basic disaster recovery testing

Cons:

- Not a full Supabase platform restore test
- Does not validate Supabase-specific dashboard behavior
- Requires additional PostgreSQL setup

---

### Option C — Supabase Pro Restore Path

Status: Future / public-launch preferred

Description:

Upgrade to Supabase Pro before meaningful public launch to enable scheduled backups.

Purpose:

- Use managed scheduled backups
- Improve recovery confidence
- Reduce manual backup risk

Pros:

- Strongest production posture
- Built-in scheduled backups
- Better fit once real users or money are involved

Cons:

- Adds recurring monthly cost
- Still requires restore procedure documentation and periodic testing

---

## Current Decision

Selected restore target for next test:

Option A — Separate Supabase Test Project

Target name:

citadel-nexus-restore-test

Decision:

Use a separate non-production Supabase project for the first restore test if project limits allow.

If Supabase Free Plan project limits block this, use Option B as fallback or upgrade to Pro before public launch.

---

## Restore Test Guardrails

The restore test must follow these guardrails:

1. Do not modify the current production-dev Supabase project.
2. Do not point production backend `.env` to the restore test project.
3. Do not use restore-test credentials in PM2 production runtime.
4. Do not expose restore-test database credentials publicly.
5. Do not enable public launch claims based only on documentation.
6. Restore test must be verified by observable table/schema checks.
7. Restore result must be documented after completion.

---

## Minimum Restore Verification Requirements

A restore test is considered valid only if the following are confirmed:

- Database connection works.
- Prisma migration table exists.
- Core user/access tables exist.
- Ascension profile/state tables exist.
- Entitlement/access-state tables exist.
- Admin/audit tables exist.
- Row counts are reviewed where safe.
- No production runtime is connected to restore-test database.
- Restore limitations are documented.

---

## Tables to Verify

Minimum expected tables:

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

## Launch Gate Impact

Production-dev readiness: PASS

Public launch readiness: HOLD

Reason:

The restore target has been selected, but the restore test has not yet been performed.

BLK-001 remains OPEN until restore testing is completed.

BLK-002 remains OPEN or accepted-with-mitigation until backup strategy is finalized.

---

## Current Status

Restore target decision: DOCUMENTED

Selected target: Separate Supabase restore-test project

Restore test performed: NO

Public launch approved: NO

