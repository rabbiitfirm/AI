import { MessageSquare, Columns, Clock, TrendingUp } from "lucide-react";

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-card border border-border p-4 rounded-xl text-foreground">
        <div className="text-muted-foreground text-sm">Total Feedback</div>
        <div className="text-2xl font-bold">1,284</div>
      </div>
      <div className="bg-card border border-border p-4 rounded-xl text-foreground">
        <div className="text-muted-foreground text-sm">Active Boards</div>
        <div className="text-2xl font-bold">6</div>
      </div>
    </div>
  );
}
