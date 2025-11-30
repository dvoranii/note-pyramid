// hooks/handlers/useSidebarHandlers.ts
import { getMaxNotesForLevel } from "../../utils/pyramidUtils";
import type { NavigationContext, PyramidContext } from "./types";

const clearFocus = () => {
  if (document.activeElement) {
    (document.activeElement as HTMLElement).blur();
  }
  document.body.focus();
};

export const useSidebarHandlers = (
  navigation: NavigationContext,
  pyramid: PyramidContext
) => {
  const handleSidebarKeys = (event: KeyboardEvent): boolean => {
    const { activeContext, sidebarMode } = navigation;

    if (activeContext !== "sidebar") return false;

    // Shift+L - Load more notes
    if (event.shiftKey && event.key === "L") {
      event.preventDefault();
      clearFocus();
      const loadMoreButton = document.querySelector(
        '[data-load-more-button="true"]'
      ) as HTMLButtonElement;
      if (loadMoreButton && !loadMoreButton.disabled) {
        loadMoreButton.click();
        navigation.showToast("Loading more notes...");
      } else {
        navigation.showToast("No more notes to load or button not available");
      }
      return true;
    }

    switch (sidebarMode) {
      case "default":
        return handleSidebarDefault(event);
      case "search":
        return handleSidebarSearch(event);
      case "filter":
        return handleSidebarFilter(event);
      case "note-selection":
        return handleNoteSelection(event);
      default:
        return false;
    }
  };

  const handleSidebarDefault = (event: KeyboardEvent): boolean => {
    // Shift+S - Focus search
    if (event.shiftKey && event.key === "S") {
      event.preventDefault();
      clearFocus();
      const searchInput = document.querySelector(
        'input[type="text"]'
      ) as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
        navigation.setSidebarMode("search");
        navigation.showToast("Search focused - Type to search, Esc to exit");
      }
      return true;
    }

    // Shift+F - Open filter
    if (event.shiftKey && event.key === "F") {
      event.preventDefault();
      clearFocus();
      const filterSelect = document.querySelector(
        "select"
      ) as HTMLSelectElement;
      if (filterSelect) {
        filterSelect.focus();
        navigation.setSidebarMode("filter");
        navigation.showToast(
          "Filter opened - Use ↑↓ to navigate, Enter to select, Esc to close"
        );
      }
      return true;
    }

    if (event.shiftKey && event.key === "N") {
      event.preventDefault();
      clearFocus();

      console.log("Shift+N pressed - selectedLevel:", navigation.selectedLevel);

      if (!navigation.selectedLevel) {
        navigation.showToast(
          "You must first select a pyramid level before entering the note selection mode"
        );
      } else {
        const noteCards = document.querySelectorAll("[data-note-card]");
        if (noteCards.length > 0) {
          navigation.setSidebarMode("note-selection");
          navigation.setHighlightedSidebarNoteIndex(0);
          navigation.showToast(
            `Note selection mode - Use ← → to browse ${noteCards.length} notes, + to add to ${navigation.selectedLevel} level`
          );

          (noteCards[0] as HTMLElement)?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        } else {
          navigation.showToast("No notes available to select");
        }
      }
      return true;
    }

    return false;
  };

  const handleSidebarSearch = (event: KeyboardEvent): boolean => {
    // Esc - Exit search mode
    if (event.key === "Escape") {
      event.preventDefault();
      clearFocus();
      navigation.setSidebarMode("default");
      navigation.showToast("Exited search mode");
      return true;
    }
    return false;
  };

  const handleSidebarFilter = (event: KeyboardEvent): boolean => {
    // Only handle Escape - let browser handle EVERYTHING else (Enter, arrows, space, etc.)
    if (event.key === "Escape") {
      event.preventDefault();
      const filterSelect = document.querySelector(
        "select"
      ) as HTMLSelectElement;
      if (filterSelect) {
        filterSelect.blur(); // Remove focus from select
      }
      navigation.setSidebarMode("default");
      clearFocus();
      navigation.showToast("Filter closed");
      return true;
    }

    // Don't handle anything else - let browser's native select behavior work
    return false;
  };

  // hooks/handlers/useSidebarHandlers.ts - Add note selection mode
  const handleNoteSelection = (event: KeyboardEvent): boolean => {
    const noteCards = document.querySelectorAll("[data-note-card]");
    if (noteCards.length === 0) {
      // No notes available, exit mode
      navigation.setSidebarMode("default");
      navigation.setHighlightedSidebarNoteIndex(null);
      return false;
    }

    switch (event.key) {
      case "ArrowLeft": {
        event.preventDefault();
        if (
          navigation.highlightedSidebarNoteIndex !== null &&
          navigation.highlightedSidebarNoteIndex > 0
        ) {
          const newIndex = navigation.highlightedSidebarNoteIndex - 1;
          navigation.setHighlightedSidebarNoteIndex(newIndex);
          // Scroll the newly highlighted note into view
          (noteCards[newIndex] as HTMLElement)?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
        return true;
      }

      case "ArrowRight": {
        event.preventDefault();
        if (
          navigation.highlightedSidebarNoteIndex !== null &&
          navigation.highlightedSidebarNoteIndex < noteCards.length - 1
        ) {
          const newIndex = navigation.highlightedSidebarNoteIndex + 1;
          navigation.setHighlightedSidebarNoteIndex(newIndex);
          // Scroll the newly highlighted note into view
          (noteCards[newIndex] as HTMLElement)?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
        return true;
      }

      case "+":
      case "=": {
        // Handle both + and = (for keyboards without numpad)
        event.preventDefault();

        if (
          navigation.highlightedSidebarNoteIndex !== null &&
          navigation.selectedLevel
        ) {
          const highlightedCard = noteCards[
            navigation.highlightedSidebarNoteIndex
          ] as HTMLElement;

          // Extract note data from the card's data attributes
          const noteData = {
            id: highlightedCard.dataset.noteId || "",
            name: highlightedCard.dataset.noteName || "",
            image: highlightedCard.dataset.noteImage || "",
            high_res_image: highlightedCard.dataset.noteHighResImage || "",
            category: highlightedCard.dataset.noteCategory || "",
          };

          // Check if note is already in the selected level
          const levelNotes = pyramid.pyramidState[navigation.selectedLevel];
          const alreadyExists = levelNotes.some(
            (note) => note.id === noteData.id
          );

          if (alreadyExists) {
            navigation.showToast(
              `${noteData.name} is already in ${navigation.selectedLevel} level`
            );
            return true;
          }

          const maxNotes = getMaxNotesForLevel(navigation.selectedLevel);
          if (levelNotes.length >= maxNotes) {
            const level = navigation.selectedLevel;
            const capitalLevel = level.charAt(0).toUpperCase() + level.slice(1);
            navigation.showToast(
              `${capitalLevel} level is full (${maxNotes}/${maxNotes})`
            );
            return true;
          }

          // Add note to the selected pyramid level
          pyramid.addNoteToLevel(navigation.selectedLevel, noteData);

          navigation.showToast(
            `Added ${noteData.name} to ${navigation.selectedLevel} level`
          );
        } else if (!navigation.selectedLevel) {
          navigation.showToast(
            "Please select a pyramid level first (press 1, 2, or 3)"
          );
        }
        return true;
      }

      case "Escape": {
        event.preventDefault();
        clearFocus();
        navigation.setSidebarMode("default");
        navigation.setHighlightedSidebarNoteIndex(null);
        navigation.showToast("Exited note selection mode");
        return true;
      }

      default:
        return false;
    }
  };
  return { handleSidebarKeys };
};
