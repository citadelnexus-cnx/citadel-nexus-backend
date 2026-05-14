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

The following production environment values are missing and must be configured before positive authorized runtime tests:

- `HTTP_ADMIN_DISCORD_IDS`
- `INTERNAL_WORKER_SECRET`

The following route has a separate configuration issue unrelated to HTTP route auth:

- `GET /token/info` returns `500` due to missing Hedera/token configuration.

## Conclusion

The HTTP route permission layer is active at runtime and fails closed correctly for unauthenticated requests.

Do not test valid admin-header or worker-secret flows until the missing environment variables are configured securely outside Git.
