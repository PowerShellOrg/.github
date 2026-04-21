# PowerShellOrg Governance

PowerShellOrg is a community-run GitHub organization that adopts and maintains open source PowerShell tooling. This document describes how decisions get made, how people join and leave, and how projects move through their lifecycle.

The model is deliberately lightweight. We are a small volunteer community, not a foundation. Speed and clarity matter more than process.

## Roles

### Org Admin

One person. The Org Admin is the organization's tiebreaker for org-wide matters and the external face of PowerShellOrg.

Responsibilities:
- Holds the GitHub org admin role
- Owns the PowerShell Gallery account that issues per-repo scoped API keys
- Decides contested org-wide questions with input from the Council
- Represents PowerShellOrg externally
- Maintains the private API key tracking record
- Approves adoptions, graduations, archival, governance changes, and Code of Conduct changes

The role is named ("Org Admin of PowerShellOrg") rather than tied to an individual so that succession is possible without renaming the role.

### Steward (per project)

One person per adopted project. The Steward is the tiebreaker *for that project* and drives it through its lifecycle.

Responsibilities:
- Owns the direction of the project
- Makes the final call on contested project-level decisions with input from the project's maintainers
- Drives the revival playbook from adoption through to the first clean release
- Represents the project publicly (release announcements, blog posts, conference talks where applicable)
- Proposes graduation when the project meets the criteria
- Flags to the Org Admin when the project needs help, when the Steward needs to step down, or when the project should be archived

Every adopted project must have a committed Steward at the time of adoption. Projects without a Steward are not adopted. A project that loses its Steward enters a 30-day find-a-replacement window (see below).

The Steward is not required to be the original author of the tool, nor the person who submitted the adoption request — though in practice it will often be one or the other.

### Council

The cross-project body. Composed of all current Stewards, plus any additional members the Org Admin invites for cross-cutting work (CI infrastructure, security response, documentation).

The Council's role is **input, not consensus.** They raise issues, propose changes, review adoption requests, and surface concerns. The Org Admin decides org-wide matters; individual Stewards decide project-level matters.

Council members are expected to:
- Be reachable on the Council channel
- Respond to adoption requests and governance proposals within the comment window
- Flag concerns about other projects, maintainers, or the direction of the org
- Share context across projects so lessons from one revival inform the next

### Maintainer (per repository)

Has write access to a specific repository, can merge pull requests, can cut releases. The Steward of a project is always a maintainer on that project; additional maintainers are added per the rules below.

Maintainers are added per-repo, not org-wide. A maintainer on one repository has no special standing on others.

### Contributor

Anyone with a merged pull request to any PowerShellOrg repository. No special permissions; recognition only.

## How decisions get made

### Org-wide decisions

**Org Admin decides with Council input.** Speed is the explicit priority.

For non-urgent org-wide decisions, the Org Admin will normally:
1. Post a "thinking about doing X" note in the Council channel
2. Wait 72 hours for input
3. Act

Silence is assent. The Org Admin may act immediately for urgent matters and post the rationale afterward.

### Project-level decisions

**Steward decides with input from the project's maintainers.** Same 72-hour silent-assent pattern by default, though Stewards may compress the window for routine calls. The Org Admin does not override project-level decisions except where they conflict with org-wide policy, the Code of Conduct, or the standard build stack.

### Decisions that require Council input before action

The Org Admin may not act unilaterally on these. Each requires a posted proposal and a comment window before action.

- Adopting a new tool into the org
- Appointing a new Steward (at adoption, or to fill a vacancy)
- Removing a Steward for cause
- Graduating a tool to the `stable` lifecycle state
- Archiving or deprecating a tool
- Changing this governance document
- Changing the Code of Conduct
- Changing the standard build stack

Comment windows:
- Adoption decisions: 7 to 30 days from the adoption request being filed
- Steward appointment to fill a vacancy: 72 hours
- Steward removal for cause: 72 hours
- Graduation: 7 days
- Archival: 30 days
- Governance, Code of Conduct, or standard stack changes: 14 days

### Decisions at Steward discretion

Within a project, the Steward has full discretion over:
- Technical direction and roadmap
- Adding or removing co-maintainers on the project
- Release cadence (within the standard pipeline)
- Project-specific contributing guidelines that supplement the org-wide ones
- Day-to-day project operations

### Decisions at maintainer discretion

Within a repository, maintainers have full discretion over:
- Routine pull request review and merge
- Releases (within the standard pipeline, with Steward awareness)
- Issue triage and labeling
- Responses to contributors

## How Stewards are appointed

**At adoption.** Every adoption request must identify a committed Steward. This is typically:
- The adoption submitter themselves, or
- A Council member who has volunteered to take on the project, or
- Someone the submitter has recruited and who has confirmed willingness

If no Steward can be committed at the time of adoption, the adoption is not approved. The request may remain open while a Steward is sought.

The Org Admin confirms the Steward as part of the adoption decision, after Council input.

**To fill a vacancy.** If a Steward departs, the Org Admin opens a call for a replacement on the Council channel. Candidates nominate themselves or are nominated by a Council member. The Org Admin appoints after a 72-hour Council comment window.

## How Stewards depart

**Self-departure.** Any Steward can step down at any time by notifying the Org Admin and Council. They are thanked, their write access is preserved if they wish to continue as a contributor or maintainer, and the Org Admin opens a call for a replacement.

**Vacancy window.** When a Steward departs, the project enters a 30-day vacancy window. During this window, the Org Admin works with the Council to identify a replacement. If no replacement emerges in 30 days:

- The project moves to a `status-paused` state (topic tag on the repo, notice on the README)
- Releases and active development pause; security fixes may still be issued by the Org Admin or a willing maintainer
- The project remains paused until either a Steward is found (resuming its prior state) or archival is proposed (following the normal archival process)

A paused project does not count against the Council's active roster, and its previous Steward's Council seat is vacated.

**Removal for cause.** Code of Conduct violation, security incident, or a sustained pattern of behavior that damages the project or the org. This is an Org Admin decision after 72 hours of Council input. We document the decision privately for the Council and communicate it publicly only to the extent necessary.

## How maintainers get added

Three paths.

**Steward addition.** The Steward of a project may add co-maintainers at their discretion. This is announced to the Council, not gated by it.

**Sustained contribution.** Several merged pull requests and demonstrated judgment over weeks to months, identified by the Steward or another maintainer.

**Adoption.** When a tool is adopted, the submitter is offered maintainer status on that repository by default, regardless of whether they are also the Steward.

## How maintainers get removed

Three paths. All preserve the contributor's commit history and credit.

**Self-departure.** Anyone can step down at any time. We thank them, remove access, and move on. No questions asked.

**Inactivity.** No commits, reviews, or Council participation for nine months triggers a check-in from the project's Steward. No response within thirty days results in write access being removed. Access can be reinstated at any time on request.

**For cause.** Code of Conduct violation, security incident, or sustained pattern of behavior that damages the project. For co-maintainers this is a Steward decision with Org Admin notification. For a Steward, see "Removal for cause" above.

## Succession for the Org Admin

If the Org Admin steps down, the Council selects a new Org Admin by majority vote. The outgoing Org Admin, if available, confirms the selection.

If the Org Admin becomes unavailable without stepping down (extended unresponsiveness, incapacity), the Council may proceed with selection after a thirty-day attempt to reach them. The selection is documented publicly.

To make this resilient: the Org Admin designates a backup with GitHub org admin access at all times. The backup is not formally the Org Admin but has the technical access to keep operations running during a transition. The backup is typically a sitting Steward with demonstrated reliability.

## Lifecycle states

Every repository in the org is in one of five lifecycle states, tracked via a topic tag on the repository.

**`status-incoming`** — Just adopted, working through the revival playbook. Time-bounded; should not exceed 90 days.

**`status-active`** — Default working state. Modernized build, clean releases, responsive Steward and maintainers. First-response targets apply (7 days for issues and PRs).

**`status-stable`** — Graduated. Mature, slow-changing tool that does not need active feature development. Stays in the org with reduced stewardship cadence. First-response target relaxes to 30 days. Security response time stays at the SECURITY.md baseline regardless of state.

**`status-paused`** — Steward vacancy in progress. No active development; security-only maintenance if anyone is available. Resolves to `status-active`, `status-stable`, or `status-archived` within a reasonable timeframe.

**`status-archived`** — No longer maintained. Repository is read-only on GitHub. PowerShell Gallery package is left in place (existing users would otherwise break) with a deprecation note added to the package description.

State transitions follow the criteria in the Revival Playbook (`incoming` to `active`), the graduation criteria below, and the archival process below.

### Graduation criteria

Moving from `active` to `stable` requires all of the following to be true.

- At least 12 months in `active` state with consistent maintenance
- At least 2 clean releases under PowerShellOrg
- Test coverage adequate to catch regressions (judgment, not a percentage)
- No critical open issues, no known unaddressed security issues
- At least 2 active maintainers (so the project is not a single point of failure)
- Documentation reasonably complete

The project's Steward proposes graduation in the Council channel. After a 7-day comment window, the Org Admin decides.

A graduated project still has a Steward. The role's demands are lighter — fewer active decisions, longer response windows — but the seat is not vacated simply because the project reached `stable`.

### Archival process

A repository may be considered for archival when any of the following is true.

- No commits, releases, or substantive issue activity for 24 months
- Superseded by a clearly better in-org or external tool
- No Steward found after a 90-day vacancy (extended from the normal 30-day window at the Org Admin's discretion)
- The original problem space no longer exists

The Steward (or Org Admin, if the project is paused) proposes archival in the Council channel. After a 30-day comment window, if no compelling objection is raised, the repository is archived: marked read-only on GitHub, README updated to point at successors where applicable, deprecation note added to the PowerShell Gallery package description, repository topic tag updated to `status-archived`.

## Scope

PowerShellOrg adopts and maintains community PowerShell tooling — modules, build tools, and developer utilities.

Out of scope:
- Microsoft-owned tooling or anything that would compete with active first-party maintenance
- Single-vendor commercial tools
- Anything that would compete with an active upstream maintainer
- Anything without a willing Steward

## Changing this document

Changes to this governance document follow the rules above: Council comment window of 14 days, Org Admin decides. Material changes are announced on the org profile and in a pinned discussion.

---

*Last updated: [DATE]. Maintained by the Org Admin with input from the Council.*
