# Agent Skills Integration (CNMA-v5.0)

**Root authority: ../../AGENTS.md**

## Overview

The addyosmani/agent-skills lifecycle is a first-class component of CNMA-v5.0. Every Citadel Nexus coding task MUST follow its six-stage workflow. No stage may be skipped. No rationalization is accepted. The lifecycle now includes token-efficiency pre-prompt checks and an embedded 12-gate self-verification step during VERIFY/HARDEN checkpoints.

**Source:** https://github.com/addyosmani/agent-skills (MIT License)
**License:** MIT
**Framework Author:** Addy Osmani

This document maps the lifecycle to Citadel Nexus workflows and details when anti-rationalization rules apply.

## The Six-Stage Lifecycle

```
DEFINE → PLAN → BUILD → VERIFY → REVIEW → SHIP
  /spec    /plan  /build  /test   /review  /ship
```

Each stage has entry conditions, mandatory checks, and exit criteria. A task cannot proceed to the next stage until the current stage is complete.

### Stage 1: DEFINE

**Entry:** New feature, economy change, Discord integration, or underspecified request.

**Mandatory Actions:**
- [ ] Read AGENTS.md and relevant instruction files
- [ ] Read related source files (do not act from memory)
- [ ] Run `git status` to understand branch state
- [ ] Identify task scope and risk level (GREEN / YELLOW / RED)
- [ ] If RED: stop and escalate to Anthony before any work begins
- [ ] If request is underspecified: activate `idea-refine` skill
- [ ] Write or verify spec exists before proceeding to PLAN

**Citadel Nexus Rules:**
- Economy changes REQUIRE spec review by Anthony before implementation
- Discord integrations REQUIRE spec review by Anthony before implementation
- Hedera changes REQUIRE spec review by Anthony before implementation
- No feature may begin implementation without a completed spec

**Exit Criteria:**
- Spec is written and approved (or requested approval if RED-gate)
- Requirements are clear and unambiguous
- Acceptance criteria are defined
- Risk level is documented

**Anti-Rationalization:** Do NOT skip spec writing. Do NOT proceed to PLAN without spec.

### Stage 2: PLAN

**Entry:** Completed spec from DEFINE stage.

**Mandatory Actions:**
- [ ] Activate `planning-and-task-breakdown` skill
- [ ] Decompose into atomic tasks with acceptance criteria
- [ ] Identify dependencies and sequencing
- [ ] Map required tests before implementation
- [ ] Document rollback path for any change that can cause regression
- [ ] If touching economy/Discord/Hedera: create plan and request Anthony review before proceeding

**Citadel Nexus Rules:**
- Tasks touching economy constants, Discord roles, or Hedera logic REQUIRE plan review by Anthony
- Each task must have clear acceptance criteria
- Dependencies must be explicit
- Rollback paths must be defined before BUILD begins

**Exit Criteria:**
- Plan is decomposed into atomic slices
- Each slice has acceptance criteria
- Dependencies are clear
- Rollback path is documented
- If RED-gate-adjacent: Anthony has reviewed plan

**Anti-Rationalization:** Do NOT proceed to BUILD without a complete plan. Do NOT skip rollback path definition.

### Stage 3: BUILD

**Entry:** Completed PLAN, approved by Anthony if YELLOW/RED adjacent.

**Mandatory Actions:**
- [ ] Activate `incremental-implementation` skill (one vertical slice at a time)
- [ ] Activate `source-driven-development` skill (cite official docs before writing)
- [ ] Activate `test-driven-development` skill (write tests before or alongside code)
- [ ] Write tests BEFORE or ALONGSIDE code, not after
- [ ] Use feature flags for all economy, Discord, or Hedera behavior changes
- [ ] Commit each atomic slice before moving to next
- [ ] Do NOT combine multiple slices into one big commit

**Citadel Nexus Rules:**
- Incremental implementation is MANDATORY (no big-bang PRs)
- Feature flags REQUIRED for economy/Discord/Hedera behavior changes
- Source-driven development REQUIRED for Hedera/HCS/HTS/Prisma work
- Test Pyramid: 80% unit / 15% integration / 5% E2E
- DAMP over DRY for test code (clarity > duplication)
- Beyonce Rule: if you liked it, you should have put a test on it (all changes tested)

**Exit Criteria:**
- Code is written
- Tests are written (not stubbed)
- Feature flags are in place (if applicable)
- Each slice is committed atomically

**Anti-Rationalization:** Do NOT skip tests. Do NOT claim "this change is too small to test" — Beyonce Rule applies to ALL changes. Do NOT defer tests to "later." Do NOT combine slices into big commits.

### Stage 4: VERIFY

**Entry:** Completed BUILD code + tests.

**Mandatory Actions:**
- [ ] Run `npm run build` — report EXACT output (or report absence if command does not exist)
- [ ] Run `npm run lint` — report EXACT output (or report absence if command does not exist)
- [ ] Run `npm run test` — report EXACT output (or report absence if command does not exist)
- [ ] Run `npx prisma validate` if schema was touched
- [ ] Run `git diff --stat` — report EXACT output
- [ ] If ANY check fails: STOP immediately. Report exact failure. Do NOT proceed.
- [ ] If a command does not exist in this repo: document absence clearly. Do NOT claim it passed.

**Citadel Nexus Rules:**
- Every code change must produce passing test evidence. Show the output.
- Build failures are STOP-THE-LINE events (do not proceed past failing build)
- "Seems right" is NOT evidence. Evidence is EXACT OUTPUT.
- Do NOT fabricate or summarize command output

**Exit Criteria:**
- `npm run build` passes (exact output shown)
- `npm run lint` passes (exact output shown)
- `npm run test` passes (exact output shown)
- `npx prisma validate` passes (if applicable)
- `git diff --stat` shows files changed

**Anti-Rationalization:** Do NOT skip verification commands. Do NOT claim a command passed without showing output. Do NOT hide failing tests. Do NOT fabricate results.

### Stage 5: REVIEW

**Entry:** Verified (VERIFY stage completed), tests passing.

**Mandatory Actions:**
- [ ] Activate `code-review-and-quality` skill (ALWAYS, before any PR)
- [ ] Apply five-axis review: correctness, clarity, security, performance, maintainability
- [ ] If auth/input/external surface: activate `security-and-hardening` skill
- [ ] If security surface: apply OWASP Top 10 checklist
- [ ] If complexity introduced: activate `code-simplification` skill
- [ ] Produce severity-labeled findings: Nit / Optional / FYI / Must-Fix / Blocker

**Citadel Nexus Rules:**
- Five-axis review REQUIRED before any PR
- Change sizing target: ~100 lines. Flag anything over 200 for splitting.
- Chesterton's Fence: Do not remove economy constants, role logic, or Hedera integrations without understanding them
- OWASP Top 10 review REQUIRED for any endpoint touching auth, payments, or user data

**Exit Criteria:**
- Five-axis review complete
- Security review complete (if applicable)
- Findings are labeled by severity
- Complexity is justified or simplified

**Anti-Rationalization:** Do NOT skip code review. Do NOT skip security review for auth/input/external changes. Do NOT merge without review. Do NOT defer review to "later."

### Stage 6: SHIP (Preparation Only — Anthony Deploys)

**Entry:** Reviewed, approved for shipping.

**Mandatory Actions:**
- [ ] Activate `git-workflow-and-versioning` skill (ALL code changes, always)
- [ ] If architectural decision made: write ADR
- [ ] If YELLOW/RED task: export Obsidian note to docs/OBSIDIAN_EXPORT_QUEUE/
- [ ] Write PR summary: files changed, tests run, risks, follow-ups
- [ ] Activate `shipping-and-launch` checklist
- [ ] Hand off PR to Anthony for merge and deployment approval
- [ ] Do NOT merge to main (Anthony merges only)

**Citadel Nexus Rules:**
- No code ships to production without Anthony approval. Period.
- Trunk-based development: feature branches off main, PR back to main, Anthony merges
- Every architectural decision produces an ADR before deployment
- Staged rollouts required for changes touching more than 100 users
- Rollback procedures documented before deployment begins

**Exit Criteria:**
- PR is prepared (not merged)
- ADR is written (if applicable)
- Obsidian note is queued (if YELLOW/RED)
- Anthony has PR for review
- Rollback plan is documented

**Anti-Rationalization:** Do NOT merge to main. Do NOT force push. Do NOT skip ADR if decision was made. Do NOT ship without Anthony approval.

## Slash Commands (Tool-Specific)

| Command | Phase | Principle |
|---|---|---|
| `/spec` | DEFINE | Write spec before code |
| `/plan` | PLAN | Decompose into atomic tasks |
| `/build` | BUILD | Vertical slices, tests alongside code |
| `/test` | VERIFY | Run and report exact output |
| `/review` | REVIEW | Five-axis review |
| `/code-simplify` | REVIEW | Clarity over cleverness |
| `/ship` | SHIP | Faster is safer (with approval) |

**Tool-specific note:** Gemini CLI may use `/planning` instead of `/plan` due to command collision. Always verify tool-specific command names against current tool documentation. Do not assume command parity across agent platforms.

## Core Skill Lifecycle Map

Skills activate automatically based on context. This is the operative routing reference.

| Phase | Skill | Citadel Nexus Trigger | Mandatory For |
|---|---|---|---|
| DEFINE | `idea-refine` | Underspecified requests | Clarifying vague requirements |
| DEFINE | `spec-driven-development` | New feature, economy change, Discord integration | Scope, acceptance criteria, risks |
| PLAN | `planning-and-task-breakdown` | After spec is verified complete | Atomic tasks, dependencies, rollback |
| BUILD | `incremental-implementation` | Any multi-file change | Vertical slices, one at a time |
| BUILD | `source-driven-development` | Hedera, Prisma, Next.js, Discord.js decisions | Official docs cited before writing |
| BUILD | `context-engineering` | Session start, task switch, quality drop | Refreshing context, preventing drift |
| BUILD | `test-driven-development` | All logic, bug fixes, behavior changes | Tests BEFORE or ALONGSIDE code |
| BUILD | `frontend-ui-engineering` | Any frontend/UI change | Usability, accessibility, performance |
| BUILD | `api-and-interface-design` | API design, module boundary design | Clear contracts, backward compatibility |
| VERIFY | `debugging-and-error-recovery` | Build failures, test failures | Root cause, fix, prevention |
| VERIFY | `browser-testing-with-devtools` | Frontend runtime issues | Runtime behavior, user experience |
| REVIEW | `code-review-and-quality` | Before any PR — ALWAYS | Correctness, clarity, security, performance |
| REVIEW | `security-and-hardening` | Auth, input, external integrations | OWASP, threat modeling, secrets audit |
| REVIEW | `code-simplification` | Complexity introduced by change | Clarity > cleverness |
| REVIEW | `performance-optimization` | Performance requirements or regression risk | Benchmarks, profiling, optimization |
| SHIP | `git-workflow-and-versioning` | Every code change — ALWAYS | Atomic commits, branch discipline |
| SHIP | `documentation-and-adrs` | Architectural decisions, API changes | ADRs, decision logs, why/why-not |
| SHIP | `ci-cd-and-automation` | Pipeline changes | Build, test, deploy automation |
| SHIP | `deprecation-and-migration` | Removing or replacing old systems | Backward compat, migration path |
| SHIP | `shipping-and-launch` | Production deployment preparation | Rollout plan, monitoring, rollback |

## Anti-Rationalization Rules (ENFORCED)

These excuses are rejected. Agents may NOT use them.

| Excuse | Rebuttal | Doctrine Reference |
|---|---|---|
| "I'll add tests later" | No. Tests are written before or alongside code. | Beyonce Rule |
| "This change is too small to test" | No. Beyonce Rule applies to ALL changes. | Beyonce Rule |
| "The build will probably pass" | No. Run the build. Show the exact output. | VERIFY stage |
| "I don't need a spec for this" | No. Economy, Discord, and Hedera changes REQUIRE specs. | DEFINE stage |
| "I'll document it after shipping" | No. ADRs are written at decision time. | SHIP stage |
| "Security review is overkill here" | No. Auth/input/external calls require OWASP review. | REVIEW stage |
| "I'll simplify it next sprint" | No. Complexity added now is debt added now. | REVIEW stage |
| "The old code can stay as dead code" | No. Deprecation-and-migration applies. | SHIP stage |
| "This is just a prototype" | No. Prototype patterns become production patterns. | BUILD stage |
| "I'll check official docs later" | No. Source-driven development applies NOW. | BUILD stage |
| "These tests are too strict" | No. Test Pyramid and DAMP apply to all. | BUILD stage |

## Completion Signal

A task is COMPLETE only when ALL stages have been executed and all exit criteria met:

✓ DEFINE: Spec written and approved (or RED gate escalated)
✓ PLAN: Plan decomposed and approved (or RED gate escalated)
✓ BUILD: Code + tests implemented, committed atomically
✓ VERIFY: All checks passed, exact output shown
✓ REVIEW: Five-axis review complete, findings labeled
✓ SHIP: PR prepared, ADR written (if applicable), Obsidian queued (if applicable), Anthony notified

No shortcuts. No exceptions. The lifecycle is constitutional.
