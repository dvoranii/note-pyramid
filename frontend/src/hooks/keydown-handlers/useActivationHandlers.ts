// hooks/handlers/useActivationHandlers.ts
import type { NavigationContext } from "./types";

export const useActivationHandlers = (navigation: NavigationContext) => {
  const clearFocus = () => {
    if (document.activeElement) {
      (document.activeElement as HTMLElement).blur();
    }
    document.body.focus();
  };

  const handleActivation = (event: KeyboardEvent): boolean => {
    if ((event.ctrlKey && event.key === "k") || event.key === "/") {
      event.preventDefault();
      clearFocus();
      if (navigation.isEnabled) {
        navigation.disableNavigation();
        navigation.showToast("Keyboard navigation disabled");
      } else {
        navigation.enableNavigation();
        navigation.showToast(
          "Keyboard navigation enabled - Use ` to switch contexts"
        );
      }
      return true;
    }
    return false;
  };

  return { handleActivation };
};
