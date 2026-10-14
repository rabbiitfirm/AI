"use client";

import { useId } from "react";
import { Status, FeedbackItem } from "@/lib/feedback-data";

export function StatusFilter({
  selected,
  onChange,
  items,
}: {
  selected: Status | "All";
  onChange: (s: Status | "All") => void;
  items: FeedbackItem[];
}) {
  const labelId = useId();
  const statuses: (Status | "All")[] = ["All", "Under Review", "Planned", "In Progress", "Completed"];

  return (
    <nav className="space-y-1 text-foreground" aria-labelledby={labelId}>
      <p id={labelId} className="text-xs font-bold uppercase text-muted-foreground mb-4 px-2">
        Filter by Status
      </p>
      <div role="radiogroup" aria-labelledby={labelId} className="space-y-1">
        {statuses.map((s) => {
          const count = s === "All" ? items.length : items.filter((i) => i.status === s).length;
          const isSelected = selected === s;

          return (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(s)}
              className={`w-full flex items-center justify-between p-2 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 ${
                isSelected ? "bg-slate-900 text-white" : "hover:bg-muted text-foreground"
              }`}
            >
              <span>{s}</span>
              <span className="text-xs opacity-60" aria-label={`${count} items`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
