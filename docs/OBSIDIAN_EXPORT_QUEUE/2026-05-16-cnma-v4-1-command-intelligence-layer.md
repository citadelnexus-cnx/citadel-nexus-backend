---
title: CNMA-v4.1 Command Intelligence Layer Established
date: 2026-05-16
repo: citadel-nexus-backend
branch: docs/cnma-v4-1-agent-constitution
task_id: cnma-v4-1-agent-constitution
mode: DOCS ONLY
risk_level: YELLOW
lifecycle_phase: SHIP
skill_used: documentation-and-adrs
status: committed
files_changed:
  - AGENTS.md
  - .github/copilot-instructions.md
  - docs/AGENTS/*
  - docs/OBSIDIAN_EXPORT_QUEUE/.gitkeep
approval_required: Anthony review before merge to main
adr_created: no
tags:
  - citadel-nexus
  - agent-log
  - cnma-v4-1
  - doctrine
---

# CNMA-v4.1 Command Intelligence Layer Established

## Summary

Citadel Nexus backend now has the CNMA-v4.1 agent constitution committed on branch `docs/cnma-v4-1-agent-constitution`.

This update establishes:

- Root `AGENTS.md` as constitutional law
- Copilot/Codex bridge instructions
- Supporting operational manuals under `docs/AGENTS/`
- Obsidian export queue structure
- RALPH loop governance
- Sub-agent registry
- Tool permission matrix
- Skill registry
- Negative prompts
- Agent task and output standards
- Agent improvement protocol

## Commit

`fe2c248 docs(agents): establish CNMA v4.1 command intelligence layer`

## Safety Result

No runtime code files were modified.

No package files were modified.

No Prisma schema or migration files were modified.

No `.env` file was read, modified, staged, or committed.

## Approval Gate

This branch requires Anthony review before merge to `main`.

## Next Step

Push the branch for review, then repeat a lighter CNMA-v4.1 setup for the frontend app repo after backend review is complete.
