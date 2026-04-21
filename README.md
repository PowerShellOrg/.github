# PowerShellOrg Community Health Files

This repository provides organization-wide default community health files and shared infrastructure for [PowerShellOrg](https://github.com/PowerShellOrg) — a community-run GitHub organization dedicated to maintaining quality PowerShell open-source tools.

GitHub automatically applies the files in `.github/` to every repository in the org that does not define its own version.

## What's in here

| Path | Purpose |
|---|---|
| [`.github/CODE_OF_CONDUCT.md`](.github/CODE_OF_CONDUCT.md) | Contributor Covenant 3.0, adapted for PowerShellOrg |
| [`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md) | Org-wide contribution guide; dev setup, PR expectations, release process |
| [`.github/SECURITY.md`](.github/SECURITY.md) | Vulnerability reporting policy and SLA commitments |
| [`.github/SUPPORT.md`](.github/SUPPORT.md) | Where to ask questions vs. file issues |
| [`.github/GOVERNANCE.md`](.github/GOVERNANCE.md) | Roles, decision-making, maintainer lifecycle, succession |
| [`.github/FUNDING.yml`](.github/FUNDING.yml) | Funding platform configuration (placeholder) |
| [`.github/ISSUE_TEMPLATE/`](.github/ISSUE_TEMPLATE/) | YAML issue forms: bug, feature, question, adoption request |
| [`.github/DISCUSSION_TEMPLATE/`](.github/DISCUSSION_TEMPLATE/) | Discussion category starters |
| [`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md) | Standard PR checklist |
| [`.github/workflows/powershell-ci.yml`](.github/workflows/powershell-ci.yml) | Reusable CI workflow: Windows + Linux + macOS, PS 5.1 + 7.x |
| [`.github/workflows/powershell-release.yml`](.github/workflows/powershell-release.yml) | Reusable release workflow: build, publish to PSGallery, GitHub Release |
| [`docs/maintainer-onboarding.md`](docs/maintainer-onboarding.md) | Day-1 checklist for new maintainers |
| [`docs/revival-playbook.md`](docs/revival-playbook.md) | Five-phase checklist for reviving an abandoned tool |
| [`docs/adoption-criteria.md`](docs/adoption-criteria.md) | What we evaluate before adopting a tool |
| [`profile/README.md`](profile/README.md) | Org landing page displayed on github.com/PowerShellOrg |

## Reusable workflows

Both workflows are [reusable](https://docs.github.com/en/actions/using-workflows/reusing-workflows) via `workflow_call`. Consuming repos call them from their own tag-triggered or push-triggered workflows.

**Current consumers:** Plaster, PSDepend

### CI (`powershell-ci.yml`)

Runs the full test and analysis matrix. Call it from any repo:

```yaml
jobs:
  ci:
    uses: PowerShellOrg/.github/.github/workflows/powershell-ci.yml@main
```

### Release (`powershell-release.yml`)

Builds, publishes to PSGallery, and creates a GitHub Release. Requires the `PSGALLERY_API_KEY` secret to be set in the consuming repo.

```yaml
jobs:
  release:
    uses: PowerShellOrg/.github/.github/workflows/powershell-release.yml@main
    with:
      module-name: MyModule
    secrets:
      PSGALLERY_API_KEY: ${{ secrets.PSGALLERY_API_KEY }}
```

## Governance

See [`GOVERNANCE.md`](.github/GOVERNANCE.md) for the full governance model. The short version: the Org Admin holds org-wide authority; each adopted project has its own Steward who drives it day-to-day; the Council is all active Stewards plus invited members; the 72-hour silent-assent window applies to both.

## License

[MIT](LICENSE)
