# Citadel Nexus Wallet and Treasury Boundaries

## Document Purpose

This document defines the official wallet, treasury, token, signing, custody, and blockchain boundary rules for Citadel Nexus.

It explains what Citadel Nexus may do, what it must not do, what requires explicit approval, and how wallet/CNX/treasury systems must remain protected.

This file is not public marketing copy.

AGENTS.md remains the controlling operating law.

DO_NOT_TOUCH.md defines protected areas.

SECRETS_POLICY.md defines secrets handling rules.

PERMISSION_MODEL.md defines authority and access boundaries.

APPROVAL_GATES.md defines approval requirements.

---

## 1. Master Wallet and Treasury Rule

Citadel Nexus must not custody user funds.

Citadel Nexus must not request seed phrases.

Citadel Nexus must not request private keys.

Citadel Nexus must not give AI agents signing authority.

Citadel Nexus must not allow CNX to create pay-to-win mechanics.

Citadel Nexus must not execute treasury actions without explicit owner approval.

Wallet and treasury systems are critical-risk systems.

When uncertain, stop and ask.

---

## 2. Core Boundary Doctrine

Wallets and treasury systems must remain separated from gameplay authority.

CNX may become an optional utility and recognition layer.

CNX must not become required for basic gameplay.

CNX must not buy rank.

CNX must not buy Stage.

CNX must not buy admin access.

CNX must not guarantee prizes.

CNX must not bypass moderation locks.

CNX must not bypass hard caps.

Treasury assets must remain human-controlled and protected.

---

## 3. Current Wallet Status

Current wallet and treasury status:

Controlled / deferred.

Current allowed work:

- documentation
- architecture planning
- read-only design
- security boundary definition
- future wallet verification planning
- future CNX tier snapshot planning
- future dashboard monitoring planning

Current disallowed work:

- production wallet automation
- mainnet token transfer logic
- private key handling
- seed phrase handling
- treasury signing
- token spending
- custody logic
- CNX-to-resource conversion
- automated prize payout
- automated CNX utility activation

---

## 4. Approved Wallet Principles

Citadel Nexus wallet systems must follow these principles:

- non-custodial by default
- read-only before write-capable
- public-chain reads before any signing
- no private key storage
- no seed phrase storage
- no agent signing authority
- no treasury access for agents
- least privilege
- explicit approval for every high-risk action
- auditability
- reversible where possible
- fail closed
- no pay-to-win

---

## 5. Forbidden Wallet Actions

Forbidden actions:

- asking users for seed phrases
- asking users for private keys
- asking users for wallet recovery phrases
- storing user private keys
- storing user seed phrases
- storing treasury private keys
- storing treasury seed phrases
- custodying user funds
- spending user funds
- transferring user tokens
- signing user transactions
- signing treasury transactions through AI agents
- allowing AI agents to approve token transfers
- allowing Discord commands to spend tokens
- allowing dashboard controls to spend tokens without approved architecture
- allowing CNX spending before approval
- allowing CNX-to-resource conversion
- allowing token purchase to bypass gameplay

These remain forbidden unless a future legal, security, technical, and owner-approved architecture explicitly changes the boundary.

---

## 6. User Wallet Boundary

User wallets are user-controlled.

Citadel Nexus may eventually verify public wallet state if approved.

Citadel Nexus must not:

- control user wallets
- custody user assets
- require wallet access for basic gameplay
- request private keys
- request seed phrases
- request signing authority unnecessarily
- store sensitive wallet secrets
- move user assets
- lock user assets
- promise returns from user wallet holdings

Future wallet verification must be read-only unless separately approved.

---

## 7. Treasury Wallet Boundary

Treasury wallets are critical-risk assets.

Treasury wallets may hold:

- CNX assets
- project assets
- operational funds
- reward pool assets if approved
- ecosystem reserves if approved

Treasury wallets must not be controlled by:

- AI agents
- Discord commands
- unaudited scripts
- public frontend code
- unapproved dashboard controls
- unsecured server processes
- exposed environment variables

Treasury actions require explicit approval.

---

## 8. Treasury Action Approval Requirements

Treasury actions require:

- exact action
- amount
- token/asset
- source wallet
- destination wallet
- reason
- risk level
- approval
- signing method
- verification plan
- post-action record

Treasury actions include:

- transfers
- token association changes
- token minting if applicable
- token burning if applicable
- reward distribution
- liquidity actions
- wallet reconfiguration
- key rotation
- multisig configuration
- treasury role changes

Do not perform treasury actions casually.

---

## 9. AI Agent Treasury Boundary

AI agents must never receive:

- treasury private keys
- seed phrases
- signing keys
- custody permissions
- token transfer authority
- mainnet signing authority
- wallet recovery credentials
- direct access to treasury dashboards where signing is possible

AI agents may help with:

- documentation
- risk review
- checklist creation
- public-chain read-only planning
- transaction checklist drafting
- post-action report templates
- wallet architecture diagrams without secrets

AI agents may not execute treasury transactions.

---

## 10. Discord Bot Wallet Boundary

The Discord bot must not:

- request wallet seed phrases
- request private keys
- custody assets
- execute token transfers
- sign wallet transactions
- spend CNX
- grant resources in exchange for CNX
- grant rank in exchange for CNX
- grant Stage in exchange for CNX
- guarantee prizes from CNX
- mutate holder roles without backend-approved logic

Future Discord wallet features may include:

- read-only verification prompt
- wallet verification status display
- CNX tier status display
- holder role sync through backend truth
- stale verification warning
- public-safe wallet education

All live wallet verification requires approval.

---

## 11. Frontend Wallet Boundary

The frontend must not:

- expose private keys
- store private keys
- request seed phrases
- embed treasury secrets
- expose server-only wallet credentials
- contain token transfer secrets
- directly define CNX tier truth
- directly mutate backend wallet state
- promise investment returns
- make guaranteed reward claims

Future frontend wallet UI may include:

- wallet connection prompt if approved
- read-only public address display if approved
- CNX tier display if approved
- wallet safety notice
- verification status
- public-chain data display

Frontend wallet UI must clearly avoid custody claims.

---

## 12. Backend Wallet Boundary

The backend may eventually perform approved read-only public-chain verification.

Backend wallet logic must not:

- store user private keys
- store seed phrases
- expose treasury secrets
- execute token transfers without approval
- sign transactions through unapproved automation
- allow unauthenticated wallet writes
- allow frontend-only validation
- bypass audit logs
- bypass phase gates

Future backend wallet verification must include:

- phase check
- input validation
- public address validation
- read-only chain query
- tier calculation
- snapshot record if approved
- stale data handling
- error handling
- audit/logging where appropriate
- no private key handling

---

## 13. CNX Utility Boundary

CNX utility must remain optional.

Allowed future utility categories may include:

- recognition
- holder role reflection
- early access
- cosmetic visibility
- limited capped multiplier
- cooldown modifier within approved bounds
- dashboard-visible holder status
- public profile badge if approved

Forbidden CNX utility:

- direct XP purchase
- direct resource purchase
- rank purchase
- Stage purchase
- prize guarantee
- admin access
- moderation access
- bypassing locks
- bypassing anti-abuse
- bypassing hard caps
- required participation
- investment-return framing

CNX must enhance participation, not replace earned progress.

---

## 14. CNX Verification Boundary

Future CNX verification should follow a safe sequence.

Phase 1:

- manual review only if needed
- no production automation
- no private keys
- no seed phrases
- no automatic benefits unless approved

Future read-only phase:

- validate wallet address
- read public chain data
- calculate tier
- store snapshot if approved
- update holder status if approved
- log verification event
- handle stale state
- fail closed on error

Future automation phase:

- requires owner approval
- requires audit logs
- requires abuse protections
- requires rollback plan
- requires dashboard monitoring
- requires freeze control plan

---

## 15. CNX Tier Boundary

CNX tier thresholds and multipliers are high-risk economy values.

Do not change without approval:

- tier names
- tier thresholds
- XP multipliers
- cooldown modifiers
- special access benefits
- holder role mappings
- grace periods
- stale snapshot policy

CNX tiers must not:

- block normal progression
- create required purchases
- bypass daily/weekly caps
- bypass hard caps
- override moderation locks
- guarantee prizes
- create financial claims

---

## 16. Signing Boundary

Signing authority is critical.

Signing includes:

- token transfers
- treasury transfers
- smart contract calls
- token minting
- token burning
- wallet association if applicable
- governance or admin chain actions
- any transaction requiring a private key or wallet approval

Signing must remain human-controlled unless a future approved security architecture exists.

AI agents must not sign.

Discord bots must not sign.

Frontend code must not hold signing keys.

Backend services must not sign mainnet transactions without explicit approval.

---

## 17. Mainnet Boundary

Mainnet actions are critical-risk actions.

Mainnet work requires:

- exact purpose
- exact transaction type
- asset/token involved
- wallet involved
- signing method
- approval
- testnet rehearsal if applicable
- verification plan
- rollback/recovery plan where possible
- post-action record

Forbidden without approval:

- mainnet token transfer
- mainnet treasury action
- mainnet wallet automation
- mainnet token mint/burn
- mainnet reward distribution
- mainnet contract interaction
- automated mainnet signing

---

## 18. Testnet Boundary

Testnet work is lower risk than mainnet but still requires care.

Allowed with approval:

- testnet read experiments
- testnet wallet verification prototypes
- testnet transaction dry-runs
- testnet API integration tests
- testnet dashboard mock status

Testnet work must not:

- reuse production secrets
- expose real private keys
- imply production readiness
- auto-promote to mainnet
- bypass approval gates

Testnet success does not approve mainnet deployment.

---

## 19. Wallet Verification Data Rules

Wallet verification may eventually store:

- public wallet address
- linked user ID
- verification timestamp
- tier result
- token balance snapshot
- stale status
- verification source
- error state
- last checked timestamp

Wallet verification must not store:

- private keys
- seed phrases
- recovery phrases
- signing credentials
- unnecessary transaction history
- unrelated wallet holdings
- private user financial notes

Store the minimum needed.

---

## 20. Public Wallet Display Rules

Public wallet display must be careful.

Allowed if approved:

- verified holder badge
- CNX tier label
- public wallet address only if user chooses
- masked wallet address
- last verified date
- public token ID references

Forbidden:

- exposing private wallet details
- exposing unrelated assets
- exposing hidden balances without consent
- implying custody
- implying investment value
- implying guaranteed rewards

---

## 21. Treasury Records

Treasury-related records should include:

- action ID
- date
- asset
- amount
- source
- destination
- reason
- approval
- signer
- transaction ID if applicable
- verification result
- notes

Treasury records must not include:

- private keys
- seed phrases
- wallet recovery information
- unredacted secrets

Treasury records should be stored securely.

---

## 22. Reward Pool Boundary

Reward pools are separate from gameplay XP and resources.

Reward pool actions require:

- clear funding source
- clear eligibility rules
- clear award criteria
- abuse review
- approval
- audit record
- public-safe wording

Reward pools must not:

- guarantee returns
- imply investment yield
- bypass eligibility
- auto-award from CNX holding alone
- issue without review
- mix with treasury signing automation without approval

---

## 23. Wallet Incident Response

Wallet incidents include:

- exposed private key
- exposed seed phrase
- suspicious treasury activity
- unauthorized transaction
- wrong destination
- token transfer error
- compromised bot/server with wallet access
- leaked signing key
- fraudulent wallet claim

Incident response:

1. Stop related operations.
2. Preserve evidence.
3. Do not repeat exposed secrets.
4. Revoke or rotate affected credentials where possible.
5. Move assets only through approved emergency process.
6. Disable affected automation.
7. Review logs.
8. Record incident.
9. Prepare recovery plan.
10. Resume only after approval.

---

## 24. Wallet QA Requirements

Future wallet-related code must test:

- invalid wallet address handling
- read-only chain query behavior
- failed chain query behavior
- stale snapshot behavior
- tier calculation
- no private key requirement
- no seed phrase prompt
- no frontend secret exposure
- no CNX-to-resource conversion
- no cap bypass
- no lock bypass
- no role mutation without backend approval

No wallet system is production-ready without QA.

---

## 25. Wallet Documentation Rules

Wallet documentation may include:

- public token IDs
- public chain names
- public-safe verification explanation
- placeholder addresses
- security warnings
- non-custodial explanation
- approved CNX utility boundaries

Wallet documentation must not include:

- private keys
- seed phrases
- treasury signing instructions for public use
- live secrets
- guaranteed reward language
- investment-return language
- instructions that encourage unsafe custody

---

## 26. Wallet Public Messaging Rules

Public wallet/CNX messaging must not claim:

- guaranteed profits
- guaranteed appreciation
- guaranteed rewards
- investment returns
- required purchase
- passive income
- treasury-backed returns
- prize entitlement from holding alone

Public messaging may say only if accurate and approved:

- CNX is optional
- CNX may provide limited utility
- core gameplay is available without CNX
- holders may receive recognition or capped benefits if systems are live
- systems are phased and not all features are active

---

## 27. Emergency Wallet Controls

Future emergency wallet controls may include:

- freeze CNX verification
- disable multipliers
- pause holder role sync
- pause reward pool actions
- pause wallet verification jobs
- mark wallet system read-only
- open wallet incident

Emergency wallet controls must not:

- transfer funds automatically
- expose secrets
- delete records
- bypass approval
- hide evidence

Emergency controls require audit logs and owner approval.

---

## 28. Final Wallet and Treasury Directive

Do not custody user funds.

Do not request seed phrases.

Do not request private keys.

Do not give agents signing authority.

Do not automate treasury actions without approval.

Do not make CNX required.

Do not create pay-to-win mechanics.

Do not guarantee rewards from holding.

Keep wallet systems read-only first.

Keep treasury human-controlled.

