## 2025-09-21 - Undefined Tailwind Theme Colors Fallback
**Learning:** In Tailwind CSS v4 setups where custom CSS variables like `--color-primary` are missing from `@theme inline`, utility classes like `bg-primary` compute to transparent backgrounds, causing white text (`text-white`) to become invisible on light modal backgrounds.
**Action:** Verify rendered contrast in screenshots when using theme variable utilities and fall back to explicit high-contrast color classes (e.g. `bg-slate-900`) if theme variables are unmapped.
