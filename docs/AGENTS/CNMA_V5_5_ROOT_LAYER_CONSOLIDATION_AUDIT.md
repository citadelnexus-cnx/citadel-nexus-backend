Root authority: ../../AGENTS.md

# CNMA v5.5 - Root Doctrine & Agent Layer Consolidation Audit

Date: 2026-05-17  
Mode: AUDIT + DOCS ONLY

Executive summary
-----------------
This consolidation audit verifies that AGENTS.md remains the single root authority (CNMA-v5.0) and that supporting layers (v5.1-v5.4) operate as documentation and governance aids only.

No sub-agent or .github agent profile claims autonomous authority were found. Several runtime capabilities remain marked UNKNOWN and require local verification. Recommended actions include aligning version labels, adding explicit UNKNOWN markers in supporting docs, and producing a Tool Capability Inventory with local evidence before enabling MCP/plugins/GitHub API/web_fetch or other live automation.

Files reviewed
--------------
- AGENTS.md (root)
- .github/copilot-instructions.md
- .github/agents/cnma-master-agent.agent.md
- .github/agents/*.agent.md
- docs/AGENTS/SUB_AGENT_REGISTRY.md
- docs/AGENTS/SUB_AGENTS/*.md
- docs/AGENTS/AGENT_TOOL_ACCESS_AUDIT.md
- docs/AGENTS/AGENT_OPERATING_CAPABILITY_MATRIX.md
- docs/AGENTS/AGENT_PROFILE_RUNTIME_CAPABILITY_MATRIX.md
- docs/AGENTS/MCP_PLUGIN_GOVERNANCE.md
- docs/AGENTS/WEB_FETCH_POLICY.md
- docs/AGENTS/TOOL_PERMISSION_MATRIX.md
- docs/AGENTS/SKILL_REGISTRY.md
- docs/AGENTS/AGENT_TASK_TEMPLATE.md
- docs/AGENTS/AGENT_OUTPUT_FORMATS.md
- docs/AGENTS/AGENT_IMPROVEMENT_PROTOCOL.md
- docs/AGENTS/OBSIDIAN_LOGGING_STANDARD.md

Verified doctrine chain
-----------------------
- CNMA-v5.0 - Root constitutional doctrine in AGENTS.md - VERIFIED
- CNMA-v5.1 - Specialized sub-agent documentation layer - SUPPORTING
- CNMA-v5.2 - Selectable agent profile layer under .github/agents - SUPPORTING
- CNMA-v5.3 - Tool access and runtime capability audit layer - SUPPORTING
- CNMA-v5.4 - Supporting Layer Index inserted into AGENTS.md - SUPPORTING

Authority hierarchy
-------------------
1. AGENTS.md - Root authority.
2. Supporting docs - Operational guidance only.
3. .github/agents/*.agent.md - Selectable persona profiles only.
4. docs/AGENTS/SUB_AGENTS/*.md - Persona guidance only.
5. Anthony Hammon - Final approval authority for all RED-gate actions.

Supporting layer map
--------------------
- v5.0: AGENTS.md constitutional law.
- v5.1: Sub-agent registry and persona docs.
- v5.2: .github agent profile layer.
- v5.3: Capability audit and operating matrices.
- v5.4: Root Supporting Layer Index.
- v5.5: This consolidation audit report.

Findings table
--------------
| Item | Severity | Details | Location | Recommended action |
|---|---|---|---|---|
| Version drift | MEDIUM | Multiple docs reference v5.1, v5.2, v5.3, and v5.4 while AGENTS.md remains root CNMA-v5.0. | AGENTS.md, .github/agents, docs/AGENTS | Keep root authority clear and label v5.1-v5.4 as supporting layers. |
| Stale v4.1 refs | LOW | CNMA-v4.1 appears only as historical/superseded context. | docs/OBSIDIAN_EXPORT_QUEUE | Keep as historical if clearly marked superseded. |
| Autonomous claims | HIGH | No explicit autonomous authority claims were found. | .github/agents/*.agent.md, docs/AGENTS/SUB_AGENTS | Maintain no-autonomous-authority language in every profile. |
| Unsupported runtime claims | HIGH | Some docs list possible tools, but runtime availability remains UNKNOWN unless locally verified. | TOOL_PERMISSION_MATRIX.md, skill docs, profile docs | Produce a Tool Capability Inventory with local evidence. |
| RED-gate enforcement | NONE | No bypass language found. RED gates remain enforced. | AGENTS.md and supporting docs | Maintain approval gates. |
| Missing UNKNOWN handling | MEDIUM | Some supporting docs can be clearer where runtime capability is not verified. | docs/AGENTS | Add explicit UNKNOWN markers in a future docs-only pass. |
| Obsidian/export rules gap | LOW | Some persona docs may need stronger agent_persona frontmatter guidance. | docs/AGENTS/OBSIDIAN_LOGGING_STANDARD.md, SUB_AGENTS | Add persona export requirements in a future docs-only pass. |

Duplicate authority claims
--------------------------
- No direct duplicate claims overriding AGENTS.md were found.
- Supporting docs use operational guidance language and do not claim authority over AGENTS.md.
- Agent profiles are selectable personas only and do not claim autonomous execution authority.
- Sub-agent docs are scoped to planning, review, reporting, and governance support.

Stale version references
------------------------
- CNMA-v4.1 appears in historical context and is superseded by CNMA-v5.0.
- v5.1, v5.2, v5.3, and v5.4 references are valid as supporting layers.
- No stale version reference was found that overrides AGENTS.md root authority.

Unsupported capability claims
-----------------------------
- web_fetch/outbound HTTP: Policy exists, but runtime availability is UNKNOWN.
- Git CLI: Local terminal supports git, but agent-runtime git execution remains UNKNOWN unless verified inside that runtime.
- GitHub API tools: Tool names may be documented, but availability and credentials are UNKNOWN.
- MCP servers and plugins: Governance exists, but no live MCP/plugin activation is approved.
- External API, authenticated web_fetch, production deployment, migrations, Discord mutation, economy changes, wallet/CNX asset actions, payment/storefront changes, and credential-controlled workflows remain blocked unless explicitly approved.
- Recommendation: mark these capabilities as UNKNOWN across supporting docs until local evidence is provided.

RED/YELLOW/GREEN gate alignment
-------------------------------
- AGENTS.md contains explicit RED-gate requirements.
- Supporting docs preserve RED/YELLOW/GREEN gate language.
- No deregulatory language was found.
- No approval gate was weakened.
- Gate alignment: CONSISTENT.

Required corrections
--------------------
1. Align version labels across .github agent profiles and supporting docs to emphasize supporting-layer status.
2. Add explicit UNKNOWN markers where runtime tool availability is not verified.
3. Update persona docs to require agent_persona frontmatter for YELLOW/RED Obsidian exports.
4. Produce a Tool Capability Inventory with local command evidence before upgrading UNKNOWN capabilities to VERIFIED.

No-change confirmations
-----------------------
- AGENTS.md remains root and authoritative.
- CNMA-v5.0 remains current root doctrine.
- CNMA-v5.1-v5.4 remain supporting layers only.
- RED/YELLOW/GREEN gates are intact.
- No supporting doc currently overrides AGENTS.md.
- No runtime code, package file, Prisma schema, migration, environment-value file, deployment, database, Discord, economy, wallet/CNX asset, payment, or storefront system was changed by this report.

Recommended next phase
----------------------
CNMA v5.6 - Tool Capability Inventory and Evidence Capture.

Recommended v5.6 outputs
------------------------
- docs/AGENTS/TOOL_CAPABILITY_INVENTORY.md
- Local evidence for git availability.
- Local evidence for PowerShell availability.
- Local evidence for Node/npm availability.
- UNKNOWN markings for agent-runtime-only capabilities.
- No live MCP/plugin/GitHub API/web_fetch activation without approval.

Approval requirements
---------------------
- Any future AGENTS.md root change requires Anthony approval.
- Any enabling of MCP, plugins, GitHub API automation, authenticated web_fetch, production deployments, database migrations, Discord mutation, economy changes, wallet/CNX asset actions, payment/storefront changes, or credential-controlled workflows requires an Improvement Proposal and explicit Anthony approval.

Prepared by: CNMA Master Agent (docs-only)

End of report.
