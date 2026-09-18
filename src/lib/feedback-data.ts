export type Status = "Under Review" | "Planned" | "In Progress" | "Completed";
export type Category = "Feature" | "Bug" | "UX" | "Performance";

export interface FeedbackItem {
  id: number;
  boardId: number;
  title: string;
  description: string;
  category: Category;
  status: Status;
  upvotes: number;
  upvotedByUser?: boolean;
  createdAt: string;
}

export const STATUS_CONFIG: Record<
  Status,
  { label: string; color: string; bg: string; dot: string }
> = {
  "Under Review": {
    label: "Under Review",
    color: "text-amber-700",
    bg: "bg-amber-50",
    dot: "bg-amber-400",
  },
  Planned: {
    label: "Planned",
    color: "text-violet-700",
    bg: "bg-violet-50",
    dot: "bg-violet-400",
  },
  "In Progress": {
    label: "In Progress",
    color: "text-blue-700",
    bg: "bg-blue-50",
    dot: "bg-blue-400",
  },
  Completed: {
    label: "Completed",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    dot: "bg-emerald-400",
  },
};

export const CATEGORY_CONFIG: Record<
  Category,
  { color: string; bg: string }
> = {
  Feature: { color: "text-blue-700", bg: "bg-blue-50" },
  Bug: { color: "text-red-600", bg: "bg-red-50" },
  UX: { color: "text-violet-700", bg: "bg-violet-50" },
  Performance: { color: "text-amber-700", bg: "bg-amber-50" },
};
