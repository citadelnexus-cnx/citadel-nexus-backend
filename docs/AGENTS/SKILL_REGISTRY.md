# Skill Registry

**Root authority: ../../AGENTS.md**

## Overview

Skills are specialized capabilities activated automatically based on task context. This registry catalogs all skills and maps them to lifecycle phases, Citadel Nexus domain triggers, and approval requirements.

See AGENT_SKILLS_INTEGRATION.md for full lifecycle details and anti-rationalization rules.

## Core Lifecycle Skills

Mandatory for every coding task. No task may skip these.

### DEFINE Phase Skills

| Skill | Trigger | Mandatory For | Output |
|---|---|---|---|
| `idea-refine` | Underspecified requests | Clarifying vague requirements | Refined requirement statement |
| `spec-driven-development` | New feature, economy change, Discord integration | Writing clear specs before implementation | Spec document with acceptance criteria |

### PLAN Phase Skills

| Skill | Trigger | Mandatory For | Output |
|---|---|---|---|
| `planning-and-task-breakdown` | After spec verified complete | Decomposing into atomic tasks | Plan with atomic tasks, dependencies, rollback path |

### BUILD Phase Skills

| Skill | Trigger | Mandatory For | Output |
|---|---|---|---|
| `incremental-implementation` | Any multi-file change | One vertical slice at a time, not big-bang | Atomic commits, each slice complete |
| `source-driven-development` | Hedera, Prisma, Next.js, Discord.js decisions | Before writing code for these tech stacks | Code with citations to official docs |
| `context-engineering` | Session start, task switch, quality drop | Refreshing context between work cycles | Updated mental model, prevent drift |
| `test-driven-development` | All logic, bug fixes, behavior changes | Writing tests before or alongside code | Tests first, then code, all passing |
| `frontend-ui-engineering` | Any frontend/UI change | Component design, accessibility, performance | Usable, accessible, performant UI |
| `api-and-interface-design` | API design, module boundary design | Clear contracts, backward compatibility | Well-documented API, clear boundaries |

### VERIFY Phase Skills

| Skill | Trigger | Mandatory For | Output |
|---|---|---|---|
| `debugging-and-error-recovery` | Build failures, test failures | Root cause analysis and recovery | Exact failure output, fix, prevention |
| `browser-testing-with-devtools` | Frontend runtime issues | Browser-specific behavior verification | Runtime test report, user experience validation |

### REVIEW Phase Skills

| Skill | Trigger | Mandatory For | Output |
|---|---|---|---|
| `code-review-and-quality` | Before any PR — ALWAYS | Five-axis review of all code changes | Review findings labeled by severity |
| `security-and-hardening` | Auth, input, external integrations | OWASP Top 10 audit of security surface | Security audit report, vulnerabilities identified |
| `code-simplification` | Complexity introduced by change | Clarity and maintainability review | Simplification suggestions, alternatives |
| `performance-optimization` | Performance requirements or regression risk | Benchmarking, profiling, optimization | Performance audit, optimization recommendations |

### SHIP Phase Skills

| Skill | Trigger | Mandatory For | Output |
|---|---|---|---|
| `git-workflow-and-versioning` | Every code change — ALWAYS | Atomic commits, branch discipline, versioning | Commit message, branch structure, version bump |
| `documentation-and-adrs` | Architectural decisions, API changes | ADR at decision time, API docs updated | ADR document, inline docs, changelog |
| `ci-cd-and-automation` | Pipeline changes, build automation | CI/CD workflow design and testing | Pipeline definition, automation verification |
| `deprecation-and-migration` | Removing or replacing old systems | Backward-compat, migration path, rollback | Deprecation plan, migration guide, rollback procedure |
| `shipping-and-launch` | Production deployment preparation | Rollout plan, monitoring, rollback | Deployment checklist, rollout sequence, monitoring setup |

---

## Citadel Nexus Domain Skills

Specialized skills for Citadel Nexus-specific work.

| Skill | Domain | Trigger | Mandatory For | Output |
|---|---|---|---|
| `economy-audit` | Economy / Progression | Economy constant changes, XP loops | Anti-pay-to-win audit, before/after comparison | Economy impact report |
| `discord-dry-run` | Discord | Role mutations, bot changes, permissions | Dry-run verification before live change | Discord change simulation report |
| `hedera-safe-mode` | Hedera / Web3 | HCS, HTS, token operations, wallet logic | Testnet-only verification, mainnet lockout | Safe operation verification |
| `security-secrets-audit` | Security | Secrets handling, credential rotation, log safety | Secret exposure check, sanitization review | Secrets audit report |
| `backend-truth-check` | Backend Architecture | Backend changes, service layer, data flow | Source of truth verification, bypass detection | Backend architecture audit |
| `frontend-surface-check` | Frontend Architecture | Frontend changes, hardcoded values, data storage | Frontend truth leakage audit | Surface layer audit |

---

## When Skills Activate Automatically

The Agent should recognize and activate these skills based on task context:

- **Designing an API** → `api-and-interface-design`
- **Building UI** → `frontend-ui-engineering`
- **Any logic change** → `test-driven-development`
- **Any code change with Hedera/Prisma** → `source-driven-development`
- **Any PR** → `code-review-and-quality` (ALWAYS)
- **Any auth/input/external surface** → `security-and-hardening` (ALWAYS)
- **Economy constants** → `economy-audit` + `spec-driven-development`
- **Discord roles** → `discord-dry-run` + `spec-driven-development`
- **Hedera mainnet** → `hedera-safe-mode` + escalate to Anthony (RED gate)
- **Secrets or credentials** → `security-secrets-audit`

---

## Skill Output Format

Each skill produces:

1. **Findings:** Specific observations, issues, or successes
2. **Recommendations:** Actionable next steps or improvements
3. **Severity labels (for review skills):** Nit / Optional / FYI / Must-Fix / Blocker
4. **Evidence:** Exact output, test results, or audit trails (not "seems right")
5. **Escalation flags:** RED-gate triggers or architectural decisions

---

## Skill Composition Rules

1. **Skills are not exclusive**
   → Use multiple skills per task as needed
   → Example: A PR uses code-review-and-quality + security-and-hardening + api-and-interface-design

2. **Skills are sequenced by lifecycle**
   → DEFINE → PLAN → BUILD → VERIFY → REVIEW → SHIP
   → Do not activate BUILD skills before DEFINE is complete

3. **Skills may be nested**
   → Within BUILD phase, multiple BUILD skills may be active simultaneously
   → Example: incremental-implementation + test-driven-development + source-driven-development

4. **Anti-rationalization enforces skill use**
   → Cannot skip `test-driven-development` for "small changes"
   → Cannot skip `security-and-hardening` for "internal endpoints"
   → Cannot skip `code-review-and-quality` for "obvious changes"

---

## Safe Mode (Conservative Skill Activation)

If unsure whether a skill applies, err toward maximum rigor:

- Default to YES on `test-driven-development` → write tests
- Default to YES on `code-review-and-quality` → full five-axis review
- Default to YES on `security-and-hardening` → full OWASP audit
- Default to RED on Hedera mainnet → escalate to Anthony
- Default to RED on economy constants → escalate to Anthony

Conservative activation prevents bugs, security issues, and compliance violations.

---

## Approval Requirements by Skill

| Skill | Approval Gate | Escalation Path |
|---|---|---|
| `idea-refine` | None (clarification only) | N/A |
| `spec-driven-development` | Anthony (if economy/Discord/Hedera) | Anthony reviews spec before implementation |
| `planning-and-task-breakdown` | Anthony (if RED-adjacent tasks) | Anthony reviews plan before BUILD |
| `incremental-implementation` | None (execution of approved plan) | N/A |
| `source-driven-development` | Anthony (if Hedera mainnet) | Official docs cited; Anthony verifies if mainnet |
| `test-driven-development` | None (execution requirement) | Failing tests escalate to Anthony |
| `code-review-and-quality` | None (finding only) | Must-Fix and Blocker findings escalate |
| `security-and-hardening` | Anthony (if RED-gate vulns) | Security vulns escalate to Anthony |
| `economy-audit` | Anthony (always) | Economy findings escalate to Anthony |
| `discord-dry-run` | Anthony (if live mutation) | Live Discord changes escalate to Anthony |
| `hedera-safe-mode` | Anthony (always) | All Hedera operations escalate to Anthony |
| `shipping-and-launch` | Anthony (always) | Deployment approval from Anthony |

---

## Skill Registry Summary

Every skill is:
- **Mandatory for its lifecycle phase** (cannot be skipped)
- **Evidence-driven** (exact output, not guesses)
- **Composable** (multiple skills per task as needed)
- **Escalation-aware** (RED-gate triggers halt and escalate)
- **Anti-rationalization-enforced** (no excuses for skipping)

Use this registry to select the right skills for your task. When in doubt, use more skills, not fewer.
