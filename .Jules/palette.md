## 2025-05-18 - Accessible Modal Forms and Loading Feedback

**Learning:** Modal feedback forms often lack semantic field linkage and clear submission feedback for assistive technologies. Adding explicit `<label>` tags with `useId()`, `role="radiogroup"`/`role="radio"` with `aria-checked` attributes for custom pill options, and keeping `isSubmitting` persistent until the async `onSubmit` promise resolves significantly improves accessibility and prevents duplicate submissions.

**Action:** Always link form inputs to labels with React's `useId()`, mark non-native radio buttons with proper ARIA roles, and await submission promises before updating modal state.
