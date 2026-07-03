## 2025-05-15 - [ARIA Labels and Loading States]
**Learning:** Adding ARIA labels to icon-only buttons and `isSubmitting` states to forms significantly improves accessibility and user feedback with minimal code changes.
**Action:** Always check for missing `aria-label` on buttons with only icons and implement loading states for asynchronous form submissions.

## 2025-05-15 - [PR Scope and Artifacts]
**Learning:** UX tasks should be surgical and under 50 lines. Large refactors can be seen as "noise". Never commit local logs or massive lockfile changes in a micro-UX PR.
**Action:** Use surgical `replace_with_git_merge_diff` instead of overwriting files when possible, and ensure `dev_server.log` or lockfiles are not staged for commit.
