import { createContext } from "react";

export type ActiveContext = "sidebar" | "pyramid";
export type SidebarMode = "default" | "search" | "filter" | "note-selection";
export type PyramidMode = "level-selection" | "level-navigation";
export type PyramidLevel = "base" | "middle" | "top";

export interface KeyboardNavigationState {
  isEnabled: boolean;
  activeContext: ActiveContext;
  sidebarMode: SidebarMode;
  pyramidMode: PyramidMode;
  selectedLevel: PyramidLevel | null;
  highlightedNoteIndex: number | null;
  highlightedPyramidNoteIndex: number | null;
  toast: { message: string; visible: boolean } | null;
}

export interface KeyboardNavigationActions {
  enableNavigation: () => void;
  disableNavigation: () => void;
  setActiveContext: (context: ActiveContext) => void;
  setSidebarMode: (mode: SidebarMode) => void;
  setPyramidMode: (mode: PyramidMode) => void;
  setSelectedLevel: (level: PyramidLevel | null) => void;
  setHighlightedPyramidNoteIndex: (index: number | null) => void;
  showToast: (message: string) => void;
  hideToast: () => void;
}

export type KeyboardNavigationContextType = KeyboardNavigationState &
  KeyboardNavigationActions;

export const KeyboardNavigationContext = createContext<
  KeyboardNavigationContextType | undefined
>(undefined);
