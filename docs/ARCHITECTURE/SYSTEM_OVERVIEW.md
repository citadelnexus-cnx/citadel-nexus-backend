# Citadel Nexus System Overview

## Document Purpose

This document defines the high-level architecture of the Citadel Nexus ecosystem.

It explains how the backend, Discord bot, frontend, database, CNX utility layer, Ascension gameplay layer, audit systems, future dashboard, and future agentic automation layer fit together.

This file is an internal architecture reference.

This file is not public marketing copy.

`AGENTS.md` remains the controlling operating law.

`CITADEL_NEXUS_V3_DOCTRINE.md` remains the master doctrine.

---

## 1. Master Architecture Rule

Citadel Nexus follows this authority hierarchy:

```txt
Backend defines truth.
Discord reflects truth.
Frontend surfaces truth.
AI agents assist execution.
Anthony Hammon holds final authority.

No system may override this hierarchy.

Discord roles, frontend UI state, AI outputs, and future dashboard controls must all derive from backend-approved state.

2. Core Ecosystem Layers

Citadel Nexus is built from the following major layers:

LayerPurposeCurrent Status
Backend APISource of truth for users, access, entitlements, role sync, Ascension summariesActive
DatabasePersistent state through PostgreSQL/Supabase via PrismaActive
Discord BotCitadel Ascension gameplay commands and admin commandsActive Phase 1
Discord ServerCommunity interface and role reflection layerActive
Frontend AppPublic site, member surface, public profiles, project pagesActive
CNX Utility LayerOptional holder recognition and future utility modifierDeferred / controlled
Ascension GameplayXP, claims, missions, builds, status, profile progressionActive Phase 1
Admin/Audit LayerAdmin actions, snapshots, role sync audits, prize pool recordsActive foundation
Command Control DashboardFuture monitoring and operations centerPlanned
MCAOS Agent LayerFuture controlled AI/operator automationPlanned
Prestige/NFT LayerFuture non-power identity and eligibility layerDeferred
3. Backend Architecture

The backend is the source of truth.

Verified backend stack:

Node.js
TypeScript
Express.js
Prisma ORM
PostgreSQL through Supabase
Discord.js for bot runtime
Hedera SDK present but deferred/testnet-only
PM2 runtime outside repo
Nginx reverse proxy outside repo

The backend is responsible for:

user records
access state
entitlements
role sync records
Ascension profiles
admin actions
prize pool records
public member state
public Ascension summaries
health checks
future economy events
future dashboard read endpoints

The backend must not be bypassed by Discord, frontend, or AI agents.

4. Database Architecture

The canonical data model lives in:

prisma/schema.prisma

Current verified Prisma models:

User
AccessState
Entitlement
DiscordRoleSyncAudit
AscensionProfile
AscensionPrizePool
AscensionAdminAction
AscensionAdminSnapshot

The database stores persistent state for:

members
wallet/access data
Discord role sync auditing
Ascension gameplay state
admin actions
prize pool governance
rollback snapshots

Future database needs may include:

economy events
module status
abuse flags
player risk scores
incident reports
system health snapshots
dashboard sessions
dashboard permissions
CNX verification logs
season operations
event operations

Future tables must not be added without approval.

5. Discord Bot Architecture

The Ascension bot is a separate runtime from the Express API.

Verified bot entry:

src/modules/ascension/runtime/bot-entry.js

The bot supports:

player onboarding
/start
/claim
/mission
/build
/status
admin commands
gameplay profile state
audit-backed admin operations

The bot must call backend-approved service logic.

The bot must not become the source of truth.

Discord role state must reflect backend state.

6. Frontend Architecture

The frontend is a Next.js application deployed separately from the backend.

Verified frontend stack:

Next.js
React
TypeScript
Tailwind CSS
Vercel deployment

The frontend is responsible for:

public website
system pages
gameplay explanation pages
roadmap pages
FAQ pages
member app surface
public profile cards
future dashboard UI

The frontend must not directly mutate economy state.

The frontend must use backend APIs for state.

7. Ascension Gameplay Architecture

Citadel Ascension is the gameplay layer of Citadel Nexus.

Current Phase 1 gameplay includes:

Guardian identity
player profile
Stage
rank
XP
level
Node Score
Power
Credits
Intel
buildings
missions completed
claims
mission outcomes
admin actions
profile summaries

Gameplay state is stored in AscensionProfile.

Core building keys:

knowledge_core
trade_hub
power_reactor
security_layer

Ascension gameplay must follow the v3 doctrine:

earned progress
zero pay-to-win
caps
cooldowns
auditability
service boundaries
phase gates
8. Access and Entitlement Architecture

Access state and entitlements support the membership/control layer.

Relevant models and services include:

AccessState
Entitlement
accessStateService
entitlementStore
entitlementExpiryService
memberStateService

This layer supports:

tier state
temporary access
entitlement records
access lifecycle
backend-controlled member state
future utility gates

Access and entitlement logic must not be confused with gameplay rank.

9. Discord Role Sync Architecture

Role sync is a backend-controlled reflection system.

Relevant components:

discordRoleRegistry.ts
discordRoleMap.ts
roleSyncService.ts
discordRoleMutationService.ts
discordRoleSyncAuditStore.ts
discordRoleSyncExecutionService.ts
discordRoleSyncVerificationService.ts
discordSyncWorkerService.ts
DiscordRoleSyncAudit

Rules:

backend truth controls role sync
Discord does not define truth
role mutations must be logged
role sync must be idempotent
role IDs must not change without approval
dry-run or verification should be used where possible
role mutation expansion requires approval
10. CNX Utility Architecture

CNX is an optional utility and recognition layer.

Current status:

deferred / controlled
testnet or read-only concepts only unless explicitly approved
no pay-to-win utility
no required wallet for basic gameplay
no CNX spending
no CNX-to-resource conversion
no prize guarantee

Future CNX architecture may include:

read-only wallet verification
CNX tier calculation
CNX tier snapshots
holder role sync
controlled XP multiplier
cooldown modifiers
dashboard monitoring
freeze controls

All CNX utility must obey:

CNX_UTILITY_RULES.md
ECONOMY_AND_XP_RULES.md
ANTI_ABUSE_RULES.md
AGENTS.md
11. Audit Architecture

Auditability is a core system requirement.

Current audit-related models include:

AscensionAdminAction
AscensionAdminSnapshot
DiscordRoleSyncAudit
AscensionPrizePool

Audit records should support:

admin accountability
role sync verification
prize pool governance
rollback snapshots
future incident response
future dashboard monitoring

Future audit expansion may include:

economy events
abuse flags
incident reports
dashboard sessions
emergency locks
system health snapshots

No meaningful economy or admin mutation should occur without an audit path.

12. Command Control Dashboard Architecture

The future Command Control Dashboard is an operations interface.

It must be built in phases:

Static prototype
Read-only live monitor
Controlled admin actions
Emergency controls

The dashboard should eventually monitor:

system health
economy health
player risk
Discord operations
CNX verification
season state
event state
prize pool records
admin action logs
deployment safety
MCAOS agents
incidents

Dashboard write controls require:

authentication
permissions
reason codes
audit logs
confirmation flows
owner approval

The dashboard must monitor before it controls.

13. Agentic AI Architecture

Agentic AI is a future operator-assistance layer.

Agents may help with:

audits
documentation
code generation
test planning
issue creation
PR summaries
read-only monitoring
anomaly reporting
implementation planning

Agents must not autonomously:

deploy production
merge to main
mutate live Discord roles
change economy constants
issue XP
issue rewards
execute token transactions
access treasury assets
delete production data
bypass approval gates

Future agent architecture may include:

Architect Agent
Backend Agent
Economy Agent
Discord Agent
Dashboard Agent
QA Agent
Security Agent
Docs Agent
Narrative Agent
Compliance Agent

All agents must follow AGENTS.md.

14. Data Flow Summary
14.1 Gameplay Flow
Discord command
→ Ascension handler
→ Ascension service
→ Prisma/database
→ audit record if needed
→ response to Discord
→ optional frontend/public summary
14.2 Role Sync Flow
Backend user/access state
→ role sync service
→ role map/registry
→ Discord mutation service
→ Discord API
→ sync audit record
→ verification service
14.3 Frontend Member Flow
User opens frontend
→ frontend API client
→ backend API endpoint
→ backend service
→ Prisma/database
→ sanitized response
→ frontend display
14.4 Future Dashboard Flow
Dashboard UI
→ authenticated admin request
→ read-only backend endpoint
→ service layer
→ Prisma/database
→ dashboard status card/report

Future write flow:

Dashboard UI
→ authenticated operator
→ permission check
→ reason code
→ confirmation
→ controlled service action
→ audit log
→ incident/update record
→ response
15. Phase Architecture

Current phase:

Phase 1 — Stabilize Current Build

Phase 1 active systems:

Game XP
Ascension profile
claim
mission
build
status
admin actions
basic audit
public frontend
backend health
member state
role sync foundation

Locked future phases:

Phase 2: Contribution XP / Discord Rank
Phase 3: Seasons / Nexus Score
Phase 4: Arcade bridge
Phase 5: CNX automation
Phase 6: Prestige / NFT eligibility

Future phase systems must not activate early.

16. System Boundaries
16.1 Backend Boundary

Backend may:

read/write database
define truth
expose APIs
perform service-layer mutations
create audit records
validate phase gates

Backend must not:

expose secrets
bypass audit logs
hard-code economy values in handlers
activate future phases without approval
16.2 Discord Boundary

Discord may:

receive commands
display responses
reflect roles
host community actions

Discord must not:

define backend truth
store canonical XP
decide CNX tier
decide prize eligibility
bypass service logic
16.3 Frontend Boundary

Frontend may:

display public and member data
call backend APIs
present dashboard UI when authorized

Frontend must not:

mutate economy directly
store secret admin logic
expose sensitive internals publicly
bypass backend validation
16.4 AI Agent Boundary

AI agents may:

assist
draft
analyze
code with approval
test
document
report

AI agents must not:

approve themselves
deploy without approval
mutate production
access secrets
make irreversible changes
bypass AGENTS.md
17. Security Principles

The system must preserve:

secret isolation
least privilege
backend authority
auditability
phase gating
approval gates
no direct production mutation by agents
no treasury access by agents
no wallet key handling
no public exposure of internal implementation

Sensitive data includes:

database URLs
bot tokens
private keys
wallet credentials
production environment variables
Discord role IDs when used in public products
internal API routes when used in public products
proprietary economy constants when used in public products
18. Current Architecture Completion Standard

This overview is complete enough when it helps a build agent answer:

What is Citadel Nexus?
What owns truth?
What systems exist?
What systems are future-only?
What repo areas map to what responsibilities?
What must not be bypassed?
How does data move?
What phase are we in?
What must remain locked?

Any future architecture change should update this file.

19. Final Architecture Directive

Citadel Nexus must remain modular, governed, and backend-authoritative.

Build each layer only when its foundation is stable.

Do not let Discord, frontend, CNX, dashboard controls, or AI agents override backend truth.

The architecture must support scale without sacrificing auditability, fairness, or human command authority.

