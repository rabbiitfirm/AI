## 2025-05-14 - [Async Feedback in Modals]
**Learning:** [When implementing `isSubmitting` in a modal that receives an `onSubmit` prop, it's critical to `await` the parent's submission before closing the modal. This ensures the loading state is actually visible to the user for the duration of the network request.]
**Action:** [Always ensure `onSubmit` handlers in UI components are async and properly await parent callbacks before triggering closure or success states.]

## 2025-05-14 - [Surgical vs Component Refactors]
**Learning:** [In a constrained environment with strict line limits and dependency rules, surgical UX enhancements (adding ARIA labels, loading states) are safer and more likely to be accepted than complete component refactors that might pull in missing library files or complex dependencies.]
**Action:** [Prioritize micro-enhancements over full-component rewrites unless the component is very small and the refactor is well-contained.]
