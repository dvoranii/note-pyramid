import { createContext } from "react";
import type { PyramidState, Note } from "../../types";

export interface PyramidContextType {
  pyramidState: PyramidState;
  currentCompositionId: string | null;
  currentCompositionName: string;
  addNoteToLevel: (level: keyof PyramidState, note: Note) => void;
  removeNoteFromLevel: (level: keyof PyramidState, noteId: string) => void;
  clearPyramid: () => void;
  loadPyramidState: (
    newState: PyramidState,
    compositionId?: string,
    compositionName?: string
  ) => void;
  setCurrentComposition: (id: string | null, name?: string) => void;
  canGenerate: boolean;
}

export const PyramidContext = createContext<PyramidContextType | undefined>(
  undefined
);
