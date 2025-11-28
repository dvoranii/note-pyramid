import { useKeyboardNavigation } from "../../context/KeyboardNavigationContext/useKeyboardNavigation";
import * as S from "./Toast.styled";

export const Toast = () => {
  const { toast } = useKeyboardNavigation();

  if (!toast || !toast.visible) return null;

  return (
    <S.ToastContainer>
      <S.ToastMessage>{toast.message}</S.ToastMessage>
    </S.ToastContainer>
  );
};
