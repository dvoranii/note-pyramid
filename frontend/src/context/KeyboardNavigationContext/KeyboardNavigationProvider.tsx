import type { ReactNode } from "react";
import { useState, useCallback } from "react";
import { KeyboardNavigationContext } from "./KeyboardNavigationContext";
import type {
  KeyboardNavigationState,
  ActiveContext,
  SidebarMode,
  PyramidMode,
  PyramidLevel,
} from "./KeyboardNavigationContext";

export const KeyboardNavigationProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [state, setState] = useState<KeyboardNavigationState>({
    isEnabled: false, // Start disabled
    activeContext: "pyramid",
    sidebarMode: "default",
    pyramidMode: "level-selection",
    selectedLevel: null,
    highlightedNoteIndex: null,
    highlightedPyramidNoteIndex: null,
    toast: null,
  });

  const enableNavigation = useCallback(() => {
    setState((prev) => ({ ...prev, isEnabled: true }));
  }, []);

  const disableNavigation = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isEnabled: false,
      activeContext: "pyramid",
      sidebarMode: "default",
      pyramidMode: "level-selection",
      selectedLevel: null,
      highlightedNoteIndex: null,
      highlightedPyramidNoteIndex: null,
    }));
  }, []);

  const setActiveContext = useCallback((context: ActiveContext) => {
    setState((prev) => ({
      ...prev,
      activeContext: context,
      sidebarMode: context === "sidebar" ? "default" : prev.sidebarMode,
      pyramidMode: context === "pyramid" ? "level-selection" : prev.pyramidMode,
    }));
  }, []);

  const setSidebarMode = useCallback((mode: SidebarMode) => {
    setState((prev) => ({ ...prev, sidebarMode: mode }));
  }, []);

  const setPyramidMode = useCallback((mode: PyramidMode) => {
    setState((prev) => ({ ...prev, pyramidMode: mode }));
  }, []);

  const setSelectedLevel = useCallback((level: PyramidLevel | null) => {
    setState((prev) => ({ ...prev, selectedLevel: level }));
  }, []);

  const setHighlightedPyramidNoteIndex = useCallback((index: number | null) => {
    setState((prev) => ({ ...prev, highlightedPyramidNoteIndex: index }));
  }, []);

  const showToast = useCallback((message: string) => {
    setState((prev) => ({
      ...prev,
      toast: { message, visible: true },
    }));
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        toast: prev.toast ? { ...prev.toast, visible: false } : null,
      }));
    }, 3000);
  }, []);

  const hideToast = useCallback(() => {
    setState((prev) => ({ ...prev, toast: null }));
  }, []);

  const value = {
    ...state,
    enableNavigation,
    disableNavigation,
    setActiveContext,
    setSidebarMode,
    setPyramidMode,
    setSelectedLevel,
    setHighlightedPyramidNoteIndex,
    showToast,
    hideToast,
  };

  return (
    <KeyboardNavigationContext.Provider value={value}>
      {children}
    </KeyboardNavigationContext.Provider>
  );
};
