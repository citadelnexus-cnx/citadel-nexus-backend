# Citadel Nexus Production Monitoring Checklist v1.0

## Purpose

This checklist defines the repeatable operating checks for the current Citadel Nexus production-dev runtime.

The goal is to confirm that the frontend, backend API, Discord Ascension runtime, PM2 process manager, database connection, and repository state remain healthy without relying on a local development machine.

---

## Daily Quick Check

Run these commands from the backend droplet:

```bash
cd /home/deploy/apps/citadel-nexus-backend
pm2 status
curl -i https://api.citadelnexus.app/health -H "Origin: https://citadelnexus.app"
curl -i https://api.citadelnexus.app/health/db -H "Origin: https://citadelnexus.app"
git status

Expected result:

citadel-backend is online.
citadel-ascension is online.
API /health returns HTTP/1.1 200 OK.
API /health returns status: healthy.
API /health/db returns HTTP/1.1 200 OK.
API /health/db returns status: connected.
Git working tree is clean.

Run:

pm2 logs citadel-ascension --lines 30

Expected result:

No active startup errors.
Runtime shows Ascension bot online.
Prisma/Supabase connection is verified.
Discord command usage appears when commands are run.

Known valid startup lines:

Citadel Ascension online as Ascension Command#6665
Prisma/Supabase connection verified
Phase 1 caps active
Backend API Log Check

Run:

pm2 logs citadel-backend --lines 40

Expected result:

Backend server is running on port 3001.
No new Prisma connection failures.
No repeated crash/restart loop.

Note: older historical TLS errors may still appear in old PM2 log history. They are not considered active unless they continue appearing after the corrected deployment.

PM2 Reboot Persistence Check

Run:

systemctl status pm2-deploy --no-pager

Expected result:

Service is loaded.
Service is enabled.
Service is active/running.
PM2 daemon is active.
Both runtime processes are present under the service tree.
Public Frontend Check

Open:

https://citadelnexus.app
https://www.citadelnexus.app
https://www.citadelnexus.app/app
https://www.citadelnexus.app/dev-login

Expected result:

Public frontend loads.
Member app page loads.
/dev-login remains locked unless explicitly re-enabled for controlled testing.
No public launch claims are made before launch authorization.
Controlled Session Check

Only use this when temporary dev-login validation is intentionally enabled.

When /dev-login is disabled, unauthenticated API session routes should return no active session.

Run:

curl -i https://api.citadelnexus.app/session/me \
  -H "Origin: https://citadelnexus.app"

curl -i https://api.citadelnexus.app/member-state/me \
  -H "Origin: https://citadelnexus.app"

Expected result when no browser session cookie is supplied:

401 Unauthorized
No active session
Runtime Boundary Check

Current boundaries:

Discord is the interface.
Backend remains the source of truth.
Frontend reflects backend-defined state.
Ascension runtime may process current Phase 1 commands.
CNX utility enforcement remains deferred.
Wallet entitlement logic remains deferred.
Payout automation remains deferred.
Automatic role mutation remains deferred unless separately authorized.
Emergency Restart Commands

Restart backend only:

pm2 restart citadel-backend --update-env

Restart Discord Ascension runtime only:

pm2 restart citadel-ascension --update-env

Restart both:

pm2 restart all --update-env

Save process list after intentional runtime changes:

pm2 save
Emergency Log Commands

Backend:

pm2 logs citadel-backend --lines 80

Ascension runtime:

pm2 logs citadel-ascension --lines 80

PM2 service:

systemctl status pm2-deploy --no-pager
Pass Criteria

The system is considered operational when:

Backend API returns HTTP 200.
citadel-backend is online in PM2.
citadel-ascension is online in PM2.
Discord commands respond.
PM2 startup service is active and enabled.
Git working tree is clean.
/dev-login remains disabled unless actively testing.
No current repeated runtime errors are appearing in logs.
Current Validation Record

Date: 2026-05-09
Reviewer: Anthony Hammon
Status: PASS

Confirmed:

Public frontend is online.
Backend API root responds with HTTP 200.
CORS allows https://citadelnexus.app.
/session/me correctly returns no active session without cookie.
/member-state/me correctly returns no active session without cookie.
Temporary frontend dev-login route is locked by environment variable.
NEXT_PUBLIC_ENABLE_DEV_LOGIN=false is active.
Discord Ascension runtime is online as a persistent PM2 process.
Discord slash commands respond.
PM2 process list has been saved.
PM2 systemd startup service is enabled and running.
Local development machine is not required for production-dev runtime operation.
