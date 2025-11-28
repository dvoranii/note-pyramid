import type { ReactNode } from "react";
import { useState, useCallback, useRef } from "react";
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
    isEnabled: false,
    activeContext: "pyramid",
    sidebarMode: "default",
    pyramidMode: "level-selection",
    selectedLevel: null,
    highlightedSidebarNoteIndex: null,
    highlightedPyramidNoteIndex: null,
    toast: null,
    showToastMessages: true,
  });

  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      pyramidMode: "level-selection",
      highlightedPyramidNoteIndex:
        context === "sidebar" ? null : prev.highlightedPyramidNoteIndex,
      highlightedSidebarNoteIndex:
        context === "pyramid" ? null : prev.highlightedSidebarNoteIndex,
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

  const setHighlightedSidebarNoteIndex = useCallback((index: number | null) => {
    setState((prev) => ({ ...prev, highlightedSidebarNoteIndex: index }));
  }, []);

  const setHighlightedPyramidNoteIndex = useCallback((index: number | null) => {
    setState((prev) => ({ ...prev, highlightedPyramidNoteIndex: index }));
  }, []);

  const toggleToastMessages = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showToastMessages: !prev.showToastMessages,
    }));
  }, []);

  const showToast = useCallback(
    (message: string, force: boolean = false) => {
      if (!force && !state.showToastMessages) return;

      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }

      setState((prev) => ({
        ...prev,
        toast: { message, visible: true },
      }));

      toastTimeoutRef.current = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          toast: prev.toast ? { ...prev.toast, visible: false } : null,
        }));
        toastTimeoutRef.current = null;
      }, 3000);
    },
    [state.showToastMessages]
  );

  const hideToast = useCallback(() => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
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
    setHighlightedSidebarNoteIndex,
    setHighlightedPyramidNoteIndex,
    showToast,
    hideToast,
    toggleToastMessages,
  };

  return (
    <KeyboardNavigationContext.Provider value={value}>
      {children}
    </KeyboardNavigationContext.Provider>
  );
};
