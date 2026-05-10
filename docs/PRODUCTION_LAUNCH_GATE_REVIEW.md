# Citadel Nexus Production Launch Gate Review v1.0

## Purpose

This document records the production readiness audit for the current Citadel Nexus production-dev system.

This is a launch gate review, not a public launch approval.

The purpose is to confirm which systems are operational, which systems are intentionally deferred, and what must remain blocked before public launch.

---

## Review Scope

This review covers:

- Public frontend availability
- Backend API availability
- Database health
- Discord Ascension runtime
- PM2 process persistence
- Log rotation
- Nginx reverse proxy
- Security headers
- Firewall posture
- Git repository state
- Disabled development surfaces
- Deferred utility and automation features

---

## Current Runtime Surfaces

### Public Frontend

- Domain: https://citadelnexus.app
- Status: Online
- Role: Public-facing entry surface

### Backend API

- Domain: https://api.citadelnexus.app
- Local service port: 3001
- Public access path: Nginx reverse proxy only
- PM2 process: citadel-backend
- Status: Online

### Discord Ascension Runtime

- Discord bot: Ascension Command
- PM2 process: citadel-ascension
- Status: Online

### PM2 Support Module

- Module: pm2-logrotate
- Status: Online

---

## Source of Truth Boundaries

The following boundaries are active:

- Backend is the source of truth.
- Discord is an interface only.
- Frontend reflects backend-defined state.
- Discord roles do not define backend truth.
- Local development machine is not required for runtime operation.
- Backend API and Discord Ascension runtime run as separate PM2 processes.

---

## Operational Pass Criteria

The system is considered production-dev operational when:

- Frontend loads publicly.
- Backend API `/health` returns HTTP 200.
- Backend API `/health/db` returns HTTP 200.
- Database health reports connected.
- citadel-backend is online in PM2.
- citadel-ascension is online in PM2.
- pm2-logrotate is online in PM2.
- PM2 systemd service is active and enabled.
- Backend service is bound to localhost only.
- Nginx proxies public API traffic to localhost.
- UFW denies inbound by default.
- UFW allows only SSH and Nginx web traffic.
- Security headers are present on HTTPS API responses.
- Git working tree is clean.
- Git branch is synced with origin/main.
- Temporary dev-login remains disabled.

---

## Current Validation Status

Status: PASS

Confirmed:

- Public frontend is online.
- Backend API is online.
- Backend health endpoint is active.
- Database health endpoint is active.
- Database reports connected.
- Discord Ascension runtime is online.
- PM2 process list is saved.
- PM2 systemd service is enabled and running.
- pm2-logrotate is installed and online.
- Nginx reverse proxy is active.
- Security headers are present.
- Backend service listens on 127.0.0.1:3001.
- Firewall is active.
- Git working tree is clean.
- Repository is synced with origin/main.
- Temporary dev-login is disabled.

---

## Security Header Baseline

Expected public API security headers:

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: no-referrer
- Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
- Strict-Transport-Security: max-age=31536000; includeSubDomains

Status: PASS

---

## Network Exposure Baseline

Expected exposed inbound services:

- 22/tcp for SSH
- 80/tcp for HTTP redirect
- 443/tcp for HTTPS

Expected backend binding:

- 127.0.0.1:3001 only

Status: PASS

---

## Deferred Systems

The following systems remain deferred and may not be activated without separate Command approval:

- CNX utility enforcement
- Wallet entitlement logic
- Payout automation
- Automatic Discord role mutation
- NFT-gated access
- Production public launch claims
- Paid access logic
- Token-based gating
- Public reward guarantees
- Automated treasury movement

Status: BLOCKED UNTIL AUTHORIZED

---

## Launch Gate Result

Current system status:

PASS FOR CONTROLLED PRODUCTION-DEV OPERATION

Current public launch status:

NOT YET APPROVED FOR FULL PUBLIC LAUNCH

Reason:

The runtime is operational and hardened, but several governance, legal, economic, wallet, role mutation, payout, and public-claims boundaries remain deferred.

This system may remain online for controlled validation, internal testing, Discord command testing, and infrastructure monitoring.

It should not yet be marketed as a fully launched public economy, token utility system, NFT entitlement system, payout system, or automated role-gated platform.

---

## Required Before Public Launch

Before public launch, complete:

1. Public claims review
2. Terms and disclaimers review
3. Privacy policy review
4. Discord public onboarding review
5. Wallet trust-boundary review
6. CNX utility activation review
7. Role mutation authorization review
8. Payout automation authorization review
9. Incident response procedure
10. Backup and restore procedure
11. Admin access review
12. Monitoring escalation procedure

---

## Final Review Determination

Production-dev runtime: PASS

Public launch gate: HOLD

Recommended next status:

Controlled Online Validation

