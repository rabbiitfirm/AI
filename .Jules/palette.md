## 2025-05-23 - [Dialog Refactoring and Accessibility]
**Learning:** Refactoring custom modals to Radix UI's `Dialog` primitive significantly improves accessibility (focus trap, ARIA roles, etc.) and consistency with the design system, but can quickly exceed the 50-line micro-UX limit.
**Action:** For larger components, prioritize surgical accessibility fixes (adding ARIA labels, `htmlFor`) first. If a full refactor is needed, keep the internal form logic as lean as possible to stay within the line limit.
