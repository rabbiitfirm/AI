## 2025-09-30 - Form Modals Accessible Controls & Loading Feedback

**Learning:** Unlabeled form controls in custom modal components break screen readers and lack visual loading feedback for asynchronous operations. Using `useId()` for semantic label associations, `role="radiogroup"` / `role="radio"` for option pill buttons, and explicit `isSubmitting` states creates a predictable micro-UX.

**Action:** Always link form controls with `useId()`, add explicit ARIA attributes to custom interactive groupings, and disable inputs with loading spinners during form submission.
