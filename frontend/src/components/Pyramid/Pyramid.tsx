import PyramidLevel from "./PyramidLevel/PyramidLevel";
import type { PyramidState } from "../../types";
import { PyramidContainer, LevelWrapper } from "./Pyramid.styled";

interface PyramidProps {
  pyramidState: PyramidState;
  onRemoveNote: (level: "top" | "middle" | "base", noteId: string) => void;
}

const Pyramid = ({ pyramidState, onRemoveNote }: PyramidProps) => {
  return (
    <PyramidContainer>
      <LevelWrapper>
        <PyramidLevel
          level="top"
          label="Top"
          notes={pyramidState.top}
          onRemoveNote={onRemoveNote}
        />
      </LevelWrapper>

      <LevelWrapper>
        <PyramidLevel
          level="middle"
          label="Middle"
          notes={pyramidState.middle}
          onRemoveNote={onRemoveNote}
        />
      </LevelWrapper>

      <LevelWrapper>
        <PyramidLevel
          level="base"
          label="Base"
          notes={pyramidState.base}
          onRemoveNote={onRemoveNote}
        />
      </LevelWrapper>
    </PyramidContainer>
  );
};

export default Pyramid;
