# Agent Improvement Protocol

**Root authority: ../../AGENTS.md**

This document defines how agents may propose, review, and apply improvements to the CNMA-v4.1 system itself, skills, sub-agents, workflows, and tools — while preserving constitutional law and RED-gate safety.

---

## Improvement Proposal Process

### Stage 1: Identify

When an agent discovers a pattern, inefficiency, gap, or opportunity for improvement:

1. **Document the current state**
   - What is the current behavior?
   - Why is it limiting or inefficient?
   - What is the impact?

2. **Cite evidence**
   - Show exact examples from prior tasks
   - Quantify the impact if possible
   - Reference AGENTS.md sections affected

3. **Draft a proposal**
   - What change is suggested?
   - Why would this be better?
   - What are the trade-offs?

### Stage 2: Compare and Validate

Before proposing changes:

1. **Check AGENTS.md first**
   - Is this already documented in AGENTS.md?
   - Does this conflict with constitutional law?
   - Does this weaken any RED-gate?

2. **Check supporting docs**
   - Is this already in a supporting doc?
   - Does this duplicate existing guidance?

3. **Validate against doctrine**
   - Does this strengthen or weaken agent governance?
   - Does this align with "Backend defines truth" principle?
   - Does this preserve all approval gates?

4. **Identify predecessors**
   - Has this been proposed before?
   - If rejected, why?
   - What has changed since then?

### Stage 3: Build the Case

Create a formal proposal:

```markdown
## Improvement Proposal: [Title]

### Current State

[What is the current behavior?]

### Problem

[What is the limitation or inefficiency?]

### Proposed Change

[What should change?]

### Rationale

[Why is this better?]

### Evidence

[Show examples from prior tasks]

### Impact

- Positive: [Benefits]
- Negative: [Trade-offs]
- Risk level: [GREEN | YELLOW | RED]

### Doctrine Alignment

[Does this strengthen or weaken AGENTS.md?]
[Does this preserve all RED-gates?]
[Does this conflict with constitutional principles?]

### Alternatives Considered

1. [Alt A and why not chosen]
2. [Alt B and why not chosen]

### Risks of Change

[What could go wrong?]

### Rollback Plan

[How would we revert if this doesn't work?]

### Related

[[AGENTS.md sections]] [affected]
[[ADR-XXXX]] [related decisions]
```

### Stage 4: Escalate to Anthony

Improvements to AGENTS.md or constitutional elements REQUIRE Anthony approval:

1. **Create a feature branch**
   - `git checkout -b docs/improvement-[name]`

2. **Create a draft PR**
   - Title: `[DRAFT] Improvement: [title]`
   - Description: Include full proposal from Stage 3
   - Link to supporting evidence and prior tasks

3. **Add Obsidian export note**
   - Move to docs/OBSIDIAN_EXPORT_QUEUE/
   - Include full YAML frontmatter
   - Tag: #process-improvement

4. **Send to Anthony**
   - "This improvement proposal requires your review before implementation."

### Stage 5: Review and Approval

Anthony reviews and decides:

- **Approved:** Proceed to Stage 6
- **Requested changes:** Return with specific feedback
- **Rejected:** Document why, for future reference

### Stage 6: Implementation

Once approved:

1. **Update documentation**
   - Update AGENTS.md or supporting docs as approved
   - Include a "See also" link back to ADR or decision log

2. **Create an ADR** (if significant)
   - Document the improvement as a decision
   - Include rationale, consequences, alternatives

3. **Test the change**
   - Run through a task using the new guidance
   - Verify it works as intended

4. **Export Obsidian note**
   - Mark as complete
   - Link to ADR
   - Archive decision

5. **Close the PR**
   - Anthony merges (merge to main only on approval)

---

## Improvement Categories and Gates

### GREEN Improvements (Self-Service)

Improvements that do NOT require Anthony approval:

- Clarifying wording in supporting docs (not AGENTS.md)
- Adding examples to SKILL_REGISTRY.md
- Expanding TOOL_PERMISSION_MATRIX.md with details
- Adding templates to OBSIDIAN_LOGGING_STANDARD.md
- Correcting typos or fixing links

**Process:**
1. Create feature branch: `docs/improvement-[name]`
2. Make changes
3. Create PR (no draft needed)
4. Get one review, then merge

**No escalation needed.**

### YELLOW Improvements (Scope Confirmation)

Improvements that need user or stakeholder confirmation:

- New skills or skill modifications
- Sub-agent scope changes
- Workflow process changes
- New operating modes
- Tool permission updates

**Process:**
1. Identify and document (Stages 1-3)
2. Ask user: "Does this improvement sound good?"
3. If yes: escalate to Anthony (Stage 4)
4. If no: iterate and try again

### RED Improvements (Anthony Only)

Improvements that touch constitutional elements or weaken approval gates:

- Changes to AGENTS.md itself
- Modifications to RED-gate logic
- Removal or weakening of any rule
- Changes to fundamental doctrine
- Authority structure changes

**Process:**
1. Identify and document (Stages 1-3)
2. Escalate to Anthony immediately
3. Anthony decides yes/no
4. If approved: proceed to implementation (Stage 6)
5. If rejected: document and move on

---

## Improvement Ideas (Common Opportunities)

Agents may propose improvements in these areas:

### Skills

- New skills for emerging Citadel Nexus domains
- Modifications to skill triggers or outputs
- Better guidance for skill composition
- Examples of skill activation

### Sub-Agents

- New sub-agents for specialized domains
- Modified scope for existing sub-agents
- Better orchestration patterns
- Improved reporting formats

### Workflows

- Better task templates
- Clearer lifecycle phase gates
- Improved RALPH loop guidance
- Better anti-rationalization rules

### Tools

- Permission matrix updates
- New tools to try
- Deprecation of old tools
- Better tool composition patterns

### Doctrine

- Clarification of constitutional principles
- Better red-gate definitions
- Improved verification standards
- Enhanced approval procedures

---

## Improvement Rejection and Learning

If a proposal is rejected:

1. **Document the reason**
   - Why was this not approved?
   - What constraints prevent it?
   - What would need to change for approval?

2. **Export Obsidian note**
   - Tag: #rejected-improvement
   - Include decision rationale
   - Link to AGENTS.md sections that explain the constraint

3. **Learn and iterate**
   - Can the proposal be modified to fit constraints?
   - Is there a related alternative that would work?
   - What can be learned for future proposals?

4. **Archive for reference**
   - Future agents may hit the same issue
   - Keep the decision record for context

---

## Improvement Proposal Template

Use this template for ALL improvement proposals:

```markdown
# Improvement Proposal: [Title]

## Status
[Pending | Approved | Rejected | Implemented]

## Current State
[Current behavior, why it matters]

## Problem
[What limitation or inefficiency exists?]

## Proposed Change
[What should be different?]

## Rationale
[Why is this better?]

## Evidence
[Examples from prior tasks]

## Impact
**Positive:**
- [Benefit 1]
- [Benefit 2]

**Negative:**
- [Trade-off 1]
- [Trade-off 2]

**Risk level:** [GREEN | YELLOW | RED]

## Doctrine Alignment

**Strengthens:** [Which AGENTS.md principles does this strengthen?]
**Preserves:** [Which rules remain unchanged?]
**Risk:** [Does this weaken any approval gates?]

## Alternatives Considered

1. [Alternative A] → rejected because [reason]
2. [Alternative B] → rejected because [reason]

## Risks of Change

- [Risk 1 and mitigation]
- [Risk 2 and mitigation]

## Rollback Plan

[How would we revert if needed?]

## Approval Required

[GREEN | YELLOW | RED]
[If YELLOW/RED: who needs to approve?]

## Related

- [[AGENTS.md sections affected]]
- [[Prior decisions or ADRs]]

## Decision

[Pending Anthony review]
[Or: Approved by Anthony on DATE]
[Or: Rejected on DATE, reason: ...]
```

---

## Golden Rules for Improvements

1. **Preserve constitutional law**
   - Do not weaken AGENTS.md
   - Do not remove RED-gates
   - Do not remove approval requirements

2. **Never rationalize removal**
   - If a rule seems strict, don't remove it — understand why it exists
   - Better to improve the process than to remove the gate

3. **Always cite precedent**
   - Show where this issue appeared before
   - Reference AGENTS.md sections that apply
   - Link to related ADRs

4. **Test before proposing**
   - Can you show an example where the change helps?
   - Have you tried the improvement informally?
   - What data supports the change?

5. **Build the case carefully**
   - Don't assume change is good because it sounds convenient
   - Show clear evidence and impact
   - Include trade-offs, not just benefits

6. **Expect scrutiny**
   - Proposals touching doctrine will be reviewed carefully
   - That's not a rejection — it's how critical systems work
   - Prepare for questions and refinement

---

## Improvement Impact on Other Tasks

Once an improvement is approved and implemented:

1. **All future tasks use the new guidance**
   - The updated AGENTS.md or docs are authoritative
   - Prior tasks used the old process (don't retroactively change them)

2. **Document the transition**
   - Obsidian note explains when the change took effect
   - Link to ADR from old workflow references

3. **Monitor adoption**
   - Watch for confusion or misunderstanding
   - Gather feedback from initial uses
   - Be ready to adjust if the improvement doesn't work as expected

---

## Summary

Agents may propose improvements to the system, but:

- ✅ GREEN improvements need only peer review
- ✅ YELLOW improvements need scope confirmation
- ✅ RED improvements need Anthony approval
- ✗ No improvements weaken AGENTS.md or remove RED-gates
- ✗ No improvements are implemented without evidence and documentation

The goal is continuous improvement within a stable, governed system. Governance preserves the integrity of Citadel Nexus. Improvements enhance that integrity.
