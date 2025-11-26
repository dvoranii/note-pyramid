import * as S from "./PyramidBuilder.styled";
import { usePyramid } from "../../context/usePyramid";
import Pyramid from "../Pyramid/Pyramid";
import GenerateButton from "../GenerateButton/GenerateButton";
import { useNavigate } from "react-router-dom";
import { LevelSelector } from "../LevelSelector/LevelSelector";
import { useState } from "react";
import { SaveModal } from "../SaveModal/SaveModal";
import { SavedCompositions } from "../SavedCompositions/SavedCompositions";
import {
  saveComposition,
  getCompositions,
} from "../../utils/compositionStorage";
import type { SavedComposition } from "../../utils/compositionStorage";

const PyramidBuilder = () => {
  const { pyramidState, removeNoteFromLevel, canGenerate, loadPyramidState } =
    usePyramid();
  const navigate = useNavigate();
  const [analysisLevel, setAnalysisLevel] = useState<"beginner" | "expert">(
    "beginner"
  );

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isSavedCompositionsOpen, setIsSavedCompositionsOpen] = useState(false);
  const [savedCompositions, setSavedCompositions] = useState<
    SavedComposition[]
  >(() => getCompositions());

  const handleGenerate = () => {
    navigate("/analysis", {
      state: { analysisLevel },
    });
  };

  const handleSaveClick = () => {
    setIsSaveModalOpen(true);
  };

  const handleSaveComposition = (name: string) => {
    const newComposition = saveComposition(name, pyramidState);
    setSavedCompositions((prev) => [newComposition, ...prev]);
    setIsSaveModalOpen(false);
  };

  const handleLoadComposition = (composition: SavedComposition) => {
    loadPyramidState(composition.pyramidState);
    setIsSavedCompositionsOpen(false);
  };

  const handleDeleteComposition = (id: string) => {
    // Optimistic update - remove from UI immediately
    setSavedCompositions((prev) => prev.filter((comp) => comp.id !== id));
  };

  const handleClearAllCompositions = () => {
    setSavedCompositions([]);
  };

  const refreshCompositions = () => {
    setSavedCompositions(getCompositions());
  };

  const generateSuggestedName = (): string => {
    const topNotes = pyramidState.top
      .slice(0, 2)
      .map((n) => n.name)
      .join(" + ");
    const middleNotes = pyramidState.middle
      .slice(0, 2)
      .map((n) => n.name)
      .join(" + ");
    const baseNotes = pyramidState.base
      .slice(0, 2)
      .map((n) => n.name)
      .join(" + ");

    if (topNotes && middleNotes && baseNotes) {
      return `${topNotes} / ${middleNotes} / ${baseNotes}`;
    }
    return "My Fragrance Composition";
  };

  return (
    <>
      <S.PyramidBuilderContainer>
        <S.HeaderSection>
          <S.HeaderActions>
            <S.SaveNotesButton
              onClick={handleSaveClick}
              disabled={!canGenerate}
            >
              💾 Save Notes
            </S.SaveNotesButton>
            <S.SavedNotesButton
              onClick={() => setIsSavedCompositionsOpen(true)}
            >
              📚 Saved Notes
            </S.SavedNotesButton>
          </S.HeaderActions>
        </S.HeaderSection>
        <Pyramid
          pyramidState={pyramidState}
          onRemoveNote={removeNoteFromLevel}
        />
        <S.ControlSection>
          <S.ButtonGroup>
            <GenerateButton disabled={!canGenerate} onClick={handleGenerate} />
          </S.ButtonGroup>
          <LevelSelector
            analysisLevel={analysisLevel}
            onLevelChange={setAnalysisLevel}
          />
        </S.ControlSection>
      </S.PyramidBuilderContainer>
      <SaveModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveComposition}
        suggestedName={generateSuggestedName()}
      />
      <SavedCompositions
        isOpen={isSavedCompositionsOpen}
        onClose={() => setIsSavedCompositionsOpen(false)}
        onLoadComposition={handleLoadComposition}
        compositions={savedCompositions}
        onDeleteComposition={handleDeleteComposition}
        onClearAllCompositions={handleClearAllCompositions}
        onRefreshCompositions={refreshCompositions}
      />
    </>
  );
};

export default PyramidBuilder;
