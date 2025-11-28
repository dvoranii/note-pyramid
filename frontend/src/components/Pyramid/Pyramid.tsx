import PyramidLevel from "./PyramidLevel/PyramidLevel";
import type { PyramidState } from "../../types";
import { PyramidContainer, LevelWrapper } from "./Pyramid.styled";

interface PyramidProps {
  pyramidState: PyramidState;
  onRemoveNote: (level: "top" | "middle" | "base", noteId: string) => void;
  selectedLevel?: "top" | "middle" | "base" | null;
  pyramidMode?: "level-selection" | "level-navigation";
  highlightedPyramidNoteIndex?: number | null;
}

const Pyramid = ({
  pyramidState,
  onRemoveNote,
  selectedLevel,
  pyramidMode,
  highlightedPyramidNoteIndex,
}: PyramidProps) => {
  return (
    <PyramidContainer>
      <LevelWrapper $isSelected={selectedLevel === "top"}>
        <PyramidLevel
          level="top"
          label="Top"
          notes={pyramidState.top}
          onRemoveNote={onRemoveNote}
          pyramidMode={pyramidMode}
          highlightedNoteIndex={
            selectedLevel === "top" ? highlightedPyramidNoteIndex : null
          }
        />
      </LevelWrapper>

      <LevelWrapper $isSelected={selectedLevel === "middle"}>
        <PyramidLevel
          level="middle"
          label="Middle"
          notes={pyramidState.middle}
          onRemoveNote={onRemoveNote}
          pyramidMode={pyramidMode}
          highlightedNoteIndex={
            selectedLevel === "middle" ? highlightedPyramidNoteIndex : null
          }
        />
      </LevelWrapper>

      <LevelWrapper $isSelected={selectedLevel === "base"}>
        <PyramidLevel
          level="base"
          label="Base"
          notes={pyramidState.base}
          onRemoveNote={onRemoveNote}
          pyramidMode={pyramidMode} // NEW
          highlightedNoteIndex={
            selectedLevel === "base" ? highlightedPyramidNoteIndex : null
          }
        />
      </LevelWrapper>
    </PyramidContainer>
  );
};

export default Pyramid;
