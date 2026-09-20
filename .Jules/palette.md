## 2025-05-18 - Accessible Modal Form and Micro-Interactions

**Learning:** When using custom pill button groups as radio selections in modal forms, standard `<button>` elements lack accessible context for screen readers unless wrapped in `role="radiogroup"` with explicit `aria-checked` states. Additionally, forms without loading states during async submissions lead to double-submissions and poor perceived performance.
**Action:** Always label form fields using `useId()` linked labels, mark pill button selectors as `role="radiogroup"` / `role="radio"`, and manage an `isSubmitting` state to show loading feedback and disable inputs.
