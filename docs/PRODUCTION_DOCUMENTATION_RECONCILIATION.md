# Citadel Nexus Production Documentation Reconciliation v1.0

## Purpose

This document reconciles the current Citadel Nexus production-dev documentation set.

The goal is to identify which documents are active operating sources, which documents are supporting references, which items are intentionally deferred, and which items remain launch blockers.

This document does not change runtime behavior.

---

## Reconciliation Date

Date: 2026-05-10

Environment: production-dev

Runtime surfaces:

- Public frontend: https://citadelnexus.app
- Backend API: https://api.citadelnexus.app
- Backend local port: 127.0.0.1:3001
- PM2 backend process: citadel-backend
- PM2 Discord runtime process: citadel-ascension
- PM2 log rotation module: pm2-logrotate
- Database platform: Supabase

---

## Source-of-Truth Hierarchy

### 1. Runtime Truth

Runtime truth is determined by live system checks:

- PM2 process state
- Backend health endpoint
- Database health endpoint
- Nginx config validation
- Firewall/listening-port state
- Git working tree state
- Supabase dashboard verification
- Discord Ascension runtime logs

Runtime truth overrides assumptions, old notes, or historical logs.

---

### 2. Repository Truth

Repository truth is determined by committed files on `main`.

The repo must remain clean after production-dev documentation changes.

Expected repository condition:

- Branch: main
- Remote: origin/main
- Working tree: clean
- Production docs committed and pushed

---

### 3. Documentation Truth

Documentation truth is determined by the current reconciled document set.

Older notes, screenshots, temporary command output, or local memory are not authoritative unless reflected in committed documentation.

---

## Active Production Documents

The following documents are considered active production-dev references.

### PRODUCTION_MONITORING_CHECKLIST.md

Classification: Active Operating Checklist

Purpose:

Defines repeatable daily and operational checks for:

- Backend API health
- Database health
- PM2 runtime health
- Discord Ascension runtime
- Git working tree status
- Public frontend verification

Status: CURRENT

Use when:

- Performing daily checks
- Verifying production-dev health
- Confirming basic runtime stability after changes

---

### PRODUCTION_RUNBOOK.md

Classification: Active Operating Runbook

Purpose:

Defines the current operating procedure for:

- Runtime surfaces
- PM2 processes
- Health checks
- Restart commands
- Boot persistence
- Logs
- Deployment procedure
- Current security boundaries
- Deferred activation areas

Status: CURRENT

Use when:

- Operating the backend droplet
- Restarting services
- Performing standard deployment
- Explaining current production-dev runtime structure

---

### PRODUCTION_LAUNCH_GATE_REVIEW.md

Classification: Active Launch Gate Review

Purpose:

Defines the production readiness state and launch gate constraints.

Status: CURRENT

Current launch posture:

- Production-dev readiness: PASS
- Public launch readiness: HOLD

Use when:

- Deciding whether public launch claims are allowed
- Reviewing remaining launch blockers
- Separating validated runtime from deferred production claims

---

### BACKUP_RECOVERY_INCIDENT_RESPONSE.md

Classification: Active Incident Response Baseline

Purpose:

Defines backup, recovery, and incident response procedures for:

- Server runtime
- GitHub recovery
- PM2 recovery
- Discord runtime recovery
- Incident severity levels
- First-response checklist

Status: CURRENT WITH PARTIAL BACKUP BASELINE

Use when:

- Something breaks
- Server recovery is needed
- Runtime process restoration is needed
- Incident classification is needed

Known limitation:

- Database backup/restore remains partially documented until Supabase restore testing is completed.

---

### SUPABASE_BACKUP_RESTORE_BASELINE.md

Classification: Active Database Backup Baseline

Purpose:

Defines Supabase backup and restore posture.

Status: CURRENT WITH HOLD

Current decision:

- Supabase managed backups remain the primary platform backup layer.
- Manual logical exports are required before risky backend/database changes.
- Restore testing must occur against a non-production Supabase project before public launch.
- Database backup baseline remains PARTIAL until restore testing confirms retention and recovery.

Use when:

- Reviewing database recovery readiness
- Preparing for risky schema/database work
- Deciding whether public launch is allowed

---

### SUPABASE_SECURITY_BASELINE.md

Classification: Active Supabase Security Baseline

Purpose:

Documents Supabase account, organization, dashboard, and project security posture.

Status: CURRENT

Confirmed:

- Owner account authenticator app is configured.
- No classic access tokens are currently created.
- Account audit logs are visible.
- Dashboard telemetry sharing is disabled.
- Edit entities in SQL is disabled.
- Queue table operations is disabled.
- GitHub identity connection exists at account level.
- Project-level GitHub integration remains not connected.

Use when:

- Reviewing Supabase account security
- Checking dashboard-level risk
- Confirming GitHub integration scope
- Preparing for future public launch security review

Remaining recommendation:

- Confirm recovery codes are saved offline.
- Consider a second authenticator app on a separate trusted device if available.

---

### RLS_ACCESS_MODEL.md

Classification: Active Access Model Design

Purpose:

Defines intended Row Level Security posture before any policy changes are made.

Status: DOCUMENTED

Current decision:

- Keep current RLS posture in place for production-dev.
- Do not add table policies yet.
- Do not allow direct browser-to-table access.
- Treat current RLS enabled/no-policy state as intentionally restrictive for production-dev.

Use when:

- Reviewing Supabase Security Advisor RLS notices
- Deciding whether RLS policies should be added
- Planning future authenticated user-scoped access
- Preventing accidental broad public policies

Current launch impact:

- Production-dev readiness: PASS
- Public launch readiness: HOLD

---

## Supporting Runtime Facts

The following runtime facts have been verified during the hardening pass.

### Backend API

Status: PASS

Confirmed:

- Backend responds at https://api.citadelnexus.app
- `/health` returns HTTP 200
- `/health` returns status healthy
- `/health/db` returns HTTP 200
- `/health/db` returns status connected
- Root route returns Citadel Nexus Backend Running
- Backend process is managed by PM2 as `citadel-backend`

---

### Database

Status: PASS

Confirmed:

- Supabase project is healthy.
- Database health endpoint confirms connected status.
- Supabase dashboard shows project healthy.
- Database usage is low.
- Storage usage is zero or minimal.
- Free plan does not include scheduled project backups.

Known limitation:

- Restore test has not yet been performed.
- Public launch remains on hold until restore testing is complete.

---

### Discord Ascension Runtime

Status: PASS

Confirmed:

- PM2 process `citadel-ascension` is online.
- Runtime logs show Ascension bot online.
- Runtime logs show Prisma/Supabase connection verified.
- Runtime logs show Phase 1 caps active.

Current boundary:

- Discord is an interface.
- Discord does not define backend truth.

---

### PM2

Status: PASS

Confirmed:

- `citadel-backend` online
- `citadel-ascension` online
- `pm2-logrotate` online
- PM2 saved process list exists
- pm2-deploy systemd service active/running
- Boot persistence is active

---

### Nginx

Status: PASS

Confirmed:

- Nginx config test passes.
- HTTPS reverse proxy is active.
- API routes proxy to local backend service.
- Security headers are present on HTTPS API responses.
- Local backend service is bound to 127.0.0.1:3001.

Security headers confirmed:

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: no-referrer
- Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
- Strict-Transport-Security: max-age=31536000; includeSubDomains

---

### Firewall and Ports

Status: PASS

Confirmed:

- UFW is active.
- Incoming default is deny.
- Outgoing default is allow.
- Public inbound access is limited to SSH and Nginx HTTP/HTTPS.
- Backend port 3001 is bound locally to 127.0.0.1 only.

Expected public ports:

- 22
- 80
- 443

Expected local-only backend port:

- 127.0.0.1:3001

---

### GitHub / Repository

Status: PASS

Confirmed:

- Repository is on main.
- Branch is up to date with origin/main.
- Documentation files have been committed and pushed.
- Working tree should remain clean after reconciliation commit.

---

## Current Deferred Items

The following are intentionally deferred and must not be activated without separate authorization.

### Economy / Token / Utility

- CNX utility enforcement
- Wallet entitlement logic
- Payout automation
- Prize-pool automation
- NFT-gated access
- Token-gated access

Status: DEFERRED

Reason:

These require stronger backend contracts, verification logic, abuse controls, recovery procedures, and explicit Command approval.

---

### Discord Automation

- Automatic Discord role mutation
- CNX-linked Discord role effects
- NFT-linked Discord role effects
- Wallet-linked Discord role effects

Status: DEFERRED

Reason:

Discord must remain a display/interface layer until backend truth and role mutation contracts are approved.

---

### Public Launch Claims

- Production public launch claims
- Public reliability claims
- Public database recovery claims
- Public entitlement/security claims
- Public token utility claims

Status: DEFERRED

Reason:

Production-dev is operational, but public launch remains on hold pending backup/restore and policy testing.

---

## Active Launch Blockers

The following items block public launch readiness.

### 1. Supabase Restore Test Not Performed

Status: BLOCKER

Required before public launch:

- Create or designate non-production restore target.
- Confirm backup/export method.
- Perform restore test.
- Confirm recovered schema/data.
- Document recovery time and recovery point assumptions.

---

### 2. User-Scoped RLS Policies Not Tested

Status: BLOCKER

Required before public launch if direct frontend Supabase access is used:

- Define auth identity mapping.
- Define user-to-record ownership mapping.
- Test policies in non-production project.
- Confirm no cross-user data exposure.
- Confirm no anonymous data exposure.
- Document tested policies.

If direct frontend Supabase access remains unused, this can stay deferred, but public launch documentation must state that all client data access goes through backend-controlled routes.

---

### 3. Public Claims Not Yet Authorized

Status: BLOCKER

Required before public launch:

- Define what can be publicly claimed.
- Separate live facts from roadmap items.
- Remove or qualify any unproven launch/security/economy claims.
- Confirm no utility promise exceeds implemented system behavior.

---

## Current Production-Dev Decision

Status: PASS

Citadel Nexus production-dev runtime is considered operational for controlled internal development and testing.

Confirmed:

- Backend API is online.
- Database connectivity is healthy.
- Discord Ascension runtime is online.
- PM2 persistence is active.
- Nginx reverse proxy is active.
- Security headers are active.
- Firewall posture is acceptable.
- Backend port is local-only.
- Documentation baseline exists.
- RLS access model is documented.
- Supabase security baseline is documented.
- Backup/recovery baseline exists but remains partial for database restore.

---

## Current Public Launch Decision

Status: HOLD

Public launch is not yet authorized.

Primary hold reasons:

- Supabase restore test is not complete.
- RLS/user-scoped access is not tested for public frontend database access.
- Public claims have not been reconciled against validated live system behavior.
- Free-plan Supabase backup limitations must be acknowledged and mitigated.

---

## Next Required Step

Step 21 should focus on final launch-blocker sequencing.

Recommended next step:

Step 21 — Public Launch Blocker Register and Remediation Plan

Goal:

Create one document that lists every remaining blocker, owner, risk level, required action, and pass/fail criteria before public launch can be approved.

