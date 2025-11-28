import { useEffect } from "react";
import { useKeyboardNavigation } from "../context/KeyboardNavigationContext/useKeyboardNavigation";
import { usePyramid } from "../context/PyramidContext/usePyramid";
import { useActivationHandlers } from "./keydown-handlers/useActivationHandlers";
import { usePyramidHandlers } from "./keydown-handlers/usePyramidHandlers";
import { useSidebarHandlers } from "./keydown-handlers/useSidebarHandlers";
import { useGlobalHandlers } from "./keydown-handlers/useGlobalHandlers";

export const useGlobalKeydown = () => {
  const navigation = useKeyboardNavigation();
  const pyramid = usePyramid();

  const activationHandlers = useActivationHandlers(navigation);
  const pyramidHandlers = usePyramidHandlers(navigation, pyramid);
  const sidebarHandlers = useSidebarHandlers(navigation, pyramid);
  const globalHandlers = useGlobalHandlers(navigation);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (activationHandlers.handleActivation(event)) {
        return;
      }

      if (!navigation.isEnabled) {
        return;
      }

      if (shouldIgnoreEvent(event)) {
        return;
      }

      const handlers = [
        () => pyramidHandlers.handlePyramidKeys(event),
        () => sidebarHandlers.handleSidebarKeys(event),
        () => globalHandlers.handleGlobalKeys(event),
      ];

      for (const handler of handlers) {
        if (handler()) {
          return;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    navigation.isEnabled,
    navigation.activeContext,
    navigation.sidebarMode,
    navigation.pyramidMode,
    navigation.selectedLevel,
    navigation.highlightedPyramidNoteIndex,
    pyramid.pyramidState,
    activationHandlers,
    pyramidHandlers,
    sidebarHandlers,
    globalHandlers,
  ]);
};
const shouldIgnoreEvent = (event: KeyboardEvent): boolean => {
  const isFocusedOnInput =
    event.target instanceof HTMLInputElement ||
    event.target instanceof HTMLTextAreaElement ||
    event.target instanceof HTMLSelectElement;

  if (!isFocusedOnInput) return false;

  // ALWAYS allow Escape to work in inputs/selects
  if (event.key === "Escape") return false;

  // For text inputs (search bar), ignore everything except Escape
  if (
    event.target instanceof HTMLInputElement ||
    event.target instanceof HTMLTextAreaElement
  ) {
    return true;
  }

  // For select dropdowns, DON'T ignore any keys - let browser handle naturally
  // This allows default arrow key navigation, Enter to select, Space to open, etc.
  if (event.target instanceof HTMLSelectElement) {
    return false; // Don't ignore - let our handlers or browser handle it
  }

  return true;
};
