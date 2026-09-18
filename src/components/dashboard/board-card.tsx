"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface Board {
  id: number;
  name: string;
  description: string | null;
  color: string | null;
  category: string | null;
  status: string | null;
}

export function BoardCard({ board }: { board: Board; onView: (b: Board) => void; onToggleStar: () => void }) {
  return (
    <div className="bg-card border border-border p-6 rounded-xl text-foreground">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: board.color || "#3B82F6" }}>
          {board.name.slice(0, 2).toUpperCase()}
        </div>
        <h3 className="font-bold">{board.name}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{board.description}</p>
      <Link href={`/board/${board.id}`}>
        <Button variant="outline" className="w-full">View Board <ArrowRight size={16} /></Button>
      </Link>
    </div>
  );
}
