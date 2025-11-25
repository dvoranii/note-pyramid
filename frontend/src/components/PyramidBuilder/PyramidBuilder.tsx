import * as S from "./PyramidBuilder.styled";
import { usePyramid } from "../../context/usePyramid";
import Pyramid from "../Pyramid/Pyramid";
import GenerateButton from "../GenerateButton/GenerateButton";
import { useNavigate } from "react-router-dom";
import { LevelSelector } from "../LevelSelector/LevelSelector";
import { useState } from "react";

const PyramidBuilder = () => {
  const { pyramidState, removeNoteFromLevel, canGenerate } = usePyramid();
  const navigate = useNavigate();
  const [analysisLevel, setAnalysisLevel] = useState<"beginner" | "expert">(
    "beginner"
  );

  const handleGenerate = () => {
    navigate("/analysis", {
      state: { analysisLevel },
    });
  };

  return (
    <S.PyramidBuilderContainer>
      <Pyramid pyramidState={pyramidState} onRemoveNote={removeNoteFromLevel} />
      <S.ControlSection>
        <LevelSelector
          analysisLevel={analysisLevel}
          onLevelChange={setAnalysisLevel}
        />

        <S.ButtonGroup>
          <GenerateButton disabled={!canGenerate} onClick={handleGenerate} />
        </S.ButtonGroup>
      </S.ControlSection>
    </S.PyramidBuilderContainer>
  );
};

export default PyramidBuilder;
