# Negative Prompts (Absolute Prohibitions)

**Root authority: ../../AGENTS.md**

This document enumerates actions agents MUST NEVER take. These are hard stops with zero exceptions. If a requested task would violate any item below, stop immediately and escalate to Anthony.

---

## Secrets and Credentials (NO EXCEPTIONS)

- Do NOT read .env files (ever)
- Do NOT print secrets, tokens, keys, or credential-bearing URLs
- Do NOT expose private keys, wallet seeds, or API tokens
- Do NOT store credentials in version-controlled files
- Do NOT expose database connection strings or URLs
- Do NOT expose webhook URLs (credential-bearing)
- Do NOT expose private production URLs or admin URLs
- Do NOT expose Supabase service role keys
- Do NOT read raw logs that may contain secrets (request sanitized excerpts instead)
- Do NOT log or export secrets to Obsidian or anywhere else
- Do NOT rotate credentials or access secrets manager
- Do NOT include secrets in code comments, documentation, or communications

---

## Production and Deployment

- Do NOT deploy to production without explicit Anthony approval (RED gate)
- Do NOT restart PM2, Nginx, UFW, Vercel, Supabase, or Discord services without approval
- Do NOT merge to main without Anthony approval (RED gate)
- Do NOT force push (ever)
- Do NOT assume production target without confirmation
- Do NOT run migrations without Anthony approval (RED gate)
- Do NOT run `npx prisma format` unless schema-formatting is explicitly in approved task scope

---

## Database and Schema

- Do NOT run Prisma migrations without Anthony approval (RED gate)
- Do NOT modify Prisma schema without approval (YELLOW gate minimum)
- Do NOT bypass service layer with direct Prisma writes from routes
- Do NOT query production database without service layer
- Do NOT make direct database mutations
- Do NOT delete production data
- Do NOT assume schema state without running `npx prisma validate`

---

## Discord

- Do NOT mutate live Discord roles without explicit Anthony approval (RED gate)
- Do NOT change Discord role IDs (ever)
- Do NOT bypass role registry (use `src/config/discordRoleRegistry.ts` always)
- Do NOT make production Discord API calls
- Do NOT change permissions without approval
- Do NOT expose Discord role IDs outside of role registry context

---

## Economy

- Do NOT change economy constants without explicit Anthony approval (RED gate)
- Do NOT create uncapped XP or resource loops (ever)
- Do NOT create pay-to-win mechanics (ever)
- Do NOT remove anti-abuse checks or limits
- Do NOT bypass gating logic
- Do NOT mutate user XP, resources, or progression in production
- Do NOT increase `CURRENT_PHASE` or feature controls without approval
- Do NOT treat deferred features as live
- Do NOT silently activate deferred features in code

---

## Wallet, Hedera, and Tokens

- Do NOT spend, transfer, or manage funds without explicit Anthony approval (RED gate)
- Do NOT mint, burn, or transfer tokens without explicit Anthony approval (RED gate)
- Do NOT change wallet authority or multisig configuration without approval
- Do NOT interact with Hedera mainnet without explicit Anthony approval (RED gate — testnet only)
- Do NOT create HCS or HTS contracts without approval
- Do NOT assume testnet when mainnet is possible (default to testnet; mainnet is RED gate)
- Do NOT expose wallet addresses linked to private keys
- Do NOT read or reference wallet seed phrases

---

## Auth and Security

- Do NOT weaken authentication checks (ever)
- Do NOT bypass authorization middleware
- Do NOT create routes that bypass service-layer auth
- Do NOT expose internal API structure in public-facing error messages
- Do NOT log user PII beyond what is explicitly required
- Do NOT skip security review for auth/input/external endpoints
- Do NOT skip OWASP Top 10 checklist for security-surface changes

---

## Git and Version Control

- Do NOT merge to main (Anthony merges only)
- Do NOT force push (ever)
- Do NOT delete files without explicit approval (YELLOW gate)
- Do NOT rewrite commit history on shared branches
- Do NOT commit secrets or credentials
- Do NOT assume branch state without running `git status`

---

## Testing and Verification

- Do NOT hide, summarize, or fabricate failing tests
- Do NOT claim a test passes without showing exact output
- Do NOT claim a check passed when the command does not exist in the repo
- Do NOT skip tests (Beyonce Rule applies to ALL changes)
- Do NOT claim "this change is too small to test" — ALL changes need tests
- Do NOT defer tests to "later" — write tests before or alongside code
- Do NOT fabricate build, lint, or test output
- Do NOT run `npm run build` or `npm run test` without showing exact output

---

## Code Quality

- Do NOT skip spec-driven-development for significant changes
- Do NOT skip test-driven-development for logic changes
- Do NOT skip code-review-and-quality before any PR
- Do NOT skip security-and-hardening for auth/input/external changes
- Do NOT rationalize skipping any lifecycle stage (DEFINE → PLAN → BUILD → VERIFY → REVIEW → SHIP)
- Do NOT invoke other personas from within a persona (orchestration belongs to user/slash commands)
- Do NOT mark work complete without verified evidence
- Do NOT act on "seems right" — require exact evidence

---

## Implementation

- Do NOT act before reading relevant files (always read first)
- Do NOT edit files before stating a plan (always plan before editing)
- Do NOT assume current implementation state from memory (always read from repo)
- Do NOT skip rollback path definition
- Do NOT create big-bang PRs (use incremental-implementation)
- Do NOT combine multiple slices into one commit
- Do NOT downgrade verified Citadel Nexus facts to UNKNOWN without justification

---

## Documentation

- Do NOT skip ADR creation for architectural decisions (ADR at decision time)
- Do NOT skip Obsidian logging for YELLOW/RED/implementation/architecture tasks
- Do NOT defer documentation to "later" — write docs at decision time
- Do NOT expose private implementation details in public products
- Do NOT create public products without Product/IP Shield review

---

## Architectural and Design

- Do NOT remove what you do not understand (Chesterton's Fence applies to all economy, role, and Hedera changes)
- Do NOT bypass backend as source of truth
- Do NOT create frontend-only source of truth
- Do NOT hardcode private implementation in public-facing surfaces
- Do NOT turn deferred features into live features
- Do NOT expand scope without approval
- Do NOT invent citations, file paths, logs, or test results
- Do NOT invent environment variable names (verify from .env.example)

---

## Data and Verification

- Do NOT read or expose user PII
- Do NOT summarize errors vaguely — report exact failures
- Do NOT claim a task is complete without passing all checks
- Do NOT create unchecked assumptions about runtime state
- Do NOT export secrets or credentials to anywhere (including logs or Obsidian)
- Do NOT make architectural decisions unilaterally (escalate to Anthony)

---

## External and Third-Party

- Do NOT share repository contents with external third-party systems
- Do NOT call external services with repo data
- Do NOT install tools or plugins without approval (YELLOW gate minimum)
- Do NOT assume command availability — verify commands exist before using

---

## Scope and Authority

- Do NOT make unilateral go/no-go decisions (agents propose; humans decide)
- Do NOT deploy, merge, or release without Anthony approval
- Do NOT escalate to someone other than Anthony for RED-gate decisions
- Do NOT claim agent authority over human decision-making
- Do NOT override verified Citadel Nexus doctrine

---

## Enforcement

If a requested task violates ANY item above:

1. **STOP immediately**
2. **Identify which rule is violated**
3. **Escalate to Anthony with context**
4. **Do NOT proceed**
5. **Do NOT rationalize the violation**
6. **Do NOT invent exceptions**

These prohibitions are CONSTITUTIONAL LAW for all agents in Citadel Nexus. They cannot be overridden, weakened, or bypassed.
