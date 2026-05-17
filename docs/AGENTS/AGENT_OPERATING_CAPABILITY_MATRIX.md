Root authority: ../../AGENTS.md

# Agent Operating Capability Matrix (CNMA v5.3)

Purpose: Map tools to runtime status (VERIFIED / YELLOW / BLOCKED / UNKNOWN) using the v5.3 audit snapshot.

| Tool / Action | Status | Evidence / Notes |
|---|---|---|
| view, grep, glob (file read/search) | VERIFIED (GREEN) | Used in audit to inspect repo docs |
| create, edit (docs only) | VERIFIED (GREEN) | Used in audit to create supporting docs; edits governed by AGENTS.md |
| edit AGENTS.md | BLOCKED (RED) | AGENTS.md edits require Anthony approval |
| powershell (sync/async) | YELLOW | Permitted per TOOL_PERMISSION_MATRIX but not executed in this runtime (VERIFY locally) |
| git CLI (status/diff/log) | UNKNOWN | git CLI not available to this agent runtime during audit; verify locally |
| github-* API tools | UNKNOWN | Availability and credentials not verified here |
| web_fetch / outbound HTTP | UNKNOWN | Not verified in this runtime; treat as blocked until approved for public-only usage |
| MCP server access | UNKNOWN / DISABLED | No MCP registry found in repo; treat as disabled until approved |
| Plugin installation/runtime | UNKNOWN / YELLOW | Requires security review, license check; disabled until approved |
| npm / package manager installs | YELLOW | Allowed with review; not executed here |
| npx prisma validate | YELLOW | Documented as required for schema checks; not run here |
| prisma migrate | BLOCKED (RED) | Migration requires Anthony approval |
| Direct DB queries (production) | BLOCKED (RED) | Per doctrine |
| Read .env | BLOCKED (NEVER) | Use .env.example only |
| Token/wallet/Hedera mainnet ops | BLOCKED (RED) | Per doctrine |

Notes:
- 'VERIFIED' means the audit executed or relied on prior verified evidence in this runtime.
- 'YELLOW' means allowed conditionally per docs but requires local verification or scope confirmation.
- 'BLOCKED' reflects RED-gate protections in AGENTS.md.
- 'UNKNOWN' must be verified locally and logged in the Tool Capability Inventory.

Change control:
- Any change to statuses (especially turning UNKNOWN -> VERIFIED or enabling MCP/plugins) requires an Improvement Proposal and Anthony approval.
