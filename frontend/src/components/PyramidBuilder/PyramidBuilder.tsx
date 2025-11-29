import * as S from "./PyramidBuilder.styled";
import { usePyramid } from "../../context/PyramidContext/usePyramid";
import Pyramid from "../Pyramid/Pyramid";
import GenerateButton from "../GenerateButton/GenerateButton";
import { useNavigate } from "react-router-dom";
import { LevelSelector } from "../LevelSelector/LevelSelector";
import { useMemo, useState } from "react";
import { SaveModal } from "../SaveModal/SaveModal";
import { SavedCompositions } from "../SavedCompositions/SavedCompositions";
import {
  saveComposition,
  getCompositions,
  updateComposition,
} from "../../utils/compositionStorage";
import type { SavedComposition } from "../../utils/compositionStorage";
import { useKeyboardNavigation } from "../../context/KeyboardNavigationContext/useKeyboardNavigation";

const PyramidBuilder = () => {
  const {
    pyramidState,
    removeNoteFromLevel,
    canGenerate,
    loadPyramidState,
    clearPyramid,
  } = usePyramid();
  const navigate = useNavigate();
  const {
    selectedLevel,
    pyramidMode,
    // highlightedPyramidNoteIndex,
    highlightedPyramidNoteIndices,
  } = useKeyboardNavigation();

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isSavedCompositionsOpen, setIsSavedCompositionsOpen] = useState(false);
  const [savedCompositions, setSavedCompositions] = useState<
    SavedComposition[]
  >(() => getCompositions());
  const [analysisLevel, setAnalysisLevel] = useState<"beginner" | "expert">(
    "beginner"
  );
  const [currentCompositionId, setCurrentCompositionId] = useState<
    string | null
  >(null);
  const [currentCompositionName, setCurrentCompositionName] =
    useState<string>("");

  const hasUnsavedChanges = useMemo(() => {
    if (!currentCompositionId) return true;

    const loadedComposition = savedCompositions.find(
      (c) => c.id === currentCompositionId
    );
    if (!loadedComposition) return true;

    return (
      JSON.stringify(pyramidState) !==
      JSON.stringify(loadedComposition.pyramidState)
    );
  }, [pyramidState, currentCompositionId, savedCompositions]);

  const handleLoadComposition = (composition: SavedComposition) => {
    loadPyramidState(composition.pyramidState);
    setCurrentCompositionId(composition.id);
    setCurrentCompositionName(composition.name);
    setIsSavedCompositionsOpen(false);
  };

  const handleSaveComposition = (name: string, saveMode: "update" | "new") => {
    if (saveMode === "update" && currentCompositionId) {
      // Update existing composition
      const updated = updateComposition(currentCompositionId, {
        name,
        pyramidState,
      });
      if (updated) {
        setSavedCompositions((prev) =>
          prev.map((comp) =>
            comp.id === currentCompositionId ? updated : comp
          )
        );
        setCurrentCompositionName(name); // Update current name
      }
    } else {
      // Create new composition
      const newComposition = saveComposition(name, pyramidState);
      setSavedCompositions((prev) => [newComposition, ...prev]);
      setCurrentCompositionId(newComposition.id);
      setCurrentCompositionName(newComposition.name);
    }
    setIsSaveModalOpen(false);
  };

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
      setCurrentCompositionId(null);
      setCurrentCompositionName("");
    }
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
          selectedLevel={selectedLevel}
          pyramidMode={pyramidMode}
          // highlightedPyramidNoteIndex={highlightedPyramidNoteIndex}
          highlightedPyramidNoteIndices={highlightedPyramidNoteIndices}
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
        key={currentCompositionId || "new"}
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveComposition}
        currentComposition={
          currentCompositionId
            ? {
                id: currentCompositionId,
                name: currentCompositionName,
                hasUnsavedChanges,
              }
            : null
        }
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
