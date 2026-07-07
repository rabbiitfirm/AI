## 2025-05-15 - Async Submission Feedback
**Learning:** Providing immediate visual feedback (loading spinner) and disabling form inputs during async operations prevents double-submissions and improves perceived performance.
**Action:** Always implement `isSubmitting` state and await the `onSubmit` prop in form components.

## 2025-05-15 - Accessibility in Icon-only Buttons
**Learning:** Icon-only buttons (like modal close buttons) are invisible to screen readers without an `aria-label`.
**Action:** Ensure all icon-only buttons have descriptive `aria-label` or `sr-only` text.
