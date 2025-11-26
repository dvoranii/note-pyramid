import { useState } from "react";
import * as S from "./SaveModal.styled";

interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  suggestedName?: string;
}

export const SaveModal = ({
  isOpen,
  onClose,
  onSave,
  suggestedName = "",
}: SaveModalProps) => {
  const [name, setName] = useState(suggestedName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim());
      setName("");
    }
  };

  const handleClose = () => {
    setName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={handleClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalTitle>Save Note Breakdown</S.ModalTitle>

        <S.Form onSubmit={handleSubmit}>
          <S.FormGroup>
            <S.Label htmlFor="composition-name">Name</S.Label>
            <S.Input
              id="composition-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Summer Citrus Blend"
              autoFocus
            />
          </S.FormGroup>

          <S.ButtonGroup>
            <S.Button type="button" $variant="secondary" onClick={handleClose}>
              Cancel
            </S.Button>
            <S.Button type="submit" $variant="primary" disabled={!name.trim()}>
              Save
            </S.Button>
          </S.ButtonGroup>
        </S.Form>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};
