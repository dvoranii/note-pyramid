// hooks/handlers/useSidebarHandlers.ts
import type { NavigationContext } from "./types";

export const useSidebarHandlers = (navigation: NavigationContext) => {
  const clearFocus = () => {
    if (document.activeElement) {
      (document.activeElement as HTMLElement).blur();
    }
    document.body.focus();
  };

  const handleSidebarKeys = (event: KeyboardEvent): boolean => {
    const { activeContext, sidebarMode } = navigation;

    if (activeContext !== "sidebar") return false;

    switch (sidebarMode) {
      case "default":
        return handleSidebarDefault(event);
      case "search":
        return handleSidebarSearch(event);
      case "filter":
        return handleSidebarFilter(event);
      default:
        return false;
    }
  };

  const handleSidebarDefault = (event: KeyboardEvent): boolean => {
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
      if (!navigation.selectedLevel) {
        navigation.showToast(
          "You must first select a pyramid level before entering the note selection mode"
        );
      } else {
        navigation.showToast(
          `Note selection mode - Notes will be added to ${navigation.selectedLevel} level`
        );
        // TODO: Implement note selection mode in Phase 4
      }
      return true;
    }

    if (event.shiftKey && event.key === "L") {
      event.preventDefault();
      clearFocus();
      // TODO: Implement load more functionality in Phase 4
      navigation.showToast("Load more functionality coming soon");
      return true;
    }

    return false;
  };

  const handleSidebarSearch = (event: KeyboardEvent): boolean => {
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
    const filterSelect = document.querySelector("select") as HTMLSelectElement;
    if (!filterSelect) return false;

    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        const options = filterSelect.options;
        const currentIndex = filterSelect.selectedIndex;
        if (currentIndex < options.length - 1) {
          filterSelect.selectedIndex = currentIndex + 1;
        }
        return true;
      }

      case "ArrowUp": {
        event.preventDefault();
        const currentIndexUp = filterSelect.selectedIndex;
        if (currentIndexUp > 0) {
          filterSelect.selectedIndex = currentIndexUp - 1;
        }
        return true;
      }

      case "Enter":
        event.preventDefault();
        filterSelect.dispatchEvent(new Event("change", { bubbles: true }));
        navigation.setSidebarMode("default");
        clearFocus();
        navigation.showToast(
          `Filter applied: ${
            filterSelect.options[filterSelect.selectedIndex].text
          }`
        );
        return true;

      case "Escape":
        event.preventDefault();
        navigation.setSidebarMode("default");
        clearFocus();
        navigation.showToast("Filter closed");
        return true;

      default:
        return false;
    }
  };

  return { handleSidebarKeys };
};
