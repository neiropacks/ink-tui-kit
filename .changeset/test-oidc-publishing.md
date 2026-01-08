---
xterm-mouse: patch
"@ink-tools/ink-mouse": patch
---

Fix: Replace `bun changeset publish` with custom scripts that properly resolve workspace:* dependencies during publishing. Uses `npm publish --provenance` to maintain OIDC security while ensuring workspace dependencies are converted to actual versions.
