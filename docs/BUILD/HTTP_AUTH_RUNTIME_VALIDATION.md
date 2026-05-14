# Citadel Nexus HTTP Auth Runtime Validation

## Status

PASSED WITH CONFIG FOLLOW-UP REQUIRED.

## Branch

test/http-auth-runtime-validation

## Date

2026-05-14 UTC

## Purpose

Validate that the merged HTTP route permission layer behaves correctly at runtime after PR #4.

## Runtime Recovery Note

Initial smoke testing returned unexpected `200` responses on protected routes because the live PM2 backend had not yet been restarted onto the updated compiled build.

After running:

```bash
npm run build
pm2 restart citadel-backend --update-env
```

the backend loaded the updated auth-protected runtime.

## Build Verification

`npm run build` passed.

Compiled `dist/` output confirmed presence of:

- `requireAdmin`
- `requireOwnerOrAdmin`
- `requireSession`
- `requireInternalWorker`
- `requireProductionDisabled`

## Health Checks

| Route | Expected | Actual | Result |
|---|---:|---:|---|
| GET /health | 200 | 200 | PASS |
| GET /health/db | 200 | 200 | PASS |

## Public Route Checks

| Route | Expected | Actual | Result |
|---|---:|---:|---|
| GET /ascension-summary/public/discord/:discordId | 200 or 404 | 404 | PASS |
| GET /token/info | 200 if Hedera config valid | 500 | CONFIG FOLLOW-UP |

## Protected No-Auth Route Checks

| Route | Expected | Actual | Result |
|---|---:|---:|---|
| GET /session/me | 401 | 401 | PASS |
| GET /access | 403 | 403 | PASS |
| GET /entitlements | 403 | 403 | PASS |
| GET /role-sync | 403 | 403 | PASS |
| GET /payout/log/all | 403 | 403 | PASS |
| GET /discord-sync-worker | 403 or 500 | 500 | PASS - fail closed |

## Production-Disabled Route Checks

| Route | Expected | Actual | Result |
|---|---:|---:|---|
| POST /session/dev-login | 403 | 403 | PASS |
| POST /user/create | 403 | 403 | PASS |

## Owner Route Checks Without Session

| Route | Expected | Actual | Result |
|---|---:|---:|---|
| GET /user/smoke-test-user-id | 401 | 401 | PASS |
| GET /member-state/smoke-test-user-id | 401 | 401 | PASS |
| GET /access/smoke-test-user-id | 401 | 401 | PASS |
| GET /entitlements/user/smoke-test-user-id | 401 | 401 | PASS |

## Environment Follow-Ups

The following production environment values were missing during initial no-auth validation and were later configured securely outside Git before authorized runtime testing:

- `HTTP_ADMIN_DISCORD_IDS`
- `INTERNAL_WORKER_SECRET`

The following route has a separate configuration issue unrelated to HTTP route auth:

- `GET /token/info` returns `500` due to missing Hedera/token configuration.

## Conclusion

The HTTP route permission layer is active at runtime and fails closed correctly for unauthenticated requests.

Do not test valid admin-header or worker-secret flows until the missing environment variables are configured securely outside Git.

---

## Authorized Read-Only Runtime Validation

## Status

PASSED.

## Date

2026-05-14 UTC

## Purpose

Validate positive authorized read-only access after configuring production HTTP auth environment values outside Git.

## Secure Environment Configuration

Configured outside Git:

- `HTTP_ADMIN_DISCORD_IDS`
- `INTERNAL_WORKER_SECRET`

Secret values were not printed, committed, or stored in documentation.

## Authorized Admin Read-Only Checks

| Route | Expected | Actual | Result |
|---|---:|---:|---|
| GET /access | 200 | 200 | PASS |
| GET /entitlements | 200 | 200 | PASS |
| GET /role-sync | 200 | 200 | PASS |
| GET /payout/log/all | 200 | 200 | PASS |

## Authorized Worker Read-Only Checks

| Route | Expected | Actual | Result |
|---|---:|---:|---|
| GET /discord-sync-worker | 200 | 200 | PASS |

## Negative Control Checks

| Route | Expected | Actual | Result |
|---|---:|---:|---|
| GET /access with invalid admin header | 403 | 403 | PASS |
| GET /discord-sync-worker with invalid worker secret | 403 | 403 | PASS |

## Conclusion

HTTP route permission validation is complete for:

- unauthenticated fail-closed behavior
- production-disabled route behavior
- owner-route no-session rejection
- authorized admin read-only access
- authorized worker read-only access
- invalid admin/worker rejection

Remaining unrelated follow-up:

- Resolve Hedera/token configuration causing `GET /token/info` to return `500`.
