# Citadel Nexus Production Readiness Checklist

## Document Purpose

This document defines the internal production readiness checklist for Citadel Nexus.

It explains what must be verified before any production-facing release, deployment, bot restart, schema migration, economy activation, CNX activation, dashboard write control, or agentic operation is considered safe.

This file is not public marketing copy.

AGENTS.md remains the controlling operating law.

APPROVAL_GATES.md defines approval requirements.

DO_NOT_TOUCH.md defines protected systems.

SECRETS_POLICY.md defines secrets handling rules.

IMPLEMENTATION_PHASES.md defines phase boundaries.

V3_ACCEPTANCE_TESTS.md defines knowledge-core acceptance checks.

ECONOMY_TEST_PLAN.md defines economy validation requirements.

---

## 1. Master Production Rule

Nothing is production-ready until it is verified.

Production readiness requires:

- clear scope
- owner approval
- clean git state
- secrets review
- build verification
- database review
- bot review
- backend review
- frontend review
- security review
- rollback plan
- post-deploy verification plan

Do not deploy because code exists.

Do not deploy because a tool says it is ready.

Do not deploy because an AI agent recommends it.

Do not deploy without approval.

---

## 2. Current Bootstrap Status

Current branch:

agent/bootstrap-v3-knowledge-core

Current branch purpose:

Documentation-first v3 Knowledge Core bootstrap.

Current production readiness status:

NOT READY FOR PRODUCTION DEPLOYMENT.

Reason:

This branch is documentation-only and should be reviewed through PR before merge.

No production deployment should occur from this checklist alone.

---

## 3. Production Readiness Status Values

Allowed statuses:

- PASS
- FAIL
- BLOCKED
- NOT_TESTED
- NOT_APPLICABLE
- NEEDS_REVIEW

Do not mark PASS unless verified.

Do not mark NOT_APPLICABLE unless the item truly does not apply.

---

## 4. Go / No-Go Rule

Production release is GO only if:

- all critical checks pass
- all high-risk items are approved
- no secrets are exposed
- no unauthorized schema changes exist
- rollback plan exists
- owner approval is explicit

Production release is NO-GO if:

- secrets are exposed
- migrations are unclear
- database risk is unresolved
- economy behavior is untested
- Discord role mutation risk is unresolved
- bot deployment behavior is unclear
- rollback plan is missing
- approval is missing
- critical open decisions remain unresolved

---

## 5. Documentation Readiness

Checklist:

- AGENTS.md exists.
- CLAUDE.md exists.
- docs/DOCTRINE/ exists and required files are present.
- docs/ARCHITECTURE/ exists and required files are present.
- docs/BUILD/ exists and required files are present.
- docs/SECURITY/ exists and required files are present.
- docs/QA/ exists and required files are present.
- Known formatting issues are documented.
- No docs contain real secrets.
- No docs claim future systems are live.

Status:

NOT_TESTED.

---

## 6. Git Readiness

Checklist:

- Correct branch confirmed.
- git status is clean before release.
- Latest commits reviewed.
- Branch is pushed to remote.
- Pull request exists if merge is intended.
- PR diff reviewed.
- Changed files are expected.
- No unrelated files included.
- No application logic changed accidentally.
- No generated junk files committed.
- No .env files committed.

Suggested commands:

- git status
- git log --oneline -20
- git diff main...HEAD --stat
- git diff main...HEAD --name-only
- find docs -maxdepth 2 -type f | sort

Status:

NOT_TESTED.

---

## 7. Secret Readiness

Checklist:

- No BOT_TOKEN committed.
- No DATABASE_URL committed.
- No private keys committed.
- No seed phrases committed.
- No Supabase service role key committed.
- No GitHub token committed.
- No payment secret committed.
- No webhook secret committed.
- No production .env committed.
- Screenshots reviewed for secrets.
- Logs reviewed for secrets if shared.
- Secret placeholders are clearly fake.

Suggested checks:

- grep for BOT_TOKEN.
- grep for DATABASE_URL.
- grep for PRIVATE KEY.
- grep for seed phrase language.
- confirm .gitignore protects .env files.

Status:

NOT_TESTED.

---

## 8. Backend Readiness

Checklist:

- Backend builds successfully.
- Backend starts in intended environment.
- Health endpoint works.
- Database health endpoint works.
- Routes are service-backed.
- Error responses do not expose secrets.
- CORS configuration is approved.
- Environment variables are configured securely.
- Admin routes are protected or not exposed.
- No debug-only routes are public.
- No stack traces are exposed in production.
- Backend remains source of truth.

Suggested checks:

- npm run build
- npm run test if available
- npm run lint if available
- manual /health check
- manual /health/db check

Status:

NOT_TESTED.

---

## 9. Database Readiness

Checklist:

- Prisma schema reviewed.
- No unauthorized schema changes.
- No unauthorized migrations.
- npx prisma validate passes.
- Production migration plan exists if migration is needed.
- Rollback/recovery plan exists if migration is needed.
- Production database backup state is known.
- Audit records are preserved.
- No destructive SQL planned without approval.
- No evidence/audit data deleted.
- Future tables are not added early.

Suggested checks:

- npx prisma validate
- git diff main...HEAD -- prisma/schema.prisma
- git diff main...HEAD -- prisma/migrations

Status:

NOT_TESTED.

---

## 10. Discord Bot Readiness

Checklist:

- Bot entry point confirmed.
- Bot token stored securely.
- Bot command changes reviewed.
- Slash command registration scope confirmed.
- Admin commands permission-checked.
- Role sync behavior reviewed.
- Live role mutation changes approved.
- Bot restart plan exists if restart needed.
- Bot rollback plan exists if deploy needed.
- Bot does not define backend truth.
- Bot responses do not expose secrets.

Suggested checks:

- review bot runtime entry
- review command files
- review role registry/map files
- review admin commands
- test in controlled guild if applicable

Status:

NOT_TESTED.

---

## 11. Frontend Readiness

Checklist:

- Frontend builds successfully.
- Public pages render.
- Member pages use backend APIs safely.
- Public environment variables are safe.
- No backend secrets exposed to client.
- No admin-only data exposed.
- No wallet secrets exposed.
- No false live-system claims.
- No guaranteed reward claims.
- No investment-return claims.
- Dashboard write controls are not accidentally live.

Suggested checks:

- npm run build
- npm run lint if available
- review public env variables
- inspect built/public output where needed

Status:

NOT_TESTED.

---

## 12. Economy Readiness

Checklist:

- Economy values documented.
- XP sources identified.
- Resource sources identified.
- Mission costs reviewed.
- Claim cooldown reviewed.
- Build costs reviewed.
- Rank thresholds reviewed.
- Stage thresholds reviewed.
- Caps reviewed.
- Lock behavior reviewed.
- Admin economy actions audited.
- Prize systems remain separate.
- CNX cannot buy progress.
- Economy test plan completed or gaps documented.

Required reference:

docs/QA/ECONOMY_TEST_PLAN.md

Status:

NOT_TESTED.

---

## 13. CNX Readiness

Checklist:

- CNX remains optional.
- CNX automation is not accidentally live.
- CNX spending is not enabled.
- CNX-to-resource conversion is not enabled.
- CNX-to-prize guarantee is not enabled.
- Wallet verification remains approved-only.
- No private key handling exists.
- No seed phrase handling exists.
- No treasury access for agents exists.
- Public CNX wording is safe and accurate.

Status:

NOT_TESTED.

---

## 14. Prize and Payout Readiness

Checklist:

- Prize execution is not accidentally live.
- Payout logic is reviewed if touched.
- Prize eligibility is not automatic without approval.
- Prize records are separate from XP/resources.
- Abuse review exists before payout.
- Approval record exists before payout.
- No CNX holding guarantees prizes.
- No leaderboard auto-pays rewards.
- No AI agent can issue prizes.

Status:

NOT_TESTED.

---

## 15. Security Readiness

Checklist:

- DO_NOT_TOUCH.md reviewed.
- SECRETS_POLICY.md reviewed.
- PERMISSION_MODEL.md reviewed.
- WALLET_AND_TREASURY_BOUNDARIES.md reviewed.
- Least privilege preserved.
- Admin permissions reviewed.
- Production access reviewed.
- Secrets are isolated.
- Treasury access is isolated.
- Agents remain approval-gated.
- Emergency controls are not exposed early.

Status:

NOT_TESTED.

---

## 16. Permission Readiness

Checklist:

- Owner authority preserved.
- Admin permissions reviewed.
- Moderator permissions reviewed if applicable.
- Bot permissions reviewed.
- Dashboard permissions reviewed if applicable.
- Agent permissions reviewed.
- No agent self-approval.
- No unauthorized admin route.
- No public write endpoint.
- No frontend-only admin authority.

Status:

NOT_TESTED.

---

## 17. Dashboard Readiness

Checklist:

- Dashboard is static or read-only unless explicitly approved.
- Dashboard write controls remain locked.
- Emergency controls remain locked.
- No fake button performs real action unexpectedly.
- Auth exists before admin dashboard writes.
- Authorization exists before admin dashboard writes.
- Reason codes exist before writes.
- Audit logs exist before writes.
- Owner approval exists before write controls.

Status:

NOT_TESTED.

---

## 18. Agentic AI Readiness

Checklist:

- AGENTS.md reviewed.
- CLAUDE.md reviewed.
- Agent scope is clear.
- Agent cannot merge to main.
- Agent cannot deploy production.
- Agent cannot run migrations.
- Agent cannot mutate live Discord roles.
- Agent cannot issue XP.
- Agent cannot issue prizes.
- Agent cannot access secrets.
- Agent cannot access treasury/private keys.
- Agent must produce completion reports.

Status:

NOT_TESTED.

---

## 19. Deployment Plan Readiness

Checklist:

- Deployment target identified.
- Deployment command identified.
- Deployment owner identified.
- Deployment window identified if needed.
- Affected systems listed.
- Expected downtime listed if any.
- Environment variables confirmed.
- Build command confirmed.
- Start command confirmed.
- PM2 process impact reviewed if applicable.
- Nginx impact reviewed if applicable.
- Rollback plan written.
- Post-deploy checks written.
- Owner approval recorded.

Status:

NOT_TESTED.

---

## 20. Rollback Readiness

Checklist:

- Previous known-good commit identified.
- Rollback command or process identified.
- Database rollback plan exists if database changed.
- Bot rollback plan exists if bot changed.
- Frontend rollback plan exists if frontend changed.
- Environment rollback plan exists if env changed.
- Role sync rollback plan exists if role sync changed.
- Incident communication plan exists if user-facing issue occurs.

Status:

NOT_TESTED.

---

## 21. Monitoring Readiness

Checklist:

- Health endpoint checked.
- Database health checked.
- Bot online state checked if applicable.
- Error logs checked.
- Discord command errors checked if applicable.
- Role sync errors checked if applicable.
- Economy anomalies checked if applicable.
- User-facing page checks completed.
- Post-deploy watch window defined if production deploy.

Status:

NOT_TESTED.

---

## 22. Public Messaging Readiness

Checklist:

- No investment-return claims.
- No guaranteed reward claims.
- No false live-system claims.
- No required CNX purchase claims.
- No pay-to-win implication.
- Roadmap language is accurate.
- What-is-live is accurate.
- What-is-not-live is accurate.
- Discord announcement approved if needed.
- Website copy approved if affected.

Status:

NOT_TESTED.

---

## 23. Final Knowledge-Core Review Checklist

For the current v3 Knowledge Core branch, verify:

- all docs exist
- all docs are committed
- all docs are pushed
- branch is up to date
- only intended docs changed
- no app logic changed unexpectedly
- no secrets committed
- known formatting issues documented
- open decisions documented
- PR can be opened for review
- owner review requested

Status:

PENDING until final verification.

---

## 24. Final Production No-Go Conditions

Production is blocked if any of the following are true:

- secrets are exposed
- approval is missing
- git status is dirty unexpectedly
- migrations are unclear
- production env changes are unclear
- rollback plan is missing
- economy behavior is untested
- live role mutation risk is unresolved
- CNX automation risk is unresolved
- dashboard write controls are unsecured
- bot token risk exists
- database backup/recovery state is unknown
- public messaging overclaims
- owner has not approved

---

## 25. Final Readiness Directive

Verify before deploy.

Approve before production.

Back up before risky changes.

Rollback before guessing.

Monitor after release.

Do not rush high-risk systems.

Do not let agents deploy alone.

Do not bypass Anthony Hammon.

