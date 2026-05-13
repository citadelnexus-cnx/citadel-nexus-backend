# Citadel Nexus Phase 2 Auth & Permission Review

## 1. Purpose

This document audits authentication, authorization, route permissions, admin controls, and exposed mutation paths.

## 2. Branch

audit/phase-2-auth-permission-review

## 3. Scope

Review only. Do not change application behavior yet.

## 4. Priority Targets

- POST /user/:id/xp
- payout mutation routes
- session dev login
- role-sync mark-synced routes
- discord-sync-worker mark-synced routes
- access expiration runner
- temp access purchase
- all-record read routes
- admin command permission boundaries

## 5. Rules

- Do not expose secrets.
- Do not edit route behavior during audit.
- Do not run migrations.
- Do not deploy Discord commands.
- Do not mutate roles.
- Do not change economy constants.
- Document findings before implementation.

## 6. Initial Status

Status:

IN_PROGRESS.

