import { useEffect } from "react";
import { useKeyboardNavigation } from "../context/KeyboardNavigationContext/useKeyboardNavigation";
import { usePyramid } from "../context/PyramidContext/usePyramid";
import { useActivationHandlers } from "./hotkey-handlers/useActivationHandlers";
import { usePyramidHandlers } from "./hotkey-handlers/usePyramidHandlers";
import { useSidebarHandlers } from "./hotkey-handlers/useSidebarHandlers";
import { useGlobalHandlers } from "./hotkey-handlers/useGlobalHandlers";

export const useGlobalKeydown = () => {
  const navigation = useKeyboardNavigation();
  const pyramid = usePyramid();

  const activationHandlers = useActivationHandlers(navigation);
  const pyramidHandlers = usePyramidHandlers(navigation, pyramid);
  const sidebarHandlers = useSidebarHandlers(navigation);
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
  return (
    event.target instanceof HTMLInputElement ||
    event.target instanceof HTMLTextAreaElement ||
    event.target instanceof HTMLSelectElement
  );
};
