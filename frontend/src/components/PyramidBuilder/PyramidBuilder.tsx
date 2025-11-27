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
  const {
    pyramidState,
    removeNoteFromLevel,
    canGenerate,
    loadPyramidState,
    clearPyramid,
  } = usePyramid();
  const navigate = useNavigate();
  const [analysisLevel, setAnalysisLevel] = useState<"beginner" | "expert">(
    "beginner"
  );

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isSavedCompositionsOpen, setIsSavedCompositionsOpen] = useState(false);
  const [savedCompositions, setSavedCompositions] = useState<
    SavedComposition[]
  >(() => getCompositions());

  const hasNotes =
    pyramidState.top.length > 0 ||
    pyramidState.middle.length > 0 ||
    pyramidState.base.length > 0;

  const handleGenerate = () => {
    navigate("/analysis", {
      state: { analysisLevel },
    });
  };

  const handleSaveClick = () => {
    setIsSaveModalOpen(true);
  };

  const handleClearPyramid = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all notes from the pyramid?"
      )
    ) {
      clearPyramid();
    }
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
    setSavedCompositions((prev) => prev.filter((comp) => comp.id !== id));
  };

  const handleClearAllCompositions = () => {
    setSavedCompositions([]);
  };

  const refreshCompositions = () => {
    setSavedCompositions(getCompositions());
  };

  return (
    <>
      <S.PyramidBuilderContainer>
        <S.HeaderSection>
          <S.HeaderActions>
            <S.SaveButtonsWrapper>
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
            </S.SaveButtonsWrapper>
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
          {hasNotes && (
            <S.ClearButton onClick={handleClearPyramid}>
              🗑️ Clear Notes
            </S.ClearButton>
          )}
        </S.ControlSection>
      </S.PyramidBuilderContainer>
      <SaveModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveComposition}
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
