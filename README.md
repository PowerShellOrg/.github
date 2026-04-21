# PowerShellOrg Community Health Files

This repository provides organization-wide default community health files and
shared infrastructure for [PowerShellOrg][powershellorg] — a community-run
GitHub organization dedicated to maintaining quality PowerShell open-source
tools.

GitHub automatically applies the files in `.github/` to every repository in the
org that does not define its own version.

## What's in here

| Path                                                           | Purpose                                                                  |
| -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [`.github/CODE_OF_CONDUCT.md`][code-of-conduct]                | Contributor Covenant 3.0, adapted for PowerShellOrg                      |
| [`.github/CONTRIBUTING.md`][contributing]                      | Org-wide contribution guide; dev setup, PR expectations, release process |
| [`.github/SECURITY.md`][security]                              | Vulnerability reporting policy and SLA commitments                       |
| [`.github/SUPPORT.md`][support]                                | Where to ask questions vs. file issues                                   |
| [`.github/GOVERNANCE.md`][governance]                          | Roles, decision-making, maintainer lifecycle, succession                 |
| [`.github/FUNDING.yml`][funding]                               | Funding platform configuration (placeholder)                             |
| [`.github/ISSUE_TEMPLATE/`][issue-template]                    | YAML issue forms: bug, feature, question, adoption request               |
| [`.github/DISCUSSION_TEMPLATE/`][discussion-template]          | Discussion category starters                                             |
| [`.github/PULL_REQUEST_TEMPLATE.md`][pr-template]              | Standard PR checklist                                                    |
| [`.github/workflows/powershell-ci.yml`][workflow-ci]           | Reusable CI workflow: Windows + Linux + macOS, PS 5.1 + 7.x              |
| [`.github/workflows/powershell-release.yml`][workflow-release] | Reusable release workflow: build, publish to PSGallery, GitHub Release   |
| [`docs/maintainer-onboarding.md`][maintainer-onboarding]       | Day-1 checklist for new maintainers                                      |
| [`docs/revival-playbook.md`][revival-playbook]                 | Five-phase checklist for reviving an abandoned tool                      |
| [`docs/adoption-criteria.md`][adoption-criteria]               | What we evaluate before adopting a tool                                  |
| [`profile/README.md`][profile-readme]                          | Org landing page displayed on github.com/PowerShellOrg                   |

## Reusable workflows

Both workflows are [reusable][reusable-workflows] via `workflow_call`. Consuming
repos call them from their own tag-triggered or push-triggered workflows.

**Current consumers:** Plaster, PSDepend

### CI (`powershell-ci.yml`)

Runs the full test and analysis matrix. Call it from any repo:

```yaml
jobs:
  ci:
    uses: PowerShellOrg/.github/.github/workflows/powershell-ci.yml@main
```

### Release (`powershell-release.yml`)

Builds, publishes to PSGallery, and creates a GitHub Release. Requires the
`PSGALLERY_API_KEY` secret to be set in the consuming repo.

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

See [`GOVERNANCE.md`][governance] for the full governance model. The short
version: the Org Admin holds org-wide authority; each adopted project has its
own Steward who drives it day-to-day; the Council is all active Stewards plus
invited members; the 72-hour silent-assent window applies to both.

## License

[MIT][license]

[powershellorg]: https://github.com/PowerShellOrg
[code-of-conduct]: .github/CODE_OF_CONDUCT.md
[contributing]: .github/CONTRIBUTING.md
[security]: .github/SECURITY.md
[support]: .github/SUPPORT.md
[governance]: .github/GOVERNANCE.md
[funding]: .github/FUNDING.yml
[issue-template]: .github/ISSUE_TEMPLATE/
[discussion-template]: .github/DISCUSSION_TEMPLATE/
[pr-template]: .github/PULL_REQUEST_TEMPLATE.md
[workflow-ci]: .github/workflows/powershell-ci.yml
[workflow-release]: .github/workflows/powershell-release.yml
[maintainer-onboarding]: docs/maintainer-onboarding.md
[revival-playbook]: docs/revival-playbook.md
[adoption-criteria]: docs/adoption-criteria.md
[profile-readme]: profile/README.md
[reusable-workflows]:
  https://docs.github.com/en/actions/using-workflows/reusing-workflows
[license]: LICENSE
