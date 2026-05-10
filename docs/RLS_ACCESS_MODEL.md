# Citadel Nexus RLS Access Model v1.0

## Purpose

This document defines the intended Row Level Security access model for the current Citadel Nexus Supabase database.

The goal is to classify each table before any RLS policy changes are made.

This is a design document only. It does not activate new policies by itself.

---

## Core Access Principle

The backend API remains the source of truth.

Direct public database access is not authorized for the current production-dev phase.

Frontend clients should not directly read or write core gameplay, entitlement, wallet, payout, role-sync, or admin tables.

Discord is an interface.

Ascension runtime may access the database only through controlled backend/runtime credentials.

---

## Current Runtime Assumption

The current backend and Ascension runtime use server-side environment credentials.

These server-side credentials are trusted runtime credentials.

Browser clients are not trusted database actors.

Public anonymous Supabase access is not part of the current architecture.

---

## Table Classification Legend

### Backend-Only

The table should only be accessed by trusted backend/runtime credentials.

No direct frontend read/write access.

### User-Scoped Future

The table may later allow authenticated users to read their own records, but only after Supabase Auth/session design is finalized.

For now, backend-only.

### Admin-Only

The table contains administrative, audit, treasury, payout, moderation, or control records.

No user or public direct access.

### System/Internal

The table supports migrations or internal platform behavior.

No public access.

---

## Table Access Classification

| Table | Classification | Current Direct Frontend Access | Future Direct Frontend Access | Notes |
|---|---|---:|---:|---|
| public.User | User-Scoped Future | No | Possible later | User identity record. Direct access deferred until auth/session mapping is finalized. |
| public.AccessState | Backend-Only | No | Possible later | Access truth/state should remain backend-defined. |
| public.Entitlement | Backend-Only | No | Possible later | Entitlements must not be client-trusted. |
| public.AscensionProfile | User-Scoped Future | No | Possible later | Player profile may later allow own-profile read only. |
| public.AscensionAdminAction | Admin-Only | No | No | Admin/moderation actions. |
| public.AscensionAdminSnapshot | Admin-Only | No | No | Admin snapshot/control state. |
| public.AscensionPrizePool | Admin-Only | No | No | Prize/pool logic must remain controlled. |
| public.DiscordRoleSyncAudit | Admin-Only | No | No | Role sync/audit trail. |
| public._prisma_migrations | System/Internal | No | No | Prisma migration metadata. |

---

## Current RLS Interpretation

Supabase Security Advisor reports several tables with RLS enabled but no policies.

For the current production-dev architecture, this is acceptable only if:

- Backend/runtime access is working through trusted server-side credentials.
- No browser client depends on direct Supabase table access.
- Public anonymous access is not required.
- Authenticated user direct table access is not required.

This means the current RLS state is intentionally restrictive from the public/client perspective.

---

## Policy Direction

Do not create broad public policies.

Do not create anonymous read policies.

Do not create authenticated-user policies until user identity mapping is finalized.

Do not create policies for admin, audit, payout, role-sync, wallet, or prize-pool tables unless a specific backend/service-role-safe design is approved.

---

## Future Policy Candidates

Future user-scoped read access may be considered for:

- public.User
- public.AscensionProfile
- public.AccessState
- public.Entitlement

Only after:

1. Supabase Auth user identity is mapped to backend user records.
2. Discord identity mapping is verified.
3. Wallet identity mapping is verified where applicable.
4. Session behavior is tested.
5. RLS policies are tested in a non-production project first.

---

## Explicitly Blocked Policy Types

The following are not approved:

- Public anonymous read access to user records.
- Public anonymous read access to Ascension profiles.
- Public anonymous read access to entitlements.
- Client-side write access to gameplay state.
- Client-side write access to access state.
- Client-side write access to Discord role sync tables.
- Client-side write access to prize pool tables.
- Client-side write access to admin action tables.
- Client-side write access to wallet or payout-related tables.

---

## Current Decision

Status: DOCUMENTED

Decision:

Keep current RLS posture in place for production-dev.

Do not add table policies yet.

Reason:

The current backend-driven architecture does not require direct browser-to-table access.

Public launch remains on hold until a non-production RLS test confirms any future user-scoped policies.

---

## Launch Gate Impact

Production-dev readiness: PASS

Public launch readiness: HOLD

Hold reasons:

- User-scoped RLS policies are not yet tested.
- Supabase backup restore test is not yet performed.
- Direct frontend database access is not yet part of the authorized architecture.

