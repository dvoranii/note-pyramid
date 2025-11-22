import * as S from "./App.styled";
import type { PyramidState, Note } from "./types";
import { useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import Pyramid from "./components/Pyramid/Pyramid";
import Sidebar from "./components/Sidebar/Sidebar";
import GenerateButton from "./components/GenerateButton/GenerateButton";

function App() {
  const [pyramidState, setPyramidState] = useState<PyramidState>({
    top: [],
    middle: [],
    base: [],
  });

  const [activeNote, setActiveNote] = useState<Note | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const note = event.active.data.current?.note as Note;
    setActiveNote(note);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveNote(null);

    if (!over) return;

    const note = active.data.current?.note as Note;
    const targetLevel = over.data.current?.level as "top" | "middle" | "base";

    if (targetLevel && note) {
      const noteExists = pyramidState[targetLevel].some(
        (existingNote) => existingNote.id === note.id
      );

      if (noteExists) {
        console.log(`Note ${note.name} already exists in ${targetLevel}`);
        return;
      }
      setPyramidState((prev) => ({
        ...prev,
        [targetLevel]: [...prev[targetLevel], note],
      }));
    }
  };

  const handleRemoveNote = (
    level: "top" | "middle" | "base",
    noteId: string
  ) => {
    setPyramidState((prev) => ({
      ...prev,
      [level]: prev[level].filter((note) => note.id !== noteId),
    }));
  };

  const canGenerate =
    pyramidState.top.length > 0 &&
    pyramidState.middle.length > 0 &&
    pyramidState.base.length > 0;

  const handleGenerate = () => {
    console.log("Generating analysis for: ", pyramidState);
  };
  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <S.AppContainer>
        <Sidebar />
        <S.MainContent>
          <Pyramid
            pyramidState={pyramidState}
            onRemoveNote={handleRemoveNote}
          />

          <GenerateButton disabled={!canGenerate} onClick={handleGenerate} />
        </S.MainContent>
        <DragOverlay>
          {activeNote && (
            <S.DragOverlayCard>
              <img src={activeNote.high_res_image} alt={activeNote.name} />
              <p>{activeNote.name}</p>
            </S.DragOverlayCard>
          )}
        </DragOverlay>
      </S.AppContainer>
    </DndContext>
  );
}

export default App;
