## 2025-05-15 - Improving Feedback Loop and Accessibility in Form Modals

**Learning:** Adding a loading state (`isSubmitting`) and proper form labels provides immediate value in terms of accessibility and user confidence during async operations. Keeping these changes surgical (avoiding complete refactors to new library components) helps maintain a small diff footprint while delivering high UX impact.

**Action:** Always implement `isSubmitting` for async form handlers and ensure `label` elements are correctly associated with their inputs using `htmlFor` and `id`. Use ARIA roles like `radiogroup` for custom UI patterns like button groups.
