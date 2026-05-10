# Citadel Nexus Production Runbook v1.0

## Purpose

This runbook defines the current production-dev operating procedure for Citadel Nexus.

It exists so the backend API, Discord Ascension runtime, health checks, PM2 process management, and monitoring procedures can be maintained consistently without relying on a local development machine.

---

## Current Runtime Surfaces

Citadel Nexus currently runs across three main surfaces:

### 1. Public Frontend

- Domain: https://citadelnexus.app
- Hosted separately from the backend runtime

### 2. Backend API

- Domain: https://api.citadelnexus.app
- Local service port: 3001
- PM2 process: citadel-backend

### 3. Discord Ascension Runtime

- Discord bot: Ascension Command
- PM2 process: citadel-ascension

The backend remains the source of truth.

Discord is an interface.

The frontend reflects backend-defined state.

---

## PM2 Processes

Expected PM2 processes:

- citadel-backend
- citadel-ascension
- pm2-logrotate

Check runtime status:

    cd /home/deploy/apps/citadel-nexus-backend
    pm2 status

Expected result:

- citadel-backend is online
- citadel-ascension is online
- pm2-logrotate is online

---

## Health Checks

Backend health:

    curl -i https://api.citadelnexus.app/health -H "Origin: https://citadelnexus.app"

Expected result:

- HTTP/1.1 200 OK
- status: healthy

Database health:

    curl -i https://api.citadelnexus.app/health/db -H "Origin: https://citadelnexus.app"

Expected result:

- HTTP/1.1 200 OK
- status: connected

Root API check:

    curl -i https://api.citadelnexus.app/ -H "Origin: https://citadelnexus.app"

Expected result:

- HTTP/1.1 200 OK
- Citadel Nexus Backend Running

---

## Restart Commands

Restart backend only:

    pm2 restart citadel-backend --update-env

Restart Ascension only:

    pm2 restart citadel-ascension --update-env

Restart both runtime apps:

    pm2 restart all --update-env

After intentional runtime changes:

    pm2 save

---

## PM2 Boot Persistence

Check systemd persistence:

    systemctl status pm2-deploy --no-pager

Expected result:

- Service is loaded
- Service is enabled
- Service is active/running
- PM2 daemon is active
- Runtime processes are present under the service tree

The system should restore PM2 processes after server reboot.

---

## Logs

Backend logs:

    pm2 logs citadel-backend --lines 80

Ascension logs:

    pm2 logs citadel-ascension --lines 80

Log rotation is handled by:

- pm2-logrotate

Current log rotation baseline:

- max_size: 10M
- retain: 14
- compress: true
- rotateInterval: 0 0 * * *

---

## Deployment Procedure

After code changes:

    cd /home/deploy/apps/citadel-nexus-backend
    npm run build
    pm2 restart citadel-backend --update-env
    pm2 save
    git status

Then verify:

    curl -i https://api.citadelnexus.app/health -H "Origin: https://citadelnexus.app"
    curl -i https://api.citadelnexus.app/health/db -H "Origin: https://citadelnexus.app"
    pm2 status

---

## Current Security Boundaries

The following boundaries are active:

- Backend is the source of truth.
- Discord is not the source of truth.
- Frontend is not the source of truth.
- Ascension runtime is separate from backend API runtime.
- Local development machine is not required for runtime operation.
- Temporary dev-login is disabled.

---

## Deferred Until Separately Authorized

The following remain deferred:

- CNX utility enforcement
- Wallet entitlement logic
- Payout automation
- Automatic Discord role mutation
- NFT-gated access
- Production public launch claims

These may not be activated without separate Command approval.

---

## Current Production-Dev Status

Status: PASS

Confirmed:

- Frontend online
- Backend API online
- Discord Ascension runtime online
- PM2 persistence active
- Log rotation active
- Health endpoint active
- Database health endpoint active
- Git working tree clean
- /dev-login disabled
