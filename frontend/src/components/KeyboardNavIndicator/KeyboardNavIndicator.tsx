import * as S from "./KeyboardNavIndicator.styled";
import { useKeyboardNavigation } from "../../context/KeyboardNavigationContext/useKeyboardNavigation";

export const KeyboardNavIndicator = () => {
  const { isEnabled } = useKeyboardNavigation();

  if (!isEnabled) return null;

  return <S.Indicator>Keyboard Nav Active</S.Indicator>;
};
