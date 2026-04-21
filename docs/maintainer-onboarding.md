# Maintainer Onboarding

Welcome to PowerShellOrg. This checklist walks you through everything you need to be fully operational on day one and productive in the first week.

---

## Day 1: Access and accounts

### GitHub org access

- [ ] Accept the org invite from the Steward (check your GitHub notifications and email)
- [ ] Verify you have **Write** access to your assigned repo(s) — navigate to the repo → **Settings** → **Collaborators and teams**
- [ ] Enable **two-factor authentication** on your GitHub account if not already enabled — this is a hard requirement for org membership ([docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication))

### Council channel

- [ ] Introduce yourself in the Council channel: `<FILL IN: channel URL or invite link>`
- [ ] Note your timezone and typical availability (helps set realistic review expectations)

### PSGallery account

- [ ] Confirm you have a [PowerShell Gallery](https://www.powershellgallery.com/) account
- [ ] Share your PSGallery username with the Steward — you will need it for the API key issuance step below

---

## Day 1: Repo familiarization

- [ ] Clone the repo locally
- [ ] Read the repo's `README.md` and any existing `CONTRIBUTING.md`
- [ ] Read `CHANGELOG.md` to understand recent history
- [ ] Read open issues and PRs — look for anything labeled `needs-triage` or with recent activity

---

## Day 1: Branch protection verification

Verify the repo's default branch has the following protections enabled. Navigate to the repo → **Settings** → **Branches** → branch protection rule for `main`.

- [ ] **Require a pull request before merging** — enabled
- [ ] **Require approvals** — at least 1 required reviewer
- [ ] **Dismiss stale pull request approvals when new commits are pushed** — enabled
- [ ] **Require status checks to pass before merging** — enabled; the CI workflow must be listed
- [ ] **Require branches to be up to date before merging** — enabled
- [ ] **Require linear history** — enabled
- [ ] **Do not allow force pushes** — enabled
- [ ] **Do not allow deletions** — enabled

If any of these are missing, notify the Steward before merging anything.

---

## Day 1: PSGallery API key

PowerShellOrg uses **per-repo scoped API keys** for PSGallery. You do not get an org-wide key.

### Key issuance process (Steward action)

The Steward creates the key with these parameters:

| Parameter | Value |
|---|---|
| Key name | `PowerShellOrg-<RepoName>-<YYYY-MM>` (e.g., `PowerShellOrg-PSDepend-2025-11`) |
| Glob pattern | The module name exactly (e.g., `PSDepend`) |
| Expiration | 365 days (the PSGallery maximum) |

The Steward then:
1. Creates or updates the `PSGALLERY_API_KEY` Actions secret in the repo
2. Adds a rotation reminder to the private key tracking issue (pinned to this repo)
3. Notifies the maintainer that the key is in place

### Maintainer steps

- [ ] Confirm with the Steward that `PSGALLERY_API_KEY` is set in the repo's Actions secrets (**Settings** → **Secrets and variables** → **Actions**)
- [ ] Note the key expiration month — the Steward will initiate rotation, but you may be asked to trigger it

### Key rotation

Keys expire after 365 days. The Steward tracks rotation in a private pinned issue. When rotation is due:
1. Steward creates a new key on PSGallery with the same glob, new `YYYY-MM` suffix in the name
2. Steward updates the `PSGALLERY_API_KEY` secret in the repo
3. Old key is deleted from PSGallery
4. Tracking issue is updated

---

## Day 1: CI bootstrap

- [ ] Install the standard build stack locally:

  ```powershell
  Install-Module psake            -Scope CurrentUser -Force
  Install-Module PowerShellBuild  -Scope CurrentUser -Force
  Install-Module PSScriptAnalyzer -Scope CurrentUser -Force
  Install-Module Pester           -Scope CurrentUser -Force -MinimumVersion '5.0' -MaximumVersion '5.99'
  ```

- [ ] Run `Invoke-psake ?` in the repo root — confirm the standard tasks are listed (Init, Clean, Build, Test, Analyze, Publish)
- [ ] Run `Invoke-psake Test` — confirm all tests pass
- [ ] Run `Invoke-psake Analyze` — confirm no PSScriptAnalyzer warnings
- [ ] Navigate to the repo's **Actions** tab and confirm the CI workflow is running and green on `main`

If the CI workflow is not present or not green, see the [Revival Playbook](revival-playbook.md) Phase 3 for modernization steps.

---

## First week: Communication norms

### Issue and PR triage

| Repo status | First-response target |
|---|---|
| `status-active` | 7 days |
| `status-stable` | 30 days |

First response means: a label applied, a comment acknowledging the issue, or a review comment on the PR — not necessarily a resolution.

Set up GitHub notifications for your repo: **Watch** → **All activity**, or at minimum **Issues** and **Pull requests**.

### Code review

- Aim to complete (not just start) reviews within 30 days of assignment
- Use GitHub's "Request changes" only when a change is genuinely blocking — a comment thread is sufficient for most feedback
- When merging, prefer **Squash and merge** for single-commit PRs and **Merge commit** for multi-commit work where history is meaningful. Avoid **Rebase and merge** unless the branch is perfectly clean — it rewrites history and removes the merge traceability.

### Releases

- Announce releases in the Council channel when they go out
- Tag the release commit with `vX.Y.Z` — this triggers the release workflow
- The GitHub Release notes are auto-generated; add a brief human summary at the top if the automated notes are too sparse

### Escalation

- Blocked by a technical question? Post in the Council channel — another maintainer may know the answer.
- Blocked by a process question? Ask the Steward.
- Seeing behavior that might violate the Code of Conduct? Report to `conduct@powershellorg.example` or message the Steward directly.
- Need to step down or take a break? Tell the Steward as early as possible — we would rather hand off gracefully than have a repo go dark unexpectedly.
