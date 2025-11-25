import { useState } from "react";
import type { PyramidState, Note } from "../types";

export const usePyramidState = () => {
  const [pyramidState, setPyramidState] = useState<PyramidState>({
    top: [],
    middle: [],
    base: [],
  });

  const addNoteToLevel = (level: keyof PyramidState, note: Note) => {
    setPyramidState((prev) => ({
      ...prev,
      [level]: [...prev[level], note],
    }));
  };

  const removeNoteFromLevel = (level: keyof PyramidState, noteId: string) => {
    setPyramidState((prev) => ({
      ...prev,
      [level]: prev[level].filter((note) => note.id !== noteId),
    }));
  };

  const canGenerate =
    pyramidState.top.length > 0 &&
    pyramidState.middle.length > 0 &&
    pyramidState.base.length > 0;

  return {
    pyramidState,
    addNoteToLevel,
    removeNoteFromLevel,
    canGenerate,
  };
};
