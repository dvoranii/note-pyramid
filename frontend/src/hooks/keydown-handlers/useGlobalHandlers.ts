// hooks/handlers/useGlobalHandlers.ts
import type { NavigationContext } from "./types";

export const useGlobalHandlers = (navigation: NavigationContext) => {
  const clearFocus = () => {
    if (document.activeElement) {
      (document.activeElement as HTMLElement).blur();
    }
    document.body.focus();
  };

  const handleGlobalKeys = (event: KeyboardEvent): boolean => {
    if (event.key === "`") {
      event.preventDefault();
      navigation.setActiveContext(
        navigation.activeContext === "sidebar" ? "pyramid" : "sidebar"
      );
      return true;
    }

    if (event.key === "Escape") {
      return handleEscape(event);
    }

    return false;
  };

  const handleEscape = (event: KeyboardEvent): boolean => {
    // Only handle escape cases that aren't covered by specific handlers
    const { activeContext, sidebarMode } = navigation;

    // Global escape for sidebar modes (fallback)
    if (activeContext === "sidebar" && sidebarMode !== "default") {
      event.preventDefault();
      clearFocus();
      navigation.setSidebarMode("default");
      navigation.showToast(`Exited ${sidebarMode} mode`);
      return true;
    }

    // Add other global escape cases here if needed
    // For now, most escape logic is handled in specific handlers

    return false;
  };

  return { handleGlobalKeys };
};
