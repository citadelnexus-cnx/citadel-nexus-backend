# AGENTS.md — Citadel Nexus
## Operating Law for AI Coding Agents

**Applies to:**
- `citadelnexus-cnx/citadel-nexus-backend`
- `citadelnexus-cnx/citadel-nexus-app`
- Any future Citadel Nexus repository unless that repo contains a superseding `AGENTS.md`

**Applies to all agents:**
Claude Code, Claude Sonnet/Opus via API, GitHub Copilot, Cursor, Codex, ChatGPT with code tools, and any future autonomous coding agent or orchestration system operating in this codebase.

**Authority:** Anthony Hammon — Founder, Final Human Operative  
**Doctrine version:** v3.0  
**Last verified against repo:** 2026-05-11  

---

> This file is operational law, not a suggestion. Agents that do not follow it are operating outside authorization and must stop, report, and await correction.

---

## SECTION 1 — PROJECT IDENTITY

### 1.1 What Citadel Nexus Is

Citadel Nexus is a governed, Discord-native, Hedera-connected community ecosystem with multiple integrated layers:

| Layer | Description | Status |
|---|---|---|
| Discord/Community | Member progression, role sync, onboarding | Live — Phase 1 |
| Ascension Gameplay | Slash command bot with XP, missions, buildings, guardians | Live — Phase 1 |
| Backend API | Express.js source-of-truth service layer | Live — production-dev |
| CNX Token Utility | Hedera-based modifier layer | Deferred — testnet only |
| Wallet/Treasury | Governance and treasury controls | Deferred |
| NFT/Node Utility | Entitlement-linked assets | Deferred |
| TrustLayer | Reputation and contribution verification | Future |
| Command Control Dashboard | Operations monitoring and control | Future |
| Agentic Automation | MCAOS multi-agent orchestration | Future |

### 1.2 The Master Doctrine

```
Backend defines truth.
Discord reflects truth.
Frontend surfaces truth.
AI agents assist execution.
Anthony Hammon holds final authority.
```

No agent, automated system, Discord event, or frontend action may override this hierarchy.

### 1.3 What Agents Must Always Preserve

- Zero pay-to-win — CNX never purchases progression
- Earned progress only — no unearned XP loops or uncapped rewards
- Separated XP tracks — Game XP, Contribution XP, Arcade XP are independent
- Immutable audit logs — every economy mutation is recorded
- Phased rollout — advanced systems stay disabled until authorized
- Backend authority — Discord and frontend are display layers only
- IP separation — the public product line never exposes private implementation

---

## SECTION 2 — VERIFIED REPOSITORY STRUCTURE

### 2.1 Backend Repository

**Repo:** `github.com/citadelnexus-cnx/citadel-nexus-backend`  
**Runtime:** Node.js + TypeScript  
**Entry point:** `src/index.ts`  
**Bot entry:** `src/modules/ascension/runtime/bot-entry.js` (separate PM2 process)

```
citadel-nexus-backend/
├── AGENTS.md                          ← this file (to be committed)
├── .env.example                       ← reference only — never commit .env
├── package.json
├── tsconfig.json
├── prisma.config.ts
├── prisma/
│   ├── schema.prisma                  ← canonical data model
│   └── migrations/                    ← 7 migrations as of 2026-05-11
│       ├── 20260402020723_init_core/
│       ├── 20260402100719_expand_persistence_models/
│       ├── 20260406081731_add_entitlement_model/
│       ├── 20260416103711_make_username_unique/
│       ├── 20260417110430_add_ascension_profile/
│       ├── 20260418214028_add_ascension_admin_and_prize_pool/
│       └── 20260419091330_add_ascension_admin_and_prize_pool/
├── src/
│   ├── index.ts                       ← API server entry
│   ├── lib/
│   │   ├── prisma.ts                  ← Prisma client (TypeScript)
│   │   └── prisma.js                  ← Prisma client (JavaScript — for bot)
│   ├── config/
│   │   ├── discordRoleRegistry.ts     ← canonical role ID registry — DO NOT MODIFY IDs
│   │   ├── discordRoleMap.ts          ← role mapping logic
│   │   └── hederaClient.ts            ← Hedera SDK config — DEFERRED, testnet only
│   ├── routes/
│   │   ├── userRoutes.ts              → /user
│   │   ├── payoutRoutes.ts            → /payout
│   │   ├── tokenRoutes.ts             → /token
│   │   ├── accessRoutes.ts            → /access
│   │   ├── tempAccessRoutes.ts        → /temp-access
│   │   ├── entitlementRoutes.ts       → /entitlements
│   │   ├── roleSyncRoutes.ts          → /role-sync
│   │   ├── discordSyncWorkerRoutes.ts → /discord-sync-worker
│   │   ├── sessionRoutes.ts           → /session
│   │   ├── memberStateRoutes.ts       → /member-state
│   │   └── ascensionSummaryRoutes.ts  → /ascension-summary
│   ├── services/
│   │   ├── userService.ts
│   │   ├── accessStateService.ts
│   │   ├── memberStateService.ts
│   │   ├── entitlementStore.ts
│   │   ├── entitlementExpiryService.ts
│   │   ├── roleSyncService.ts
│   │   ├── discordRoleMutationService.ts
│   │   ├── discordRoleSyncAuditStore.ts
│   │   ├── discordRoleSyncExecutionService.ts
│   │   ├── discordRoleSyncVerificationService.ts
│   │   ├── discordSyncWorkerService.ts
│   │   ├── ascensionProfileService.ts
│   │   ├── ascensionGameplayService.ts
│   │   ├── ascensionAdminService.ts
│   │   ├── ascensionAuditService.ts
│   │   ├── ascensionPrizePoolService.ts
│   │   ├── ascensionSummaryService.ts
│   │   ├── payoutService.ts
│   │   ├── tempAccessService.ts
│   │   └── tokenService.ts
│   └── modules/
│       └── ascension/                 ← Discord bot module (separate process)
│           ├── index.js
│           ├── handlers/              ← /start /claim /mission /build /status
│           ├── admin/                 ← 20+ admin slash commands
│           ├── loot/                  ← PIE system
│           └── runtime/              ← bot-entry.js, deploy-commands.js
└── docs/                              ← operational documentation
    ├── ASCENSION_RUNTIME_RUNBOOK.md
    ├── BACKUP_RECOVERY_INCIDENT_RESPONSE.md
    ├── PRODUCTION_DOCUMENTATION_RECONCILIATION.md
    ├── PRODUCTION_LAUNCH_GATE_REVIEW.md
    ├── PRODUCTION_MONITORING_CHECKLIST.md
    ├── PRODUCTION_OPERATIONS_BASELINE.md
    ├── PRODUCTION_RUNBOOK.md
    ├── PUBLIC_LAUNCH_BLOCKER_REGISTER.md
    └── [12 additional operational docs]
```

### 2.2 Frontend Repository

**Repo:** `github.com/citadelnexus-cnx/citadel-nexus-app`  
**Framework:** Next.js 15 + React 19 + Tailwind CSS 4  
**Deployment:** Vercel  

```
citadel-nexus-app/
├── AGENTS.md                          ← this file (to be committed)
├── .env.example                       ← reference only — never commit .env
├── package.json
├── tsconfig.json
├── next.config.ts
├── src/
│   ├── app/
│   │   ├── page.tsx                   → / (homepage)
│   │   ├── system/page.tsx            → /system
│   │   ├── gameplay/page.tsx          → /gameplay
│   │   ├── roadmap/page.tsx           → /roadmap
│   │   ├── pillars/page.tsx           → /pillars
│   │   ├── faq/page.tsx               → /faq
│   │   ├── foundations/page.tsx       → /foundations
│   │   ├── trust-bridge/page.tsx      → /trust-bridge
│   │   ├── enter/page.tsx             → /enter
│   │   ├── app/page.tsx               → /app (member surface)
│   │   ├── members/[discordId]/       → /members/:discordId (public profile)
│   │   ├── ascension-test/page.tsx    → /ascension-test
│   │   ├── dev-login/page.tsx         → /dev-login
│   │   └── not-found.tsx
│   ├── components/
│   │   └── ascension/                 ← Ascension UI components
│   ├── data/                          ← static page content
│   │   ├── homepage.ts
│   │   ├── appGateway.ts
│   │   ├── enter.ts
│   │   ├── faq.ts
│   │   ├── foundations.ts
│   │   ├── gameplay.ts
│   │   ├── pillars.ts
│   │   ├── roadmap.ts
│   │   ├── system.ts
│   │   └── trust-bridge.ts
│   └── lib/
│       ├── api.ts                     ← backend API client
│       ├── getAscensionPublicCard.ts
│       └── memberApp.ts
```

---

## SECTION 3 — VERIFIED TECH STACK

### 3.1 Backend Stack

| Component | Technology | Version |
|---|---|---|
| Runtime | Node.js | Current LTS |
| Language | TypeScript | ^5.9.3 |
| Framework | Express.js | ^5.2.1 |
| ORM | Prisma | ^7.6.0 |
| Database | PostgreSQL via Supabase | — |
| Discord bot | Discord.js | ^14.0.0 |
| Blockchain SDK | Hedera SDK | ^2.81.0 (testnet only) |
| Process manager | PM2 | (separate from repo) |
| Reverse proxy | Nginx | (separate from repo) |
| Firewall | UFW | (separate from repo) |

### 3.2 Frontend Stack

| Component | Technology | Version |
|---|---|---|
| Framework | Next.js | ^15.2.4 |
| UI library | React | ^19.0.0 |
| Styling | Tailwind CSS | ^4.2.4 |
| Language | TypeScript | ^5.8.3 |
| Deployment | Vercel | — |

### 3.3 Verified npm Scripts

**Backend** (`citadel-nexus-backend`):

```bash
npm run dev              # nodemon + ts-node dev server
npm run build            # tsc compile to dist/
npm run start            # node dist/index.js (production)
npm run ascension:start  # start Ascension bot (separate process)
npm run ascension:dev    # nodemon Ascension bot
npm run ascension:deploy # deploy Discord slash commands
```

**Frontend** (`citadel-nexus-app`):

```bash
npm run dev    # Next.js dev server
npm run build  # Next.js production build
npm run start  # Next.js production server
npm run lint   # Next.js lint
```

**Prisma** (backend):

```bash
npx prisma validate      # validate schema
npx prisma generate      # regenerate Prisma client
npx prisma migrate dev   # run migrations (development only)
npx prisma studio        # database GUI (never in production)
```

---

## SECTION 4 — VERIFIED DATA MODELS

All Prisma models are the canonical data structures. Never rename, restructure, or delete fields without explicit owner approval and a reviewed migration plan.

### 4.1 Canonical Prisma Models

| Model | Purpose | Notes |
|---|---|---|
| `User` | Core member identity | xp, level, cnxBalance, wallet, isVerified |
| `AccessState` | Tier, CNX state, boost, cooldown | Backend-authoritative access control |
| `Entitlement` | Access keys, status, expiry | source-tracked |
| `DiscordRoleSyncAudit` | Full audit trail of role mutations | idempotencyKey + executionHash unique |
| `AscensionProfile` | Guardian, stage, rank, resources, buildings | gameplay state — Phase 1 live |
| `AscensionPrizePool` | Prize pool governance | ledger-controlled |
| `AscensionAdminAction` | Admin action audit log | reason field is required |
| `AscensionAdminSnapshot` | State snapshots for rollback | tied to admin actions |

### 4.2 AscensionProfile Fields (verified)

```
guardian          String  @default("nova")     -- do not add new guardians without approval
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
buildingsJson     Json    @default("{...}")    -- keys: knowledge_core, trade_hub, power_reactor, security_layer
```

### 4.3 Schema Change Rules

- MUST NOT add columns silently. Every schema change requires a migration file.
- MUST NOT rename existing columns without a migration and owner approval.
- MUST NOT delete columns without confirming no active code references them.
- MUST run `npx prisma validate` after every schema edit before committing.
- MUST NOT run `prisma migrate dev` against the production database.
- Production migrations are applied through a reviewed, approved process only.

---

## SECTION 5 — VERIFIED DISCORD ROLE REGISTRY

The Discord role registry in `src/config/discordRoleRegistry.ts` contains locked role IDs. These IDs connect the backend to the live Discord server.

**CRITICAL: Do not change any role ID in this file without explicit owner approval.** Incorrect role IDs cause live Discord role mutations to target wrong roles.

### 5.1 Locked Role IDs (verified)

| Key | ID | Category | Backend-Managed |
|---|---|---|---|
| FOUNDER | 1484296944833663026 | authority | No |
| MODERATOR | 1484296110330871818 | authority | No |
| MEMBER | 1389883525251072021 | identity | No |
| GENESIS | 1486385504063717607 | cosmetic | No |
| CITIZEN | 1484152641985450054 | progression | No |
| BUILDER | 1484152871850213376 | progression | No |
| GUARDIAN | 1484153002158719170 | progression | No |
| ARCHITECT | 1484153060463869952 | progression | No |
| ELITE | 1484138559970742315 | progression | No |
| CNX_HOLDER | 1484138333788704878 | utility | **Yes** |
| NEXUS_HOLDER | 1484138442991337593 | utility | No |

### 5.2 Role Change Rules

- MUST NOT rename any role key used in the codebase without auditing all references.
- MUST NOT change `id` values without explicit owner confirmation against live Discord.
- MUST NOT change `managedByBackend: false` to `true` without full role sync review.
- MUST NOT add new roles without owner approval and Discord verification.
- Discord role state is a reflection of backend state. Never treat Discord as the source of truth.

---

## SECTION 6 — ENVIRONMENT VARIABLES

### 6.1 Backend Environment Variables (verified from `.env.example`)

| Variable | Purpose | Sensitivity |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | 🔴 SECRET — never expose |
| `BOT_TOKEN` | Discord bot token | 🔴 SECRET — never expose |
| `GUILD_ID` | Target Discord server ID | 🟡 Operational |
| `FOUNDER_IDS` | Comma-separated founder Discord IDs | 🟡 Operational |
| `CURRENT_PHASE` | Active feature phase (default: 1) | 🟢 Config |
| `ALLOW_GLOBAL_RESET` | Enable/disable global reset (default: false) | 🔴 DANGER — must stay false in production |
| `STRICT_ECONOMY` | Enable strict economy mode (default: false) | 🟡 Safety |
| `ADMIN_MODE` | Admin operation mode | 🟡 Safety |
| `BACKEND_PORT` / `PORT` | API server port (default: 3001) | 🟢 Config |
| `BACKEND_HOST` | Bind host (default: 127.0.0.1) | 🟢 Config |
| `CORS_ORIGINS` / `FRONTEND_ORIGIN` | Allowed CORS origins | 🟡 Operational |
| `NODE_ENV` | Runtime environment | 🟢 Config |

### 6.2 Frontend Environment Variables (verified from `.env.example`)

| Variable | Purpose | Sensitivity |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public site URL | 🟢 Public |
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | 🟢 Public |
| `NEXT_PUBLIC_DISCORD_INVITE_URL` | Discord invite link | 🟢 Public |
| `NEXT_PUBLIC_DISCORD_SERVER_ID` | Discord server ID | 🟢 Public |

### 6.3 Environment Rules

- MUST NOT commit `.env` files to the repository.
- MUST NOT print, log, or expose the value of any SECRET-tier variable.
- MUST NOT request secret values from the human operator in chat.
- MUST update `.env.example` when adding new environment variables.
- MUST NOT assume production values. Work from `.env.example` only.
- `ALLOW_GLOBAL_RESET` MUST remain `false` in production at all times.
- `CURRENT_PHASE` controls which features are live. Do not increment it without approval.
- `STRICT_ECONOMY=true` MUST be the production standard. Never disable without approval.

---

## SECTION 7 — NON-NEGOTIABLE DOCTRINE

These rules cannot be overridden by any task, any agent, or any instruction within the repository.

### Rule 1: Zero Pay-to-Win

CNX token utility MUST NOT:

- Skip, accelerate, or bypass Game Rank thresholds
- Skip, accelerate, or bypass Discord Rank thresholds
- Skip Stage requirements
- Skip mission access requirements
- Skip building upgrade requirements
- Directly purchase Game XP, Contribution XP, or Arcade XP
- Directly purchase Credits, Intel, or Power beyond allowed bounds
- Guarantee prize eligibility or prize awards
- Bypass anti-abuse checks or daily/weekly caps
- Grant moderation authority, admin authority, or elevated permissions
- Unlock mission types that are otherwise gated

CNX utility is strictly limited to:
- A controlled XP multiplier within hard caps (1.00x–1.30x)
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

Discord MUST reflect backend state. Discord MUST NOT define it.  
The frontend MUST request backend data. The frontend MUST NOT mutate backend state directly.

### Rule 3: Economy Writes Are Centralized

No economy-affecting mutation may occur directly inside a:
- Discord command handler (`src/modules/ascension/handlers/`)
- Route handler (`src/routes/`)
- Frontend component or API route
- Background job without going through the service layer

All XP, resource, rank, stage, and economy changes MUST pass through the verified service layer.

### Rule 4: Every Economy Mutation Is Logged

Every meaningful economy state change MUST produce an audit record. Admin/founder changes use AscensionAdminAction; gameplay and player economy events use the approved economy audit log or current equivalent service until economy_events exists.

XP gain or loss · Resource gain or spend · Mission outcome · Build upgrade · Rank change · Stage change · CNX tier change · Multiplier application · Admin grant · Admin correction · Prize award · Event reward · Moderation lock · Reward freeze · Rollback · Recalculation

### Rule 5: No Silent Admin Power

Every admin and founder action MUST be logged with:
- `adminUserId` — who acted
- `targetUserId` — who was affected
- `actionType` — what happened
- `reason` — why it happened (required field, not optional)
- `valueBefore` / `valueAfter` — what changed

`AscensionAdminAction.reason` is a required field and must never be bypassed.

### Rule 6: Phase Enforcement

`CURRENT_PHASE` controls which features are active. Code MUST check the current phase before activating gated features. Features in a phase higher than `CURRENT_PHASE` MUST fail safely and silently — not throw errors that expose system state.

### Rule 7: IP and Implementation Protection

Citadel Nexus internal implementation details are proprietary. Agents MUST NOT:
- Generate public-facing documentation that exposes internal architecture
- Create product deliverables that include exact guardian names (Nova, Tarin, Raxa), exact route structures, exact database field names, exact role IDs, or exact economy constants
- Include internal repo URLs, Discord invite links, backend API URLs, or Prisma model names in public products
- Clone the Ascension system design for a public product without genericizing all proprietary elements

The public product line teaches transferable principles derived from the system. It does not expose the system itself.

---

## SECTION 8 — APPROVAL GATES

An agent MUST stop work and request explicit written approval from Anthony Hammon before performing any of the following actions:

### 8.1 Economy and Progression

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

### 8.2 Database and Schema

12. Creating any new Prisma model
13. Adding, renaming, or removing any field in an existing Prisma model
14. Creating or modifying any Prisma migration
15. Running any migration against a non-local database
16. Changing any index or unique constraint
17. Running any destructive database query (`DELETE`, `DROP`, `TRUNCATE`)
18. Seeding or resetting production data

### 8.3 Authentication and Permissions

19. Changing authentication or session logic
20. Changing admin or moderator permission checks
21. Changing which roles can execute which commands
22. Modifying `FOUNDER_IDS` behavior
23. Changing `ADMIN_MODE` behavior in production

### 8.4 Discord and Bot

24. Changing any role ID in `discordRoleRegistry.ts`
25. Mutating live Discord roles programmatically
26. Changing `managedByBackend` status for any role
27. Deploying updated slash commands to the live Discord server
28. Adding new slash commands to Phase 1
29. Modifying the bot's guild or permission scope

### 8.5 Blockchain and Wallet

30. Modifying `hederaClient.ts`
31. Adding any mainnet Hedera operation
32. Adding any wallet connection or signature verification logic
33. Adding any CNX token read beyond what currently exists
34. Touching any treasury wallet logic
35. Adding any token transfer or spend capability

### 8.6 Deployment and Production

36. Merging any branch to `main`
37. Deploying to the production backend server
38. Deploying to Vercel production
39. Changing Nginx or PM2 configuration files
40. Changing UFW firewall rules
41. Rotating any production secret or credential
42. Changing `NODE_ENV` behavior in any deployed context

### 8.7 Architecture

43. Deleting any existing file (flag it, do not delete)
44. Removing any existing service or route
45. Rewriting more than one service at a time
46. Changing the API's port binding or CORS origin logic
47. Adding any new external dependency that requires wallet or blockchain access
48. Adding any automated process that can write to production without human confirmation

### 8.8 Public Product and IP

49. Creating any public product that includes internal implementation details
50. Publishing any content that references CNX as an investment or yield product
51. Creating any content that implies features are live when they are deferred

**When uncertain whether approval is required: stop and ask. Do not assume approval.**

---

## SECTION 9 — FORBIDDEN ACTIONS

Agents MUST NEVER do any of the following under any circumstances:

### Secrets and Credentials

- Read, display, log, or copy the value of any `SECRET`-tier environment variable
- Commit a `.env` file to any repository
- Commit credentials, API keys, tokens, or private keys
- Suggest secrets should be placed in code comments, README files, or public config files
- Create, generate, or request private keys for any purpose

### Blockchain and Finance

- Execute any mainnet Hedera transaction
- Transfer any CNX, HBAR, or other tokens
- Access any treasury or operational wallet
- Generate wallet seed phrases or private keys
- Create any logic that enables pay-to-win mechanics

### Production System Safety

- Deploy code to production without explicit approval
- Run database migrations against production without explicit approval
- Delete production data
- Bypass branch protection on `main`
- Merge to `main` without explicit approval
- Disable or weaken any security check in auth or access control
- Change `ALLOW_GLOBAL_RESET` to `true`

### Economy Integrity

- Create uncapped XP loops or uncapped resource generation
- Create reward logic without daily or weekly caps
- Create admin actions that do not write to the audit log
- Create CNX utility that bypasses hard caps
- Silently remove anti-abuse checks

### Discord Safety

- Mutate live Discord roles without explicit approval and a dry-run verification
- Ban, kick, or restrict Discord members programmatically without approval
- Change channel permissions without approval

### Code Quality

- Bypass tests intentionally or mark failing tests as passing
- Hard-code economy values that should come from constants
- Create side effects in read-only endpoints
- Swallow errors silently in economy-affecting code paths

### IP and Public Product

- Expose internal guardian names, route structures, database schemas, role IDs, or economy constants in public products
- Clone the private Citadel Nexus implementation and sell it
- Include production Discord invite links, API URLs, or repository names in public-facing product deliverables

---

## SECTION 10 — AGENT WORKFLOW

For every assigned task, agents MUST follow this process in order:

```
1. READ
   Read all files relevant to the task.
   Do not assume file contents — verify by reading.

2. IDENTIFY
   Identify the current implementation state.
   Identify what already exists vs. what is missing.

3. COMPARE
   Compare current state against v3 Doctrine.
   Identify any gaps, conflicts, or risks.

4. STATE ASSUMPTIONS
   State all assumptions explicitly before proceeding.
   If an assumption requires approval, flag it.

5. PLAN
   Create a short, specific implementation plan.
   List exact files to be changed.
   Identify what each change does.

6. RISK CHECK
   Identify any risk the plan creates.
   Classify each risk: LOW / MEDIUM / HIGH / APPROVAL REQUIRED.
   Stop and report if any APPROVAL REQUIRED risk exists.

7. IMPLEMENT
   Make the smallest safe change that accomplishes the task.
   Do not refactor unrelated code in the same commit.
   Do not expand scope without approval.

8. TEST
   Run every applicable check (see Section 13).
   Report results honestly, including failures.

9. DOCUMENT
   Update relevant docs if behavior changed.
   Update `.env.example` if new variables were added.

10. REPORT
    Provide the completion report (see Section 17).
```

---

## SECTION 11 — BRANCH AND COMMIT STANDARDS

### 11.1 Branch Rules

- ALL work happens on feature branches. Never commit directly to `main`.
- Branch naming convention:

| Prefix | Use |
|---|---|
| `agent/` | Agentic or AI-assisted work |
| `feat/` | New feature |
| `fix/` | Bug fix |
| `docs/` | Documentation only |
| `chore/` | Dependency or config maintenance |
| `refactor/` | Refactor without behavior change |
| `test/` | Test additions or fixes |

Examples:
- `agent/v3-knowledge-core`
- `feat/economy-event-log`
- `feat/game-xp-service`
- `fix/claim-cooldown-enforcement`
- `docs/v3-doctrine`

### 11.2 Commit Message Convention

Format: `type(scope): description`

| Type | Use |
|---|---|
| `feat` | New capability |
| `fix` | Bug fix |
| `docs` | Documentation |
| `test` | Test addition or fix |
| `chore` | Maintenance, dependencies |
| `refactor` | Refactor without behavior change |
| `security` | Security-related change |

Examples:
- `feat(ascension): add immutable economy event table`
- `fix(caps): enforce daily XP hard cap after CNX multiplier`
- `docs(agents): add v3 doctrine knowledge core`
- `test(economy): add XP cap boundary tests`
- `chore(deps): update prisma to 7.6.0`

Do not mix unrelated changes in one commit. One change, one commit.

---

## SECTION 12 — ECONOMY RULES (v3 DOCTRINE)

### 12.1 XP Track Separation

| Track | Controls | Resets Seasonally |
|---|---|---|
| Game XP | Game Rank, mission access, Stage gates, gameplay identity | No — permanent |
| Contribution XP | Discord Rank, community trust, channel access | No — permanent |
| Arcade XP | Arcade achievement, weighted Nexus Score contribution | Optional archive |
| CNX Boost | XP multiplier modifier only — does not control rank | Snapshot-based |
| Nexus Score | Seasonal leaderboard only | Yes — every season |

**These tracks MUST NOT be merged, collapsed, or allowed to influence each other's rank outcomes.**

### 12.2 Nexus Score Formula (locked)

```
Nexus Score = Seasonal Game XP + Seasonal Contribution XP + (Seasonal Arcade XP × 0.5)
```

Arcade XP is weighted at 0.5. This weight MUST NOT be changed without approval.

### 12.3 CNX Tier Thresholds (locked)

```
Unranked:        0 CNX   →  1.00× multiplier  |  8h claim cooldown
Signal Holder:   100 CNX →  1.10× multiplier  |  8h claim cooldown
Node Holder:     500 CNX →  1.15× multiplier  |  7h claim cooldown
Citadel Holder: 2000 CNX →  1.20× multiplier  |  6h claim cooldown
Nexus Holder: 10000 CNX  →  1.25× multiplier  |  5h claim cooldown
Founder Tier: 50000 CNX  →  1.30× multiplier  |  5h claim cooldown
```

Do not replace these values with older or alternate values.

### 12.4 CNX Multiplier Application Order (locked)

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

### 12.5 Daily Cap Structure (v3)

| Cap | Value |
|---|---|
| Base Game XP daily ceiling | 375 XP |
| Absolute Game XP daily hard cap (post-modifier) | 475 XP |
| Max missions per day | 12 total |
| Max high-risk missions per day | 4 |
| Max same-mission type (full XP) | 5 per day |
| Contribution XP daily cap | 225 XP (before CNX modifier) |
| Arcade XP daily cap | 100 XP |
| Max Arcade Game XP bonus per day | 55 XP |

### 12.6 Mission Diminishing Returns (locked)

| Same Mission Count / Day | XP Multiplier |
|---|---|
| 1–5 | 100% |
| 6–8 | 60% |
| 9+ | 25% or 0 if cap reached |

### 12.7 Prize Pool Rules

Prize pools are isolated from XP and gameplay resources. They are governed separately.

No prize award may be issued without:
1. An eligibility check (account age ≥ 14 days, no active lock, no unresolved abuse flag)
2. A ledger record in `AscensionPrizePool`
3. An `AscensionAdminAction` audit record with `reason` field populated
4. Explicit approval from a human operator

Prize pool logic MUST NOT be activated in Phase 1.

### 12.8 Contribution XP Rules

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

## SECTION 13 — TESTING REQUIREMENTS

### 13.1 Required Checks Before Declaring Any Task Complete

Run every applicable command from the list below. If a command does not exist in the repo, state that clearly — do not pretend it ran.

**Backend:**
```bash
npm run build           # TypeScript compilation — must pass with 0 errors
npx prisma validate     # Schema validation — must pass
npm run lint            # Linting — must pass or report failures
npm run test            # Unit tests if present — must pass or report failures
```

**Frontend:**
```bash
npm run build    # Next.js build — must pass with 0 errors
npm run lint     # Next.js lint — must pass or report failures
```

**After schema changes (backend):**
```bash
npx prisma validate
npx prisma generate
```

### 13.2 Test Reporting Format

If any check fails, report exactly:

```
Command:  npm run build
Status:   FAILED
Output:   [exact error message]
Cause:    [likely root cause]
Fix:      [proposed correction]
```

Do not summarize failures vaguely. Report the exact output.

### 13.3 Economy-Affecting Code

Any code that touches XP, resources, ranks, stages, or prize pools MUST have:
- A test or test plan covering the happy path
- A test or test plan covering the cap enforcement boundary
- A test or test plan covering the cooldown enforcement boundary
- Documentation of what the test verifies

If tests do not yet exist, create a `TODO_TESTS.md` stub in the relevant directory documenting what needs to be tested before this feature is considered production-safe.

---

## SECTION 14 — PHASE RULES

`CURRENT_PHASE` is read from the environment variable. Code MUST gate features against this value.

### Phase 1 — Current (Stabilize) ✅ ACTIVE

**Allowed:**
- Game XP via `/claim`, `/mission`, `/build`, `/status`, `/start`
- Game Rank progression
- AscensionProfile state management
- Building upgrades (knowledge_core, trade_hub, power_reactor, security_layer)
- Daily Game XP caps and cooldown enforcement
- Power regeneration and Power Reactor scaling
- AscensionAdminAction audit logging (already present — maintain and expand)
- AscensionAdminSnapshot (already present — maintain)
- AscensionPrizePool (present — keep inactive for awards)
- Manual admin command set (20+ commands already deployed)
- Stage 1–3 progression
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

### Phase 2 — Community Layer 🔒 LOCKED

**Unlocks when authorized:**
- Contribution XP message listener
- Discord Rank progression
- Message cooldown and duplicate detection
- Verified contribution queue
- Weekly cap enforcement
- Moderator verification tools
- Invite quality tracking

### Phase 3 — Seasonal Layer 🔒 LOCKED

**Unlocks when authorized:**
- Season lifecycle management
- Nexus Score aggregation and display
- Leaderboard eligibility checks
- Season archive
- Event score isolation

### Phase 4 — Arcade Layer 🔒 LOCKED

**Unlocks when authorized:**
- Arcade session tracking
- Arcade XP cap enforcement
- Anti-cheat signal collection
- Weighted Nexus Score integration

### Phase 5 — CNX Automation 🔒 LOCKED

**Unlocks when authorized:**
- Automated wallet balance reads
- CNX tier snapshot automation
- Holder role sync automation
- Multiplier automation
- CNX freeze controls

**Still forbidden in Phase 5:**
- CNX spending
- CNX-to-resource conversion
- Purchasable Power or gameplay boosts

### Phase 6 — Prestige / NFT Eligibility 🔒 LOCKED

**Unlocks when authorized:**
- Stage 6 activation
- Prestige eligibility checks
- NFT eligibility verification
- Achievement archive
- Non-power cosmetic utility

---

## SECTION 15 — SERVICE BOUNDARY RULES

### 15.1 Verified Service Files

The following services exist and MUST be the write path for their respective domains:

| Service File | Domain |
|---|---|
| `userService.ts` | User creation, lookup, update |
| `accessStateService.ts` | Tier, boost, cooldown, temp access state |
| `memberStateService.ts` | Composite member state |
| `entitlementStore.ts` | Entitlement CRUD |
| `entitlementExpiryService.ts` | Entitlement lifecycle |
| `roleSyncService.ts` | Role sync orchestration |
| `discordRoleMutationService.ts` | Actual Discord API role mutations |
| `discordRoleSyncAuditStore.ts` | Role sync audit writes |
| `discordRoleSyncExecutionService.ts` | Sync execution with idempotency |
| `discordRoleSyncVerificationService.ts` | Post-sync verification |
| `discordSyncWorkerService.ts` | Background sync worker |
| `ascensionProfileService.ts` | Ascension player profile reads/writes |
| `ascensionGameplayService.ts` | Gameplay loop logic (claim, mission, build) |
| `ascensionAdminService.ts` | Admin command execution |
| `ascensionAuditService.ts` | Audit record creation |
| `ascensionPrizePoolService.ts` | Prize pool management |
| `ascensionSummaryService.ts` | Public summary data |
| `payoutService.ts` | Payout queue and eligibility |
| `tempAccessService.ts` | Temporary access grants |
| `tokenService.ts` | CNX token reads (deferred) |

### 15.2 Do Not Bypass Services

Route handlers and Discord command handlers MUST call services for any state mutation.

Do not:
- Call `prisma.ascensionProfile.update()` directly from a route handler
- Call `prisma.user.update()` directly from a command handler
- Write XP changes directly from within a Discord event listener

Do:
- Call `ascensionGameplayService.processClaim()` from the claim handler
- Call `ascensionAdminService.awardXp()` from the admin command handler
- Call `ascensionAuditService.recordAction()` from every admin operation

### 15.3 Adding New Services

When adding a new service:
1. Create it in `src/services/`
2. Name it descriptively matching its domain
3. Ensure it exports typed functions, not raw Prisma calls as its interface
4. Add it to this AGENTS.md service table in the same PR

---

## SECTION 16 — COMMAND CONTROL DASHBOARD RULES

The Command Control Dashboard is a future system. The following rules apply to any work related to it.

### 16.1 Build Phases

| Phase | What Is Allowed |
|---|---|
| A — Static Prototype | UI layout, demo data, disabled controls |
| B — Read-Only Monitor | Live reads from backend health and economy endpoints |
| C — Controlled Actions | Pause/resume modules, flag users, export reports |
| D — Emergency Controls | Safe mode, economy lockdown (requires full auth + audit infrastructure) |

### 16.2 Dashboard Rules

- Read-only dashboard work does not require approval beyond task assignment
- Any dashboard control that writes to production requires Phase D readiness
- Every dashboard button MUST either: query real state / open a review flow / create a logged action / call a controlled backend service / export a report
- No decorative controls that imply production capability they do not have
- Emergency controls MUST require two-step confirmation
- Emergency controls MUST create an audit record

### 16.3 MCAOS Agent Oversight Panel

The Claude-generated MCAOS Command Center artifact is classified as **Dashboard Module 1: Agent Oversight**. It should be integrated into the full dashboard, not treated as a standalone product. It covers agent supervision, status, allowed tools, forbidden actions, and approval gates.

---

## SECTION 17 — AGENTIC AI GOVERNANCE

### 17.1 What Agents May Do

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

### 17.2 What Agents Must NOT Do Autonomously

- Deploy to production
- Rotate secrets or credentials
- Spend or transfer funds or tokens
- Mint, burn, or transfer CNX or any token
- Change wallet authority
- Change Discord server permissions
- Alter economy constants without approval
- Delete production data
- Rewrite core architecture without approval
- Change database schemas without approval
- Remove security checks
- Bypass tests
- Mark work complete without running verification
- Merge to main

### 17.3 Future Sub-Agent Definitions

When Citadel Nexus spawns sub-agents (Revenue Agent, Product Agent, Code Agent, etc.), each agent MUST have:

- A clear, documented name
- A bounded scope and task list
- An explicit list of allowed tools
- An explicit list of forbidden actions
- Defined approval gates
- Shutdown conditions
- Logging requirements
- A human supervisor

Sub-agents report to the Master Command Agent. Sub-agent outputs MUST be reviewed before use in production. Sub-agents MUST NOT have direct production write authority.

---

## SECTION 18 — HANDLING UNCERTAINTY

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
- Verified canonical doctrine (this file, v3 spec) governs design intent.
- When in doubt, read the file before acting on memory.

### Missing Documentation

If a required doc file (listed in Section 19) is empty or missing:
- Create a stub with the correct structure.
- Populate it to the degree possible from verified repo state.
- Flag what requires owner input.
- Do not make major code changes until foundational docs are populated.

---

## SECTION 19 — REQUIRED DOCUMENTATION STRUCTURE

The following doc files are the knowledge core. Agents should help populate these before making major code changes.

```
docs/
├── DOCTRINE/
│   ├── CITADEL_NEXUS_V3_DOCTRINE.md          ← master economy doctrine
│   ├── ECONOMY_AND_XP_RULES.md               ← XP caps, missions, buildings
│   ├── CNX_UTILITY_RULES.md                  ← CNX tiers, multipliers, limits
│   ├── ANTI_ABUSE_RULES.md                   ← caps, flags, enforcement ladder
│   └── COMMAND_CONTROL_DASHBOARD_SPEC.md     ← dashboard architecture
├── ARCHITECTURE/
│   ├── SYSTEM_OVERVIEW.md                    ← layer model, system map
│   ├── BACKEND_ARCHITECTURE.md               ← routes, services, data flow
│   ├── DISCORD_BOT_ARCHITECTURE.md           ← bot commands, phases, admin
│   ├── DATABASE_SCHEMA_REFERENCE.md          ← Prisma models, migrations
│   └── AGENTIC_AI_ARCHITECTURE.md            ← agent model, sub-agents
├── BUILD/
│   ├── CURRENT_BUILD_STATUS.md               ← verified live state
│   ├── MASTER_BACKLOG.md                     ← all remaining work by epic
│   ├── IMPLEMENTATION_PHASES.md              ← phase detail and criteria
│   ├── APPROVAL_GATES.md                     ← decision authority map
│   └── OPEN_DECISIONS.md                     ← unresolved items
├── SECURITY/
│   ├── DO_NOT_TOUCH.md                       ← locked files and systems
│   ├── SECRETS_POLICY.md                     ← credential handling
│   ├── PERMISSION_MODEL.md                   ← role/permission matrix
│   └── WALLET_AND_TREASURY_BOUNDARIES.md     ← wallet trust model
└── QA/
    ├── V3_ACCEPTANCE_TESTS.md                ← what "done" means
    ├── ECONOMY_TEST_PLAN.md                  ← economy-specific tests
    └── PRODUCTION_READINESS_CHECKLIST.md     ← launch gate checklist
```

---

## SECTION 20 — COMPLETION STANDARD

A task is NOT complete until the agent provides ALL of the following:

```
TASK COMPLETION REPORT
──────────────────────
Task:          [what was assigned]
Branch:        [branch name]
Files changed: [list every file modified]
What changed:  [what each file change does]
Why:           [why this change was made]

Checks run:
  [ ] npm run build    — PASS / FAIL
  [ ] npx prisma validate — PASS / FAIL / N/A
  [ ] npm run lint     — PASS / FAIL / N/A
  [ ] npm run test     — PASS / FAIL / N/A

Risks:
  [list any risks created by this change]
  [classify each: LOW / MEDIUM / HIGH]

Follow-up tasks:
  [list anything this change requires next]

Approval required for:
  [list anything that needs owner sign-off before this is merged]

Open questions:
  [anything that needs clarification before proceeding]
```

For documentation-only tasks, the minimum is:

```bash
git diff --stat
git status
```

A task is not complete if:
- Checks failed and were not reported
- New secrets are hard-coded anywhere
- Economy values are hard-coded instead of coming from constants
- A new service was added without updating this AGENTS.md
- A new environment variable was added without updating `.env.example`
- The change bypasses any rule in Sections 7–9

---

## SECTION 21 — FINAL DIRECTIVE

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

When in doubt — read the repo, check this file, and ask.
```

**Anthony Hammon is the Founder and final authority.**  
**All major decisions route through him.**  
**All irreversible actions require his explicit approval.**

---

*This file is the operating law for all AI agents in the Citadel Nexus ecosystem.*  
*It must be kept current. When the build state changes, this file must be updated.*  
*The current verified state is as of 2026-05-11.*
