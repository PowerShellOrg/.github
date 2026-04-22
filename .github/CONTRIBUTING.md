# Contributing to PowerShellOrg Projects

Welcome — and thank you for considering a contribution. PowerShellOrg maintains
PowerShell open-source tools that depend on community involvement to survive.
Every bug report, doc fix, and pull request matters.

This document covers org-wide expectations. Individual repos may add
project-specific guidance in their own `README.md` or `CONTRIBUTING.md`; where
they conflict with this document, the repo-level doc takes precedence.

---

## Scope and governance

PowerShellOrg focuses on PowerShell tooling. Before proposing a large feature or
a significant design change, read [GOVERNANCE.md][governance] to understand how
decisions get made. For substantial proposals, open an issue first so we can
align before you invest time writing code.

---

## Before you contribute

1. **Check existing issues and PRs.** Someone may already be working on it.
2. **Read the repo's README.** Each project documents its purpose, status, and
   any project-specific constraints.
3. **Agree to the license terms.** By submitting a contribution you agree that
   your work is licensed under the repo's license (MIT unless noted otherwise).
   See [License by contribution](#license-by-contribution) below.

---

## Development setup

All PowerShellOrg projects use the same build stack:

| Tool                                 | Purpose                   |
| ------------------------------------ | ------------------------- |
| [psake][psake]                       | Build automation          |
| [PowerShellBuild][powershellbuild]   | Shared psake task library |
| [Pester 5][pester]                   | Testing                   |
| [PSScriptAnalyzer][psscriptanalyzer] | Static analysis           |

**Install build dependencies:**

```powershell
Install-Module psake             -Scope CurrentUser -Force
Install-Module PowerShellBuild   -Scope CurrentUser -Force
Install-Module Pester            -Scope CurrentUser -Force -MinimumVersion '5.0'
Install-Module PSScriptAnalyzer  -Scope CurrentUser -Force
```

**Common psake tasks** (every repo exposes these):

```powershell
Invoke-psake Init      # First-time setup
Invoke-psake Clean     # Remove build artifacts
Invoke-psake Build     # Compile / stage the module
Invoke-psake Test      # Run Pester tests
Invoke-psake Analyze   # Run PSScriptAnalyzer
Invoke-psake Publish   # Publish to PSGallery (CI only — never run manually)
```

Run `Invoke-psake ?` to see all available tasks and their descriptions.

**Target platforms:** Windows PowerShell 5.1 and PowerShell 7.x on Windows,
Linux, and macOS. Write code that runs on all six combinations.

---

## Branching and commits

- **Fork the repo** and work on a branch named for the thing you're changing:
  `fix/null-ref-in-invoke`, `feat/add-verbose-output`, `docs/update-readme`.
- **Keep commits focused.** One logical change per commit. Use the [Conventional
  Commits][conventional-commits] style:
  - `fix: correct null reference in Invoke-PSDepend`
  - `feat: add -WhatIf support to Install task`
  - `docs: clarify quickstart example`
  - `chore: bump Pester to 5.6`
  - `test: add coverage for empty dependency file`
- **Do not squash history prematurely.** Maintainers may squash on merge if
  appropriate.
- **Keep `main` green.** Never force-push to `main` or shared branches.

---

## Pull request expectations

Before opening a PR:

- [ ] `Invoke-psake Test` passes locally on at least one platform
- [ ] `Invoke-psake Analyze` passes with no new warnings
- [ ] New behavior has Pester test coverage
- [ ] `CHANGELOG.md` is updated for user-facing changes
- [ ] Docs are updated if behavior changed

Fill out the PR template completely. PRs with empty templates or no linked issue
for non-trivial changes will be asked to complete the template before review
starts.

**Draft PRs** are welcome for early feedback. Mark them ready for review when
you want the full review pass.

---

## Code review expectations

### For contributors

- Respond to review comments within **14 days**. If you need more time, say so —
  we will wait.
- If a comment is a question, answer it. If it is a request, either make the
  change or explain why you disagree.
- A maintainer will make the final call. Disagreements are discussed, not
  escalated.

### For maintainers

| Repo status     | First response SLA                           | Review completion SLA |
| --------------- | -------------------------------------------- | --------------------- |
| `status-active` | 7 days                                       | 30 days               |
| `status-stable` | 30 days                                      | 60 days               |
| `status-paused` | Suspended; security issues only, best-effort | —                     |

SLAs are best-effort commitments, not guarantees. If a repo is understaffed, the
project's Steward will note this in the repo's README.

If a PR sits without response past the SLA, ping `@PowerShellOrg/maintainers` or
open a discussion.

---

## Releases

Releases are cut by maintainers. The process:

1. Maintainer updates `CHANGELOG.md` and bumps the module version in the
   manifest.
2. Maintainer opens a PR titled `chore: release vX.Y.Z`.
3. PR is reviewed and merged to `main`.
4. Maintainer pushes a version tag (`vX.Y.Z`) to `main`.
5. The tag triggers `powershell-release.yml`, which builds, publishes to
   PSGallery, and creates a GitHub Release.

Contributors do not cut releases. If you believe a release is overdue, open an
issue and tag the maintainers.

---

## License by contribution

By submitting a pull request or other contribution, you agree that your
contribution is made under the same license as the project you are contributing
to (MIT unless the repo states otherwise). You represent that you have the right
to make the contribution under those terms.

If your employer has rights to code you write, ensure you have permission to
contribute it before submitting.

---

## Questions?

See [SUPPORT.md][support].

[governance]: GOVERNANCE.md
[psake]: https://github.com/psake/psake
[powershellbuild]: https://github.com/psake/PowerShellBuild
[pester]: https://pester.dev
[psscriptanalyzer]: https://github.com/PowerShell/PSScriptAnalyzer
[conventional-commits]: https://www.conventionalcommits.org/
[support]: SUPPORT.md
