import { useEffect, useState } from "react";
import type { PyramidState, Note } from "../types";

const PYRAMID_STORAGE_KEY = "pyramid-current-work";

export const usePyramidState = () => {
  const [pyramidState, setPyramidState] = useState<PyramidState>(() => {
    if (typeof window === "undefined") {
      return { top: [], middle: [], base: [] };
    }

    const saved = localStorage.getItem(PYRAMID_STORAGE_KEY);
    return saved ? JSON.parse(saved) : { top: [], middle: [], base: [] };
  });

  useEffect(() => {
    localStorage.setItem(PYRAMID_STORAGE_KEY, JSON.stringify(pyramidState));
  }, [pyramidState]);

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

  const clearPyramid = () => {
    setPyramidState({
      top: [],
      middle: [],
      base: [],
    });

    localStorage.removeItem(PYRAMID_STORAGE_KEY);
  };

  const loadPyramidState = (newState: PyramidState) => {
    setPyramidState(newState);
  };

  const canGenerate =
    pyramidState.top.length > 0 &&
    pyramidState.middle.length > 0 &&
    pyramidState.base.length > 0;

  return {
    pyramidState,
    addNoteToLevel,
    removeNoteFromLevel,
    clearPyramid,
    loadPyramidState,
    canGenerate,
  };
};
