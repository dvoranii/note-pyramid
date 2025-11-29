// components/HelpModal/HelpModal.tsx
import { Modal } from "../Modal/Modal";
import * as S from "./HelpModal.styled";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal = ({ isOpen, onClose }: HelpModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="How to Use Fragrance Composer"
      maxWidth="600px"
    >
      <S.ModalBody>
        <S.Section>
          <S.SectionTitle>Getting Started</S.SectionTitle>
          <S.SectionContent>
            <p>
              Create fragrance compositions by dragging notes from the sidebar
              to the pyramid levels.
            </p>
            <p>Generate AI analysis once you have notes in all three levels.</p>
          </S.SectionContent>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Keyboard Shortcuts</S.SectionTitle>
          <S.ShortcutList>
            <S.ShortcutItem>
              <S.Keys>Ctrl + K</S.Keys>
              <S.Description>Toggle keyboard navigation</S.Description>
            </S.ShortcutItem>
            <S.ShortcutItem>
              <S.Keys>`</S.Keys>
              <S.Description>Switch between sidebar and pyramid</S.Description>
            </S.ShortcutItem>
            <S.ShortcutItem>
              <S.Keys>1, 2, 3</S.Keys>
              <S.Description>
                Select pyramid levels (Base, Middle, Top)
              </S.Description>
            </S.ShortcutItem>
            <S.ShortcutItem>
              <S.Keys>Enter</S.Keys>
              <S.Description>Enter selected pyramid level</S.Description>
            </S.ShortcutItem>
            <S.ShortcutItem>
              <S.Keys>1-9</S.Keys>
              <S.Description>
                Select/deselect notes in pyramid level
              </S.Description>
            </S.ShortcutItem>
            <S.ShortcutItem>
              <S.Keys>Shift + D</S.Keys>
              <S.Description>Delete highlighted note(s)</S.Description>
            </S.ShortcutItem>
            <S.ShortcutItem>
              <S.Keys>Ctrl + Shift + K</S.Keys>
              <S.Description>Toggle guide messages</S.Description>
            </S.ShortcutItem>
          </S.ShortcutList>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Features</S.SectionTitle>
          <S.FeatureList>
            <li>Search and filter fragrance notes</li>
            <li>Save compositions for later use</li>
            <li>Generate AI-powered fragrance analysis</li>
            <li>Share analysis URLs with others</li>
            <li>Keyboard navigation for power users</li>
          </S.FeatureList>
        </S.Section>
      </S.ModalBody>
    </Modal>
  );
};
