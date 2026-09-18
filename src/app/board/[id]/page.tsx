import { FeedbackBoard } from "@/components/feedback-board";
import { getBoards } from "@/app/actions/boards";

export default async function BoardPage({ params }: { params: { id: string } }) {
  const boards = await getBoards();
  const board = boards.find(b => b.id.toString() === params.id);
  if (!board) return <div>Not found</div>;
  return <FeedbackBoard boardId={board.id} boardName={board.name} />;
}
