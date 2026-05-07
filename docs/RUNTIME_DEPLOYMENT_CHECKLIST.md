# Citadel Ascension Runtime Deployment Checklist

## Purpose

This checklist defines the required verification steps before moving the Citadel Ascension runtime from local development into hosted production infrastructure.

The checklist exists to prevent accidental deployment mistakes, secret exposure, wrong-server command registration, unsafe admin access, database state loss, or premature CNX utility activation.

This document should be completed before any production runtime is launched on DigitalOcean, PM2, or any future cloud host.

---

## Deployment Philosophy

Citadel Nexus follows a controlled deployment model.

The system should never move from local development to production simply because the code runs.

A deployment is considered ready only when:

- runtime behavior is verified
- persistence is verified
- environment variables are confirmed
- Discord guild targeting is confirmed
- admin controls are protected
- secrets are isolated
- rollback steps are known
- logs can be reviewed
- no deferred systems are accidentally enabled

Discord is the interface.  
The backend remains the source of truth.  
Production deployment must preserve that boundary.

---

## Current Deployment Status

```text
Project: Citadel Nexus
Runtime: Citadel Ascension
Status: Internal Alpha
Production Status: Not Public
Current Runtime Mode: Local Development
Current Database: Supabase/Postgres
Discord Command Scope: Guild-scoped
Bot Host: Local machine
Production Host: Deferred
DigitalOcean Droplet: Reserved / Offline
Domain: citadelnexus.app
CNX Utility Enforcement: Disabled
Wallet Enforcement: Disabled
Automatic Role Mutation: Disabled
```

---

## Table of Contents

1. Pre-Deployment Gate
2. Repository Verification
3. Environment Verification
4. Discord Verification
5. Database Persistence Verification
6. Runtime Verification
7. Admin Safety Verification
8. Production Host Verification
9. PM2 Verification
10. Domain and DNS Verification
11. Monitoring and Logs
12. Rollback Plan
13. Post-Deployment Validation
14. Deferred Systems Lockout
15. Deployment Approval Record

---

## 1. Pre-Deployment Gate

### Pre-Deployment Purpose

This section determines whether the runtime is eligible for production deployment.

If any required item fails, deployment should stop until the issue is corrected.

---

## Required Deployment Conditions

Before deployment, confirm:

- [ ] Backend repository is clean
- [ ] Backend repository is pushed to GitHub
- [ ] Frontend repository is clean
- [ ] Frontend repository is pushed to GitHub
- [ ] `.env` files are not committed
- [ ] `.env.example` files exist
- [ ] Discord bot token has not been exposed
- [ ] Discord bot is installed in the correct server
- [ ] Slash commands are registered to the correct guild
- [ ] Supabase database connection works
- [ ] Persistence survives runtime restart
- [ ] Admin commands are protected
- [ ] Destructive admin commands require confirmation
- [ ] Role mutation is disabled
- [ ] Wallet verification is disabled
- [ ] CNX token enforcement is disabled
- [ ] Production host is hardened before runtime launch
- [ ] Rollback steps are documented
- [ ] Logs can be reviewed after startup

---

## Deployment Stop Conditions

Stop deployment immediately if:

- `.env` appears in Git status
- a bot token appears in terminal output, screenshot, or committed file
- `DATABASE_URL` appears in committed files
- `GUILD_ID` points to the wrong Discord server
- command deployment targets the wrong guild
- runtime fails to connect to Supabase
- persistence does not survive restart
- `/status` fails
- admin commands are accessible to unauthorized users
- role mutation is enabled without dry-run validation
- wallet/CNX utility systems activate unexpectedly
- PM2 fails to restart the bot after crash simulation

---

## Deployment Classification

Use the following deployment classifications:

```text
LOCAL_DEV       = local development machine only
INTERNAL_ALPHA  = main server testing with limited trusted users
STAGING         = hosted test runtime with production-like configuration
PRODUCTION      = public runtime with monitoring, rollback, and recovery
```

Current classification:

```text
INTERNAL_ALPHA
```

Production deployment is not approved until all required checklist items are complete.

---

## 2. Repository Verification

### Repository Verification Purpose

Repository verification confirms that GitHub reflects the current working system and that production deployment will pull the correct code.

---

## Backend Repository

Repository:

```text
citadelnexus-cnx/citadel-nexus-backend
```

Required checks:

- [ ] Branch is `main`
- [ ] Local branch is up to date with `origin/main`
- [ ] Working tree is clean
- [ ] Latest runtime changes are committed
- [ ] Runtime runbook exists
- [ ] Deployment checklist exists
- [ ] `.env.example` exists
- [ ] `.env` is ignored
- [ ] `node_modules` is ignored
- [ ] `dist` is ignored
- [ ] bot runtime file exists
- [ ] command deployment file exists
- [ ] Prisma runtime bridge exists

## Verification commands

```powershell
cd C:\CitadelNexus\backend
git status
git log --oneline -5
```

Expected status:

```text
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

---

## Required Backend Files

Confirm these exist:

```text
backend/package.json
backend/package-lock.json
backend/.gitignore
backend/.env.example
backend/docs/ASCENSION_RUNTIME_RUNBOOK.md
backend/docs/RUNTIME_DEPLOYMENT_CHECKLIST.md
backend/src/modules/ascension/runtime/bot-entry.js
backend/src/modules/ascension/runtime/deploy-commands.js
backend/src/lib/prisma.js
backend/src/lib/prisma.ts
backend/prisma/
```

---

## Frontend Repository

Repository:

```text
citadelnexus-cnx/citadel-nexus-app
```

Required checks:

- [ ] Branch is `main`
- [ ] Local branch is up to date with `origin/main`
- [ ] Working tree is clean
- [ ] `.env.example` exists
- [ ] `.env.local` is ignored
- [ ] `.next` is ignored
- [ ] `node_modules` is ignored
- [ ] frontend builds locally
- [ ] public routes are available
- [ ] Discord entry route is configured
- [ ] future API base URL variable exists

Verification commands:

```powershell
cd C:\CitadelNexus\app
git status
git log --oneline -5
```

Expected status:

```text
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

---

## Required Frontend Files

Confirm these exist:

```text
app/package.json
app/package-lock.json
app/.gitignore
app/.env.example
app/src/
app/src/app/
app/src/data/appGateway.ts
```

---

## Repository Approval

Deployment may continue only if both repositories are clean and synced.

```text
Backend Repo Verified: [ ] Yes / [ ] No
Frontend Repo Verified: [ ] Yes / [ ] No
Reviewer:
Date:
Notes:
```

---

## 3. Environment Verification

### Environment Verification Purpose

Environment verification prevents the runtime from launching with missing secrets, wrong Discord guild targeting, wrong database targeting, or unsafe control flags.

---

## Backend Environment File

Local backend environment file:

```text
backend/.env
```

Production backend environment file location will depend on hosting environment.

For DigitalOcean manual deployment, production `.env` should be created directly on the server and never committed.

---

## Required Backend Variables

Confirm all required backend variables exist:

```env
DATABASE_URL=
BOT_TOKEN=
CLIENT_ID=
GUILD_ID=
FOUNDER_IDS=
CURRENT_PHASE=1
ALLOW_GLOBAL_RESET=false
STRICT_ECONOMY=false
ADMIN_MODE=dev
```

Checklist:

- [ ] `DATABASE_URL` exists
- [ ] `BOT_TOKEN` exists
- [ ] `CLIENT_ID` exists
- [ ] `GUILD_ID` exists
- [ ] `FOUNDER_IDS` exists
- [ ] `CURRENT_PHASE` is set
- [ ] `ALLOW_GLOBAL_RESET=false`
- [ ] `STRICT_ECONOMY=false` for current alpha
- [ ] `ADMIN_MODE=dev` or explicitly reviewed production value

---

## Discord Guild Targeting

Main CNX server:

```text
Citadel Nexus (CNX Token)
Guild ID: 1387684189834313798
```

Test server:

```text
Citadel Nexus Test Server
Guild ID: 1487371225838911498
```

Before deploying commands, confirm:

```text
Target Guild:
Expected Guild ID:
Actual GUILD_ID:
```

Checklist:

- [ ] `GUILD_ID` matches the intended server
- [ ] deployment target is intentional
- [ ] test server and main server are not confused
- [ ] command deployment is guild-scoped
- [ ] global command deployment is not used yet

---

## Safety Flag Verification

Current alpha-safe configuration:

```env
CURRENT_PHASE=1
ALLOW_GLOBAL_RESET=false
STRICT_ECONOMY=false
ADMIN_MODE=dev
```

Deployment must stop if:

```env
ALLOW_GLOBAL_RESET=true
```

unless the deployment is a controlled test reset with no real players.

Checklist:

- [ ] Global reset disabled
- [ ] Economy strictness reviewed
- [ ] Admin mode reviewed
- [ ] Phase cap reviewed
- [ ] CNX utility enforcement not enabled
- [ ] Wallet enforcement not enabled
- [ ] Role sync mutation not enabled

---

## Frontend Environment File

Frontend local file:

```text
app/.env.local
```

Frontend public template:

```text
app/.env.example
```

Required frontend variables:

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_DISCORD_INVITE_URL=
NEXT_PUBLIC_DISCORD_SERVER_ID=
```

Checklist:

- [ ] Site URL defined
- [ ] API base URL defined or intentionally blank for static phase
- [ ] Discord invite URL defined
- [ ] Discord server ID defined
- [ ] no private secrets stored in frontend env files

Important:

Frontend variables beginning with `NEXT_PUBLIC_` are public. Never place secrets in these variables.

---

## Environment Approval

```text
Backend Env Verified: [ ] Yes / [ ] No
Frontend Env Verified: [ ] Yes / [ ] No
Secrets Safe: [ ] Yes / [ ] No
Reviewer:
Date:
Notes:
```

---

## 4. Discord Verification

### Discord Verification Purpose

Discord verification confirms that the Ascension Command bot is installed in the correct server, has the correct scopes, has the correct permissions, and is not accidentally targeting the wrong guild.

Discord is the interaction surface only. It must not be treated as the source of gameplay truth.

---

## Discord Application

Current Discord application:

```text
Application Name: Ascension Command
Application ID: 1487372943850733678
Primary Runtime: Citadel Ascension
Command Scope: Guild-scoped

Required checks:

 Discord Developer Portal application exists
 Bot user exists
 Bot token is active
 Bot token is stored only in backend/.env
 Bot token is not committed
 Bot is installed in the intended server
 Bot has slash-command scope
 Bot does not have unnecessary high-risk permissions
```

 ---

## Required OAuth2 Scopes

The bot should be installed with these scopes:

bot
applications.commands

Checklist:

 bot scope selected
 applications.commands scope selected
 no unnecessary OAuth2 scopes selected
 generated install URL targets the correct application
 bot installed into correct guild

## Current Server Targets

Main CNX server:

Server Name: Citadel Nexus (CNX Token)
Guild ID: 1387684189834313798
Purpose: Main internal alpha environment

Test server:

Server Name: Citadel Nexus Test Server
Guild ID: 1487371225838911498
Purpose: isolated testing environment

Checklist:

 Main server ID confirmed
 Test server ID confirmed
 .env GUILD_ID points to intended server
 commands are registered only to the intended guild
 no global command deployment used

## Recommended Bot Permissions

For current alpha runtime, the bot only needs enough permission to respond to slash commands.

Recommended permissions:

View Channels
Send Messages
Use Slash Commands
Embed Links
Read Message History

Avoid granting these until explicitly needed:

Administrator
Manage Roles
Manage Channels
Manage Server
Kick Members
Ban Members
Mention Everyone
Manage Webhooks

Checklist:

 Bot can view testing/admin channel
 Bot can send messages
 Bot can use slash commands
 Bot can send embeds
 Bot does not have Administrator
 Bot does not have Manage Roles
 Bot does not have unnecessary moderation permissions

## Role Sync Warning

Do not enable role mutation yet.

Role sync must remain disabled until:

role mapping is explicit
backend entitlement source is finalized
dry-run mutation logs are implemented
rollback logic exists
bot role hierarchy is confirmed
audit logging is active

Checklist:

 automatic role mutation disabled
 Manage Roles permission not granted
 backend role sync not active
 no Discord role treated as source of truth

## Discord Approval

Discord App Verified: [ ] Yes / [ ] No
Correct Guild Verified: [ ] Yes / [ ] No
Bot Permissions Reviewed: [ ] Yes / [ ] No
Role Mutation Disabled: [ ] Yes / [ ] No
Reviewer:
Date:
Notes:

## 5. Database Persistence Verification

Database Persistence Verification Purpose

Database persistence verification confirms that gameplay state is stored in Supabase/Postgres and survives runtime restarts, bot restarts, local machine restarts, and future production host migration.

If persistence fails, production deployment must stop.

## Database Source of Truth

Current database:

Database Type: Supabase/Postgres
Runtime Variable: DATABASE_URL
Persistence Status: Enabled
Current Verification Status: Reboot persistence verified

The database currently stores:

player identity linkage
Ascension profile state
guardian selection
XP
credits
intel
power
buildings
cooldowns
session counters
progression state

## Required Persistence Test

Run this test after any runtime change, database change, dependency update, host migration, or environment change.

Step 1 — Start Runtime

From:

cd C:\CitadelNexus\backend

Run:

npm run ascension:dev

Expected output:

Citadel Ascension online as Ascension Command
Prisma/Supabase connection verified
Phase 1 caps active

Checklist:

 runtime starts
 bot comes online
 Supabase connection verified
 no startup errors appear

## Step 2 — Capture Player State

In Discord, run:

/status

Record:

Discord User:
Guardian:
Stage:
Rank:
XP:
Credits:
Intel:
Power:
Buildings:
Claim Cooldown:
Session Count:

Checklist:

 /status responds
 values are visible
 values match expected player profile
 profile does not appear reset

## Step 3 — Mutate State Safely

Run a safe command such as:

/claim

or:

/mission recon

Record the updated state:

XP:
Credits:
Intel:
Power:
Session Count:
Cooldown:

Checklist:

 command succeeds
 player state changes
 cooldown updates correctly
 no handler error appears in terminal

## Step 4 — Restart Runtime

Stop the runtime:

CTRL + C

Restart:

npm run ascension:dev

Wait for:

## Prisma/Supabase connection verified

Checklist:

 runtime stops cleanly
 runtime restarts cleanly
 Supabase reconnects
 bot comes back online

## Step 5 — Recheck State

Run:

/status

Expected result:

player profile remains intact
guardian remains unchanged
XP remains stable
credits remain stable
intel remains stable
buildings remain stable
cooldowns remain logical
session count remains logical
profile does not reset

Checklist:

 persistence survived runtime restart
 state did not reset
 state did not duplicate
 no unexpected player profile was created
 no database errors appeared

## Persistence Stop Conditions

Stop deployment if:

/status fails
profile resets
guardian disappears
XP resets unexpectedly
credits or intel reset unexpectedly
buildings reset unexpectedly
cooldowns break
duplicate player profile appears
Supabase connection fails
Prisma query errors appear
runtime falls back to local-only state

## Database Approval

Database Connection Verified: [ ] Yes / [ ] No
Persistence Restart Test Passed: [ ] Yes / [ ] No
No Reset Detected: [ ] Yes / [ ] No
No Duplicate Profile Detected: [ ] Yes / [ ] No
Reviewer:
Date:
Notes:

## 6. Runtime Verification

Runtime Verification Purpose

Runtime verification confirms that the Discord bot process starts correctly, routes slash commands correctly, handles errors safely, and does not crash during normal command execution.

## Runtime Scripts

Current backend scripts:

{
  "dev": "nodemon --watch src --ext ts --exec ts-node src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js",
  "ascension:start": "node src/modules/ascension/runtime/bot-entry.js",
  "ascension:dev": "nodemon src/modules/ascension/runtime/bot-entry.js",
  "ascension:deploy": "node src/modules/ascension/runtime/deploy-commands.js"
}

Checklist:

 ascension:start exists
 ascension:dev exists
 ascension:deploy exists
 nodemon is installed
 runtime entry file exists
 deployment file exists

## Start Runtime

From:

cd C:\CitadelNexus\backend

Run:

npm run ascension:dev

Expected output:

Citadel Ascension online as Ascension Command
Prisma/Supabase connection verified
Phase 1 caps active

Checklist:

 bot starts
 bot username is correct
 Supabase connection verified
 phase cap appears
 no module errors appear
 no token errors appear
 no Prisma errors appear

## Player Command Verification

Test these commands in an admin-only or controlled test channel:

/start
/status
/claim
/mission
/build

Checklist:

 /start responds correctly
 /status responds correctly
 /claim responds correctly
 /mission responds correctly
 /build responds correctly
 command logs appear in terminal
 no command hangs
 no command returns application timeout
 no duplicate responses appear

## Expected Runtime Logs

Normal command logs should look similar to:

[CMD] /status | discord:USER_ID | TIMESTAMP
[CMD] /claim | discord:USER_ID | TIMESTAMP
[CMD] /mission | discord:USER_ID | TIMESTAMP
[CMD] /build | discord:USER_ID | TIMESTAMP

Admin command logs should look similar to:

[ADMIN] /admin_command_name | discord:USER_ID | TIMESTAMP

Checklist:

 player commands log correctly
 admin commands log separately
 logs do not expose secrets
 logs do not expose bot token
 logs do not expose database URL

## Runtime Failure Checks

Stop deployment if runtime shows:

MODULE_NOT_FOUND
TOKEN_INVALID
DATABASE_URL is required
Prisma connection failure
Interaction has already been acknowledged
Application did not respond
Missing Access
Missing Permissions

Checklist:

 no module path errors
 no token errors
 no database URL errors
 no Prisma connection errors
 no Discord interaction acknowledgement errors
 no missing access errors
 no missing permission errors

## Runtime Approval

Runtime Starts Cleanly: [ ] Yes / [ ] No
Player Commands Verified: [ ] Yes / [ ] No
Runtime Logs Reviewed: [ ] Yes / [ ] No
No Runtime Errors: [ ] Yes / [ ] No
Reviewer:
Date:
Notes:

## 7. Admin Safety Verification

Admin Safety Verification Purpose

Admin safety verification confirms that powerful commands are restricted, logged, and protected from accidental use.

Admin commands can alter player progression and economy state. They must remain controlled during alpha.

## Admin Command Layer

Current admin command layer includes commands such as:

/admin_help
/admin_player_view
/admin_inventory_view
/admin_add_xp
/admin_remove_xp
/admin_set_xp
/admin_grant_resource
/admin_remove_resource
/admin_set_resource
/admin_reset_player
/admin_delete_player
/admin_reset_all
/admin_recalc_player
/admin_lock_player
/admin_unlock_player
/admin_restore_player
/admin_award_all
/admin_award_top
/admin_prize_pool_view
/admin_prize_pool_add
/admin_prize_pool_award
/admin_prize_pool_remove

Checklist:

 admin commands are registered
 admin commands route to admin handler
 admin commands are logged as [ADMIN]
 admin commands are not publicly advertised
 admin commands are tested only in controlled channels

## Founder/Admin Control

Required backend variable:

FOUNDER_IDS=

Current founder/admin checks must confirm that only approved Discord user IDs can execute admin commands.

Checklist:

 FOUNDER_IDS exists
 founder ID is correct
 admin handler checks caller identity
 unauthorized users are blocked
 unauthorized attempts do not mutate state
 unauthorized attempts are logged or safely rejected

## Destructive Command Protection

Destructive commands include:

/admin_reset_player
/admin_delete_player
/admin_reset_all
/admin_remove_xp
/admin_remove_resource
/admin_set_xp
/admin_set_resource
/admin_lock_player

Required protections:

founder/admin authorization
confirmation phrase where applicable
reason field where applicable
safety flag where applicable
audit log output
no silent destructive action

Checklist:

 destructive commands require authorization
 reset player requires confirmation
 delete player requires confirmation
 reset all requires environment safety flag
 reset all is disabled for normal alpha operation
 destructive commands require reason fields
 destructive actions are logged

## Safety Flags

Current alpha-safe values:

ALLOW_GLOBAL_RESET=false
STRICT_ECONOMY=false
ADMIN_MODE=dev

Deployment must stop if:

ALLOW_GLOBAL_RESET=true

unless this is a controlled empty-database reset test.

Checklist:

 global reset disabled
 strict economy setting reviewed
 admin mode reviewed
 admin commands are not available to normal users
 no destructive command is tested in public channels

---

## Controlled Reward Verification

Controlled reward verification confirms that prize-pool distribution works as the preferred reward-management path instead of relying only on direct admin mutation commands.

Tested commands:

- `/admin_prize_pool_view`
- `/admin_prize_pool_add`
- `/admin_prize_pool_award`
- `/admin_prize_pool_remove`
- `/status`
- `/admin_player_view`

Verified behavior:

- prize pool status displays correctly
- XP can be added to the prize pool
- XP can be awarded from the prize pool
- player XP updates after prize-pool award
- prize pool balance decreases after award
- XP can be removed from the prize pool
- final pool balance reconciles correctly
- terminal logs show `[ADMIN]` entries
- no runtime crash occurred
- no Prisma error occurred
- no duplicate player profile appeared
- no player reset occurred

Verification result:

```text
Initial prize pool view: passed
Prize pool add test: passed
Prize pool award test: passed
Player state verification: passed
Prize pool remove test: passed
Final prize pool view: passed
```

## Approval

Controlled Reward Path Verified: [x] Yes / [ ] No
Prize Pool View Verified: [x] Yes / [ ] No
Prize Pool Add Verified: [x] Yes / [ ] No
Prize Pool Award Verified: [x] Yes / [ ] No
Prize Pool Remove Verified: [x] Yes / [ ] No
Player XP Update Verified: [x] Yes / [ ] No
Admin Logs Verified: [x] Yes / [ ] No
Reviewer: Anthony Hammon
Date: 2026-05-07
Notes: Prize pool commands verified in the main CNX server admin channel. Founder-only execution path remained active. Pool accounting reconciled correctly after add, award, and remove tests.

## Admin Safety Approval

Founder/Admin IDs Verified: [x] Yes / [ ] No
Unauthorized Admin Access Blocked: [x] Yes / [ ] No
Destructive Commands Protected: [x] Yes / [ ] No
Global Reset Disabled: [x] Yes / [ ] No
Reviewer: Anthony Hammon
Date: 2026-05-07
Notes: Founder-only admin access verified. Secondary non-admin Discord account was denied admin access. Admin inspection commands are operational. Global reset was blocked by ALLOW_GLOBAL_RESET=false. Direct mutation remains allowed only for founder during dev alpha with STRICT_ECONOMY=false and ADMIN_MODE=dev.

## 8. Production Host Verification

Production Host Verification Purpose

Production host verification confirms that the DigitalOcean droplet is safe to use before deploying the runtime.

The production host should not run the Ascension runtime until the server is updated, hardened, configured, and ready for process supervision.

## Current Hosting Status

Current hosting status:

Domain: citadelnexus.app
DigitalOcean Droplet: Reserved
Droplet Status: Offline
Production Runtime: Deferred
Production Bot Host: Not active

Checklist:

 DigitalOcean droplet exists
 droplet is intentionally offline
 no production runtime is currently active
 no production .env has been committed
 production launch is deferred until checklist completion

## Required Server Hardening Before Runtime Launch

Before starting the production bot runtime, complete:

 SSH access verified
 non-root deploy user created
 password login disabled if SSH keys are configured
 system packages updated
 UFW firewall configured
 only required ports opened
 fail2ban installed or reviewed
 Node.js LTS installed
 Git installed
 PM2 installed
 backend repo cloned from GitHub
 dependencies installed
 production .env created manually on server
 production .env permissions restricted

## Recommended Initial Firewall Scope

For bot-only runtime, the server does not need public inbound web traffic.

Minimum expected access:

SSH: allowed from trusted IP if possible
HTTP: closed unless backend API is deployed
HTTPS: closed unless backend API is deployed
Bot outbound traffic: allowed
Database outbound traffic: allowed

If hosting backend API later:

HTTP: open for Certbot/nginx redirect
HTTPS: open for api.citadelnexus.app

Checklist:

 SSH access controlled
 unnecessary ports closed
 HTTP/HTTPS only opened when API deployment begins
 outbound Discord connectivity allowed
 outbound Supabase connectivity allowed

## Production Environment File

Production .env must be created directly on the server.

Never commit production .env.

Required production values:

DATABASE_URL=
BOT_TOKEN=
CLIENT_ID=
GUILD_ID=
FOUNDER_IDS=
CURRENT_PHASE=1
ALLOW_GLOBAL_RESET=false
STRICT_ECONOMY=false
ADMIN_MODE=production

Checklist:

 production .env created manually
 production .env not committed
 production .env uses correct main guild ID
 production bot token is current
 production database URL is correct
 ALLOW_GLOBAL_RESET=false
 ADMIN_MODE=production reviewed before launch

## Production Host Approval

DigitalOcean Droplet Verified: [ ] Yes / [ ] No
Server Hardened: [ ] Yes / [ ] No
Production Env Created Safely: [ ] Yes / [ ] No
Ready for PM2 Setup: [ ] Yes / [ ] No
Reviewer:
Date:
Notes:

---

## 9. PM2 Verification

### PM2 Verification Purpose

PM2 verification confirms that the Ascension runtime can run as a managed production process, recover from crashes, persist through server reboots, and provide readable logs.

PM2 should only be used after the production host is hardened and the production `.env` file is safely created on the server.

---

## PM2 Runtime Target

Production runtime file:

```text
src/modules/ascension/runtime/bot-entry.js
```

Recommended PM2 process name:

citadel-ascension-bot

Future production command:

pm2 start src/modules/ascension/runtime/bot-entry.js --name citadel-ascension-bot

Checklist:

 PM2 installed
 backend repo cloned on production server
 dependencies installed
 production .env exists on server
 runtime starts under PM2
 PM2 process name is correct
 bot appears online in Discord
 /status works after PM2 startup

## PM2 Process Checks

Run:

pm2 list

Expected:

citadel-ascension-bot
status: online

Run:

pm2 logs citadel-ascension-bot

Expected startup logs:

Citadel Ascension online as Ascension Command
Prisma/Supabase connection verified
Phase 1 caps active

Checklist:

 PM2 process is online
 logs are readable
 no token appears in logs
 no database URL appears in logs
 no startup errors appear
 Discord bot is online
 Supabase connection verified

## PM2 Restart Test

Restart the process:

pm2 restart citadel-ascension-bot

Then check:

pm2 logs citadel-ascension-bot

Checklist:

 PM2 restarts runtime successfully
 bot comes back online
 Supabase reconnects
 /status still works
 persistence survives restart

## PM2 Crash Recovery Test

Only run this after confirming that no public users are active.

Stop the process:

pm2 stop citadel-ascension-bot

Then start it again:

pm2 start citadel-ascension-bot

Checklist:

 process stops cleanly
 process starts cleanly
 bot reconnects to Discord
 no player data resets
 logs remain readable

## PM2 Reboot Survival

After PM2 is confirmed working, run:

pm2 save

Then configure startup:

pm2 startup

Follow the command PM2 prints.

After server reboot, verify:

pm2 list

Checklist:

 PM2 saved process list
 PM2 startup configured
 runtime survives reboot
 bot comes online after reboot
 /status works after reboot
 persistence survives reboot

## PM2 Approval

PM2 Installed: [ ] Yes / [ ] No
Runtime Starts Under PM2: [ ] Yes / [ ] No
Restart Test Passed: [ ] Yes / [ ] No
Reboot Survival Verified: [ ] Yes / [ ] No
Reviewer:
Date:
Notes:

## 10. Domain and DNS Verification

Domain and DNS Verification Purpose

Domain and DNS verification confirms that citadelnexus.app is reserved for the frontend and that future backend API routing can be safely introduced without disrupting the Discord bot runtime.

The Discord bot does not require public DNS by itself. DNS becomes required when the frontend, backend API, OAuth callbacks, webhooks, or public dashboards are deployed.

## Current Domain

Current domain:

citadelnexus.app

Current status:

Domain owned
Production routing deferred
DigitalOcean server reserved / offline
Frontend deployment target pending
Backend API deployment target pending

Checklist:

 domain ownership confirmed
 registrar access confirmed
 DNS management location confirmed
 no accidental production records created
 no stale records point to the wrong server

## Recommended Future DNS Layout

Recommended production layout:

citadelnexus.app          -> frontend application
<www.citadelnexus.app>      -> frontend application
api.citadelnexus.app      -> backend API
status.citadelnexus.app   -> optional future status page

The Discord bot runtime can run on the server without a public DNS record unless it also hosts the backend API.

Checklist:

 root domain plan confirmed
 www plan confirmed
 api subdomain reserved for backend API
 bot runtime not dependent on public DNS
 DNS changes deferred until production host is ready

## DNS Stop Conditions

Stop DNS changes if:

droplet IP is not final
frontend host is not selected
backend API is not ready
SSL plan is not ready
existing DNS records are unclear
production host is not hardened
rollback path is not known

## Domain Approval

Domain Ownership Verified: [ ] Yes / [ ] No
DNS Manager Confirmed: [ ] Yes / [ ] No
Production DNS Deferred Safely: [ ] Yes / [ ] No
Future API Subdomain Reserved: [ ] Yes / [ ] No
Reviewer:
Date:
Notes:

## 11. Monitoring and Logs

Monitoring and Logs Purpose

Monitoring and logs allow runtime behavior to be reviewed after startup, command use, errors, crashes, restarts, and future production incidents.

The current alpha system may use terminal and PM2 logs first. More advanced monitoring can be added later.

## Current Local Logs

Local runtime logs appear in the terminal running:

npm run ascension:dev

Expected command logs:

[CMD] /status | discord:USER_ID | TIMESTAMP
[CMD] /claim | discord:USER_ID | TIMESTAMP
[CMD] /mission | discord:USER_ID | TIMESTAMP
[CMD] /build | discord:USER_ID | TIMESTAMP
[ADMIN] /admin_command_name | discord:USER_ID | TIMESTAMP

Checklist:

 player commands are logged
 admin commands are logged separately
 timestamps appear
 Discord user IDs appear
 no secrets appear in logs
 no database URL appears in logs
 no bot token appears in logs

## Production PM2 Logs

Production logs should be reviewed with:

pm2 logs citadel-ascension-bot

Useful PM2 commands:

pm2 list
pm2 status
pm2 logs citadel-ascension-bot
pm2 restart citadel-ascension-bot
pm2 monit

Checklist:

 PM2 logs accessible
 startup logs visible
 command logs visible
 admin logs visible
 crash logs visible
 restart history visible

## Minimum Production Log Requirements

Production logs should confirm:

bot startup
database connection
phase cap
command execution
admin command execution
runtime errors
Discord interaction failures
database failures

Production logs must not expose:

bot token
database URL
wallet keys
private keys
webhook secrets
production credentials

Checklist:

 startup logging works
 command logging works
 admin logging works
 error logging works
 logs are secret-safe
 logs are reviewable after restart

## Future Monitoring Improvements

Recommended later improvements:

structured JSON logs
dedicated admin audit table
Discord alert webhook for runtime crashes
Discord alert webhook for unauthorized admin attempts
Sentry or similar error tracking
uptime monitor for backend API
health check endpoint for API runtime
database audit trail for admin mutations

Do not add these until the core runtime is stable.

## Monitoring Approval

Local Logs Verified: [ ] Yes / [ ] No
PM2 Logs Verified: [ ] Yes / [ ] No
Secrets Hidden From Logs: [ ] Yes / [ ] No
Runtime Errors Reviewable: [ ] Yes / [ ] No
Reviewer:
Date:
Notes:

## 12. Rollback Plan

Rollback Plan Purpose

The rollback plan defines what to do if production deployment fails, commands break, database state behaves incorrectly, or the bot becomes unsafe.

Rollback must be known before production launch.

## Rollback Priorities

Rollback priorities:

Protect secrets
Stop unsafe runtime behavior
Preserve database state
Prevent wrong-server command usage
Restore last known working code
Re-verify persistence
Resume only after root cause is identified

## Immediate Runtime Stop

If the production bot behaves incorrectly, stop the PM2 process:

pm2 stop citadel-ascension-bot

Confirm:

pm2 list

Checklist:

 bot process stopped
 bot is offline in Discord
 no further commands execute
 logs are preserved for review

## Restart Last Known Good Runtime

If the issue is temporary and code is still safe:

pm2 restart citadel-ascension-bot

Then verify:

/status

Checklist:

 bot restarts
 Supabase reconnects
 /status works
 no state reset occurs
 logs show no recurring error

## Git Rollback

If the latest code is unsafe, identify last known good commit:

git log --oneline -10

Return to a known good commit only after confirming the target commit:

git checkout COMMIT_HASH
npm install
pm2 restart citadel-ascension-bot

Checklist:

 last known good commit identified
 rollback commit confirmed
 dependencies installed
 PM2 restarted
 /status verified
 persistence verified

## Command Rollback

If slash commands were registered incorrectly:

Correct GUILD_ID
Correct command deployment file if needed
Redeploy guild commands:
npm run ascension:deploy
Verify commands in Discord

Checklist:

 incorrect guild identified
 correct guild confirmed
 commands redeployed
 commands appear correctly
 wrong-server issue resolved

## Secret Exposure Rollback

If a token or secret is exposed:

Stop runtime
Rotate exposed secret
Update local .env
Update production .env
Restart runtime
Verify connection
Review GitHub for accidental commits
Review screenshots/messages where exposure happened

Checklist:

 runtime stopped
 exposed secret rotated
 local environment updated
 production environment updated
 runtime restarted
 GitHub checked
 logs checked
 no old secret remains active

## Rollback Approval

Runtime Stop Procedure Known: [ ] Yes / [ ] No
Git Rollback Procedure Known: [ ] Yes / [ ] No
Command Rollback Procedure Known: [ ] Yes / [ ] No
Secret Rotation Procedure Known: [ ] Yes / [ ] No
Reviewer:
Date:
Notes:

## 13. Post-Deployment Validation

Post-Deployment Validation Purpose

Post-deployment validation confirms that the production runtime is operating safely after launch.

Production is not considered complete until these checks pass after the bot is running on the production host.

## Immediate Validation

After production launch, confirm:

 PM2 process is online
 bot appears online in Discord
 Supabase connection verified
 /status responds
 /claim responds
 /mission responds
 /build responds or correctly blocks based on phase caps
 admin command access is restricted
 logs are visible
 no secrets appear in logs

## Persistence Validation

Run:

/status

Record state.

Restart PM2:

pm2 restart citadel-ascension-bot

Run again:

/status

Checklist:

 profile persists
 guardian persists
 XP persists
 credits persist
 intel persists
 buildings persist
 cooldowns remain logical
 no duplicate profile appears

## Admin Validation

Test from approved founder/admin account:

/admin_help
/admin_player_view
/admin_prize_pool_view

Do not run destructive commands during normal validation.

Checklist:

 safe admin command responds
 founder/admin access works
 unauthorized users are blocked
 destructive commands not tested publicly
 admin command logs appear

## Public Safety Validation

Confirm deferred systems remain disabled:

 CNX token enforcement disabled
 wallet enforcement disabled
 automatic role mutation disabled
 payout automation disabled
 Hedera settlement disabled
 public reward economy disabled

## Post-Deployment Approval

Production Runtime Online: [ ] Yes / [ ] No
Player Commands Verified: [ ] Yes / [ ] No
Persistence Verified: [ ] Yes / [ ] No
Admin Safety Verified: [ ] Yes / [ ] No
Deferred Systems Disabled: [ ] Yes / [ ] No
Reviewer:
Date:
Notes:

## 14. Deferred Systems Lockout

Deferred Systems Lockout Purpose

Deferred systems lockout prevents unfinished or high-risk systems from activating before they are designed, audited, and approved.

Citadel Nexus must not accidentally activate token utility, wallet gating, payouts, role mutation, or public economy rewards during the current alpha phase.

## Deferred Systems

The following systems are deferred:

CNX token utility enforcement
wallet verification
automatic Discord role mutation
payout automation
Hedera settlement
public reward economy
NFT entitlement enforcement
premium access enforcement

Checklist:

 CNX token enforcement disabled
 wallet verification disabled
 automatic role mutation disabled
 payout automation disabled
 Hedera settlement disabled
 public reward economy disabled
 NFT entitlement enforcement disabled
 premium access enforcement disabled

## Activation Requirements

No deferred system may be activated until:

design document exists
data contract exists
database schema is reviewed
security risks are reviewed
test environment validation passes
rollback plan exists
admin approval is recorded
production activation checklist is completed

Checklist:

 no deferred system lacks approval
 no hidden environment flag enables deferred systems
 no production route enables deferred systems
 no Discord command exposes deferred systems
 no background job executes deferred systems

## Role Mutation Lockout

Role mutation must remain disabled until:

role ID map is finalized
backend entitlement logic is finalized
dry-run mode exists
mutation logs exist
rollback behavior exists
bot hierarchy is confirmed
Manage Roles permission is intentionally granted
Discord Command approval is recorded

Checklist:

 bot does not have Manage Roles
 role sync code is inactive or dry-run only
 no command triggers role mutation
 no automatic entitlement mutation occurs

## Wallet/CNX Lockout

Wallet and CNX systems must remain disabled until:

wallet verification model is finalized
signature verification is implemented
wallet rotation handling exists
stale ownership handling exists
CNX utility matrix is approved for activation
token-gated actions are explicitly scoped
no pay-to-win path exists

Checklist:

 wallet verification disabled
 CNX enforcement disabled
 wallet ownership not trusted without verification
 CNX balance not used for gameplay advantage
 token utility activation deferred

## Deferred Systems Approval

Deferred Systems Reviewed: [ ] Yes / [ ] No
Role Mutation Disabled: [ ] Yes / [ ] No
Wallet Enforcement Disabled: [ ] Yes / [ ] No
CNX Enforcement Disabled: [ ] Yes / [ ] No
Reviewer:
Date:
Notes:

## 15. Deployment Approval Record

Deployment Approval Record Purpose

The deployment approval record provides a final sign-off before moving the Ascension runtime into hosted production infrastructure.

No production deployment should proceed without completing this section.

## Final Verification Summary

Pre-Deployment Gate Complete: [ ] Yes / [ ] No
Repository Verification Complete: [ ] Yes / [ ] No
Environment Verification Complete: [ ] Yes / [ ] No
Discord Verification Complete: [ ] Yes / [ ] No
Database Persistence Verification Complete: [ ] Yes / [ ] No
Runtime Verification Complete: [ ] Yes / [ ] No
Admin Safety Verification Complete: [ ] Yes / [ ] No
Production Host Verification Complete: [ ] Yes / [ ] No
PM2 Verification Complete: [ ] Yes / [ ] No
Domain and DNS Verification Complete: [ ] Yes / [ ] No
Monitoring and Logs Verification Complete: [ ] Yes / [ ] No
Rollback Plan Complete: [ ] Yes / [ ] No
Post-Deployment Validation Complete: [ ] Yes / [ ] No
Deferred Systems Lockout Complete: [ ] Yes / [ ] No

## Deployment Decision

Select one:

[ ] Not Approved — issues remain
[ ] Approved for Local/Internal Alpha only
[ ] Approved for Staging
[ ] Approved for Production

Current recommended decision:

Approved for Local/Internal Alpha only

Reason:

The runtime is functional, commands operate in Discord, persistence has survived reboot testing, and main server command execution has been verified. Production hosting should remain deferred until server hardening, PM2 verification, monitoring, rollback testing, and deferred-system lockout are fully completed.

## Final Approval

Reviewer:
Date:
Deployment Target:
GitHub Backend Commit:
GitHub Frontend Commit:
Discord Target Guild:
Production Host:
Approved Status:
Notes:

End of Deployment Checklist.
