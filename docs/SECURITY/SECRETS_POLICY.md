# Citadel Nexus Secrets Policy

## Document Purpose

This document defines the official secrets handling policy for Citadel Nexus.

It explains what counts as a secret, where secrets may be stored, where secrets must never be stored, how AI agents must handle secrets, and what to do if a secret is exposed.

This file is not public marketing copy.

AGENTS.md remains the controlling operating law.

DO_NOT_TOUCH.md defines protected systems and areas.

APPROVAL_GATES.md defines approval requirements.

---

## 1. Master Secrets Rule

Secrets must never be exposed, committed, printed, pasted, screenshotted, logged, or shared casually.

Secrets belong only in secure environment and platform settings.

If a secret may have been exposed, treat it as compromised until rotated or verified safe.

AI agents must not request secrets in chat.

AI agents must not store secrets in files.

AI agents must not print secrets to logs.

---

## 2. What Counts as a Secret

Secrets include:

- database connection strings
- Discord bot tokens
- Discord webhooks
- private keys
- seed phrases
- wallet recovery phrases
- treasury keys
- signing keys
- API keys
- GitHub tokens
- Supabase service role keys
- deployment tokens
- server SSH private keys
- production environment variables
- payment processor secret keys
- OAuth client secrets
- admin session secrets
- webhook signing secrets
- encryption keys
- backup credentials

When uncertain, treat the value as a secret.

---

## 3. High-Risk Secrets

High-risk secrets include:

- BOT_TOKEN
- DATABASE_URL
- Supabase service role key
- private wallet keys
- seed phrases
- treasury credentials
- GitHub personal access tokens
- production SSH private keys
- payment processor live secret keys
- production JWT/session secrets

These require maximum protection.

They must never be committed.

They must never be pasted into ChatGPT, Claude, GitHub Issues, PR comments, Discord, public docs, screenshots, or logs.

---

## 4. Allowed Secret Storage Locations

Secrets may be stored only in approved secure locations.

Allowed storage examples:

- server environment variables
- platform environment variable manager
- Supabase dashboard secret settings where applicable
- Vercel environment variables
- GitHub Actions secrets
- encrypted password manager
- secure server-side .env file excluded from git
- deployment platform secret manager

Secrets must not be stored in normal markdown files.

Secrets must not be stored in source code.

Secrets must not be stored in screenshots.

Secrets must not be stored in AI memory or prompts.

---

## 5. Forbidden Secret Storage Locations

Do not store secrets in:

- Git repositories
- committed .env files
- markdown documentation
- AGENTS.md
- CLAUDE.md
- GitHub Issues
- GitHub PR comments
- Discord messages
- Slack messages
- public docs
- screenshots
- AI chats
- AI prompt files
- frontend code
- browser local storage for production secrets
- public environment variables
- logs
- test fixtures with real values

---

## 6. .env File Rules

Real .env files must not be committed.

Allowed:

- .env.example with placeholder values
- .env.template with placeholder values
- documented variable names
- documented variable purpose
- documented sensitivity class

Forbidden:

- real tokens
- real private keys
- real database URLs
- real service role keys
- real wallet addresses tied to private credentials if sensitive
- real production secrets
- copied production .env content

Example placeholders are allowed.

Use values like:

- replace_me
- your_token_here
- example_database_url
- example_discord_bot_token

Never use real values as examples.

---

## 7. Public Environment Variable Rules

Frontend public environment variables must be treated carefully.

Variables starting with public prefixes may be exposed to users.

Public variables may include:

- public site URL
- public Discord invite URL
- public API base URL if intended
- public analytics ID if safe

Public variables must not include:

- API secrets
- database URLs
- service role keys
- bot tokens
- private wallet data
- admin tokens
- secret webhooks
- signing secrets
- payment secret keys

If a value must remain secret, it must never be public-prefixed.

---

## 8. Backend Environment Variable Rules

Backend environment variables may contain secrets, but must remain server-side.

Backend secrets must:

- stay out of git
- stay out of frontend bundles
- stay out of logs
- stay out of public responses
- stay out of screenshots
- be available only to the runtime that needs them
- use least privilege where possible

Backend code must not expose secrets through:

- health endpoints
- error responses
- debug routes
- public API responses
- console logs
- exception dumps
- client-side hydration
- committed snapshots

---

## 9. Discord Secret Rules

Discord secrets include:

- bot token
- webhook URLs
- client secret
- admin-only IDs if sensitive
- guild configuration if sensitive in context

Rules:

- do not paste BOT_TOKEN into chat
- do not commit BOT_TOKEN
- do not print BOT_TOKEN
- do not expose webhook URLs publicly
- do not include real webhook URLs in docs
- do not use production bot token in test docs
- rotate Discord token if exposed

Discord bot secrets belong only in secure runtime environment variables.

---

## 10. Database Secret Rules

Database secrets include:

- DATABASE_URL
- database password
- Supabase service role key
- direct connection strings
- pooled connection strings
- backup credentials
- migration credentials

Rules:

- do not commit database URLs
- do not paste database URLs into chat
- do not print database URLs in logs
- do not expose database URLs through health endpoints
- do not give agents database write credentials without approval
- do not run production SQL without approval

Use sanitized examples only.

---

## 11. Wallet and Treasury Secret Rules

Wallet and treasury secrets are critical.

Never expose:

- seed phrases
- private keys
- recovery phrases
- signing keys
- hardware wallet backup phrases
- treasury credentials
- multisig signing keys

AI agents must never request:

- seed phrases
- private keys
- wallet recovery phrases
- signing authority

Citadel Nexus must not store user private keys.

Citadel Nexus must not custody user funds unless a future legal/security architecture is explicitly approved.

Current rule:

No agent gets treasury/private key access.

---

## 12. Token and Blockchain Secret Rules

Blockchain-related secrets are critical.

Forbidden without explicit approval:

- token transfer signing
- treasury signing
- private key storage
- mainnet signing automation
- custody logic
- seed phrase handling
- token spending scripts
- agent-controlled token execution

Read-only public chain data may be used later if approved.

Signing authority must remain human-controlled and secure.

---

## 13. GitHub Secret Rules

GitHub secrets include:

- personal access tokens
- deploy keys
- GitHub Actions secrets
- repository secrets
- organization secrets
- SSH private keys

Rules:

- do not paste GitHub tokens into chat
- do not commit GitHub tokens
- do not print GitHub tokens
- do not grant agents broad GitHub permissions without approval
- use least privilege
- prefer branch-scoped and repo-scoped permissions where possible

If a GitHub token is exposed, revoke and rotate it.

---

## 14. Payment Secret Rules

Payment secrets include:

- Stripe secret keys
- PayPal secrets
- webhook signing secrets
- payment processor API keys
- payout credentials

Rules:

- do not commit payment secrets
- do not paste payment secrets into chat
- do not store payment secrets in docs
- do not expose payment secrets to frontend
- use sandbox/test keys only in test environments
- clearly label test keys versus live keys

Live payment keys are high-risk secrets.

---

## 15. Logging Rules

Logs must not contain secrets.

Do not log:

- full environment variables
- database URLs
- tokens
- private keys
- seed phrases
- payment secrets
- webhook secrets
- authorization headers
- cookies
- session secrets
- wallet private data

Safe logging may include:

- sanitized status
- last four characters of a non-secret identifier where useful
- error category
- request ID
- user ID if appropriate
- timestamp
- module name
- success or failure

Never log complete credentials.

---

## 16. Error Handling Rules

Errors must not expose secrets.

Production errors should not expose:

- stack traces with paths and secrets
- raw database errors containing credentials
- environment values
- request headers with auth tokens
- webhook payload secrets
- signing keys
- private config

Return safe error messages to users.

Log sanitized operational details only.

---

## 17. Screenshots and Screen Sharing

Before sharing screenshots, check for:

- terminal history showing secrets
- .env contents
- tokens in browser bars
- database URLs
- API keys
- webhook URLs
- private keys
- wallet seed phrases
- server IPs if sensitive
- admin dashboards with sensitive data

Do not upload screenshots containing secrets.

If a screenshot may contain secrets, stop and redact before sharing.

---

## 18. AI Agent Secret Rules

AI agents must:

- refuse to handle raw secrets in chat
- recommend secure storage locations
- use placeholder values in docs
- avoid printing env values
- avoid asking for private keys
- avoid asking for seed phrases
- avoid storing secrets in generated files
- avoid exposing secrets in completion reports
- stop when secret access is required

AI agents may say:

- store this in your deployment platform environment variables
- add this variable name to .env.example with a placeholder
- rotate the key if it was exposed

AI agents must not say:

- paste your private key here
- paste your seed phrase here
- commit this token
- send me the production .env file

---

## 19. Secret Exposure Response

If a secret is exposed:

1. Stop work.
2. Identify what secret was exposed.
3. Identify where it was exposed.
4. Do not repeat the secret.
5. Remove it from the exposed location if possible.
6. Rotate or revoke the secret.
7. Update affected environment settings.
8. Restart affected services if needed.
9. Verify the old secret no longer works.
10. Record the incident in the appropriate internal notes.
11. Review logs for misuse if applicable.

Do not continue normal work until the exposure is contained.

---

## 20. Rotation Rules

Rotate secrets when:

- they are exposed
- they are committed
- they are pasted into chat
- they appear in logs
- they appear in screenshots
- a team member/tool with access is removed
- suspicious activity occurs
- platform security recommends it
- major production security changes occur

Rotation should include:

- revoke old secret
- generate new secret
- update secure environment
- restart dependent services
- verify functionality
- confirm old secret is invalid

---

## 21. Least Privilege Rules

Secrets should use least privilege.

Use:

- read-only keys where possible
- environment-specific keys
- limited-scope tokens
- separate test and production credentials
- short-lived tokens where practical
- separate service accounts where appropriate

Avoid:

- all-powerful tokens
- shared personal tokens
- production keys in development
- long-lived broad tokens
- tokens reused across systems

---

## 22. Test and Sandbox Secret Rules

Test keys must be clearly separated from production keys.

Rules:

- label sandbox/test values clearly
- never use live secrets in tests unless approved
- never commit test secrets if they are still real credentials
- use placeholders in docs
- use dedicated test accounts when possible

Even test credentials can be sensitive.

Treat them carefully.

---

## 23. Documentation Rules

Docs may include:

- variable names
- variable purpose
- placeholder examples
- sensitivity classification
- setup instructions
- where to configure variables

Docs must not include:

- real secrets
- real private keys
- real seed phrases
- real production database URLs
- real bot tokens
- real webhook URLs
- real payment secrets
- real service role keys

---

## 24. Secret Classification

Classify secrets by risk:

LOW:

- public URLs
- public IDs
- non-sensitive config

MEDIUM:

- internal IDs
- non-public service configuration
- staging-only limited keys

HIGH:

- API keys
- database credentials
- bot tokens
- webhook secrets
- deployment tokens

CRITICAL:

- private keys
- seed phrases
- treasury credentials
- payment live secret keys
- production database owner credentials
- service role keys with broad access

High and critical secrets require strict handling.

---

## 25. Public IDs Versus Secrets

Not every ID is a secret.

May be public if intended:

- public site URL
- public Discord invite
- public token ID
- public wallet address
- public API base URL
- public social profile URL

Still use caution.

Public does not mean safe to combine with private context.

Do not expose internal mappings unnecessarily.

---

## 26. Final Secrets Directive

Do not commit secrets.

Do not paste secrets.

Do not print secrets.

Do not screenshot secrets.

Do not ask for private keys.

Do not ask for seed phrases.

Do not give agents treasury access.

Use secure environment settings.

Rotate anything exposed.
