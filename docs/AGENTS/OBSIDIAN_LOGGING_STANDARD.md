# Obsidian Logging Standard

**Root authority: ../../AGENTS.md**

## Overview

Every YELLOW or RED task, completed implementation task, release-prep task, architectural decision, doctrine change, and public-product decision MUST produce an Obsidian export note.

GREEN micro-tasks (read-only analysis, typo fixes, doc edits that do not touch doctrine) may log only in the completion report unless Anthony requests a note.

This standard ensures the Obsidian secondary brain is the authoritative record of all significant decisions and work.

---

## YAML Frontmatter (Required for All Export Notes)

Every note exported to the Obsidian vault MUST include this YAML frontmatter:

```yaml
---
title: [Clear title summarizing the work or decision]
date: [ISO 8601 format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ]
repo: citadelnexus-cnx/citadel-nexus-backend
branch: [feature branch name, e.g., feature/economy-rebalance]
task_id: [Unique identifier for this work, e.g., task-id-economy-v2]
mode: [AUDIT ONLY | PLAN ONLY | DOCS ONLY | SPEC MODE | IMPLEMENT APPROVED CHANGE | etc.]
risk_level: [GREEN | YELLOW | RED]
lifecycle_phase: [DEFINE | PLAN | BUILD | VERIFY | REVIEW | SHIP]
skill_used: [Comma-separated list of skills activated, e.g., spec-driven-development, economy-audit]
status: [pending | in_progress | complete | blocked]
files_changed: [Comma-separated list, e.g., src/economy/rewards.ts, prisma/schema.prisma]
approval_required: [YES | NO]
approval_from: [If YES, who: e.g., Anthony Hammon]
adr_created: [YES | NO]
adr_filename: [If YES, e.g., ADR-0042-economy-rebalance.md]
tags:
  - citadel-nexus
  - agent-log
  - [additional tags as needed]
---
```

---

## Vault Folder Structure

Store notes in the main Obsidian vault under this folder hierarchy:

```
Citadel Nexus/
├── 00 Command/
│   ├── Agent Instructions
│   ├── Approval Gates
│   ├── RED Gate Escalations
│   └── Task Templates
├── 01 Architecture/
│   ├── Doctrine
│   ├── Design Decisions
│   ├── System Boundaries
│   └── Integration Patterns
├── 02 Backend/
│   ├── API Design
│   ├── Service Layer
│   ├── Data Models
│   └── Hedera Integration
├── 03 Frontend/
│   ├── UI Components
│   ├── Public Products
│   ├── Surface Layer
│   └── Accessibility
├── 04 Discord/
│   ├── Bot Logic
│   ├── Role Sync
│   ├── Command Structure
│   └── Live Changes Log
├── 05 Economy/
│   ├── Progression System
│   ├── XP and Rewards
│   ├── Caps and Limits
│   ├── Anti-Pay-to-Win
│   └── Rebalancing History
├── 06 Security/
│   ├── Auth Strategy
│   ├── Secret Handling
│   ├── Audit Logs
│   └── Vulnerability Reports
├── 07 Agent Logs/
│   ├── Complex Tasks
│   ├── RED Gate Escalations
│   ├── Doctrine Changes
│   └── Release Preparation
├── 08 Decisions/
│   ├── Architecture Decision Records (ADRs)
│   ├── Process Decisions
│   ├── Tool Selections
│   └── Major Changes
├── 09 Productization/
│   ├── Public Launches
│   ├── IP Protection Audits
│   ├── Marketing Materials
│   └── User-Facing Changes
├── 10 Release Readiness/
│   ├── Deployment Checklists
│   ├── Rollout Plans
│   ├── Monitoring Setup
│   └── Rollback Procedures
├── 11 Agent Skills Logs/
│   ├── Skill Activations
│   ├── Anti-Rationalization Enforcement
│   ├── Lifecycle Progress
│   └── Evidence Archives
└── 12 ADR Archive/
    ├── ADR-0001 to ADR-9999 (chronological)
    ├── Decision Rationale
    ├── Consequences
    └── Alternatives Considered
```

---

## Export Queue Fallback

If the Obsidian vault is not directly accessible:

1. Write note as markdown file to `docs/OBSIDIAN_EXPORT_QUEUE/`
2. Use filename convention: `[TIMESTAMP]-[task-id]-[short-title].md`
   → Example: `2026-05-16-task-economy-v2-economy-rebalance.md`
3. Include full YAML frontmatter
4. Add note at top of file:
   ```
   **NOTE:** This file is in the export queue. It should be moved to the Obsidian
   vault at [folder path] and removed from this directory once imported.
   ```
5. Periodically export queued files to vault (not automated by agent)

---

## Note Templates by Type

### Type A: Task/Work Log

Used for YELLOW/RED tasks and implementation work.

```yaml
---
title: [Work title]
date: [Date]
repo: citadelnexus-cnx/citadel-nexus-backend
branch: [Branch name]
task_id: [ID]
mode: [Mode]
risk_level: [Level]
lifecycle_phase: [Phase]
skill_used: [Skills]
status: [Status]
files_changed: [Files]
approval_required: [YES/NO]
approval_from: [From]
adr_created: [YES/NO]
tags:
  - citadel-nexus
  - agent-log
---

## Summary

[2-3 sentence overview of what was done and why]

## Context

[Background, requirements, trigger for this work]

## Work Completed

[What was actually done; link to code changes, branches, PRs]

## Verification

- Build: [PASS/FAIL]
- Tests: [PASS/FAIL]
- Review: [Complete/Pending]
- Approval: [Approved/Pending/Escalated]

## Risks and Follow-Ups

[Identified risks, follow-up work needed]

## Approval Status

[If RED gate: escalated to Anthony on DATE]
[If approved: approved by PERSON on DATE]

## Related Links

- [Link to prior ADRs or decisions]
- [Link to related PRs]
- [Link to related issues]
```

### Type B: Architecture Decision Record (ADR)

Used for architectural decisions. Also stored in `12 ADR Archive/` with standard ADR naming.

```yaml
---
title: ADR-[NUMBER] [Decision Title]
date: [Date]
repo: citadelnexus-cnx/citadel-nexus-backend
branch: [Feature branch]
status: [Proposed | Accepted | Deprecated | Superseded By ADR-X]
tags:
  - citadel-nexus
  - adr
  - [domain tag]
---

# ADR-[NUMBER]: [Decision Title]

## Status

[Proposed | Accepted | Deprecated | Superseded By ADR-X]

## Context

[What is the issue we're facing? Why does this matter?]

## Decision

[What is the decision we're making?]

## Rationale

[Why this decision over alternatives?]

## Consequences

### Positive

[Benefits of this decision]

### Negative

[Drawbacks or trade-offs]

### Ongoing

[What needs to be monitored or maintained?]

## Alternatives Considered

[Other options and why they were rejected]

## Related Decisions

[Links to ADRs or decisions this relates to]

## Approval

[Approved by Anthony on DATE]
```

### Type C: Release/Deployment Note

Used for release preparation and deployment work.

```yaml
---
title: Release [VERSION] Deployment Preparation
date: [Date]
repo: citadelnexus-cnx/citadel-nexus-backend
branch: [Release branch]
task_id: [Release ID]
mode: RELEASE CHECKLIST ONLY
risk_level: RED
lifecycle_phase: SHIP
status: [In Progress | Ready for Deployment | Deployed]
approval_required: YES
approval_from: Anthony Hammon
tags:
  - citadel-nexus
  - agent-log
  - release
---

## Release Summary

[High-level overview of what's included in this release]

## Deployment Checklist

- [ ] Code merged to main
- [ ] Tests all passing
- [ ] Monitoring configured
- [ ] Rollback plan documented and tested
- [ ] Staged rollout sequence planned
- [ ] Stakeholders notified
- [ ] Anthony approved deployment

## Rollback Procedure

[Step-by-step rollback instructions, tested]

## Monitoring Plan

[What to watch for during and after deployment]

## Risks Identified

[Known risks and mitigation strategies]

## Deployment Approval

[Approved by Anthony on DATE]
```

---

## Forbidden Content (NEVER Log)

THESE MUST NEVER APPEAR IN OBSIDIAN NOTES:

- .env file contents or variable values
- Private keys or seed phrases
- API keys, bot tokens, or other credentials
- Database connection strings or URLs
- Webhook URLs (credential-bearing)
- Private production URLs or admin URLs
- Wallet addresses linked to private keys
- Supabase service role keys or database URLs
- Discord role ID values (EXCEPT when in approved role registry context)
- Any PII beyond what is explicitly required for the note
- Any credentials or secrets in any form

If a note references a secret or sensitive value, use:
```
[REDACTED: [description of what this is]]
```

Example:
```
Hedera account operator: [REDACTED: Hedera testnet operator key]
Database: [REDACTED: Supabase production connection string]
```

---

## Linking and Backlinks

Use Obsidian backlinks to connect notes:

- Link to related ADRs: `[[ADR-0042-economy-rebalance]]`
- Link to prior decisions: `[[Design Decisions]]`
- Link to task logs: `[[2026-05-16-task-economy-v2-economy-rebalance]]`
- Link to related work: `[[Feature/economy-rebalance PR]]`

Backlinks create a knowledge graph. Use them to trace decisions and dependencies.

---

## Decision Logs

For complex decisions, create a decision log entry:

```
## Decision Log

### [Date] - [Topic]

**Question:** [What decision needed to be made?]

**Options:**
1. [Option A and rationale]
2. [Option B and rationale]
3. [Option C and rationale]

**Decision:** [What was chosen and why?]

**Approved by:** [Who approved]

**Date Approved:** [When]

**Related ADR:** [[ADR-XXXX]]
```

---

## Obsidian Export Checklist

Before exporting a note to the vault:

- [ ] YAML frontmatter is complete
- [ ] No secrets or credentials included
- [ ] All backlinks use [[wiki-link]] format
- [ ] Title is clear and descriptive
- [ ] Date is in ISO 8601 format
- [ ] Tags are applied (at least citadel-nexus)
- [ ] Risk level is correct (GREEN/YELLOW/RED)
- [ ] Approval status is clear
- [ ] Note is stored in appropriate vault folder
- [ ] Export queue file (if used) is marked for import

---

## When Obsidian Notes Are Required

| Work Type | Obsidian Required |
|---|---|
| GREEN micro-tasks (typos, read-only analysis) | NO (log in completion report) |
| GREEN docs-only tasks | NO (unless requested) |
| YELLOW source code changes | YES |
| YELLOW config changes | YES |
| RED tasks (any) | YES (always) |
| Economy changes | YES (always) |
| Discord changes | YES (always) |
| Hedera changes | YES (always) |
| Architectural decisions | YES (as ADR) |
| Security vulnerabilities | YES (with [REDACTED] for secrets) |
| Public product launches | YES (with IP audit) |
| Release preparation | YES (with deployment checklist) |
| Doctrine changes | YES (with before/after) |

---

## Obsidian Maintenance

Periodically:
- Review export queue: `docs/OBSIDIAN_EXPORT_QUEUE/`
- Move queued notes to vault
- Delete queue files after import
- Review and archive old decision logs
- Validate backlinks (no broken links)
- Ensure ADR archive is up to date
