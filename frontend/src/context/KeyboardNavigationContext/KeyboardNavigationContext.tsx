import { createContext } from "react";

export type ActiveContext = "sidebar" | "pyramid";
export type SidebarMode = "default" | "search" | "filter" | "note-selection";
export type PyramidMode = "level-selection" | "level-navigation";
export type PyramidLevel = "base" | "middle" | "top";

export interface KeyboardNavigationState {
  isEnabled: boolean;
  activeContext: ActiveContext;
  sidebarMode: "default" | "search" | "filter" | "note-selection";
  pyramidMode: PyramidMode;
  selectedLevel: PyramidLevel | null;
  highlightedSidebarNoteIndex: number | null;
  highlightedPyramidNoteIndex: number | null;
  toast: { message: string; visible: boolean } | null;
  showToastMessages: boolean;
}

export interface KeyboardNavigationActions {
  enableNavigation: () => void;
  disableNavigation: () => void;
  setActiveContext: (context: ActiveContext) => void;
  setSidebarMode: (
    mode: "default" | "search" | "filter" | "note-selection"
  ) => void;
  setPyramidMode: (mode: PyramidMode) => void;
  setSelectedLevel: (level: PyramidLevel | null) => void;
  setHighlightedSidebarNoteIndex: (index: number | null) => void;
  setHighlightedPyramidNoteIndex: (index: number | null) => void;
  showToast: (message: string, force?: boolean) => void;
  hideToast: () => void;
  toggleToastMessages: () => void;
}

export type KeyboardNavigationContextType = KeyboardNavigationState &
  KeyboardNavigationActions;

export const KeyboardNavigationContext = createContext<
  KeyboardNavigationContextType | undefined
>(undefined);
