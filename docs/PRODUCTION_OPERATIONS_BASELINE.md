# Citadel Nexus Production Operations Baseline v1.0

## Purpose

This document records the current production-dev operating baseline for Citadel Nexus.

The goal is to keep the frontend, backend API, database connection, and Discord Ascension runtime persistent, inspectable, and operational without relying on a local development machine.

---

## Current Operating Model

Citadel Nexus currently runs as three separated production surfaces:

- Public frontend: `https://citadelnexus.app`
- Backend API: `https://api.citadelnexus.app`
- Discord Ascension runtime: persistent PM2 process on the backend droplet

The backend remains the source of truth.

Discord is an interface.

The frontend reflects backend-defined state.

---

## PM2 Runtime Processes

The backend droplet should maintain these PM2 processes:

```txt
citadel-backend
citadel-ascension
