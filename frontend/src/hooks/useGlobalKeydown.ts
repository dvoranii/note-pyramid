// hooks/useGlobalKeydown.ts
import { useEffect } from "react";
import { useKeyboardNavigation } from "../context/KeyboardNavigationContext/useKeyboardNavigation";
import { usePyramid } from "../context/PyramidContext/usePyramid";

export const useGlobalKeydown = () => {
  const {
    isEnabled,
    enableNavigation,
    disableNavigation,
    activeContext,
    setActiveContext,
    sidebarMode,
    pyramidMode,
    selectedLevel,
    setSelectedLevel,
    setPyramidMode,
    highlightedPyramidNoteIndex,
    setHighlightedPyramidNoteIndex,
    showToast,
  } = useKeyboardNavigation();

  const { pyramidState, removeNoteFromLevel } = usePyramid();

  const clearFocus = () => {
    if (document.activeElement) {
      (document.activeElement as HTMLElement).blur();
    }
    document.body.focus();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey && event.key === "k") || event.key === "/") {
        event.preventDefault();
        clearFocus();
        if (isEnabled) {
          disableNavigation();
          showToast("Keyboard navigation disabled");
        } else {
          enableNavigation();
          showToast("Keyboard navigation enabled - Use ` to switch contexts");
        }
        return;
      }

      if (!isEnabled) {
        return;
      }

      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return;
      }

      // PYRAMID BUILDER HOTKEYS
      if (activeContext === "pyramid" && pyramidMode === "level-selection") {
        // Level selection: 1, 2, 3 keys
        if (event.key === "1" || event.key === "2" || event.key === "3") {
          event.preventDefault();
          clearFocus();
          const levelMap = { "1": "base", "2": "middle", "3": "top" } as const;
          const newLevel = levelMap[event.key as keyof typeof levelMap];
          setSelectedLevel(newLevel);
          showToast(
            `Selected ${newLevel} level - Press Enter to navigate notes`
          );
          return;
        }

        // Enter selected level (if it has notes)
        if (event.key === "Enter" && selectedLevel) {
          event.preventDefault();
          clearFocus();
          const levelNotes = pyramidState[selectedLevel];
          if (levelNotes.length > 0) {
            setPyramidMode("level-navigation");
            setHighlightedPyramidNoteIndex(0);

            showToast(
              `Navigating ${selectedLevel} notes - Use ← → to move, Shift+D to delete`
            );
          } else {
            showToast(`No notes in ${selectedLevel} level to navigate`);
          }
          return;
        }

        // Esc to deselect level
        if (event.key === "Escape" && selectedLevel) {
          event.preventDefault();
          setSelectedLevel(null);
          showToast("Level deselected");
          return;
        }
      }

      if (
        activeContext === "pyramid" &&
        pyramidMode === "level-navigation" &&
        selectedLevel
      ) {
        const levelNotes = pyramidState[selectedLevel];

        if (event.key === "ArrowLeft" && highlightedPyramidNoteIndex !== null) {
          event.preventDefault();
          clearFocus();
          if (highlightedPyramidNoteIndex > 0) {
            setHighlightedPyramidNoteIndex(highlightedPyramidNoteIndex - 1);
          }
          return;
        }

        if (
          event.key === "ArrowRight" &&
          highlightedPyramidNoteIndex !== null
        ) {
          event.preventDefault();
          clearFocus();
          if (highlightedPyramidNoteIndex < levelNotes.length - 1) {
            setHighlightedPyramidNoteIndex(highlightedPyramidNoteIndex + 1);
          }
          return;
        }

        if (
          event.shiftKey &&
          event.key === "D" &&
          highlightedPyramidNoteIndex !== null
        ) {
          event.preventDefault();
          clearFocus();
          const noteToDelete = levelNotes[highlightedPyramidNoteIndex];
          if (noteToDelete) {
            removeNoteFromLevel(selectedLevel, noteToDelete.id);

            const newLength = levelNotes.length - 1;
            if (newLength === 0) {
              setHighlightedPyramidNoteIndex(null);
              setPyramidMode("level-selection");
              showToast("No notes remaining in level");
            } else if (highlightedPyramidNoteIndex >= newLength) {
              setHighlightedPyramidNoteIndex(newLength - 1);
            }

            showToast(
              `Deleted ${noteToDelete.name} from ${selectedLevel} level`
            );
          }

          return;
        }

        if (event.key === "Escape") {
          event.preventDefault();
          clearFocus();
          setPyramidMode("level-selection");
          setHighlightedPyramidNoteIndex(null);
          showToast("Exited level navigation");
          return;
        }
      }

      if (event.key === "`") {
        event.preventDefault();
        setActiveContext(activeContext === "sidebar" ? "pyramid" : "sidebar");
        return;
      }

      if (event.key === "Escape") {
        if (sidebarMode !== "default") {
          // We'll handle specific Esc behaviors in later phases
        }
        return;
      }

      if (event.shiftKey && event.key === "N" && activeContext === "sidebar") {
        if (!selectedLevel) {
          showToast(
            "You must first select a pyramid level before entering the note selection mode"
          );
        } else {
          showToast(
            `Note selection mode - Notes will be added to ${selectedLevel} level`
          );
        }

        event.preventDefault();
        return;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    isEnabled,
    enableNavigation,
    disableNavigation,
    activeContext,
    setActiveContext,
    sidebarMode,
    pyramidMode,
    selectedLevel,
    setSelectedLevel,
    setPyramidMode,
    highlightedPyramidNoteIndex,
    setHighlightedPyramidNoteIndex,
    showToast,
    pyramidState,
    removeNoteFromLevel,
  ]);
};
