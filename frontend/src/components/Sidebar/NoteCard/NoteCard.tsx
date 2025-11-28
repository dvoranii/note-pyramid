import { useDraggable } from "@dnd-kit/core";
import type { Note } from "../../../types";
import { Card, NoteImage, NoteName } from "./NoteCard.styled";
import { useKeyboardNavigation } from "../../../context/KeyboardNavigationContext/useKeyboardNavigation";

interface NoteCardProps {
  note: Note;
  index: number;
}

const NoteCard = ({ note, index }: NoteCardProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: note.id,
    data: { note },
  });

  const { sidebarMode, highlightedSidebarNoteIndex } = useKeyboardNavigation();
  const isHighlighted =
    sidebarMode === "note-selection" && highlightedSidebarNoteIndex === index;

  return (
    <Card
      ref={setNodeRef}
      $isDragging={isDragging}
      $isHighlighted={isHighlighted}
      {...listeners}
      {...attributes}
      data-note-card="true"
      data-note-id={note.id}
      data-note-name={note.name}
      data-note-image={note.image}
      data-note-high-res-image={note.high_res_image}
      data-note-category={note.category}
    >
      <NoteImage src={note.high_res_image} alt={note.name} draggable={false} />
      <NoteName>{note.name}</NoteName>
    </Card>
  );
};

export default NoteCard;
