# Citadel Nexus Agentic AI Architecture

## Document Purpose

This document defines the internal architecture for future agentic AI support inside Citadel Nexus.

It explains how AI agents may assist with building, auditing, documenting, testing, monitoring, and eventually operating parts of the Citadel Nexus ecosystem under strict human approval.

This file is an internal technical reference.

This file is not public marketing copy.

AGENTS.md remains the controlling operating law.

CLAUDE.md defines Claude-specific operating guidance.

CITADEL_NEXUS_V3_DOCTRINE.md remains the master doctrine.

SYSTEM_OVERVIEW.md defines the ecosystem-level architecture.

---

## 1. Master Agentic AI Rule

Agentic AI may assist Citadel Nexus.

Agentic AI may not govern Citadel Nexus.

The authority hierarchy remains:

Backend defines truth.
Discord reflects truth.
Frontend surfaces truth.
AI agents assist execution.
Anthony Hammon holds final authority.

AI agents must never become final authority for irreversible, production, economy, CNX, Discord role, database, treasury, or prize-related actions.

---

## 2. Agentic AI Definition

In Citadel Nexus, agentic AI means an AI-assisted operator system that can:

- read project context
- inspect repository structure
- create plans
- edit files with approval
- generate documentation
- draft code
- run checks
- summarize changes
- create implementation reports
- identify risks
- prepare pull requests
- monitor read-only data in future phases
- recommend safe actions

Agentic AI does not mean fully autonomous production control.

Agentic AI does not mean unsupervised deployment.

Agentic AI does not mean the AI can change the economy, roles, or database without approval.

---

## 3. Current Agentic AI Stage

Current intended stage:

Agentic Build Assistant / Controlled Repo Operator

The current goal is to make the repository understandable and safe for AI coding tools.

Current agentic capabilities should focus on:

- documentation
- repository audits
- gap reports
- issue planning
- code review
- safe scaffolding
- test writing
- read-only endpoint planning
- dashboard planning
- PR summaries

Current agentic capabilities should not include:

- production deployment
- production database mutation
- live Discord role mutation
- economy constant changes
- CNX utility activation
- prize pool execution
- wallet or treasury actions
- autonomous merge to main

---

## 4. Repository Agent Readiness

The backend repository must contain clear guidance for AI agents.

Required control files:

- AGENTS.md
- CLAUDE.md
- docs/DOCTRINE/
- docs/ARCHITECTURE/
- docs/BUILD/
- docs/SECURITY/
- docs/QA/

AGENTS.md is the highest local repository instruction file.

Claude, Codex, Cursor, Copilot-style agents, or custom agents must follow AGENTS.md before acting.

---

## 5. Agent Operating Modes

## 5.1 Documentation Mode

Allowed:

- create internal docs
- improve formatting
- summarize architecture
- create build plans
- create checklists
- document risks
- prepare task breakdowns

Restrictions:

- no code logic changes unless approved
- no schema changes
- no environment changes
- no deployment actions

## 5.2 Audit Mode

Allowed:

- inspect files
- compare code to doctrine
- identify gaps
- identify duplicate logic
- identify missing tests
- identify unsafe patterns
- produce reports

Restrictions:

- no automatic fixes unless approved
- no destructive edits
- no production actions

## 5.3 Coding Mode

Allowed after task approval:

- edit code on feature branch
- add tests
- refactor small safe areas
- add read-only endpoints
- add service scaffolds
- improve type safety
- fix build errors

Restrictions:

- no economy value changes without approval
- no migrations without approval
- no production deployment
- no live Discord mutation
- no secret handling

## 5.4 Monitoring Mode

Future phase only.

Allowed after dashboard/read-only infrastructure exists:

- read system health
- summarize incidents
- flag anomalies
- create reports
- recommend actions
- open draft issues

Restrictions:

- read-only by default
- no automatic emergency actions
- no production writes without approval

## 5.5 Controlled Operations Mode

Future phase only.

Allowed only after authentication, authorization, audit logs, reason codes, confirmation flows, and owner approval exist.

May include:

- opening incidents
- pausing approved non-critical modules
- exporting reports
- running dry-runs
- requesting approvals

Still forbidden without explicit approval:

- economy lockdown
- role mutation
- prize action
- schema migration
- production deploy
- token action

---

## 6. Agent Roles

Future agentic AI may be divided into specialized agents.

## 6.1 Architect Agent

Responsible for:

- system design review
- dependency order
- architecture gap reports
- cross-module consistency
- doctrine alignment

Must not:

- modify production code without approval
- invent new system authority
- bypass AGENTS.md

## 6.2 Backend Agent

Responsible for:

- Express API changes
- service layer work
- route scaffolding
- Prisma-safe planning
- backend test planning
- API summaries

Must not:

- run migrations without approval
- change production env
- bypass service boundaries
- hard-code economy values

## 6.3 Economy Agent

Responsible for:

- XP rule review
- cap validation
- economy simulation planning
- anti-farming checks
- reward flow audits
- Nexus Score formula review

Must not:

- change economy constants without approval
- activate future-phase economy systems
- grant XP or resources
- weaken caps

## 6.4 Discord Agent

Responsible for:

- Discord command review
- bot flow planning
- command safety checks
- permission review
- role sync audit review

Must not:

- mutate live roles without approval
- deploy slash commands without approval
- expose admin commands
- change role IDs

## 6.5 Dashboard Agent

Responsible for:

- dashboard layout planning
- read-only UI scaffolding
- status model implementation
- incident rail planning
- module card design

Must not:

- implement write controls early
- create fake controls that imply real power
- bypass authentication or audit rules

## 6.6 QA Agent

Responsible for:

- test plans
- acceptance criteria
- regression checklists
- manual verification flows
- build validation reports

Must not:

- mark tasks complete without evidence
- claim tests ran when they did not
- ignore failed checks

## 6.7 Security Agent

Responsible for:

- secrets review
- approval gate review
- permission model review
- wallet/treasury boundary review
- role/admin risk review
- incident risk review

Must not:

- request secrets
- expose secrets
- weaken access controls
- approve risky actions alone

## 6.8 Docs Agent

Responsible for:

- maintaining docs
- updating doctrine references
- preserving internal source of truth
- creating implementation summaries
- keeping AGENTS.md-aligned docs current

Must not:

- change doctrine silently
- publish private internal docs publicly
- mix outdated and current rules without labeling

## 6.9 Narrative Agent

Responsible for:

- public-safe updates
- announcement drafts
- community-facing summaries
- roadmap language

Must not:

- make token investment claims
- promise rewards
- expose private implementation details
- publish without approval

## 6.10 Compliance Agent

Responsible for:

- public wording review
- CNX utility wording review
- prize/reward claim review
- risk language review

Must not:

- provide legal final approval
- publish claims without review
- weaken CNX safety language

---

## 7. Agent Permission Levels

## 7.1 Level 0 — No Access

Agent may only answer questions from provided context.

No repo access.

No tool access.

## 7.2 Level 1 — Read-Only Repo

Agent may:

- inspect files
- summarize code
- produce reports
- identify gaps

Agent may not edit files.

## 7.3 Level 2 — Documentation Writer

Agent may:

- create docs
- edit docs
- update checklists
- prepare task plans

Agent may not change app logic.

## 7.4 Level 3 — Branch Coding Agent

Agent may:

- edit code on feature branch
- run local checks
- create draft commits
- prepare PR summaries

Agent may not:

- merge to main
- deploy production
- run migrations without approval
- touch secrets

## 7.5 Level 4 — Read-Only Operations Agent

Future only.

Agent may:

- read dashboard status
- summarize incidents
- detect anomalies
- create draft reports

Agent may not write production state.

## 7.6 Level 5 — Controlled Operations Agent

Future only.

Agent may perform approved controlled actions only after:

- authentication exists
- authorization exists
- reason codes exist
- audit logs exist
- confirmation exists
- owner approval exists

Level 5 must still never touch treasury/private keys.

---

## 8. Agent Approval Gates

Agents must stop and request approval before:

- changing XP values
- changing rank thresholds
- changing Stage thresholds
- changing CNX tiers
- changing CNX multipliers
- changing claim cooldowns
- changing mission rewards
- changing resource costs
- changing Discord role logic
- changing admin permissions
- adding or modifying Prisma schema
- creating migrations
- running migrations
- changing auth
- changing production env behavior
- adding dashboard write controls
- adding prize logic
- adding wallet verification logic
- touching token/treasury logic
- deleting files
- merging to main
- deploying production
- posting public announcements

When uncertain, stop and ask.

---

## 9. Agent Forbidden Actions

Agents must never:

- expose secrets
- print private keys
- request seed phrases
- commit .env
- access treasury assets
- send token transactions
- deploy production alone
- merge to main alone
- mutate live Discord roles alone
- issue XP alone
- issue prizes alone
- change economy constants silently
- bypass caps
- create pay-to-win mechanics
- erase audit history
- delete evidence
- hide failed tests
- claim completion without verification
- bypass Anthony Hammon approval

---

## 10. Branch Workflow

Agent work must happen on branches.

Recommended branch patterns:

- agent/bootstrap-v3-knowledge-core
- agent/repo-audit
- agent/economy-health-readonly
- agent/admin-audit-review
- agent/dashboard-readonly-prototype
- agent/qa-test-plan
- docs/architecture-update
- fix/route-validation
- test/economy-cap-validation

Agents must not commit directly to main unless explicitly approved.

Agents should make small, reviewable commits.

---

## 11. Task Lifecycle

Every agent task should follow this lifecycle:

1. Read AGENTS.md.
2. Read relevant docs.
3. Inspect relevant files.
4. Identify current state.
5. State assumptions.
6. Create a short plan.
7. Identify risk level.
8. Make the smallest safe change.
9. Run available checks.
10. Summarize results.
11. List risks.
12. List follow-up tasks.
13. Identify approval items.
14. Stop for review when needed.

---

## 12. Completion Report Format

Every agent task should end with:

TASK COMPLETION REPORT

Task:
Branch:
Files changed:
What changed:
Why:
Checks run:
Check results:
Risks:
Follow-up tasks:
Approval required:
Open questions:

A task is not complete without a report.

---

## 13. Agent Build Operator v0.1

The first practical agentic workflow should be:

Citadel Nexus Build Operator v0.1

Purpose:

Help continue building Citadel Nexus from the current repo state while remaining approval-gated.

Allowed in v0.1:

- read repo
- write docs
- audit implementation
- create issue backlog
- scaffold safe code
- run local checks
- prepare PR summaries
- create controlled branches

Not allowed in v0.1:

- deploy production
- merge to main
- run migrations
- mutate live Discord roles
- issue XP
- issue prizes
- activate CNX automation
- touch treasury/wallet keys

---

## 14. Future Agent Ops Repository

A separate future repository may be created for agent operations.

Possible name:

citadel-nexus-agent-ops

Purpose:

- agent prompt library
- MCP configuration
- GitHub automation scripts
- issue generators
- repo audit scripts
- dashboard-agent experiments
- multi-agent orchestration
- monitoring scripts

This future repo must not duplicate the main product.

It should operate as tooling around the Citadel Nexus product repos.

The current build should begin inside the existing Citadel Nexus repos, not in a blank replacement repo.

---

## 15. MCP and Tooling Architecture

Future agent tooling may use controlled tool connectors.

Possible tool categories:

- GitHub read/write with branch restrictions
- filesystem read/write in local repo
- terminal command execution
- test runner
- documentation generator
- issue/PR creator
- dashboard read-only API
- log reader
- Supabase read-only queries
- Discord read-only status

Tool access must follow least privilege.

Production write tools require explicit approval and audit logging.

Treasury/private key tools should not be granted to agents.

---

## 16. GitHub Issue Workflow

GitHub Issues should become the agent task queue.

Recommended issue structure:

- title
- purpose
- doctrine references
- files likely affected
- acceptance criteria
- approval gates
- forbidden shortcuts
- test requirements
- risk level
- dependencies

Agents should work from issues when possible.

Large epics should be broken into small tasks.

---

## 17. Pull Request Workflow

Agent-created PRs should include:

- summary
- files changed
- doctrine references
- risk level
- tests/checks run
- screenshots if UI
- migration status
- deployment notes
- approval gates triggered
- follow-up tasks

PRs affecting high-risk areas require manual review.

High-risk PR areas include:

- database
- economy
- Discord roles
- CNX
- auth
- dashboard controls
- prize systems
- deployments

---

## 18. Agent Memory and Context Rules

Agent context should come from:

- AGENTS.md
- CLAUDE.md
- docs/DOCTRINE/
- docs/ARCHITECTURE/
- docs/BUILD/
- docs/SECURITY/
- docs/QA/
- current repo files
- current GitHub issues
- current branch state

Agents should not rely on vague memory when repo files disagree.

If memory conflicts with repo:

- repo wins for current implementation
- doctrine wins for design rules
- conflict becomes an open decision

---

## 19. Safe Knowledge Extraction

Raw chat logs should not be blindly fed into agents.

Knowledge should be extracted into clean files.

Preferred files:

- doctrine specs
- architecture docs
- build status docs
- backlog docs
- approval gates
- security boundaries
- QA plans

Agents work best from clean source-of-truth docs, not scattered conversation history.

---

## 20. Agent Monitoring Future State

In future phases, agents may monitor:

- system health
- bot status
- failed jobs
- economy anomalies
- XP spikes
- abuse flags
- role sync failures
- CNX verification errors
- leaderboard risks
- incident queues
- deployment status

Monitoring should be read-only by default.

Recommendations should be reported, not auto-executed.

---

## 21. Agent Incident Handling

Future agents may help with incidents by:

- identifying symptoms
- collecting safe logs
- summarizing impact
- drafting incident reports
- recommending containment
- creating GitHub issues
- drafting postmortems

Agents must not independently:

- activate safe mode
- freeze systems
- ban users
- delete data
- deploy fixes
- issue compensation
- publish public incident statements

---

## 22. Agent and Dashboard Relationship

The Command Control Dashboard may eventually include an MCAOS Agent Oversight panel.

This panel may show:

- active agents
- active tasks
- pending approvals
- blocked actions
- failed checks
- recent outputs
- risk flags
- tool access state
- audit trail

Agent controls may include:

- pause agent
- resume agent
- reject task
- approve draft
- export report

Dangerous agent powers must remain disabled until full governance exists.

---

## 23. Agent Security Rules

Agents must protect:

- secrets
- database credentials
- bot tokens
- wallet credentials
- private keys
- production env values
- admin endpoints
- Discord role mutation authority
- economy constants
- prize records
- audit records

Agents must not ask the owner to paste secrets into chat.

Secrets should be configured only through secure platform/environment settings.

---

## 24. Agent QA Rules

Agent-created changes must include validation.

Documentation-only tasks should run:

- git diff --stat
- git status

Code tasks should run relevant checks such as:

- npm run build
- npm run test if available
- npm run lint if available
- npx prisma validate if schema touched

If checks are unavailable, the agent must say so.

Failed checks must be reported.

---

## 25. Agent Escalation Rules

Agents must escalate when:

- doctrine conflicts with code
- repo state conflicts with memory
- tests fail
- build fails
- schema change is needed
- migration is needed
- production env may be affected
- Discord role behavior may change
- economy values may change
- CNX utility may change
- public token/reward language may be affected
- data deletion is proposed

Escalation means stop, report, and request approval.

---

## 26. Human Approval Model

Anthony Hammon holds final authority.

Major decisions require explicit approval.

Major decisions include:

- economy balancing
- phase activation
- Discord role authority
- CNX utility
- prize/reward logic
- production deployment
- database migration
- dashboard write controls
- public token messaging
- agent permission expansion

Agents must not interpret silence as approval.

---

## 27. Future Multi-Agent Coordination

Future multi-agent work should use a command hierarchy.

Recommended hierarchy:

1. Human Owner
2. Command/Architect Agent
3. Specialized Agents
4. Tool Executors
5. Reporters/Monitors

Specialized agents should not independently choose major architecture direction.

Cross-system decisions route through the Command/Architect Agent and then to human approval.

---

## 28. Agentic AI Completion Standard

Agentic AI architecture is ready for practical use when:

- AGENTS.md exists
- CLAUDE.md exists
- doctrine docs exist
- architecture docs exist
- build backlog exists
- approval gates exist
- security boundaries exist
- QA plans exist
- branch workflow is followed
- agents can produce completion reports
- high-risk actions are blocked

---

## 29. Final Agentic AI Directive

Use agents to reduce manual workload.

Do not use agents to remove accountability.

Use agents to accelerate safe building.

Do not use agents to bypass human command.

Use agents to detect risks.

Do not use agents to hide risks.

Citadel Nexus may become agent-assisted.

Citadel Nexus must not become agent-uncontrolled.
