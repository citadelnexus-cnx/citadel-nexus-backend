# Citadel Nexus Public Launch Security Review v1.0

## Purpose

This document records the public launch security cleanup and final advisor review for Citadel Nexus.

This review separates:

- Production Supabase advisor findings.
- Restore-test Supabase advisor findings.
- RLS/direct database access posture.
- Public launch security blockers.
- Production-dev approval status.

This document does not contain secrets, database URLs, tokens, passwords, or connection strings.

---

## Project Scope

Production project:

    citadel-nexus-backend

Production project ref:

    pgghddckrjwatsivylcy

Restore-test project:

    citadel-nexus-restore-test

Restore-test project ref:

    xmsfzxmkqejztgweayew

---

## Current Security Advisor Summary

### Production Supabase Project

Advisor result:

    PASS FOR PRODUCTION-DEV

Findings:

    0 errors
    0 warnings
    9 info items

Production warning status:

    NONE

Production critical blocker status:

    NONE IDENTIFIED

---

### Restore-Test Supabase Project

Advisor result:

    REVIEW REQUIRED / CLEANUP ITEM

Findings:

    0 errors
    2 warnings
    9 info items

Restore-test warning:

    public.rls_auto_enable()

Warning type:

    SECURITY DEFINER function executable by anon and authenticated roles.

Classification:

    Restore-test cleanup item.

Production impact:

    No direct production impact confirmed by advisor review because the production project does not show this warning.

Public launch impact:

    Documented cleanup item. Not a production blocker unless the function appears in production later.

---

## Production Advisor Info Items

Production advisor reports the following INFO-level items:

    RLS Enabled No Policy

Affected tables:

- public.AccessState
- public.AscensionAdminAction
- public.AscensionAdminSnapshot
- public.AscensionPrizePool
- public.AscensionProfile
- public.DiscordRoleSyncAudit
- public.Entitlement
- public.User
- public._prisma_migrations

Classification:

    ACCEPTED RESTRICTIVE POSTURE FOR PRODUCTION-DEV

Reason:

    RLS is enabled and no direct public browser-to-table access is currently authorized.

    No RLS policy means anon/authenticated direct Supabase table access is not granted through policy.

    Current architecture relies on backend/runtime credentials and controlled API routes, not public direct database access.

---

## RLS Public Access Decision

Current decision:

    Direct public Supabase table access is not approved.

Frontend/browser clients:

    Not authorized to directly read or write public application tables.

Backend API:

    Remains the source of truth.

Discord runtime:

    Remains an interface/runtime layer, not the authority for database access truth.

Future user-scoped RLS:

    Deferred.

Required before enabling direct Supabase frontend access:

1. Supabase Auth identity model finalized.
2. Discord identity mapping verified.
3. Wallet identity mapping verified where applicable.
4. User-scoped policy design completed.
5. RLS policies tested in non-production.
6. Public launch gate updated.

---

## Restore-Test rls_auto_enable() Warning

Restore-test warning:

    public.rls_auto_enable()

Status:

    NOT PRESENT AS A PRODUCTION WARNING

Classification:

    Restore-test cleanup item.

Required handling:

    Do not treat this function as approved for public launch.

Recommended cleanup:

    Remove the function from restore-test if not needed.

Alternative if function is needed:

    Revoke EXECUTE from anon and authenticated roles.

Launch decision:

    Not a blocker to production-dev.
    Not a blocker to recovery proof.
    Must remain documented before public launch.

---

## Public Launch Security Blockers

Current blocker status:

    REDUCED BUT NOT CLEARED

Open public launch blockers:

| Blocker | Status | Required Action |
|---|---:|---|
| Production advisor errors | CLEARED | No production errors found. |
| Production advisor warnings | CLEARED | No production warnings found. |
| Restore-test warning | DOCUMENTED | Cleanup or keep documented as non-production artifact. |
| RLS direct access decision | OPEN | Keep direct frontend Supabase table access disabled unless policies are tested. |
| Recovery time SLA decision | OPEN | Accept manual same-day recovery or upgrade backup strategy. |
| Public feature scope | OPEN | Define exactly what is public at launch. |
| Monitoring cadence | OPEN | Define daily/weekly launch monitoring. |
| Incident checklist | OPEN | Finalize short emergency checklist. |

---

## Current Launch Decision

Production-dev readiness:

    PASS

Public launch readiness:

    HOLD

Reason:

    Production security advisor has no errors or warnings, but public launch still requires final feature-scope confirmation, direct-access/RLS confirmation, monitoring cadence, and incident checklist completion.

---

## Step 33 Status

Status:

    PASS FOR SECURITY ADVISOR REVIEW

Production advisor reviewed:

    YES

Restore-test advisor reviewed:

    YES

Production errors:

    0

Production warnings:

    0

Restore-test warnings documented:

    YES

Production-dev readiness:

    PASS

Public launch readiness:

    HOLD
