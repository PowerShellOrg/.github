// Opens one [REVIVAL] tracking issue plus six phase sub-issues from docs/revival/*.md.
// Runs inside the reusable workflow, so context.repo is the CALLING module repo: issues are
// created there and the baseline is read from there. Idempotent: re-running for the same
// module finds every existing issue by title, creates only what is missing, and attaches
// any phase not yet linked. Caller's GITHUB_TOKEN, issues: write.
const fs = require('fs');
const path = require('path');

const SOURCE_DIR = 'docs/revival';
const PHASES = ['phase-0', 'phase-1', 'phase-2', 'phase-3', 'phase-4', 'phase-5'];
const TRACKING_LABEL = 'revival';

function parseSource(file) {
  const raw = fs.readFileSync(path.join(process.cwd(), SOURCE_DIR, `${file}.md`), 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) throw new Error(`${file}.md has no frontmatter`);
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].replace(/^"(.*)"$/, '$1').trim();
  }
  const labels = (meta.labels || '').split(',').map(s => s.trim()).filter(Boolean);
  return { title: meta.title, type: meta.type || null, labels, body: raw.slice(m[0].length) };
}

function fill(text, vars) {
  return text.replace(/\{\{(\w+)\}\}/g, (_, k) => (vars[k] ?? `_${k}_`));
}

const CALLER_PATH = '.github/workflows/revival-start.yml';

async function baseline(github, owner, repo) {
  const r = (await github.rest.repos.get({ owner, repo })).data;
  // open_issues_count includes PRs; subtract an exact PR count.
  const open_prs = (await github.paginate(github.rest.pulls.list, { owner, repo, state: 'open', per_page: 100 })).length;

  // CI detection. The caller workflow lives in .github/workflows, so its presence alone is not CI.
  const ci = [];
  try {
    const entries = (await github.rest.repos.getContent({ owner, repo, path: '.github/workflows' })).data;
    if (Array.isArray(entries) && entries.some(e => `.github/workflows/${e.name}` !== CALLER_PATH && /\.ya?ml$/.test(e.name))) ci.push('GitHub Actions');
  } catch (e) { if (e.status !== 404) throw e; }
  for (const [p, name] of [['appveyor.yml', 'AppVeyor'], ['azure-pipelines.yml', 'Azure Pipelines'], ['.travis.yml', 'Travis']]) {
    try { await github.rest.repos.getContent({ owner, repo, path: p }); ci.push(name); } catch (e) { if (e.status !== 404) throw e; }
  }

  // Last real commit: skip commits that only touch the caller file.
  let last_push = r.pushed_at.slice(0, 10);
  const recent = (await github.rest.repos.listCommits({ owner, repo, per_page: 5 })).data;
  for (const c of recent) {
    const files = (await github.rest.repos.getCommit({ owner, repo, ref: c.sha })).data.files || [];
    if (files.length && files.every(f => f.filename === CALLER_PATH)) continue;
    last_push = c.commit.committer.date.slice(0, 10);
    break;
  }

  return {
    repo_url: r.html_url, last_push, open_issues: r.open_issues_count - open_prs, open_prs,
    stars: r.stargazers_count, forks: r.forks_count, ci: ci.length ? ci.join(', ') : 'none',
  };
}

async function revivalIssues(github, owner, repo) {
  const issues = await github.paginate(github.rest.issues.listForRepo, { owner, repo, labels: TRACKING_LABEL, state: 'all', per_page: 100 });
  return new Map(issues.filter(i => !i.pull_request).map(i => [i.title, i]));
}

async function subIssueIds(github, owner, repo, parentNumber) {
  const subs = await github.paginate('GET /repos/{owner}/{repo}/issues/{issue_number}/sub_issues', { owner, repo, issue_number: parentNumber, per_page: 100 });
  return new Set(subs.map(s => s.id));
}

async function ensureLabel(github, owner, repo) {
  try { await github.rest.issues.getLabel({ owner, repo, name: TRACKING_LABEL }); }
  catch (e) {
    if (e.status !== 404) throw e;
    await github.rest.issues.createLabel({ owner, repo, name: TRACKING_LABEL, color: '5319e7', description: 'Module revival tracking' });
  }
}

async function createIssue(github, owner, repo, src, vars) {
  const params = { owner, repo, title: fill(src.title, vars), body: fill(src.body, vars), labels: src.labels };
  if (src.type) params.type = src.type;
  if (vars.steward !== 'unassigned') params.assignees = [vars.steward.slice(1)];
  try {
    return (await github.request('POST /repos/{owner}/{repo}/issues', params)).data;
  } catch (e) {
    // Issue type unknown to this org, or steward not assignable: retry bare rather than fail the run.
    if (e.status !== 422) throw e;
    console.warn(`422 creating "${params.title}" (${e.message}); retrying without type/assignees`);
    delete params.type; delete params.assignees;
    return (await github.request('POST /repos/{owner}/{repo}/issues', params)).data;
  }
}

module.exports = async function run({ github, context, core, inputs }) {
  const { owner, repo } = context.repo;
  const module = (inputs.module || repo).trim();
  const tracking = parseSource('tracking');

  const vars = {
    module, steward: inputs.steward ? '@' + inputs.steward.trim().replace(/^@/, '') : 'unassigned',
    today: new Date().toISOString().slice(0, 10), ...(await baseline(github, owner, repo)),
  };
  await ensureLabel(github, owner, repo);
  const byTitle = await revivalIssues(github, owner, repo);
  const findOrCreate = async (src) => {
    const title = fill(src.title, vars);
    if (byTitle.has(title)) { core.info(`exists  ${title} -> #${byTitle.get(title).number}`); return { issue: byTitle.get(title), created: false }; }
    const issue = await createIssue(github, owner, repo, src, vars);
    byTitle.set(title, issue);
    core.info(`created ${title} -> #${issue.number}`);
    return { issue, created: true };
  };

  // Find-or-create the parent, then reconcile every phase and every attachment. A re-run after a
  // partial failure completes the set instead of stopping at "parent exists".
  const { issue: parent, created: parentCreated } = await findOrCreate(tracking);
  const attached = await subIssueIds(github, owner, repo, parent.number);
  const children = []; let createdCount = parentCreated ? 1 : 0, attachedCount = 0;
  for (const name of PHASES) {
    const { issue: child, created } = await findOrCreate(parseSource(name));
    if (created) createdCount++;
    if (!attached.has(child.id)) {
      // sub_issue_id is the database id, not the issue number.
      await github.request('POST /repos/{owner}/{repo}/issues/{issue_number}/sub_issues', { owner, repo, issue_number: parent.number, sub_issue_id: child.id });
      attachedCount++;
    }
    children.push(child);
  }

  const verb = createdCount === 0 && attachedCount === 0 ? 'Already complete' : `Reconciled (${createdCount} created, ${attachedCount} attached)`;
  core.setOutput('tracking_issue', parent.number);
  core.summary.addHeading(`Revival: ${module}`)
    .addRaw(`${verb}. Tracking issue [#${parent.number}](${parent.html_url}) with ${children.length} phase sub-issues.`)
    .addList(children.map(c => `#${c.number} ${c.title}`))
    .write();
};
