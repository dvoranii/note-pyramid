import { Modal } from "../Modal/Modal";
import * as S from "./ClearModa.styled";

interface ClearModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ClearModal = ({ isOpen, onClose, onConfirm }: ClearModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Clear Pyramid"
      maxWidth="400px"
    >
      <S.ModalBody>
        <S.ConfirmationText>
          Are you sure you want to clear all notes from the pyramid?
        </S.ConfirmationText>

        <S.ButtonGroup>
          <S.Button type="button" $variant="secondary" onClick={onClose}>
            No, Keep Notes
          </S.Button>
          <S.Button type="button" $variant="primary" onClick={handleConfirm}>
            Yes, Clear All
          </S.Button>
        </S.ButtonGroup>
      </S.ModalBody>
    </Modal>
  );
};
