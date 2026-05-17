# RALPH Loop (Retrieve, Analyze, Link, Produce, Harden)

**Root authority: ../../AGENTS.md**

## Overview

The RALPH loop defines a structured, evidence-driven workflow for multi-step, high-assurance agent tasks in Citadel Nexus. Use it for complex tasks, YELLOW/RED risk tasks, and situations where verification and documentation are critical.

## The Five Steps

### R — Retrieve

**Purpose:** Gather all relevant context before acting.

**Actions:**
- Read AGENTS.md (constitutional law)
- Read related instruction files (backend.instructions.md, security.instructions.md, etc.)
- Read repo files and docs directly (never rely on memory)
- Retrieve sanitized logs if available (request redacted/sanitized excerpts if raw logs may contain secrets — NEVER read raw logs with secrets)
- Review prior decisions and architectural choices
- Reference approved sources:
  - `.env.example` for variable structure (NOT `.env` values)
  - `src/config/discordRoleRegistry.ts` for Discord roles
  - `prisma/schema.prisma` for schema structure
  - Deployment docs for environment info
  - Prior ADRs and decision logs

**Stop condition:** If required context is secret-bearing, inaccessible, or missing, ask for sanitized excerpt or explicit approval before proceeding.

**Output:** Complete context document including facts, unknowns, and source verification.

### A — Analyze

**Purpose:** Identify current state, gaps, risks, and conflicts.

**Actions:**
- Map current implementation state (what exists vs. what is needed)
- Identify missing pieces (specs, tests, docs, migrations)
- Flag doctrine conflicts (does this align with AGENTS.md?)
- Assess risk level: GREEN / YELLOW / RED
- Identify RED-gate triggers that require Anthony approval
- Document assumptions and unknowns
- List verification blockers

**Citadel Nexus Analysis:**
- Is backend source of truth being respected?
- Are economy constants being changed? (RED gate)
- Are Discord roles being mutated? (RED gate)
- Are secrets involved? (RED gate)
- Is Hedera mainnet involved? (RED gate)
- Is schema migration needed? (RED gate)
- Is main branch being merged to? (RED gate)

**Output:** Risk assessment and conflict report. If RED gate found, escalate to Anthony immediately. Do not proceed.

### L — Link

**Purpose:** Cross-reference files, decisions, dependencies, and tooling.

**Actions:**
- Map dependencies between work items
- Identify files that must change together
- Reference prior decisions (ADRs, AGENTS.md sections)
- Document tool/skill requirements
- Flag backwards-compatibility concerns
- Identify potential side effects
- Link to Obsidian notes if available
- Map rollback dependencies

**Citadel Nexus Linking:**
- Does this change affect economy progression? (link to Economy Guardian)
- Does this change affect Discord roles? (link to Discord Sentinel)
- Does this change affect auth? (link to Security Warden)
- Does this change affect public products? (link to Product/IP Shield)

**Output:** Dependency map and cross-reference table. If circular dependencies or conflicts found, escalate to Anthony.

### P — Produce

**Purpose:** Create the smallest safe output that advances the task.

**Actions:**
- Create ONE vertical slice of the work (not the entire implementation)
- Output could be:
  - A plan (decomposed into atomic tasks)
  - A spec (requirement definition)
  - A code change (one feature slice)
  - A test (proof of behavior)
  - An ADR (architectural decision)
  - A doc update (clarification or guidance)
  - A PR draft (code + tests + review)
- Include acceptance criteria and verification steps
- Do NOT combine multiple slices (no big-bang changes)
- Do NOT skip required workflow stages

**Citadel Nexus Production:**
- Is spec written before code? (DEFINE stage)
- Is plan decomposed into atomic tasks? (PLAN stage)
- Are tests written before or alongside code? (BUILD stage)
- Are feature flags in place for economy/Discord/Hedera changes?
- Is rollback path documented?

**Output:** Single, complete, verifiable work product. Do NOT produce multiple items in one iteration — complete one, then loop again if needed.

### H — Harden

**Purpose:** Run all required checks and verify outputs against acceptance criteria.

**Actions:**
- Run all verification commands (exact output required):
  - `npm run build`
  - `npm run lint`
  - `npm run test`
  - `npx prisma validate` (if schema touched)
  - `git diff --stat` (if code changed)
- Verify output against acceptance criteria
- Document any failures (exact output, not summary)
- Apply five-axis review if code changed
- Apply security review if auth/input/external surface
- Apply economy audit if economy-touching
- Document risks and follow-ups
- Prepare handoff for human review

**Citadel Nexus Hardening:**
- Does the change respect backend source of truth?
- Are all tests passing?
- Are there any economy, Discord, or Hedera changes? (escalate if RED gate)
- Are secrets exposed anywhere? (stop immediately if yes)
- Is the code ready for review?

**Output:** Hardened deliverable with exact evidence. If any check fails, STOP and report failure (do not hide, summarize, or fabricate).

## Loop Stop Conditions

The RALPH loop MUST stop (do not continue iterating) when:

1. **Acceptance criteria pass AND evidence is verified**
   → Task complete, hand off for human review

2. **RED gate triggered**
   → Stop immediately, escalate to Anthony with context
   → Do NOT proceed without explicit approval

3. **Required context is missing**
   → Request context before continuing
   → Do NOT guess or assume

4. **Tests fail and require human decision**
   → Report exact failure, do NOT hide or fabricate
   → Escalate architectural decisions to Anthony

5. **Two full review cycles produce no meaningful improvement**
   → Document impasse, escalate to Anthony
   → Do NOT loop indefinitely

6. **Task is complete, logged, and handed off**
   → Export Obsidian note (if YELLOW/RED)
   → Prepare PR for human review
   → Stop

Agents MUST NOT loop indefinitely. Every iteration must produce documented progress or trigger a stop condition.

## Iteration Rules

**Between iterations:**
- Review the output from the previous iteration
- Update context based on findings
- Re-assess risk level
- Check for new RED-gate triggers
- Produce the next deliverable

**Evidence requirement:**
- Each iteration must produce exact output (not "probably works")
- Each iteration must show progress (not repeated attempts)
- Each iteration must document blockers (not hide failures)

**Loop budget:**
- Estimate two to five iterations for typical tasks
- If more than five iterations without closure, escalate to Anthony
- If same failure repeats, stop and request guidance

## When to Use RALPH Loop

**Use RALPH for:**
- Tasks touching economy, Discord, Hedera, or auth
- Multi-file or multi-day implementations
- Tasks requiring multiple reviews or approvals
- Tasks with significant risk or complexity
- Architectural decisions
- Doctrine changes
- Public product work

**Don't use RALPH for:**
- Simple read-only analysis (just explore)
- Single-file typo fixes (just edit)
- Straightforward docs updates (just write)
- Quick command verification (just run)

## Example RALPH Loop (Complex Task)

```
R — Retrieve: Read AGENTS.md, spec, prior ADRs, security rules → Context doc
A — Analyze: Identify economy constant change, map risks, flag RED gate → Risk report
L — Link: Map dependencies to Economy Guardian and Security Warden → Dependency map
P — Produce: Create spec for economy change with before/after comparison → Spec draft
H — Harden: Review spec against anti-pay-to-win rules, verify math → Hardened spec

[RED gate triggered: "economy change requires spec review by Anthony"]

ESCALATE: Send spec to Anthony with context.

[After Anthony approval:]

P — Produce: Create plan for implementation (atomic tasks, rollback path) → Plan draft
H — Harden: Verify plan decomposition and rollback feasibility → Hardened plan

[Anthony approves plan]

P — Produce: Implement first slice (feature flag + test) → Code + test
H — Harden: Run npm run build, test, lint; report exact output → Verified code

[Repeat P/H for next slice]

[After all slices complete:]

P — Produce: Write ADR documenting the economy change → ADR
H — Harden: Review ADR against AGENTS.md, verify reasoning → Hardened ADR

P — Produce: Create PR with all slices, tests, and risks → PR draft
H — Harden: Apply five-axis review, verify all checks pass → Hardened PR

HAND OFF: Export Obsidian note to docs/OBSIDIAN_EXPORT_QUEUE/, send PR to Anthony
```

## Output Format for Each Step

**R output:** Context document with verified facts and sources
**A output:** Risk assessment, conflict report, RED-gate list
**L output:** Dependency map, cross-reference table
**P output:** Single deliverable (spec, code, test, doc, ADR, PR draft)
**H output:** Verified output with exact evidence; OR failure report with exact details

## Integration with Lifecycle (DEFINE/PLAN/BUILD/VERIFY/REVIEW/SHIP)

RALPH loop and the six-stage lifecycle work together:
- RALPH is the PROCESS (how to work)
- Lifecycle is the GATES (when to move forward)

Use RALPH within each lifecycle stage to ensure quality at that stage. Exit each stage only when RALPH H-step confirms readiness.

Example:
- DEFINE stage: Use RALPH to research and produce spec
- PLAN stage: Use RALPH to produce plan
- BUILD stage: Use RALPH to produce code and tests
- VERIFY stage: Use RALPH to harden outputs
- REVIEW stage: Use RALPH to apply five-axis review
- SHIP stage: Use RALPH to prepare PR and ADR

## Verification Evidence Checklist (RALPH H-Step)

Before marking any RALPH output complete:

- [ ] Spec: Requirements are clear, acceptance criteria are defined, risks are documented
- [ ] Code: Builds without errors (`npm run build` shows success)
- [ ] Tests: All tests pass (`npm run test` shows passing)
- [ ] Linting: No lint errors (`npm run lint` shows clean)
- [ ] Schema: Valid if touched (`npx prisma validate` shows success)
- [ ] Diff: Changes are documented (`git diff --stat` shows what changed)
- [ ] Review: Five-axis review complete (correctness, clarity, security, performance, maintainability)
- [ ] Security: OWASP checklist applied (if auth/input/external)
- [ ] Economy: Audit completed (if economy-touching)
- [ ] Documentation: ADR written (if decision made), Obsidian queued (if YELLOW/RED)
- [ ] Rollback: Path documented and verified

Do NOT mark complete without evidence.
