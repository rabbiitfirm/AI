## 2025-05-18 - Tailwind v4 Theme Variables & Modal ARIA Accessibility

**Learning:** Tailwind CSS v4 `@theme inline` requires explicit CSS variable mappings for utility classes (like `bg-primary`). Unmapped utilities render transparent backgrounds. Furthermore, custom inline modal forms often miss dialog ARIA roles, associated form labels, and radio group semantics.

**Action:** Use explicit color utilities (e.g. `bg-slate-900`) when custom variables are not mapped in `@theme inline`. Always link labels to inputs with `useId()`, add `role="dialog"`, `aria-modal="true"`, `role="radiogroup"`, `role="radio"`, and `isSubmitting` spinner feedback.
