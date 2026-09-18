"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function CreateBoardModal({ open, onOpenChange, onCreateBoard }: { open: boolean, onOpenChange: (o: boolean) => void, onCreateBoard: (d: any) => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateBoard({ name, description });
    setName("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card text-foreground">
        <DialogHeader>
          <DialogTitle>Create New Board</DialogTitle>
          <DialogDescription>Add a new feedback board.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="board-name">Board Name</Label>
            <Input id="board-name" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="board-desc">Description</Label>
            <Textarea id="board-desc" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <Button type="submit" className="w-full text-white">Create Board</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
