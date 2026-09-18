"use client";

import { useState, useEffect } from "react";
import { Sidebar, type NavItem } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { BoardCard, type Board } from "@/components/dashboard/board-card";
import { CreateBoardModal } from "@/components/dashboard/create-board-modal";
import { AnalyticsView } from "@/components/dashboard/analytics-view";
import { SettingsView } from "@/components/dashboard/settings-view";
import { getBoards, createBoard } from "@/app/actions/boards";

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState<NavItem>("overview");
  const [boards, setBoards] = useState<Board[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    async function loadBoards() {
      const data = await getBoards();
      setBoards(data as Board[]);
    }
    loadBoards();
  }, []);

  const handleCreateBoard = async (data: any) => {
    await createBoard(data);
    const updated = await getBoards();
    setBoards(updated as Board[]);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
      <main className="flex-1 overflow-y-auto p-8">
        <Topbar title={activeNav.toUpperCase()} showCreateButton={activeNav === "boards"} onCreateBoard={() => setIsCreateModalOpen(true)} />
        {activeNav === "overview" && <StatsCards />}
        {activeNav === "boards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.map(b => <BoardCard key={b.id} board={b} onView={() => {}} onToggleStar={() => {}} />)}
          </div>
        )}
        {activeNav === "analytics" && <AnalyticsView />}
        {activeNav === "settings" && <SettingsView />}
      </main>
      <CreateBoardModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} onCreateBoard={handleCreateBoard} />
    </div>
  );
}
