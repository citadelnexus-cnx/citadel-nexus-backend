# CNMA Evidence Packets

This folder stores sanitized documentation-only evidence packets used to support CNMA capability verification.

## Purpose

Evidence packets provide a controlled record of local or agent-runtime verification before any capability is upgraded from UNKNOWN to VERIFIED.

## Rules

Evidence packets may include:

- Command names
- Tool names
- Version outputs
- Sanitized terminal output
- Timestamps
- Branch names
- File paths that do not expose private data
- Human-readable summaries of screenshots

Evidence packets must not include:

- .env values
- API keys
- Private keys
- Passwords
- Tokens
- Webhook URLs
- Credential-bearing URLs
- Raw database connection strings
- Private production data
- Secrets or secret-like values

## Evidence Classes

- LOCAL_MACHINE evidence: captured from Anthony's local development machine.
- AGENT_RUNTIME evidence: captured from an approved agent/runtime environment.
- EXTERNAL_SERVICE evidence: captured from an approved external tool or service.

## Promotion Rule

A capability may move from UNKNOWN to VERIFIED only when:

1. Evidence is captured in a sanitized evidence packet.
2. The evidence identifies where and how the capability was tested.
3. The result is reproducible.
4. No secrets or private production data are included.
5. Anthony approves the promotion when the capability touches a RED-gate area.

## Stop Conditions

Stop immediately if evidence capture reveals or risks exposing:

- Credentials
- Private production data
- Environment-value files
- Database connection strings
- Discord tokens
- Wallet/CNX asset controls
- Payment or storefront credentials
- Unapproved production access

Prepared by: CNMA Master Agent docs-only process.
