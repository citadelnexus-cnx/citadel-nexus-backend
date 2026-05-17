Root authority: ../../AGENTS.md

# Web Fetch Policy (CNMA v5.3)

Purpose: Define safe, auditable rules for outbound HTTP/web_fetch operations from agent runtimes.

Policy summary
- Allowed sources: Public, non-authenticated, non-sensitive content only.
- Forbidden: Any fetch that requests or transmits secrets, private repo data, internal endpoints, or credential-bearing URLs.
- Sanitization: All fetched content must be sanitized before inclusion in notes or outputs (remove tokens, keys, private URLs).
- Logging: All web_fetch calls must be logged (timestamp, URL, response headers summary) with sanitized response excerpts.
- Rate limits and timeouts: Enforce reasonable timeouts and rate limits; avoid large downloads.

Operational rules
1. web_fetch is treated as UNKNOWN in this audit until runtime availability is verified locally.
2. For any external API that requires credentials: store credentials in a secrets manager (not .env); obtain Anthony approval before enabling.
3. Do not use web_fetch to retrieve private repo contents or to call internal infrastructure APIs.
4. For research tasks, prefer canonical public sources (official docs, RFCs, vendor docs) and cite URLs.
5. All web_fetch outputs used as evidence must include the exact sanitized command/response and be recorded in Obsidian export if YELLOW/RED.

Approval gates
- Enabling programmatic external API access (authenticated) requires an Improvement Proposal and Anthony approval.
- Public-only, read-only web_fetch for research may be enabled after local verification and reviewer confirmation (YELLOW).

Sanitization checklist
- Remove Authorization headers and cookie values
- Redact IPs and internal hostnames
- Remove query parameters that appear to contain tokens
- Replace secret-like strings with [REDACTED]

Failure mode
- If a web_fetch returns suspected secrets or private data, stop and report as a security incident (Obsidian note, Security Warden, escalate to Anthony).
