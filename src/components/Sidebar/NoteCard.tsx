import { useDraggable } from "@dnd-kit/core";
import type { Note } from "../../types";
import { Card, NoteImage, NoteName } from "./NoteCard.styled";

interface NoteCardProps {
  note: Note;
}

const NoteCard = ({ note }: NoteCardProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: note.id,
    data: { note },
  });

  return (
    <Card
      ref={setNodeRef}
      $isDragging={isDragging}
      {...listeners}
      {...attributes}
    >
      <NoteImage src={note.high_res_image} alt={note.name} draggable={false} />
      <NoteName>{note.name}</NoteName>
    </Card>
  );
};

export default NoteCard;
