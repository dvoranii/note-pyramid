import { useState } from "react";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import type { Note, PyramidState } from "../types";
import { canAddNoteToLevel } from "../utils/pyramidUtils";

export const useDragAndDrop = (
  onAddNote: (level: keyof PyramidState, note: Note) => void
) => {
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const note = event.active.data.current?.note as Note;
    setActiveNote(note);
  };

  const handleDragEnd = (event: DragEndEvent, pyramidState: PyramidState) => {
    const { active, over } = event;
    setActiveNote(null);

    if (!over) return;

    const note = active.data.current?.note as Note;
    const targetLevel = over.data.current?.level as keyof PyramidState;

    if (targetLevel && note) {
      // Check if note already exists in target level
      const noteExists = pyramidState[targetLevel].some(
        (existingNote) => existingNote.id === note.id
      );

      if (noteExists) {
        console.log(`Note ${note.name} already exists in ${targetLevel}`);
        return;
      }

      // Check level capacity
      const currentLevelNotes = pyramidState[targetLevel];
      if (!canAddNoteToLevel(targetLevel, currentLevelNotes)) {
        console.log(
          `Cannot add more notes to ${targetLevel} level - maximum reached`
        );
        return;
      }

      onAddNote(targetLevel, note);
    }
  };

  return {
    activeNote,
    handleDragStart,
    handleDragEnd,
  };
};
