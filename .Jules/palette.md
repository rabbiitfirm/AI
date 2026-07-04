## 2026-07-04 - [Button Accessibility]
**Learning:** Icon-only buttons or buttons with numeric data often lack context for screen readers. Using `aria-label` provides the necessary description, and `aria-pressed` communicates the toggle state. Focus states are also critical for keyboard-only users.
**Action:** Always include `aria-label` and `aria-pressed` on interactive elements that serve as toggles or actions without clear text labels. Use `focus-visible` to provide clear visual feedback during keyboard navigation.
