# Citadel Nexus Production Monitoring Checklist v1.0

## Purpose

This checklist defines the repeatable operating checks for the current Citadel Nexus production-dev runtime.

The goal is to confirm that the frontend, backend API, Discord Ascension runtime, PM2 process manager, database connection, and repository state remain healthy without relying on a local development machine.

---

## Daily Quick Check

Run these commands from the backend droplet:

```bash
cd /home/deploy/apps/citadel-nexus-backend
pm2 status
curl -i https://api.citadelnexus.app/ -H "Origin: https://citadelnexus.app"
git status
