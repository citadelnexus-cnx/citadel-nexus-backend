# Citadel Nexus Command Control Dashboard Specification

## Document Purpose

This document defines the internal specification for the future Citadel Nexus Command Control Master Dashboard.

The dashboard is intended to become the central operating interface for monitoring, auditing, troubleshooting, pausing, freezing, reviewing, and eventually controlling approved parts of the Citadel Nexus ecosystem.

This file is not public marketing copy.

This file supports:

- backend monitoring design
- read-only dashboard planning
- future admin operations
- economy safety controls
- Discord operations monitoring
- CNX verification monitoring
- anti-abuse operations
- incident response planning
- MCAOS agent oversight
- future Command Control UI/UX design

`AGENTS.md` remains the controlling operating law.

`CITADEL_NEXUS_V3_DOCTRINE.md` remains the master doctrine.

`ANTI_ABUSE_RULES.md` defines abuse, flag, lock, and escalation rules.

`CNX_UTILITY_RULES.md` defines CNX-specific dashboard boundaries.

---

## 1. Master Dashboard Doctrine

The Command Control Dashboard must be built slowly, safely, and in phases.

The first version must be static or read-only.

The dashboard must not begin as a production control system.

Production write controls require:

- authentication
- permission checks
- role-based access
- audit logging
- reason codes
- confirmation flows
- incident records
- rollback or reconciliation paths
- explicit owner approval

The dashboard must never become a decorative fake control room.

Every dashboard element must represent one of the following:

- real system status
- real audit record
- real queue
- real warning
- real report
- real disabled future control
- real documented operational function

---

## 2. Dashboard Identity

Official name:

Citadel Nexus Command Control Master Dashboard

Short UI title:

CITADEL COMMAND

Internal codename:

CNX-COMMAND / MCAOS Control Room

Emergency-mode title:

CITADEL LOCKDOWN CONTROL

The dashboard should visually feel like:

- a Fortune 500 security operations center
- a tactical command control room
- a high-trust enterprise monitoring system
- a Citadel Nexus operations bunker

The dashboard should not feel like:

- a toy game UI
- a random admin panel
- a crypto hype dashboard
- an ungoverned bot control screen
- a fake visual with buttons that do nothing

---

## 3. Dashboard Build Phases

## 3.1 Phase A — Static Prototype

Purpose:

Create the visual structure, layout, modules, status language, and operator experience without production effects.

Allowed:

- static UI
- mock data
- disabled controls
- layout design
- command-room theme
- demo monitor wall
- visual severity states
- fake incident examples clearly labeled as demo
- MCAOS agent oversight panel using demo data

Not allowed:

- production API writes
- live role mutation
- live XP mutation
- safe mode activation
- prize controls
- CNX freeze controls
- production deploy controls

Risk level:

Low.

## 3.2 Phase B — Read-Only Live Monitor

Purpose:

Connect dashboard to live backend read endpoints without any write controls.

Allowed:

- health endpoint reads
- database health reads
- economy summaries
- player profile summaries
- audit log reads
- Discord bot status reads
- role sync status reads
- current phase display
- environment mode display
- active incidents display if present
- read-only CNX status
- read-only season/event status when available

Not allowed:

- pause/resume actions
- user locks
- role mutations
- XP changes
- prize actions
- safe mode activation
- production config edits

Risk level:

Low to medium.

## 3.3 Phase C — Controlled Admin Actions

Purpose:

Add limited operational controls after authentication, permissions, reason codes, and audit logs exist.

Allowed only after approval:

- flag user
- clear false positive
- export report
- open incident
- close incident
- pause selected non-critical module
- run role-sync dry-run
- run score recalculation dry-run
- request approval workflow

Not allowed unless separately approved:

- direct production role mutation
- direct XP edit
- direct prize award
- direct CNX tier edit
- direct production deploy
- database destructive action

Risk level:

Medium.

## 3.4 Phase D — Emergency Controls

Purpose:

Add high-risk emergency controls only after full backend safety infrastructure exists.

Allowed only after approval:

- safe mode
- economy lockdown
- leaderboard freeze
- prize pool freeze
- CNX verification freeze
- Discord mutation stop
- module pause/resume
- emergency incident packet export

Required:

- two-step confirmation
- founder or authorized operator permission
- reason code
- audit record
- incident record
- affected module list
- rollback/recovery procedure
- post-incident report

Risk level:

High.

---

## 4. Dashboard Layout Zones

The dashboard should be organized into five major zones.

## 4.1 Zone 1 — Command Header

Purpose:

Show global system posture.

Required fields:

- ecosystem status
- active phase
- active branch/environment
- active season if available
- backend status
- Discord bot status
- database status
- strict economy mode status
- emergency mode status
- current operator identity
- current timestamp
- unresolved critical alerts count

Status examples:

- GOOD
- WATCH
- WARNING
- CRITICAL
- EMERGENCY
- MAINTENANCE
- READ_ONLY
- PAUSED

## 4.2 Zone 2 — Security Monitor Wall

Purpose:

Provide quick visual monitoring across all major systems.

Recommended monitors:

1. Global System Health
2. Economy Health
3. Player Risk
4. Discord Operations
5. CNX Verification
6. Season / Leaderboard
7. Prize Pool Ledger
8. Deployment Safety
9. MCAOS Agent Oversight
10. Incident Timeline

## 4.3 Zone 3 — Operator Console

Purpose:

Surface approved controls and disabled future controls.

Controls should be grouped by risk level:

- read-only actions
- report actions
- review actions
- controlled actions
- emergency actions

Dangerous actions must be visually separated.

Emergency buttons must not be active until Phase D.

## 4.4 Zone 4 — Incident and Audit Rail

Purpose:

Show live operational attention items.

Required items:

- open incidents
- unresolved abuse flags
- failed jobs
- admin actions
- prize holds
- role sync errors
- CNX tier mismatches
- economy anomalies
- pending approvals
- recent critical changes

## 4.5 Zone 5 — Deep-Dive Workbench

Purpose:

Provide detail views for each module.

Views may include:

- player lookup
- economy events
- admin action logs
- role sync logs
- CNX snapshots
- abuse flags
- leaderboard records
- season archive
- incident reports
- system health snapshots
- deployment records

---

## 5. Status Model

## 5.1 Status Levels

| Status | Meaning | Required Action |
|---|---|---|
| GOOD | System is normal | Monitor only |
| WATCH | Unusual but not dangerous | Review within 24h |
| WARNING | Risk or degradation | Review within 4h |
| CRITICAL | Integrity risk | Freeze affected module if needed |
| EMERGENCY | System-wide threat | Activate safe mode or lockdown |
| MAINTENANCE | Planned work | Inform operators |
| PAUSED | Module intentionally stopped | Review pause reason |
| READ_ONLY | Write actions disabled | Monitor only |

## 5.2 Color Guidance

| Status | Color |
|---|---|
| GOOD | Green |
| WATCH | Blue |
| WARNING | Amber |
| CRITICAL | Red |
| EMERGENCY | Red/Black |
| MAINTENANCE | Purple |
| PAUSED | Gray |
| READ_ONLY | Cyan |

Color must never be the only signal.

Text labels are required.

## 5.3 Response Timing

| Status | Response Time |
|---|---:|
| GOOD | Normal review |
| WATCH | Within 24 hours |
| WARNING | Within 4 hours |
| CRITICAL | Within 30 minutes |
| EMERGENCY | Immediate |

---

## 6. Module: Global System Health

Purpose:

Monitor the technical health of the Citadel Nexus backend and core runtime systems.

Read-only data:

- API uptime
- `/health` status
- `/health/db` status
- database connection
- API latency
- active process status
- error count
- failed job count
- queue depth if available
- last successful check
- last failed check
- current backend version or commit if available

Future controls:

- export health report
- open incident
- mark maintenance window
- request restart
- pause non-critical worker

Forbidden in early phases:

- restart production directly
- change PM2 config
- change Nginx config
- change firewall rules
- rotate secrets

---

## 7. Module: Economy Health

Purpose:

Monitor XP, resources, caps, missions, claims, and economy integrity.

Read-only data:

- Game XP issued today
- Contribution XP issued today
- Arcade XP issued today
- XP cap hit count
- top XP earners
- mission distribution
- high-risk mission frequency
- failed mission rate
- Power spend rate
- Credits issued/spent
- Intel issued/spent
- building upgrades
- admin economy actions
- abnormal XP spikes

Future controls:

- export economy report
- open economy incident
- freeze Game XP
- freeze Contribution XP
- freeze Arcade XP
- recalculate score from logs
- lock affected user rewards

Controls remain disabled until Phase C/D.

---

## 8. Module: Player Risk Queue

Purpose:

Monitor players with suspicious or abnormal activity.

Read-only data:

- open flags
- user trust state
- flag severity
- flag source
- XP velocity
- cap hit frequency
- duplicate content rate
- invite churn
- mission repeat pattern
- CNX tier mismatch
- role sync mismatch
- admin action history

Future controls:

- mark watched
- mark limited
- lock XP earning
- clear false positive
- escalate to founder
- export player audit packet

Required for controls:

- permission check
- reason code
- audit log
- reversible state change where possible

---

## 9. Module: Discord Operations

Purpose:

Monitor Discord bot, role sync, onboarding, and command health.

Read-only data:

- bot online/offline
- bot runtime status
- command usage count
- failed commands
- role sync queue
- role sync errors
- mutation audit status
- onboarding completions
- new joins
- invite sources
- server role registry status
- current managed roles

Future controls:

- pause role sync
- resume role sync
- dry-run role reconciliation
- export Discord ops report
- put bot in read-only mode
- put bot in announcement-only mode

Forbidden without approval:

- live role mutation
- slash command deploy
- permission changes
- channel changes
- member bans/kicks

---

## 10. Module: CNX Verification

Purpose:

Monitor CNX holder verification, tier snapshots, multiplier status, and role sync integrity.

Read-only data:

- verified wallets
- tier distribution
- stale snapshots
- failed wallet reads
- tier changes
- multiplier application count
- suspicious tier hopping
- CNX holder role sync status
- CNX freeze state
- grace period users

Future controls:

- freeze CNX verification
- disable CNX multiplier application
- force snapshot refresh
- run holder role dry-run
- export CNX verification report

Controls remain disabled until Phase 5+ and dashboard Phase C/D.

---

## 11. Module: Season and Leaderboard

Purpose:

Monitor seasonal Nexus Score, leaderboard eligibility, and season state.

Read-only data:

- active season
- season start/end
- leaderboard state
- top players
- score distribution
- score source breakdown
- Arcade XP weighting
- eligibility failures
- unresolved flagged users
- finalization status
- archived seasons

Future controls:

- freeze leaderboard
- recalculate leaderboard
- lock final standings
- archive season
- start next season
- export season report

Season reward controls require approval and prize ledger integration.

---

## 12. Module: Event Operations

Purpose:

Monitor event participation, event score, event eligibility, and event reward safety.

Read-only data:

- active events
- event participants
- event submissions
- event score
- event reward holds
- event abuse flags
- event eligibility failures
- event leaderboard

Future controls:

- open event
- close event
- pause submissions
- lock event scoring
- review event winners
- export event report

Event rewards must not auto-issue without review.

---

## 13. Module: Prize Pool Ledger

Purpose:

Monitor prize pool records separately from XP and gameplay resources.

Read-only data:

- prize pool entries
- planned awards
- issued awards
- pending approvals
- denied rewards
- recipient eligibility
- event/season reference
- approval status
- audit linkage

Future controls:

- draft prize allocation
- approve prize award
- reject prize award
- lock prize pool
- export prize ledger

Prize controls must remain disabled until approved.

No prize action without ledger.

---

## 14. Module: Admin Action Ledger

Purpose:

Monitor all admin, founder, moderator, and system actions.

Read-only data:

- admin action ID
- actor ID
- target ID
- action type
- reason
- old value
- new value
- timestamp
- related incident
- related season/event
- approval status

Future controls:

- filter logs
- export audit packet
- mark reviewed
- escalate suspicious admin action

Never delete audit records through the dashboard.

---

## 15. Module: Deployment and Code Safety

Purpose:

Monitor code, branch, deployment, and environment safety.

Read-only data:

- current branch
- latest commit
- deployment status
- build status
- environment mode
- Prisma migration status
- failed builds
- pending PRs
- production/staging mismatch
- active agent branch if applicable

Future controls:

- mark deployment window
- freeze deployment approvals
- open deployment incident
- export deployment report

Forbidden:

- direct merge to main
- direct production deploy
- secret rotation
- destructive migration
- bypassing CI/checks

---

## 16. Module: MCAOS Agent Oversight

Purpose:

Monitor AI agents and sub-agent activity.

Read-only data:

- active agents
- agent task queue
- agent status
- allowed tools
- forbidden actions
- pending approvals
- recent outputs
- failed checks
- blocked tasks
- approval gates triggered

Future controls:

- pause agent
- assign task
- approve draft output
- reject output
- export agent report

Agents must not get production write authority through dashboard shortcuts.

---

## 17. Incident Response Rail

Purpose:

Provide a dedicated incident management surface.

Incident record should include:

- incident ID
- severity
- affected module
- summary
- detection source
- opened by
- opened timestamp
- current status
- affected users
- actions taken
- evidence links
- resolution summary
- closed by
- closed timestamp

Incident statuses:

- open
- investigating
- contained
- resolved
- false_positive
- escalated
- closed

Future controls:

- open incident
- update incident
- escalate incident
- attach evidence
- export incident packet
- close incident

---

## 18. Emergency Controls

Emergency controls must be disabled until Phase D.

Future emergency controls may include:

| Control | Effect |
|---|---|
| Economy Lockdown | Freeze XP/resource writes |
| Safe Mode | Put ecosystem into read-only/status mode |
| Leaderboard Freeze | Stop leaderboard movement |
| Prize Pool Freeze | Block prize issuance |
| CNX Verification Freeze | Stop CNX tier updates |
| CNX Multiplier Disable | Temporarily apply 1.00x for future events |
| Discord Mutation Stop | Stop role mutation |
| Arcade Reward Freeze | Stop arcade reward writes |
| Contribution XP Freeze | Stop contribution XP writes |

Emergency controls must:

- require permission
- require confirmation
- require reason code
- write audit log
- create incident record
- preserve evidence
- avoid deleting data
- be reversible where possible

---

## 19. Safe Mode

Safe Mode is a future emergency state.

When active, Safe Mode should:

- pause XP writes
- pause resource writes
- pause leaderboard updates
- pause prize awards
- pause CNX multiplier updates
- pause role mutations
- allow read-only status commands
- continue logging
- show public-safe maintenance state if needed

Safe Mode exit requires:

- root cause identified
- affected module listed
- logs reviewed
- correction plan approved
- owner or authorized operator approval
- post-incident report

---

## 20. Required Future Tables or Equivalents

The dashboard may eventually require tables or equivalent records for:

- system_health_snapshots
- module_status
- incident_reports
- abuse_flags
- player_risk_scores
- economy_events
- admin_actions
- emergency_locks
- dashboard_permissions
- dashboard_sessions
- cnx_verification_logs
- discord_role_sync_logs
- season_operations
- event_operations
- prize_pool_ledger
- deployment_health_logs

Do not add these tables without approval.

This section defines future needs only.

---

## 21. Read Endpoint Blueprint

Potential future read endpoints:

- `GET /api/admin/health`
- `GET /api/admin/economy/summary`
- `GET /api/admin/economy/events`
- `GET /api/admin/players/risk`
- `GET /api/admin/discord/status`
- `GET /api/admin/cnx/snapshots`
- `GET /api/admin/seasons/current`
- `GET /api/admin/events/active`
- `GET /api/admin/incidents`
- `GET /api/admin/audit-log`
- `GET /api/admin/deployments/status`
- `GET /api/admin/agents/status`

These should begin as read-only endpoints.

All admin endpoints require authentication and authorization before production use.

---

## 22. Write Endpoint Blueprint

Potential future write endpoints:

- `POST /api/admin/economy/pause`
- `POST /api/admin/economy/resume`
- `POST /api/admin/leaderboard/freeze`
- `POST /api/admin/leaderboard/recalculate`
- `POST /api/admin/cnx/freeze`
- `POST /api/admin/cnx/disable-multiplier`
- `POST /api/admin/discord/pause-role-sync`
- `POST /api/admin/user/quarantine`
- `POST /api/admin/prize/lock`
- `POST /api/admin/safe-mode/enable`
- `POST /api/admin/safe-mode/disable`
- `POST /api/admin/incident/open`
- `POST /api/admin/incident/close`

Do not implement write endpoints until:

- auth exists
- role permission exists
- reason code exists
- audit log exists
- confirmation token exists for dangerous actions
- owner approval exists

---

## 23. UI/UX Requirements

The dashboard should use:

- dark command-room interface
- clear module cards
- monitor-wall layout
- severity labels
- status badges
- audit tables
- incident rail
- disabled future controls
- confirmation modals for future dangerous actions
- no hidden critical state
- no ambiguous emergency buttons

Every control must be labeled with:

- what it does
- what module it affects
- whether it is active or disabled
- whether approval is required
- whether it writes an audit log

---

## 24. Operator Workflow

Daily operator workflow should eventually include:

1. Check global system status.
2. Check active alerts.
3. Review economy health.
4. Review player risk queue.
5. Review Discord ops.
6. Review CNX verification state.
7. Review failed jobs or health warnings.
8. Review admin action log.
9. Resolve or escalate warnings.
10. Export daily summary if needed.

Weekly operator workflow should include:

1. Review XP distribution.
2. Review rank velocity.
3. Review resource inflation.
4. Review CNX tier distribution.
5. Review abuse flags.
6. Review admin actions.
7. Review season/leaderboard health.
8. Review open decisions and incidents.

---

## 25. Dashboard QA Requirements

Dashboard QA must verify:

- read-only mode has no write side effects
- disabled controls do not call write endpoints
- emergency controls are disabled before Phase D
- status labels render correctly
- health data handles failures safely
- missing data displays as UNKNOWN
- audit logs are visible where expected
- user risk queue does not expose secrets
- CNX wallet display avoids unnecessary sensitive exposure
- role sync controls are disabled until authorized
- write controls require reason codes
- write controls require confirmation
- dangerous controls create audit records once active

---

## 26. Final Dashboard Directive

The dashboard is a command system, not decoration.

Monitor first.

Report second.

Control third.

Emergency powers last.

Do not give the dashboard power before the backend can prove every action is authenticated, authorized, logged, and reversible where possible.
