# Citadel Nexus Discord Server Alignment Audit v1.0

## Purpose

This document audits the Citadel Nexus Discord server alignment requirements before public announcement or wider onboarding.

Discord is the community-facing coordination surface.

Discord does not define system truth.

Backend documentation and backend-controlled state remain the source of truth.

---

## Source Documents

Required source documents:

- docs/CITADEL_NEXUS_PROGRESS_REPORT_AND_CAPABILITY_AUDIT.md
- docs/PUBLIC_ANNOUNCEMENT_PAUSE_AND_ALIGNMENT_PHASE.md
- docs/PUBLIC_FEATURE_SCOPE_FREEZE.md
- docs/PUBLIC_LAUNCH_BLOCKER_REGISTER.md
- docs/PUBLIC_LAUNCH_ANNOUNCEMENT_PACKAGE.md
- docs/FINAL_PUBLIC_LAUNCH_GATE_RECONCILIATION.md
- docs/INCIDENT_OPERATOR_CHECKLIST.md

---

## Current Approved Launch Position

Production-dev readiness:

    PASS

Controlled limited public launch readiness:

    APPROVED WITH CONDITIONS

Announcement posting:

    PAUSED

Full public launch readiness:

    NOT APPROVED

Economy/token/NFT/payout launch readiness:

    NOT APPROVED

Current active phase:

    Public Experience & Operator Control Alignment

---

## Discord Current Status

Status:

    PARTIAL

Known current membership:

    Project owner and one test user

Public announcement status:

    PAUSED

Discord readiness for public announcement:

    NOT READY

Reason:

    Discord server structure, permissions, onboarding, public messaging, and bot command visibility require alignment before wider exposure.

---

## Discord Alignment Doctrine

Standing doctrine:

- Backend defines truth.
- Discord reflects backend-approved truth.
- Discord roles do not define backend entitlement.
- Discord channels must not imply unavailable systems are live.
- Discord public messaging must match approved launch limits.
- Discord bot commands must remain within approved Phase 1 scope.
- Admin/system channels must remain restricted.
- Economy/token/NFT/wallet/payout systems must remain clearly staged and not live.

---

## Approved Discord Role During Current Phase

Discord may be used for:

- Project information.
- Community onboarding.
- Status updates.
- Public documentation references.
- Controlled testing.
- Limited Phase 1 Ascension discussion if command exposure is approved.
- Support/report intake.
- Roadmap communication.

Discord may not be used for:

- Live CNX utility.
- CNX spending.
- CNX payouts.
- Prize-pool redemption.
- NFT-gated access.
- Wallet-gated access.
- Automated ownership-based role mutation.
- Public admin command access.
- Public entitlement claims.
- Treasury movement claims.
- Full launch claims.

---

## Required Discord Category Model

Recommended Discord structure:

### 1. Start Here

Purpose:

    Public orientation and onboarding.

Recommended channels:

- `welcome`
- `start-here`
- `rules`
- `what-is-live`
- `announcements`

Required behavior:

- Public readable.
- Limited posting permissions.
- Clear launch boundary.
- No economy or utility overclaims.

---

### 2. Citadel Nexus

Purpose:

    General public project information.

Recommended channels:

- `project-overview`
- `roadmap`
- `status-updates`
- `faq`

Required behavior:

- Public readable.
- Staff-controlled key information.
- Must match approved documentation.

---

### 3. Citadel Ascension

Purpose:

    Phase 1 game/community progression area.

Recommended channels:

- `ascension-info`
- `guardian-selection`
- `missions`
- `build-progress`
- `player-help`

Required behavior:

- Only enabled if Phase 1 commands are intentionally public.
- Must not imply rewards, payouts, or token utility.
- Must clearly state Ascension is staged gameplay/progression, not live payout infrastructure.

---

### 4. Community

Purpose:

    General member interaction.

Recommended channels:

- `general`
- `introductions`
- `ideas-feedback`
- `support`

Required behavior:

- Moderated.
- Clear reporting path.
- No investment or payout promises.

---

### 5. Development Updates

Purpose:

    Controlled visibility into build progress.

Recommended channels:

- `dev-notes`
- `known-issues`
- `changelog`
- `public-build-log`

Required behavior:

- Staff-controlled or limited posting.
- No secrets.
- No internal credentials.
- No screenshots containing sensitive data.

---

### 6. Future Systems

Purpose:

    Clearly labeled future concepts.

Recommended channels:

- `cnx-token-future`
- `nft-nodes-future`
- `wallet-linking-future`
- `creator-tools-future`

Required behavior:

- Must be clearly labeled as future/staged.
- Must not imply live utility.
- Must include disclaimers where needed.

---

### 7. Internal / Staff

Purpose:

    Private operation and moderation.

Recommended channels:

- `staff-chat`
- `mod-log`
- `incident-log`
- `bot-admin`
- `launch-control`

Required behavior:

- Staff only.
- No public access.
- No sensitive secrets.
- Incident notes should follow the incident operator checklist.

---

### 8. Archive

Purpose:

    Preserve old or inactive channels.

Recommended channels:

- `old-announcements`
- `old-dev-notes`
- `deprecated-plans`

Required behavior:

- Read-only or staff-only.
- Prevent outdated information from confusing public members.

---

## Required Permission Audit

Audit these permissions before public announcement:

- `@everyone` cannot access staff/internal channels.
- `@everyone` cannot run admin bot commands.
- `@everyone` cannot manage roles.
- `@everyone` cannot manage channels.
- `@everyone` cannot mention everyone/here unless intentionally allowed.
- `@everyone` cannot view future internal planning channels.
- Test user permissions match intended public user permissions.
- Staff permissions are separated from member permissions.
- Bot role has only required permissions.
- Bot role is not above owner/admin roles.
- Admin command channels are private.
- Launch-control channel is private.
- Incident-log channel is private.
- Mod-log channel is private.

---

## Required Bot Command Audit

Approved Phase 1 public commands if enabled:

- `/start`
- `/claim`
- `/mission`
- `/build`
- `/status`

Commands requiring restriction:

- Admin commands.
- Reset commands.
- Award commands.
- Prize-pool commands.
- Entitlement commands.
- Role-sync commands.
- Wallet commands.
- CNX mutation commands.
- NFT commands.
- Treasury commands.
- Any command that changes access, funds, ownership, or payout state.

Bot command audit status:

    PENDING

Required outcome:

    Public commands match approved Phase 1 scope or remain disabled until reviewed.

---

## Required Public Pinned Posts

Create or update these pinned posts before announcement:

1. What Is Live
2. What Is Not Live
3. Current Launch Phase
4. Safety and Scope Notice
5. How to Report Issues
6. Ascension Phase 1 Rules if enabled
7. CNX Token Status
8. NFT / Node Status
9. Wallet Linking Status
10. Roadmap / Next Steps

---

## Required "What Is Live" Language

Approved language:

    Citadel Nexus is currently in a controlled limited launch preparation phase.

    Live or approved for limited exposure:

    - Project information
    - Community onboarding
    - Public documentation
    - Status updates
    - Limited backend health/status verification
    - Limited Phase 1 Ascension activity only if enabled by the operator

    Not live:

    - CNX utility
    - CNX spending
    - Payouts
    - Prize-pool redemption
    - NFT-gated access
    - Wallet-gated access
    - Automated ownership-based roles
    - Public dashboards
    - Public admin tools

---

## Required Announcement Safety Rule

No Discord announcement may be posted until:

- Discord categories are reviewed.
- Public channels are aligned.
- Internal channels are private.
- Bot command exposure is reviewed.
- What-is-live post is pinned.
- What-is-not-live post is pinned.
- Website public surface audit is either complete or announcement copy avoids website dependency.
- Owner gives final confirmation again.

---

## Discord Audit Checklist

### Structure

- Server categories reviewed: PENDING
- Public channels identified: PENDING
- Internal channels identified: PENDING
- Future-feature channels labeled: PENDING
- Archive/deprecated channels handled: PENDING

### Permissions

- @everyone permissions reviewed: PENDING
- Test user permissions reviewed: PENDING
- Staff permissions reviewed: PENDING
- Bot role permissions reviewed: PENDING
- Admin channel privacy reviewed: PENDING

### Messaging

- What-is-live post drafted: PENDING
- What-is-not-live post drafted: PENDING
- Status/roadmap post drafted: PENDING
- Support/reporting post drafted: PENDING
- Announcement copy aligned: PENDING

### Bot

- Public command list reviewed: PENDING
- Admin commands restricted: PENDING
- Bot role position reviewed: PENDING
- Command channels reviewed: PENDING
- Error/log behavior reviewed: PENDING

### Launch Gate

- Discord ready for announcement: NO
- Announcement remains paused: YES
- Backend approval remains valid: YES
- Launch scope unchanged: YES

---

## Step 43 Status

Status:

    PASS

Discord audit document created:

    YES

Discord current status recorded:

    YES

Discord readiness:

    NOT READY

Announcement remains paused:

    YES

Backend approval remains valid:

    YES

Next required action:

    Perform live Discord server audit and update checklist results.

Production-dev readiness:

    PASS

Public launch readiness:

    APPROVED WITH CONDITIONS

Announcement posting:

    PAUSED
