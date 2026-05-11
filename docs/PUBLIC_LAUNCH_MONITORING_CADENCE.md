# Citadel Nexus Public Launch Monitoring Cadence v1.0

## Purpose

This document defines the monitoring cadence for Citadel Nexus during controlled production-dev operation and limited public launch preparation.

The goal is to detect outages, configuration drift, security warnings, runtime failures, unexpected public exposure, and backup/recovery issues early.

This document does not add automated monitoring by itself.

---

## Current Launch Position

Production-dev readiness:

    PASS

Public launch readiness:

    HOLD

Reason:

    Monitoring cadence must be documented before final launch approval.

---

## Monitoring Philosophy

Citadel Nexus will use a lightweight monitoring cadence before adding heavier paid or automated observability tooling.

Initial monitoring is operator-driven and checklist-based.

Monitoring priorities:

1. Confirm the public API is reachable.
2. Confirm the database health check is connected.
3. Confirm PM2 runtime processes are online.
4. Confirm Ascension bot remains online.
5. Confirm Nginx and firewall posture are valid.
6. Confirm Supabase advisor status remains clean enough for launch posture.
7. Confirm no public launch blockers have regressed.
8. Confirm Git status remains clean after production changes.
9. Confirm no backup or restore artifacts are tracked by Git.
10. Confirm public launch surface remains limited to approved features.

---

## Monitoring Roles

Primary operator:

    Backend operator / deploy user

Responsibilities:

- Run daily checks during active launch preparation.
- Run weekly checks during controlled production-dev.
- Record major findings in project documentation or issue tracker.
- Escalate any critical finding before continuing public launch work.

Secondary reviewer:

    Project owner / Command review

Responsibilities:

- Review launch blocker changes.
- Approve security-impacting changes.
- Approve public surface changes.
- Approve changes to recovery expectations.

---

## Daily Monitoring Cadence

Daily checks are required during active public launch preparation and the first 7 days after limited public launch.

Estimated time:

    5-10 minutes

Required daily checks:

1. API health check.
2. Database health check.
3. PM2 process check.
4. Ascension log spot-check.
5. Backend log spot-check.
6. Nginx config validation.
7. Git status check.
8. Public route behavior check.
9. Supabase dashboard quick check when practical.

---

## Weekly Monitoring Cadence

Weekly checks are required during production-dev and after the initial launch window.

Estimated time:

    15-30 minutes

Required weekly checks:

1. Full API health verification.
2. Full PM2 runtime verification.
3. Nginx validation.
4. UFW exposure verification.
5. Supabase Security Advisor review.
6. Supabase Performance Advisor review.
7. Supabase usage/quota review.
8. Backup artifact check.
9. Git clean state check.
10. Public launch blocker register review.
11. Public feature scope review.
12. Incident response document review if any incidents occurred.

---

## Daily Command Checklist

Run from the backend server:

    cd /home/deploy/apps/citadel-nexus-backend

### 1. Git Clean Check

    git status

Expected:

    Your branch is up to date with 'origin/main'.
    nothing to commit, working tree clean

Failure trigger:

    Unexpected modified or untracked files.

Action:

    Identify the file.
    Do not commit blindly.
    Confirm whether it is intended documentation, code, backup artifact, or accidental terminal artifact.

---

### 2. PM2 Runtime Check

    pm2 status

Expected:

    citadel-backend online
    citadel-ascension online

Failure trigger:

    stopped, errored, repeated restarts, high restart count, unstable memory growth.

Action:

    Check logs before restarting.
    Restart only the affected process if needed.

---

### 3. Backend Logs

    pm2 logs citadel-backend --lines 80

Expected:

    No active repeated errors.
    No crash loop.
    No secret exposure.
    No unexpected public access pattern.

Failure trigger:

    Repeated 500 errors.
    Database connection errors.
    Authentication/session errors that affect approved routes.
    Secret/token appearing in logs.

Action:

    Classify severity.
    Stop changes.
    Document the issue.
    Rotate secrets if exposure occurs.

---

### 4. Ascension Logs

    pm2 logs citadel-ascension --lines 80

Expected:

    Bot online.
    Prisma/Supabase connection verified.
    Phase 1 caps active.
    No repeated command errors.

Failure trigger:

    Bot offline.
    Discord login failure.
    Prisma/Supabase connection failure.
    Phase 1 caps missing.
    Repeated command exceptions.

Action:

    Treat bot offline or missing caps as Severity 1 or Severity 2 depending on public exposure.

---

### 5. Public API Health

    curl -i https://api.citadelnexus.app/health -H "Origin: https://citadelnexus.app"

Expected:

    HTTP/1.1 200 OK
    service: citadel-backend
    status: healthy
    environment: production

Failure trigger:

    Non-200 response.
    Timeout.
    Missing security headers.
    Wrong CORS origin behavior.
    Unexpected environment label.

Action:

    Check Nginx, PM2, backend logs, DNS, and firewall.

---

### 6. Database Health

    curl -i https://api.citadelnexus.app/health/db -H "Origin: https://citadelnexus.app"

Expected:

    HTTP/1.1 200 OK
    service: citadel-database
    status: connected
    environment: production

Failure trigger:

    Non-200 response.
    Timeout.
    Database disconnected.
    Supabase connection error.

Action:

    Check backend logs, Supabase status, environment variables, and connection string validity without exposing secrets.

---

### 7. Session Boundary Check

    curl -i https://api.citadelnexus.app/session/me -H "Origin: https://citadelnexus.app"

Expected without valid cookie:

    HTTP/1.1 401 Unauthorized
    No active session

Failure trigger:

    200 without a valid session.
    User data returned without authentication.
    Server error.

Action:

    Treat as security issue.
    Do not continue public launch until resolved.

---

### 8. Member-State Boundary Check

    curl -i https://api.citadelnexus.app/member-state/me -H "Origin: https://citadelnexus.app"

Expected without valid cookie:

    HTTP/1.1 401 Unauthorized
    No active session

Failure trigger:

    200 without a valid session.
    Member data returned without authentication.
    Server error.

Action:

    Treat as security issue.
    Do not continue public launch until resolved.

---

### 9. Nginx Validation

    sudo nginx -t

Expected:

    syntax is ok
    test is successful

Failure trigger:

    Any Nginx config error.

Action:

    Do not reload Nginx until fixed.
    Restore last known-good config if needed.

---

### 10. Firewall Check

    sudo ufw status verbose

Expected:

    SSH allowed
    HTTPS allowed
    No public backend app port exposed

Failure trigger:

    Backend app port exposed publicly.
    Unrecognized ports open.
    UFW inactive.

Action:

    Treat as security issue.
    Correct firewall posture before launch activity continues.

---

## Weekly Supabase Dashboard Checks

Perform from Supabase dashboard.

### Security Advisor

Expected production status:

    0 errors
    0 warnings

Allowed production info items:

    RLS Enabled No Policy

Reason allowed:

    Current architecture blocks direct public Supabase table access and relies on backend/runtime credentials.

Failure trigger:

    Any production error.
    Any production warning.
    New exposed function warnings.
    New permissive policy warning.
    New auth/security warnings.

Action:

    Document, classify, and resolve or update launch gate before public launch.

---

### Performance Advisor

Expected:

    No critical performance issues.

Currently acceptable:

    Unused index info items may exist during low-traffic production-dev.

Failure trigger:

    Slow query growth.
    Repeated expensive queries.
    Connection saturation.
    Resource pressure.

Action:

    Document and review query behavior.

---

### Usage / Quotas

Check:

- Database size.
- Egress.
- Monthly active users.
- Storage size.
- Realtime usage.
- Edge function usage.
- Connection usage.

Failure trigger:

    Usage approaching free-plan limits.
    Unexpected storage growth.
    Unexpected egress.
    Unexpected active users.
    Database size growth without explanation.

Action:

    Decide whether to reduce usage, clean data, or upgrade.

---

### Backups

Current Free plan limitation:

    Scheduled Supabase backups are not included.

Current production-dev strategy:

    Manual export plus restore-test validation.

Weekly check:

    Confirm whether a newer manual export is required.

Failure trigger:

    Major schema change.
    Major data change.
    Pre-launch milestone.
    Before risky production migration.

Action:

    Perform new manual export using secret-safe procedure.

---

## Weekly Git and Backup Artifact Checks

Run:

    git status
    git --no-pager log --oneline -5
    git check-ignore -v backups/ 2>/dev/null || true
    find backups -maxdepth 2 -type f 2>/dev/null | head -20

Expected:

    Git clean.
    Backup files ignored.
    No backup artifacts staged.
    No database URLs in committed docs.

Failure trigger:

    Backup files appear in Git status.
    Dump files staged.
    SQL export files staged.
    Secrets found in docs.

Action:

    Stop immediately.
    Remove from staging.
    Rotate secret if committed.
    Rewrite history only if necessary and approved.

---

## Public Launch Surface Checks

Weekly and before any public announcement, confirm:

- Public site exposes only approved pages.
- Public API exposes only approved routes.
- Session routes return 401 without valid session.
- Admin routes are not public.
- Direct Supabase table access is not used by frontend.
- Discord public channels match approved public scope.
- Ascension public commands are limited to approved Phase 1 commands.
- No CNX utility is live.
- No payouts are live.
- No wallet-gated utility is live.
- No NFT-gated utility is live.
- No public admin tooling is live.

---

## Escalation Severity

### Severity 1 — Critical

Examples:

- API down.
- Database health down.
- Bot down during public activity.
- Secret exposed.
- Public unauthenticated access to protected data.
- Admin function exposed publicly.
- Payout/treasury function publicly reachable.
- Backend port exposed publicly.

Required response:

    Stop launch activity.
    Capture evidence.
    Fix or roll back.
    Rotate secrets if needed.
    Update incident log.
    Do not resume until validated.

---

### Severity 2 — Major

Examples:

- One route failing.
- Repeated 500 errors.
- Discord command failures.
- Supabase warning appears.
- Nginx warning.
- PM2 repeated restarts.
- Unexpected CORS issue from valid origin.

Required response:

    Investigate same day.
    Fix one issue at a time.
    Document resolution.
    Re-test affected route/process.

---

### Severity 3 — Minor

Examples:

- Documentation typo.
- Old log noise.
- Unused index info during low traffic.
- Expected 401 from protected route.
- Restore-test-only warning already documented.

Required response:

    Document if useful.
    Monitor.
    Resolve during normal maintenance.

---

## Monitoring Record Format

When recording a monitoring check, use this format:

    Date:
    Operator:
    Check type:
    API health:
    DB health:
    PM2:
    Ascension:
    Nginx:
    UFW:
    Supabase advisor:
    Supabase usage:
    Git status:
    Issues found:
    Actions taken:
    Launch gate impact:

---

## Current Monitoring Decision

Status:

    DOCUMENTED

Daily launch-prep monitoring:

    REQUIRED

Weekly production-dev monitoring:

    REQUIRED

Automated monitoring:

    DEFERRED

Paid monitoring tools:

    DEFERRED

Public launch readiness:

    HOLD

Reason:

    Incident operator checklist and final launch approval remain open.

---

## Step 35 Status

Status:

    PASS

Monitoring cadence documented:

    YES

Daily checks documented:

    YES

Weekly checks documented:

    YES

Supabase checks documented:

    YES

Escalation severity documented:

    YES

Production-dev readiness:

    PASS

Public launch readiness:

    HOLD

Remaining public launch blockers:

- Incident operator checklist.
- Final launch approval.
