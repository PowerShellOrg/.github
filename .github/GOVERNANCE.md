# PowerShellOrg Governance

PowerShellOrg is a community-run GitHub organization that adopts and maintains
open source PowerShell tooling. This document describes how decisions get made,
how people join and leave, and how projects move through their lifecycle.

The model is deliberately lightweight. We are a small volunteer community, not a
foundation. Speed and clarity matter more than process.

## Roles

### Steward

One person. The Steward is the org's tiebreaker, external face, and
direction-setter.

Responsibilities:

- Holds the GitHub org admin role
- Owns the PowerShell Gallery account that issues per-repo scoped API keys
- Decides contested questions with input from the Council
- Represents PowerShellOrg externally
- Maintains the private API key tracking record

The role is named ("Steward of PowerShellOrg") rather than tied to an individual
so that succession is possible without renaming the role.

### Council

Up to seven people. Active maintainers across the org's repositories.

By default, one Council seat per actively-maintained repository. The Steward may
invite additional members for cross-cutting work (CI infrastructure, security
response, documentation). The Council's role is **input, not consensus** — they
raise issues, propose changes, review adoption requests, and surface concerns.
The Steward decides.

Council members are expected to:

- Be reachable on the Council channel
- Respond to adoption requests and governance proposals within the comment
  window
- Flag concerns about other maintainers, repositories, or the direction of the
  org

### Maintainer

Per-repository role. Has write access to a specific repository, can merge pull
requests, can cut releases.

Maintainers are added per-repo, not org-wide. A maintainer on one repository has
no special standing on others.

### Contributor

Anyone with a merged pull request to any PowerShellOrg repository. No special
permissions; recognition only.

## How decisions get made

**Default: Steward decides with Council input.** Speed is the explicit priority.

For non-urgent decisions, the Steward will normally:

1. Post a "thinking about doing X" note in the Council channel
2. Wait 72 hours for input
3. Act

Silence is assent. The Steward may act immediately for urgent matters and post
the rationale afterward.

### Decisions that require Council input before action

The Steward may not act unilaterally on these. Each requires a posted proposal
and a comment window before action.

- Adopting a new tool into the org
- Adding or removing a maintainer
- Graduating a tool to the `stable` lifecycle state
- Archiving or deprecating a tool
- Changing this governance document
- Changing the Code of Conduct
- Changing the standard build stack

Comment windows:

- Adoption decisions: 7 to 30 days from the adoption request being filed
- Maintainer changes: 72 hours
- Graduation: 7 days
- Archival: 30 days
- Governance, Code of Conduct, or standard stack changes: 14 days

### Decisions at maintainer discretion

Within a repository, maintainers have full discretion over:

- Routine pull request review and merge
- Releases (within the standard pipeline)
- Issue triage and labeling
- Day-to-day technical direction
- Repository-specific contributing guidelines that supplement the org-wide ones

## How maintainers get added

Three paths.

**Sustained contribution.** Several merged pull requests and demonstrated
judgment over weeks to months. An existing maintainer nominates the contributor
in the Council channel; the Steward confirms within 72 hours.

**Adoption.** When PowerShellOrg adopts a tool, the submitter is offered
maintainer status on that repository by default. This is part of the adoption
commitment.

**Steward appointment.** For repositories with no active maintainer (typically
newly adopted or a maintainer departure), the Steward can directly appoint
someone willing to take it on. This is announced to the Council, not gated by
it.

## How maintainers get removed

Three paths. All preserve the contributor's commit history and credit.

**Self-departure.** Anyone can step down at any time. We thank them, remove
access, archive their context, and move on. No questions asked.

**Inactivity.** No commits, reviews, or Council participation for nine months
triggers a Steward check-in. No response within thirty days of that check-in
results in write access being removed. Access can be reinstated at any time on
request.

**For cause.** Code of Conduct violation, security incident, or sustained
pattern of behavior that damages the project. This is a Steward decision after
Council input. We document the decision privately for the Council and
communicate it publicly only to the extent necessary.

## Succession

If the Steward steps down, the Council selects a new Steward by majority vote.
The outgoing Steward, if available, confirms the selection.

If the Steward becomes unavailable without stepping down (extended
unresponsiveness, incapacity), the Council may proceed with selection after a
thirty-day attempt to reach them. The selection is documented publicly.

To make this resilient: the Steward designates a backup with org admin access at
all times. The backup is not formally the Steward but has the technical access
to keep operations running during a transition.

## Lifecycle states

Every repository in the org is in one of four lifecycle states, tracked via a
topic tag on the repository.

**`status-incoming`** — Just adopted, working through the revival playbook.
Time-bounded; should not exceed 90 days.

**`status-active`** — Default working state. Modernized build, clean releases,
responsive maintainership. First-response targets apply (7 days for issues and
PRs).

**`status-stable`** — Graduated. Mature, slow-changing tool that does not need
active feature development. Stays in the org with reduced stewardship cadence.
First-response target relaxes to 30 days. Security response time stays at the
SECURITY.md baseline regardless of state.

**`status-archived`** — No longer maintained. Repository is read-only on GitHub.
PowerShell Gallery package is left in place (existing users would otherwise
break) with a deprecation note added to the package description.

State transitions follow the criteria in the Revival Playbook (`incoming` to
`active`), the graduation criteria below, and the archival process below.

### Graduation criteria

Moving from `active` to `stable` requires all of the following to be true.

- At least 12 months in `active` state with consistent maintenance
- At least 2 clean releases under PowerShellOrg
- Test coverage adequate to catch regressions (judgment, not a percentage)
- No critical open issues, no known unaddressed security issues
- At least 2 active maintainers (so the project is not a single point of
  failure)
- Documentation reasonably complete

The repository's maintainers propose graduation in the Council channel. After a
7-day comment window, the Steward decides.

### Archival process

A repository may be considered for archival when any of the following is true.

- No commits, releases, or substantive issue activity for 24 months
- Superseded by a clearly better in-org or external tool
- No willing maintainer found after a 90-day open call
- The original problem space no longer exists

The Steward proposes archival in the Council channel. After a 30-day comment
window, if no compelling objection is raised, the repository is archived: marked
read-only on GitHub, README updated to point at successors where applicable,
deprecation note added to the PowerShell Gallery package description, repository
topic tag updated to `status-archived`.

## Scope

PowerShellOrg adopts and maintains community PowerShell tooling — modules, build
tools, and developer utilities.

Out of scope:

- Microsoft-owned tooling or anything that would compete with active first-party
  maintenance
- Single-vendor commercial tools
- Anything that would compete with an active upstream maintainer
- Anything we do not have the bandwidth to actually maintain

## Changing this document

Changes to this governance document follow the rules above: Council comment
window of 14 days, Steward decides. Material changes are announced on the org
profile and in a pinned discussion.

---

*Last updated: 2026/04/21. Maintained by the Steward with input from the Council.*
