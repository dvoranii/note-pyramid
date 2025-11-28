import { useKeyboardNavigation } from "../../context/KeyboardNavigationContext/useKeyboardNavigation";
import { usePyramid } from "../../context/PyramidContext/usePyramid";

export type NavigationContext = ReturnType<typeof useKeyboardNavigation>;
export type PyramidContext = ReturnType<typeof usePyramid>;
