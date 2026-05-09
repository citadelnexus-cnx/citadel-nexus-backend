# Citadel Ascension Runtime Deployment Checklist v1.1

## Purpose

This checklist defines the current production-readiness state for the Citadel Nexus backend API, frontend application, and future Citadel Ascension Discord runtime deployment.

This document exists to prevent accidental deployment mistakes, secret exposure, wrong-server command registration, unsafe admin access, database state loss, premature CNX utility activation, and confusion between the backend API host and the Discord bot runtime.

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

The frontend reflects backend-defined state.

Production deployment must preserve those boundaries.

---

## Current Deployment Status

```text
Project: Citadel Nexus
Runtime: Citadel Ascension
Status: Internal Alpha
Production Public Status: Limited / Controlled
Frontend Host: Vercel
Frontend Domain: https://citadelnexus.app
Frontend WWW Domain: https://www.citadelnexus.app
Backend API Host: DigitalOcean
Backend API Domain: https://api.citadelnexus.app
Backend API PM2 Process: citadel-backend
Backend API Status: Active
Ascension Discord Bot Runtime: Deferred / Separate PM2 process later
Discord Command Scope: Guild-scoped
Database: Supabase/Postgres
CNX Utility Enforcement: Disabled
Wallet Enforcement: Disabled
Automatic Role Mutation: Disabled
Payout Automation: Disabled
Hedera Settlement: Deferred
Critical Architecture Boundary

The backend API and the Ascension Discord bot runtime are separate surfaces.

Backend API:
Active on DigitalOcean
Served through api.citadelnexus.app
PM2 process: citadel-backend
Purpose: session routes, member-state routes, access routes, public/API routes

Ascension Discord Bot Runtime:
Not active inside the backend API process
Must be launched later as a separate PM2 process
Future PM2 process name: citadel-ascension-bot
Purpose: Discord slash command gameplay runtime

The backend API must not boot the Discord bot runtime from src/index.ts.

The bot runtime should remain disabled inside the API host until intentionally launched as a separate managed process.

Table of Contents
Pre-Deployment Gate
Repository Verification
Environment Verification
Discord Verification
Database Persistence Verification
Backend API Runtime Verification
Admin Safety Verification
Production Host Verification
PM2 Verification
Domain and DNS Verification
Monitoring and Logs
Rollback Plan
Post-Deployment Validation
Deferred Systems Lockout
Deployment Approval Record
Step 8 Readiness Gate
1. Pre-Deployment Gate
Purpose

This section determines whether the system is eligible to proceed into the next production validation step.

If any required item fails, deployment should stop until corrected.

Current Required Deployment Conditions
Backend repository pushed to GitHub: Yes
Backend working tree clean after latest commit: Required
Frontend repository pushed to GitHub: Yes
Frontend deployed to Vercel: Yes
Frontend domain connected: Yes
Backend API deployed to DigitalOcean: Yes
Backend API domain connected: Yes
Backend API PM2 process active: Yes
.env files not committed: Required
.env.example files exist: Required
Discord bot token not exposed: Required
Supabase database connection reviewed: Required
Ascension bot runtime separated from API host: Yes
Role mutation disabled: Required
Wallet enforcement disabled: Required
CNX token enforcement disabled: Required
Stop Conditions

Stop immediately if:

.env appears in Git status
a bot token appears in terminal output, screenshot, or committed file
DATABASE_URL appears in committed files
GUILD_ID points to the wrong Discord server
command deployment targets the wrong guild
runtime fails to connect to Supabase
persistence does not survive restart
/status fails after bot runtime launch
admin commands are accessible to unauthorized users
role mutation is enabled without dry-run validation
wallet/CNX utility systems activate unexpectedly
PM2 fails to restart the backend API
backend API process attempts to boot the Discord bot runtime
Deployment Classification
LOCAL_DEV       = local development machine only
INTERNAL_ALPHA  = main server testing with limited trusted users
STAGING         = hosted test runtime with production-like configuration
PRODUCTION      = public runtime with monitoring, rollback, and recovery

Current classification:

INTERNAL_ALPHA with production-hosted frontend and backend API

Current recommendation:

Do not classify the Discord bot runtime as full production yet.
Proceed with controlled Step 8 validation only.
2. Repository Verification
Purpose

Repository verification confirms that GitHub reflects the current working system and that production deployment pulls the correct code.

Backend Repository

Repository:

citadelnexus-cnx/citadel-nexus-backend

Required checks:

 Branch is main
 Local branch was pushed to origin/main
 Latest production backend config changes committed
 Runtime checklist exists
 .env is ignored
 .env.backup style files are ignored
 node_modules is ignored
 dist is ignored
 backend API builds with npm run build
 backend API runs under PM2 as citadel-backend
 Ascension bot runtime disabled inside src/index.ts

Verification commands:

cd /home/deploy/apps/citadel-nexus-backend
git status
git log --oneline -5

Expected status after this file update is committed:

On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
Backend Files to Preserve

Required backend files:

package.json
package-lock.json
.gitignore
.env.example
docs/ASCENSION_RUNTIME_RUNBOOK.md
docs/RUNTIME_DEPLOYMENT_CHECKLIST.md
src/index.ts
src/routes/sessionRoutes.ts
src/routes/memberStateRoutes.ts
src/routes/ascensionSummaryRoutes.ts
src/modules/ascension/runtime/bot-entry.js
src/modules/ascension/runtime/deploy-commands.js
src/lib/prisma.js
src/lib/prisma.ts
prisma/
Frontend Repository

Repository:

citadelnexus-cnx/citadel-nexus-app

Required checks:

 Branch is main
 Frontend deployed to Vercel
 Vercel project created
 Vercel production domain active
 NEXT_PUBLIC_BACKEND_URL configured
 NEXT_PUBLIC_API_BASE_URL configured
 NEXT_PUBLIC_SITE_URL configured
 frontend build passed
 public routes load in production
 member app route loads controlled no-session state

Frontend production domains:

https://citadelnexus.app
https://www.citadelnexus.app

Backend API variable used by frontend:

https://api.citadelnexus.app
Repository Approval
Backend Repo Verified: Yes
Frontend Repo Verified: Yes
Reviewer: Anthony Hammon
Date: 2026-05-09
Notes: Backend production config changes were committed and pushed. Frontend was imported into Vercel and deployed successfully.
3. Environment Verification
Purpose

Environment verification prevents the backend, frontend, or future bot runtime from launching with missing secrets, wrong host targeting, wrong Discord guild targeting, wrong database targeting, or unsafe control flags.

Backend API Environment

Production backend API environment file:

/home/deploy/apps/citadel-nexus-backend/.env

The backend .env must remain server-local and must never be committed.

Known production API variables:

NODE_ENV=production
BACKEND_PORT=3001
API_BASE_URL=https://api.citadelnexus.app
FRONTEND_ORIGIN=https://citadelnexus.app
CORS_ORIGINS=https://citadelnexus.app,https://www.citadelnexus.app
COOKIE_SECURE=true
COOKIE_SAMESITE=lax

Required backend API checks:

 NODE_ENV=production
 backend listens on port 3001
 API_BASE_URL points to https://api.citadelnexus.app
 frontend origins are explicitly allowlisted
 localhost is not the production-only CORS origin
 cookies are configured for secure production behavior
 no production .env committed
Future Ascension Bot Runtime Environment

Future bot runtime variables must be reviewed separately before launching the Discord bot process:

DATABASE_URL=
BOT_TOKEN=
CLIENT_ID=
GUILD_ID=
FOUNDER_IDS=
CURRENT_PHASE=1
ALLOW_GLOBAL_RESET=false
STRICT_ECONOMY=false
ADMIN_MODE=production

Required bot runtime checks before launch:

 DATABASE_URL exists
 BOT_TOKEN exists
 CLIENT_ID exists
 GUILD_ID exists
 FOUNDER_IDS exists
 CURRENT_PHASE=1
 ALLOW_GLOBAL_RESET=false
 STRICT_ECONOMY=false for current alpha unless explicitly changed
 ADMIN_MODE=production reviewed before launch
Discord Guild Targeting

Main CNX server:

Server Name: Citadel Nexus
Guild ID: 1387684189834313798
Purpose: Main internal alpha environment

Test server:

Server Name: Citadel Nexus Test Server
Guild ID: 1487371225838911498
Purpose: isolated testing environment

Before command deployment:

Target Guild:
Expected Guild ID:
Actual GUILD_ID:

Checklist:

 GUILD_ID matches intended server
 deployment target is intentional
 test server and main server are not confused
 command deployment is guild-scoped
 global command deployment is not used
Frontend Environment

Frontend production variables in Vercel:

NEXT_PUBLIC_BACKEND_URL=https://api.citadelnexus.app
NEXT_PUBLIC_API_BASE_URL=https://api.citadelnexus.app
NEXT_PUBLIC_SITE_URL=https://citadelnexus.app
NEXT_PUBLIC_DISCORD_INVITE_URL=
NEXT_PUBLIC_DISCORD_SERVER_ID=1387684189834313798

Frontend environment checks:

 production backend URL defined
 API base URL defined
 site URL defined
 Discord invite URL defined
 Discord server ID defined
 no private secrets stored in frontend public env variables

Important:

Frontend variables beginning with NEXT_PUBLIC_ are public.

Never place private secrets in frontend env variables.

Environment Approval
Backend API Env Verified: Yes
Frontend Env Verified: Yes
Future Bot Runtime Env Verified: Pending
Secrets Safe: Yes
Reviewer: Anthony Hammon
Date: 2026-05-09
Notes: Backend API production environment was cleaned. Frontend production URL alignment was configured in Vercel.
4. Discord Verification
Purpose

Discord verification confirms that the Ascension Command bot is installed in the correct server, has the correct scopes, has the correct permissions, and is not accidentally targeting the wrong guild.

Discord is the interaction surface only.

It must not be treated as the source of gameplay truth.

Discord Application

Current Discord application:

Application Name: Ascension Command
Primary Runtime: Citadel Ascension
Command Scope: Guild-scoped

Required checks:

 Discord Developer Portal application exists
 bot user exists
 bot token is not committed
 bot was previously tested locally
 commands were previously registered in controlled guild scope
 production bot runtime launch pending
 production bot PM2 process pending
Required OAuth2 Scopes

The bot should be installed with these scopes:

bot
applications.commands

Checklist:

 bot scope selected
 applications.commands scope selected
 generated install URL targets the correct application
 bot installed into correct guild
 permissions re-reviewed before production bot launch
Recommended Bot Permissions

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

 bot can view controlled testing/admin channel
 bot can send messages
 bot can use slash commands
 bot can send embeds
 bot does not need Administrator
 bot does not need Manage Roles yet
Role Sync Warning

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
 backend role sync mutation not active
 no Discord role treated as source of truth
 Manage Roles permission not granted or not used for mutation
Discord Approval
Discord App Verified: Yes
Correct Guild Verified: Yes
Bot Permissions Reviewed: Yes for alpha, pending final review before hosted bot runtime
Role Mutation Disabled: Yes
Reviewer: Anthony Hammon
Date: 2026-05-09
Notes: Discord bot runtime remains separate from the backend API process.
5. Database Persistence Verification
Purpose

Database persistence verification confirms that gameplay state is stored in Supabase/Postgres and survives runtime restarts, bot restarts, local machine restarts, and future production host migration.

If persistence fails, production bot deployment must stop.

Database Source of Truth

Current database:

Database Type: Supabase/Postgres
Runtime Variable: DATABASE_URL
Persistence Status: Enabled
Current Verification Status: Local/reboot persistence previously verified

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
Required Persistence Test Before Hosted Bot Runtime

Run this test after any runtime change, database change, dependency update, host migration, or environment change.

Step 1 — Start Runtime
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
Step 2 — Capture Player State

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
Step 3 — Mutate State Safely

Run a safe command such as:

/claim

or:

/mission recon

Record updated state:

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
Step 4 — Restart Runtime

Stop runtime:

CTRL + C

Restart:

npm run ascension:dev

Checklist:

 runtime stops cleanly
 runtime restarts cleanly
 Supabase reconnects
 bot comes back online
Step 5 — Recheck State

Run:

/status

Expected result:

profile remains intact
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
Persistence Stop Conditions

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
Database Approval
Database Connection Verified: Previously verified locally
Persistence Restart Test Passed: Previously verified locally
Hosted Bot Runtime Persistence Test: Pending
No Reset Detected: Previously verified locally
No Duplicate Profile Detected: Previously verified locally
Reviewer: Anthony Hammon
Date: 2026-05-09
Notes: API deployment does not equal hosted bot runtime deployment. Re-run persistence test before starting the bot under PM2.
6. Backend API Runtime Verification
Purpose

Backend API runtime verification confirms that the Express API starts correctly, serves production routes, respects CORS, and does not boot the Discord bot runtime inside the API process.

Backend API Scripts

Current backend scripts include:

{
  "build": "tsc",
  "start": "node dist/index.js"
}

Backend API PM2 process:

citadel-backend

Backend API production command:

npm start
Production API Checks

Run from server:

curl -i https://api.citadelnexus.app/

Expected result:

HTTP/1.1 200 OK
Citadel Nexus Backend Running

Checklist:

 root API endpoint returns 200
 API served through Nginx
 API served through HTTPS domain
 Express server running
 PM2 process online
Session Route Checks

Run:

curl -i https://api.citadelnexus.app/session/me

Expected unauthenticated result:

HTTP/1.1 401 Unauthorized
{"error":"No active session"}

Checklist:

 /session/me route exists
 unauthenticated state returns 401
 route does not crash
 response is JSON
Member State Route Checks

Run:

curl -i https://api.citadelnexus.app/member-state/me

Expected unauthenticated result:

HTTP/1.1 401 Unauthorized
{"error":"No active session"}

Checklist:

 /member-state/me route exists
 unauthenticated state returns 401
 route does not crash
 response is JSON
Ascension Summary Route Checks

Run:

curl -i https://api.citadelnexus.app/ascension-summary/me

Expected unauthenticated result:

HTTP/1.1 401 Unauthorized
{"ok":false,"error":"No active session."}

Checklist:

 /ascension-summary/me route exists
 unauthenticated state returns 401
 route does not crash
 response is JSON
CORS Verification

Allowed origins:

https://citadelnexus.app
https://www.citadelnexus.app

Expected allowed-origin checks:

curl -i https://api.citadelnexus.app/ -H "Origin: https://citadelnexus.app"
curl -i https://api.citadelnexus.app/ -H "Origin: https://www.citadelnexus.app"

Expected result:

Access-Control-Allow-Origin: https://citadelnexus.app
Access-Control-Allow-Origin: https://www.citadelnexus.app

Blocked-origin check:

curl -i https://api.citadelnexus.app/ -H "Origin: https://byenix.online"

Expected result:

HTTP/1.1 500 Internal Server Error
Error: CORS blocked origin

Checklist:

 root origin allowed
 www origin allowed
 unauthorized external origin blocked
 credentials allowed
 production CORS no longer locked to localhost only
API Runtime Approval
Backend API Starts Cleanly: Yes
API Routes Verified: Yes
CORS Verified: Yes
Bot Runtime Disabled Inside API: Yes
Reviewer: Anthony Hammon
Date: 2026-05-09
Notes: Backend API production runtime is active and stable under PM2.
7. Admin Safety Verification
Purpose

Admin safety verification confirms that powerful commands are restricted, logged, and protected from accidental use.

Admin commands can alter player progression and economy state.

They must remain controlled during alpha.

Admin Command Layer

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

 admin commands registered during local alpha testing
 admin commands route to admin handler
 admin commands log as [ADMIN]
 admin commands are not publicly advertised
 admin commands tested only in controlled channels
 re-check after hosted bot runtime launch
Founder/Admin Control

Required backend variable for bot runtime:

FOUNDER_IDS=

Checklist:

 founder-only admin access previously verified
 unauthorized user blocked during prior alpha test
 unauthorized attempts did not mutate state
 verify again after production bot runtime starts
Destructive Command Protection

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
 global reset blocked by ALLOW_GLOBAL_RESET=false
 destructive actions reviewed during alpha
 re-test protections after hosted bot runtime launch
Controlled Reward Verification

Controlled reward verification confirms that prize-pool distribution works as the preferred reward-management path instead of relying only on direct admin mutation commands.

Tested commands:

/admin_prize_pool_view
/admin_prize_pool_add
/admin_prize_pool_award
/admin_prize_pool_remove
/status
/admin_player_view

Verified behavior:

prize pool status displays correctly
XP can be added to the prize pool
XP can be awarded from the prize pool
player XP updates after prize-pool award
prize pool balance decreases after award
XP can be removed from the prize pool
final pool balance reconciles correctly
terminal logs show [ADMIN] entries
no runtime crash occurred
no Prisma error occurred
no duplicate player profile appeared
no player reset occurred

Verification result:

Initial prize pool view: passed
Prize pool add test: passed
Prize pool award test: passed
Player state verification: passed
Prize pool remove test: passed
Final prize pool view: passed
Admin Safety Approval
Controlled Reward Path Verified: Yes
Prize Pool View Verified: Yes
Prize Pool Add Verified: Yes
Prize Pool Award Verified: Yes
Prize Pool Remove Verified: Yes
Player XP Update Verified: Yes
Admin Logs Verified: Yes
Founder/Admin IDs Verified: Yes
Unauthorized Admin Access Blocked: Yes
Destructive Commands Protected: Yes
Global Reset Disabled: Yes
Reviewer: Anthony Hammon
Date: 2026-05-07
Notes: Prize pool commands verified in the main CNX server admin channel. Founder-only execution path remained active. Pool accounting reconciled correctly after add, award, and remove tests.
8. Production Host Verification
Purpose

Production host verification confirms that the DigitalOcean droplet is safe to use for the backend API and later bot runtime.

Current Hosting Status
Domain: citadelnexus.app
Frontend Host: Vercel
Backend API Host: DigitalOcean
Backend API Domain: api.citadelnexus.app
Backend API PM2 Process: citadel-backend
Backend API Status: Active
Discord Bot Runtime: Deferred

Checklist:

 DigitalOcean droplet exists
 SSH access verified
 non-root deploy user available
 backend repo cloned
 dependencies installed
 production .env created manually on server
 production .env not committed
 backend API built with npm run build
 PM2 process running
 Nginx serving API domain
 HTTPS active
 backend API returns 200
 CORS allowlist configured
 bot runtime PM2 process not yet created
 bot runtime production environment not yet fully verified
Server Hardening

Required server hardening before public runtime:

SSH access verified: yes
non-root deploy user created: yes
system packages updated: yes
UFW firewall configured: yes
Nginx installed and active: yes
Certbot/SSL configured: yes
Node.js installed: yes
Git installed: yes
PM2 installed: yes
backend repo cloned from GitHub: yes
dependencies installed: yes
production .env created manually on server: yes
production .env permissions reviewed: yes

Recommended additional review:

password login disabled if SSH keys are configured
fail2ban installed or reviewed
SSH restricted by trusted IP if practical
log rotation reviewed
Production Host Approval
DigitalOcean Droplet Verified: Yes
Server Hardened for Backend API: Yes
Production Env Created Safely: Yes
Ready for Backend API PM2: Yes
Ready for Bot PM2: Pending
Reviewer: Anthony Hammon
Date: 2026-05-09
Notes: Production host is active for backend API. Ascension bot runtime remains deferred as separate PM2 process.
9. PM2 Verification
Purpose

PM2 verification confirms that production processes can run as managed services, recover from restarts, persist through server reboots, and provide readable logs.

Active PM2 Process

Current active PM2 process:

Process Name: citadel-backend
Purpose: Backend API
Command: npm start
Expected Runtime: node dist/index.js
Port: 3001

Verification commands:

pm2 status
pm2 logs citadel-backend --lines 30
systemctl is-enabled pm2-deploy
systemctl status pm2-deploy --no-pager

Checklist:

 PM2 installed
 citadel-backend process exists
 citadel-backend status online
 logs readable
 PM2 process saved
 PM2 startup service enabled
 backend API responds after restart
Future Bot Runtime PM2 Target

Future production runtime file:

src/modules/ascension/runtime/bot-entry.js

Recommended future PM2 process name:

citadel-ascension-bot

Future production command:

pm2 start src/modules/ascension/runtime/bot-entry.js --name citadel-ascension-bot

Checklist before future bot PM2 launch:

 production bot .env reviewed
 Discord guild targeting reviewed
 database connection verified
 bot token current
 admin/founder IDs reviewed
 ALLOW_GLOBAL_RESET=false
 bot starts under PM2
 bot appears online in Discord
 /status works after PM2 startup
PM2 Approval
PM2 Installed: Yes
Backend API Starts Under PM2: Yes
Backend API Restart Test Passed: Yes
PM2 Startup Enabled: Yes
Bot Runtime Starts Under PM2: Pending
Bot Runtime Reboot Survival Verified: Pending
Reviewer: Anthony Hammon
Date: 2026-05-09
Notes: PM2 is verified for backend API. Bot runtime PM2 setup is intentionally deferred.
10. Domain and DNS Verification
Purpose

Domain and DNS verification confirms that citadelnexus.app, www.citadelnexus.app, and api.citadelnexus.app are routed correctly without disrupting the Discord bot runtime.

The Discord bot does not require public DNS by itself.

DNS becomes required for the frontend, backend API, OAuth callbacks, webhooks, and public dashboards.

Current Domain Layout
citadelnexus.app          -> Vercel frontend
www.citadelnexus.app      -> Vercel frontend
api.citadelnexus.app      -> DigitalOcean backend API
status.citadelnexus.app   -> optional future status page

Checklist:

 domain ownership confirmed
 DNS manager confirmed as IONOS
 root domain points to Vercel
 www domain points to Vercel
 api subdomain points to DigitalOcean
 Vercel domain configuration valid
 backend API domain reachable
 SSL active for frontend
 SSL active for backend API
DNS Stop Conditions

Stop DNS changes if:

droplet IP is not final
frontend host is not selected
backend API is not ready
SSL plan is not ready
existing DNS records are unclear
production host is not hardened
rollback path is not known

Current status:

DNS changes completed and validated.
Domain Approval
Domain Ownership Verified: Yes
DNS Manager Confirmed: Yes
Production DNS Configured: Yes
API Subdomain Active: Yes
Reviewer: Anthony Hammon
Date: 2026-05-09
Notes: citadelnexus.app and www are connected to Vercel. api.citadelnexus.app routes to the DigitalOcean backend API.
11. Monitoring and Logs
Purpose

Monitoring and logs allow runtime behavior to be reviewed after startup, command use, errors, crashes, restarts, and future production incidents.

The current alpha system uses PM2 and terminal logs first.

More advanced monitoring can be added later.

Current Backend API Logs

Useful commands:

pm2 status
pm2 logs citadel-backend --lines 30
pm2 monit
journalctl -u pm2-deploy --no-pager

Current backend API logs should confirm:

backend startup
port 3001 binding
API request handling
CORS blocked-origin errors when applicable
no bot runtime startup inside API process
no secrets printed

Checklist:

 PM2 logs accessible
 startup logs visible
 error logs visible
 restart history visible
 logs do not expose bot token
 logs do not expose database URL
Future Bot Runtime Logs

Future bot runtime logs should confirm:

bot startup
database connection
phase cap
command execution
admin command execution
runtime errors
Discord interaction failures
database failures

Expected command logs:

[CMD] /status | discord:USER_ID | TIMESTAMP
[CMD] /claim | discord:USER_ID | TIMESTAMP
[CMD] /mission | discord:USER_ID | TIMESTAMP
[CMD] /build | discord:USER_ID | TIMESTAMP
[ADMIN] /admin_command_name | discord:USER_ID | TIMESTAMP

Production logs must not expose:

bot token
database URL
wallet keys
private keys
webhook secrets
production credentials
Future Monitoring Improvements

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

Monitoring Approval
Backend API Logs Verified: Yes
PM2 Logs Verified: Yes
Secrets Hidden From Logs: Yes
Runtime Errors Reviewable: Yes
Bot Runtime Logs Verified: Pending
Reviewer: Anthony Hammon
Date: 2026-05-09
Notes: Backend API logs are available through PM2. Bot runtime logging will be verified when bot PM2 process is launched.
12. Rollback Plan
Purpose

The rollback plan defines what to do if production deployment fails, routes break, commands break, database state behaves incorrectly, or the bot becomes unsafe.

Rollback must be known before production launch.

Rollback Priorities

Rollback priorities:

Protect secrets
Stop unsafe runtime behavior
Preserve database state
Prevent wrong-server command usage
Restore last known working code
Re-verify persistence
Resume only after root cause is identified
Immediate Backend API Stop

If the backend API behaves incorrectly:

pm2 stop citadel-backend
pm2 status

Checklist:

 backend API process stopped
 logs preserved
 root cause reviewed before restart
Immediate Bot Runtime Stop

If the production bot behaves incorrectly:

pm2 stop citadel-ascension-bot
pm2 status

Checklist:

 bot process stopped
 bot offline in Discord
 no further commands execute
 logs preserved for review
Restart Current Backend API

If issue is temporary and code is safe:

pm2 restart citadel-backend --update-env
pm2 logs citadel-backend --lines 30
curl -i https://api.citadelnexus.app/

Checklist:

 backend restarts
 API returns 200
 logs show no recurring error
Git Rollback

Identify last known good commit:

git log --oneline -10

Return to known good commit only after confirming target commit:

git checkout COMMIT_HASH
npm install
npm run build
pm2 restart citadel-backend --update-env

Checklist:

 last known good commit identified
 rollback commit confirmed
 dependencies installed
 build passed
 PM2 restarted
 API verified
Command Rollback

If slash commands are registered incorrectly:

Correct GUILD_ID
Correct command deployment file if needed
Redeploy guild commands:
npm run ascension:deploy

Checklist:

 incorrect guild identified
 correct guild confirmed
 commands redeployed
 commands appear correctly
 wrong-server issue resolved
Secret Exposure Rollback

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
Rollback Approval
Backend Stop Procedure Known: Yes
Bot Runtime Stop Procedure Known: Yes
Git Rollback Procedure Known: Yes
Command Rollback Procedure Known: Yes
Secret Rotation Procedure Known: Yes
Reviewer: Anthony Hammon
Date: 2026-05-09
Notes: Backend API rollback is available through PM2 and Git. Bot rollback applies once bot runtime is hosted.
13. Post-Deployment Validation
Purpose

Post-deployment validation confirms that the production frontend and backend API are operating safely after launch.

Production bot runtime validation remains pending.

Backend API Validation

Validated endpoints:

GET https://api.citadelnexus.app/
GET https://api.citadelnexus.app/session/me
GET https://api.citadelnexus.app/member-state/me
GET https://api.citadelnexus.app/ascension-summary/me

Expected results:

/                         -> 200 OK
/session/me               -> 401 No active session
/member-state/me          -> 401 No active session
/ascension-summary/me     -> 401 No active session

Checklist:

 backend root route works
 session route works
 member-state route works
 ascension-summary session route works
 unauthenticated state is controlled
 API does not crash
Frontend Validation

Validated production routes:

https://citadelnexus.app/
https://citadelnexus.app/system
https://citadelnexus.app/gameplay
https://citadelnexus.app/roadmap
https://citadelnexus.app/pillars
https://citadelnexus.app/foundations
https://citadelnexus.app/trust-bridge
https://citadelnexus.app/enter
https://citadelnexus.app/app

Checklist:

 homepage loads
 system page loads
 gameplay page loads
 roadmap page loads
 pillars page loads
 foundations page loads
 trust bridge page loads
 enter page loads
 app/member surface loads controlled no-session state
 frontend points to production backend API
Public Safety Validation

Deferred systems remain disabled:

CNX token enforcement disabled
wallet enforcement disabled
automatic role mutation disabled
payout automation disabled
Hedera settlement disabled
public reward economy disabled
NFT entitlement enforcement disabled
premium access enforcement disabled

Checklist:

 CNX token enforcement disabled
 wallet enforcement disabled
 automatic role mutation disabled
 payout automation disabled
 Hedera settlement disabled
 public reward economy disabled
Post-Deployment Approval
Frontend Production Online: Yes
Backend API Production Online: Yes
Player Commands Verified on Hosted Bot: Pending
Persistence Verified on Hosted Bot: Pending
Admin Safety Verified on Hosted Bot: Pending
Deferred Systems Disabled: Yes
Reviewer: Anthony Hammon
Date: 2026-05-09
Notes: Frontend and backend API are live. Bot runtime production hosting remains pending.
14. Deferred Systems Lockout
Purpose

Deferred systems lockout prevents unfinished or high-risk systems from activating before they are designed, audited, and approved.

Citadel Nexus must not accidentally activate token utility, wallet gating, payouts, role mutation, or public economy rewards during the current alpha phase.

Deferred Systems

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
Activation Requirements

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
 no hidden environment flag intentionally enables deferred systems
 no production route intentionally enables deferred systems
 no Discord command intentionally exposes deferred systems
 no background job intentionally executes deferred systems
Role Mutation Lockout

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

 role sync code not active as mutation authority
 no command triggers role mutation
 no automatic entitlement mutation occurs
 bot Manage Roles permission reviewed before future activation
Wallet/CNX Lockout

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
Deferred Systems Approval
Deferred Systems Reviewed: Yes
Role Mutation Disabled: Yes
Wallet Enforcement Disabled: Yes
CNX Enforcement Disabled: Yes
Reviewer: Anthony Hammon
Date: 2026-05-09
Notes: Production frontend/backend API launch did not activate deferred utility systems.
15. Deployment Approval Record
Purpose

The deployment approval record provides a final sign-off before moving to the next controlled production validation step.

Final Verification Summary
Pre-Deployment Gate Complete: Yes for frontend/backend API
Repository Verification Complete: Yes
Environment Verification Complete: Yes for frontend/backend API
Discord Verification Complete: Yes for local/internal alpha; hosted bot pending
Database Persistence Verification Complete: Previously verified locally; hosted bot pending
Backend API Runtime Verification Complete: Yes
Admin Safety Verification Complete: Previously verified locally; hosted bot pending
Production Host Verification Complete: Yes for backend API
PM2 Verification Complete: Yes for backend API
Domain and DNS Verification Complete: Yes
Monitoring and Logs Verification Complete: Yes for backend API
Rollback Plan Complete: Yes
Post-Deployment Validation Complete: Yes for frontend/backend API
Deferred Systems Lockout Complete: Yes
Deployment Decision

Current decision:

Approved for production-hosted frontend and backend API.
Approved for controlled internal alpha validation.
Not yet approved for full public Discord bot runtime production.

Reason:

The frontend and backend API are live, reachable over production domains, configured with production API URLs, and running under managed infrastructure. The Ascension Discord bot runtime remains intentionally separated from the backend API process and should only be launched as its own PM2 process after the bot-specific environment, persistence, admin safety, and rollback tests are repeated.

Final Approval
Reviewer: Anthony Hammon
Date: 2026-05-09
Deployment Target: Frontend + Backend API production foundation
GitHub Backend Commit: 49fcd3c or later
GitHub Frontend Commit: Vercel production deployment from main
Discord Target Guild: 1387684189834313798
Production Frontend Host: Vercel
Production Backend Host: DigitalOcean
Approved Status: Approved for frontend/backend API production foundation and controlled Step 8 validation
Notes: Proceed to Step 8 only as a controlled dev-login/member-state validation path. Do not activate hosted Discord bot runtime yet.
16. Step 8 Readiness Gate
Purpose

Step 8 validates the production member-state path through a controlled test session without activating the full Discord bot runtime.

This step is intended to confirm:

production API can create or resolve a controlled test session
session cookies work through production HTTPS
frontend can call backend API with credentials
/session/me resolves authenticated state
/member-state/me resolves authenticated member state
/ascension-summary/me resolves authenticated Ascension summary or controlled null
no Discord bot runtime is required for this validation
Step 8 Scope

Approved Step 8 target:

Controlled production dev-login test path

Allowed:

temporary controlled dev-login testing
session cookie validation
frontend/backend API credential validation
member-state rendering validation
Ascension summary route validation

Not allowed:

public login launch
wallet enforcement
CNX enforcement
payout activation
automatic role mutation
global reset
full public Discord bot runtime activation
Step 8 Preconditions

Before Step 8:

 backend API online
 frontend online
 DNS valid
 CORS allowlist valid
 session route exists
 member-state route exists
 ascension-summary /me route exists
 PM2 backend API stable
 checklist updated
 checklist update committed
 checklist update pushed
Step 8 Approval
Step 8 Ready: Yes, after this checklist update is committed and pushed
Reviewer: Anthony Hammon
Date: 2026-05-09
Notes: Proceed with controlled production dev-login validation only. Keep bot runtime deferred.

End of Deployment Checklist.

---

## Step 9 Validation — Ascension Discord Runtime PM2 Deployment

Status: PASS

Date: 2026-05-09  
Reviewer: Anthony Hammon

Confirmed:
- `citadel-ascension` runs as a separate PM2 process.
- `citadel-backend` remains isolated as the API process.
- Both processes are online under PM2.
- `pm2 save` completed successfully.
- Discord slash commands respond while local development machine is not required.
- Ascension runtime connects to Prisma/Supabase successfully.
- Phase 1 caps are active.
- Bot runtime remains separate from backend API host logic.

Operational Boundary:
- Discord is an interface.
- Backend remains the source of truth.
- Ascension runtime may process current Phase 1 commands.
- CNX utility enforcement, wallet entitlement logic, payout automation, and role mutation remain deferred unless separately authorized.

---

## Step 10 Validation — Final Controlled Production-Dev Runtime Check

Status: PASS

Date: 2026-05-09  
Reviewer: Anthony Hammon

Confirmed:
- Public frontend is online.
- Backend API root responds with HTTP 200.
- CORS allows `https://citadelnexus.app`.
- Browser session dev-login was successfully tested.
- `/session/me` returned active session user data.
- `/member-state/me` returned full member state.
- `/ascension-summary/me` returned `summary: null`, which is acceptable because no Ascension summary is linked yet.
- Temporary frontend dev-login route is locked by environment variable.
- `NEXT_PUBLIC_ENABLE_DEV_LOGIN=false` is active in production.
- Discord Ascension runtime is online as a persistent PM2 process.
- Discord slash commands respond.
- PM2 process list has been saved.

Current Production-Dev State:
- Frontend: online
- Backend API: online
- Discord Ascension Runtime: online
- Supabase/Prisma: connected
- Dev-login surface: locked
- Public launch: not yet open
- Controlled validation: passed

Result:
Citadel Nexus has passed controlled production-dev runtime validation. The system is online, persistent, and correctly separated between frontend, backend API, and Discord runtime.


---

## Step 9 Validation — Ascension Discord Runtime PM2 Deployment

Status: PASS

Date: 2026-05-09  
Reviewer: Anthony Hammon

Confirmed:
- `citadel-ascension` runs as a separate PM2 process.
- `citadel-backend` remains isolated as the API process.
- Both processes are online under PM2.
- `pm2 save` completed successfully.
- Discord slash commands respond while local development machine is not required.
- Ascension runtime connects to Prisma/Supabase successfully.
- Phase 1 caps are active.
- Bot runtime remains separate from backend API host logic.

Operational Boundary:
- Discord is an interface.
- Backend remains the source of truth.
- Ascension runtime may process current Phase 1 commands.
- CNX utility enforcement, wallet entitlement logic, payout automation, and role mutation remain deferred unless separately authorized.

---

## Step 10 Validation — Final Controlled Production-Dev Runtime Check

Status: PASS

Date: 2026-05-09  
Reviewer: Anthony Hammon

Confirmed:
- Public frontend is online.
- Backend API root responds with HTTP 200.
- CORS allows `https://citadelnexus.app`.
- Browser session dev-login was successfully tested.
- `/session/me` returned active session user data.
- `/member-state/me` returned full member state.
- `/ascension-summary/me` returned `summary: null`, which is acceptable because no Ascension summary is linked yet.
- Temporary frontend dev-login route is locked by environment variable.
- `NEXT_PUBLIC_ENABLE_DEV_LOGIN=false` is active in production.
- Discord Ascension runtime is online as a persistent PM2 process.
- Discord slash commands respond.
- PM2 process list has been saved.

Current Production-Dev State:
- Frontend: online
- Backend API: online
- Discord Ascension Runtime: online
- Supabase/Prisma: connected
- Dev-login surface: locked
- Public launch: not yet open
- Controlled validation: passed

Result:
Citadel Nexus has passed controlled production-dev runtime validation. The system is online, persistent, and correctly separated between frontend, backend API, and Discord runtime.

