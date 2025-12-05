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
    const { activeContext, sidebarMode } = navigation;

    if (activeContext === "sidebar" && sidebarMode !== "default") {
      event.preventDefault();
      clearFocus();
      navigation.setSidebarMode("default");
      navigation.showToast(`Exited ${sidebarMode} mode`);
      return true;
    }

    return false;
  };

  return { handleGlobalKeys };
};
