# Adoption Criteria

This document describes how PowerShellOrg evaluates tools for adoption, what we commit to when we adopt something, and what the submitter commits to.

Read this before submitting a [Tool Adoption Request](https://github.com/PowerShellOrg/.github/issues/new?template=tool_adoption_request.yml).

---

## Must-be-true criteria

All six of the following must be true before we will adopt a tool. These are not negotiable.

### 1. Open-source license

The tool must have an OSI-approved open-source license in place before or at the time of transfer. We strongly prefer MIT or Apache 2.0, which are compatible with the rest of the org's tooling and license stack.

Tools with no license, or with proprietary or source-available licenses, are ineligible. If the original author is willing to relicense to MIT, that resolves the issue — we can help coordinate.

### 2. Author consent or demonstrated abandonment

We do not take over maintained projects without permission.

- **If the original author is reachable and active:** We require explicit written consent (a GitHub comment, email, or issue) from the author or all current maintainers. This protects them and protects us.
- **If the project appears abandoned:** We require documented evidence that we made a reasonable good-faith effort to reach the author (GitHub @-mention, issue opened, email to the address in the git log or package metadata) and received no response after at least 30 days.

When in doubt, we wait. Burning bridges with the original author is not worth any single tool.

### 3. Real user base

The tool must have evidence of real-world use: PSGallery downloads, GitHub stars/forks, dependent projects, forum mentions, or other signals that someone besides the submitter relies on it.

We will not adopt a tool that has no users outside its author, because there would be no one to maintain it for.

### 4. Manageable scope

The tool's maintenance burden must be sustainable given the org's current maintainer pool. We consider:

- Lines of code and architectural complexity
- Test coverage and CI state (a tool with no tests requires significant upfront investment)
- Open issue and PR backlog
- Dependency footprint

We will not adopt a tool if doing so would overextend our maintainers. We would rather maintain a smaller number of tools well than a large number poorly.

### 5. No unaddressed security issues

We will not inherit a tool with known, unaddressed security vulnerabilities. Before adoption, the submitter must either:

- Confirm there are no known security issues, or
- Document all known issues and commit to addressing them in the first release cycle

This is not about perfection — it is about not knowingly shipping something unsafe to our users.

### 6. No legal encumbrance

The tool must not carry legal risks that would expose PowerShellOrg or its maintainers. Examples of disqualifying encumbrances:

- Copyright claims from a third party
- Code copied from a non-compatible license without attribution
- Trademark issues
- Export control restrictions

### 7. A committed Steward has been identified

No Steward, no adoption.

Every adoption request must name a person who has agreed to serve as the project's Steward after transfer. The Steward does not need to be the submitter, but someone must have explicitly committed to the role before the adoption is approved.

If no Steward can be confirmed at decision time, the adoption is deferred — not declined. The request remains open while a Steward is sought.

---

## What PowerShellOrg commits to

When we adopt a tool, we commit to:

1. **Maintaining it actively** — responding to issues within our SLA, reviewing PRs, and cutting releases when there are meaningful changes
2. **Not abandoning it silently** — if a project loses its Steward, we enter a 30-day vacancy window and, if no replacement is found, move the project to `status-paused` rather than archiving it immediately. A paused project can resume when a new Steward steps up. Extended vacancies (90 days) may lead to the normal archival process
3. **Keeping it open source** — the tool will remain under its existing OSI license (or a compatible one with explicit permission)
4. **Not breaking the API or CLI interface without a major version bump** — we respect existing users' scripts and pipelines
5. **Giving credit** — the original author's contributions remain in git history and are acknowledged in the CHANGELOG and package metadata
6. **Handling security responsibly** — following our published security policy for vulnerability disclosure and response

---

## What the submitter commits to

Every submitter is asked to indicate whether they will serve as the project's **Steward**, as a **co-maintainer**, or neither. The commitment differs significantly between the two roles.

### If you are serving as Steward

The Steward commitment is heavier than a standard maintainer commitment. You are committing to:

1. **Driving the revival playbook** — you own the tracking issue and the checklist through to the first clean release
2. **Project direction** — you make the final call on contested project-level decisions and are the project's public face
3. **At least 12 months of active stewardship** — the 6-month minimum applies to co-maintainers; as Steward you are expected to see the project through to `status-active` and at least to the first graduation evaluation
4. **Transparency about limitations** — if you know the tool has problems, document them upfront
5. **Early notice if you need to step down** — your departure triggers a 30-day vacancy window; the earlier we know, the better for the project

### If you are serving as co-maintainer (not Steward)

1. **Minimum 6 months of active maintenance** — you will triage issues, review PRs, and be reachable for at least 6 months after adoption
2. **On-boarding and knowledge transfer** — you will work with the PowerShellOrg maintainer team to document the tool's internals, known issues, and quirks before stepping back
3. **Good-faith participation** — you will engage with the community, respond to review comments, and follow PowerShellOrg's contribution norms
4. **Transparency about limitations** — if you know the tool has problems, you will document them upfront rather than letting us discover them post-adoption

We understand life happens. If you need to step back before your commitment is up, tell the project's Steward (or the Org Admin if you are the Steward) early — we will work with you.

---

## The adoption workflow

| Step | Owner | Timeline |
|---|---|---|
| Submitter files a Tool Adoption Request | Submitter | — |
| Org Admin acknowledges the request and assigns it to the Council | Org Admin | 7 days |
| Council members review and comment | Council | 30 days |
| Org Admin makes a decision (adopt / decline / defer), confirming the Steward as part of adoption | Org Admin | 30 days from submission |
| If adopted: repo transfer initiated, onboarding begins | Org Admin + submitter | Week of decision |
| Repo moves to `status-incoming`, Revival Playbook begins | Steward | Immediately after transfer |

### What "declined" means

A declined adoption request is not a judgment on the tool's quality or the submitter's intentions. Common reasons for declining:

- The tool does not meet one of the must-be-true criteria
- Our current maintainer pool cannot take it on right now
- A better maintainer or org has already stepped up

We will always explain the reason. Declined requests may be resubmitted when circumstances change.

### What "deferred" means

A deferred request means we are interested but there is a blocker we need to resolve first — usually the license, the author consent, or maintainer capacity. We will set a follow-up date and reopen the discussion then.
