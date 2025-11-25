import * as S from "./PyramidBuilder.styled";
import { usePyramid } from "../../context/usePyramid";
import Pyramid from "../Pyramid/Pyramid";
import GenerateButton from "../GenerateButton/GenerateButton";
import { useNavigate } from "react-router-dom";

const PyramidBuilder = () => {
  const { pyramidState, removeNoteFromLevel, canGenerate } = usePyramid();
  const navigate = useNavigate();

  const handleGenerate = () => {
    navigate("/analysis");
  };

  return (
    <S.PyramidBuilderContainer>
      <Pyramid pyramidState={pyramidState} onRemoveNote={removeNoteFromLevel} />
      <GenerateButton disabled={!canGenerate} onClick={handleGenerate} />
    </S.PyramidBuilderContainer>
  );
};

export default PyramidBuilder;
