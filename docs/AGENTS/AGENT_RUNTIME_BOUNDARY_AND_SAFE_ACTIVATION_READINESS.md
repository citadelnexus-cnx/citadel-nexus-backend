Root authority: ../../AGENTS.md

# CNMA v5.7 — Agent Runtime Boundary & Safe Activation Readiness

Last updated: 2026-05-17
Mode: DOCS ONLY — branch: docs/cnma-v5-7-agent-runtime-boundary-readiness

1. Root authority reference
---------------------------
AGENTS.md (CNMA-v5.0) remains the single root constitutional authority. Supporting documentation (CNMA v5.1–v5.6) provides operational guidance only and does not override AGENTS.md.

2. Purpose
----------
Define runtime boundaries for selectable agent personas and document readiness criteria, evidence requirements, and safe-activation controls before any expanded runtime capabilities (MCP/plugins/GitHub API/web_fetch, deployments, migrations, or economy mutations) are enabled.

3. Current activation status
----------------------------
- Supported: Documentation & planning personas active for read-only tasks, planning, reviews, and audits.
- Restricted: All live automation, production-impacting actions, and secret-bearing operations are BLOCKED pending Improvement Proposal and Anthony approval.
- Runtime tool capability: Many items remain UNKNOWN until local runtime evidence is captured (see docs/AGENTS/TOOL_CAPABILITY_INVENTORY.md).

4. Agent runtime boundary definition
------------------------------------
Agents (selectable personas in .github/agents/) are confined to:
- Read-only repo analysis (view, grep, glob)
- Docs creation/edit under approved docs paths (docs/AGENTS/) when allowed
- Planning, spec drafting, audit reports, and Obsidian export queue entries

Agents are forbidden from:
- Accessing .env or other secret files
- Running migrations, modifying database schemas, or querying production DBs
- Deploying to production, merging to main, or restarting services
- Mutating Discord roles live, economy constants, wallets, tokens, payments, or storefronts
- Executing authenticated external API workflows without approval

5. What custom agents may safely do now
--------------------------------------
- Read and summarize AGENTS.md and supporting docs
- Produce audit and readiness reports (docs/OBSIDIAN_EXPORT_QUEUE/) with agent_persona frontmatter
- Propose Improvement Proposals and task plans
- Draft code patches and PR content (docs-only until human pushes/opens PR)
- Run local evidence capture procedures when executed by a human operator on an approved machine

6. What custom agents may NOT do
-------------------------------
- Perform any live or autonomous runtime actions that mutate production or sensitive state
- Read or expose .env values or other secrets
- Merge PRs or push to main
- Run prisma migrate or any database migration
- Execute Hedera mainnet or wallet operations
- Enable MCP servers, third-party plugins, or automated GitHub API tasks without approval

7. Human approval gates
-----------------------
Any of the following require an Improvement Proposal and explicit Anthony approval:
- Enabling MCP servers or plugin runtimes
- Granting programmatic GitHub API access or installing GitHub apps
- Allowing authenticated web_fetch for non-public resources
- Switching UNKNOWN tools to VERIFIED for agent runtime use
- Production deployments, database migrations, and economy-related changes

8. RED / YELLOW / GREEN activation readiness matrix
---------------------------------------------------
| Capability Category | Current Status | Ready Condition |
|---|---|---|
| File read/search (view/grep/glob) | GREEN (VERIFIED) | None — allowable for agents |
| Docs create/edit (docs/AGENTS) | GREEN (VERIFIED) | Use branch & review process; AGENTS.md edits require Anthony approval |
| Local shell / git CLI execution | YELLOW / UNKNOWN | Requires human-run evidence capture and logging |
| Web fetch (public-only) | UNKNOWN | Requires local verification and web policy compliance |
| GitHub API automation | UNKNOWN / YELLOW | Requires token handling plan, security review, and Anthony approval |
| Powershell background/daemon detach | YELLOW | Requires operational safety plan and approval for long-running tasks |
| MCP / Plugins | UNKNOWN / DISABLED | Governance, approval, and security checks required (see MCP_PLUGIN_GOVERNANCE.md) |
| Prisma migrate / DB migrations | RED (BLOCKED) | Improvement Proposal + Anthony approval only |
| Merge to main / Production deploy | RED (BLOCKED) | Anthony approval only |
| Secrets / .env access | RED (NEVER) | Forbidden — use .env.example only |
| Economy, Discord live mutation, tokens | RED (BLOCKED) | Anthony approval only |

9. Agent-by-agent safe use table
--------------------------------
| Agent profile | Allowed (docs/planning) | Forbidden (runtime/action) |
|---|---|---|
| CNMA Master Agent (v5.2) | Coordinate sub-agents; produce plans/reports; export Obsidian notes | Autonomous execution of RED actions; read secrets; deploy |
| Storefront Operations Agent | Draft rollout plans, listing drafts, compliance checks | Direct storefront API calls, payments, live listings |
| Social Media Command Agent | Draft posts, calendars, compliance checks | Posting to live platforms without human review and auth |
| Product Research & Dev Agent | Market research, spec drafting, evidence packs | Creating production artifacts or releasing public products without review |
| Evolution Forecasting Agent | Forecasts, signal analysis, scenario docs | Automated signal-based production changes |
| Citadel Defense Security Agent | Incident playbooks, security audits | Direct secret rotation or credential mutation |
| Project Doctor Recovery Agent | Diagnostic plans and recovery recommendations | Running live recovery scripts in prod without approvals |
| Agent Sync Coordinator | Docs governance, handoffs, Obsidian exports | Automating cross-agent runtime orchestration without approval |

10. Required evidence before expanded access
--------------------------------------------
Before reclassifying UNKNOWN → VERIFIED or enabling YELLOW→GREEN for agent runtime use, collect and provide:
- Exact local command outputs (git, node, prisma, curl) per TOOL_CAPABILITY_INVENTORY.md
- Security review (SCA, license, dependency audit)
- Network egress policy and logging plan
- Secrets management plan (use secrets manager; no .env values in docs)
- Operational test plan, rollback plan, and monitoring/alerts
- Obsidian export of evidence and approvals with agent_persona frontmatter
- Explicit Anthony approval (documented in Obsidian export)

11. Safe activation checklist
----------------------------
- [ ] Evidence captured and stored in docs/AGENTS/Tool_Capability_EVIDENCE/
- [ ] Security review completed and signed off
- [ ] Improvement Proposal created and linked to Obsidian note
- [ ] Rollback and monitoring plans documented
- [ ] Anthony granted explicit approval (record in Obsidian frontmatter)
- [ ] Small canary test plan defined (non-production sandbox)

12. Stop conditions
-------------------
Stop and escalate to Anthony immediately if:
- Evidence reveals secret exposure or private credentials
- A proposed change touches any RED-gate item without approval
- Tests fail in ways that require architectural decisions
- Any persona requests autonomous cross-agent invocation or runtime activation beyond this doc

13. No-change confirmations
---------------------------
- This doc is DOCS ONLY. No runtime code, package.json, prisma schema, migrations, or production systems were modified.
- AGENTS.md remains authoritative; RED/YELLOW/GREEN gates unchanged.

14. Recommended next phase
--------------------------
1. Execute local evidence capture per TOOL_CAPABILITY_INVENTORY.md and store outputs in docs/AGENTS/Tool_Capability_EVIDENCE/.
2. Reclassify verified tools in the inventory and update AGENT_OPERATING_CAPABILITY_MATRIX.md.
3. Prepare Improvement Proposals for any planned expanded runtime capabilities and route to Anthony for approval.

Produced by: CNMA Master Agent (docs-only)

References:
- AGENTS.md
- docs/AGENTS/TOOL_CAPABILITY_INVENTORY.md
- docs/AGENTS/AGENT_TOOL_ACCESS_AUDIT.md
- docs/AGENTS/AGENT_OPERATING_CAPABILITY_MATRIX.md
- docs/AGENTS/AGENT_PROFILE_RUNTIME_CAPABILITY_MATRIX.md
- docs/AGENTS/MCP_PLUGIN_GOVERNANCE.md
- docs/AGENTS/WEB_FETCH_POLICY.md
- .github/agents/*.agent.md
- docs/AGENTS/SUB_AGENT_REGISTRY.md
