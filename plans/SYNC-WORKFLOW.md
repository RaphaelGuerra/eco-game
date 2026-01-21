# Synchronization Workflow: Kilo Code + Claude Code

## Tool Roles & Responsibilities

- **Kilo Code (VS Code)**: orchestration, architecture decisions, multi-file refactors, coordinated changes across components, and documentation in `plans/`.
- **Claude Code (terminal)**: quick local edits, terminal operations (git, npm, lint/test), and focused debugging.

> Rule of thumb: only one tool actively edits a working tree at a time. Hand off with a clean git status.

---

## Synchronization Protocol

### Before starting work

```bash
git fetch --all --prune
git status --short
git pull --rebase
```

If starting new work, create a branch (default):

```bash
git checkout -b feature/short-description
```

### During work

- Commit frequently with descriptive messages.
- Use partial staging to keep commits focused.

```bash
git add -p
git commit -m "feat(ui): refine lesson summary"
```

- Before switching tools, ensure the working tree is clean (commit or stash).

```bash
git status --short
```

### After work

- Push your branch and record what changed.

```bash
git push -u origin feature/short-description
```

- Update `plans/` notes with a short summary of changes and next steps.

---

## Git Workflow Best Practices

### Branching conventions

- Default branch for work: `feature/<topic>`.
- Use `phase-1` only for small, low-risk fixes or docs.
- Other prefixes when helpful: `fix/`, `chore/`, `docs/`, `refactor/`.

### Commit message format (Conventional Commits)

Format: `type(scope): description`

Examples:
- `feat(lesson): add completion summary card`
- `fix(store): guard against empty progress`
- `docs(sync): add tool workflow notes`
- `chore(deps): update eslint config`

### When to use a feature branch

Use `feature/*` for:
- multi-file changes
- new UI or behavior
- refactors
- anything risky or experimental

Use `phase-1` for:
- tiny fixes or copy tweaks
- documentation-only changes

---

## Context Sharing Strategy

- Use `plans/` for decision logs, session notes, and handoff context.
- Keep a lightweight session log like `plans/session-notes-YYYY-MM-DD.md` with:
  - Summary
  - Files touched
  - Next steps
- Optional: maintain a brief `CHANGELOG.md` or `plans/CHANGELOG.md`.
- Store Claude Code settings in `.claude/`. Keep `settings.local.json` local and untracked unless intentionally shared.

---

## Conflict Resolution

1. Inspect changes and history:

```bash
git status --short
git diff
git diff --name-only
git log --oneline --graph --decorate -n 20
```

2. Prefer a rebase when pulling:

```bash
git pull --rebase
```

3. Resolve conflicts, then continue:

```bash
git add <file>
git rebase --continue
```

4. If needed, abort and reassess:

```bash
git rebase --abort
# or
git merge --abort
```

5. Review staged changes before committing:

```bash
git diff --staged
```

---

## Quick Reference Checklist

### Pre-session

- [ ] `git fetch --all --prune`
- [ ] `git status --short`
- [ ] `git pull --rebase`
- [ ] Create branch if needed: `git checkout -b feature/<topic>`
- [ ] Review current notes in `plans/`

### Post-session

- [ ] `git status --short` (clean)
- [ ] Commit with Conventional Commit message
- [ ] `git push -u origin <branch>`
- [ ] Update session notes in `plans/`
- [ ] Note conflicts resolved or decisions made
