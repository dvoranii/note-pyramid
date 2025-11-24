import { useDroppable } from "@dnd-kit/core";
import { X } from "lucide-react";
import type { Note } from "../../types";
import pyramidTopImg from "../../assets/top-340x289.png";
import pyramidMiddleImg from "../../assets/mid-606x222.png";
import pyramidBaseImg from "../../assets/base-875x221.png";
import {
  getPlaceholderCount,
  getGridColumns,
  getRowInfo,
  getGridWidth,
  getGridGap,
} from "../../utils/pyramidUtils";
import {
  LevelContainer,
  LevelBox,
  PyramidBackground,
  CombinedGrid,
  Slot,
  NoteContent,
  RemoveButton,
  NoteImageInSlot,
  LevelHeader,
} from "./PyramidLevel.styled";
import { getMaxNotesForLevel } from "../../utils/pyramidUtils";

interface PyramidLevelProps {
  level: "top" | "middle" | "base";
  label: string;
  notes: Note[];
  onRemoveNote: (level: "top" | "middle" | "base", noteId: string) => void;
}

const PyramidLevel = ({ level, notes, onRemoveNote }: PyramidLevelProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: level,
    data: { level },
  });

  const maxNotes = getMaxNotesForLevel(level);
  const isLevelFull = notes.length >= maxNotes;

  const getPyramidImage = (level: "top" | "middle" | "base") => {
    if (level === "top") return pyramidTopImg;
    if (level === "middle") return pyramidMiddleImg;
    return pyramidBaseImg;
  };

  const placeholderCount = getPlaceholderCount(level);
  const totalSlots = Math.max(notes.length, placeholderCount);
  const gridColumns = getGridColumns(level, totalSlots);
  const { hasMultipleRows, hasExtraColumn } = getRowInfo(level, totalSlots);
  const gridWidth = getGridWidth(level, hasMultipleRows);
  const gridGap = getGridGap(level, hasMultipleRows, totalSlots);

  return (
    <LevelContainer>
      <LevelHeader $isFull={isLevelFull}>
        {`${level.charAt(0).toUpperCase()}${level.slice(1)}: ${
          notes.length
        }/${maxNotes}`}
      </LevelHeader>
      <LevelBox
        ref={setNodeRef}
        $level={level}
        $isOver={isOver && !isLevelFull}
      >
        <PyramidBackground
          src={getPyramidImage(level)}
          alt={`${level} pyramid level`}
          $isOver={isOver}
        />

        <CombinedGrid
          $level={level}
          $columns={gridColumns}
          $totalItems={totalSlots}
          $hasNotes={notes.length > 0}
          $width={gridWidth}
          $gap={gridGap}
          $hasMultipleRows={hasMultipleRows}
          $hasExtraColumn={hasExtraColumn}
        >
          {Array.from({ length: totalSlots }).map((_, index) => {
            const note = notes[index];
            const isPlaceholder = !note && index < placeholderCount;

            return (
              <Slot
                key={note ? note.id : `slot-${index}`}
                $level={level}
                $hasNote={!!note}
                $isPlaceholder={isPlaceholder}
                $isEmpty={!note && index >= placeholderCount}
                $totalItems={totalSlots}
                $hasMultipleRows={hasMultipleRows}
              >
                {note && (
                  <NoteContent>
                    <RemoveButton onClick={() => onRemoveNote(level, note.id)}>
                      <X size={12} />
                    </RemoveButton>
                    <NoteImageInSlot
                      src={note.high_res_image}
                      alt={note.name}
                    />
                  </NoteContent>
                )}
              </Slot>
            );
          })}
        </CombinedGrid>
      </LevelBox>
    </LevelContainer>
  );
};

export default PyramidLevel;
