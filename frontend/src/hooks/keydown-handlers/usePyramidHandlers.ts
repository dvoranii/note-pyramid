// hooks/handlers/usePyramidHandlers.ts
import type { NavigationContext, PyramidContext } from "./types";

export const usePyramidHandlers = (
  navigation: NavigationContext,
  pyramid: PyramidContext
) => {
  const clearFocus = () => {
    if (document.activeElement) {
      (document.activeElement as HTMLElement).blur();
    }
    document.body.focus();
  };

  const handlePyramidKeys = (event: KeyboardEvent): boolean => {
    const { activeContext, pyramidMode, selectedLevel } = navigation;

    if (activeContext !== "pyramid") return false;

    if (pyramidMode === "level-selection") {
      return handleLevelSelection(event);
    }

    if (pyramidMode === "level-navigation" && selectedLevel) {
      return handleLevelNavigation(event);
    }

    return false;
  };

  const handleLevelSelection = (event: KeyboardEvent): boolean => {
    if (event.key === "1" || event.key === "2" || event.key === "3") {
      event.preventDefault();
      clearFocus();
      const levelMap = { "1": "base", "2": "middle", "3": "top" } as const;
      const newLevel = levelMap[event.key as keyof typeof levelMap];
      navigation.setSelectedLevel(newLevel);
      navigation.showToast(
        `Selected ${newLevel} level - Press Enter to navigate notes`
      );
      return true;
    }

    if (event.key === "Enter" && navigation.selectedLevel) {
      event.preventDefault();
      clearFocus();
      const levelNotes = pyramid.pyramidState[navigation.selectedLevel];
      if (levelNotes.length > 0) {
        navigation.setPyramidMode("level-navigation");
        navigation.setHighlightedPyramidNoteIndices([0]);
        navigation.showToast(
          `Navigating ${navigation.selectedLevel} notes - Use ← → arrows for single note, 1-9 for multi-select, Shift+D to delete`
        );
      } else {
        navigation.showToast(
          `No notes in ${navigation.selectedLevel} level to navigate`
        );
      }
      return true;
    }

    if (event.key === "Escape" && navigation.selectedLevel) {
      event.preventDefault();
      navigation.setSelectedLevel(null);
      navigation.showToast("Level deselected");
      return true;
    }

    return false;
  };

  const handleLevelNavigation = (event: KeyboardEvent): boolean => {
    const levelNotes = pyramid.pyramidState[navigation.selectedLevel!];
    const highlightedIndices = navigation.highlightedPyramidNoteIndices;
    const highlightCount = highlightedIndices.length;

    // NUMBER KEYS: Multi-selection toggle (1-9)
    if (event.key >= "1" && event.key <= "9") {
      event.preventDefault();
      clearFocus();
      const numberIndex = parseInt(event.key) - 1;

      // Only process if this note exists
      if (numberIndex < levelNotes.length) {
        const isCurrentlyHighlighted = highlightedIndices.includes(numberIndex);

        // Calculate what the new state WOULD be
        let predictedNewIndices: number[];
        if (isCurrentlyHighlighted) {
          predictedNewIndices = highlightedIndices.filter(
            (i) => i !== numberIndex
          );
        } else {
          predictedNewIndices = [...highlightedIndices, numberIndex].slice(
            0,
            9
          );
        }

        // Check if this would leave us with 0 notes
        if (predictedNewIndices.length === 0) {
          // Exit level immediately
          navigation.setHighlightedPyramidNoteIndices([]);
          navigation.setPyramidMode("level-selection");
          navigation.showToast("Exited level - No notes selected");
        } else {
          // Safe to toggle
          navigation.togglePyramidNoteHighlight(numberIndex);
          const action = isCurrentlyHighlighted ? "deselected" : "selected";
          navigation.showToast(
            `Note ${numberIndex + 1} ${action} (${
              predictedNewIndices.length
            } total)`
          );
        }
        return true;
      }
    }

    // ARROW KEYS: Single note navigation
    if (highlightCount === 1) {
      const currentIndex = highlightedIndices[0];

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        clearFocus();
        if (currentIndex > 0) {
          navigation.setHighlightedPyramidNoteIndices([currentIndex - 1]);
        }
        return true;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        clearFocus();
        if (currentIndex < levelNotes.length - 1) {
          navigation.setHighlightedPyramidNoteIndices([currentIndex + 1]);
        }
        return true;
      }
    } else if (
      highlightCount > 1 &&
      (event.key === "ArrowLeft" || event.key === "ArrowRight")
    ) {
      event.preventDefault();
      navigation.showToast(
        `Arrow keys disabled (${highlightCount} notes selected). Press number keys to deselect or Esc to exit.`,
        true
      );
      return true;
    } else if (
      highlightCount === 0 &&
      (event.key === "ArrowLeft" || event.key === "ArrowRight")
    ) {
      event.preventDefault();
      navigation.showToast("No notes selected");
      return true;
    }

    // SHIFT+D: Delete highlighted notes
    if (event.shiftKey && event.key === "D" && highlightCount > 0) {
      event.preventDefault();
      clearFocus();

      const sortedIndices = [...highlightedIndices].sort((a, b) => b - a);
      const notesToDelete = sortedIndices.map((idx) => levelNotes[idx]);

      sortedIndices.forEach((index) => {
        const noteToDelete = levelNotes[index];
        if (noteToDelete) {
          pyramid.removeNoteFromLevel(
            navigation.selectedLevel!,
            noteToDelete.id
          );
        }
      });

      const remainingCount = levelNotes.length - highlightCount;

      if (remainingCount === 0) {
        navigation.setHighlightedPyramidNoteIndices([]);
        navigation.setPyramidMode("level-selection");
        navigation.showToast("Deleted all notes - level empty");
      } else {
        navigation.setHighlightedPyramidNoteIndices([0]);
        const noteNames = notesToDelete.map((n) => n.name).join(", ");
        navigation.showToast(
          highlightCount === 1
            ? `Deleted ${noteNames}`
            : `Deleted ${highlightCount} notes`
        );
      }
      return true;
    }

    // ESCAPE: Exit level navigation
    if (event.key === "Escape") {
      event.preventDefault();
      clearFocus();
      navigation.setPyramidMode("level-selection");
      navigation.setHighlightedPyramidNoteIndices([]);
      navigation.showToast(
        `Exited ${navigation.selectedLevel} level - Press Esc again to deselect`
      );
      return true;
    }

    return false;
  };
  return { handlePyramidKeys };
};
