## 2026-09-27 - Accessible Dialog Form Modal Pattern
**Learning:** Raw custom modal overlays in this project lack key accessibility features (focus trapping, ESC key handlers, screen-reader close text, and explicit `useId` field labels).
**Action:** Always wrap form modals in `@/components/ui/dialog` primitives with `useId`-linked `Label` components and `role="radiogroup"` / `role="radio"` attributes for option pills.
