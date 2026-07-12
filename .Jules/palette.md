## 2025-05-14 - Button Groups as Radio Groups
**Learning:** For custom UI patterns like button groups acting as radio groups, adding `role="radiogroup"` and `role="radio"` with `aria-checked` ensures accessibility for screen readers without needing heavy dependencies or complex refactors.
**Action:** Always apply these ARIA roles and attributes when implementing or refactoring selection patterns that don't use native radio inputs.
