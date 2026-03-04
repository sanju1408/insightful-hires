# Website Maintenance Agents

This repository now has automated maintenance agents through GitHub:

1. CI Agent (`.github/workflows/ci.yml`)
- Runs on every push and pull request to `main`.
- Installs dependencies, runs `typecheck`, and builds the project.
- Prevents broken code from reaching production.

2. Security Agent (`.github/workflows/security-audit.yml`)
- Runs weekly and on manual trigger.
- Executes `npm audit --audit-level=high`.
- Flags vulnerable dependencies early.

3. Dependency Update Agent (`.github/dependabot.yml`)
- Runs weekly.
- Opens dependency update pull requests automatically.

## How To Use

- Push these files to GitHub.
- Go to the repo `Actions` tab and confirm workflows are enabled.
- Optionally protect `main` branch and require CI checks before merge.
