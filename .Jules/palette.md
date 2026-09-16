## 2026-09-16 - Custom Status Filter Accessibility

**Learning:** Navigation or filter buttons acting as radio controls (where only one option is active at a time) need explicit ARIA semantic roles (`role="radiogroup"` on the wrapper and `role="radio"` with `aria-checked` on each item) and visible focus rings (`focus-visible:ring-2`) to provide a clear and accessible experience for screen reader and keyboard users.

**Action:** When implementing custom visual button groups or status filters, always include `role="radiogroup"`, `role="radio"`, `aria-checked`, and focus-visible Tailwind utilities to ensure accessibility without breaking tight diff budget constraints.
