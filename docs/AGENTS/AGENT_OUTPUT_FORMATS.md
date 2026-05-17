# Agent Output Formats

**Root authority: ../../AGENTS.md**

This document defines standard output formats for agent-generated artifacts across different destinations and contexts. Use the appropriate format for each output channel.

---

## Human Chat (Interactive Conversation)

**Audience:** User in VS Code chat

**Style:**
- Concise: keep to 100 words or less for routine responses
- Actionable: include next steps
- Evidence: provide exact output for verification claims
- Tone: professional, direct, jargon-free

**Template:**
```
[Brief summary of what was done]

[Key findings or results]

Next: [What's the next action?]
```

**Example:**
```
Generated spec for economy rebalance. XP multiplier formulas are defined,
anti-pay-to-win caps verified.

Next: Submit to Anthony for review before BUILD phase begins.
```

---

## AGENTS.md and Doctrine Files

**Audience:** Agents, constitutional authority

**Style:**
- Constitutional: stable, change-controlled
- Precise: exact language, no paraphrasing
- Versioned: include "Last Verified" date
- Comprehensive: link to supporting docs

**Format:**
- Markdown with clear hierarchy (# ## ###)
- Tables for structured data
- Code blocks for commands and examples
- Blockquotes for emphasis

**Example:**
```
## Phase Controls

Agents MUST NOT activate, enable, accelerate, or simulate features beyond
the current approved phase. Phase definitions are owned by Anthony Hammon.

| Phase | Status | Agent Behavior |
|---|---|---|
| Phase 1 — Stabilize | ACTIVE | Agents may assist with Phase 1 work only |
```

---

## Obsidian Notes (Secondary Brain)

**Audience:** Knowledge base, decision archive

**Format:**

```yaml
---
title: [Clear descriptive title]
date: [ISO 8601]
repo: citadelnexus-cnx/citadel-nexus-backend
branch: [Feature branch]
task_id: [Unique ID]
risk_level: [GREEN | YELLOW | RED]
tags:
  - citadel-nexus
  - [domain]
---

# [Title]

## Summary

[2-3 sentence overview]

## Context

[Background and why this matters]

## Decision / Work

[What was done or decided]

## Consequences

[Positive and negative impacts]

## Related

[[Backlink to related notes]]
```

**Forbidden in Obsidian:**
- No secrets, tokens, or .env values
- No private keys or credentials
- No internal production URLs
- No user PII beyond what's necessary

---

## GitHub Issues (Problem Statements)

**Audience:** Issue tracker, team collaboration

**Format:**

```markdown
## Problem

[What is the issue?]

## Evidence

[Exact error output, screenshots, logs (sanitized if necessary)]

## Expected Behavior

[What should happen?]

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Related

[Link to related issues or PRs]
```

**Example:**
```markdown
## Problem

XP multiplier for level 5 exceeds anti-pay-to-win cap by 15%.

## Evidence

```
Level 5 multiplier: 1.15
Anti-pay-to-win cap: 1.0
Violation: 15% over cap
```

## Acceptance Criteria

- [ ] Multiplier reduced to <= 1.0
- [ ] Economy audit passes
- [ ] All tests pass
```

---

## GitHub Pull Requests (Change Proposals)

**Audience:** Code reviewers, stakeholders

**Format:**

```markdown
## Summary

[What does this PR do? Why?]

## Files Changed

[List of modified files and what changed in each]

## Tests

[What tests were added/modified? Show output.]

```
npm run test
PASS  src/tests/xpCalculator.test.ts
  35 tests, 35 passing
```

## Risks

[Known risks or side effects?]

## Follow-Ups

[Any follow-up work needed?]

## Checklist

- [ ] Code builds (`npm run build` passes)
- [ ] Tests pass (`npm run test` passes)
- [ ] No linting errors (`npm run lint` passes)
- [ ] Five-axis review complete
- [ ] Security review complete (if applicable)
- [ ] ADR written (if architectural decision)
```

**Never in PR:**
- No secrets, tokens, or credentials
- No private URLs
- No fabricated test output
- No hidden failures

---

## Terminal Output (Command Results)

**Audience:** Log archives, verification records

**Format:**

```
Command: npm run test
Exit code: 0

Output:
[Exact unmodified output from command]

Status: PASS
```

**Rules:**
- Show exact output, no paraphrasing
- Include exit code
- Clearly label as PASS or FAIL
- Never fabricate output
- Report if command does not exist

**Example:**
```
Command: npm run build
Exit code: 0

Output:
$ npm run build
> citadel-nexus-backend@1.0.0 build
> tsc && node dist/index.js
[Output lines...]
Build succeeded.

Status: PASS
```

---

## JSON/API Responses

**Audience:** Structured data consumers

**Format:**

```json
{
  "task_id": "task-id",
  "status": "complete",
  "risk_level": "YELLOW",
  "checks": {
    "build": "PASS",
    "test": "PASS",
    "lint": "PASS"
  },
  "files_changed": ["src/file.ts"],
  "output": "...",
  "approval_required": false
}
```

**Rules:**
- Strict schema compliance
- No unstructured prose
- All values must be verifiable
- Never include secrets

---

## Discord Updates (Status Communication)

**Audience:** Community, team status channel

**Format:**

```
✅ [Brief status update]

[Key information (2-3 lines max)]

Next: [What's coming]
```

**Rules:**
- No private implementation details
- No internal URLs or credentials
- Genericized for public audience
- Keep to 3-4 lines

**Example:**
```
✅ Economy rebalancing review complete

XP formulas updated for levels 1-10. Anti-pay-to-win audit passed.

Next: Awaiting deployment approval.
```

---

## Security Reports (Vulnerability Findings)

**Audience:** Security reviewers, Anthony

**Format:**

```markdown
## Severity

[CRITICAL | HIGH | MEDIUM | LOW | INFORMATIONAL]

## Vulnerability

[What is the security issue?]

## Evidence

[Exact code snippet or reproduction steps]

## Impact

[Who is affected? What is the risk?]

## Remediation

[How to fix it]

## Approval Required

[Yes | No] → Anthony approval for CRITICAL/HIGH

## Related

[Link to OWASP rule or security doc]
```

**Rules:**
- Be specific about the vulnerability
- Include exact code
- Never expose secrets (use [REDACTED])
- Provide clear remediation steps

---

## Architecture Decision Records (ADRs)

**Audience:** Architecture team, knowledge base

**Format:**

```markdown
# ADR-[NUMBER]: [Decision Title]

## Status

[Proposed | Accepted | Deprecated | Superseded By ADR-X]

## Context

[What is the issue we're facing?]

## Decision

[What is the decision we're making?]

## Rationale

[Why this over alternatives?]

## Consequences

### Positive
- [Benefit 1]
- [Benefit 2]

### Negative
- [Drawback 1]
- [Drawback 2]

## Alternatives Considered

1. [Alternative A and why rejected]
2. [Alternative B and why rejected]

## Related Decisions

[[ADR-XXXX]] [relationship]
```

**Rules:**
- Write at decision time, not after
- Include all alternatives considered
- Be honest about trade-offs
- Link to related ADRs

---

## Release Checklists (Deployment Readiness)

**Audience:** DevOps, deployment team, Anthony

**Format:**

```markdown
## Release [VERSION]

### Pre-Deployment

- [ ] Code merged to main
- [ ] All tests passing (`npm run test` output: [link])
- [ ] No linting errors (`npm run lint` output: [link])
- [ ] Migrations tested locally
- [ ] Rollback procedure documented and tested
- [ ] Monitoring configured
- [ ] Stakeholders notified

### Deployment Steps

1. [Step 1]
2. [Step 2]
3. [Verification step]

### Rollback Procedure

1. [Rollback step 1]
2. [Rollback step 2]

### Risks

- [Risk 1 and mitigation]
- [Risk 2 and mitigation]

### Approval

- [ ] Anthony approved
- Approved on: [DATE]
```

**Rules:**
- Exact, tested procedures
- Step-by-step clarity
- Rollback fully documented
- Risks identified

---

## OPEN_DECISION Reports (Conflict Escalation)

**Audience:** Anthony, decision makers

**Format:**

```markdown
## OPEN_DECISION: [Decision Title]

### Conflict Identified

[What decision needs to be made?]

### Evidence

[Conflicting information]

**Option A:** [Description] → [Consequences]
**Option B:** [Description] → [Consequences]
**Option C:** [Description] → [Consequences]

### Recommendation

[Agent's recommendation if applicable]

### Escalation

Escalated to: Anthony Hammon
Reason: [Why this requires human decision]

### Related

[[AGENTS.md section]] [How doctrine applies]
```

**Rules:**
- Present options neutrally
- Provide consequences for each
- Escalate to Anthony always
- Link to doctrine/precedent

---

## Completion Reports (Task Closure)

**Audience:** Task archive, accountability

**Format:**

```markdown
## Task Completion Report

### Task
[Task ID and title]

### Branch
[Feature branch used]

### Files Changed
- [File 1]: [What changed]
- [File 2]: [What changed]

### Checks Passed
- npm run build: PASS
- npm run lint: PASS
- npm run test: PASS (35/35 passing)
- git diff: [stat output]

### Approval Status
[Approved by Anthony on DATE | Pending Review | Escalated]

### Follow-Ups
- [Follow-up 1]
- [Follow-up 2]

### Obsidian Note
[Link to exported note or docs/OBSIDIAN_EXPORT_QUEUE/ file]
```

**Rules:**
- Exact evidence required
- All checks must pass
- Approval status documented
- Obsidian logged if YELLOW/RED

---

## Format Selection Matrix

| Destination | Format | Audience | Tone | Length |
|---|---|---|---|---|
| Chat | Summary + next action | User | Casual, direct | < 100 words |
| AGENTS.md | Constitutional | Agents, doctrine | Formal, precise | Complete |
| Obsidian | Markdown with YAML | Knowledge base | Informational | As needed |
| GitHub issue | Structured problem | Team | Professional | Concise |
| GitHub PR | Change + tests + risks | Reviewers | Professional | 1-2 screens |
| Terminal | Exact command output | Log archive | Raw | Unmodified |
| JSON | Structured data | APIs | Programmatic | Schema-compliant |
| Discord | Brief status | Community | Public-safe | 3-4 lines |
| Security report | Vulnerability details | Security team | Technical | Specific |
| ADR | Decision rationale | Architecture | Formal | Complete |
| Release checklist | Step-by-step | DevOps | Exact | Comprehensive |
| OPEN_DECISION | Options + recommendation | Anthony | Formal | Clear |
| Completion report | Evidence + closure | Archive | Factual | Complete |

---

## Golden Rules for All Outputs

1. **Never fabricate:** Show real evidence, not "probably works"
2. **Never hide:** If something failed, report it exactly
3. **Never expose:** No secrets, tokens, .env values, or private URLs
4. **Never summarize:** Give exact output; let humans summarize if needed
5. **Never assume:** State all assumptions and unknowns explicitly
6. **Always cite:** Include sources and links when relevant
7. **Always verify:** Exact evidence before claiming any statement
8. **Always escalate:** RED gates go to Anthony; never assume
