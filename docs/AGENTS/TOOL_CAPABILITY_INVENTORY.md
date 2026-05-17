Root authority: ../../AGENTS.md

# CNMA v5.6 — Tool Capability Inventory & Evidence Capture

Last updated: 2026-05-17
Mode: DOCS ONLY — branch: docs/cnma-v5-6-tool-capability-inventory

1. Root authority reference
---------------------------
AGENTS.md (CNMA-v5.0) is the single root constitutional authority. Supporting docs (v5.1–v5.4) provide operational guidance only.

2. Purpose
----------
Document a canonical inventory of agent runtime tools and capture local evidence to verify which are actually available in this environment. Ensure UNKNOWN capabilities are explicitly marked and require evidence capture before enabling any live or automated workflows.

3. Local evidence table (LOCAL MACHINE VERIFIED)
-------------------------------------------------------
The following outputs were captured on the local machine and are marked LOCAL MACHINE VERIFIED. These entries document local developer environment evidence only — they DO NOT prove agent-runtime availability. Agent-runtime git/shell/web_fetch/GitHub API/MCP/plugin availability remains UNKNOWN unless tested inside that runtime.

| Command | Expected evidence | Local output (exact) |
|---|---:|---|
| git --version | Git present and version | git version 2.49.0.windows.1 (LOCAL MACHINE VERIFIED) |
| git status --short | Repo cleanliness and unstaged changes (before file creation) | clean (LOCAL MACHINE VERIFIED) |
| git rev-parse --abbrev-ref HEAD | Current branch | docs/cnma-v5-6-tool-capability-inventory (LOCAL MACHINE VERIFIED) |
| node -v && npm -v | Node and npm available | v22.16.0 ; npm 11.4.2 (LOCAL MACHINE VERIFIED) |
| npx prisma --version | Prisma CLI and related info | Prisma CLI version: 7.6.0; @prisma/client: 7.6.0; OS: win32; Architecture: x64; TypeScript: 5.9.3; Prisma schema: prisma\schema.prisma; Prisma config: prisma.config.ts; Query Compiler: enabled; Prisma Studio: 0.27.3 (LOCAL MACHINE VERIFIED) |
| powershell -Command "echo OK" | Powershell available (Windows) | PowerShell version: 5.1.19041.6456; command output: OK (LOCAL MACHINE VERIFIED) |
| curl -I https://api.github.com | Outbound HTTP to GitHub | NOT RUN / NOT VERIFIED (LOCAL MACHINE) |
| curl -I https://example.com | Outbound HTTP general | NOT RUN / NOT VERIFIED (LOCAL MACHINE) |
| php -v (if used) | PHP availability | NOT RUN / NOT VERIFIED (LOCAL MACHINE) |

Note: These entries are LOCAL MACHINE VERIFIED only. Do NOT paste secrets or .env values. If a command is missing on the local machine, record "COMMAND NOT FOUND". Agent-runtime capability remains UNKNOWN unless evidence is captured from that runtime.

4. Agent-runtime capability table
---------------------------------
Map documented tools to runtime status: VERIFIED / YELLOW / BLOCKED / UNKNOWN.

| Tool / Action | Status | Evidence reference |
|---|---|---|
| view, grep, glob (file read/search) | VERIFIED | Audit used these to read files |
| create, edit (docs only) | VERIFIED | Supporting docs created in this branch |
| git CLI (status/diff/log) | UNKNOWN | Local evidence required |
| github-* API tools | UNKNOWN | Requires token and local verification |
| web_fetch / outbound HTTP | UNKNOWN | Requires local verification (see web policy) |
| powershell / shell execution | YELLOW | Permitted with constraints; verify locally |
| npm / package manager | YELLOW | Verify locally before use |
| npx prisma validate | YELLOW | Verify locally before use |
| prisma migrate | BLOCKED (RED) | AGENTS.md requires Anthony approval |
| Merge to main | BLOCKED (RED) | AGENTS.md requires Anthony approval |
| Production deployment | BLOCKED (RED) | AGENTS.md requires Anthony approval |
| Read .env | BLOCKED (NEVER) | AGENTS.md forbids reading .env |
| Token/wallet/Hedera mainnet ops | BLOCKED (RED) | AGENTS.md forbids without Anthony approval |
| MCP servers | UNKNOWN / DISABLED | No registry found; governance requires approval |
| Plugin installs (third-party) | UNKNOWN / YELLOW | Security review required before enabling |

5. VERIFIED capabilities
------------------------
- File read/search: view, grep, glob — VERIFIED (used by audit)
- Create/edit of docs under docs/AGENTS: VERIFIED (files created)
- Obsidian export queue presence/write (docs/OBSIDIAN_EXPORT_QUEUE): VERIFIED (directory present)

6. UNKNOWN capabilities
-----------------------
- git CLI execution and exact behavior in this runtime
- GitHub API (github-* tools) availability and auth
- web_fetch / outbound HTTP capability from agent runtime
- MCP servers configured/available
- Plugin runtime/install capability
- Powershell interactive modes and detach behavior (verify locally)

7. BLOCKED / RED-gate capabilities
---------------------------------
Per AGENTS.md and Tool Permission Matrix, these are BLOCKED unless Anthony approves:
- Merge to main
- Production deployment
- Database migrations (prisma migrate)
- Secret rotation or reading .env contents
- Economy constant changes
- Live Discord role mutation
- Token/wallet/Hedera mainnet operations
- Direct production DB queries
- Service restarts, force-pushes, destructive operations

8. Evidence capture rules
-------------------------
- All evidence must be exact command output. Do NOT paraphrase.
- Redact secrets: If any command output contains sensitive tokens, replace sensitive strings with [REDACTED] and note reason.
- Each evidence entry must include: command run, exact output, timestamp, user who ran it, and context (machine identity).
- Evidence must be stored in docs/AGENTS/Tool_Capability_EVIDENCE/ with filename: [TIMESTAMP]-[command]-[short].txt
- Any evidence that reveals secrets must be removed and reported as a security incident immediately.

9. Tool enablement approval requirements
---------------------------------------
To enable or reclassify a tool from UNKNOWN/YELLOW→VERIFIED or to enable BLOCKED tools:
1. Prepare an Improvement Proposal per docs/AGENTS/AGENT_IMPROVEMENT_PROTOCOL.md
2. Include local evidence and risk assessment
3. Provide security review and dependency/license audit
4. Document rollback plan and monitoring
5. Obtain explicit Anthony approval
6. Record approval and evidence in Obsidian export (docs/OBSIDIAN_EXPORT_QUEUE/) with agent_persona: CNMA Master Agent

10. No-change confirmations
--------------------------
- No runtime code, package files, Prisma schema, migrations, or production systems are modified by this docs-only inventory.
- AGENTS.md remains authoritative; RED/YELLOW/GREEN gates remain enforced.

11. Recommended next phase
--------------------------
- Run local verification commands (see Checks to run locally below) and paste outputs into the Local evidence table.
- Create docs/AGENTS/Tool_Capability_EVIDENCE/ and add captured outputs per evidence rules.
- Reclassify UNKNOWN items to VERIFIED where evidence exists; keep others UNKNOWN.
- If enabling any blocked capability is necessary, open an Improvement Proposal and obtain Anthony approval before proceeding.

Checks to run locally (paste outputs into Local evidence table):
- git --version
- git status --short
- git rev-parse --abbrev-ref HEAD
- node -v && npm -v
- npx prisma --version
- powershell -Command "echo OK" (Windows)
- curl -I https://api.github.com
- curl -I https://example.com

Approval required:
- Anthony approval required to enable any BLOCKED/RED-gate capabilities or to modify AGENTS.md beyond this docs insertion.

--
Produced by: CNMA Master Agent (docs-only)
