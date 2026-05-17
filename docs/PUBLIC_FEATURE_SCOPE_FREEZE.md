# Citadel Nexus Public Feature Scope Freeze v1.0

## Purpose

This document defines the approved public feature surface for the first Citadel Nexus public launch phase.

The goal is to prevent accidental exposure of unfinished, unsafe, untested, or internally scoped systems.

This document does not change production code by itself.

This document defines what is approved, deferred, blocked, or internal-only for launch planning.

---

## Current Launch Position

Production-dev readiness:

    PASS

Public launch readiness:

    HOLD

Reason:

    Public feature scope must be frozen before final monitoring, incident, and launch approval work.

---

## Scope Freeze Decision

Current decision:

    CONTROLLED LIMITED PUBLIC LAUNCH ONLY

Citadel Nexus may publicly expose a limited, read-only, low-risk surface.

Citadel Nexus must not expose live economy, payout, entitlement mutation, wallet-gated utility, NFT-gated utility, or automated role mutation as public launch features until those systems receive separate approval.

---

## Approved Public Launch Surface

The following are approved for the first public-facing launch scope.

### Public Website / App Surface

Approved:

- Public homepage.
- Public project explanation pages.
- Public roadmap or status pages.
- Public documentation pages.
- Public terms/rules/disclaimer pages.
- Public static or read-only marketing content.
- Public Discord invite link, if intentionally enabled.
- Public non-sensitive health/status messaging, if exposed through a user-facing status page.

Not approved:

- Public admin dashboard.
- Public database table browser.
- Public direct Supabase table access.
- Public payout dashboard.
- Public treasury dashboard.
- Public wallet entitlement editor.
- Public backend mutation tools.
- Public role mutation tools.

---

### Public API Surface

Approved:

- Root API status route.
- Health endpoint.
- Database health endpoint for internal/controlled checks only.
- Session endpoint returning unauthorized when no valid session exists.
- Member-state endpoint returning unauthorized when no valid session exists.
- Other explicitly documented read-only public routes only.

Approved current behavior:

- `/health` returns healthy.
- `/health/db` returns connected.
- `/session/me` returns `401 No active session` without cookie.
- `/member-state/me` returns `401 No active session` without cookie.

Not approved:

- Public unauthenticated user listing.
- Public unauthenticated entitlement listing.
- Public unauthenticated wallet lookup.
- Public unauthenticated payout lookup.
- Public unauthenticated admin action access.
- Public unauthenticated Discord role sync mutation.
- Public unauthenticated gameplay mutation.
- Public unauthenticated treasury mutation.

---

### Discord Public Surface

Approved:

- Public server information channels.
- Public onboarding/rules channels.
- Public roadmap/status channels.
- Public announcements.
- Public community discussion channels, if moderation coverage exists.
- Read-only documentation channels.
- Staff-post-only progress logs.

Approved with caution:

- Basic Discord bot commands that do not create financial, entitlement, payout, wallet, or role-sync consequences.
- Basic status-style commands that do not expose private records.

Not approved:

- Public CNX-gated access enforcement.
- Public wallet-gated role mutation.
- Public payout automation.
- Public prize-pool claims.
- Public NFT-gated utility.
- Public admin commands.
- Public backend state mutation commands beyond approved gameplay MVP.
- Any command that bypasses backend authority.

---

### Citadel Ascension Public Surface

Approved:

- Limited Phase 1 gameplay only if already validated and intentionally enabled.
- `/start`
- `/claim`
- `/mission`
- `/build`
- `/status`

Conditions:

- Phase 1 caps remain active.
- Backend/runtime remains source of truth.
- No CNX payout automation is enabled.
- No production treasury movement is enabled.
- No NFT entitlement enforcement is enabled.
- No public wallet spending is enabled.
- No irreversible state mutation is exposed without tested rollback.

Not approved:

- CNX spending.
- CNX rewards payout.
- Wallet-bound claiming.
- NFT-bound claiming.
- Prize-pool redemption.
- Token-gated advantages.
- Automated public role mutation tied to ownership.
- Founder/admin controls exposed publicly.
- Experimental commands not included in the Phase 1 command set.

---

## Internal-Only Systems

The following systems are internal-only for first public launch:

- Supabase dashboard.
- Restore-test Supabase project.
- Production database connection strings.
- Restore-test database connection strings.
- GitHub repository write access.
- PM2 runtime controls.
- Nginx configuration.
- Server SSH access.
- Database export/restore process.
- Admin commands.
- Role sync tooling.
- Payout tooling.
- Treasury tooling.
- Wallet verification tooling.
- NFT entitlement tooling.
- Project-level Supabase GitHub automation.
- Supabase service-role credentials.
- Discord bot token.
- Any .env file.

---

## Deferred Features

The following are explicitly deferred:

- Live CNX token utility.
- Live CNX spending.
- Live CNX payouts.
- Live prize-pool redemption.
- NFT-gated benefits.
- Wallet-based access enforcement.
- Automated ownership-based Discord roles.
- Public reputation passport.
- Public TrustLayer credential issuance.
- Public MCAOS automation.
- Public admin dashboard.
- Public user account portal.
- Direct browser-to-Supabase table access.
- Supabase Auth user-scoped RLS policies.
- Paid/premium tiers.
- Stripe/Gumroad/Ko-fi production-linked entitlement automation.
- Storage bucket production usage.
- Public API keys or developer API access.

---

## Public Messaging Boundaries

Approved public messaging:

- Citadel Nexus is in a controlled early production-dev phase.
- Core infrastructure is live.
- Backend health and database connectivity are validated.
- Ascension runtime exists and is operational internally.
- Backup, restore, and recovery procedures have been tested for production-dev.
- Public launch is staged and controlled.

Not approved public messaging:

- Do not claim full public launch until final approval.
- Do not claim live CNX utility if utility is not enabled.
- Do not claim NFT gating is live if it is deferred.
- Do not claim payouts are live if payouts are not enabled.
- Do not claim automated wallet roles are live if role mutation is not public.
- Do not claim SLA-grade recovery until timed and approved.
- Do not claim Supabase automatic backups if remaining on Free plan.
- Do not claim users can access dashboards or accounts unless those flows are enabled.

---

## Public Access Control Rules

Rules:

1. Public users may only access approved public website, public Discord, and approved public API surfaces.
2. Public users may not directly access Supabase application tables.
3. Public users may not access admin tools.
4. Public users may not trigger treasury, payout, wallet, entitlement, or NFT state changes.
5. Public users may not receive financial benefit automation unless separately approved.
6. Public users may not depend on undocumented commands or features.
7. Internal-only systems must remain internal-only until separately reviewed.

---

## Launch Surface Risk Classification

| Surface | Launch Status | Risk Level | Notes |
|---|---:|---:|---|
| Public website/static pages | APPROVED | Low | Must remain informational/read-only. |
| API `/health` | APPROVED | Low | Safe public health signal. |
| API `/health/db` | CONTROLLED | Low/Medium | Useful for checks; avoid overexposing operational detail later. |
| API `/session/me` without cookie | APPROVED | Low | Expected 401 response. |
| API `/member-state/me` without cookie | APPROVED | Low | Expected 401 response. |
| Discord public channels | APPROVED | Medium | Requires moderation. |
| Ascension Phase 1 commands | APPROVED WITH CONDITIONS | Medium | Caps must remain active. |
| Admin commands | BLOCKED | Critical | Internal only. |
| Payout automation | BLOCKED | Critical | Not public. |
| Wallet utility | DEFERRED | High | Needs signature/revalidation model. |
| NFT utility | DEFERRED | High | Needs entitlement contract. |
| Direct Supabase access | BLOCKED | High | RLS/user-scoped policies not approved. |
| Public account portal | DEFERRED | Medium/High | Auth and RLS not finalized. |
| Storage uploads | DEFERRED | Medium | Not production-used. |

---

## Required Pre-Launch Checks

Before public launch approval, confirm:

- Public website/app only exposes approved pages/routes.
- API unauthenticated routes behave as documented.
- Session-protected routes return 401 without valid session.
- Admin routes are inaccessible publicly.
- Discord public channels match approved structure.
- Ascension public commands match approved Phase 1 command set only.
- Phase 1 caps are active.
- No payout automation is enabled.
- No CNX utility is enabled.
- No wallet-gated utility is enabled.
- No NFT-gated utility is enabled.
- No direct browser-to-Supabase table access is enabled.
- Public messaging matches actual system status.

---

## Public Launch Scope Decision

Status:

    FROZEN FOR LIMITED PUBLIC LAUNCH PLANNING

Approved launch type:

    Controlled limited public launch

Not approved:

    Full public economy launch
    Full token utility launch
    Full NFT utility launch
    Full payout launch
    Full user portal launch
    Public admin launch

---

## Step 34 Status

Status:

    PASS

Public feature scope documented:

    YES

Approved public surfaces documented:

    YES

Blocked surfaces documented:

    YES

Deferred features documented:

    YES

Public messaging boundaries documented:

    YES

Production-dev readiness:

    PASS

Public launch readiness:

    HOLD

Remaining public launch blockers:

- Monitoring cadence.
- Incident operator checklist.
- Final launch approval.
