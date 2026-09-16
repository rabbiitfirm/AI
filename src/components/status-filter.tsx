"use client";

import { Status, FeedbackItem } from "@/lib/feedback-data";

export function StatusFilter({ selected, onChange, items }: { selected: Status | "All"; onChange: (s: Status | "All") => void; items: FeedbackItem[] }) {
  const statuses: (Status | "All")[] = ["All", "Under Review", "Planned", "In Progress", "Completed"];
  return (
    <nav className="space-y-1 text-foreground" role="radiogroup" aria-label="Filter by Status">
      <p className="text-xs font-bold uppercase text-muted-foreground mb-4 px-2">Filter by Status</p>
      {statuses.map(s => (
        <button
          key={s}
          type="button"
          role="radio"
          aria-checked={selected === s}
          onClick={() => onChange(s)}
          className={`w-full flex items-center justify-between p-2 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
            selected === s ? "bg-primary text-white" : "hover:bg-muted"
          }`}
        >
          <span>{s}</span>
          <span className="text-xs opacity-60">{s === "All" ? items.length : items.filter(i => i.status === s).length}</span>
        </button>
      ))}
    </nav>
  );
}
