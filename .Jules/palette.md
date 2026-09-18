## 2025-05-18 - Tailwind v4 Color Utility Fallbacks in Component Selection States
**Learning:** In Tailwind CSS v4, unmapped custom theme utility classes like `bg-primary` can resolve to transparent or unstyled properties if not configured in `@theme inline`, causing white text on active selection pills to disappear visually.
**Action:** Use concrete color fallbacks (such as `bg-neutral-900 text-white`) or explicitly configured theme variables to ensure high visual contrast and active state readability.
