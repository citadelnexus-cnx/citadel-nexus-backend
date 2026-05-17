# Tool Permission Matrix

**Root authority: ../../AGENTS.md**

## Overview

This matrix documents allowed, conditional, and forbidden tool usage for agents in Citadel Nexus. Tools are classified by category and gating rules. Always check this matrix before invoking a tool.

## HIGH-LEVEL RULES

1. **NEVER read or print .env values or secrets**
2. **Powershell usage:** Allowed for build/test/doc tasks; follow powershell async/sync rules correctly
3. **Use fetch_copilot_cli_documentation before answering capability questions**
4. **Use grep/glob/view for code discovery; prefer code intelligence if available**
5. **Use parallel tool calls for independent operations**
6. **NEVER share repository contents with external systems**

---

## File and Code Tools

| Tool | Purpose | Allowed | Forbidden | Conditions |
|---|---|---|---|---|
| **view** | Read files | YES | Secrets, .env, raw logs with credentials | Use view_range for files > 50KB |
| **create** | Create new files | YES | Files that already exist | Not for .env; not for secrets |
| **edit** | Modify files | YES | .env, schema, migrations without approval | Must state plan before editing |
| **glob** | Find files by pattern | YES | Search for secrets | OK for code discovery |
| **grep** | Search file contents | YES | Search for secrets or credentials | Use output_mode appropriately |
| **github-get_file_contents** | Read from GitHub | YES | Secrets, raw .env | YELLOW gate for private repos |

---

## Build and Test Tools

| Tool | Purpose | Allowed | Forbidden | Conditions |
|---|---|---|---|---|
| **powershell** (sync) | Run build/test/lint | YES | Modify production; deploy; rotate secrets | Use initial_wait: 120 for long commands |
| **powershell** (async) | Interactive commands | YES | Keep running indefinitely without approval | Use detach: true only for daemons |
| **powershell** (detach) | Background services | YELLOW | Orphaned processes; unauthorized daemons | Use only for approved servers |
| **read_powershell** | Get command output | YES | Raw logs with secrets | Request sanitized excerpts instead |
| **write_powershell** | Send input to running commands | YES | Automate deployments or migrations | Use for interactive tools only |
| **stop_powershell** | Terminate running command | YES | Kill production services | Use Stop-Process with specific PID only |

---

## GitHub Tools

| Tool | Purpose | Allowed | Forbidden | Conditions |
|---|---|---|---|---|
| **github-get_me** | Get authenticated user | YES | Share user data publicly | Informational only |
| **github-get_file_contents** | Read repo files | YES | Expose secrets | GREEN gate for public repos |
| **github-create_or_update_file** | Create/update file on repo | YES | .env files; secrets; main branch | Provide exact SHA for updates |
| **github-delete_file** | Delete file | RED | Delete without approval | YELLOW gate minimum |
| **github-create_branch** | Create feature branch | YES | Create on main; force create | Use feature/ or docs/ prefix |
| **github-list_commits** | List repo commits | YES | Share commit data publicly | Informational only |
| **github-list_branches** | List branches | YES | Share private branch names | Informational only |
| **github-search_code** | Search GitHub code | YES | Search across private repos without permission | PUBLIC repos only |
| **github-search_repositories** | Find repositories | YES | Expose private repos | PUBLIC search only |
| **github-create_pull_request** | Create PR | YES | Merge to main; create on main | Draft PRs OK; user reviews before merge |
| **github-merge_pull_request** | Merge PR | RED | Merge without Anthony approval | BLOCKED — agents do not merge |
| **github-pull_request_review_write** | Submit PR review | YES | Merge PRs; approve final | Reviews are findings only; not approvals |
| **github-run_secret_scanning** | Scan for secrets | YES | Export scanned content | Use on code only; not .env |
| **github-request_copilot_review** | Request Copilot review | YES | Merge PRs; skip human review | Automated feedback; human still reviews |

---

## Documentation and Knowledge Tools

| Tool | Purpose | Allowed | Forbidden | Conditions |
|---|---|---|---|---|
| **sql** | Query session database | YES | Store secrets; store .env values | Use for todos, tracking, temp data |
| **fetch_copilot_cli_documentation** | Get CLI docs | YES | Share docs publicly without license check | ALWAYS use before answering CLI questions |
| **web_fetch** | Fetch URLs | YES | Expose private URLs; fetch private data | PUBLIC URLs only; sanitize output |

---

## Workflow and Planning Tools

| Tool | Purpose | Allowed | Forbidden | Conditions |
|---|---|---|---|---|
| **ask_user** | Ask clarifying questions | YES | Make decisions for user | Use for design choices; not "proceed?" |
| **report_intent** | Update session intent | YES | Use in isolation; must batch with other tools | Always call with other tool calls |
| **exit_plan_mode** | Submit plan for approval | YES | Skip planning for YELLOW/RED tasks | Recommended for complex tasks |
| **skill** | Invoke specialized skills | YES | Invoke unapproved custom skills | Check available_skills list |
| **task** | Launch sub-agent | YES | Create unlimited sub-agents | Use for complex parallel work only |

---

## Hedera and Wallet Tools

| Tool | Purpose | Allowed | Forbidden | Conditions |
|---|---|---|---|---|
| **Any token mutation** | Mint, burn, transfer | RED | Transfer without approval | BLOCKED — Anthony approves only |
| **Any wallet operation** | Create, sign, spend | RED | Spend without approval | BLOCKED — Anthony approves only |
| **Hedera mainnet** | Live transactions | RED | Test on mainnet | BLOCKED — testnet only, and RED gate |
| **HCS/HTS operations** | Smart contracts | RED | Deploy without approval | BLOCKED — Anthony approves only |

---

## Discord Tools

| Tool | Purpose | Allowed | Forbidden | Conditions |
|---|---|---|---|---|
| **Discord role query** | Read role structure | YES | Query live without approval | Read-only informational |
| **Discord role mutation** | Change roles live | RED | Mutate without Anthony approval | BLOCKED — dry-run only |
| **Discord bot deployment** | Deploy bot | RED | Deploy without approval | BLOCKED — Anthony approves only |
| **Discord API calls** | Interaction with Discord | RED | Make live API calls | BLOCKED — dry-run only |

---

## Database and Schema Tools

| Tool | Purpose | Allowed | Forbidden | Conditions |
|---|---|---|---|---|
| **View schema** | Read Prisma schema | YES | Expose schema publicly | Informational; do not expose in public products |
| **Prisma validate** | Check schema validity | YES | Run format without approval | Validate only; use format only in approved scope |
| **Prisma format** | Format schema | YELLOW | Format without approval | YELLOW gate — must be in explicit task scope |
| **Prisma migrate** | Run migration | RED | Migrate without approval | BLOCKED — Anthony approves only |
| **Direct database access** | Query production DB | RED | Query without approval | BLOCKED — use service layer only |

---

## Secrets and Credentials

| Tool/Action | Purpose | Allowed | Forbidden | Conditions |
|---|---|---|---|---|
| **Read .env** | Reference variables | NO | NEVER read .env | Use .env.example only (structure, not values) |
| **Print secrets** | Output credentials | NO | NEVER print secrets | Request sanitized excerpts for logs |
| **Store secrets** | Keep credentials | NO | NEVER store in version control | Use secrets manager references |
| **Rotate secrets** | Change credentials | RED | Rotate without approval | BLOCKED — Anthony approves only |
| **Expose URLs** | Share endpoints | NO | Do NOT expose private URLs, webhook URLs, DB URLs | Public URLs only |

---

## Integration and External Tools

| Tool | Purpose | Allowed | Forbidden | Conditions |
|---|---|---|---|---|
| **MCP server** | Protocol extension | YES | Install without approval | Verify license and security first |
| **Third-party plugins** | Extend capabilities | YELLOW | Install without approval | Review security and dependencies |
| **AI service calls** | External APIs | NO | Call external services with repo data | BLOCKED — no third-party sharing |
| **Package managers** (npm, pip, go) | Install dependencies | YELLOW | Install without approval; add to production | Review before adding; security audit |

---

## Environment and System Tools

| Tool | Purpose | Allowed | Forbidden | Conditions |
|---|---|---|---|---|
| **Environment variables** | Read config | YES | Read .env | Use .env.example only for structure |
| **System commands** | Execute shell | YELLOW | Run without approval; system-wide changes | Use powershell with proper modes |
| **Service restart** | Restart services | RED | Restart without approval | BLOCKED — Anthony approves only |
| **File system ops** | Create, delete, modify | YES | Delete production data; modify system files | Scope to task repo only |

---

## Conditional Gates (YELLOW)

These tools require scope confirmation before use:

- **Prisma format:** Must be in explicit task scope
- **Package install:** Review dependencies and security first
- **Branch creation:** Use standard prefixes (feature/, docs/, fix/)
- **Delete files:** Must be in approved task scope
- **Config updates:** Non-secret only; review impact
- **Custom plugins:** Review license and security

---

## Blocked Gates (RED)

These tools are BLOCKED except with explicit Anthony approval:

- **Merge to main**
- **Production deployment**
- **Database migration**
- **Secret rotation**
- **Economy constant change**
- **Discord role mutation (live)**
- **Token operations (any)**
- **Wallet operations (any)**
- **Hedera mainnet transactions**
- **Service restart**
- **Direct database queries (production)**
- **Force push**
- **Destructive data operations**

---

## Matrix Summary

**When in doubt:**
1. Check this matrix
2. If not listed, assume BLOCKED
3. If YELLOW or RED: ask user or escalate to Anthony
4. If GREEN: proceed with caution; follow specific conditions
5. If not found, escalate to Anthony for guidance

**Never assume tool availability.** Verify tool exists before claiming output. Report absence explicitly. Do not fabricate results.

---

CNMA-v5.1 Addendum: Specialized Sub-Agent Tool Guidance

- Docs-only sub-agents may use read/create/edit tools for documentation changes. Any tool that performs runtime changes (github-create_or_update_file that would push, powershell that would deploy, github-merge_pull_request) remains RED or YELLOW per AGENTS.md.
- Social Media and Storefront planning personas MUST NOT call external posting APIs or storefront APIs. Use web_fetch only for public guidance.
- Security and Recovery personas may use scanning tools (github-run_secret_scanning) and powershell locally for reproduction, but must request sanitized logs and never expose secrets.

If a tool change or new tool allowance is proposed, follow AGENT_IMPROVEMENT_PROTOCOL.
