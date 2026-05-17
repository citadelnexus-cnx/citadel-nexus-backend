# Citadel Nexus Discord Bot Architecture

## Document Purpose

This document defines the internal Discord bot architecture for Citadel Nexus.

It explains the Ascension bot runtime, Discord command responsibilities, backend authority boundary, role sync relationship, admin command safety, audit requirements, deployment boundaries, and future Discord automation limits.

This file is an internal technical reference.

This file is not public marketing copy.

AGENTS.md remains the controlling operating law.

CITADEL_NEXUS_V3_DOCTRINE.md remains the master doctrine.

SYSTEM_OVERVIEW.md defines the ecosystem-level architecture.

BACKEND_ARCHITECTURE.md defines backend source-of-truth responsibilities.

---

## 1. Discord Bot Authority Rule

The Discord bot is an interaction layer.

The Discord bot does not define truth.

The Discord bot reflects backend-approved state and invokes backend-approved services.

The authority hierarchy remains:

Backend defines truth.
Discord reflects truth.
Frontend surfaces truth.
AI agents assist execution.
Anthony Hammon holds final authority.

The Discord bot must not bypass backend service logic.

---

## 2. Bot Runtime Identity

The Citadel Nexus Discord bot supports the Citadel Ascension gameplay layer.

The bot is responsible for:

- receiving Discord slash commands
- responding to members
- creating or loading Ascension profiles
- running approved gameplay command flows
- supporting admin command flows
- surfacing profile/status summaries
- invoking approved service logic
- writing audit records where required

The bot is not responsible for:

- storing canonical state outside the database
- defining role truth
- defining CNX tier truth
- issuing unlogged rewards
- deciding prize eligibility alone
- bypassing approval gates
- controlling production deployment

---

## 3. Verified Bot Runtime Boundary

The Ascension bot runtime is separate from the Express API runtime.

Verified bot entry:

- src/modules/ascension/runtime/bot-entry.js

This runtime should be treated as a dedicated Discord bot process.

The bot should not be casually merged into the Express API server.

The bot process and API process may share service code, but they should remain operationally distinct.

Changes to bot startup, command registration, or deployment require care because they affect Discord directly.

---

## 4. Bot and Backend Relationship

The bot should follow this flow:

Discord interaction
-> command handler
-> validation
-> Ascension service
-> Prisma/database
-> audit record if required
-> response to Discord

Command handlers should be thin.

Business logic should live in services.

The bot must not directly implement major economy logic inside command handlers.

The bot must not directly hard-code economy values if approved constants/services exist.

---

## 5. Current Bot Scope

Current bot scope is Phase 1 Citadel Ascension gameplay.

Phase 1 bot responsibilities include:

- start/onboarding flow
- claim flow
- mission flow
- build flow
- status/profile response
- admin profile view
- admin corrections where currently implemented
- admin audit support
- basic prize pool visibility if already implemented
- role sync interaction only through approved systems

Future bot scope must remain phase-gated.

---

## 6. Player Command Architecture

## 6.1 Start Command

The start command should:

- identify the Discord user
- create or load an Ascension profile
- assign initial Guardian state where applicable
- initialize baseline resources
- return onboarding response
- avoid duplicate profile creation
- avoid granting repeat rewards unless explicitly designed

The start command must not:

- assign CNX benefits directly
- bypass profile lock state
- grant admin status
- grant Discord Rank
- mutate roles without approved role sync logic

## 6.2 Claim Command

The claim command should:

- verify user profile
- check claim cooldown
- calculate eligible claim result
- update resources safely
- update last claim timestamp
- apply approved cooldown rules
- apply approved CNX utility only when active and authorized
- return clear user-facing result

The claim command must not:

- bypass cooldown
- exceed Power cap
- grant unlogged rewards
- activate future CNX rules early
- allow infinite claim loops

## 6.3 Mission Command

The mission command should:

- verify user profile
- verify user is not locked
- validate mission type
- check Power cost
- apply mission success/failure logic
- update XP/resources
- update missions completed
- enforce caps/diminishing returns where implemented
- write audit/economy records where required
- return result to Discord

The mission command must not:

- run without enough Power
- allow invalid mission names
- bypass daily caps
- bypass failure rules
- allow CNX to override hard caps
- silently grant XP

## 6.4 Build Command

The build command should:

- verify user profile
- validate building key
- validate current building level
- verify resource costs
- verify rank/Stage gate where applicable
- spend resources transactionally where possible
- update building level
- grant one-time upgrade XP where approved
- return result to Discord

The build command must not:

- create negative resources
- skip building levels
- grant repeat upgrade XP
- bypass rank/Stage gates
- silently fail

## 6.5 Status Command

The status command should:

- load profile state
- display current Guardian/rank/Stage/XP/resources/buildings
- avoid exposing sensitive internal data
- show locked state if appropriate
- provide next-step guidance where safe

The status command must not:

- expose admin-only metadata
- expose secrets
- expose raw audit internals
- mutate state unexpectedly

---

## 7. Admin Command Architecture

Admin commands are high risk.

Admin commands may include:

- player view
- add XP
- add resources
- reset player
- lock player
- unlock player
- view prize pool
- add prize pool record
- award prize
- remove prize
- reset all if explicitly allowed by environment and approval

Admin commands must:

- verify admin/founder permission
- require reason where state changes occur
- write AscensionAdminAction or approved audit record
- include before/after values where applicable
- respect AGENTS.md approval gates
- avoid silent mutations

Admin commands must not:

- bypass audit logging
- grant rewards without reason
- issue prizes without ledger
- mutate CNX tiers without approval
- reset all users unless explicitly authorized
- run destructive operations casually

---

## 8. Founder and Admin Safety

Founder authority is final, but founder actions are still logged.

The bot must treat founder/admin actions as auditable commands.

Dangerous admin actions should require:

- explicit command
- target user
- reason
- confirmation where possible
- audit log
- safe response
- no hidden side effects

Global reset behavior must remain tightly controlled.

ALLOW_GLOBAL_RESET is dangerous and must remain false in production unless explicitly approved for controlled recovery.

---

## 9. Profile Lock Rules

A locked profile should restrict XP/reward earning.

Lock behavior should be clear and service-driven.

A locked user may still be allowed to view status depending on policy.

Lock state should include:

- isLocked
- lockReason
- lockedBy if implemented
- timestamp if implemented
- audit action

Locked users must not:

- earn XP
- claim rewards
- complete reward-generating missions
- receive admin-issued rewards without explicit correction workflow
- bypass lock through Discord command variations

---

## 10. Discord Role Relationship

The bot may interact with roles only through approved role sync systems.

Discord role state must reflect backend truth.

Role sync must use:

- role registry
- role map
- role sync service
- role mutation service
- audit store
- verification service where applicable

The bot must not:

- assign roles directly from random command logic
- assign admin/mod roles from CNX
- treat Discord role as canonical truth
- change role IDs without approval
- perform unlogged role mutation

Live role mutation expansion requires approval.

---

## 11. CNX and Bot Boundary

CNX utility must remain controlled.

The bot must not:

- require wallet connection for basic gameplay
- ask for seed phrases
- ask for private keys
- execute token transactions
- spend CNX
- convert CNX into resources
- grant rank from CNX
- grant Stage from CNX
- guarantee prizes from CNX
- bypass locks/caps for CNX holders

Future CNX bot features may include:

- read-only holder status display
- holder role reflection through backend sync
- cooldown display
- multiplier display
- wallet verification prompt after approval

Automated CNX utility remains Phase 5.

---

## 12. Contribution XP and Discord Activity Boundary

Contribution XP automation is not Phase 1.

Future Contribution XP may track:

- qualifying messages
- helpful answers
- bug reports
- feature suggestions
- guide posts
- event recaps
- voice participation
- invite milestones
- verified community actions

Future Contribution XP must include:

- cooldowns
- daily caps
- weekly caps
- duplicate detection
- verification requirements
- audit/economy logging
- abuse flags

The bot must not activate Contribution XP automation before Phase 2 approval.

---

## 13. Arcade and Event Boundary

Arcade and advanced event systems are future phases.

The bot must not activate:

- Arcade XP
- arcade leaderboard rewards
- event prize awards
- event score conversion
- prestige rewards
- NFT eligibility

unless the correct phase is approved and supporting backend systems exist.

Event commands must not auto-issue prizes.

Event rewards require review and ledger support.

---

## 14. Error Handling Rules

Bot errors should be handled safely.

Bot responses should:

- avoid stack traces
- avoid secrets
- avoid raw database errors
- avoid internal token values
- give clear user-safe feedback
- log operational errors where appropriate
- preserve interaction response timing

Bot error handling should distinguish:

- user input errors
- cooldown errors
- resource errors
- lock state errors
- service errors
- database errors
- Discord API errors
- permission errors

---

## 15. Interaction Response Rules

Discord interaction responses should be:

- concise
- clear
- safe
- non-sensitive
- consistent with Citadel Nexus tone
- accurate to backend state

Responses must not:

- make public token/investment promises
- expose internal IDs unnecessarily
- expose hidden admin data
- expose private user data
- expose environment variables
- expose secrets
- claim a reward was issued when it was not

---

## 16. Bot Deployment Boundary

Bot deployment affects live Discord operations.

Bot deployment changes require caution.

Bot deployment may involve:

- slash command registration
- bot process restart
- environment variables
- Discord permissions
- guild ID
- bot token
- PM2 process management
- runtime logs

Do not change bot deployment behavior without approval.

Do not expose BOT_TOKEN.

Do not commit deployment secrets.

Do not run production bot restart commands without approval.

---

## 17. Slash Command Registration Rules

Slash command changes can affect live Discord UX.

Slash command changes should include:

- command name
- description
- options
- permissions
- user-facing behavior
- error behavior
- phase status
- test/dry-run notes

Slash commands must not be registered globally unless intentionally approved.

Guild-specific testing is preferred during development.

Do not expose admin commands to general members.

---

## 18. Bot Logging Rules

Bot logs should capture operational issues without exposing secrets.

Log safe fields such as:

- command name
- user ID where appropriate
- success/failure
- error category
- timestamp
- service failure category
- audit action ID where applicable

Do not log:

- bot token
- database URL
- private keys
- wallet secrets
- raw sensitive payloads
- unnecessary private user information

---

## 19. Bot Testing Rules

Bot changes should be tested carefully.

Testing may include:

- TypeScript/build checks where applicable
- command registration dry-run where available
- local/dev bot test if available
- service-layer tests
- manual Discord test in controlled guild
- admin command permission check
- profile creation test
- claim cooldown test
- mission Power test
- build resource test
- lock state test

If a test cannot be run, report why.

Do not claim bot behavior is verified unless it was tested.

---

## 20. Bot Future Dashboard Integration

The future Command Control Dashboard may monitor bot state.

Potential read-only bot dashboard data:

- bot online/offline
- command usage
- failed commands
- role sync failures
- command error rate
- onboarding completions
- active lock count
- suspicious command patterns
- recent admin commands
- bot version/commit where safe

Future controls may include:

- put bot in read-only mode
- pause role sync
- pause XP command writes
- pause admin commands
- export bot incident report

Write controls require authentication, permissions, reason codes, audit logs, confirmation, and approval.

---

## 21. Bot Abuse Risks

Bot-specific abuse risks include:

- command spam
- claim cooldown bypass
- mission farming
- resource exploit
- admin command misuse
- role mutation misuse
- interaction spoofing
- permission misconfiguration
- public exposure of admin commands
- future contribution XP farming
- future CNX utility abuse

Bot abuse protections must align with ANTI_ABUSE_RULES.md.

---

## 22. Bot Change Approval Rules

Approval is required before:

- changing admin commands
- changing command permissions
- changing role sync behavior
- changing live role mutation
- changing slash command deployment
- changing bot environment variables
- changing XP values
- changing mission logic
- changing claim cooldown logic
- changing CNX logic
- adding prize commands
- adding wallet commands
- deploying/restarting production bot
- deleting bot command files

When uncertain, stop and ask.

---

## 23. Bot Architecture Completion Standard

A bot change is complete only when it includes:

- files changed
- command behavior changed
- backend/service boundary respected
- audit path preserved
- phase gate respected
- permission impact reviewed
- tests/checks run or noted as unavailable
- risks documented
- follow-up tasks listed

Documentation-only bot changes should at minimum check:

- git diff --stat
- git status

---

## 24. Final Discord Bot Directive

The Discord bot is the member-facing action surface.

Keep it safe.

Keep it thin.

Keep it service-backed.

Keep it auditable.

Keep production commands controlled.

Keep future-phase systems locked.

Do not let the Discord bot override backend truth.
