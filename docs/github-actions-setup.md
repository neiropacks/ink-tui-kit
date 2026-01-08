# GitHub Actions Setup for Changesets

This document explains how to configure GitHub Actions permissions for the Changesets release workflow in your organization, including setting up secure Trusted Publishing (OIDC) for npm.

## Trusted Publishing with npm (Recommended)

This project uses **Trusted Publishing** (OIDC) instead of long-lived npm tokens. This is more secure and the recommended approach by npm.

### What is Trusted Publishing?

Trusted Publishing eliminates the need for npm tokens by using OpenID Connect (OIDC) to authenticate GitHub Actions directly with npm. Benefits:

- ✅ **No tokens to manage** - No long-lived secrets to rotate or leak
- ✅ **More secure** - Automatic, short-lived credentials
- ✅ **Provenance** - Automatically generates software supply chain transparency
- ✅ **Best practice** - Recommended by npm and GitHub

### Setting Up Trusted Publishing

#### Step 1: Create a Publisher in npm

1. Go to [npm Packages](https://www.npmjs.com/org/neiropacks/packages)
2. Click on your package (e.g., `@neiropacks/ink-mouse`)
3. Go to **Publishing** tab
4. Click **"Add publisher"**
5. Configure:
   - **Name**: `github-actions-ink-tui-kit` (or similar)
   - **GitHub Organization**: `neiropacks`
   - **Repository**: `ink-tui-kit`
   - **Workflow name**: `Release` (from `.github/workflows/release.yml`)
   - **Environment**: (leave empty for now)
6. Click **"Create publisher"**

Repeat for each package in the monorepo.

#### Step 2: Verify Workflow Configuration

The workflow already has the correct configuration:

```yaml
permissions:
  id-token: write  # Required for OIDC
```

This permission allows GitHub Actions to generate OIDC tokens for npm authentication.

#### Step 3: Test the Setup

1. Create a changeset: `bun changeset`
2. Commit and push to main
3. GitHub Actions will create a release PR
4. Merge the PR
5. GitHub Actions will publish to npm using Trusted Publishing

**No NPM_TOKEN secret needed!** ✅

### Troubleshooting Trusted Publishing

#### Error: "E404" or "package not found"

**Cause**: Package doesn't exist on npm yet.

**Solution**: Publish the package manually once:

```bash
npm login
bun changeset publish
```

After first publication, Trusted Publishing will work.

#### Error: "EPUBLISHCONFLECT"

**Cause**: Package version already exists on npm.

**Solution**: This is normal - Changesets will skip already published versions.

#### Error: "OIDC token not available"

**Cause**: Missing `id-token: write` permission.

**Solution**: Ensure workflow has:

```yaml
permissions:
  id-token: write
```

#### Error: "No publisher found"

**Cause**: Trusted Publishing not configured in npm.

**Solution**: Follow "Step 1" above to create a publisher.

---

## Alternative: Legacy NPM_TOKEN (Not Recommended)

If you cannot use Trusted Publishing, you can use a traditional npm token. However, this is **not recommended** for security reasons.

### Setup (Not Recommended)

1. Create an npm Automation token: [npmjs.com/settings/tokens](https://www.npmjs.com/settings/[your-username]/tokens)
2. Add `NPM_TOKEN` to GitHub Secrets
3. Update workflow to use `NPM_TOKEN: ${{ secrets.NPM_TOKEN }}`

**Why this is not recommended:**

- ❌ Long-lived tokens are security risk
- ❌ Tokens can leak accidentally
- ❌ Requires manual token rotation
- ❌ No automatic provenance generation

Use Trusted Publishing instead whenever possible.

---

## Current Configuration

Both workflow files use **fine-grained permissions** for security:

- **CI workflow** (`.github/workflows/ci.yml`): `contents: read` only
- **Release workflow** (`.github/workflows/release.yml`):
  - `contents: write` - for committing version bumps
  - `pull-requests: write` - for creating release PRs
  - `id-token: write` - for Trusted Publishing with npm

This follows the principle of least privilege - each workflow has only the permissions it needs.

## Required GitHub Settings

For the Changesets release workflow to work, you need to configure your repository or organization settings:

### Option 1: Repository-Level Settings (Recommended for Public Repos)

1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select:
   - ✅ **Read and write permissions**
3. ✅ Check **Allow GitHub Actions to create and approve pull requests**
4. Click **Save**

### Option 2: Organization-Level Settings (For Private/Org Repos)

If your organization restricts workflow permissions:

1. Go to **Organization Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select:
   - ✅ **Read and write permissions**
3. ✅ Check **Allow GitHub Actions to create and approve pull requests**
4. Optionally, restrict to specific repositories if needed

### Option 3: Manual Release Process (Most Secure)

If you want to minimize automation permissions:

1. **Disable automatic PR creation** in the release workflow
2. When releasing changes:

   ```bash
   # After merging changes to main
   bun changeset version

   # Push the version changes
   git push

   # Create PR manually for the release branch
   ```

## Security Best Practices

### Why This Approach?

- ✅ **Principle of Least Privilege**: Each workflow has minimal required permissions
- ✅ **Audit Trail**: All actions logged as GitHub Actions bot
- ✅ **No Personal Tokens**: No need for PATs tied to individual users
- ✅ **Granular Control**: Fine-grained permissions per workflow

### What Each Permission Does

- `contents: read` - CI can checkout code, but cannot modify
- `contents: write` - Release can commit version bumps and tags
- `pull-requests: write` - Release can create version PRs
- `id-token: write` - Release can generate OIDC tokens for Trusted Publishing

### For Organization Security

If your organization has strict security requirements:

1. Consider using **GitHub Apps** instead of PATs for external integrations
2. Regularly audit workflow permissions in **Settings** → **Actions** → **General**
3. Use **environment protection rules** for publishing to npm
4. Enable **required reviews** for workflow changes

## Verification

After configuration, verify it works:

1. Create a changeset: `bun changeset`
2. Commit and push to main
3. Check **Actions** tab for the "Release" workflow
4. Confirm a PR is created for `changeset-release/main`

## Troubleshooting

### Error: "GitHub Actions is not permitted to create or approve pull requests"

**Solution**: Enable the checkbox in Settings as described in Option 1 or 2 above.

### Error: "Resource not accessible by integration"

**Solution**: Ensure the workflow has `contents: write` permission (already configured in `.github/workflows/release.yml`).

### Permission denied when publishing

**Solution**: Configure Trusted Publishing in npm (see "Setting Up Trusted Publishing" above).

Do NOT use `NPM_TOKEN` - this project uses Trusted Publishing for security.

## Additional Resources

### GitHub Actions & Permissions

- [GitHub Actions: Managing workflow permissions](https://docs.github.com/en/actions/managing-workflow-runs-in-github-actions/managing-workflow-permissions)
- [OAuth scopes and permissions for GitHub Actions](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token)

### Trusted Publishing

- [npm: About Trusted Publishing](https://docs.npmjs.com/generating-provenance-steps)
- [npm: Configuring Trusted Publishing](https://docs.npmjs.com/creating-and-viewing-access-tokens#configuring-trusted-publishing)
- [GitHub: About security hardening with OpenID Connect](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)

### Changesets

- [Changesets: GitHub Action](https://github.com/changesets/action)
- [Changesets Documentation](https://github.com/changesets/changesets)
