import { useDroppable } from "@dnd-kit/core";
import { X } from "lucide-react";
import type { Note } from "../../types";
import {
  LevelContainer,
  LevelLabel,
  LevelBox,
  SlotsGrid,
  Slot,
  NoteContent,
  RemoveButton,
  NoteImageInSlot,
} from "./PyramidLevel.styled";

interface PyramidLevelProps {
  level: "top" | "middle" | "base";
  label: string;
  notes: Note[];
  onRemoveNote: (level: "top" | "middle" | "base", noteId: string) => void;
  maxSlots: number;
}

const PyramidLevel = ({
  level,
  label,
  notes,
  onRemoveNote,
  maxSlots,
}: PyramidLevelProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: level,
    data: { level },
  });

  const slots = Array.from({ length: maxSlots }, (_, i) => notes[i] || null);

  return (
    <LevelContainer>
      <LevelLabel>{label}</LevelLabel>
      <LevelBox ref={setNodeRef} $level={level} $isOver={isOver}>
        <SlotsGrid $level={level}>
          {slots.map((note, index) => (
            <Slot key={`${level}-slot-${index}`} $hasNote={!!note}>
              {note && (
                <NoteContent>
                  <RemoveButton onClick={() => onRemoveNote(level, note.id)}>
                    <X size={12} />
                  </RemoveButton>
                  <NoteImageInSlot src={note.high_res_image} alt={note.name} />
                </NoteContent>
              )}
            </Slot>
          ))}
        </SlotsGrid>
      </LevelBox>
    </LevelContainer>
  );
};

export default PyramidLevel;
