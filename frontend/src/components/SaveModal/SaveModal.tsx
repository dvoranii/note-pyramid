import { useState } from "react";
import { Modal } from "../Modal/Modal";
import * as S from "./SaveModal.styled";

interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, saveMode: "update" | "new") => void;
  currentComposition?: {
    id: string;
    name: string;
    hasUnsavedChanges: boolean;
  } | null;
}

export const SaveModal = ({
  isOpen,
  onClose,
  onSave,
  currentComposition,
}: SaveModalProps) => {
  const showSaveOptions = !!currentComposition;
  const initialSaveMode = currentComposition ? "update" : "new";
  const initialName = currentComposition?.name || "";

  const [name, setName] = useState(initialName);
  const [saveMode, setSaveMode] = useState<"update" | "new">(initialSaveMode);

  const handleClose = () => {
    setName(initialName);
    setSaveMode(initialSaveMode);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim(), saveMode);
    }
  };

  const handleSaveModeChange = (newSaveMode: "update" | "new") => {
    setSaveMode(newSaveMode);
    if (newSaveMode === "update" && currentComposition) {
      setName(currentComposition.name);
    } else {
      setName("");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={showSaveOptions ? "Save Changes" : "Save Note Breakdown"}
    >
      <S.ModalBody>
        <S.Form onSubmit={handleSubmit}>
          {showSaveOptions && (
            <S.RadioGroup>
              <S.RadioOption>
                <input
                  type="radio"
                  id="update-existing"
                  checked={saveMode === "update"}
                  onChange={() => handleSaveModeChange("update")}
                />
                <label htmlFor="update-existing">Update</label>
              </S.RadioOption>

              <S.RadioOption>
                <input
                  type="radio"
                  id="save-new"
                  checked={saveMode === "new"}
                  onChange={() => handleSaveModeChange("new")}
                />
                <label htmlFor="save-new">Save New</label>
              </S.RadioOption>
            </S.RadioGroup>
          )}

          <S.FormGroup>
            <S.Label htmlFor="composition-name">
              {saveMode === "update" ? "Name" : "Composition Name"}
            </S.Label>
            <S.Input
              id="composition-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Summer Citrus Blend"
              autoFocus
              readOnly={saveMode === "update"}
            />
          </S.FormGroup>

          <S.ButtonGroup>
            <S.Button type="button" $variant="secondary" onClick={handleClose}>
              Cancel
            </S.Button>
            <S.Button type="submit" $variant="primary" disabled={!name.trim()}>
              {saveMode === "update" ? "Update" : "Save"}
            </S.Button>
          </S.ButtonGroup>
        </S.Form>
      </S.ModalBody>
    </Modal>
  );
};
