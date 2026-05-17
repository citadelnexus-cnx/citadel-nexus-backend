Root authority: ../../AGENTS.md

# CNMA v5.8 — Agent Evidence Packet Standard

Last updated: 2026-05-17
Mode: DOCS ONLY — branch: docs/cnma-v5-8-evidence-packet-standard

1. Root authority reference
---------------------------
AGENTS.md (CNMA-v5.0) is the single root constitutional authority. This standard is a supporting doc and does not override AGENTS.md.

2. Purpose
----------
Define a standard folder layout, naming convention, required metadata, allowed evidence types, redaction rules, reviewer checklist, and the promotion path for evidence that converts UNKNOWN tools to VERIFIED. Evidence packets are documentation artifacts only.

3. Evidence packet folder standard
---------------------------------
Location: docs/AGENTS/EVIDENCE_PACKETS/
Structure:
- docs/AGENTS/EVIDENCE_PACKETS/LOCAL/  → local machine captures
- docs/AGENTS/EVIDENCE_PACKETS/AGENT_RUNTIME/  → agent-runtime captures (rare; only with approval)
- docs/AGENTS/EVIDENCE_PACKETS/APPROVALS/  → Improvement Proposals, approvals, Obsidian export references
- docs/AGENTS/EVIDENCE_PACKETS/.gitkeep

4. Evidence packet naming convention
-----------------------------------
Use exact, machine-sortable names:
YYYYMMDD-HHMMSS-[actor]-[scope]-[short].(txt|md|json|log)
Examples:
- 20260517-091233-local-git-version.txt
- 20260517-094512-local-prisma-version.txt
- 20260517-101000-approval-anthony-adp.json

5. Required packet sections
---------------------------
Each packet must include a top-level metadata header (YAML preferred) followed by evidence content.
YAML metadata (required):
---
title: "Short title"
date: 2026-05-17T09:12:33Z
repo: citadelnexus-cnx/citadel-nexus-backend
branch: docs/cnma-v5-6-tool-capability-inventory
task_id: [task-id]
agent_persona: [CNMA Master Agent | profile name]
evidence_type: [LOCAL | AGENT_RUNTIME]
command: [e.g., git --version]
actor: [username or human operator]
machine: [hostname or identifier]
os: [e.g., win32 x64]
tool_version: [if applicable]
exit_code: [integer]
redaction: [NONE | PARTIAL | FULL]
verified_status: [UNKNOWN | LOCAL_VERIFIED | VERIFIED | BLOCKED | REJECTED]
attachments: [list of filenames]
---

6. Allowed evidence types
-------------------------
- Exact command stdout/stderr (text)
- Exit code
- Tool/version output (e.g., git --version)
- Small diffs or file lists
- Sanitized logs with redactions noted
- Text summary of screenshots (do not embed raw images in repo; store off-vault and reference hash)
- JSON metadata from tools (sanitized)

7. Forbidden evidence types
---------------------------
- Any secrets: tokens, API keys, credentials, private keys, passwords
- .env contents or environment variable values carrying secrets
- Raw database connection strings or production credentials
- Webhook URLs or credential-bearing URLs
- Raw production data (customer PII, payment data, etc.)
If forbidden data is discovered in an evidence capture, STOP (see Stop conditions) and escalate.

8. Redaction requirements
-------------------------
- If sensitive strings appear, redact and replace with: [REDACTED: description]
- Document redaction reason in metadata and the original data type (not the value)
- Keep copies of original secure evidence OUTSIDE the repo in a secure vault (follow org policy). The repo must never contain raw secrets.

9. Local machine vs agent-runtime evidence distinction
-----------------------------------------------------
- LOCAL evidence: Captured by a human operator on an approved machine. Label: evidence_type: LOCAL and verified_status: LOCAL_VERIFIED when checked.
- AGENT_RUNTIME evidence: Captured by agent runtime (rare). Label: evidence_type: AGENT_RUNTIME. Agent-runtime captures require explicit approval and must include execution context, runtime identity, and IAM token references (stored in secret manager only).

10. Verification status labels
------------------------------
- UNKNOWN — No evidence yet
- LOCAL_VERIFIED — Local machine evidence captured and reviewed
- VERIFIED — Agent-runtime evidence captured and security-reviewed; can be used to reclassify tools
- BLOCKED — RED-gate capability; cannot be enabled without approval
- REJECTED — Evidence incomplete, contains forbidden items, or failed verification

11. Required reviewer checklist
-------------------------------
Reviewer must confirm:
- [ ] Metadata header present and complete
- [ ] Exact command recorded
- [ ] Exact output included (or sanitized) and not paraphrased
- [ ] Exit code present
- [ ] Redactions applied correctly with reason
- [ ] No secrets or forbidden types present
- [ ] Evidence stored in correct folder and filename format
- [ ] Security SCA/License check (if binary or dependency involved)
- [ ] Approval recorded (if changing status to VERIFIED)

12. Promotion rule from UNKNOWN to VERIFIED
-------------------------------------------
To promote a tool from UNKNOWN → VERIFIED for agent-runtime use:
1. Capture local evidence and store packet (LOCAL_VERIFIED).
2. Run security/dep/license SCA and document results.
3. Draft Improvement Proposal describing intended runtime use, risks, and rollback.
4. Obtain Security Warden review and sign-off.
5. Obtain Anthony approval (explicit). Record approval in APPROVALS packet.
6. Update Tool Capability Inventory and AGENT_OPERATING_CAPABILITY_MATRIX.md with exact evidence links and status.

13. Stop conditions
-------------------
- Evidence contains secrets or potential exposures → STOP and escalate to Security Warden and Anthony.
- Missing or malformed metadata → mark REJECTED and request recapture.
- Evidence cannot be reproduced locally → mark REJECTED and document why.

14. No-change confirmations
--------------------------
- This standard is DOCS ONLY. No runtime code, package files, schema, migrations, or production systems are modified by these packets.
- AGENTS.md remains the root authority and RED/YELLOW/GREEN gates remain enforced.

15. Recommended next phase
--------------------------
- Create docs/AGENTS/EVIDENCE_PACKETS/ and capture initial LOCAL packets per TOOL_CAPABILITY_INVENTORY checks.
- Run security SCA on any binary/dependency evidence.
- Prepare Improvement Proposals for any desired runtime enablement.

Appendix: Sample evidence packet filename & minimal content
----------------------------------------------------------
Filename: 20260517-103000-local-git-version.txt
Contents:
---
title: git version capture
date: 2026-05-17T10:30:00Z
repo: citadelnexus-cnx/citadel-nexus-backend
branch: docs/cnma-v5-6-tool-capability-inventory
evidence_type: LOCAL
command: git --version
actor: anthony
machine: anthony-laptop
tool_version: git version 2.49.0.windows.1
exit_code: 0
verified_status: LOCAL_VERIFIED
---

git version 2.49.0.windows.1


Produced by: CNMA Master Agent (docs-only)
