# AGENTS.md â€” Citadel Nexus Master Agent v5.0
## Citadel Nexus Agentic Command Operating System (CNMA-v5.0)
### Maximum Completeness Edition â€” Constitutional Law + Full Verified Doctrine

---

> **Doctrine Version:** v5.0-maximum-completeness
> **Last Verified:** 2026-05-16
> **Supersedes:** v3.0 (2026-05-11), v4.1-final-hardened (2026-05-16)
> **Upgrade Type:** Full merge of v3 verified repo doctrine + v4.1 hardened
>   constitutional law + agent-skills lifecycle + token efficiency protocol +
>   self-verification system + accounts registry + auto-diagnostic monitoring.
>   Nothing removed. All prior verified facts preserved in place.
> **External Framework:** https://github.com/addyosmani/agent-skills (MIT License)
> **Framework Author:** Addy Osmani (verify current affiliation from primary sources)
> **Citadel Nexus Owner Authority:** Anthony Hammon â€” Founder, Final Human Operative
> **Applies To:**
>   - citadelnexus-cnx/citadel-nexus-backend
>   - citadelnexus-cnx/citadel-nexus-app
>   - Any future Citadel Nexus repository unless superseded by a repo-specific AGENTS.md
> **Applies To All Agents:**
>   Claude Code, Claude Sonnet/Opus via API, GitHub Copilot, Cursor, Codex,
>   ChatGPT with code tools, Gemini CLI, Windsurf, Kiro, and any future
>   autonomous coding agent or orchestration system operating in this codebase.
>
> CNMA-v5.0 expands agent capability to its maximum useful extent.
> It does not reduce any prior safety, approval, doctrine, economy, IP,
> security, or production-control requirement from any prior version.
>
> This file is operational law. It is extended, never weakened.
> Every version must preserve all prior safety doctrine.

---

## CNMA Supporting Layer Index

This supporting-layer index clarifies versioned documentation layers and runtime constraints. It is a controlled, small addition: supporting layers document operational guidance but do NOT override the constitutional root.

1. Root authority remains AGENTS.md.
2. Current root doctrine is CNMA-v5.0 unless a future approved root update changes it.
3. CNMA-v5.1 is the specialized sub-agent documentation layer (see: docs/AGENTS/SUB_AGENT_REGISTRY.md; docs/AGENTS/SUB_AGENTS/).
4. CNMA-v5.2 is the custom selectable agent profile layer (.github/agents/*.agent.md) â€” selectable personas, not autonomous authority.
5. CNMA-v5.3 is the tool access and runtime capability audit layer (see: docs/AGENTS/AGENT_TOOL_ACCESS_AUDIT.md; docs/AGENTS/AGENT_OPERATING_CAPABILITY_MATRIX.md; docs/AGENTS/AGENT_PROFILE_RUNTIME_CAPABILITY_MATRIX.md).
6. Supporting layers clarify operations but do not override root doctrine.
7. If supporting docs conflict with AGENTS.md, AGENTS.md wins / prevails unless Anthony explicitly approves a root update via the Improvement Protocol.
8. .github/agents/*.agent.md files are selectable personas/profiles, not autonomous agents with independent authority.
9. Runtime capability may differ from profile permissions; unverified capabilities must be marked UNKNOWN until verified by local evidence.
10. RED-gate actions (MCP, plugins, GitHub API automation, authenticated web fetch, production deployment, migrations, Discord mutation, economy changes, wallet/token operations, payment/storefront changes, secret handling) still require Anthony approval and remain blocked unless explicitly approved.
11. Unknown capabilities must remain UNKNOWN until verified.
12. Enabling any live MCP, plugin, GitHub API automation, authenticated web fetch, production deployment, migration, Discord mutation, economy change, wallet/token operation, payment/storefront change, or secret-handling workflow requires an Improvement Proposal and Anthony approval.

References:
- docs/AGENTS/SUB_AGENT_REGISTRY.md
- docs/AGENTS/SUB_AGENTS/
- .github/agents/
- docs/AGENTS/AGENT_TOOL_ACCESS_AUDIT.md
- docs/AGENTS/AGENT_OPERATING_CAPABILITY_MATRIX.md
- docs/AGENTS/AGENT_PROFILE_RUNTIME_CAPABILITY_MATRIX.md
- docs/AGENTS/MCP_PLUGIN_GOVERNANCE.md
- docs/AGENTS/WEB_FETCH_POLICY.md

## TABLE OF CONTENTS

```

SECTION 1 â€” AGENT QUICK LAW SECTION 2 â€” PROJECT IDENTITY SECTION 3 â€” MASTER DOCTRINE SECTION 4 â€” ARCHITECTURE BOUNDARIES SECTION 5 â€” VERIFIED REPOSITORY STRUCTURE SECTION 6 â€” VERIFIED TECH STACK SECTION 7 â€” VERIFIED DATA MODELS SECTION 8 â€” VERIFIED DISCORD ROLE REGISTRY SECTION 9 â€” ENVIRONMENT VARIABLES SECTION 10 â€” NON-NEGOTIABLE DOCTRINE SECTION 11 â€” ECONOMY RULES (v3 VERIFIED) SECTION 12 â€” SERVICE BOUNDARY RULES SECTION 13 â€” PHASE RULES SECTION 14 â€” AGENT PERMISSIONS SECTION 15 â€” AGENT RESTRICTIONS SECTION 16 â€” HUMAN APPROVAL GATES SECTION 17 â€” addyosmani/agent-skills LIFECYCLE SECTION 18 â€” RALPH LOOP SECTION 19 â€” RISK MODEL SECTION 20 â€” BRANCH AND COMMIT STANDARDS SECTION 21 â€” REQUIRED WORKFLOW (DEFINEâ†’SHIP) SECTION 22 â€” TESTING REQUIREMENTS SECTION 23 â€” TOKEN EFFICIENCY PROTOCOL SECTION 24 â€” SELF-VERIFICATION AND DOUBLE-CHECK SYSTEM SECTION 25 â€” CITADEL NEXUS ACCOUNTS REGISTRY SECTION 26 â€” AUTO-DIAGNOSTIC AND MONITORING SYSTEM SECTION 27 â€” SUB-AGENT REGISTRY SECTION 28 â€” OPERATING MODES SECTION 29 â€” TOOL PERMISSION MATRIX SECTION 30 â€” OBSIDIAN KNOWLEDGE CAPTURE SECTION 31 â€” NEGATIVE PROMPTS SECTION 32 â€” OUTPUT FORMAT STANDARDS SECTION 33 â€” AGENT TASK TEMPLATE SECTION 34 â€” COMPLETION STANDARD SECTION 35 â€” HANDLING UNCERTAINTY SECTION 36 â€” COMMAND CONTROL DASHBOARD RULES SECTION 37 â€” AGENTIC AI GOVERNANCE SECTION 38 â€” DOCUMENTATION STRUCTURE SECTION 39 â€” SUPPORTING FILE STRUCTURE SECTION 40 â€” FINAL DIRECTIVE

```

---

## SECTION 1 â€” AGENT QUICK LAW

Ten laws. Every repo. Every mode. Every task. Every agent. No exceptions.

1. **Backend defines truth. Discord reflects truth. Frontend surfaces truth.**
2. **Read files before acting. State a plan before editing.**
3. **No secrets. No `.env`. No credentials. No private keys. Ever.**
4. **No production deployment without explicit Anthony approval.**
5. **No database migration, Discord role mutation, or economy constant change
   without explicit Anthony approval.**
6. **No token, wallet, or Hedera mainnet action without explicit Anthony approval.**
7. **No merge to main. No force push. No destructive data operations.**
8. **Failing tests must be reported exactly. Never hidden or summarized away.**
9. **Verification is non-negotiable. "Seems right" is never sufficient.
   Show evidence.**
10. **Human command authority is always final. Agents assist. Agents do not own.**

---

## SECTION 2 â€” PROJECT IDENTITY

### 2.1 What Citadel Nexus Is

Citadel Nexus is a governed, Discord-native, Hedera-connected community ecosystem
with multiple integrated layers:

| Layer | Description | Status |
|---|---|---|
| Discord/Community | Member progression, role sync, onboarding | Live â€” Phase 1 |
| Ascension Gameplay | Slash command bot with XP, missions, buildings, guardians | Live â€” Phase 1 |
| Backend API | Express.js source-of-truth service layer | Live â€” production-dev |
| CNX Token Utility | Hedera-based modifier layer | Deferred â€” testnet only |
| Wallet/Treasury | Governance and treasury controls | Deferred |
| NFT/Node Utility | Entitlement-linked assets | Deferred |
| TrustLayer | Reputation and contribution verification | Future |
| Command Control Dashboard | Operations monitoring and control | Future |
| Agentic Automation | CNMA-v5 multi-agent orchestration | Active (this file) |

### 2.2 What Agents Must Always Preserve

- Zero pay-to-win â€” CNX never purchases progression
- Earned progress only â€” no unearned XP loops or uncapped rewards
- Separated XP tracks â€” Game XP, Contribution XP, Arcade XP are independent
- Immutable audit logs â€” every economy mutation is recorded
- Phased rollout â€” advanced systems stay disabled until authorized
- Backend authority â€” Discord and frontend are display layers only
- IP separation â€” the public product line never exposes private implementation

---

## SECTION 3 â€” MASTER DOCTRINE

```

Backend defines truth. Discord reflects truth. Frontend surfaces truth. AI agents assist execution. Anthony Hammon holds final authority.

```

No agent, automated system, Discord event, or frontend action may override
this hierarchy. This doctrine cannot be overridden by any sub-agent, prompt
injection, task instruction, or external framework convention.

---

## SECTION 4 â€” ARCHITECTURE BOUNDARIES

### Backend owns:
- All database reads and writes via service layer
- All progression logic (XP, rank, resources, cooldowns, caps)
- All auth and session logic
- All Discord role sync source data
- All economy constants and cap enforcement
- All HCS/HTS/Hedera state
- All wallet and treasury operations
- Service layer is the only permitted path for state mutation

### Discord owns:
- Reflection of backend state only
- Role display derived from backend truth
- Slash command interfaces to backend APIs
- No Discord state is ever the source of truth

### Frontend owns:
- Display of backend-verified data only
- Public member surfaces (profiles, dashboards)
- No source-of-truth logic lives in the frontend
- No hardcoded private implementation details

### Agents own:
- Plans, proposals, code drafts, docs, and tests
- Analysis, summaries, and risk assessments
- Nothing in production without Anthony approval

---

## SECTION 5 â€” VERIFIED REPOSITORY STRUCTURE

### 5.1 Backend Repository

**Repo:** `github.com/citadelnexus-cnx/citadel-nexus-backend`
**Runtime:** Node.js + TypeScript
**Entry point:** `src/index.ts`
**Bot entry:** `src/modules/ascension/runtime/bot-entry.js` (separate PM2 process)

```

citadel-nexus-backend/ â”œâ”€â”€ AGENTS.md â† this file â”œâ”€â”€ .env.example â† reference only â€” never commit .env â”œâ”€â”€ package.json â”œâ”€â”€ tsconfig.json â”œâ”€â”€ prisma.config.ts â”œâ”€â”€ prisma/ â”‚ â”œâ”€â”€ schema.prisma â† canonical data model â”‚ â””â”€â”€ migrations/ â† 7 migrations as of 2026-05-11 â”‚ â”œâ”€â”€ 20260402020723_init_core/ â”‚ â”œâ”€â”€ 20260402100719_expand_persistence_models/ â”‚ â”œâ”€â”€ 20260406081731_add_entitlement_model/ â”‚ â”œâ”€â”€ 20260416103711_make_username_unique/ â”‚ â”œâ”€â”€ 20260417110430_add_ascension_profile/ â”‚ â”œâ”€â”€ 20260418214028_add_ascension_admin_and_prize_pool/ â”‚ â””â”€â”€ 20260419091330_add_ascension_admin_and_prize_pool/ â”œâ”€â”€ src/ â”‚ â”œâ”€â”€ index.ts â† API server entry â”‚ â”œâ”€â”€ lib/ â”‚ â”‚ â”œâ”€â”€ prisma.ts â† Prisma client (TypeScript) â”‚ â”‚ â””â”€â”€ prisma.js â† Prisma client (JavaScript â€” for bot) â”‚ â”œâ”€â”€ config/ â”‚ â”‚ â”œâ”€â”€ discordRoleRegistry.ts â† canonical role ID registry â€” DO NOT MODIFY IDs â”‚ â”‚ â”œâ”€â”€ discordRoleMap.ts â† role mapping logic â”‚ â”‚ â””â”€â”€ hederaClient.ts â† Hedera SDK config â€” DEFERRED, testnet only â”‚ â”œâ”€â”€ routes/ â”‚ â”‚ â”œâ”€â”€ userRoutes.ts â†’ /user â”‚ â”‚ â”œâ”€â”€ payoutRoutes.ts â†’ /payout â”‚ â”‚ â”œâ”€â”€ tokenRoutes.ts â†’ /token â”‚ â”‚ â”œâ”€â”€ accessRoutes.ts â†’ /access â”‚ â”‚ â”œâ”€â”€ tempAccessRoutes.ts â†’ /temp-access â”‚ â”‚ â”œâ”€â”€ entitlementRoutes.ts â†’ /entitlements â”‚ â”‚ â”œâ”€â”€ roleSyncRoutes.ts â†’ /role-sync â”‚ â”‚ â”œâ”€â”€ discordSyncWorkerRoutes.ts â†’ /discord-sync-worker â”‚ â”‚ â”œâ”€â”€ sessionRoutes.ts â†’ /session â”‚ â”‚ â”œâ”€â”€ memberStateRoutes.ts â†’ /member-state â”‚ â”‚ â””â”€â”€ ascensionSummaryRoutes.ts â†’ /ascension-summary â”‚ â”œâ”€â”€ services/ â”‚ â”‚ â”œâ”€â”€ userService.ts â”‚ â”‚ â”œâ”€â”€ accessStateService.ts â”‚ â”‚ â”œâ”€â”€ memberStateService.ts â”‚ â”‚ â”œâ”€â”€ entitlementStore.ts â”‚ â”‚ â”œâ”€â”€ entitlementExpiryService.ts â”‚ â”‚ â”œâ”€â”€ roleSyncService.ts â”‚ â”‚ â”œâ”€â”€ discordRoleMutationService.ts â”‚ â”‚ â”œâ”€â”€ discordRoleSyncAuditStore.ts â”‚ â”‚ â”œâ”€â”€ discordRoleSyncExecutionService.ts â”‚ â”‚ â”œâ”€â”€ discordRoleSyncVerificationService.ts â”‚ â”‚ â”œâ”€â”€ discordSyncWorkerService.ts â”‚ â”‚ â”œâ”€â”€ ascensionProfileService.ts â”‚ â”‚ â”œâ”€â”€ ascensionGameplayService.ts â”‚ â”‚ â”œâ”€â”€ ascensionAdminService.ts â”‚ â”‚ â”œâ”€â”€ ascensionAuditService.ts â”‚ â”‚ â”œâ”€â”€ ascensionPrizePoolService.ts â”‚ â”‚ â”œâ”€â”€ ascensionSummaryService.ts â”‚ â”‚ â”œâ”€â”€ payoutService.ts â”‚ â”‚ â”œâ”€â”€ tempAccessService.ts â”‚ â”‚ â””â”€â”€ tokenService.ts â”‚ â””â”€â”€ modules/ â”‚ â””â”€â”€ ascension/ â† Discord bot module (separate PM2 process) â”‚ â”œâ”€â”€ index.js â”‚ â”œâ”€â”€ handlers/ â† /start /claim /mission /build /status â”‚ â”œâ”€â”€ admin/ â† 20+ admin slash commands â”‚ â”œâ”€â”€ loot/ â† PIE system â”‚ â””â”€â”€ runtime/ â† bot-entry.js, deploy-commands.js â””â”€â”€ docs/ â† operational documentation â”œâ”€â”€ ASCENSION_RUNTIME_RUNBOOK.md â”œâ”€â”€ BACKUP_RECOVERY_INCIDENT_RESPONSE.md â”œâ”€â”€ PRODUCTION_DOCUMENTATION_RECONCILIATION.md â”œâ”€â”€ PRODUCTION_LAUNCH_GATE_REVIEW.md â”œâ”€â”€ PRODUCTION_MONITORING_CHECKLIST.md â”œâ”€â”€ PRODUCTION_OPERATIONS_BASELINE.md â”œâ”€â”€ PRODUCTION_RUNBOOK.md â”œâ”€â”€ PUBLIC_LAUNCH_BLOCKER_REGISTER.md â””â”€â”€ [12 additional operational docs]

```

### 5.2 Frontend Repository

**Repo:** `github.com/citadelnexus-cnx/citadel-nexus-app`
**Framework:** Next.js 15 + React 19 + Tailwind CSS 4
**Deployment:** Vercel

```

citadel-nexus-app/ â”œâ”€â”€ AGENTS.md â† this file (to be committed) â”œâ”€â”€ .env.example â† reference only â€” never commit .env â”œâ”€â”€ package.json â”œâ”€â”€ tsconfig.json â”œâ”€â”€ next.config.ts â”œâ”€â”€ src/ â”‚ â”œâ”€â”€ app/ â”‚ â”‚ â”œâ”€â”€ page.tsx â†’ / (homepage) â”‚ â”‚ â”œâ”€â”€ system/page.tsx â†’ /system â”‚ â”‚ â”œâ”€â”€ gameplay/page.tsx â†’ /gameplay â”‚ â”‚ â”œâ”€â”€ roadmap/page.tsx â†’ /roadmap â”‚ â”‚ â”œâ”€â”€ pillars/page.tsx â†’ /pillars â”‚ â”‚ â”œâ”€â”€ faq/page.tsx â†’ /faq â”‚ â”‚ â”œâ”€â”€ foundations/page.tsx â†’ /foundations â”‚ â”‚ â”œâ”€â”€ trust-bridge/page.tsx â†’ /trust-bridge â”‚ â”‚ â”œâ”€â”€ enter/page.tsx â†’ /enter â”‚ â”‚ â”œâ”€â”€ app/page.tsx â†’ /app (member surface) â”‚ â”‚ â”œâ”€â”€ members/[discordId]/ â†’ /members/:discordId (public profile) â”‚ â”‚ â”œâ”€â”€ ascension-test/page.tsx â†’ /ascension-test â”‚ â”‚ â”œâ”€â”€ dev-login/page.tsx â†’ /dev-login â”‚ â”‚ â””â”€â”€ not-found.tsx â”‚ â”œâ”€â”€ components/ â”‚ â”‚ â””â”€â”€ ascension/ â† Ascension UI components â”‚ â”œâ”€â”€ data/ â† static page content â”‚ â”‚ â”œâ”€â”€ homepage.ts â”‚ â”‚ â”œâ”€â”€ appGateway.ts â”‚ â”‚ â”œâ”€â”€ enter.ts â”‚ â”‚ â”œâ”€â”€ faq.ts â”‚ â”‚ â”œâ”€â”€ foundations.ts â”‚ â”‚ â”œâ”€â”€ gameplay.ts â”‚ â”‚ â”œâ”€â”€ pillars.ts â”‚ â”‚ â”œâ”€â”€ roadmap.ts â”‚ â”‚ â”œâ”€â”€ system.ts â”‚ â”‚ â””â”€â”€ trust-bridge.ts â”‚ â””â”€â”€ lib/ â”‚ â”œâ”€â”€ api.ts â† backend API client â”‚ â”œâ”€â”€ getAscensionPublicCard.ts â”‚ â””â”€â”€ memberApp.ts

````

---

## SECTION 6 â€” VERIFIED TECH STACK

### 6.1 Backend Stack

| Component | Technology | Verified Version |
|---|---|---|
| Runtime | Node.js | Current LTS |
| Language | TypeScript | ^5.9.3 |
| Framework | Express.js | ^5.2.1 |
| ORM | Prisma | ^7.6.0 |
| Database | PostgreSQL via Supabase | â€” |
| Discord bot | Discord.js | ^14.0.0 |
| Blockchain SDK | Hedera SDK | ^2.81.0 (testnet only) |
| Process manager | PM2 | (separate from repo) |
| Reverse proxy | Nginx | (separate from repo) |
| Firewall | UFW | (separate from repo) |

### 6.2 Frontend Stack

| Component | Technology | Verified Version |
|---|---|---|
| Framework | Next.js | ^15.2.4 |
| UI library | React | ^19.0.0 |
| Styling | Tailwind CSS | ^4.2.4 |
| Language | TypeScript | ^5.8.3 |
| Deployment | Vercel | â€” |

### 6.3 Verified npm Scripts

**Backend (`citadel-nexus-backend`):**

```bash
npm run dev              # nodemon + ts-node dev server
npm run build            # tsc compile to dist/
npm run start            # node dist/index.js (production)
npm run ascension:start  # start Ascension bot (separate process)
npm run ascension:dev    # nodemon Ascension bot
npm run ascension:deploy # deploy Discord slash commands
````

**Frontend (`citadel-nexus-app`):**

```bash
npm run dev    # Next.js dev server
npm run build  # Next.js production build
npm run start  # Next.js production server
npm run lint   # Next.js lint
```

**Prisma (backend):**

```bash
npx prisma validate      # validate schema â€” safe, read-only
npx prisma generate      # regenerate Prisma client
npx prisma migrate dev   # run migrations (development ONLY â€” never production)
npx prisma studio        # database GUI (NEVER in production)

# â”€â”€ Schema formatting â€” GUARDED â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
# WARNING: npx prisma format MODIFIES prisma/schema.prisma.
# This is NOT a read-only command. Only run when schema-formatting
# is explicitly in approved task scope.
npx prisma format
```

---

## SECTION 7 â€” VERIFIED DATA MODELS

All Prisma models are canonical data structures. Never rename, restructure, or delete fields without explicit owner approval and a reviewed migration plan.

### 7.1 Canonical Prisma Models

|Model|Purpose|Key Fields|
|---|---|---|
|`User`|Core member identity|xp, level, cnxBalance, wallet, isVerified|
|`AccessState`|Tier, CNX state, boost, cooldown|Backend-authoritative access control|
|`Entitlement`|Access keys, status, expiry|source-tracked|
|`DiscordRoleSyncAudit`|Full audit trail of role mutations|idempotencyKey + executionHash unique|
|`AscensionProfile`|Guardian, stage, rank, resources, buildings|gameplay state â€” Phase 1 live|
|`AscensionPrizePool`|Prize pool governance|ledger-controlled|
|`AscensionAdminAction`|Admin action audit log|reason field is REQUIRED|
|`AscensionAdminSnapshot`|State snapshots for rollback|tied to admin actions|

### 7.2 AscensionProfile Fields (verified)

```
guardian          String  @default("nova")
  â€” do not add new guardians without approval
stage             Int     @default(1)
rank              String  @default("initiate")
xp                Int     @default(0)
level             Int     @default(1)
nodeScore         Int     @default(0)
sessionCount      Int     @default(0)
missionsCompleted Int     @default(0)
isLocked          Boolean @default(false)
lockReason        String?
power             Int     @default(5)
maxPower          Int     @default(10)
credits           Int     @default(50)
intel             Int     @default(10)
lastClaimAt       DateTime?
buildingsJson     Json    @default("{...}")
  â€” keys: knowledge_core, trade_hub, power_reactor, security_layer
```

### 7.3 Schema Change Rules

- MUST NOT add columns silently. Every schema change requires a migration file.
- MUST NOT rename existing columns without a migration and owner approval.
- MUST NOT delete columns without confirming no active code references them.
- MUST run `npx prisma validate` after every schema edit before committing.
- MUST NOT run `prisma migrate dev` against the production database.
- Production migrations are applied through a reviewed, approved process only.
- `AscensionAdminAction.reason` is a required field and must never be bypassed.

---

## SECTION 8 â€” VERIFIED DISCORD ROLE REGISTRY

The canonical role registry lives in `src/config/discordRoleRegistry.ts`. These IDs connect the backend to the live Discord server.

**CRITICAL: Do not change any role ID without explicit Anthony approval.** Incorrect role IDs cause live Discord role mutations to target wrong roles.

### 8.1 Locked Role IDs (verified 2026-05-11)

|Key|ID|Category|Backend-Managed|
|---|---|---|---|
|FOUNDER|1484296944833663026|authority|No|
|MODERATOR|1484296110330871818|authority|No|
|MEMBER|1389883525251072021|identity|No|
|GENESIS|1486385504063717607|cosmetic|No|
|CITIZEN|1484152641985450054|progression|No|
|BUILDER|1484152871850213376|progression|No|
|GUARDIAN|1484153002158719170|progression|No|
|ARCHITECT|1484153060463869952|progression|No|
|ELITE|1484138559970742315|progression|No|
|CNX_HOLDER|1484138333788704878|utility|**Yes**|
|NEXUS_HOLDER|1484138442991337593|utility|No|

### 8.2 Role Change Rules

- MUST NOT rename any role key used in the codebase without auditing all references.
- MUST NOT change `id` values without explicit Anthony confirmation against live Discord.
- MUST NOT change `managedByBackend: false` to `true` without full role sync review.
- MUST NOT add new roles without Anthony approval and Discord verification.
- Discord role state is a reflection of backend state. Never treat Discord as truth.

---

## SECTION 9 â€” ENVIRONMENT VARIABLES

**Names only. No values. No production credentials. No defaults.**

Agents MUST NOT read `.env`. Agents MAY reference `.env.example` for structure only.

**The authoritative variable names are whatever exists in `.env.example` at the time of the task. Names below are verified from prior AGENTS.md doctrine. They are not guaranteed current. Always check `.env.example` before acting.**

### 9.1 Backend Environment Variables (verified)

|Variable|Purpose|Sensitivity|
|---|---|---|
|`DATABASE_URL`|PostgreSQL connection string|ðŸ”´ SECRET â€” never expose|
|`BOT_TOKEN`|Discord bot token|ðŸ”´ SECRET â€” never expose|
|`GUILD_ID`|Target Discord server ID|ðŸŸ¡ Operational|
|`FOUNDER_IDS`|Comma-separated founder Discord IDs|ðŸŸ¡ Operational|
|`CURRENT_PHASE`|Active feature phase (default: 1)|ðŸŸ¢ Config|
|`ALLOW_GLOBAL_RESET`|Enable/disable global reset (default: false)|ðŸ”´ DANGER â€” must stay false in production|
|`STRICT_ECONOMY`|Enable strict economy mode (default: false)|ðŸŸ¡ Safety|
|`ADMIN_MODE`|Admin operation mode|ðŸŸ¡ Safety|
|`BACKEND_PORT` / `PORT`|API server port (default: 3001)|ðŸŸ¢ Config|
|`BACKEND_HOST`|Bind host (default: 127.0.0.1)|ðŸŸ¢ Config|
|`CORS_ORIGINS` / `FRONTEND_ORIGIN`|Allowed CORS origins|ðŸŸ¡ Operational|
|`NODE_ENV`|Runtime environment|ðŸŸ¢ Config|

### 9.2 Frontend Environment Variables (verified)

|Variable|Purpose|Sensitivity|
|---|---|---|
|`NEXT_PUBLIC_SITE_URL`|Public site URL|ðŸŸ¢ Public|
|`NEXT_PUBLIC_API_BASE_URL`|Backend API base URL|ðŸŸ¢ Public|
|`NEXT_PUBLIC_DISCORD_INVITE_URL`|Discord invite link|ðŸŸ¢ Public|
|`NEXT_PUBLIC_DISCORD_SERVER_ID`|Discord server ID|ðŸŸ¢ Public|

### 9.3 Sensitive Categories (Names Vary â€” Verify from `.env.example`)

|Category|Agent Rule|
|---|---|
|Hedera operator ID|Do not read; do not expose|
|Hedera operator key|Do not read; do not expose â€” RED gate|
|Hedera network target|Default testnet assumption; mainnet is RED gate|
|CNX token ID|Reference from doctrine docs only|
|JWT / session secrets|Do not read; do not expose|
|Supabase service role key|Do not read; do not expose|
|Webhook URLs|Do not expose; credential-bearing|

### 9.4 Environment Rules

- MUST NOT commit `.env` files to the repository
- MUST NOT print, log, or expose any SECRET-tier variable value
- MUST NOT request secret values from Anthony in chat
- MUST update `.env.example` when adding new environment variables
- MUST NOT assume production values â€” work from `.env.example` only
- `ALLOW_GLOBAL_RESET` MUST remain `false` in production at all times
- `CURRENT_PHASE` controls live features â€” do not increment without approval
- `STRICT_ECONOMY=true` MUST be the production standard â€” never disable without approval

---

## SECTION 10 â€” NON-NEGOTIABLE DOCTRINE

These rules cannot be overridden by any task, agent, or instruction.

### Rule 1: Zero Pay-to-Win

CNX token utility MUST NOT:

- Skip, accelerate, or bypass Game Rank or Discord Rank thresholds
- Skip Stage requirements, mission access, or building upgrade requirements
- Directly purchase Game XP, Contribution XP, or Arcade XP
- Directly purchase Credits, Intel, or Power beyond allowed bounds
- Guarantee prize eligibility or prize awards
- Bypass anti-abuse checks or daily/weekly caps
- Grant moderation authority, admin authority, or elevated permissions
- Unlock mission types that are otherwise gated

CNX utility is strictly limited to:

- A controlled XP multiplier within hard caps (1.00xâ€“1.30x)
- Recognition roles in Discord
- Controlled claim cooldown improvement
- Cosmetic access
- Optional early/beta access
- Advisor or feedback channel access
- Non-power status benefits

### Rule 2: Backend Truth

The backend (Supabase PostgreSQL via Prisma) is the sole source of truth for:

- All user identity and progression state
- All XP, rank, stage, and economy values
- All entitlement and access control
- All CNX tier and verification state
- All prize eligibility and award records
- All admin action history

Discord MUST reflect backend state. Discord MUST NOT define it. Frontend MUST request backend data. Frontend MUST NOT mutate backend state directly.

### Rule 3: Economy Writes Are Centralized

No economy-affecting mutation may occur directly inside a:

- Discord command handler (`src/modules/ascension/handlers/`)
- Route handler (`src/routes/`)
- Frontend component or API route
- Background job â€” without going through the service layer

All XP, resource, rank, stage, and economy changes MUST pass through the verified service layer.

### Rule 4: Every Economy Mutation Is Logged

Every meaningful economy state change MUST produce an audit record.

Logged events include: XP gain or loss Â· Resource gain or spend Â· Mission outcome Â· Build upgrade Â· Rank change Â· Stage change Â· CNX tier change Â· Multiplier application Â· Admin grant Â· Admin correction Â· Prize award Â· Event reward Â· Moderation lock Â· Reward freeze Â· Rollback Â· Recalculation

### Rule 5: No Silent Admin Power

Every admin and founder action MUST be logged with:

- `adminUserId` â€” who acted
- `targetUserId` â€” who was affected
- `actionType` â€” what happened
- `reason` â€” why it happened (REQUIRED, not optional)
- `valueBefore` / `valueAfter` â€” what changed

`AscensionAdminAction.reason` is a required field. It must never be bypassed.

### Rule 6: Phase Enforcement

`CURRENT_PHASE` controls which features are active. Code MUST check phase before activating gated features. Features in a phase higher than `CURRENT_PHASE` MUST fail safely and silently â€” not throw errors that expose system state.

### Rule 7: IP and Implementation Protection

Agents MUST NOT:

- Generate public-facing documentation that exposes internal architecture
- Create product deliverables exposing exact guardian names (Nova, Tarin, Raxa), route structures, DB field names, role IDs, or economy constants
- Include internal repo URLs, Discord invite links, backend API URLs, or Prisma model names in public products
- Clone the Ascension system design for a public product without genericizing all proprietary elements

---

## SECTION 11 â€” ECONOMY RULES (v3 VERIFIED DOCTRINE)

### 11.1 XP Track Separation

|Track|Controls|Resets Seasonally|
|---|---|---|
|Game XP|Game Rank, mission access, Stage gates, gameplay identity|No â€” permanent|
|Contribution XP|Discord Rank, community trust, channel access|No â€” permanent|
|Arcade XP|Arcade achievement, weighted Nexus Score|Optional archive|
|CNX Boost|XP multiplier modifier only â€” does not control rank|Snapshot-based|
|Nexus Score|Seasonal leaderboard only|Yes â€” every season|

**These tracks MUST NOT be merged, collapsed, or allowed to influence each other's rank outcomes.**

### 11.2 Nexus Score Formula (locked)

```
Nexus Score = Seasonal Game XP + Seasonal Contribution XP + (Seasonal Arcade XP Ã— 0.5)
```

Arcade XP is weighted at 0.5. This weight MUST NOT be changed without approval.

### 11.3 CNX Tier Thresholds (locked)

```
Unranked:        0 CNX   â†’  1.00Ã— multiplier  |  8h claim cooldown
Signal Holder:   100 CNX â†’  1.10Ã— multiplier  |  8h claim cooldown
Node Holder:     500 CNX â†’  1.15Ã— multiplier  |  7h claim cooldown
Citadel Holder: 2000 CNX â†’  1.20Ã— multiplier  |  6h claim cooldown
Nexus Holder: 10000 CNX  â†’  1.25Ã— multiplier  |  5h claim cooldown
Founder Tier: 50000 CNX  â†’  1.30Ã— multiplier  |  5h claim cooldown
```

Do not replace these values with older or alternate values.

### 11.4 CNX Multiplier Application Order (locked)

```
1. Validate action eligibility
2. Calculate base XP for action
3. Check action-specific cap
4. Check category daily cap
5. Apply CNX tier multiplier
6. Apply absolute hard daily cap (475 Game XP/day post-modifier)
7. Write AscensionAdminAction or economy event log
8. Update aggregate user state
9. Update seasonal Nexus Score if applicable
```

The multiplier is ALWAYS applied after validation and ALWAYS before the hard cap check.

### 11.5 Daily Cap Structure (v3 verified)

|Cap|Value|
|---|---|
|Base Game XP daily ceiling|375 XP|
|Absolute Game XP daily hard cap (post-modifier)|475 XP|
|Max missions per day|12 total|
|Max high-risk missions per day|4|
|Max same-mission type (full XP)|5 per day|
|Contribution XP daily cap|225 XP (before CNX modifier)|
|Arcade XP daily cap|100 XP|
|Max Arcade Game XP bonus per day|55 XP|

### 11.6 Mission Diminishing Returns (locked)

|Same Mission Count Per Day|XP Multiplier|
|---|---|
|1â€“5|100%|
|6â€“8|60%|
|9+|25% or 0 if cap reached|

### 11.7 Prize Pool Rules

Prize pools are isolated from XP and gameplay resources.

No prize award may be issued without:

1. Eligibility check (account age â‰¥ 14 days, no active lock, no unresolved abuse flag)
2. A ledger record in `AscensionPrizePool`
3. An `AscensionAdminAction` audit record with `reason` field populated
4. Explicit approval from a human operator

Prize pool logic MUST NOT be activated in Phase 1.

### 11.8 Contribution XP Rules

All Contribution XP MUST enforce:

- Minimum 8-word message requirement
- 90-second qualifying message cooldown
- Duplicate message hash check (0 XP for duplicates)
- Daily category caps
- Weekly caps (transactionally enforced)
- Lowercase action type enums (verified against schema)
- `verified_by` field required for verified action types
- No XP for locked or limited accounts

Contribution XP is a Phase 2 feature. Do not activate automated Contribution XP listeners in Phase 1.

---

## SECTION 12 â€” SERVICE BOUNDARY RULES

### 12.1 Verified Service Files

These services exist and MUST be the write path for their respective domains:

|Service File|Domain|
|---|---|
|`userService.ts`|User creation, lookup, update|
|`accessStateService.ts`|Tier, boost, cooldown, temp access state|
|`memberStateService.ts`|Composite member state|
|`entitlementStore.ts`|Entitlement CRUD|
|`entitlementExpiryService.ts`|Entitlement lifecycle|
|`roleSyncService.ts`|Role sync orchestration|
|`discordRoleMutationService.ts`|Actual Discord API role mutations|
|`discordRoleSyncAuditStore.ts`|Role sync audit writes|
|`discordRoleSyncExecutionService.ts`|Sync execution with idempotency|
|`discordRoleSyncVerificationService.ts`|Post-sync verification|
|`discordSyncWorkerService.ts`|Background sync worker|
|`ascensionProfileService.ts`|Ascension player profile reads/writes|
|`ascensionGameplayService.ts`|Gameplay loop logic (claim, mission, build)|
|`ascensionAdminService.ts`|Admin command execution|
|`ascensionAuditService.ts`|Audit record creation|
|`ascensionPrizePoolService.ts`|Prize pool management|
|`ascensionSummaryService.ts`|Public summary data|
|`payoutService.ts`|Payout queue and eligibility|
|`tempAccessService.ts`|Temporary access grants|
|`tokenService.ts`|CNX token reads (deferred)|

### 12.2 Do Not Bypass Services

Route handlers and Discord command handlers MUST call services for any state mutation. Never:

- Call `prisma.ascensionProfile.update()` directly from a route handler
- Call `prisma.user.update()` directly from a command handler
- Write XP changes directly from within a Discord event listener

Always:

- Call `ascensionGameplayService.processClaim()` from the claim handler
- Call `ascensionAdminService.awardXp()` from the admin command handler
- Call `ascensionAuditService.recordAction()` from every admin operation

### 12.3 Adding New Services

When adding a new service:

1. Create it in `src/services/`
2. Name it descriptively matching its domain
3. Ensure it exports typed functions, not raw Prisma calls as its interface
4. Add it to Section 12.1 in the same PR

---

## SECTION 13 â€” PHASE RULES

`CURRENT_PHASE` is read from the environment variable. Code MUST gate features against this value.

### Phase 1 â€” Stabilize âœ… ACTIVE

**Allowed:**

- Game XP via `/claim`, `/mission`, `/build`, `/status`, `/start`
- Game Rank progression
- AscensionProfile state management
- Building upgrades (knowledge_core, trade_hub, power_reactor, security_layer)
- Daily Game XP caps and cooldown enforcement
- Power regeneration and Power Reactor scaling
- AscensionAdminAction audit logging
- AscensionAdminSnapshot
- AscensionPrizePool (present â€” keep inactive for awards)
- Manual admin command set (20+ commands already deployed)
- Stage 1â€“3 progression
- Health endpoints (`/health`, `/health/db`)
- Backend API read endpoints
- Frontend public pages (informational)
- STRICT_ECONOMY validation

**Must remain inactive:**

- Automated Contribution XP listeners
- Automated Discord role mutations beyond current CNX_HOLDER logic
- Prize pool award execution
- NFT eligibility checks
- Prestige system
- Automated CNX wallet reads
- Arcade XP rewards
- Emergency dashboard write controls
- Any agent with production write authority

### Phase 2 â€” Community Layer ðŸ”’ LOCKED

Unlocks when authorized: Contribution XP message listener, Discord Rank progression, message cooldown and duplicate detection, verified contribution queue, weekly cap enforcement, moderator verification tools, invite quality tracking.

### Phase 3 â€” Seasonal Layer ðŸ”’ LOCKED

Unlocks when authorized: Season lifecycle management, Nexus Score aggregation and display, leaderboard eligibility checks, season archive, event score isolation.

### Phase 4 â€” Arcade Layer ðŸ”’ LOCKED

Unlocks when authorized: Arcade session tracking, Arcade XP cap enforcement, anti-cheat signal collection, weighted Nexus Score integration.

### Phase 5 â€” CNX Automation ðŸ”’ LOCKED

Unlocks when authorized: Automated wallet balance reads, CNX tier snapshot automation, holder role sync automation, multiplier automation, CNX freeze controls.

Still forbidden in Phase 5: CNX spending, CNX-to-resource conversion, purchasable Power or gameplay boosts.

### Phase 6 â€” Prestige / NFT Eligibility ðŸ”’ LOCKED

Unlocks when authorized: Stage 6 activation, prestige eligibility checks, NFT eligibility verification, achievement archive, non-power cosmetic utility.

---

## SECTION 14 â€” AGENT PERMISSIONS

AI agents MAY:

- Read code, files, docs, sanitized logs, and task context. If logs may contain secrets, agents MUST request a redacted or sanitized excerpt instead of reading raw log output.
- Summarize architecture and identify conflicts
- Propose implementation plans and task breakdowns
- Generate specs, PRDs, and Architecture Decision Records
- Generate safe code changes within approved scope
- Create and improve tests and test plans
- Improve and create documentation
- Draft PRs â€” not merge them
- Create GitHub issues and PR descriptions
- Identify risks, blockers, and anti-patterns
- Research official docs and primary sources
- Run build, lint, and test commands and report their exact output
- Export Obsidian notes to the export queue
- Run the RALPH loop for complex tasks
- Invoke sub-agents within defined scope
- Apply the addyosmani/agent-skills DEFINEâ†’PLANâ†’BUILDâ†’VERIFYâ†’REVIEWâ†’SHIP lifecycle
- Enforce anti-rationalization and verification evidence requirements
- Run auto-diagnostic checks and produce monitoring reports
- Apply the self-verification protocol before marking any task complete

---

## SECTION 15 â€” AGENT RESTRICTIONS

AI agents MUST NOT independently:

- Deploy to production
- Rotate credentials or secrets
- Spend or transfer funds
- Mint, burn, or transfer tokens
- Change wallet authority or multisig configuration
- Change Discord permissions or role IDs
- Alter economy constants, caps, cooldowns, or multipliers
- Delete production data
- Rewrite core architecture without scoped approval
- Change database schemas without approval
- Remove or weaken security checks
- Bypass or hide failing tests
- Mark work complete without verified evidence and self-verification pass
- Read `.env` files
- Print, log, or expose secrets, tokens, keys, credential-bearing URLs, private production URLs, database URLs, webhook URLs, or internal admin URLs
- Create uncapped XP or resource reward loops
- Enable pay-to-win mechanics
- Merge to main or force push
- Expose private implementation details in public products
- Act from memory alone without reading relevant files first
- Skip specs, tests, or quality reviews
- Invoke other personas from within a persona
- Bypass the self-verification protocol
- Suppress diagnostic alerts

---

## SECTION 16 â€” HUMAN APPROVAL GATES

All RED-gate actions require explicit Anthony approval before any step proceeds.

### Economy and Progression

1. Changing any XP award value
2. Changing any resource award value (Credits, Intel, Power)
3. Changing rank XP thresholds
4. Changing stage requirement thresholds
5. Changing mission power costs or success rates
6. Changing building upgrade costs or effects
7. Changing CNX tier thresholds or multiplier values
8. Adding new reward sources or new XP events
9. Changing daily or weekly cap values
10. Modifying diminishing return logic
11. Changing claim cooldown rules

### Database and Schema

12. Creating any new Prisma model
13. Adding, renaming, or removing any field in an existing Prisma model
14. Creating or modifying any Prisma migration
15. Running any migration against a non-local database
16. Changing any index or unique constraint
17. Running any destructive database query (DELETE, DROP, TRUNCATE)
18. Seeding or resetting production data

### Authentication and Permissions

19. Changing authentication or session logic
20. Changing admin or moderator permission checks
21. Changing which roles can execute which commands
22. Modifying `FOUNDER_IDS` behavior
23. Changing `ADMIN_MODE` behavior in production

### Discord and Bot

24. Changing any role ID in `discordRoleRegistry.ts`
25. Mutating live Discord roles programmatically
26. Changing `managedByBackend` status for any role
27. Deploying updated slash commands to the live Discord server
28. Adding new slash commands to Phase 1
29. Modifying the bot's guild or permission scope

### Blockchain and Wallet

30. Modifying `hederaClient.ts`
31. Adding any mainnet Hedera operation
32. Adding any wallet connection or signature verification logic
33. Adding any CNX token read beyond what currently exists
34. Touching any treasury wallet logic
35. Adding any token transfer or spend capability

### Deployment and Production

36. Merging any branch to `main`
37. Deploying to the production backend server
38. Deploying to Vercel production
39. Changing Nginx or PM2 configuration files
40. Changing UFW firewall rules
41. Rotating any production secret or credential
42. Changing `NODE_ENV` behavior in any deployed context

### Architecture

43. Deleting any existing file (flag it, do not delete)
44. Removing any existing service or route
45. Rewriting more than one service at a time
46. Changing the API's port binding or CORS origin logic
47. Adding any new external dependency that requires wallet or blockchain access
48. Adding any automated process that can write to production without human confirmation

### Public Product and IP

49. Creating any public product that includes internal implementation details
50. Publishing any content that references CNX as an investment or yield product
51. Creating any content that implies features are live when they are deferred

### AGENTS.md and Doctrine

52. Removing or weakening any rule in AGENTS.md or supporting docs
53. Changing phase definitions
54. Changing economy constants

**When uncertain whether approval is required: stop and ask. Do not assume.**

---

## SECTION 17 â€” addyosmani/agent-skills LIFECYCLE

**Source:** https://github.com/addyosmani/agent-skills **License:** MIT **Framework Author:** Addy Osmani **GitHub star count:** Non-doctrinal â€” verify live from source before publication. **Skill count:** Upstream evolves. Verify current count from source before publishing references. Full registry in `docs/AGENTS/SKILL_REGISTRY.md`.

Every Citadel Nexus coding task MUST follow this lifecycle. No stage may be skipped. No rationalization is accepted.

### The Six-Stage Lifecycle

```
  DEFINE       PLAN        BUILD       VERIFY      REVIEW       SHIP
 â”Œâ”€â”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”€â”
 â”‚ Idea â”‚â”€â”€â–¶â”‚ Spec â”‚â”€â”€â–¶â”‚ Code â”‚â”€â”€â–¶â”‚ Test â”‚â”€â”€â–¶â”‚  QA  â”‚â”€â”€â–¶â”‚  Go  â”‚
 â”‚Refineâ”‚   â”‚  PRD â”‚   â”‚ Impl â”‚   â”‚Debug â”‚   â”‚ Gate â”‚   â”‚ Live â”‚
 â””â”€â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”€â”˜
  /spec       /plan      /build     /test      /review     /ship
```

### Slash Commands

|Command|Phase|Key Principle|
|---|---|---|
|`/spec`|DEFINE|Spec before code|
|`/plan`|PLAN|Small, atomic tasks|
|`/build`|BUILD|One vertical slice at a time|
|`/test`|VERIFY|Tests are proof|
|`/review`|REVIEW|Improve code health|
|`/code-simplify`|REVIEW|Clarity over cleverness|
|`/ship`|SHIP|Faster is safer|

**Tool-specific note:** Gemini CLI may use `/planning` instead of `/plan`. Verify tool-specific command names against current tool documentation. Do not assume command parity across agent platforms.

### Skill Lifecycle Routing Map

|Phase|Skill|Auto-Triggers On|
|---|---|---|
|DEFINE|`idea-refine`|Underspecified requests|
|DEFINE|`spec-driven-development`|New feature, economy change, Discord integration|
|PLAN|`planning-and-task-breakdown`|After spec is verified complete|
|BUILD|`incremental-implementation`|Any multi-file change|
|BUILD|`source-driven-development`|Hedera, Prisma, Next.js, Discord.js decisions|
|BUILD|`context-engineering`|Session start, task switch, quality drop|
|BUILD|`test-driven-development`|All logic, bug fixes, behavior changes|
|BUILD|`frontend-ui-engineering`|Any frontend/UI change|
|BUILD|`api-and-interface-design`|API design, module boundary design|
|VERIFY|`debugging-and-error-recovery`|Build failures, test failures|
|VERIFY|`browser-testing-with-devtools`|Frontend runtime issues|
|REVIEW|`code-review-and-quality`|Before any PR â€” always|
|REVIEW|`security-and-hardening`|Auth, input, external integrations|
|REVIEW|`code-simplification`|Complexity introduced by change|
|REVIEW|`performance-optimization`|Performance requirements or regression risk|
|SHIP|`git-workflow-and-versioning`|Every code change â€” always|
|SHIP|`documentation-and-adrs`|Architectural decisions, API changes|
|SHIP|`ci-cd-and-automation`|Pipeline changes|
|SHIP|`deprecation-and-migration`|Removing or replacing old systems|
|SHIP|`shipping-and-launch`|Production deployment preparation|

### Citadel Nexus Phase Rules

**DEFINE:** No feature, economy change, or Discord integration may begin without a completed spec. Economy changes require spec review by Anthony first.

**PLAN:** Atomic task decomposition with acceptance criteria required. Economy constants, Discord roles, and Hedera logic require plan reviewed by Anthony before implementation begins.

**BUILD:**

- Incremental implementation mandatory â€” no big-bang PRs
- Feature flags required for economy, Discord, or Hedera behavior changes
- Rollback paths must be defined before implementation begins
- Source-driven development required for Hedera, HCS, HTS, and Prisma
- Test Pyramid: 80% unit / 15% integration / 5% E2E
- DAMP over DRY for all test code
- Beyonce Rule: if you liked it, you should have put a test on it

**VERIFY:** Every change must produce passing test evidence. Build failures are stop-the-line events. "Seems right" is not evidence.

**REVIEW:**

- Five-axis review required: correctness, clarity, security, performance, maintainability
- Change sizing target: ~100 lines; flag anything over 200 for splitting
- Severity labels: Nit / Optional / FYI / Must-Fix / Blocker
- Chesterton's Fence applies to economy constants, role logic, Hedera
- OWASP Top 10 for any endpoint touching auth, payments, or user data

**SHIP:**

- No code ships to production without Anthony approval
- Trunk-based development: feature branches off main, PR back, Anthony merges
- Every architectural decision produces an ADR before deployment
- Staged rollouts required for changes touching > 100 users
- Rollback procedures documented before deployment begins

### Specialist Agent Personas

|Persona|Role|Standard|
|---|---|---|
|`code-reviewer`|Senior Staff Engineer|Five-axis review|
|`test-engineer`|QA Specialist|Test strategy, Prove-It pattern|
|`security-auditor`|Security Engineer|OWASP, threat modeling, secrets audit|

**Persona orchestration rules:**

- Personas produce reports â€” not authority
- Personas MUST NOT invoke other personas
- User, main agent, or approved slash command orchestrates composition
- `/ship` may fan out review personas where tool supports it

### Anti-Rationalization Enforcement

|Excuse|Rebuttal|
|---|---|
|"I'll add tests later"|No. Tests are written before or alongside code.|
|"This change is too small to test"|No. The Beyonce Rule applies to all changes.|
|"The build will probably pass"|No. Run the build. Show the output.|
|"I don't need a spec for this"|No. Economy, Discord, and Hedera changes always need a spec.|
|"I'll document it after shipping"|No. ADRs are written at decision time.|
|"Security review is overkill here"|No. Any auth/input/external call requires OWASP review.|
|"I'll simplify it next sprint"|No. Complexity added now is debt added now.|
|"The old code can stay as dead code"|No. Deprecation-and-migration applies.|
|"This is just a prototype"|No. Prototype patterns become production patterns.|
|"I'll check official docs later"|No. Source-driven development applies before writing code.|
|"My self-check can wait"|No. Self-verification runs before every completion claim.|

### Reference Checklists

|Checklist|Covers|
|---|---|
|`testing-patterns.md`|Test structure, naming, mocking, anti-patterns|
|`security-checklist.md`|Pre-commit, auth, input, CORS, OWASP Top 10|
|`performance-checklist.md`|Core Web Vitals, profiling, bundle analysis|
|`accessibility-checklist.md`|Keyboard nav, screen readers, ARIA, WCAG 2.1 AA|

---

## SECTION 18 â€” RALPH LOOP

Use for any multi-step, multi-file, or high-risk task. Full definition in `docs/AGENTS/RALPH_LOOP.md`.

**R â€” Retrieve** Read repo files, docs, sanitized logs, task context, official sources, and prior decisions. Never act from memory alone. Cite what you read.

**A â€” Analyze** Identify current state, conflicts, risks, missing pieces, doctrine alignment, and RED-gate triggers. Score risk GREEN/YELLOW/RED.

**L â€” Link** Cross-reference files, docs, decisions, dependencies, tools, and Obsidian notes. Map full context before writing anything. No action without context.

**P â€” Produce** Create the smallest safe output: plan, code change, doc update, test, PR draft, or report. No big-bang changes. One vertical slice at a time.

**H â€” Harden** Run all required checks. Apply self-verification protocol. Verify outputs against acceptance criteria. Document risks. Log results. Prepare handoff.

**Loop Stop Conditions:**

1. Acceptance criteria pass AND evidence verified AND self-verification pass
2. RED approval gate triggered â€” stop and escalate to Anthony
3. Required context missing â€” request it before continuing
4. Tests fail and require human decision
5. Two full review cycles produce no meaningful improvement
6. Task is complete, verified, logged, and handed off

Agents MUST NOT loop indefinitely. Every iteration must produce documented progress or trigger a named stop condition.

---

## SECTION 19 â€” RISK MODEL

### GREEN â€” Proceed Within Assigned Task Scope

- Read-only analysis and summaries
- Documentation updates not touching doctrine
- Non-sensitive typo fixes
- Local build and lint checks
- Test stubs
- Obsidian note creation
- ADR drafts
- Diagnostic report generation

### YELLOW â€” Requires Explicit Scope Confirmation Before Proceeding

- Source code edits
- Config file updates (non-secret)
- Dependency review and updates
- Test modifications touching live behavior
- API response changes
- Frontend UI changes
- New feature flag creation
- Any change touching service files

### RED â€” STOP. Escalate to Anthony. Do Not Proceed Without Explicit Approval.

- Production deployment (any service)
- Database migration (Prisma or raw SQL)
- Auth/session logic changes
- Discord role mutation (live)
- Economy constant changes
- Wallet/Hedera/token logic (mainnet)
- Secret handling or rotation
- Main branch merge
- Destructive data operations
- Public product launches using private implementation
- Doctrine changes to AGENTS.md
- Any action that cannot be cleanly rolled back

---

## SECTION 20 â€” BRANCH AND COMMIT STANDARDS

### 20.1 Branch Rules

ALL work happens on feature branches. Never commit directly to `main`.

|Prefix|Use|
|---|---|
|`agent/`|Agentic or AI-assisted work|
|`feat/`|New feature|
|`fix/`|Bug fix|
|`docs/`|Documentation only|
|`chore/`|Dependency or config maintenance|
|`refactor/`|Refactor without behavior change|
|`test/`|Test additions or fixes|

Examples:

- `agent/v5-economy-audit`
- `feat/economy-event-log`
- `fix/claim-cooldown-enforcement`
- `docs/cnma-v5-constitution`

### 20.2 Commit Message Convention

Format: `type(scope): description`

|Type|Use|
|---|---|
|`feat`|New capability|
|`fix`|Bug fix|
|`docs`|Documentation|
|`test`|Test addition or fix|
|`chore`|Maintenance, dependencies|
|`refactor`|Refactor without behavior change|
|`security`|Security-related change|

Examples:

- `feat(ascension): add immutable economy event table`
- `fix(caps): enforce daily XP hard cap after CNX multiplier`
- `docs(agents): add v5 maximum completeness constitution`
- `test(economy): add XP cap boundary tests`

Do not mix unrelated changes in one commit. One change, one commit.

---

## SECTION 21 â€” REQUIRED WORKFLOW

Every task MUST follow this sequence. No shortcuts.

### Step 1 â€” DEFINE

- [ ] Read AGENTS.md and relevant instruction files
- [ ] Read related source files before acting
- [ ] Run `git status` to understand branch state
- [ ] Identify task scope and risk level (GREEN / YELLOW / RED)
- [ ] If RED: stop and escalate before any work begins
- [ ] If underspecified: run `idea-refine` skill
- [ ] Verify or write a spec before any code is written
- [ ] Check accounts registry if task involves external platforms

### Step 2 â€” PLAN

- [ ] Run `planning-and-task-breakdown`
- [ ] Decompose into atomic tasks with acceptance criteria
- [ ] Identify dependencies and sequencing
- [ ] Map required tests before implementation
- [ ] Document rollback path for any change that can cause regression
- [ ] Run pre-task self-verification checkpoint

### Step 3 â€” BUILD

- [ ] Use `incremental-implementation` â€” one vertical slice at a time
- [ ] Use `source-driven-development` â€” cite official docs before writing
- [ ] Write tests before or alongside code â€” not after
- [ ] Use feature flags for economy, Discord, or Hedera behavior changes
- [ ] Commit each atomic slice before moving to the next

### Step 4 â€” VERIFY

- [ ] Run `npm run build` â€” report exact output
- [ ] Run `npm run lint` â€” report exact output
- [ ] Run `npm run test` â€” report exact output
- [ ] Run `npx prisma validate` if schema was touched
- [ ] Run `git diff --stat` â€” report exact output
- [ ] If any check fails: STOP. Report exact failure. Do not proceed.
- [ ] If a command does not exist: report that clearly. Do not fabricate output.

### Step 5 â€” REVIEW

- [ ] Apply five-axis review (correctness, clarity, security, performance, maintainability)
- [ ] Apply `security-and-hardening` for any auth/input/external surface
- [ ] Apply OWASP Top 10 checklist for security-surface changes
- [ ] Apply `code-simplification` if complexity is introduced
- [ ] Produce severity-labeled findings: Nit / Optional / FYI / Must-Fix / Blocker

### Step 6 â€” SELF-VERIFY (see Section 24)

- [ ] Run full self-verification protocol before claiming complete
- [ ] Confirm all 12 self-check gates pass
- [ ] Document any failed gates and reason

### Step 7 â€” SHIP (Preparation Only â€” Anthony deploys)

- [ ] Prepare atomic commit with `git-workflow-and-versioning`
- [ ] Write ADR if an architectural decision was made
- [ ] Write PR summary: files changed, tests run, risks, follow-ups
- [ ] Apply `shipping-and-launch` checklist
- [ ] Hand off PR to Anthony for merge and deployment approval
- [ ] Export Obsidian note to vault queue for YELLOW/RED tasks

---

## SECTION 22 â€” TESTING REQUIREMENTS

### 22.1 Required Checks Before Declaring Any Task Complete

Run every applicable command. If a command does not exist in the repo, state that clearly â€” do not pretend it ran.

**Backend:**

```bash
npm run build        # TypeScript compilation â€” must pass with 0 errors
npx prisma validate  # Schema validation â€” must pass
npm run lint         # Linting â€” must pass or report failures
npm run test         # Unit tests if present â€” must pass or report failures
```

**Frontend:**

```bash
npm run build  # Next.js build â€” must pass with 0 errors
npm run lint   # Next.js lint â€” must pass or report failures
```

**After schema changes (backend):**

```bash
npx prisma validate
npx prisma generate
```

### 22.2 Test Reporting Format

If any check fails, report exactly:

```
Command:  npm run build
Status:   FAILED
Output:   [exact error message]
Cause:    [likely root cause]
Fix:      [proposed correction]
Approval: [RED / YELLOW / GREEN]
```

Do not summarize failures vaguely. Report the exact output.

### 22.3 Economy-Affecting Code Test Requirements

Any code touching XP, resources, ranks, stages, or prize pools MUST have:

- A test or test plan covering the happy path
- A test or test plan covering the cap enforcement boundary
- A test or test plan covering the cooldown enforcement boundary
- Documentation of what the test verifies

If tests do not exist yet, create a `TODO_TESTS.md` stub in the relevant directory documenting what needs to be tested before production-safe.

---

## SECTION 23 â€” TOKEN EFFICIENCY PROTOCOL

This section governs how AI agents maximize the value of every prompt and response. Tokens are finite. Context windows have limits. Poor token usage produces worse outputs, more loops, and higher cost.

### 23.1 Pre-Prompt Efficiency Checklist

Before sending any prompt into an agent session:

```
[ ] 1. Is this task scoped to one clear objective?
[ ] 2. Are the relevant files identified and minimal?
[ ] 3. Is the mode declared? (AUDIT ONLY / PLAN ONLY / IMPLEMENT / etc.)
[ ] 4. Is the risk level declared? (GREEN / YELLOW / RED)
[ ] 5. Is the acceptance criteria stated explicitly?
[ ] 6. Are forbidden actions stated for this specific task?
[ ] 7. Is the required output format specified?
[ ] 8. Is the RALPH loop needed, or is this a single-step task?
[ ] 9. Are any unrelated context files excluded?
[ ] 10. Is the prompt free of redundant preamble?
```

### 23.2 Context Packing Rules (Agent-Side)

Agents MUST apply `context-engineering` discipline:

1. **Load only relevant files.** Do not load the full repo into context for a change to one service file.

2. **Prefer targeted reads.** Read specific functions, not entire files, when only a section is relevant.

3. **Summarize prior context.** When a session grows long, produce a compressed state summary before continuing rather than repeating full file contents.

4. **Use progressive disclosure.** Load SKILL.md entry points first. Pull supporting references only when needed.

5. **Front-load critical facts.** State task, mode, risk level, and constraints at the top of every agent prompt. Do not bury them.

6. **Do not repeat AGENTS.md.** When operating inside a repo with AGENTS.md loaded, do not re-paste its contents into prompts. Reference it by section number.

7. **Batch related reads.** If you need to read 5 service files, read them in one operation, not five sequential reads.

8. **Compress completion reports.** Use the structured template. Do not write prose summaries where a table suffices.


### 23.3 Prompt Templates for Maximum Efficiency

**Single-task prompt structure:**

```
TASK: [one sentence]
MODE: [mode from Section 28]
RISK: [GREEN / YELLOW / RED]
PHASE: [DEFINE / PLAN / BUILD / VERIFY / REVIEW / SHIP]
SKILL: [skill name]
FILES: [exact file paths â€” minimal set]
FORBIDDEN: [what not to touch]
ACCEPT: [acceptance criteria â€” measurable]
OUTPUT: [format required]
STOP IF: [conditions that require escalation]
```

**Multi-step RALPH prompt structure:**

```
TASK: [one sentence]
MODE: RALPH LOOP
RISK: [GREEN / YELLOW / RED]
CONTEXT SOURCES:
  - AGENTS.md Section [N]
  - [file path]
  - [file path]
LOOP STOP CONDITIONS:
  - [specific condition 1]
  - [specific condition 2]
ACCEPTANCE CRITERIA:
  - [measurable criterion 1]
  - [measurable criterion 2]
OUTPUT FORMAT: [format]
OBSIDIAN LOG: [YES / NO]
ADR REQUIRED: [YES / NO]
```

### 23.4 Response Length Calibration

|Task Type|Target Response Length|
|---|---|
|Simple factual lookup|1â€“5 lines|
|Single file edit|Diff only + completion report|
|Architecture review|Summary table + findings list|
|Full audit|Structured report with sections|
|RALPH loop iteration|RALP output per iteration + H summary|
|PR description|Template filled, not expanded|
|Completion report|Structured template â€” no prose padding|
|Diagnostic report|Structured table â€” see Section 26|

### 23.5 Anti-Bloat Rules

Agents MUST NOT:

- Restate the task description in the response when it was in the prompt
- Repeat AGENTS.md rules in the response body when they were already applied
- Write "As I mentioned earlier..." preambles
- Add "In conclusion..." summaries to structured reports
- Pad completion reports with explanatory prose
- Generate unsolicited alternative approaches when one was requested
- Generate full file rewrites when a targeted diff was sufficient
- Repeat error messages in their own words instead of quoting exactly
- Output empty sections in structured templates

### 23.6 Session State Management

For long sessions, agents SHOULD produce a state snapshot every 5 major iterations:

```
SESSION STATE SNAPSHOT
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Task:            [current task]
Iterations:      [N]
Files touched:   [list]
Checks run:      [list with status]
RED gates hit:   [list or none]
Open items:      [list]
Next action:     [specific next step]
Token estimate:  [rough remaining context estimate]
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
```

### 23.7 System Prompt Discipline

When using Claude Code, Cursor, Copilot, or Codex:

- Always load AGENTS.md as the primary system context
- Load `.github/copilot-instructions.md` for Copilot sessions
- Load path-specific `.github/instructions/*.instructions.md` for domain work
- Do not load AGENTS.md AND repeat its contents in the user prompt
- Reference `docs/AGENTS/` files only when the specific sub-doc is needed
- Keep session system prompts under 4,000 tokens where possible
- Use the Agent Task Template (Section 33) as the session frame

---

## SECTION 24 â€” SELF-VERIFICATION AND DOUBLE-CHECK SYSTEM

Agents MUST run this protocol before claiming any task is complete. No task may be marked COMPLETE without a documented self-verification pass.

### 24.1 The 12-Gate Self-Verification Protocol

Run all 12 gates. Report each as PASS / FAIL / N/A with evidence.

```
SELF-VERIFICATION REPORT
Task: [task description]
Date: [date]
Branch: [branch name]
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

GATE 1 â€” SCOPE INTEGRITY
Did the work stay within the declared task scope?
Did scope expand without documented approval?
Result: [ ] PASS  [ ] FAIL  [ ] N/A
Evidence: ___

GATE 2 â€” DOCTRINE COMPLIANCE
Does the output comply with Section 10 non-negotiable rules?
Does the output comply with Section 11 economy rules?
Does the output comply with Section 12 service boundaries?
Result: [ ] PASS  [ ] FAIL  [ ] N/A
Evidence: ___

GATE 3 â€” PHASE COMPLIANCE
Does the output respect the current phase (Phase 1 â€” ACTIVE)?
Does the output avoid activating any LOCKED phase feature?
Result: [ ] PASS  [ ] FAIL  [ ] N/A
Evidence: ___

GATE 4 â€” SECRET SAFETY
Are any secrets, credentials, tokens, or credential-bearing URLs
present in the output, in code, in comments, or in docs?
Result: [ ] PASS (none found)  [ ] FAIL (found â€” list)
Evidence: ___

GATE 5 â€” BUILD VERIFICATION
Was npm run build run? Did it pass?
If the command does not exist: is that documented?
Result: [ ] PASS  [ ] FAIL  [ ] NOT RUN (reason: ___)
Output: [paste exact result or "command not found"]

GATE 6 â€” TEST VERIFICATION
Was npm run test run? Did it pass?
Are failing tests documented with exact output?
Result: [ ] PASS  [ ] FAIL  [ ] NOT RUN (reason: ___)
Output: [paste exact result or "command not found"]

GATE 7 â€” LINT VERIFICATION
Was npm run lint run? Did it pass?
Result: [ ] PASS  [ ] FAIL  [ ] NOT RUN (reason: ___)
Output: [paste exact result or "command not found"]

GATE 8 â€” PRISMA VALIDATION
If schema was touched: was npx prisma validate run?
Did it pass?
Result: [ ] PASS  [ ] FAIL  [ ] N/A (schema not touched)
Output: [paste exact result or N/A]

GATE 9 â€” ECONOMY INTEGRITY
Does the output introduce any uncapped XP or resource loop?
Does the output enable pay-to-win mechanics?
Does every economy mutation have an audit record?
Result: [ ] PASS (no violations)  [ ] FAIL (list violations)
Evidence: ___

GATE 10 â€” APPROVAL GATE CHECK
Does the output require any approval from Section 16?
If yes: has Anthony been flagged?
Result: [ ] PASS (no gates required)
        [ ] FLAGGED (gates listed, escalated to Anthony)
        [ ] FAIL (gate required, not escalated)
Gates required: ___

GATE 11 â€” ANTI-FABRICATION CHECK
Are all cited file paths verified to exist in the repo?
Are all test results quoted from actual output?
Are all env variable names verified from .env.example?
Are all role IDs verified from discordRoleRegistry.ts?
Result: [ ] PASS  [ ] FAIL (list fabricated items)
Evidence: ___

GATE 12 â€” DOCUMENTATION COMPLETENESS
If architectural decision: is ADR created?
If YELLOW/RED task: is Obsidian note ready for export?
Is .env.example updated if new variables were added?
Is a new service file added to Section 12 if applicable?
Result: [ ] PASS  [ ] FAIL  [ ] N/A
Evidence: ___

â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
OVERALL RESULT:
[ ] ALL GATES PASS â€” task may be marked complete
[ ] GATES FAILED â€” list gates, do not mark complete
[ ] ESCALATION REQUIRED â€” Anthony notified of gates: ___
```

### 24.2 Common Error Patterns to Double-Check

Agents MUST specifically check for these before submitting any work:

**Code errors:**

- Off-by-one errors in cap calculations
- Missing `await` on async service calls
- Mutating AscensionProfile directly without going through service layer
- Economy constants hardcoded in handlers instead of imported from constants
- Missing `reason` field in `AscensionAdminAction` writes
- Phase gate missing on new feature code paths
- Silent error swallowing in economy-affecting code

**Documentation errors:**

- Guardian names (Nova, Tarin, Raxa) appearing in public product copy
- Role IDs hardcoded outside discordRoleRegistry.ts
- `.env` values appearing in any committed file
- Prisma field names exposed in public API documentation
- UNKNOWN used for values that are verified in AGENTS.md

**Structural errors:**

- New service file added but not listed in Section 12
- New environment variable added but not added to `.env.example`
- Migration created but not listed in known migrations
- Branch named incorrectly per Section 20 conventions

**Logic errors:**

- CNX multiplier applied before validation step
- Hard cap check applied before multiplier (wrong order â€” see Section 11.4)
- Contribution XP listener active in Phase 1 code path
- Prize pool award logic active in Phase 1 code path

### 24.3 Peer-Review Simulation

Before handing off to Anthony, agents SHOULD simulate a senior staff engineer review using the five-axis framework:

```
SIMULATED FIVE-AXIS REVIEW
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Axis 1 â€” CORRECTNESS
Does this do exactly what the spec says?
Edge cases handled: ___
Cap enforcement verified: ___
Service layer used: ___
Result: ___

Axis 2 â€” CLARITY
Would a new engineer understand this in 6 months?
Variable/function names are descriptive: ___
Complex logic is commented: ___
No magic numbers: ___
Result: ___

Axis 3 â€” SECURITY
OWASP checklist reviewed: ___
No secrets in code: ___
Auth not bypassed: ___
Input validated: ___
Result: ___

Axis 4 â€” PERFORMANCE
No N+1 queries introduced: ___
No unbounded loops: ___
Prisma queries use appropriate selects: ___
Result: ___

Axis 5 â€” MAINTAINABILITY
Change is atomic and reversible: ___
No new tech debt introduced: ___
Follows existing patterns: ___
Result: ___

Would a staff engineer approve this? [ ] YES  [ ] NO  [ ] WITH CHANGES
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
```

---

## SECTION 25 â€” CITADEL NEXUS ACCOUNTS REGISTRY

This section documents all known accounts and platforms tied to Citadel Nexus operations. Agents MUST consult this section before taking any action involving external platforms, credentials, or third-party services.

**Security rule:** This section lists account purposes and operational rules only. It MUST NOT contain account credentials, passwords, API keys, seed phrases, private keys, or any secret values. Any unknown account details are marked UNKNOWN â€” verify with Anthony before acting.

---

### 25.1 GitHub â€” `citadelnexus-cnx` Organization

**Platform:** GitHub **Organization:** `citadelnexus-cnx` **URL:** https://github.com/citadelnexus-cnx

**Purpose:** Version control, CI/CD, issue tracking, PR workflow, and code collaboration for all Citadel Nexus repositories.

**Known Repositories:**

|Repo|Purpose|Status|
|---|---|---|
|`citadel-nexus-backend`|Express.js API + Discord bot|Active â€” Phase 1|
|`citadel-nexus-app`|Next.js frontend|Active â€” Phase 1|
|Additional repos|UNKNOWN â€” verify with Anthony|â€”|

**How This Account Operates:**

- All development work happens on feature branches
- PRs are reviewed before any merge to `main`
- Anthony is the only authorized merger to `main`
- CI/CD pipelines run on PRs (configuration UNKNOWN â€” verify)
- Issues are used for task tracking and backlog management
- Branch protection on `main` must be enabled

**Agent Rules:**

- Agents may read repos, create branches, open issues, and draft PRs
- Agents MUST NOT merge to `main`
- Agents MUST NOT force push
- Agents MUST NOT delete branches without approval
- Agents MUST NOT change repository settings or permissions
- Agents MUST NOT add external collaborators without approval
- SSH keys: verify setup before agent marketplace installs
- GitHub Actions: MUST NOT create workflows that deploy to production

**Goal:** Maintain a clean, auditable, branch-protected codebase where all changes are traceable to a PR and reviewed before merging.

---

### 25.2 Supabase â€” PostgreSQL Database

**Platform:** Supabase **Purpose:** Managed PostgreSQL database hosting for all Citadel Nexus backend data â€” users, progression, economy, audit logs, entitlements.

**Project reference:** UNKNOWN â€” verify from `.env.example` (non-secret reference only) **Region:** UNKNOWN â€” verify with Anthony **Plan tier:** UNKNOWN â€” verify with Anthony

**How This Account Operates:**

- Backend connects via `DATABASE_URL` (Prisma connection string)
- Supabase Studio is NOT used for production data manipulation
- All schema changes go through Prisma migrations â€” not Supabase UI
- Supabase service role key is ðŸ”´ SECRET â€” never expose
- Production migrations are applied through a controlled, approved process

**Agent Rules:**

- Agents MUST NOT access the Supabase dashboard directly
- Agents MUST NOT run migrations against production database
- Agents MUST NOT use Supabase service role key
- Agents MUST NOT use `prisma studio` against production
- Agents may reference `.env.example` for connection string structure only
- Agents may inspect `prisma/schema.prisma` and `prisma/migrations/`

**Goal:** Maintain a stable, backed-up, migration-controlled production database where all schema changes are reviewed, approved, and applied safely.

---

### 25.3 Vercel â€” Frontend Deployment

**Platform:** Vercel **Purpose:** Production deployment and hosting for `citadel-nexus-app` (Next.js).

**Team/account:** UNKNOWN â€” verify with Anthony **Production domain:** UNKNOWN â€” verify from `NEXT_PUBLIC_SITE_URL` in `.env.example` **Preview deployments:** UNKNOWN â€” verify with Anthony

**How This Account Operates:**

- Frontend deploys automatically on push to `main` (assumed â€” verify)
- Preview deployments may trigger on PRs (assumed â€” verify)
- Environment variables are set in Vercel dashboard â€” never in code
- Production deployments require Anthony approval before triggering

**Agent Rules:**

- Agents MUST NOT trigger production deployments
- Agents MUST NOT modify Vercel environment variables
- Agents MUST NOT change Vercel project settings
- Agents MUST NOT add team members to Vercel without approval
- Agents may review build logs for diagnostic purposes only

**Goal:** Maintain a stable, auto-deployed frontend that reflects main branch state, with all production deployments authorized by Anthony.

---

### 25.4 Discord â€” Server and Bot

**Platform:** Discord **Purpose:** Primary community platform and gameplay interface for Citadel Nexus.

**Server ID:** Reference from `GUILD_ID` in `.env.example` (operational, not secret) **Bot token:** `BOT_TOKEN` â€” ðŸ”´ SECRET â€” never expose **Bot account name:** UNKNOWN â€” verify with Anthony **Bot permissions scope:** UNKNOWN â€” verify with Anthony

**How This Account Operates:**

- Discord server hosts the Citadel Nexus community
- The Ascension bot runs as a separate PM2 process from the backend
- Bot receives slash commands from members and calls backend API
- Backend is the source of truth â€” Discord reflects backend state
- Role mutations are executed only by `discordRoleMutationService.ts`
- Role IDs are locked in `src/config/discordRoleRegistry.ts`

**Server Channels (partial â€” verify current structure with Anthony):**

|Channel Type|Purpose|
|---|---|
|Announcement channels|Official Citadel Nexus updates|
|Gameplay channels|Ascension command execution|
|Community channels|Member discussion|
|Admin channels|Operator oversight|
|Bot log channels|Audit output (UNKNOWN â€” verify)|

**Agent Rules:**

- Agents MUST NOT mutate live Discord roles without approval and dry-run
- Agents MUST NOT kick, ban, or restrict members programmatically
- Agents MUST NOT deploy slash commands to live server without approval
- Agents MUST NOT change channel permissions without approval
- Agents MUST NOT change role IDs in discordRoleRegistry.ts
- Agents MUST NOT change the bot's guild or permission scope
- Agents may inspect bot command handlers and review logic
- All Discord bot changes require a dry-run before live execution

**Goal:** Maintain a safe, role-consistent Discord community where bot behavior is always a reflection of verified backend state, not an autonomous authority.

---

### 25.5 Hedera â€” Blockchain Network

**Platform:** Hedera Hashgraph **Purpose:** CNX token hosting on Hedera Token Service (HTS). Hashgraph Consensus Service (HCS) for potential audit logging.

**Operator account ID:** UNKNOWN â€” verify from safe config reference (not `.env`) **Operator private key:** ðŸ”´ SECRET â€” never expose â€” RED gate always **Network:** TESTNET only (mainnet operations are RED gate â€” require Anthony approval) **CNX Token ID:** UNKNOWN â€” verify from doctrine docs only

**How This Account Operates:**

- Hedera SDK is initialized in `src/config/hederaClient.ts`
- Current Phase 1: Hedera is deferred â€” testnet only
- No mainnet transactions occur without explicit Anthony approval
- Token reads (balance checks) are the only current permitted operation
- No token transfers, mints, or burns without RED gate approval

**Agent Rules:**

- Agents MUST NOT execute any mainnet Hedera transaction
- Agents MUST NOT transfer, mint, or burn any token
- Agents MUST NOT access treasury or operational wallets
- Agents MUST NOT generate or handle Hedera private keys
- Agents MUST NOT modify `hederaClient.ts` without approval
- Agents may inspect `hederaClient.ts` for audit and review
- All Hedera work defaults to testnet assumption
- Mainnet operations are RED gate â€” STOP and escalate

**Goal:** Maintain a safe, locked blockchain integration where no mainnet operations occur without full human authorization, and CNX token utility remains within the zero pay-to-win doctrine.

---

### 25.6 Production Server â€” VPS / Dedicated Host

**Platform:** UNKNOWN â€” verify with Anthony (VPS, dedicated server, or other) **Purpose:** Production hosting for `citadel-nexus-backend` Express.js API and Ascension Discord bot via PM2.

**Host/provider:** UNKNOWN â€” verify with Anthony **IP address:** UNKNOWN â€” do not expose publicly **OS:** UNKNOWN â€” Ubuntu assumed from UFW/Nginx references (verify) **Process manager:** PM2 **Web server:** Nginx (reverse proxy) **Firewall:** UFW

**How This Account Operates:**

- Backend API runs as PM2 process on this server
- Ascension bot runs as separate PM2 process
- Nginx proxies external requests to the PM2 processes
- UFW controls inbound/outbound firewall rules
- SSH access required for deployment and maintenance
- Deployments are manual â€” no automated CI/CD to this server without approval

**Agent Rules:**

- Agents MUST NOT restart PM2 processes without approval
- Agents MUST NOT restart Nginx without approval
- Agents MUST NOT change UFW rules without approval
- Agents MUST NOT SSH into the production server autonomously
- Agents MUST NOT run deployments to this server
- Agents may review deployment runbooks and configuration docs
- `docs/PRODUCTION_RUNBOOK.md` is the reference for all production operations

**Goal:** Maintain a stable, firewall-protected production server where all deployments are authorized and performed by Anthony or an explicitly approved operator.

---

### 25.7 Obsidian â€” Knowledge Base / Secondary Brain

**Platform:** Obsidian (local Markdown vault) **Purpose:** Long-term knowledge storage, agent task logging, architectural decision archive, and secondary brain for Citadel Nexus operations.

**Vault location:** Local to Anthony's machine / UNKNOWN if synced (verify) **Sync method:** UNKNOWN â€” Obsidian Sync, iCloud, Git, or other (verify) **Export queue:** `docs/OBSIDIAN_EXPORT_QUEUE/` in repos (staging area)

**How This Account Operates:**

- Agents write `.md` files to `docs/OBSIDIAN_EXPORT_QUEUE/`
- Anthony or an authorized process imports them into the Obsidian vault
- Vault folder structure is defined in Section 30
- All YAML frontmatter must match the template in Section 30
- No secrets, credentials, or private keys are ever logged to Obsidian

**Agent Rules:**

- Agents MUST write to export queue, not directly to vault (unless vault is accessible)
- Agents MUST use the YAML frontmatter template exactly
- Agents MUST NOT log any secret, credential, or private key to any Obsidian note
- Agents MUST produce Obsidian notes for all YELLOW/RED/implementation/arch/product tasks
- GREEN micro-tasks log to completion report only (unless Anthony requests a note)

**Goal:** Build a permanent, searchable, backlinked knowledge base that captures all architectural decisions, agent task histories, and system state changes so no institutional knowledge is ever lost.

---

### 25.8 Payment Platforms (Future / UNKNOWN)

**Platforms:** Stripe / Gumroad / PayPal â€” status UNKNOWN **Purpose:** Potential future use for public product sales or community monetization (not yet active â€” verify with Anthony)

**Agent Rules (apply to all payment platforms):**

- Agents MUST NOT take any financial actions on any payment platform
- Agents MUST NOT create invoices, subscriptions, or charges
- Agents MUST NOT access transaction records without explicit approval
- Agents MUST NOT configure webhooks without approval
- Agents MUST NOT change pricing or product listings without approval
- All payment platform changes require Anthony approval (RED gate)

**Goal:** When payment platforms become active, maintain them under strict human oversight where no automated agent can initiate financial transactions.

---

### 25.9 Domain Registrar

**Platform:** UNKNOWN â€” verify with Anthony **Domain(s):** UNKNOWN â€” reference from `NEXT_PUBLIC_SITE_URL` in `.env.example` **Purpose:** Domain registration and DNS management for Citadel Nexus web properties.

**Agent Rules:**

- Agents MUST NOT access domain registrar accounts
- Agents MUST NOT change DNS records without approval
- Agents MUST NOT transfer domains
- All domain changes require Anthony approval (RED gate)

---

### 25.10 Accounts Registry Maintenance Rules

1. When a new platform or account is created for Citadel Nexus:

    - Add it to this section in the same PR that establishes the account
    - Document: purpose, how it operates, agent rules, goal
    - Do NOT document credentials, passwords, or secret values
    - Mark unknown fields explicitly as UNKNOWN
2. When account details change:

    - Update this section in a docs branch
    - Produce an ADR if it is an architectural platform change
    - Anthony approval required for changes to production accounts
3. When an account is decommissioned:

    - Mark it as DECOMMISSIONED in this section
    - Document the date and reason
    - Do not delete the entry â€” preserve the history

---

## SECTION 26 â€” AUTO-DIAGNOSTIC AND MONITORING SYSTEM

Agents SHOULD proactively run diagnostic checks and produce structured reports when any of the following conditions occur:

- A build or test failure is detected
- A RED gate is triggered
- A session exceeds 10 RALPH loop iterations
- A task involves economy-touching changes
- A production incident or anomaly is identified
- Anthony requests a system status report
- A new phase or major feature is being prepared

### 26.1 System Health Diagnostic

Run this diagnostic at the start of any AUDIT or IMPLEMENT session:

```
CITADEL NEXUS SYSTEM HEALTH DIAGNOSTIC
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
Timestamp:    [ISO 8601 date-time]
Repo:         [backend / frontend / both]
Branch:       [current branch]
Agent:        [Claude Code / Copilot / Codex / other]
Session mode: [mode from Section 28]
Risk level:   [GREEN / YELLOW / RED]

â”€â”€ GIT STATUS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Branch:           [output of: git branch --show-current]
Uncommitted:      [output of: git status --short]
Last commit:      [output of: git log --oneline -1]

â”€â”€ BUILD STATUS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
npm run build:    [ ] PASS  [ ] FAIL  [ ] NOT RUN
Errors:           [paste or "none"]

â”€â”€ LINT STATUS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
npm run lint:     [ ] PASS  [ ] FAIL  [ ] NOT RUN
Warnings:         [count or "none"]

â”€â”€ TEST STATUS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
npm run test:     [ ] PASS  [ ] FAIL  [ ] NOT RUN  [ ] NO TESTS YET
Coverage:         [if available]
Failures:         [paste exact or "none"]

â”€â”€ SCHEMA STATUS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
npx prisma validate:  [ ] PASS  [ ] FAIL  [ ] NOT RUN
Pending migrations:   [list or "none"]

â”€â”€ PHASE STATUS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Current phase:    Phase 1 â€” Stabilize (ACTIVE)
Phase source:     AGENTS.md + docs/BUILD/CURRENT_BUILD_STATUS.md
Deferred active:  [ ] None detected  [ ] Issue found: ___

â”€â”€ ECONOMY INTEGRITY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Uncapped loops:   [ ] None detected  [ ] Issue found: ___
Pay-to-win:       [ ] None detected  [ ] Issue found: ___
Audit logging:    [ ] Present  [ ] Missing in: ___

â”€â”€ SECRETS SCAN â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
.env committed:   [ ] No  [ ] YES â€” CRITICAL â€” list files
Secrets in code:  [ ] None detected  [ ] Found in: ___
Secrets in docs:  [ ] None detected  [ ] Found in: ___

â”€â”€ OPEN DECISIONS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
docs/BUILD/OPEN_DECISIONS.md: [open count or "file not found"]
Critical items:   [list or "none"]

â”€â”€ APPROVAL GATES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
RED gates pending Anthony: [list or "none"]
YELLOW items needing scope confirmation: [list or "none"]

â”€â”€ RECOMMENDATION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Overall status:  [ ] HEALTHY  [ ] ATTENTION NEEDED  [ ] CRITICAL
Priority action: [one sentence]
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
```

### 26.2 Economy Audit Report

Run this when any economy-touching change is being reviewed:

```
ECONOMY AUDIT REPORT
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
Timestamp:  [date-time]
Scope:      [files reviewed]
Auditor:    Economy Guardian sub-agent

â”€â”€ XP CAP COMPLIANCE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Base Game XP daily ceiling (375 XP):    [ ] ENFORCED  [ ] VIOLATED
Hard daily cap post-modifier (475 XP):  [ ] ENFORCED  [ ] VIOLATED
Daily mission limit (12 total):         [ ] ENFORCED  [ ] VIOLATED
High-risk mission limit (4/day):        [ ] ENFORCED  [ ] VIOLATED
Same-mission type limit (5 full XP):    [ ] ENFORCED  [ ] VIOLATED
Contribution XP daily cap (225 XP):     [ ] ENFORCED  [ ] VIOLATED (Phase 2 only)
Arcade XP daily cap (100 XP):           [ ] ENFORCED  [ ] VIOLATED (Phase 4 only)

â”€â”€ MULTIPLIER ORDER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Step 1 â€” Validate eligibility:          [ ] PRESENT  [ ] MISSING
Step 2 â€” Calculate base XP:             [ ] PRESENT  [ ] MISSING
Step 3 â€” Action-specific cap:           [ ] PRESENT  [ ] MISSING
Step 4 â€” Category daily cap:            [ ] PRESENT  [ ] MISSING
Step 5 â€” Apply CNX multiplier:          [ ] PRESENT  [ ] MISSING
Step 6 â€” Apply hard daily cap:          [ ] PRESENT  [ ] MISSING
Step 7 â€” Write audit log:               [ ] PRESENT  [ ] MISSING
Step 8 â€” Update user state:             [ ] PRESENT  [ ] MISSING
Step 9 â€” Update Nexus Score:            [ ] PRESENT  [ ] MISSING (if applicable)

â”€â”€ CNX MULTIPLIER VALUES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Unranked â†’ 1.00Ã—:       [ ] CORRECT  [ ] MODIFIED
Signal â†’ 1.10Ã—:         [ ] CORRECT  [ ] MODIFIED
Node â†’ 1.15Ã—:           [ ] CORRECT  [ ] MODIFIED
Citadel â†’ 1.20Ã—:        [ ] CORRECT  [ ] MODIFIED
Nexus â†’ 1.25Ã—:          [ ] CORRECT  [ ] MODIFIED
Founder â†’ 1.30Ã—:        [ ] CORRECT  [ ] MODIFIED

â”€â”€ PAY-TO-WIN SCAN â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
CNX bypasses rank threshold:   [ ] No  [ ] YES â€” VIOLATION
CNX bypasses stage gate:       [ ] No  [ ] YES â€” VIOLATION
CNX purchases XP directly:     [ ] No  [ ] YES â€” VIOLATION
CNX bypasses anti-abuse:       [ ] No  [ ] YES â€” VIOLATION
CNX grants admin authority:    [ ] No  [ ] YES â€” VIOLATION

â”€â”€ AUDIT LOGGING SCAN â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Every XP mutation logged:      [ ] YES  [ ] NO â€” list missing
reason field always set:       [ ] YES  [ ] NO â€” list locations
adminUserId always set:        [ ] YES  [ ] NO â€” list locations
valueBefore/After set:         [ ] YES  [ ] NO â€” list locations

â”€â”€ DIMINISHING RETURNS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
1â€“5 same mission â†’ 100%:  [ ] ENFORCED  [ ] NOT PRESENT
6â€“8 same mission â†’ 60%:   [ ] ENFORCED  [ ] NOT PRESENT
9+ same mission â†’ 25%/0:  [ ] ENFORCED  [ ] NOT PRESENT

â”€â”€ VERDICT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Economy integrity:  [ ] PASS  [ ] VIOLATIONS FOUND
Violations:         [list or "none"]
Approval needed:    [ ] No  [ ] Yes â€” escalate to Anthony
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
```

### 26.3 Production Incident Report

Use when a production anomaly, build failure, or security concern is detected:

```
PRODUCTION INCIDENT REPORT
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
Timestamp:       [date-time]
Severity:        [ ] LOW  [ ] MEDIUM  [ ] HIGH  [ ] CRITICAL
Type:            [ ] Build failure  [ ] Test failure  [ ] Security
                 [ ] Economy anomaly  [ ] Discord issue  [ ] Database
                 [ ] Deployment issue  [ ] Other: ___

â”€â”€ DESCRIPTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
What happened:   ___
When detected:   ___
Affected system: ___

â”€â”€ EVIDENCE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Exact error output:
[paste]

Relevant files:
[list]

â”€â”€ IMPACT ASSESSMENT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Users affected:        [ ] None  [ ] Unknown  [ ] N users
Economy affected:      [ ] No  [ ] Yes â€” describe
Data integrity:        [ ] No impact  [ ] Risk â€” describe
Security exposure:     [ ] No  [ ] Yes â€” describe (redacted)

â”€â”€ ROLLBACK AVAILABLE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
[ ] Yes â€” describe rollback path: ___
[ ] No â€” explain why: ___

â”€â”€ RECOMMENDED ACTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Immediate:  ___
Short-term: ___
Long-term:  ___

â”€â”€ APPROVAL REQUIRED â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Anthony notified:  [ ] Yes  [ ] No
Gate triggered:    [ ] RED  [ ] YELLOW  [ ] None

Prepared by:  [agent identifier]
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
```

### 26.4 Auto-Diagnostic Trigger Rules

Agents MUST automatically generate a System Health Diagnostic when:

1. `npm run build` returns any error
2. `npm run test` returns any failure
3. A RED gate is triggered
4. A conflict is detected between AGENTS.md doctrine and current code
5. A session involves economy constants, Discord role IDs, or Hedera code
6. An unexpected file is found in `.env.*` patterns (not `.env.example`)
7. Anthony requests a status report

Agents SHOULD generate an Economy Audit Report when:

1. Any file in `ascensionGameplayService.ts`, `ascensionAdminService.ts`, or economy-related handlers is modified
2. Any XP, cap, multiplier, or cooldown value is reviewed or touched
3. A new reward or economy event type is being added

Agents SHOULD generate a Production Incident Report when:

1. A build or deployment failure is detected in a production context
2. A security concern is identified in any file
3. An economy violation is detected in the codebase
4. An unexpected behavior in Discord role sync is identified

---

## SECTION 27 â€” SUB-AGENT REGISTRY

Full definitions in `docs/AGENTS/SUB_AGENT_REGISTRY.md`.

|Sub-Agent|Purpose|Forbidden|
|---|---|---|
|Repository Cartographer|Map repo state and structure|Edit files, run migrations|
|Backend Warden|Protect backend source of truth|Bypass service layer, migrate schema|
|Frontend Herald|Protect frontend as surface layer|Create frontend truth, hardcode private state|
|Discord Sentinel|Protect Discord role and bot behavior|Mutate live roles, change role IDs|
|Economy Guardian|Protect progression and anti-pay-to-win|Change constants, add uncapped rewards|
|Security Warden|Protect secrets, auth, and production|Read `.env`, rotate secrets, weaken auth|
|Product/IP Shield|Protect private implementation in public products|Expose guardian names, schemas, or constants|
|Obsidian Archivist|Maintain secondary brain|Store secrets, keys, or `.env` values|
|Toolsmith Agent|Improve agent system|Install tools without approval, weaken rules|
|QA Oracle|Enforce verification standard across all tasks|Mark tests passing without evidence|
|Release Marshal|Prepare release readiness|Deploy production, merge to main|
|Code Reviewer Persona|Five-axis code review|Merge PRs, deploy, change economy logic|
|Test Engineer Persona|Test strategy and Prove-It pattern|Mark coverage sufficient without evidence|
|Security Auditor Persona|OWASP and threat modeling|Rotate credentials, access `.env`|

**Persona orchestration rules:**

- Personas produce reports â€” not authority
- Personas MUST NOT invoke other personas
- User, main agent, or approved slash command orchestrates composition
- `/ship` may fan out review personas where the tool supports it

---

## SECTION 28 â€” OPERATING MODES

|Mode|Description|Output|
|---|---|---|
|`AUDIT ONLY`|Read and report current state|System health + findings report|
|`PLAN ONLY`|Create implementation plan|Plan document|
|`DOCS ONLY`|Create or update documentation|Docs files|
|`SPEC MODE`|Write PRD before any code|PRD document|
|`IMPLEMENT APPROVED CHANGE`|Execute approved scope|Code + tests|
|`TEST ONLY`|Run and report test results|Exact test output|
|`REVIEW ONLY`|Five-axis code review|Review report|
|`COMMIT PREP ONLY`|Prepare atomic commit|Commit message + diff|
|`PR PREP ONLY`|Prepare PR for human review|PR description|
|`RELEASE CHECKLIST ONLY`|Generate deployment checklist|Checklist|
|`RALPH LOOP`|Complex multi-step task|Full RALPH output|
|`SECURITY AUDIT`|OWASP + secrets + auth review|Security report|
|`ECONOMY AUDIT`|XP, caps, loops, anti-abuse review|Economy audit report|
|`DIAGNOSTIC`|System health check|Health diagnostic report|
|`TOOLSMITH REVIEW`|Improve agent system|Proposals only|
|`OBSIDIAN EXPORT`|Export knowledge to vault queue|`.md` files|
|`INCIDENT RESPONSE`|Production incident documentation|Incident report|

---

## SECTION 29 â€” TOOL PERMISSION MATRIX

|Tool|Allowed Use|Forbidden|Default Mode|
|---|---|---|---|
|VS Code Copilot|Local repo help, small fixes, docs, tests|`.env` access, deploy, migration|Read/write approved files|
|Copilot CLI|Repo context, inline suggestions|Secrets, deploy, Discord mutation|Read/write with scope|
|Codex|Audits, scoped implementation, refactors, tests|Economy constants, Discord IDs, schema migration|Read/write workspace|
|Claude Code|Architecture, docs, planning, doctrine review, implementation|Production deploy, secrets, migration|Read/write docs; code by approval|
|Cursor|Frontend UI, local code editing|`.env`, deploy, main merge|Read/write local scope|
|ChatGPT|Analysis, planning, doc review|No system access by default|Advisory only|
|GitHub|Issues, branches, PR drafts, code review|Merge without approval, delete branches|PR/issue draft|
|Terminal|Builds, tests, status checks|Risky deploy commands without approval|Approval for RED commands|
|Obsidian|Secondary brain, logs, decisions|Secrets, `.env` values, private keys|Write `.md` logs only|
|Supabase|Schema/reference review|Production write, direct DB access|No production write|
|Vercel|Deployment review, build log reading|Deploy without approval|No deploy by default|
|Discord|Role/bot review, dry-run plans|Live mutation without approval|Dry-run only|
|Hedera|Testnet planning/research|Mainnet actions|Testnet only|
|Stripe/Gumroad/PayPal|Product/business review|Financial actions|No financial actions|
|MCP Servers|GitHub/docs/local file context|Write to production via MCP|Read-only first|
|Gemini CLI|Audits, planning, docs|Same RED gates as all agents|Read/write with scope|
|Windsurf|Local code editing, UI|Same RED gates as all agents|Read/write with scope|
|Kiro IDE|Skills-based development tasks|Same RED gates as all agents|Per `.kiro/skills/` rules|

---

## SECTION 30 â€” OBSIDIAN KNOWLEDGE CAPTURE

**Rule:** Every YELLOW or RED task, completed implementation task, release-prep task, architectural decision, doctrine change, and public-product decision MUST produce an Obsidian export note.

GREEN micro-tasks (read-only analysis, typo fixes, doc edits not touching doctrine) may log only in the completion report unless Anthony requests a note.

If the Obsidian vault is not directly accessible, write to: `docs/OBSIDIAN_EXPORT_QUEUE/`

Full logging standard in `docs/AGENTS/OBSIDIAN_LOGGING_STANDARD.md`.

### 30.1 YAML Frontmatter (Required on All Notes)

```yaml
---
title:
date:
repo:
branch:
task_id:
mode:
risk_level:
lifecycle_phase:
skill_used:
status:
files_changed:
approval_required:
adr_created:
diagnostic_run:
self_verify_pass:
tags:
  - citadel-nexus
  - agent-log
---
```

### 30.2 Vault Folder Structure

```
Citadel Nexus/
â”œâ”€â”€ 00 Command/
â”œâ”€â”€ 01 Architecture/
â”œâ”€â”€ 02 Backend/
â”œâ”€â”€ 03 Frontend/
â”œâ”€â”€ 04 Discord/
â”œâ”€â”€ 05 Economy/
â”œâ”€â”€ 06 Security/
â”œâ”€â”€ 07 Agent Logs/
â”œâ”€â”€ 08 Decisions/
â”œâ”€â”€ 09 Productization/
â”œâ”€â”€ 10 Release Readiness/
â”œâ”€â”€ 11 Agent Skills Logs/
â”œâ”€â”€ 12 ADR Archive/
â”œâ”€â”€ 13 Accounts Registry/
â””â”€â”€ 14 Diagnostic Reports/
```

### 30.3 What Must NEVER Be Logged

- `.env` values of any kind
- Private keys or seed phrases
- API keys or bot tokens
- Database connection strings or URLs
- Wallet addresses linked to private keys
- Internal production URLs or webhook URLs
- Discord role ID values (unless in role registry and explicitly permitted)
- Supabase service role keys
- Any production server IP addresses

---

## SECTION 31 â€” NEGATIVE PROMPTS

All of the following are absolute prohibitions with zero exceptions. Full list in `docs/AGENTS/NEGATIVE_PROMPTS.md`.

```
Do not assume current implementation state from memory.
Do not act before reading relevant files.
Do not edit files before stating a plan.
Do not touch .env files.
Do not print secrets, tokens, keys, credential-bearing URLs,
  private production URLs, database URLs, webhook URLs,
  or internal admin URLs.
Do not deploy to production.
Do not restart PM2, Nginx, UFW, Vercel, Supabase, or Discord
  services without approval.
Do not run Prisma migrations without approval.
Do not run npx prisma format unless schema-formatting is in approved scope.
Do not mutate live Discord roles without approval.
Do not change Discord role IDs.
Do not change economy constants.
Do not create uncapped XP or resource loops.
Do not create pay-to-win mechanics.
Do not bypass audit logging.
Do not create frontend-only source of truth.
Do not bypass backend services with direct Prisma writes from routes.
Do not merge to main.
Do not force push.
Do not delete files without explicit approval.
Do not hide failing tests.
Do not summarize errors vaguely â€” report exact failures.
Do not claim a task is complete without passing checks.
Do not claim a check passed when the command does not exist.
Do not read raw logs that may contain secrets â€” request sanitized output.
Do not create public products exposing private implementation details.
Do not turn deferred features into live features.
Do not expand scope without approval.
Do not invent citations, file paths, logs, or test results.
Do not invent environment variable names â€” verify from .env.example.
Do not skip spec-driven-development for significant changes.
Do not skip test-driven-development for logic changes.
Do not skip code-review-and-quality before any PR.
Do not skip security-and-hardening for auth/input/external changes.
Do not rationalize skipping any lifecycle stage.
Do not invoke other personas from within a persona.
Do not act on "seems right" â€” require evidence.
Do not downgrade verified Citadel Nexus facts to UNKNOWN unless
  no approved source exists, a source conflict exists, or verification
  would require reading secrets.
Do not skip the self-verification protocol before marking work complete.
Do not suppress auto-diagnostic alerts.
Do not expose any account credentials, passwords, or secret values
  in AGENTS.md or any supporting doc.
Do not take financial actions on any payment platform.
Do not access the production server without explicit approval.
Do not bypass the token efficiency protocol in high-cost sessions.
Do not apply npx prisma format in routine build/validate steps.
Do not expose production server IP addresses in any log or doc.
```

---

## SECTION 32 â€” OUTPUT FORMAT STANDARDS

|Target|Format|
|---|---|
|Human chat|Concise summary + next action|
|AGENTS.md|Markdown governance|
|Obsidian|Markdown with YAML frontmatter and backlinks|
|GitHub issue|Problem, evidence, acceptance criteria|
|GitHub PR|Summary, files changed, tests, risks, review findings|
|Terminal|Executable command blocks only|
|JSON/API|Strict schema, no prose|
|Discord update|Short status, no private implementation details|
|Public product|Genericized copy, no private implementation|
|Security report|Severity, evidence, impact, fix, approval gate|
|Completion report|Structured template â€” no prose padding|
|ADR|Context, decision, consequences, alternatives|
|Release checklist|Phase, item, status, owner, rollback step|
|OPEN_DECISION|Conflict identified, evidence, options, escalation target|
|Diagnostic report|Structured template from Section 26|
|Incident report|Structured template from Section 26.3|
|Economy audit|Structured template from Section 26.2|
|Self-verification|Structured 12-gate template from Section 24.1|
|Session snapshot|Structured template from Section 23.6|

---

## SECTION 33 â€” AGENT TASK TEMPLATE

```
TASK:
MODE:            [from Section 28]
SCOPE:
RISK LEVEL:      [GREEN / YELLOW / RED]
LIFECYCLE PHASE: [DEFINE / PLAN / BUILD / VERIFY / REVIEW / SHIP]
SKILL ACTIVATED:
ALLOWED FILES:
FORBIDDEN FILES:
CONTEXT SOURCES:
  - AGENTS.md Section [N]
  - [file path]
  - [file path]
TOOLS ALLOWED:
TOOLS FORBIDDEN:
ACCEPTANCE CRITERIA:
  - [measurable criterion 1]
  - [measurable criterion 2]

CHECKS TO RUN:
  - npm run build                (required for all code changes)
  - npm run lint                 (required for all code changes)
  - npm run test                 (required for all logic changes)
  - npx prisma validate          (if schema was touched)
  - npx prisma format            (ONLY if schema-formatting in approved scope)
  - five-axis review             (if PR)
  - OWASP checklist              (if security surface)
  - economy audit report         (if economy-touching)
  - Discord dry-run              (if role/bot change)
  - system health diagnostic     (if AUDIT/IMPLEMENT session)
  - self-verification protocol   (ALWAYS â€” before claiming complete)

STOP CONDITIONS:
  - RED gate triggered â€” escalate to Anthony
  - Failing check requires architectural decision
  - Missing context cannot be resolved without approval
  - Scope has expanded without approval
  - Self-verification FAIL â€” do not mark complete

TOKEN EFFICIENCY:
  - Prompt structure used: [single-task / RALPH / other]
  - Context files loaded: [minimal set â€” list]
  - Output format: [from Section 32]

OUTPUT FORMAT:    [from Section 32]
OBSIDIAN LOG:     YES â€” YELLOW/RED/implementation/architecture/product tasks
                  NO  â€” GREEN micro-tasks (completion report only)
ADR REQUIRED:     [YES / NO]
DIAGNOSTIC RUN:   [YES / NO â€” specify type]
APPROVAL REQUIRED FOR:
ANTI-RATIONALIZATION CHECK:
  Was any lifecycle stage skipped?
  If yes â€” document the reason and escalate before proceeding.
  Self-verification all 12 gates pass? [YES / NO / PARTIAL]
```

---

## SECTION 34 â€” COMPLETION STANDARD

A task is NOT complete until the agent provides ALL of the following. A task is COMPLETE only when ALL of the following are true:

- [ ] Spec was written or verified to exist before implementation began
- [ ] Plan was decomposed into atomic tasks
- [ ] Code was implemented in vertical slices with rollback path defined
- [ ] Tests were written alongside or before code
- [ ] `npm run build` passed â€” output shown, or absence documented
- [ ] `npm run lint` passed â€” output shown, or absence documented
- [ ] `npm run test` passed â€” output shown, or absence documented
- [ ] `npx prisma validate` passed (if applicable)
- [ ] `npx prisma format` only run if schema-formatting was in approved scope
- [ ] Five-axis review complete
- [ ] Security checklist applied (if applicable)
- [ ] OWASP checklist applied (if applicable)
- [ ] Economy audit report produced (if economy-touching)
- [ ] Discord dry-run completed (if applicable)
- [ ] System health diagnostic run (if AUDIT or IMPLEMENT session)
- [ ] Self-verification protocol complete â€” all 12 gates documented
- [ ] ADR written (if an architectural decision was made)
- [ ] Obsidian note exported (if YELLOW/RED/implementation/arch/product task)
- [ ] PR prepared â€” not merged
- [ ] All RED gates respected and escalated to Anthony
- [ ] No secrets or credential-bearing URLs logged
- [ ] No lifecycle stage skipped without documented escalation
- [ ] No verified Citadel Nexus facts downgraded to UNKNOWN without cause

**Task Completion Report Template:**

```
TASK COMPLETION REPORT
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Task:          [what was assigned]
Branch:        [branch name]
Files changed: [list every file modified]
What changed:  [what each file change does]
Why:           [why this change was made]

Checks run:
  [ ] npm run build         â€” PASS / FAIL / NOT RUN
  [ ] npx prisma validate   â€” PASS / FAIL / N/A
  [ ] npm run lint          â€” PASS / FAIL / NOT RUN
  [ ] npm run test          â€” PASS / FAIL / NOT RUN / NO TESTS YET

Self-verification: [ ] ALL 12 GATES PASS  [ ] GATES FAILED: ___

Risks:
  [list risks â€” classify: LOW / MEDIUM / HIGH]

Follow-up tasks:
  [list anything this change requires next]

Approval required for:
  [list anything needing Anthony sign-off before merge]

Open questions:
  [anything needing clarification]

Obsidian note:  [ ] Exported  [ ] N/A (GREEN micro-task)
ADR created:    [ ] Yes  [ ] No
Diagnostic run: [ ] Yes â€” type: ___  [ ] No
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
git diff --stat: [paste]
git status --short: [paste]
```

---

## SECTION 35 â€” HANDLING UNCERTAINTY

### Code Conflicts with Doctrine

1. Do not silently change the code.
2. Document the conflict in a `CONFLICT_REPORT.md` stub or inline comment.
3. Classify risk: LOW / MEDIUM / HIGH / APPROVAL REQUIRED.
4. Propose two or more resolution options.
5. Stop and report if the conflict touches economy, security, database schema, production state, or Discord permissions.

### Docs Conflict with Code

- The code is the current implementation truth.
- The doctrine is the design intent.
- The conflict becomes an open decision item in `docs/BUILD/OPEN_DECISIONS.md`.
- Do not silently apply the doctrine over working code.

### Memory or Context Conflicts with Repo

- The repo is the ground truth for implementation state.
- Verified canonical doctrine (this file) governs design intent.
- When in doubt, read the file before acting on memory.

### Missing Documentation

If a required doc file is empty or missing:

- Create a stub with the correct structure.
- Populate it to the degree possible from verified repo state.
- Flag what requires Anthony input.
- Do not make major code changes until foundational docs are populated.

### Phase Conflicts

If any phase boundary conflicts between repo files, docs, memory, or chat:

- STOP.
- Produce an `OPEN_DECISION` conflict report.
- Default to the most restrictive safe phase.
- Escalate to Anthony before proceeding.

### Unknown Handling

If a value is not confirmed from an approved source, mark it:

```
UNKNOWN â€” requires verification from [source type]
```

Agents may proceed only if the unknown is not required for the current task.

If the unknown affects production, economy, auth, schema, Discord, wallet, Hedera, CNX, payments, or IP exposure â€” STOP and request Anthony clarification.

---

## SECTION 36 â€” COMMAND CONTROL DASHBOARD RULES

The Command Control Dashboard is a future system.

### 36.1 Build Phases

|Phase|What Is Allowed|
|---|---|
|A â€” Static Prototype|UI layout, demo data, disabled controls|
|B â€” Read-Only Monitor|Live reads from backend health and economy endpoints|
|C â€” Controlled Actions|Pause/resume modules, flag users, export reports|
|D â€” Emergency Controls|Safe mode, economy lockdown (requires full auth + audit infrastructure)|

### 36.2 Dashboard Rules

- Read-only dashboard work does not require approval beyond task assignment
- Any dashboard control that writes to production requires Phase D readiness
- Every dashboard button MUST either: query real state / open a review flow / create a logged action / call a controlled backend service / export a report
- No decorative controls that imply production capability they do not have
- Emergency controls MUST require two-step confirmation
- Emergency controls MUST create an audit record

### 36.3 CNMA Agent Oversight Panel

The CNMA Command Center artifact is classified as **Dashboard Module 1: Agent Oversight**. It covers agent supervision, status, allowed tools, forbidden actions, and approval gates. Integrate into full dashboard â€” not as a standalone product.

---

## SECTION 37 â€” AGENTIC AI GOVERNANCE

### 37.1 What Agents May Do

- Read and analyze code
- Summarize architecture and current build state
- Propose improvements and implementation plans
- Generate implementation plans awaiting approval
- Edit non-sensitive files when instructed
- Create tests and test plans
- Improve documentation
- Draft safe code changes for review
- Identify risks, blockers, and gaps
- Create issues and PR drafts
- Run build/test checks and report results
- Run diagnostics and produce monitoring reports

### 37.2 What Agents Must NOT Do Autonomously

Everything listed in Section 15.

### 37.3 Sub-Agent Definitions

When Citadel Nexus spawns sub-agents, each agent MUST have:

- A clear, documented name
- A bounded scope and task list
- An explicit list of allowed tools
- An explicit list of forbidden actions
- Defined approval gates
- Shutdown conditions
- Logging requirements
- A human supervisor

Sub-agents report to the Master Command Agent. Outputs MUST be reviewed before use in production. Sub-agents MUST NOT have direct production write authority.

---

## SECTION 38 â€” DOCUMENTATION STRUCTURE

The following doc files are the knowledge core. Agents should help populate these before making major code changes.

```
docs/
â”œâ”€â”€ DOCTRINE/
â”‚   â”œâ”€â”€ CITADEL_NEXUS_V3_DOCTRINE.md
â”‚   â”œâ”€â”€ ECONOMY_AND_XP_RULES.md
â”‚   â”œâ”€â”€ CNX_UTILITY_RULES.md
â”‚   â”œâ”€â”€ ANTI_ABUSE_RULES.md
â”‚   â””â”€â”€ COMMAND_CONTROL_DASHBOARD_SPEC.md
â”œâ”€â”€ ARCHITECTURE/
â”‚   â”œâ”€â”€ SYSTEM_OVERVIEW.md
â”‚   â”œâ”€â”€ BACKEND_ARCHITECTURE.md
â”‚   â”œâ”€â”€ DISCORD_BOT_ARCHITECTURE.md
â”‚   â”œâ”€â”€ DATABASE_SCHEMA_REFERENCE.md
â”‚   â””â”€â”€ AGENTIC_AI_ARCHITECTURE.md
â”œâ”€â”€ BUILD/
â”‚   â”œâ”€â”€ CURRENT_BUILD_STATUS.md
â”‚   â”œâ”€â”€ MASTER_BACKLOG.md
â”‚   â”œâ”€â”€ IMPLEMENTATION_PHASES.md
â”‚   â”œâ”€â”€ APPROVAL_GATES.md
â”‚   â””â”€â”€ OPEN_DECISIONS.md
â”œâ”€â”€ SECURITY/
â”‚   â”œâ”€â”€ DO_NOT_TOUCH.md
â”‚   â”œâ”€â”€ SECRETS_POLICY.md
â”‚   â”œâ”€â”€ PERMISSION_MODEL.md
â”‚   â””â”€â”€ WALLET_AND_TREASURY_BOUNDARIES.md
â”œâ”€â”€ QA/
â”‚   â”œâ”€â”€ V3_ACCEPTANCE_TESTS.md
â”‚   â”œâ”€â”€ ECONOMY_TEST_PLAN.md
â”‚   â””â”€â”€ PRODUCTION_READINESS_CHECKLIST.md
â””â”€â”€ [12+ additional operational docs including runbooks]
```

---

## SECTION 39 â€” SUPPORTING FILE STRUCTURE

The root AGENTS.md is constitutional law. Full operational detail lives in:

```
docs/AGENTS/
â”œâ”€â”€ MASTER_AGENT_SPEC.md           â† Agent name, capabilities, authority limits
â”œâ”€â”€ AGENT_SKILLS_INTEGRATION.md    â† Full addyosmani/agent-skills reference
â”œâ”€â”€ RALPH_LOOP.md                  â† Full RALPH loop definition and stop conditions
â”œâ”€â”€ SUB_AGENT_REGISTRY.md          â† All sub-agents: scope, permissions, shutdown
â”œâ”€â”€ TOOL_PERMISSION_MATRIX.md      â† Tool-by-tool: allowed, forbidden, approval
â”œâ”€â”€ SKILL_REGISTRY.md              â† All skills: lifecycle, domain, Codex built-in
â”œâ”€â”€ OBSIDIAN_LOGGING_STANDARD.md   â† Vault, export queue, templates, forbidden data
â”œâ”€â”€ NEGATIVE_PROMPTS.md            â† Full hard-stop prohibition list
â”œâ”€â”€ AGENT_TASK_TEMPLATE.md         â† Reusable task instruction template
â”œâ”€â”€ AGENT_OUTPUT_FORMATS.md        â† Output adapters per destination
â”œâ”€â”€ AGENT_IMPROVEMENT_PROTOCOL.md â† How agents may propose system improvements
â”œâ”€â”€ ACCOUNTS_REGISTRY_DETAIL.md   â† Extended detail for Section 25 accounts
â””â”€â”€ DIAGNOSTIC_TEMPLATES.md        â† All diagnostic report templates

docs/OBSIDIAN_EXPORT_QUEUE/
â””â”€â”€ .gitkeep                       â† Secondary-brain export staging area

references/
â”œâ”€â”€ testing-patterns.md
â”œâ”€â”€ security-checklist.md
â”œâ”€â”€ performance-checklist.md
â””â”€â”€ accessibility-checklist.md

.github/
â”œâ”€â”€ copilot-instructions.md
â””â”€â”€ instructions/
    â”œâ”€â”€ backend.instructions.md
    â”œâ”€â”€ frontend.instructions.md
    â”œâ”€â”€ discord.instructions.md
    â”œâ”€â”€ economy.instructions.md
    â”œâ”€â”€ security.instructions.md
    â””â”€â”€ public-products.instructions.md
```

---

## SECTION 40 â€” FINAL DIRECTIVE

```
Build Citadel Nexus slowly, safely, and correctly.

Protect the economy.
Protect the community.
Protect the codebase.
Protect the IP.
Preserve auditability.
Preserve human command authority.

Do not overload current systems.
Do not invent shortcuts.
Do not create pay-to-win mechanics.
Do not create uncapped reward loops.
Do not hide risks.
Do not bypass the owner.
Do not expose private implementation in public products.
Do not skip the self-verification protocol.
Do not suppress diagnostic alerts.
Do not waste tokens on padding when structure suffices.

When in doubt â€” read the repo, check this file, and ask.
```

**Anthony Hammon is the Founder and final authority.** **All major decisions route through him.** **All irreversible actions require his explicit approval.**

