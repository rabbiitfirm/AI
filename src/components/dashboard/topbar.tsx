"use client";

import { Search, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Topbar({ title, showCreateButton, onCreateBoard }: { title: string; showCreateButton?: boolean; onCreateBoard?: () => void }) {
  return (
    <header className="flex items-center justify-between mb-8 text-foreground">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center gap-4">
        <Input placeholder="Search..." className="w-64" />
        {showCreateButton && <Button onClick={onCreateBoard}><Plus size={16} /> New Board</Button>}
      </div>
    </header>
  );
}
