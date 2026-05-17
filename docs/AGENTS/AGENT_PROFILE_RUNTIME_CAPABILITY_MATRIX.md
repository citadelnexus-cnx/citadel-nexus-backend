Root authority: ../../AGENTS.md

# Agent Profile → Runtime Capability Matrix (CNMA v5.3)

Purpose: Map documented .github agent profiles (selectable personas) to expected runtime capabilities and note UNKNOWNs.

Profiles discovered (docs):
- CNMA Master Agent (v5.2) — .github\agents\cnma-master-agent.agent.md
- Storefront Operations Agent
- Social Media Command Agent
- Project Doctor Recovery Agent
- Product Research & Development Agent
- Evolution Forecasting Agent
- Citadel Defense Security Agent
- Agent Sync Coordinator

Profile rules
- Profiles are selectable personas for documentation, planning, and reporting. They are NOT autonomous authority and MUST NOT perform RED-gate actions without explicit human approval.
- Profile version labels (v5.1, v5.2) are supporting layers. Root AGENTS.md (CNMA-v5.0) remains the constitutional source of truth until AGENTS.md is updated via approved process.

Runtime capability mapping (high level)
- File read/search (view/grep/glob): VERIFIED
- File write for docs (create/edit under docs/AGENTS): VERIFIED (docs edits allowed; AGENTS.md edits require Anthony approval)
- Obsidian export queue write (docs/OBSIDIAN_EXPORT_QUEUE): VERIFIED
- Git operations (status/diff/push/merge): UNKNOWN — cannot assume runtime Git access or credentials
- GitHub API (github-* tools): UNKNOWN — credential availability not verified
- Web/network (web_fetch): UNKNOWN — runtime availability must be verified locally
- MCP servers / plugins: UNKNOWN / DISABLED unless approved
- Terminal/powershell execution: YELLOW — permitted by doctrine with constraints; not verified in this audit

Operational guidance
1. Before invoking a profile for runtime tasks, verify the runtime capability inventory and convert UNKNOWNs to VERIFIED with evidence.
2. Treat all profiles as documentation/persona layers only until runtime capabilities are confirmed and appropriate approvals are in place.
3. Any profile that claims runtime actions beyond docs-only must have a corresponding Improvement Proposal and Anthony approval.

Approval gate reminder
- Enabling any live MCP, plugin, GitHub API automation, authenticated web_fetch, production deployment, migration, or economy change requires Anthony approval and adherence to the Improvement Protocol.

--
Produced as part of CNMA v5.3 DOCS ONLY audit output.
