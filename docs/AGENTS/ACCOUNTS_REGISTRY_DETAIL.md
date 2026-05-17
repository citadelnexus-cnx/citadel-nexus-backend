# Accounts Registry Detail (CNMA-v5.0)

Root authority: ../../AGENTS.md

This operational registry expands the Accounts Registry summarized in AGENTS.md Section 25. It lists platform purposes, operational rules, and agent interaction constraints. It MUST NOT contain credentials, keys, secrets, or sensitive values. Unknown fields MUST be marked UNKNOWN and verified with Anthony before any action.

## Purpose

Provide a single, focused reference for agents and humans to understand how Citadel Nexus platform accounts operate and what agents are permitted to do.

## High-level rules

- Do NOT store or publish any credentials, keys, tokens, or secret values here.
- Mark unknown fields as UNKNOWN.
- For production-facing accounts, Anthony approval is required for changes.
- Changes to this registry should be made in a docs branch with an ADR if the change affects architecture or deployment.

## Accounts (Summary)

### GitHub — citadelnexus-cnx (Version control / CI)
- Purpose: Source control, PR workflow, CI, collaboration.
- Agent rules: may read repos, create branches, open issues, draft PRs. MUST NOT merge to main, force push, delete branches, or change repo settings.
- Unknowns: CI configuration, protected branch rules — mark UNKNOWN and verify.

### Supabase / PostgreSQL (Database)
- Purpose: Backend data store (users, progression, economy, audit logs).
- Agent rules: may inspect prisma schema and migrations, MUST NOT access dashboards, run production migrations, or use service role keys.
- Unknowns: project reference, region, plan tier — mark UNKNOWN.

### Vercel (Frontend hosting)
- Purpose: Next.js frontend deployments and preview builds.
- Agent rules: may review build logs, MUST NOT change environment variables or trigger production deployments.
- Unknowns: production domain, team account — mark UNKNOWN.

### Discord (Community platform)
- Purpose: Community interaction and gameplay interface.
- Agent rules: may review bot code and role logic, plan dry-runs; MUST NOT mutate live roles, change role IDs, or deploy commands without approval.
- Unknowns: bot account name, channels used for logs — mark UNKNOWN.

### Hedera (Blockchain / CNX token)
- Purpose: CNX token utility on Hedera Testnet (HTS/HCS as applicable).
- Agent rules: default to testnet only; MUST NOT perform mainnet transactions, mint, burn, or transfer tokens; MUST NOT handle private keys.
- Unknowns: token IDs, operator account references — mark UNKNOWN.

### Production Host (VPS / Dedicated)
- Purpose: Host backend API and Ascension bot processes.
- Agent rules: may read runbooks, MUST NOT SSH, restart PM2/nginx, or change firewall rules without approval.
- Unknowns: provider, host details — mark UNKNOWN.

### Obsidian (Vault)
- Purpose: Knowledge base and secondary brain.
- Agent rules: write export queue files to `docs/OBSIDIAN_EXPORT_QUEUE/` only; MUST NOT write secrets to notes.

### Payment Platforms (Stripe / PayPal / Gumroad)
- Purpose: Future monetization channels (if enabled).
- Agent rules: MUST NOT create charges, invoices, or access transaction records without explicit approval.

## How to update this registry

1. Create a docs branch and a PR that updates this file.
2. If the change affects deployment, accounts, or production behavior, include an ADR and flag Anthony for review.
3. Do NOT include secrets; place unknowns as UNKNOWN.
4. For any new external account, add purpose, agent rules, and mark operational unknowns explicitly.

## Agent checklist when an account is referenced

- Confirm the action is permitted by the agent rules above.
- Check AGENTS.md Section 25 for authoritative account-level rules.
- If credentials are required, STOP and escalate to Anthony.
- Add or update registry entry in this file and include an ADR if the account affects architecture or production operations.


*This document is a focused operational companion to AGENTS.md Section 25. It is not a source of secrets or credentials.*
