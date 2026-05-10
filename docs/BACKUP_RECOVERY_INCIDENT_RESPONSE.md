# Citadel Nexus Backup, Recovery, and Incident Response Baseline v1.0

## Purpose

This document defines the backup, recovery, and incident response baseline for the current Citadel Nexus production-dev runtime.

The goal is to preserve operational continuity, reduce recovery confusion, and document what to do when the backend API, Discord Ascension runtime, database connection, PM2 processes, Nginx proxy, or server access has a problem.

This document does not approve public launch.

---

## Current Recovery Scope

This baseline covers:

- Backend API runtime
- Discord Ascension runtime
- PM2 process recovery
- Nginx reverse proxy recovery
- GitHub code recovery
- Environment variable recovery rules
- Database backup planning
- Incident severity levels
- First-response checklist

---

## Current Runtime Summary

Current production-dev runtime surfaces:

- Frontend: https://citadelnexus.app
- Backend API: https://api.citadelnexus.app
- Backend local bind: 127.0.0.1:3001
- Backend PM2 process: citadel-backend
- Discord runtime PM2 process: citadel-ascension
- Log rotation module: pm2-logrotate
- Process persistence service: pm2-deploy
- Firewall: UFW active
- Public inbound ports: 22, 80, 443
- Backend direct public exposure: blocked by localhost binding and firewall

---

## Source of Truth

The backend repository is the code source of truth.

The production server contains the live runtime.

GitHub contains the recoverable codebase.

The `.env` file contains sensitive runtime configuration and must not be committed.

Discord remains an interface.

The backend remains the source of truth.

---

## Files and Directories to Protect

Critical project directory:

    /home/deploy/apps/citadel-nexus-backend

Critical PM2 directory:

    /home/deploy/.pm2

Critical Nginx site config:

    /etc/nginx/sites-available/citadel-backend
    /etc/nginx/sites-enabled/citadel-backend

Critical SSL paths are Certbot-managed and should not be manually edited:

    /etc/letsencrypt/live/api.citadelnexus.app/

Critical environment file:

    /home/deploy/apps/citadel-nexus-backend/.env

The `.env` file must never be pasted into public chats, committed to GitHub, or stored in unencrypted public locations.

---

## Code Backup Strategy

Primary code backup:

- GitHub repository
- Branch: main

After every approved code change:

    git status
    git add <changed-files>
    git commit -m "Clear message"
    git push
    git status

Expected clean state:

    nothing to commit, working tree clean

---

## Runtime Recovery Commands

Check PM2 process status:

    pm2 status

Expected processes:

- citadel-backend
- citadel-ascension
- pm2-logrotate

Restart backend API only:

    pm2 restart citadel-backend --update-env

Restart Discord Ascension runtime only:

    pm2 restart citadel-ascension --update-env

Restart both runtime apps:

    pm2 restart all --update-env

Save PM2 process list after intentional runtime changes:

    pm2 save

Check PM2 boot persistence:

    systemctl status pm2-deploy --no-pager

Expected:

- loaded
- enabled
- active/running

---

## API Health Recovery Checks

Backend health:

    curl -i https://api.citadelnexus.app/health -H "Origin: https://citadelnexus.app"

Expected:

- HTTP/1.1 200 OK
- status: healthy

Database health:

    curl -i https://api.citadelnexus.app/health/db -H "Origin: https://citadelnexus.app"

Expected:

- HTTP/1.1 200 OK
- status: connected

Root API:

    curl -i https://api.citadelnexus.app/ -H "Origin: https://citadelnexus.app"

Expected:

- HTTP/1.1 200 OK
- Citadel Nexus Backend Running

Unauthenticated session route:

    curl -i https://api.citadelnexus.app/session/me -H "Origin: https://citadelnexus.app"

Expected:

- HTTP/1.1 401 Unauthorized
- No active session

Unauthenticated member state route:

    curl -i https://api.citadelnexus.app/member-state/me -H "Origin: https://citadelnexus.app"

Expected:

- HTTP/1.1 401 Unauthorized
- No active session

---

## Nginx Recovery Checks

Test Nginx syntax:

    sudo nginx -t

Expected:

- syntax is ok
- test is successful

Reload Nginx:

    sudo systemctl reload nginx

Check Nginx service:

    systemctl status nginx --no-pager

Check public API headers:

    curl -I https://api.citadelnexus.app/health -H "Origin: https://citadelnexus.app"

Expected headers include:

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: no-referrer
- Permissions-Policy
- Strict-Transport-Security

---

## Nginx Config Backup Procedure

Before editing Nginx config:

    sudo cp /etc/nginx/sites-available/citadel-backend /etc/nginx/sites-available/citadel-backend.bak.$(date +%Y%m%d_%H%M%S)

After editing:

    sudo nginx -t
    sudo systemctl reload nginx

If Nginx config fails:

1. Do not reload Nginx.
2. Restore the most recent backup.
3. Test syntax again.
4. Reload only after syntax passes.

---

## Port and Firewall Verification

Check firewall:

    sudo ufw status verbose

Expected inbound allow list:

- 22/tcp
- 80/tcp
- 443/tcp

Check listening ports:

    sudo ss -tulpn | grep -E ':22|:80|:443|:3001' || true

Expected:

- 127.0.0.1:3001
- 0.0.0.0:443
- 0.0.0.0:22
- [::]:443
- [::]:22

Not allowed:

- 0.0.0.0:3001
- *:3001
- [::]:3001

If backend is publicly bound again, immediately fix `src/index.ts` so Express listens on `127.0.0.1`.

---

## Environment Variable Recovery Rules

The `.env` file is required for production runtime.

Rules:

- Do not commit `.env`.
- Do not paste `.env` into public tools.
- Do not expose database URLs, Discord tokens, API keys, or secrets.
- Keep a secure private copy outside the repo.
- Rotate credentials if accidental exposure occurs.

If backend fails with missing environment variables:

1. Check PM2 logs.
2. Confirm `.env` exists.
3. Confirm dotenv loads before Prisma-dependent imports.
4. Restart backend with `pm2 restart citadel-backend --update-env`.
5. Re-test `/health` and `/health/db`.

---

## Database Backup Planning

Current baseline:

- Database is managed externally through Supabase.
- `/health/db` verifies reachability but is not a backup.
- Supabase project backup/export procedure must be documented separately before public launch.

Required before public launch:

- Confirm Supabase backup availability.
- Document manual export process.
- Document restore process.
- Define backup frequency.
- Define recovery point objective.
- Define recovery time objective.
- Confirm who has database admin access.

Until this is complete, database recovery is considered partially documented.

---

## GitHub Recovery Procedure

If server code is lost but the droplet is still accessible:

    cd /home/deploy/apps
    git clone <repository-url> citadel-nexus-backend
    cd citadel-nexus-backend
    npm install
    npm run build

Then restore `.env` securely and restart PM2 processes.

If the existing repo is damaged:

1. Move damaged folder aside.
2. Clone fresh from GitHub.
3. Restore `.env`.
4. Run build.
5. Restart PM2.
6. Verify health checks.

---

## Discord Runtime Recovery

Check Ascension logs:

    pm2 logs citadel-ascension --lines 80

Expected:

- Citadel Ascension online as Ascension Command#6665
- Prisma/Supabase connection verified
- Phase 1 caps active

Restart Ascension:

    pm2 restart citadel-ascension --update-env

If Discord commands do not respond:

1. Check PM2 status.
2. Check Ascension logs.
3. Confirm bot token exists in `.env`.
4. Confirm Discord developer configuration.
5. Confirm slash commands are still registered.
6. Restart Ascension.
7. Test `/status` in Discord.

---

## Incident Severity Levels

### Severity 1 — Critical

Examples:

- Backend API down
- Database unreachable
- Discord bot down
- Nginx not serving API
- Server inaccessible
- Secret/token exposed
- Unauthorized public access to restricted function

Immediate actions:

1. Stop active changes.
2. Capture exact error output.
3. Check PM2 status.
4. Check Nginx status.
5. Check health endpoints.
6. Restore known-good config or code.
7. Rotate secrets if exposure occurred.
8. Document incident.

### Severity 2 — Major

Examples:

- One route failing while health passes
- Discord command errors
- High CPU sustained
- Repeated PM2 restarts
- CORS errors from valid origin
- Unexpected 500 errors

Immediate actions:

1. Check logs.
2. Confirm recent commits.
3. Test health endpoints.
4. Restart affected process.
5. Roll back if needed.
6. Document fix.

### Severity 3 — Minor

Examples:

- Historical log noise
- Typo-origin CORS block
- Documentation formatting issue
- Non-critical warning
- Old log entries after a resolved issue

Immediate actions:

1. Confirm issue is not active.
2. Update documentation if needed.
3. Continue monitoring.

---

## First-Response Checklist

When something breaks:

1. Do not make multiple random changes.
2. Run `pm2 status`.
3. Run `/health`.
4. Run `/health/db`.
5. Check `pm2 logs citadel-backend --lines 80`.
6. Check `pm2 logs citadel-ascension --lines 80`.
7. Check `systemctl status pm2-deploy --no-pager`.
8. Check `sudo nginx -t`.
9. Check `sudo ufw status verbose`.
10. Check `git status`.
11. Identify the last known change.
12. Fix one issue at a time.
13. Re-test before committing.
14. Commit only after validation passes.

---

## Current Baseline Status

Backup baseline: PARTIAL

Recovery baseline: PASS

Incident response baseline: PASS

Public launch readiness: HOLD

Reason for partial backup status:

Database backup and restore procedure still requires separate Supabase-specific documentation before public launch.

