## 2025-10-02 - Form Modal Async Submissions and Accessible Control Groups
**Learning:** In form modals with async submission handlers, awaiting the parent `onSubmit` callback within a try/finally block before closing ensures `isSubmitting` visual feedback persists until completion and prevents double submissions. Linking form controls with `useId` and adding explicit `role="radiogroup"` / `role="radio"` attributes guarantees proper screen reader announcements.
**Action:** Always wrap form submission callbacks in an async handler with `isSubmitting` loading states, link `Label` elements using `useId`, and apply explicit ARIA radio roles to single-select option button groups.

## 2026-10-06 - Upvote Button Accessibility and Toggle State Signaling
**Learning:** Upvote buttons with icon-only or numerical children need `aria-label` identifying the target item, `aria-pressed` signaling the active toggle state, and explicit focus-visible ring styles so keyboard users and screen readers can identify and interact with vote controls.
**Action:** Always include `aria-label`, `aria-pressed`, `type="button"`, and `focus-visible` ring utilities on interactive card voting buttons.
