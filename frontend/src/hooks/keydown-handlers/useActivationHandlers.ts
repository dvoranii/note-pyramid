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

        if (navigation.showToastMessages) {
          navigation.showToast(
            "Keyboard navigation enabled - Use ` to switch contexts"
          );
        } else {
          navigation.showToast("Keyboard navigation enabled");
        }
      }
      return true;
    }

    if (event.ctrlKey && event.shiftKey && event.key === "K") {
      event.preventDefault();

      const newState = !navigation.showToastMessages ? "enabled" : "disabled";
      navigation.showToast(`Guide messages ${newState}`, true);

      navigation.toggleToastMessages();
    }
    return false;
  };

  return { handleActivation };
};
