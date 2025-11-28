import * as S from "./KeyboardNavIndicator.styled";
import { useKeyboardNavigation } from "../../context/KeyboardNavigationContext/useKeyboardNavigation";

export const KeyboardNavIndicator = () => {
  const { isEnabled, showToastMessages, toggleToastMessages, showToast } =
    useKeyboardNavigation();

  if (!isEnabled) return null;

  const handleToggleClick = () => {
    const newState = !showToastMessages ? "enabled" : "disabled";
    showToast(`Guide messages ${newState}`, true);
    toggleToastMessages();
  };

  return (
    <S.SwitchContainer
      onClick={handleToggleClick}
      title="Click to toggle guide messages"
    >
      <S.SwitchLabel>Keyboard Nav</S.SwitchLabel>
      <S.Switch $isOn={showToastMessages}>
        <S.SwitchThumb $isOn={showToastMessages} />
      </S.Switch>
    </S.SwitchContainer>
  );
};
