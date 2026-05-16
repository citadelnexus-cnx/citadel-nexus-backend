# Agent Task Template

**Root authority: ../../AGENTS.md**

Use this template for planning and executing agent tasks. It ensures all CNMA-v4.1 requirements are checked before work begins.

---

## TASK DEFINITION

```
TASK:
[Descriptive task name and summary]

MODE:
[Choose one: AUDIT ONLY | PLAN ONLY | DOCS ONLY | SPEC MODE |
 IMPLEMENT APPROVED CHANGE | TEST ONLY | REVIEW ONLY | COMMIT PREP ONLY |
 PR PREP ONLY | RELEASE CHECKLIST ONLY | RALPH LOOP | SECURITY AUDIT |
 ECONOMY AUDIT | TOOLSMITH REVIEW | OBSIDIAN EXPORT]

SCOPE:
[What is in scope? What is explicitly OUT of scope?]

RISK LEVEL:
[GREEN | YELLOW | RED]
[Explain why this risk level]

LIFECYCLE PHASE:
[DEFINE | PLAN | BUILD | VERIFY | REVIEW | SHIP]

SKILL ACTIVATED:
[Comma-separated list of skills, e.g., spec-driven-development, test-driven-development]

REQUESTED BY:
[User name or task reference]

APPROVAL REQUIRED FOR:
[List any RED-gate actions or approvals needed before proceeding]
```

---

## PRE-EXECUTION CHECKLIST

Before starting ANY work:

- [ ] Read AGENTS.md (constitutional law)
- [ ] Read relevant instruction files (.github/instructions/*.md)
- [ ] Run `git status` to understand branch state
- [ ] Identify and document all RED-gate triggers
- [ ] If RED gate found: escalate to Anthony BEFORE any work begins
- [ ] Confirm scope with user (ask clarifying questions if underspecified)
- [ ] Document assumptions and unknowns
- [ ] State a plan before editing any files

---

## SCOPE AND CONSTRAINTS

```
ALLOWED FILES:
[Explicitly list files that may be modified]

FORBIDDEN FILES:
[.env | package.json | prisma/schema.prisma | AGENTS.md | main branch]
[List any other off-limits files]

CONTEXT SOURCES:
[What files/docs must be read before acting?]
- AGENTS.md (always)
- Related instruction files
- Prior ADRs and decisions
- Source code files
- Deployment docs
- [Others as needed]

TOOLS ALLOWED:
[List allowed tools: view, edit, create, grep, glob, powershell, github-*, etc.]

TOOLS FORBIDDEN:
[Explicitly list forbidden tools: github-merge_pull_request, etc.]
[By default: anything affecting .env, secrets, production, deployments]
```

---

## REQUIRED CHECKS

Task execution MUST include these checks:

```
CHECKS TO RUN:
  - npm run build                    (all code changes)
  - npm run lint                     (all code changes)
  - npm run test                     (all logic changes)
  - npx prisma validate              (if schema touched)
  - npx prisma format                (only if schema-formatting in approved scope)
  - git diff --stat                  (all file changes)
  - five-axis review                 (if PR: correctness, clarity, security, performance, maintainability)
  - OWASP checklist                  (if security surface: auth, input, external)
  - economy audit                    (if economy constants touched)
  - Discord dry-run                  (if role/bot changes planned)
  - security-secrets audit           (if secrets or credentials involved)

EXACT OUTPUT REQUIRED:
  ✓ Do NOT fabricate results
  ✓ Do NOT summarize: show exact output
  ✓ Do NOT claim command passed if it does not exist
  ✓ Report absence explicitly if command missing
```

---

## STOP CONDITIONS

Task MUST STOP immediately if:

```
STOP CONDITIONS:
  - RED gate triggered → escalate to Anthony, do not proceed
  - Failing check (build, test, lint) → report exact failure, do not proceed
  - Failing check requires architectural decision → escalate to Anthony
  - Missing required context → request context before proceeding
  - Scope has expanded without approval → escalate to Anthony
  - Secrets or credentials exposed → stop and report immediately
  - Tests fail and cannot be fixed → escalate to Anthony
  - Doctrine conflict detected → produce OPEN_DECISION report, escalate

ANTI-RATIONALIZATION:
  Do NOT claim "probably works" or "seems right"
  Do NOT hide, summarize, or fabricate test/build failures
  Do NOT skip lifecycle stages
  Do NOT skip security review
  Do NOT claim tasks complete without verified evidence
```

---

## OUTPUT REQUIREMENTS

```
OUTPUT FORMAT:
[Specify output format for this task]

DOCUMENTATION REQUIRED:
  - ADR? [YES | NO]  (if architectural decision made)
  - Obsidian note? [YES | NO]  (if YELLOW/RED task)
  - PR? [YES | NO]  (if code changes)
  - Commit message? [YES | NO]  (if code changes)

OBSIDIAN LOG REQUIRED:
  YES — for YELLOW/RED/implementation/architecture/public-product tasks
  NO  — for GREEN micro-tasks (log in completion report only unless requested)

SEVERITY LABELING (if review):
  [Nit | Optional | FYI | Must-Fix | Blocker]
  [Assign severity to all findings]

ADR REQUIRED:
  [YES | NO]
  [If YES, include decision context, consequences, alternatives considered]

APPROVAL REQUIRED FOR:
  [List who must approve before next step: Anthony | user | stakeholder]
  [RED-gate tasks ALWAYS require Anthony approval]
```

---

## COMPLETION CRITERIA

Task is COMPLETE only when ALL of these are true:

- [ ] Spec was written or verified to exist before implementation began
- [ ] Plan was decomposed into atomic tasks (if applicable)
- [ ] Code was implemented in vertical slices with rollback path defined (if applicable)
- [ ] Tests were written alongside or before code (if applicable)
- [ ] `npm run build` passed — exact output shown, or absence documented
- [ ] `npm run lint` passed — exact output shown, or absence documented
- [ ] `npm run test` passed — exact output shown, or absence documented
- [ ] `npx prisma validate` passed (if schema touched)
- [ ] `npx prisma format` only run if schema-formatting was in approved scope
- [ ] Five-axis review complete (if PR: correctness, clarity, security, performance, maintainability)
- [ ] Security checklist applied (if auth/input/external surface)
- [ ] OWASP checklist applied (if security surface)
- [ ] Economy audit applied (if economy changes)
- [ ] Discord dry-run completed (if role/bot changes)
- [ ] ADR written (if architectural decision made)
- [ ] Obsidian note exported (if YELLOW/RED/implementation/architecture/public-product task)
- [ ] PR prepared — not merged (if code changes)
- [ ] All RED gates respected and escalated to Anthony
- [ ] No secrets or credential-bearing URLs logged or exposed
- [ ] No lifecycle stage skipped without documented escalation
- [ ] No verified Citadel Nexus facts downgraded to UNKNOWN without cause
```

---

## ANTI-RATIONALIZATION CHECK

Before marking task complete, answer:

```
ANTI-RATIONALIZATION CHECKLIST:
  - Was any lifecycle stage skipped? [YES | NO]
    If YES: document the reason and escalate before proceeding

  - Are there any failing tests? [YES | NO]
    If YES: report exact failure; do not hide or summarize

  - Was a spec written before code? [YES | NO] (if applicable)
    If NO: stop and write spec

  - Were tests written before or alongside code? [YES | NO] (if applicable)
    If NO: stop and write tests

  - Was security review performed? [YES | NO] (if auth/input/external)
    If NO: perform security review before marking complete

  - Were all checks run and do they pass? [YES | NO]
    If NO: report exact failures; do not fabricate

  - Is exact evidence provided (not "probably works")? [YES | NO]
    If NO: provide exact output
```

---

## FINAL CHECKLIST

Before handing off to human review:

- [ ] All checks passed (exact output shown)
- [ ] Approval gates identified and escalated (if RED)
- [ ] Documentation complete (ADR, Obsidian, PR summary)
- [ ] No secrets or credentials exposed
- [ ] No lifecycle stages skipped
- [ ] Evidence verified (not assumed)
- [ ] Ready for human review and approval
- [ ] Task closure report prepared

---

## SAMPLE FILLED TEMPLATE

```
TASK:
Update economy XP formula for level scaling

MODE:
IMPLEMENT APPROVED CHANGE

SCOPE:
Update XP multiplier constants for levels 1-10. SCOPE OUT: levels 11+, prestige system.

RISK LEVEL:
RED (economy constant change)

LIFECYCLE PHASE:
BUILD (plan already approved by Anthony)

SKILL ACTIVATED:
incremental-implementation, test-driven-development, economy-audit

APPROVAL REQUIRED FOR:
Anthony already approved plan. No additional approval needed for this BUILD phase.

ALLOWED FILES:
src/economy/xpCalculator.ts, src/tests/xpCalculator.test.ts

FORBIDDEN FILES:
.env, prisma/schema.prisma, src/config/discordRoleRegistry.ts

CHECKS TO RUN:
  - npm run build
  - npm run lint
  - npm run test
  - git diff --stat
  - economy audit (verify multipliers don't create pay-to-win)

STOP CONDITIONS:
  - Any test fails: stop and report exact failure
  - XP formula creates uncapped loop: stop and escalate to Anthony
  - Multipliers exceed anti-pay-to-win caps: stop and escalate

OUTPUT FORMAT:
Code changes + passing tests + economy audit report

ADR REQUIRED:
NO (decision already in ADR-0040)

OBSIDIAN LOG REQUIRED:
YES (RED-gate task)

COMPLETION CRITERIA:
✓ Tests written before code
✓ npm run build passes
✓ npm run test passes (all passing)
✓ Economy audit confirms no pay-to-win mechanics
✓ git diff shows only xpCalculator.ts and test changes
✓ PR ready for Anthony review
```

---

## Usage Instructions

1. **Copy this template** to a new task
2. **Fill out TASK DEFINITION section** (what are we doing?)
3. **Complete PRE-EXECUTION CHECKLIST** (before starting work)
4. **Set SCOPE AND CONSTRAINTS** (what's in/out of bounds?)
5. **Identify REQUIRED CHECKS** (what must pass?)
6. **Understand STOP CONDITIONS** (when to stop and escalate)
7. **Know COMPLETION CRITERIA** (when are we done?)
8. **Execute task, running checks at appropriate times**
9. **Answer ANTI-RATIONALIZATION CHECK** before marking complete
10. **Hand off to human review** with exact evidence
