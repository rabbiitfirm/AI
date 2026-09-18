"use client";

import { Status, STATUS_CONFIG, FeedbackItem } from "@/lib/feedback-data";

export function StatusFilter({ selected, onChange, items }: { selected: Status | "All"; onChange: (s: any) => void; items: FeedbackItem[] }) {
  const statuses: (Status | "All")[] = ["All", "Under Review", "Planned", "In Progress", "Completed"];
  return (
    <nav className="space-y-1 text-foreground">
      <p className="text-xs font-bold uppercase text-muted-foreground mb-4 px-2">Filter by Status</p>
      {statuses.map(s => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`w-full flex items-center justify-between p-2 rounded-lg text-sm font-medium transition-all ${
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
