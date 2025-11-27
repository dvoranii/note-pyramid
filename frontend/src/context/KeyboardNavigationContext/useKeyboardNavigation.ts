import { useContext } from "react";
import { KeyboardNavigationContext } from "./KeyboardNavigationContext";

export const useKeyboardNavigation = () => {
  const context = useContext(KeyboardNavigationContext);
  if (context === undefined) {
    throw new Error(
      "useKeyboardNavigation must be used within a KeyboardNavigationProvider"
    );
  }
  return context;
};
