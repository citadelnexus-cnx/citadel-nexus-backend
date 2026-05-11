# Citadel Nexus Incident Operator Checklist v1.0

## Purpose

This document defines the emergency operator checklist for Citadel Nexus production-dev and limited public launch operations.

The goal is to provide a fast, clear response path for outages, security exposure, failed deploys, restore events, Git mistakes, and launch rollback decisions.

This checklist is designed for immediate operator action.

---

## Current Launch Position

Production-dev readiness:

    PASS

Public launch readiness:

    HOLD

Reason:

    Incident operator checklist must be documented before final launch approval.

---

## Core Incident Rule

When an incident occurs:

    Stop changing multiple things at once.

Use this order:

1. Stabilize.
2. Identify.
3. Contain.
4. Fix or roll back.
5. Verify.
6. Document.
7. Resume only after validation.

---

## Severity Levels

### Severity 1 — Critical

Examples:

- Public API is down.
- Database health is down.
- Secret/token/password exposed.
- Unauthenticated user can access protected data.
- Admin route or admin command exposed publicly.
- Backend app port exposed directly to the internet.
- Payout/treasury/wallet mutation path exposed publicly.
- Production deploy broke the public surface.
- Bot is down during public launch activity.

Required response:

    Stop public launch activity immediately.
    Do not add new features.
    Do not continue launch promotion.
    Contain the issue first.
    Document evidence and resolution.

---

### Severity 2 — Major

Examples:

- One protected route returns 500.
- One public route fails.
- PM2 process restarts repeatedly.
- Discord bot command fails repeatedly.
- Nginx config warning or reload failure.
- Supabase advisor warning appears in production.
- Unexpected CORS behavior.
- Database performance degradation.

Required response:

    Investigate same day.
    Fix one issue at a time.
    Re-test the affected path.
    Document the result.

---

### Severity 3 — Minor

Examples:

- Documentation typo.
- Expected 401 response.
- Old log noise.
- Restore-test-only warning already documented.
- Low-traffic unused index info item.
- Cosmetic issue with no security or data impact.

Required response:

    Track if needed.
    Resolve during normal maintenance.

---

## Emergency First Commands

Run from the backend server:

    cd /home/deploy/apps/citadel-nexus-backend

### 1. Confirm Git State

    git status
    git --no-pager log --oneline -5

Purpose:

    Confirm whether the server code is clean and identify the latest deployed/documented commit.

---

### 2. Check PM2 Runtime

    pm2 status

Expected:

    citadel-backend online
    citadel-ascension online

If one process is down:

    pm2 logs <process-name> --lines 120

Do not restart before checking logs unless the outage is already confirmed and urgent.

---

### 3. Check Backend Health

    curl -i https://api.citadelnexus.app/health -H "Origin: https://citadelnexus.app"

Expected:

    HTTP/1.1 200 OK

Failure:

    Treat as Severity 1 if public launch is active.

---

### 4. Check Database Health

    curl -i https://api.citadelnexus.app/health/db -H "Origin: https://citadelnexus.app"

Expected:

    HTTP/1.1 200 OK

Failure:

    Treat as Severity 1 if public launch is active.

---

### 5. Check Auth Boundary

    curl -i https://api.citadelnexus.app/session/me -H "Origin: https://citadelnexus.app"

Expected without valid cookie:

    HTTP/1.1 401 Unauthorized
    No active session

If this returns 200 without a valid session:

    Treat as Severity 1 security incident.

---

### 6. Check Member-State Boundary

    curl -i https://api.citadelnexus.app/member-state/me -H "Origin: https://citadelnexus.app"

Expected without valid cookie:

    HTTP/1.1 401 Unauthorized
    No active session

If this returns 200 without a valid session:

    Treat as Severity 1 security incident.

---

### 7. Check Nginx

    sudo nginx -t

Expected:

    syntax is ok
    test is successful

If failed:

    Do not reload Nginx.
    Restore last known-good config or fix syntax first.

---

### 8. Check Firewall

    sudo ufw status verbose

Expected:

    SSH allowed
    HTTPS allowed
    No backend app port publicly exposed

If backend app port is exposed:

    Treat as Severity 1 security incident.

---

## Backend API Outage Checklist

Symptoms:

- `/health` fails.
- API timeout.
- 502/504 from Nginx.
- PM2 backend process stopped.

Checklist:

1. Run:

       pm2 status

2. Read backend logs:

       pm2 logs citadel-backend --lines 150

3. Test local backend if applicable:

       curl -i http://127.0.0.1:3001/health

4. Validate Nginx:

       sudo nginx -t

5. If backend process is stopped and logs do not show secret exposure:

       pm2 restart citadel-backend

6. Re-test:

       curl -i https://api.citadelnexus.app/health -H "Origin: https://citadelnexus.app"

7. Document:

       Incident time
       Symptom
       Root cause if known
       Action taken
       Result

Rollback trigger:

    If restart does not restore health, roll back to last known-good commit or restore last known-good runtime configuration.

---

## Database Connectivity Incident Checklist

Symptoms:

- `/health/db` fails.
- Prisma connection error.
- Supabase connection error.
- Query timeout.
- Database unavailable.

Checklist:

1. Confirm API health:

       curl -i https://api.citadelnexus.app/health -H "Origin: https://citadelnexus.app"

2. Confirm DB health:

       curl -i https://api.citadelnexus.app/health/db -H "Origin: https://citadelnexus.app"

3. Check backend logs:

       pm2 logs citadel-backend --lines 150

4. Check Supabase dashboard status and project health.

5. Do not print database URLs.

6. Do not paste secrets into chat, docs, Git, or screenshots.

7. If environment variables changed recently, verify locally without displaying secret values.

8. If caused by recent code or migration, roll back the code or migration path.

9. If data restore is needed, follow documented restore procedure.

Rollback trigger:

    If database connectivity cannot be restored quickly and recent changes caused the issue, roll back the latest deployment or revert the change.

---

## Ascension Bot Incident Checklist

Symptoms:

- Bot offline.
- Commands fail.
- PM2 process stopped.
- Discord login error.
- Repeated command exceptions.
- Phase 1 caps missing.

Checklist:

1. Check process:

       pm2 status

2. Read logs:

       pm2 logs citadel-ascension --lines 150

3. Confirm token was not exposed.

4. Confirm bot token/env file was not changed.

5. Confirm database connectivity if command failures are data-related.

6. If safe:

       pm2 restart citadel-ascension

7. Re-test approved commands only.

Approved Phase 1 public commands:

- /start
- /claim
- /mission
- /build
- /status

Blocked during incident:

- Admin commands.
- Payout functions.
- Wallet mutation.
- NFT entitlement.
- Treasury actions.

Rollback trigger:

    If command behavior becomes unsafe or uncapped, disable public bot interaction until fixed.

---

## Security Exposure Checklist

Symptoms:

- Secret appears in logs.
- Secret appears in Git.
- Secret appears in screenshot.
- Secret appears in chat.
- Protected route returns data without authentication.
- Admin function exposed.
- Backend port exposed.
- Public user can mutate protected state.

Checklist:

1. Stop public launch activity.

2. Capture minimum necessary evidence without spreading secrets.

3. Remove exposure source.

4. Rotate impacted secret if exposed.

5. Check Git status:

       git status

6. If secret was committed:

       Stop.
       Do not simply delete and recommit as the only fix.
       Rotate the secret first.
       Then decide whether history rewrite is required.

7. Check current public route behavior.

8. Update incident log.

9. Do not resume until validation passes.

Automatic Severity:

    Severity 1

---

## Failed Deploy Checklist

Symptoms:

- New deploy breaks `/health`.
- PM2 process crashes after pull/restart.
- Build/start command fails.
- Environment mismatch.
- Production app behaves differently from expected launch scope.

Checklist:

1. Identify latest commit:

       git --no-pager log --oneline -5

2. Check status:

       git status

3. Check process:

       pm2 status

4. Check logs:

       pm2 logs citadel-backend --lines 150

5. If recent commit caused issue, roll back to previous known-good commit.

Example rollback pattern:

       git --no-pager log --oneline -5
       git checkout <previous-good-commit>

Then reinstall/build only if required by the app:

       npm install
       npm run build

Restart:

       pm2 restart citadel-backend

Verify:

       curl -i https://api.citadelnexus.app/health -H "Origin: https://citadelnexus.app"
       curl -i https://api.citadelnexus.app/health/db -H "Origin: https://citadelnexus.app"

After emergency rollback:

    Document the rollback.
    Do not leave detached HEAD as a long-term operating state without follow-up cleanup.

---

## Git Mistake Checklist

Symptoms:

- Wrong file committed.
- Backup artifact appears in Git.
- Secret-safe file accidentally modified.
- Accidental terminal artifact appears.
- Branch ahead unexpectedly.
- Push failed after local commit.

Checklist:

1. Check status:

       git status
       git status --short

2. Check recent commits:

       git --no-pager log --oneline -5

3. If untracked accidental file exists:

       rm -f '<filename>'

4. If backup artifacts appear:

       Confirm `.gitignore`.
       Remove from staging if staged.

5. If local commit is good but push failed:

       git push

6. If local commit is wrong and not pushed:

       git reset --soft HEAD~1

7. If pushed commit contains a secret:

       Treat as Severity 1.
       Rotate the secret immediately.
       Decide whether history rewrite is required.

---

## Backup / Restore Incident Checklist

Symptoms:

- Data corruption.
- Bad migration.
- Critical table missing.
- Restore required.
- Production database state must be recovered.

Checklist:

1. Stop public launch activity.

2. Identify recovery point:

       ls -lh backups/
       find backups -maxdepth 2 -type f | sort

3. Confirm export file type:

       file backups/<timestamp>/citadel_nexus_prod.dump

4. List dump content:

       /usr/lib/postgresql/17/bin/pg_restore --list backups/<timestamp>/citadel_nexus_prod.dump | head -40

5. Do not restore directly into production unless explicitly approved.

6. Restore into non-production first when possible.

7. Validate tables:

       public.User
       public.AccessState
       public.Entitlement
       public.AscensionProfile
       public.AscensionAdminAction
       public.AscensionAdminSnapshot
       public.AscensionPrizePool
       public.DiscordRoleSyncAudit
       public._prisma_migrations

8. Validate row counts.

9. Validate Prisma migration count.

10. Document recovery point and recovery time.

Production restore approval required:

    YES

---

## Public Launch Rollback Checklist

Use when the limited public launch must be paused or reversed.

Rollback triggers:

- Public route exposes protected data.
- API or DB health cannot be restored quickly.
- Bot behavior becomes unsafe.
- Payout/wallet/entitlement function becomes publicly reachable.
- Major Supabase warning appears and cannot be classified.
- Public messaging is no longer accurate.
- Monitoring cadence cannot be maintained during launch window.

Rollback actions:

1. Pause public launch announcements.

2. Post controlled status update if public users are affected.

3. Disable or hide unsafe public feature.

4. Disable affected bot commands if needed.

5. Revert latest unsafe deployment if code-related.

6. Confirm public health endpoints.

7. Confirm protected routes return 401 without valid session.

8. Update blocker register.

9. Do not resume launch until final gate is updated.

---

## Communication Rules During Incident

Allowed:

- "We are investigating a technical issue."
- "A limited feature is temporarily unavailable."
- "No action is required from users at this time."
- "We will update when validation is complete."

Not allowed:

- Do not speculate publicly.
- Do not disclose secrets, tokens, internal URLs, or database details.
- Do not blame vendors or users without evidence.
- Do not promise exact recovery time unless confirmed.
- Do not claim full restoration until checks pass.

---

## Incident Record Format

Use this format for any Severity 1 or Severity 2 event:

    Incident ID:
    Date/time UTC:
    Operator:
    Severity:
    Affected system:
    Symptoms:
    Detection source:
    Public impact:
    Data/security impact:
    Immediate action:
    Root cause:
    Fix or rollback:
    Verification commands:
    Result:
    Follow-up required:
    Launch gate impact:

---

## Resume Criteria After Incident

Do not resume launch activity until:

- Affected route/process passes validation.
- Git status is clean or intentionally documented.
- PM2 status is stable.
- Nginx config validates.
- Protected routes return expected 401.
- No exposed secret remains valid.
- Supabase advisor impact is reviewed if relevant.
- Blocker register is updated if public launch readiness changed.
- Incident record is completed for Severity 1 or Severity 2.

---

## Step 36 Status

Status:

    PASS

Incident checklist documented:

    YES

Outage response documented:

    YES

Security exposure response documented:

    YES

Failed deploy response documented:

    YES

Backup/restore incident response documented:

    YES

Public launch rollback documented:

    YES

Production-dev readiness:

    PASS

Public launch readiness:

    HOLD

Remaining public launch blockers:

- Final launch gate approval.
