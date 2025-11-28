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
        navigation.setHighlightedPyramidNoteIndex(0);
        navigation.showToast(
          `Navigating ${navigation.selectedLevel} notes - Use ← → to move, Shift+D to delete`
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

    if (
      event.key === "ArrowLeft" &&
      navigation.highlightedPyramidNoteIndex !== null
    ) {
      event.preventDefault();
      clearFocus();
      if (navigation.highlightedPyramidNoteIndex > 0) {
        navigation.setHighlightedPyramidNoteIndex(
          navigation.highlightedPyramidNoteIndex - 1
        );
      }
      return true;
    }

    if (
      event.key === "ArrowRight" &&
      navigation.highlightedPyramidNoteIndex !== null
    ) {
      event.preventDefault();
      clearFocus();
      if (navigation.highlightedPyramidNoteIndex < levelNotes.length - 1) {
        navigation.setHighlightedPyramidNoteIndex(
          navigation.highlightedPyramidNoteIndex + 1
        );
      }
      return true;
    }

    if (
      event.shiftKey &&
      event.key === "D" &&
      navigation.highlightedPyramidNoteIndex !== null
    ) {
      event.preventDefault();
      clearFocus();
      const noteToDelete = levelNotes[navigation.highlightedPyramidNoteIndex];
      if (noteToDelete) {
        pyramid.removeNoteFromLevel(navigation.selectedLevel!, noteToDelete.id);

        const newLength = levelNotes.length - 1;
        if (newLength === 0) {
          navigation.setHighlightedPyramidNoteIndex(null);
          navigation.setPyramidMode("level-selection");
          navigation.showToast("No notes remaining in level");
        } else if (navigation.highlightedPyramidNoteIndex >= newLength) {
          navigation.setHighlightedPyramidNoteIndex(newLength - 1);
        }

        navigation.showToast(
          `Deleted ${noteToDelete.name} from ${navigation.selectedLevel} level`
        );
      }
      return true;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      clearFocus();
      navigation.setPyramidMode("level-selection");
      navigation.setHighlightedPyramidNoteIndex(null);
      navigation.showToast(
        `Exited ${navigation.selectedLevel} level navigation - Level still selected`
      );
      return true;
    }

    return false;
  };

  return { handlePyramidKeys };
};
