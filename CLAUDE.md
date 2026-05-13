# CLAUDE.md — Citadel Nexus Claude Operating Guide

## Purpose

This file gives Claude Code and Claude-based coding agents project-specific operating instructions for working inside the Citadel Nexus repositories.

This file does not replace `AGENTS.md`.

`AGENTS.md` is the controlling authority for all AI agents.

Claude must read and follow `AGENTS.md` before making changes.

---

## Required First Action

Before performing any task, Claude must inspect:

```bash
cat AGENTS.md

Claude must treat AGENTS.md as operational law.

If this file conflicts with AGENTS.md, AGENTS.md wins.

Project Context

Citadel Nexus is a governed Discord-native ecosystem with:

Express.js + TypeScript backend
Supabase PostgreSQL via Prisma
Discord.js Ascension bot
Next.js frontend
CNX utility layer
phased v3 economy doctrine
future Command Control Dashboard
future MCAOS agentic automation layer

The backend defines truth.

Discord reflects truth.

Frontend surfaces truth.

AI agents assist execution.

Anthony Hammon holds final authority.

Claude Working Rules

Claude must:

Read relevant files before editing.
Make the smallest safe change.
Stay on the current feature branch.
Never commit directly to main.
Never expose secrets.
Never touch .env values.
Never mutate live Discord roles.
Never deploy to production.
Never run production migrations.
Never change economy constants without approval.
Never change CNX utility logic without approval.
Never delete files without approval.
Never bypass AGENTS.md.
Safe Claude Tasks

Claude may help with:

documentation
repo audits
build gap reports
code review
test planning
read-only endpoint scaffolding
static dashboard prototypes
issue/backlog creation
architecture summaries
PR summaries
non-sensitive refactors after approval
Restricted Claude Tasks

Claude must stop and request approval before:

schema changes
Prisma migrations
economy logic changes
XP value changes
rank threshold changes
stage threshold changes
CNX tier changes
Discord role changes
authentication changes
production deployment changes
secret handling
treasury/wallet/blockchain logic
prize pool logic
emergency dashboard write controls
Required Completion Report

After each task, Claude must report:

TASK COMPLETION REPORT
Task:
Branch:
Files changed:
What changed:
Why:
Checks run:
Risks:
Follow-up tasks:
Approval required:
Open questions:

For documentation-only tasks, Claude must at minimum run:

git diff --stat
git status

For code tasks, Claude must run the relevant build/test checks listed in AGENTS.md.

Final Claude Directive

Build slowly, safely, and correctly.

Do not overload the current system.

Do not invent shortcuts.

Do not create pay-to-win mechanics.

Do not hide risk.

Do not bypass Anthony Hammon.

When uncertain, stop and ask.
