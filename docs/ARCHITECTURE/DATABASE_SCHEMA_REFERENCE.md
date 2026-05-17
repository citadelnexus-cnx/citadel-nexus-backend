# Citadel Nexus Database Schema Reference

## Document Purpose

This document defines the internal database schema reference for Citadel Nexus.

It explains the current Prisma model ownership, source-of-truth responsibilities, audit expectations, migration boundaries, future schema expansion needs, and approval rules for database changes.

This file is an internal technical reference.

This file is not public marketing copy.

AGENTS.md remains the controlling operating law.

CITADEL_NEXUS_V3_DOCTRINE.md remains the master doctrine.

BACKEND_ARCHITECTURE.md defines backend authority and service boundaries.

---

## 1. Database Authority Rule

The database stores Citadel Nexus truth.

The backend controls access to that truth.

Discord reflects it.

Frontend surfaces it.

AI agents may document, inspect, and propose changes, but may not create or run schema changes without approval.

No normal operation should depend on Discord role state, frontend local state, or AI-generated state as the final source of truth.

---

## 2. Verified Database Stack

The current database stack is:

- PostgreSQL
- Supabase-hosted database
- Prisma ORM
- Prisma schema file at `prisma/schema.prisma`
- Prisma migrations under `prisma/migrations/`

The Prisma schema is the canonical schema definition inside the repo.

The live database must remain consistent with the Prisma schema and applied migrations.

---

## 3. Current Verified Prisma Models

Current verified Prisma models:

- `User`
- `AccessState`
- `Entitlement`
- `DiscordRoleSyncAudit`
- `AscensionProfile`
- `AscensionPrizePool`
- `AscensionAdminAction`
- `AscensionAdminSnapshot`

These models form the current backend persistence foundation.

Do not rename, delete, or restructure these models without explicit approval.

---

## 4. Model Ownership Map

| Model | Primary Responsibility | Risk Level |
|---|---|---|
| User | Core member identity | High |
| AccessState | Backend-controlled access status | High |
| Entitlement | Specific access/utility grants | High |
| DiscordRoleSyncAudit | Discord role mutation audit trail | High |
| AscensionProfile | Gameplay state and progression | Critical |
| AscensionPrizePool | Prize/reward governance records | Critical |
| AscensionAdminAction | Admin/founder action audit records | Critical |
| AscensionAdminSnapshot | Rollback/review snapshot records | Critical |

Critical models must not be modified casually.

---

## 5. User Model

## 5.1 Purpose

`User` represents a core Citadel Nexus member identity.

It may connect to:

- Discord identity
- wallet/access identity
- access state
- entitlements
- member state
- Ascension profile
- public profile surface

## 5.2 Rules

User records must not be casually deleted.

User identity changes must be handled carefully.

User records should remain stable so related state can be audited.

## 5.3 Future Considerations

Future user expansions may include:

- dashboard operator identity
- trust/risk state
- public profile preferences
- verified wallet links
- account age fields
- moderation status references

Future changes require approval if they affect identity, auth, access, wallet linkage, or public profile behavior.

---

## 6. AccessState Model

## 6.1 Purpose

`AccessState` represents backend-controlled access status.

It supports the access/membership layer.

Access state must not be confused with gameplay progression.

## 6.2 Rules

Access state may influence access, membership, or entitlement behavior.

Access state must not directly purchase or override:

- Game XP
- Game Rank
- Discord Rank
- Stage
- Prize eligibility
- Moderator/admin authority

## 6.3 Future Considerations

Future access logic may connect to:

- verified status
- temporary access
- tiered permissions
- dashboard access
- beta access
- non-power CNX recognition

All future access changes must preserve zero-pay-to-win doctrine.

---

## 7. Entitlement Model

## 7.1 Purpose

`Entitlement` represents a specific access right, grant, or time-bound permission.

Entitlements may support:

- temporary access
- feature access
- non-power benefits
- test/beta access
- controlled access experiments

## 7.2 Rules

Entitlements must be backend-controlled.

Entitlements must not silently grant pay-to-win gameplay power.

Entitlements must not bypass moderation locks or approval gates.

## 7.3 Future Considerations

Future entitlement expansion may support:

- event access
- beta access
- dashboard operator permissions
- non-power CNX access
- cosmetic access
- temporary operational grants

High-risk entitlements require auditability.

---

## 8. DiscordRoleSyncAudit Model

## 8.1 Purpose

`DiscordRoleSyncAudit` records backend-to-Discord role sync actions and outcomes.

It exists to preserve accountability for role mutation behavior.

## 8.2 Supports

This model supports:

- role mutation auditability
- debugging failed syncs
- verifying Discord reflects backend state
- future dashboard role sync monitoring
- incident review
- dry-run comparison history if implemented

## 8.3 Rules

Role sync audit records must not be casually deleted.

Role sync must remain backend-driven.

Discord must not become the source of truth.

Role IDs must not be changed without approval.

## 8.4 Future Considerations

Future role sync audit expansion may track:

- dry-run results
- expected roles
- actual roles
- added roles
- removed roles
- skipped roles
- Discord API error codes
- retry count
- verification result
- module freeze state

---

## 9. AscensionProfile Model

## 9.1 Purpose

`AscensionProfile` is the primary gameplay state record.

It stores Citadel Ascension player progression.

## 9.2 Known Gameplay Concepts

The model is associated with gameplay concepts such as:

- Guardian identity
- Stage
- rank
- XP
- level
- Node Score
- session count
- missions completed
- lock state
- lock reason
- Power
- max Power
- Credits
- Intel
- last claim timestamp
- building state

## 9.3 Rules

`AscensionProfile` is critical.

It must not be casually deleted.

Gameplay mutations must go through approved Ascension services.

Game XP, resources, missions, claims, builds, and locks must not be directly changed through route handlers or UI state.

Profile changes must preserve auditability where meaningful.

## 9.4 Economy Safety

Profile updates must respect:

- current phase
- cooldowns
- caps
- resource costs
- lock state
- mission limits
- building limits
- XP floors
- hard XP caps
- CNX multiplier boundaries

## 9.5 Future Considerations

Future profile expansion may include:

- seasonal stats
- economy event references
- abuse flag references
- prestige state
- achievement state
- Guardian cosmetics
- public profile display preferences
- Nexus Score linkage

Future changes require approval when affecting gameplay progression, economy, or public profile behavior.

---

## 10. AscensionPrizePool Model

## 10.1 Purpose

`AscensionPrizePool` supports prize or reward governance.

Prize pool records must remain separate from XP and gameplay resources.

## 10.2 Rules

Prize pool logic is high risk.

Prize records must not be treated as normal gameplay rewards.

Prize actions require:

- eligibility check
- ledger or prize record
- audit record
- reason
- approval
- season/event reference where applicable

## 10.3 Restrictions

Prize pool systems must not:

- guarantee rewards from CNX
- auto-issue rewards without approval
- bypass anti-abuse review
- bypass unresolved flags
- merge prize state into XP/resource state

## 10.4 Future Considerations

Future prize pool expansion may include:

- season ID
- event ID
- award category
- recipient ID
- eligibility proof
- approval status
- issued status
- denial reason
- public announcement status

Do not expand prize systems without approval.

---

## 11. AscensionAdminAction Model

## 11.1 Purpose

`AscensionAdminAction` records admin, founder, moderator, or system-level actions affecting Ascension state.

It is a core audit model.

## 11.2 Use Cases

It may record:

- XP grants
- XP corrections
- resource grants
- resource corrections
- profile locks
- profile unlocks
- player resets
- prize actions
- admin corrections
- founder actions
- moderation-related state changes

## 11.3 Rules

Admin actions must include a reason.

Before/after values should be preserved where applicable.

Founder actions are not exempt from logs.

Admin actions must not be deleted casually.

## 11.4 Future Considerations

Future admin action expansion may include:

- approval status
- incident ID
- related season ID
- related event ID
- action severity
- module affected
- dashboard session ID
- confirmation token record
- rollback action ID

---

## 12. AscensionAdminSnapshot Model

## 12.1 Purpose

`AscensionAdminSnapshot` supports rollback, review, and before/after state capture.

Snapshots help preserve evidence and recovery paths.

## 12.2 Rules

Snapshots are evidence-like records.

Snapshots must not be casually deleted.

Snapshots should be created before risky admin operations where supported.

## 12.3 Future Considerations

Future snapshot improvements may include:

- snapshot reason
- linked admin action
- snapshot category
- compressed payload
- rollback eligibility
- reviewed status
- incident linkage

---

## 13. Migration Rules

Prisma migrations are high-risk changes.

AI agents must not create, modify, or run migrations without explicit owner approval.

Migration work requires:

- issue/task reference
- reason for change
- affected models
- expected database impact
- local validation
- migration file review
- rollback/recovery plan
- production deployment plan
- owner approval

No destructive migration may run without explicit approval.

---

## 14. Schema Change Approval Gates

Approval is required before:

- adding a model
- deleting a model
- renaming a model
- renaming a field
- deleting a field
- changing field type
- changing unique constraints
- changing relations
- changing indexes
- changing default values
- changing cascade behavior
- adding economy event tables
- adding abuse flag tables
- adding dashboard permission tables
- adding wallet verification tables
- adding prize/treasury-related fields

When uncertain, stop and ask.

---

## 15. Future Schema Needs

Future v3 systems may require new tables or equivalent records.

Possible future models include:

- EconomyEvent
- ResourceEvent
- MissionLog
- BuildingUpgradeLog
- DailyCapState
- WeeklyCapState
- Season
- NexusScore
- EventEntry
- EventScore
- AbuseFlag
- PlayerRiskScore
- ModuleStatus
- EmergencyLock
- IncidentReport
- DashboardPermission
- DashboardSession
- CNXVerificationLog
- CNXTierSnapshot
- DiscordRoleSyncJob
- SystemHealthSnapshot
- AgentTask
- AgentAuditLog

These are future needs only.

Do not create these models until their phase and approval are confirmed.

---

## 16. Economy Event Future Model

A future `EconomyEvent` model may be needed.

It should record:

- user ID
- event type
- source module
- action type
- XP type
- base XP
- multiplier
- final XP
- resource type
- resource amount
- season ID
- event ID
- related mission ID
- related admin action ID
- verified by
- cap state snapshot
- metadata
- created timestamp

This model should support:

- auditability
- replay/recalculation
- dashboard monitoring
- abuse detection
- economy analytics

Do not create it without approval.

---

## 17. Abuse Flag Future Model

A future `AbuseFlag` model may be needed.

It should record:

- flag ID
- user ID
- flag type
- severity
- source module
- evidence payload
- related action ID
- related event ID
- created timestamp
- status
- reviewer ID
- resolution reason
- resolved timestamp

This model should support:

- anti-abuse workflow
- player risk queue
- false positive handling
- dashboard monitoring
- incident escalation

Do not create it without approval.

---

## 18. Dashboard Future Models

Future dashboard support may require:

- ModuleStatus
- EmergencyLock
- IncidentReport
- DashboardPermission
- DashboardSession
- SystemHealthSnapshot
- AgentAuditLog

These should support:

- read-only monitoring
- authenticated controls
- operator identity
- incident response
- module freezing
- emergency audit records
- future MCAOS oversight

Do not create dashboard tables until dashboard phase and auth requirements are approved.

---

## 19. CNX Future Models

Future CNX automation may require:

- CNXVerificationLog
- CNXTierSnapshot
- WalletLink
- HolderRoleSyncRecord

These should support:

- read-only wallet verification
- tier calculation
- tier history
- role sync verification
- grace periods
- failure handling
- dashboard CNX monitoring

CNX models must not support:

- private key storage
- seed phrase storage
- custody
- token spending
- pay-to-win conversion
- prize guarantees

---

## 20. Season Future Models

Future season systems may require:

- Season
- NexusScore
- SeasonArchive
- LeaderboardSnapshot

These should support:

- active season
- start/end timestamps
- seasonal scoring
- Nexus Score formula
- leaderboard freeze
- finalization
- archive before reset

Seasonal score must not erase permanent Game XP or Contribution XP.

---

## 21. Data Safety Rules

Database work must preserve:

- data integrity
- audit history
- user identity
- economy correctness
- role sync history
- admin action records
- prize pool records
- rollback snapshots

Do not delete data to hide mistakes.

Corrections should create new correction records.

False positives should be resolved, not erased.

---

## 22. Public Data Rules

Public APIs must only expose safe data.

Public data may include:

- public display name
- public Ascension summary
- Guardian
- rank
- Stage
- public profile card fields
- public-safe achievements when approved

Public data must not include:

- secrets
- tokens
- private wallet data
- raw audit metadata
- private admin notes
- internal moderation details
- sensitive role IDs unless required and approved
- private database identifiers where unnecessary

---

## 23. Admin Data Rules

Admin data requires authentication and authorization.

Admin data may include:

- audit logs
- admin actions
- role sync records
- player risk flags
- prize pool records
- incident reports
- dashboard logs
- economy events

Admin data must be protected by:

- auth
- role permissions
- least privilege
- audit logs for sensitive reads/writes where appropriate

---

## 24. Database QA Requirements

Database/schema QA should include:

- npx prisma validate
- migration review if migration exists
- model relation review
- field default review
- unique constraint review
- destructive change review
- local/dev database test where applicable
- service compatibility check
- route compatibility check
- bot compatibility check

Do not claim database work is complete without validation.

---

## 25. Schema Documentation Rules

When schema changes occur, update relevant docs:

- DATABASE_SCHEMA_REFERENCE.md
- BACKEND_ARCHITECTURE.md if backend ownership changes
- SYSTEM_OVERVIEW.md if ecosystem ownership changes
- ECONOMY_AND_XP_RULES.md if economy state changes
- ANTI_ABUSE_RULES.md if abuse/risk tables change
- COMMAND_CONTROL_DASHBOARD_SPEC.md if dashboard records change
- AGENTS.md if build-state law changes

---

## 26. Final Database Directive

The database is Citadel Nexus truth storage.

Protect it.

Validate changes.

Preserve audit history.

Do not run migrations casually.

Do not delete evidence.

Do not store secrets that should never be stored.

Do not let Discord, frontend, CNX, dashboard controls, or AI agents override database-backed truth.
