# Citadel Nexus Do Not Touch List

## Document Purpose

This document defines the systems, files, settings, credentials, workflows, and operational areas that must not be changed without explicit approval.

This file protects Citadel Nexus from accidental damage, premature feature activation, unsafe automation, security exposure, economy corruption, wallet risk, and production instability.

This file is not public marketing copy.

AGENTS.md remains the controlling operating law.

APPROVAL_GATES.md defines approval requirements.

IMPLEMENTATION_PHASES.md defines phase boundaries.

---

## 1. Master Rule

Do not touch high-risk systems without explicit approval.

If unsure, stop and ask.

No AI agent, automation, script, dashboard, Discord bot command, or human operator should modify protected systems casually.

Speed is not safety.

Confidence is not approval.

A working prototype is not approval.

---

## 2. Absolute Do Not Touch Areas

Do not touch without explicit approval:

- production environment variables
- database connection strings
- Discord bot token
- wallet/private keys
- seed phrases
- treasury accounts
- token transfer logic
- Prisma schema
- Prisma migrations
- production database data
- Discord role IDs
- live Discord role mutation logic
- admin permissions
- economy constants
- XP formulas
- CNX tier thresholds
- CNX multipliers
- prize/payout logic
- dashboard write controls
- emergency controls
- production deployment configuration
- PM2 process configuration
- Nginx configuration
- firewall/security configuration

---

## 3. Secrets and Credentials

Never touch or expose:

- BOT_TOKEN
- DATABASE_URL
- private keys
- seed phrases
- wallet recovery phrases
- treasury keys
- production API keys
- Supabase service role keys
- GitHub tokens
- Discord webhook secrets
- deployment secrets
- server SSH private keys
- payment processor secrets
- .env files with real values

Rules:

- do not commit secrets
- do not paste secrets into chat
- do not print secrets in logs
- do not expose secrets in screenshots
- do not ask for secrets in normal chat
- do not store secrets in docs
- do not add secrets to examples

Use secure platform/environment settings only.

---

## 4. Database and Prisma

Do not touch without approval:

- prisma/schema.prisma
- prisma/migrations/
- production database tables
- production rows
- production indexes
- destructive SQL
- schema defaults
- relations
- unique constraints
- cascade behavior
- model names
- field names
- field types

Forbidden without approval:

- creating migrations
- running migrations
- deleting migrations
- editing old migrations
- resetting production database
- deleting users
- deleting audit logs
- deleting prize records
- deleting Ascension profiles
- deleting role sync audit records
- deleting admin action records

Database changes require:

- documented reason
- affected models
- migration plan
- rollback/recovery plan
- test plan
- owner approval

---

## 5. Discord Bot and Role Safety

Do not touch without approval:

- Discord bot token
- bot production deployment
- slash command registration
- command permissions
- admin commands
- role registry
- role map
- live role mutation service
- Discord role IDs
- guild ID
- founder/admin ID settings
- role sync worker behavior

Forbidden without approval:

- mutating live roles
- changing holder roles
- changing admin/mod roles
- exposing admin commands
- registering global commands
- restarting production bot
- changing command permissions
- changing role sync logic
- removing role sync audit logging

Discord reflects backend truth.

Discord must not define truth.

---

## 6. Economy and Gameplay

Do not touch without approval:

- Game XP values
- Contribution XP values
- Arcade XP values
- mission rewards
- mission failure rules
- mission costs
- claim cooldowns
- Power rules
- Credit rules
- Intel rules
- building costs
- building upgrade rewards
- rank thresholds
- Stage thresholds
- daily caps
- weekly caps
- diminishing returns
- Nexus Score formula
- seasonal reset logic
- prize eligibility rules

Forbidden without approval:

- increasing rewards
- removing caps
- weakening anti-abuse rules
- creating pay-to-win mechanics
- granting XP manually without audit
- bypassing lock state
- bypassing cooldowns
- adding reward loops
- activating Contribution XP early
- activating Arcade XP early
- activating Seasons early

---

## 7. CNX and Wallet Boundaries

Do not touch without approval:

- CNX tier thresholds
- CNX multiplier values
- CNX cooldown benefits
- wallet verification logic
- token read logic
- token transfer logic
- holder role automation
- CNX snapshot design
- CNX dashboard controls
- treasury wallet configuration

Absolutely forbidden:

- requesting seed phrases
- requesting private keys
- storing private keys
- storing seed phrases
- custodying user funds
- spending user CNX
- spending treasury assets
- executing token transfers
- converting CNX to gameplay resources
- guaranteeing prizes from CNX
- allowing CNX to buy rank
- allowing CNX to buy Stage
- allowing CNX to bypass caps

CNX remains optional utility only.

---

## 8. Prize Pool and Payouts

Do not touch without approval:

- prize pool logic
- prize eligibility logic
- payout routes
- payout services
- prize records
- award workflows
- event reward rules
- season reward rules

Forbidden without approval:

- issuing prizes
- approving payouts
- deleting prize records
- auto-awarding rewards
- linking CNX to guaranteed prizes
- bypassing eligibility checks
- bypassing abuse review
- bypassing audit records

Prize systems are high risk.

Prize execution remains locked unless explicitly approved.

---

## 9. Admin and Permission Systems

Do not touch without approval:

- founder IDs
- admin IDs
- admin mode
- admin command permissions
- dashboard permissions
- role-based access logic
- authentication logic
- authorization logic
- global reset controls
- emergency controls

Forbidden without approval:

- granting admin access
- weakening admin checks
- exposing admin endpoints
- enabling global reset
- bypassing audit logs
- allowing agents to approve themselves
- allowing dashboard controls without auth

Admin actions must remain auditable.

Founder actions are not exempt from logs.

---

## 10. Dashboard Write Controls

Do not touch without approval:

- dashboard write endpoints
- emergency buttons
- module freeze controls
- safe mode controls
- economy lockdown controls
- leaderboard freeze controls
- CNX freeze controls
- prize freeze controls
- Discord mutation stop controls
- admin mutation controls

Allowed without high-risk approval:

- static prototype
- mock data
- disabled controls
- read-only planning
- dashboard documentation

Write controls require:

- authentication
- authorization
- reason code
- audit log
- confirmation flow
- owner approval

---

## 11. Production Infrastructure

Do not touch without approval:

- production deployment
- production environment
- PM2 process config
- Nginx config
- firewall config
- DNS config
- SSL config
- server users
- SSH keys
- cron jobs
- production logs containing sensitive data
- backup settings

Forbidden without approval:

- restarting production services
- changing server config
- changing ports
- changing CORS origins
- changing production URLs
- deploying to production
- rotating production secrets
- deleting logs
- deleting backups

Production work must include a plan and verification steps.

---

## 12. AI Agent Boundaries

AI agents must not touch without approval:

- production systems
- main branch
- migrations
- secrets
- env files
- database writes
- Discord role mutation
- XP issuance
- prize issuance
- token operations
- treasury operations
- dashboard write controls
- emergency controls

AI agents may assist with:

- documentation
- audits
- plans
- checklists
- read-only analysis
- safe branch code after approval
- tests
- PR summaries

Agents must stop when risk is high or unclear.

---

## 13. Files Safe to Edit During Knowledge Core Bootstrap

Safe current scope:

- AGENTS.md
- CLAUDE.md
- docs/DOCTRINE/
- docs/ARCHITECTURE/
- docs/BUILD/
- docs/SECURITY/
- docs/QA/

Current branch is documentation-first.

Application logic should not be changed during the knowledge-core bootstrap unless explicitly approved.

---

## 14. Files Requiring Extra Caution

Use extra caution with:

- package.json
- package-lock.json
- tsconfig files
- prisma/schema.prisma
- src/index files
- route files
- service files
- bot runtime files
- Discord command files
- role registry/map files
- .env.example
- deployment config
- PM2 ecosystem files if present
- scripts that affect deployment, database, bot, or roles

Extra caution means inspect first, plan second, approval third, edit last.

---

## 15. Stop Conditions

Stop immediately if a task requires:

- secret access
- production access
- database migration
- live role mutation
- token transfer
- wallet signing
- treasury access
- XP grant
- prize award
- admin permission change
- deployment
- destructive action
- uncertain system authority

Report the issue and request approval.

---

## 16. Final Do Not Touch Directive

Do not touch secrets.

Do not touch treasury.

Do not touch production.

Do not touch migrations.

Do not touch live roles.

Do not touch economy constants.

Do not touch prize execution.

Do not touch emergency controls.

Do not touch future-phase systems.

Do not bypass Anthony Hammon.
