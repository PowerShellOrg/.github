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

---

## What PowerShellOrg commits to

When we adopt a tool, we commit to:

1. **Maintaining it actively** — responding to issues within our SLA, reviewing PRs, and cutting releases when there are meaningful changes
2. **Not abandoning it silently** — if we decide we cannot maintain a tool, we will announce it publicly and give the community 90 days to find alternative stewardship before archiving
3. **Keeping it open source** — the tool will remain under its existing OSI license (or a compatible one with explicit permission)
4. **Not breaking the API or CLI interface without a major version bump** — we respect existing users' scripts and pipelines
5. **Giving credit** — the original author's contributions remain in git history and are acknowledged in the CHANGELOG and package metadata
6. **Handling security responsibly** — following our published security policy for vulnerability disclosure and response

---

## What the submitter commits to

Adoption requests that do not include a maintainer commitment are evaluated more skeptically. A tool with no one willing to maintain it is a higher-risk adoption.

If you are submitting a request and are willing to maintain the tool:

1. **Minimum 6 months of active maintenance** — you will triage issues, review PRs, and be reachable for at least 6 months after adoption
2. **On-boarding and knowledge transfer** — you will work with the PowerShellOrg maintainer team to document the tool's internals, known issues, and quirks before stepping back
3. **Good-faith participation** — you will engage with the community, respond to review comments, and follow PowerShellOrg's contribution norms
4. **Transparency about limitations** — if you know the tool has problems, you will document them upfront rather than letting us discover them post-adoption

We understand life happens. If you need to step back before the 6 months are up, tell us early — we will work with you.

---

## The adoption workflow

| Step | Owner | Timeline |
|---|---|---|
| Submitter files a Tool Adoption Request | Submitter | — |
| Steward acknowledges the request and assigns it to the Council | Steward | 7 days |
| Council members review and comment | Council | 30 days |
| Steward makes a decision (adopt / decline / defer) | Steward | 30 days from submission |
| If adopted: repo transfer initiated, onboarding begins | Steward + submitter | Week of decision |
| Repo moves to `status-incoming`, Revival Playbook begins | Lead maintainer | Immediately after transfer |

### What "declined" means

A declined adoption request is not a judgment on the tool's quality or the submitter's intentions. Common reasons for declining:

- The tool does not meet one of the must-be-true criteria
- Our current maintainer pool cannot take it on right now
- A better maintainer or org has already stepped up

We will always explain the reason. Declined requests may be resubmitted when circumstances change.

### What "deferred" means

A deferred request means we are interested but there is a blocker we need to resolve first — usually the license, the author consent, or maintainer capacity. We will set a follow-up date and reopen the discussion then.
