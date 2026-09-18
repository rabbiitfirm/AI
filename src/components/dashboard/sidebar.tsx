"use client";

import { useState } from "react";
import { LayoutDashboard, Columns, BarChart, Settings, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type NavItem = "overview" | "boards" | "analytics" | "settings";

interface SidebarProps {
  activeNav: NavItem;
  onNavChange: (nav: NavItem) => void;
}

const navItems = [
  { id: "overview" as NavItem, label: "Overview", icon: LayoutDashboard },
  { id: "boards" as NavItem, label: "Boards", icon: Columns, badge: 6 },
  { id: "analytics" as NavItem, label: "Analytics", icon: BarChart },
  { id: "settings" as NavItem, label: "Settings", icon: Settings },
];

export function Sidebar({ activeNav, onNavChange }: SidebarProps) {
  return (
    <aside className="w-60 border-r border-border bg-sidebar h-screen flex flex-col p-4 text-white">
      <div className="flex items-center gap-2 mb-8">
        <Zap className="text-primary" />
        <span className="font-bold">FeedbackPulse</span>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 p-2 rounded-lg text-sm font-medium",
              activeNav === item.id ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted"
            )}
          >
            <item.icon size={18} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && <Badge variant="secondary">{item.badge}</Badge>}
          </button>
        ))}
      </nav>
    </aside>
  );
}
