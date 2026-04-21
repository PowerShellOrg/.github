# Revival Playbook

This playbook describes how to bring an adopted tool from freshly transferred (`status-incoming`) to actively maintained (`status-active`). It is organized into five phases with explicit checklists.

The phases overlap. Do not wait for Phase 1 to be fully complete before starting Phase 2. The timelines are guidelines; pace to the actual state of the repo.

---

## Phase 0: Take inventory (week 1)

Everything in this phase happens before or immediately after the repo transfer. It is primarily Steward and lead maintainer work.

### Transfer and access

- [ ] Repo transferred to `github.com/PowerShellOrg`
- [ ] Repo topic `status-incoming` applied
- [ ] Lead maintainer(s) added to the repo with **Write** access
- [ ] Branch protection rules verified (see [maintainer-onboarding.md](maintainer-onboarding.md))
- [ ] Default branch confirmed as `main` (rename from `master` if needed)

### PSGallery setup

- [ ] PSGallery package ownership transferred to the PowerShellOrg PSGallery account (or new package created if publishing fresh)
- [ ] Scoped API key created by Steward: `PowerShellOrg-<RepoName>-<YYYY-MM>`, glob = module name, 365-day expiry
- [ ] `PSGALLERY_API_KEY` Actions secret set in the repo
- [ ] Rotation reminder added to the Steward's private tracking issue

### Baseline metrics (capture before making changes)

- [ ] Last commit date recorded
- [ ] Last PSGallery release date and version recorded
- [ ] Open issue count recorded
- [ ] Open PR count recorded
- [ ] GitHub Stars / Forks recorded
- [ ] PSGallery download count recorded
- [ ] Existing CI status noted (passing / failing / none)

These numbers are the baseline for the first release announcement and are useful for gauging improvement.

---

## Phase 1: Issue triage (weeks 1–4)

Goal: every open issue is labeled, acknowledged, and either closed or has a clear next step.

### Label framework

Apply the org standard label set if it is not already present. Minimum required labels:

| Label | Purpose |
|---|---|
| `bug` | Confirmed incorrect behavior |
| `enhancement` | Feature request or improvement |
| `needs-triage` | Newly opened; not yet evaluated |
| `needs-info` | Waiting on reporter for more detail |
| `wontfix` | Valid but outside scope or priority |
| `duplicate` | Duplicate of another issue |
| `good first issue` | Suitable for a new contributor |
| `help wanted` | Maintainer welcomes a PR |
| `question` | How-to or usage question |
| `adoption-request` | Tool adoption request (org-level only) |

### Triage process

For each open issue:

- [ ] Read the issue and reproduce if a bug report
- [ ] Apply a primary label (`bug`, `enhancement`, `question`, `wontfix`, etc.)
- [ ] Remove `needs-triage` once evaluated
- [ ] Post a comment if action is needed from the reporter

#### Comment templates

**Needs more info:**
```
Thanks for the report. To help us investigate, could you provide:
- [ ] PowerShell version (`$PSVersionTable`)
- [ ] Module version (`(Get-Module ModuleName).Version`)
- [ ] Minimal reproduction script
- [ ] Full error output

We'll hold this open for 30 days. If we don't hear back, we'll close it — feel free to reopen if you have the info later.
```

**Closing as won't fix:**
```
Thank you for taking the time to file this. After review, we've decided not to implement this because [reason].

If you'd like to discuss further, please open a GitHub Discussion. We're happy to reconsider if the use case evolves.
```

**Closing stale issue (pre-adoption backlog):**
```
This issue was open before PowerShellOrg adopted this module. We're doing a triage pass to start fresh.

If this is still relevant and reproducible on the latest version, please reopen with a current repro. Thanks for your patience during the transition.
```

### Phase 1 exit criteria

- [ ] All open issues have at least one label
- [ ] `needs-triage` label is empty
- [ ] Issues older than 2 years with no recent activity are closed with the stale comment above

---

## Phase 2: PR triage (weeks 1–4, parallel with Phase 1)

Goal: no PR sits without a decision. Move every open PR to one of: merged, closed, or actively under review.

### Decision tree

For each open PR:

1. **Does it still apply cleanly?** If not, ask the author to rebase. If no response in 14 days, close with note.
2. **Is it in scope?** If not, close with explanation.
3. **Does it have tests?** If adding behavior without tests, request them.
4. **Can you merge it as-is?** Merge it.
5. **Can you merge it with minor changes?** Request changes or take over the branch.
6. **Is the author unresponsive?** Close with a note explaining they can reopen when available.

#### Comment template — taking over a PR:
```
Thanks for this contribution — the direction is right. Since [this PR has been open for X months / the author is unresponsive / the branch needs a rebase], I'm going to close this and open a new PR that incorporates your approach.

Your contribution will be credited in the commit message and CHANGELOG. Thank you for the starting point.
```

#### Comment template — closing pre-adoption PR:
```
This PR was open before PowerShellOrg adopted this module. As part of our triage, we're closing it to start fresh.

If you'd still like to contribute this change, please open a new PR against the current `main`. See CONTRIBUTING.md for our current guidelines. Thank you for the work you put into this.
```

### Phase 2 exit criteria

- [ ] No open PR is older than 30 days without a maintainer comment
- [ ] All mergeable PRs are merged or have a clear decision

---

## Phase 3: Build modernization (weeks 2–6)

Goal: the repo builds with the standard stack, CI is green on all platforms.

Work through these in order. Each step is a standalone PR.

### 3a: Pester migration

- [ ] Confirm existing tests use Pester (or add tests if none exist)
- [ ] Upgrade to Pester 5 if on an older version — see the [Pester 5 migration guide](https://pester.dev/docs/migrations/v4-to-v5)
- [ ] All tests pass locally with `Invoke-Pester`

### 3b: psake bootstrap

- [ ] Add `psakeFile.ps1` to the repo root with the standard tasks: `Init`, `Clean`, `Build`, `Test`, `Analyze`, `Publish`
- [ ] `Invoke-psake ?` lists all tasks
- [ ] `Invoke-psake Test` runs Pester and passes

### 3c: PowerShellBuild integration

- [ ] `build.ps1` or the `psakeFile.ps1` references PowerShellBuild for shared task logic
- [ ] Module manifest is valid (`Test-ModuleManifest` passes)
- [ ] `Invoke-psake Build` produces a clean staged module in `output/`

### 3d: PSScriptAnalyzer clean pass

- [ ] `Invoke-psake Analyze` runs PSScriptAnalyzer with the org default ruleset
- [ ] All warnings resolved or suppressed with documented justification
- [ ] No `SuppressMessage` attributes without a comment explaining the suppression

### 3e: GitHub Actions CI

- [ ] `.github/workflows/ci.yml` added to the repo, calling the reusable workflow:
  ```yaml
  name: CI
  on:
    push:
      branches: [main]
    pull_request:
      branches: [main]
  jobs:
    ci:
      uses: PowerShellOrg/.github/.github/workflows/powershell-ci.yml@main
  ```
- [ ] CI is green on `main` across all four matrix legs (Win/PS5.1, Win/PS7, Linux/PS7, macOS/PS7)
- [ ] Branch protection status check updated to require this CI workflow

### 3f: GitHub Actions release workflow

- [ ] `.github/workflows/release.yml` added, calling the reusable workflow:
  ```yaml
  name: Release
  on:
    push:
      tags: ['v*']
  jobs:
    release:
      uses: PowerShellOrg/.github/.github/workflows/powershell-release.yml@main
      with:
        module-name: <ModuleName>
      secrets:
        PSGALLERY_API_KEY: ${{ secrets.PSGALLERY_API_KEY }}
  ```
- [ ] Test release with a pre-release tag (e.g., `v1.0.0-beta.1`) to confirm the workflow runs end-to-end

### 3g: Test coverage baseline

- [ ] Coverage report generated (Pester's `-CodeCoverage` parameter or a coverage tool)
- [ ] Baseline coverage percentage recorded in the tracking issue
- [ ] At least critical public functions have tests; gaps documented as issues

### Phase 3 exit criteria

- [ ] All standard psake tasks exist and pass
- [ ] CI is green on `main`
- [ ] PSScriptAnalyzer clean
- [ ] Release workflow tested

---

## Phase 4: First clean release (weeks 4–8)

Goal: cut a release under the PowerShellOrg banner that you are proud to put your name on.

### Release gate checklist

- [ ] `CHANGELOG.md` exists and documents what has changed since the last release (even if that is just "Transferred to PowerShellOrg, CI modernized")
- [ ] Module version bumped appropriately (patch if no user-facing changes, minor if new features, major if breaking)
- [ ] All tests passing on CI
- [ ] PSScriptAnalyzer clean
- [ ] Module manifest is accurate: description, author (or organization), copyright, tags, PSGallery URLs
- [ ] `README.md` updated: installation instructions current, usage examples work, badges updated
- [ ] Any open critical bugs addressed or explicitly deferred with a documented reason
- [ ] At least one other maintainer has reviewed the release PR (or Steward if solo)

### Release steps

1. Open a PR titled `chore: release vX.Y.Z`
2. Update `CHANGELOG.md` and bump the version in the module manifest
3. Get at least one review
4. Merge to `main`
5. Push the tag: `git tag vX.Y.Z && git push origin vX.Y.Z`
6. Confirm the release workflow succeeds: PSGallery package updated, GitHub Release created
7. Announce in the Council channel

### Phase 4 exit criteria

- [ ] At least one release published to PSGallery under PowerShellOrg
- [ ] GitHub Release exists with human-readable notes
- [ ] PSGallery package description updated to reflect PowerShellOrg stewardship

---

## Phase 5: Ongoing maintenance and transition to active

Once Phase 4 is done, the repo transitions from `status-incoming` to `status-active`.

### Transition checklist

- [ ] Repo topic updated from `status-incoming` to `status-active`
- [ ] `README.md` status badge updated
- [ ] Steward notified (they will update any org-level tracking)
- [ ] Announcement posted in Council channel

### Ongoing cadence

| Activity | Frequency |
|---|---|
| Issue triage | Weekly (or within 7 days of new issues) |
| PR review | Within 7 days of opening |
| Dependency review | Monthly (check for PSGallery module updates) |
| Release | As needed; no more than 3 months between releases if there are merged changes |
| PSGallery API key rotation | Annually (Steward-driven, maintainer confirms) |

### Graduation to stable

When the repo has been in `status-active` for at least 12 months, has had 2+ clean releases, has 2+ active maintainers, and has no critical open issues, propose graduation to `status-stable` in the Council channel. See [GOVERNANCE.md](../.github/GOVERNANCE.md) for the graduation criteria.
