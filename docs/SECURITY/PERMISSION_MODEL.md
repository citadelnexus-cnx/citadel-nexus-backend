# Citadel Nexus Permission Model

## Document Purpose

This document defines the internal permission model for Citadel Nexus.

It explains authority levels, role boundaries, admin safety, Discord permission boundaries, dashboard permission requirements, agent permission limits, and future access-control rules.

This file is not public marketing copy.

AGENTS.md remains the controlling operating law.

DO_NOT_TOUCH.md defines protected areas.

SECRETS_POLICY.md defines secrets handling rules.

APPROVAL_GATES.md defines approval requirements.

---

## 1. Master Permission Rule

Citadel Nexus permissions must follow least privilege.

No person, bot, dashboard, script, AI agent, or automation should have more access than needed for its approved task.

Permission does not equal authority.

Access does not equal approval.

Admin access does not bypass audit requirements.

Founder authority is final, but founder actions should still remain auditable when they affect system state.

---

## 2. Authority Hierarchy

Citadel Nexus authority hierarchy:

1. Anthony Hammon
2. Approved human operators
3. Backend source of truth
4. Authenticated admin systems
5. Discord bot service layer
6. Frontend display layer
7. AI agents and automation assistants
8. Public users and members

Backend defines truth.

Discord reflects truth.

Frontend surfaces truth.

AI agents assist execution.

Anthony Hammon holds final authority.

---

## 3. Permission Principles

All permission design must preserve:

- least privilege
- auditability
- separation of duties
- backend authority
- role clarity
- human approval for major actions
- no hidden admin power
- no agent self-approval
- no Discord-only truth
- no frontend-only authority
- no unaudited economy mutation
- no unauthorized production mutation

Permissions should be explicit, not implied.

---

## 4. Human Permission Levels

## 4.1 Owner

Owner:

Anthony Hammon.

Owner may approve:

- doctrine changes
- economy changes
- phase advancement
- CNX utility changes
- schema changes
- production deployment
- dashboard write controls
- prize logic
- wallet/treasury actions
- public announcements
- AI agent permission expansion

Owner actions should still preserve logs and documentation.

## 4.2 Admin Operator

Future admin operators may be approved for limited operational work.

Allowed only after explicit approval:

- review users
- review incidents
- review abuse flags
- review audit logs
- assist with support
- execute approved low-risk admin workflows

Admin operators must not:

- change economy rules
- approve their own high-risk actions
- access treasury keys
- bypass logs
- deploy production without approval
- mutate live roles outside approved tools

## 4.3 Moderator

Moderators may support community safety.

Potential allowed scope:

- review Discord conduct
- escalate abuse
- help verify contributions if approved
- enforce community rules
- flag suspicious behavior

Moderators must not:

- directly change backend economy state
- issue prizes
- change CNX tiers
- change Stage or Game Rank
- mutate backend truth without approved tooling
- access secrets

## 4.4 Member

Members may:

- play approved live gameplay
- use approved Discord commands
- view public/member state
- submit feedback
- participate in approved events
- earn progress through approved systems

Members must not:

- access admin tools
- bypass cooldowns
- exploit economy systems
- impersonate staff
- manipulate roles
- access private data

---

## 5. Backend Permission Model

The backend owns truth.

Backend write operations must be protected by:

- route validation
- service-layer validation
- phase checks
- permission checks
- audit records where meaningful
- safe error handling
- least-privilege environment access

Backend admin writes must require:

- authentication when admin auth exists
- authorization
- reason code where applicable
- audit log
- owner approval for high-risk actions

No unauthenticated admin write endpoint should exist in production.

---

## 6. Discord Permission Model

Discord is an interaction and community layer.

Discord roles may reflect backend state, but Discord roles must not define backend truth.

Discord permissions must separate:

- public/member commands
- gameplay commands
- moderator commands
- admin commands
- founder-only commands

Discord bot command permissions must not expose admin actions to normal members.

Discord role IDs must not be changed without approval.

Live role mutation must remain backend-driven and auditable.

---

## 7. Discord Role Categories

Potential role categories:

- public/member roles
- verified/community roles
- progression roles
- holder recognition roles
- moderator roles
- admin/founder roles
- bot/system roles

Rules:

- member roles cannot grant admin authority
- CNX holder roles cannot grant moderator authority
- progression roles cannot bypass backend state
- Discord roles cannot override backend locks
- role sync must be logged
- role changes must be reversible where possible

---

## 8. Bot Permission Model

The Discord bot should operate with the minimum Discord permissions required.

The bot may need:

- slash command handling
- reading interaction context
- sending responses
- managing approved roles if role sync is active
- reading guild/member data required for approved workflows

The bot must not have unnecessary permissions.

Avoid granting broad permissions unless required and approved.

Bot admin commands must verify authorized user IDs or approved permission checks.

Bot permissions should be reviewed before production changes.

---

## 9. Admin Command Permission Model

Admin commands are high risk.

Admin commands must check:

- caller identity
- authorized role or ID
- command scope
- target user
- reason where applicable
- phase status
- audit requirement

Admin commands must not:

- be visible to normal members where avoidable
- execute without permission checks
- mutate economy without audit
- issue prizes without ledger
- reset users casually
- bypass approval gates
- bypass owner authority

Founder-only commands must remain founder-only unless explicitly approved otherwise.

---

## 10. Dashboard Permission Model

The future Command Control Dashboard must start as static or read-only.

Dashboard write controls require:

- authentication
- authorization
- operator identity
- role-based permissions
- reason codes
- confirmation flows
- audit logs
- incident records where applicable
- owner approval for high-risk controls

Dashboard users should be separated by permission tier:

- viewer
- analyst
- moderator reviewer
- admin operator
- owner

Dashboard write permissions must not exist until the backend can enforce them safely.

Frontend-only dashboard permission checks are not enough.

---

## 11. Dashboard Permission Tiers

## 11.1 Viewer

May view approved read-only status.

Cannot write.

Cannot mutate users.

Cannot export sensitive data unless approved.

## 11.2 Analyst

May review read-only reports and prepare summaries.

Cannot mutate production.

Cannot resolve incidents without approval.

## 11.3 Moderator Reviewer

May review abuse flags if approved.

May recommend action.

Cannot change economy state directly.

## 11.4 Admin Operator

May perform approved controlled actions after authentication, authorization, reason code, and audit logging exist.

Cannot use emergency controls unless specifically authorized.

## 11.5 Owner

May approve high-risk actions.

Owner actions still require logs for system-state changes.

---

## 12. AI Agent Permission Model

AI agents are assistants, not authorities.

Current allowed agent scope:

- read docs
- create docs
- audit repo files
- draft plans
- propose code
- write approved files on branches
- run safe checks
- summarize risks
- prepare PR summaries

Current forbidden agent scope:

- merge to main
- deploy production
- mutate live Discord roles
- issue XP
- issue prizes
- change economy constants
- run migrations
- access secrets
- access treasury keys
- execute token transfers
- approve their own actions

Agents must stop when permission boundaries are unclear.

---

## 13. Agent Permission Levels

Level 0:

No repo access. Answers from provided context only.

Level 1:

Read-only repo access. May inspect and report.

Level 2:

Documentation writer. May edit docs on branch.

Level 3:

Branch coding agent. May edit approved code on feature branch and run safe checks.

Level 4:

Read-only operations agent. Future only. May read dashboard/system status.

Level 5:

Controlled operations agent. Future only. Requires auth, authorization, audit logs, confirmation, and owner approval.

No agent level includes treasury/private key access.

---

## 14. Database Permission Model

Database permissions must be minimized.

Production database access should be restricted to approved services and approved operators.

Rules:

- no casual direct production database writes
- no destructive SQL without approval
- no migrations without approval
- no schema edits without approval
- no agent production database write access
- no deletion of audit records
- no deletion of evidence
- no public database credentials

Read-only access should be preferred for audits and dashboards.

Write access requires explicit approval and logging.

---

## 15. CNX and Wallet Permission Model

CNX and wallet systems are high risk.

Allowed future permission pattern:

- read-only wallet verification service
- no private key storage
- no seed phrase handling
- no custody
- no agent signing
- no automated token transfers without explicit approval
- no treasury access for agents

CNX permissions must not grant:

- admin authority
- moderator authority
- guaranteed prizes
- uncapped XP
- rank purchase
- Stage purchase
- gameplay resource purchase

CNX remains optional utility.

---

## 16. Prize and Payout Permission Model

Prize and payout permissions are high risk.

Prize actions require:

- eligibility validation
- abuse review
- ledger/prize record
- approval
- audit record
- reason
- owner or authorized operator approval

No AI agent may issue prizes.

No dashboard may issue prizes until write controls are approved.

No Discord command should auto-award high-value prizes without review.

---

## 17. Production Permission Model

Production access is restricted.

Production changes require approval for:

- deploys
- restarts
- migrations
- environment changes
- server config changes
- role mutation changes
- bot production deployment
- Nginx/PM2/firewall changes
- rollback actions

Production work must include:

- reason
- exact action
- affected systems
- rollback plan
- verification plan
- approval

Production access should be held by the fewest possible people/tools.

---

## 18. Permission Audit Requirements

Permission-sensitive actions should be auditable.

Audit records should capture:

- actor
- target
- action
- permission used
- reason
- timestamp
- before state
- after state
- related incident or approval if applicable

Audit required for:

- admin economy changes
- profile locks/unlocks
- role sync mutations
- prize actions
- dashboard write controls
- production emergency actions
- future CNX tier changes
- future permission changes

---

## 19. Permission Change Approval Gates

Approval required before changing:

- admin permissions
- moderator permissions
- founder-only controls
- bot permissions
- Discord role IDs
- role sync logic
- dashboard permission tiers
- backend admin routes
- auth logic
- database write permissions
- agent permission levels
- production access rules
- CNX holder role effects
- prize approval authority

When uncertain, stop and ask.

---

## 20. Least Privilege Checklist

Before granting access, confirm:

- What task requires this access?
- Is read-only enough?
- Is temporary access enough?
- Can access be scoped?
- Can access be revoked?
- Is the action logged?
- Is owner approval required?
- Does this expose secrets?
- Does this affect production?
- Does this affect economy?
- Does this affect roles?
- Does this affect wallets or treasury?

If the answer is unclear, do not grant access.

---

## 21. Revocation Rules

Access should be removed when:

- the task is complete
- the person/tool no longer needs access
- suspicious behavior occurs
- a secret is exposed
- role responsibility changes
- a system is retired
- owner approval is withdrawn

Revocation should be documented for high-risk access.

---

## 22. Final Permission Directive

Use least privilege.

Separate authority from access.

Keep backend truth protected.

Keep Discord reflective.

Keep frontend non-authoritative.

Keep agents approval-gated.

Keep treasury and secrets isolated.

Keep admin actions auditable.

Do not bypass Anthony Hammon.

