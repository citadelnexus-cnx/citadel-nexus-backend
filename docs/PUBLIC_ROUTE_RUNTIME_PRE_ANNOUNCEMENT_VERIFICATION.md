# Citadel Nexus Public Route and Runtime Pre-Announcement Verification v1.0

## Purpose

This document records the final live route and runtime checks before posting the controlled limited public launch announcement.

This verification confirms that the public runtime still matches the approved limited launch scope.

---

## Source Documents

Required source documents:

- docs/FINAL_PUBLIC_LAUNCH_GATE_RECONCILIATION.md
- docs/PUBLIC_FEATURE_SCOPE_FREEZE.md
- docs/PUBLIC_LAUNCH_MONITORING_CADENCE.md
- docs/INCIDENT_OPERATOR_CHECKLIST.md
- docs/PUBLIC_LAUNCH_ANNOUNCEMENT_PACKAGE.md

---

## Current Approved Launch Position

Production-dev readiness:

    PASS

Controlled limited public launch:

    APPROVED WITH CONDITIONS

Full public launch:

    NOT APPROVED

Economy/token/NFT/payout launch:

    NOT APPROVED

---

## Verification Requirements

Before any public announcement is posted, confirm:

1. Git working tree is clean.
2. API health route returns 200.
3. Database health route returns 200.
4. Protected session route returns 401 without valid session.
5. Protected member-state route returns 401 without valid session.
6. PM2 backend runtime is online.
7. PM2 Ascension runtime is online if public commands are enabled.
8. Nginx config validates.
9. Firewall does not expose backend app port publicly.
10. Supabase production advisor has no launch-blocking errors or warnings.
11. Public launch messaging still matches the approved announcement package.
12. No CNX, NFT, wallet, payout, treasury, or entitlement mutation path is public.

---

## Live Verification Results

### Git Status

Status:

    PASS

Expected:

    Branch up to date with origin/main.
    Working tree clean.

---

### API Health

Route:

    https://api.citadelnexus.app/health

Expected:

    HTTP 200
    status healthy
    production environment
    approved security headers present

Status:

    PASS

---

### Database Health

Route:

    https://api.citadelnexus.app/health/db

Expected:

    HTTP 200
    status connected
    production environment

Status:

    PASS

---

### Session Boundary

Route:

    https://api.citadelnexus.app/session/me

Expected without valid cookie:

    HTTP 401
    No active session

Status:

    PASS

---

### Member-State Boundary

Route:

    https://api.citadelnexus.app/member-state/me

Expected without valid cookie:

    HTTP 401
    No active session

Status:

    PASS

---

### PM2 Runtime

Expected:

    citadel-backend online
    citadel-ascension online if public commands are enabled

Status:

    PASS

---

### Nginx

Expected:

    nginx config syntax ok
    nginx config test successful

Status:

    PASS

---

### Firewall

Expected:

    SSH allowed
    HTTPS allowed
    Backend app port not publicly exposed

Status:

    PASS

---

### Supabase Production Advisor

Expected:

    No production launch-blocking errors.
    No production launch-blocking warnings.

Status:

    PASS

Notes:

    Production Security Advisor shows no errors and no warnings.
    RLS Enabled No Policy items remain informational under the approved backend-only limited launch model.
    Performance Advisor shows no errors and no warnings.
    Usage/quota is not near current Free plan limits.

---

### Public Launch Scope

Expected:

    Controlled limited public launch only.
    No full launch claims.
    No CNX utility claims.
    No NFT utility claims.
    No wallet-gated access claims.
    No payout claims.

Status:

    PASS

---

## Step 39 Status

Status:

    PASS

Production-dev readiness:

    PASS

Public launch readiness:

    APPROVED WITH CONDITIONS

Announcement posting:

    ALLOWED AFTER FINAL HUMAN CONFIRMATION
