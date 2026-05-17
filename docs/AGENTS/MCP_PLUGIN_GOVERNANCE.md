Root authority: ../../AGENTS.md

# MCP & Third-Party Plugin Governance (CNMA v5.3)

Purpose: Define governance for enabling MCP servers and third-party plugins/extensions for agent runtimes.

Current state (audit):
- MCP servers: NOT FOUND in repo; availability is UNKNOWN.
- Third-party plugins: No verified plugin inventory; installation/runtime: UNKNOWN.
- Default: MCP/plugins are DISABLED until an approved Improvement Proposal is accepted and Anthony authorizes activation.

Governance requirements to enable MCP/plugins:
1. Improvement Proposal (per AGENT_IMPROVEMENT_PROTOCOL): Document purpose, risk, rollback plan, and operational constraints.
2. Security review: Dependency license check, SCA/vulnerability scan, supply-chain review, and isolation testing.
3. Runtime capability inventory: Exact list of endpoints, credentials (stored in secret manager only), and allowed scopes.
4. Test plan: Local sandbox tests, resource limits, kill-switch, and monitoring.
5. Obsidian export: Export a YELLOW/RED Obsidian note with full YAML frontmatter documenting approval, scope, owners.
6. Anthony approval: Explicit approval required before enabling live MCP or plugin functionality.

Operational controls:
- Plugins and MCP components must run in isolated environments with strict egress controls.
- No plugin may be allowed to exfiltrate repository contents or secrets.
- All plugin network calls must be logged, sanitized, and reviewed periodically.
- Automatic updates to plugins require a maintenance approval process and audit trail.

If approval is granted:
- Record the activation in docs/AGENTS/Tool_Capability_Inventory (runtime) with exact evidence and test outputs.
- Tie plugin activation to a single owner and state maintenance/rollback responsibilities.

Until these steps are completed: MCP and plugin capabilities remain UNKNOWN/DISABLED.
