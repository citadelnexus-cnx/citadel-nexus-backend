Root authority: ../../AGENTS.md

# CNMA v5.3 Agent Tool Access & Operating Capability Audit

Snapshot: 2026-05-17
Mode: DOCS ONLY

Scope
- Audit runtime tool access vs AGENTS.md gates.
- Mark unverified capabilities as UNKNOWN.
- Preserve RED/YELLOW/GREEN gate language and approval gates.

Summary of verified findings (this audit)
- VERIFIED (GREEN):
  - File read/search: view, grep, glob — VERIFIED (used to inspect repo docs during audit).
  - File write for docs: create, edit — VERIFIED (audit used edit/create for supporting docs; edits governed by AGENTS.md).
  - Obsidian export queue write: VERIFIED (docs/OBSIDIAN_EXPORT_QUEUE is present for queued notes).

- CONDITIONAL / YELLOW (allowed by docs but NOT executed here):
  - Local build/test tools (npm run build / npm run test / npx prisma validate) — YELLOW (documented; not run in this runtime).
  - Powershell (sync/async) — YELLOW (per TOOL_PERMISSION_MATRIX, permitted for approved tasks; not verified here).

- BLOCKED (RED per AGENTS.md / TOOL_PERMISSION_MATRIX):
  - Merge to main
  - Production deployment
  - Database migrations (Prisma migrate)
  - Secret rotation or printing (.env values)
  - Economy-constant mutation
  - Live Discord role mutation
  - Token/wallet operations and Hedera mainnet transactions
  - Direct production DB queries
  - Service restarts, force-pushes, destructive data operations

- UNKNOWN (not verifiable from this audit/runtime):
  - Git CLI execution (git status / git diff / git log) — UNKNOWN (git CLI not available in this agent runtime during audit).
  - GitHub API / github-* tool availability and credentials — UNKNOWN.
  - web_fetch / outbound HTTP capability from agent runtime — UNKNOWN.
  - MCP servers configured or reachable — UNKNOWN.
  - Third-party plugin installation and runtime (plugins) — UNKNOWN.
  - Any runtime background daemons or detached processes acceptance — UNKNOWN.

Version & profile notes
- Root AGENTS.md remains authoritative (CNMA-v5.0). Supporting docs include v5.1 addenda; some .github agent profiles reference v5.2. Align versions before changing constitutional doctrine.
- .github agent profiles are selectable personas (documentation / planning personas) and are NOT autonomous authority.
- Runtime access may differ from profile permissions; always verify runtime tool inventory before performing actions.

Recommendations
1. Produce a Tool Capability Inventory (runtime) that documents which tools are actually usable in the agent runtime (git, shell, web_fetch, MCP, GitHub API, powershell).
2. Run local verification steps to convert UNKNOWN entries to VERIFIED or YELLOW with evidence.
3. Require Anthony approval and Improvement Protocol for enabling any live MCP, plugin, GitHub API, web_fetch, production, or external-API workflow.
4. Keep all RED gates enforced as documented in AGENTS.md; do not relax without Anthony approval.

--
Audit prepared by: CNMA Master Agent (docs-only)
