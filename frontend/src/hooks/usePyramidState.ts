import { useEffect, useState } from "react";
import type { PyramidState, Note } from "../types";

const PYRAMID_STORAGE_KEY = "pyramid-current-work";

interface PersistedPyramidState {
  pyramidState: PyramidState;
  currentCompositionId: string | null;
  currentCompositionName: string;
}

export const usePyramidState = () => {
  const [state, setState] = useState<PersistedPyramidState>(() => {
    if (typeof window === "undefined") {
      return {
        pyramidState: { top: [], middle: [], base: [] },
        currentCompositionId: null,
        currentCompositionName: "",
      };
    }

    const saved = localStorage.getItem(PYRAMID_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }

    return {
      pyramidState: { top: [], middle: [], base: [] },
      currentCompositionId: null,
      currentCompositionName: "",
    };
  });

  useEffect(() => {
    localStorage.setItem(PYRAMID_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addNoteToLevel = (level: keyof PyramidState, note: Note) => {
    setState((prev) => ({
      ...prev,
      pyramidState: {
        ...prev.pyramidState,
        [level]: [...prev.pyramidState[level], note],
      },
    }));
  };

  const removeNoteFromLevel = (level: keyof PyramidState, noteId: string) => {
    setState((prev) => ({
      ...prev,
      pyramidState: {
        ...prev.pyramidState,
        [level]: prev.pyramidState[level].filter((note) => note.id !== noteId),
      },
    }));
  };

  const clearPyramid = () => {
    setState({
      pyramidState: { top: [], middle: [], base: [] },
      currentCompositionId: null,
      currentCompositionName: "",
    });
    localStorage.removeItem(PYRAMID_STORAGE_KEY);
  };

  const loadPyramidState = (
    newState: PyramidState,
    compositionId?: string,
    compositionName?: string
  ) => {
    setState((prev) => ({
      ...prev,
      pyramidState: newState,
      currentCompositionId: compositionId || null,
      currentCompositionName: compositionName || "",
    }));
  };

  const setCurrentComposition = (id: string | null, name: string = "") => {
    setState((prev) => ({
      ...prev,
      currentCompositionId: id,
      currentCompositionName: name,
    }));
  };

  const canGenerate =
    state.pyramidState.top.length > 0 &&
    state.pyramidState.middle.length > 0 &&
    state.pyramidState.base.length > 0;

  return {
    pyramidState: state.pyramidState,
    currentCompositionId: state.currentCompositionId,
    currentCompositionName: state.currentCompositionName,
    addNoteToLevel,
    removeNoteFromLevel,
    clearPyramid,
    loadPyramidState,
    setCurrentComposition,
    canGenerate,
  };
};
