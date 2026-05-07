# Citadel Ascension Runtime Runbook

## Purpose

This runbook explains how to operate, deploy, recover, and verify the Citadel Ascension Discord bot runtime for Citadel Nexus.

The Ascension runtime connects Discord slash commands to backend gameplay logic and Supabase-backed persistent state.

Discord is the interface. The backend remains the source of truth.

## Operational Classification

Current Status: Internal Alpha Runtime  
Production Status: Not Public  
Primary Runtime: Local Development  
Production Host: Deferred  
Economy Enforcement: Controlled  
Wallet Enforcement: Disabled

## Table of Contents

1. Runtime Overview
2. Directory Structure
3. Environment Files
4. Local Development
5. Command Deployment
6. Main Server Deployment
7. Persistence Verification
8. Token Rotation
9. Failure Recovery
10. DigitalOcean Production Plan
11. Safety Rules

---

## 1. Runtime Overview

### Runtime Purpose

Citadel Ascension is the gameplay runtime layer for Citadel Nexus.

The system currently supports:

- persistent player progression
- slash-command gameplay interaction
- Supabase-backed state persistence
- local and production runtime deployment
- controlled admin tooling
- future CNX integration pathways

The runtime currently operates in Phase 1 alpha mode.

---

### Runtime Components

### Discord Layer

Responsible for:

- slash command interface
- embeds and gameplay display
- player interaction surface

Discord does **not** define gameplay truth.

---

### Backend Runtime

Responsible for:

- gameplay logic
- economy rules
- progression
- cooldown enforcement
- persistence orchestration
- command routing

The backend is the authoritative source of truth.

---

### Database Layer

Supabase/Postgres currently stores:

- player profiles
- credits
- intel
- XP
- buildings
- cooldowns
- progression state
- session history

Persistence has been verified through reboot testing.

---

### Current Runtime Status

Verified operational:

- `/start`
- `/status`
- `/claim`
- `/mission`
- `/build`
- admin command layer
- slash command deployment
- reboot persistence
- nodemon local runtime
- Supabase connection validation
- main CNX server command execution

---

### Current Runtime Mode

Current environment classification:

```text
Phase: Alpha
Mode: Local Development
Persistence: Enabled
Database: Supabase/Postgres
Discord Scope: Guild-scoped
Economy Status: Controlled
CNX Integration: Deferred
```

---

## 2. Directory Structure

### Backend Structure

```text
backend/
├── docs/
├── prisma/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── lib/
│   ├── modules/
│   │   └── ascension/
│   │       ├── admin/
│   │       ├── config/
│   │       ├── docs/
│   │       ├── handlers/
│   │       ├── loot/
│   │       ├── runtime/
│   │       └── services/
│   ├── routes/
│   ├── services/
│   └── utils/
├── contracts/
├── database/
├── scripts/
└── step1-token-foundation/

```

## Runtime Launcher

`src/modules/ascension/runtime/bot-entry.js`

Responsible for:

Discord client startup
event registration
runtime initialization
Supabase verification
gameplay runtime activation
interaction routing

## Slash Command Deployment

`src/modules/ascension/runtime/deploy-commands.js`

Responsible for:

guild slash command registration
command updates
Discord API synchronization
player command registration
admin command registration

## 3. Environment Files

Backend Runtime Variables
`backend/.env`

Contains:

Discord bot token
Discord application/client ID
Discord guild/server ID
Supabase/Postgres connection string
runtime control flags
founder/admin IDs
phase control settings

Never commit this file.

Backend Environment Example
`backend/.env.example`

Safe public template only.

Contains:

variable names
non-secret defaults
configuration structure

Recommended template:

```env
# Database
DATABASE_URL=

# Discord Bot
BOT_TOKEN=
CLIENT_ID=
GUILD_ID=

# Founder/Admin Control
FOUNDER_IDS=

# Ascension Phase Control
CURRENT_PHASE=1

# Safety Flags
ALLOW_GLOBAL_RESET=false
STRICT_ECONOMY=false
ADMIN_MODE=dev
```

Frontend Runtime Variables
`app/.env.local`

Contains frontend-only runtime configuration.

Never commit this file.

Frontend Environment Example
`app/.env.example`

Safe public template only.

Recommended template:

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_DISCORD_INVITE_URL=
NEXT_PUBLIC_DISCORD_SERVER_ID=
```

## 4. Local Development

Start Backend API Runtime

From:

```text
C:\CitadelNexus\backend
```

Run:

npm run dev

This starts the backend API development runtime.

Start Ascension Bot Runtime

From:

```text
C:\CitadelNexus\backend
```

Run:

```bash
npm run ascension:dev
```

Expected output:

Citadel Ascension online as Ascension Command
Prisma/Supabase connection verified
Phase 1 caps active

Keep this terminal open while testing Discord slash commands.

Start Frontend App

From:

C:\CitadelNexus\app

Run:

npm run dev

Default local frontend URL:

<http://localhost:3000>

## 5. Command Deployment

Deploy Slash Commands

From:

```text
C:\CitadelNexus\backend
```

Run:

```bash
npm run ascension:deploy
```

Expected output:

Registering 5 player + 22 admin commands...
All commands registered.
Current Player Commands
/start
/status
/claim
/mission
/build
Current Admin Command Layer

Admin commands are registered but must remain controlled.

Examples include:

/admin_help
/admin_player_view
/admin_add_xp
/admin_reset_player
/admin_reset_all
/admin_prize_pool_view

Destructive admin commands must remain protected by founder/admin checks, confirmation phrases, and safety flags.

## 6. Main Server Deployment

Current Main Server
Citadel Nexus (CNX Token)
Guild ID: 1387684189834313798
Current Test Server
Citadel Nexus Test Server
Guild ID: 1487371225838911498
Deployment Rule

Use guild-scoped command deployment until production maturity improves.

Before deploying commands, confirm:

GUILD_ID=
CLIENT_ID=
BOT_TOKEN=

Then run:

```bash
npm run ascension:deploy
```

After deploying commands, start the runtime:

```bash
npm run ascension:dev
```

Test inside an admin-only channel first.

## 7. Persistence Verification

Use this sequence after runtime changes, dependency updates, database changes, or server moves.

Step 1 — Record Player State

Run in Discord:

/status

Record:

XP
credits
intel
power
buildings
cooldowns
rank/stage
Step 2 — Stop Runtime

In the runtime terminal:

CTRL + C
Step 3 — Restart Runtime

```bash
npm run ascension:dev
```

Wait for:

Prisma/Supabase connection verified
Step 4 — Recheck Player State

Run:

/status

Expected result:

values remain stable
cooldowns remain stable
buildings remain stable
profile does not reset

If values reset, stop deployment and audit database connection settings immediately.

## 8. Token Rotation

Rotate the Discord bot token if:

token appears in a screenshot
token is pasted into chat
token may have been exposed
GitHub secret scanning triggers
unknown bot behavior appears
bot is moved to production infrastructure
Rotation Steps
Open Discord Developer Portal.
Select the Ascension Command application.
Go to the Bot section.
Reset token.
Update local `backend/.env`.
Update server-side production environment when deployed.
Restart runtime.
Confirm bot comes online.
Test /status.

Never commit tokens.

## 9. Failure Recovery

Slash Commands Do Not Appear

Check:

bot is installed in the correct server
GUILD_ID matches the target server
commands were deployed with

```bash
npm run ascension:deploy
```

bot was installed with bot and applications.commands scopes
Application Did Not Respond

Usually means the runtime is offline or crashed.

Check:

terminal is still running

```bash
npm run ascension:dev
```

is active
no startup errors exist
Prisma/Supabase connection verified
bot token is valid
Prisma/Supabase Failure

Check:

DATABASE_URL exists
Supabase project is active
database password is correct
network access is available
Prisma client is generated
src/lib/prisma.js exists for the bot runtime bridge
Command Handler Error

Check terminal logs for:

[ERR] /command_name

Then audit:

handler file
service dependency
database query
option names
Discord interaction reply/defer flow

## 10. DigitalOcean Production Plan

The DigitalOcean droplet should become the production runtime host when ready.

Production runtime should remain private until:

- audit logging is implemented
- role synchronization is dry-run validated
- economy enforcement testing completes
- wallet verification architecture is finalized
- automated recovery procedures are verified

Recommended Production Split
citadelnexus.app        -> frontend app
api.citadelnexus.app    -> backend API
Discord bot runtime     -> PM2-managed Node process
Supabase/Postgres       -> database persistence
Initial Server Tasks
Power on droplet.
SSH into server.
Update Ubuntu packages.
Create non-root deploy user.
Configure UFW firewall.
Install Node.js LTS.
Install Git.
Install PM2.
Clone backend repo.
Install dependencies.
Create production .env directly on server.
Deploy slash commands.
Start bot with PM2.
Enable PM2 startup on reboot.
Verify /status in the main server.
PM2 Target

Future production command:

```bash
pm2 start src/modules/ascension/runtime/bot-entry.js --name citadel-ascension-bot
```

Then:

```bash
pm2 save
```

```bash
pm2 startup
```

PM2 provides:

crash recovery
process restart
runtime logs
reboot survival
production process management

## 11. Safety Rules

Never Commit
.env
.env.local
tokens
database URLs
wallet keys
private keys
secret webhook URLs
production credentials
Do Not Enable Yet

These remain deferred:

CNX token utility enforcement
wallet verification
automatic role mutation
payout automation
Hedera settlement
public economy rewards
Role Sync Warning

Do not grant the bot Manage Roles until:

role sync is dry-run tested
role mapping is explicit
bot role hierarchy is confirmed
audit logging is active
sync rollback behavior exists

---

End of Runbook.
