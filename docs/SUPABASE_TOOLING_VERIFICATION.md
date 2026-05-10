# Citadel Nexus Supabase CLI / psql Tooling Verification v1.0

## Purpose

This document records the server-side tooling baseline required before manual Supabase export, restore, or restore-test operations.

This is a tooling verification document only.

No production database export, restore, migration, or connection action was performed during this step.

---

## Verified Environment

Runtime host:

- Backend droplet
- Repository path: /home/deploy/apps/citadel-nexus-backend

Verified tools:

- Node.js
- npm
- Supabase CLI via npx
- PostgreSQL client tooling
- pg_dump
- pg_restore
- Git repository state

---

## Tool Versions

Node.js:

- v24.15.0

npm:

- 11.12.1

Supabase CLI:

- 2.58.7

PostgreSQL client tooling:

- psql: PostgreSQL 14.22
- pg_dump: PostgreSQL 14.22
- pg_restore: PostgreSQL 14.22

---

## Installation Notes

Initial PostgreSQL tool check showed that `postgresql-client-common` alone was insufficient.

The correct package installed was:

    sudo apt install -y postgresql-client

This installed the usable PostgreSQL 14 client binaries required for:

- psql
- pg_dump
- pg_restore

---

## Current Verification Status

Status: PASS

Confirmed:

- Node runtime is available.
- npm is available.
- Supabase CLI is available through npx.
- pg_dump is installed.
- pg_restore is installed.
- PostgreSQL client tooling is installed.
- Git working tree was clean after verification.

---

## Security Boundary

No database credentials were entered during this step.

No production database connection was opened during this step.

No restore-test database connection was opened during this step.

No backup was created during this step.

No restore was performed during this step.

---

## Operational Meaning

The backend droplet is now prepared to perform future controlled Supabase manual export and restore-test procedures.

This does not prove recovery yet.

It only confirms the required command-line tooling exists.

---

## Launch Gate Impact

Production-dev readiness: PASS

Public launch readiness: HOLD

Remaining blockers:

- Manual export not yet performed.
- Restore into non-production restore-test project not yet performed.
- Restored schema/data not yet validated.
- Backup/restore recovery point and recovery time not yet proven.
