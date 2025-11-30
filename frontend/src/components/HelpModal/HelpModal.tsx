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
      maxWidth="800px"
    >
      <S.ModalBody>
        <S.Section>
          <S.SectionTitle>🚀 Getting Started</S.SectionTitle>
          <S.SectionContent>
            <p>
              Create fragrance compositions by dragging notes from the sidebar
              to the pyramid levels.
            </p>
            <p>Generate AI analysis once you have notes in all three levels.</p>
          </S.SectionContent>
        </S.Section>
        <S.GridContainer>
          {/* Column 1: Introduction & Features */}

          <S.GridColumn>
            <S.GridSection
              $borderTop
              $borderLeft
              $borderRight
              $borderBottom
              $borderRadius="0.75rem 0 0 0"
            >
              <S.SectionTitle>🌐 Global Shortcuts</S.SectionTitle>
              <S.ShortcutList>
                <S.ShortcutItem>
                  <S.Keys>Ctrl + K</S.Keys>
                  <S.Description>Toggle keyboard navigation</S.Description>
                </S.ShortcutItem>
                <S.ShortcutItem>
                  <S.Keys>Ctrl + Shift + K</S.Keys>
                  <S.Description>Toggle guide messages</S.Description>
                </S.ShortcutItem>
                <S.ShortcutItem>
                  <S.Keys>`</S.Keys>
                  <S.Description>
                    Switch between sidebar and pyramid
                  </S.Description>
                </S.ShortcutItem>
                <S.ShortcutItem>
                  <S.Keys>Esc</S.Keys>
                  <S.Description>Exit current mode</S.Description>
                </S.ShortcutItem>
              </S.ShortcutList>
            </S.GridSection>
          </S.GridColumn>

          {/* Column 2: Pyramid Shortcuts */}
          <S.GridColumn>
            <S.GridSection
              $borderTop
              $borderRight
              $borderBottom
              $borderRadius="0 0.75rem 0 0"
            >
              <S.SectionTitle>🔺 Pyramid Shortcuts</S.SectionTitle>
              <S.ShortcutList>
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
                  <S.Keys>← →</S.Keys>
                  <S.Description>Navigate notes in level</S.Description>
                </S.ShortcutItem>
              </S.ShortcutList>
            </S.GridSection>
          </S.GridColumn>

          {/* Column 3: Sidebar Shortcuts */}
          <S.GridColumn>
            <S.GridSection
              $borderLeft
              $borderRight
              $borderBottom
              $borderRadius="0 0 0 0.75rem"
            >
              <S.SectionTitle>📁 Sidebar Shortcuts</S.SectionTitle>
              <S.ShortcutList>
                <S.ShortcutItem>
                  <S.Keys>Shift + S</S.Keys>
                  <S.Description>Enter search bar</S.Description>
                </S.ShortcutItem>
                <S.ShortcutItem>
                  <S.Keys>Shift + F</S.Keys>
                  <S.Description>Focus on filter dropdown</S.Description>
                </S.ShortcutItem>
                <S.ShortcutItem>
                  <S.Keys>Shift + N</S.Keys>
                  <S.Description>
                    Enter fragrance notes (when pyramid level selected)
                  </S.Description>
                </S.ShortcutItem>
                <S.ShortcutItem>
                  <S.Keys>Shift + L</S.Keys>
                  <S.Description>Load more notes</S.Description>
                </S.ShortcutItem>
                <S.ShortcutItem>
                  <S.Keys>↑ ↓</S.Keys>
                  <S.Description>Navigate notes/filters</S.Description>
                </S.ShortcutItem>
                <S.ShortcutItem>
                  <S.Keys>Enter</S.Keys>
                  <S.Description>Select note/filter</S.Description>
                </S.ShortcutItem>
              </S.ShortcutList>
            </S.GridSection>
          </S.GridColumn>

          {/* Column 4: Features */}
          <S.GridColumn>
            <S.GridSection
              $borderRight
              $borderBottom
              $borderRadius="0 0 0.75rem 0"
            >
              <S.SectionTitle>✨ Features</S.SectionTitle>
              <S.FeatureList>
                <li>Search and filter fragrance notes</li>
                <li>Drag & drop to pyramid levels</li>
                <li>Save compositions for later use</li>
                <li>Generate AI-powered fragrance analysis</li>
                <li>Share analysis URLs with others</li>
                <li>Keyboard navigation for power users</li>
                <li>Multi-select notes with number keys</li>
                <li>Persistent state across page refreshes</li>
              </S.FeatureList>
            </S.GridSection>
          </S.GridColumn>
        </S.GridContainer>
      </S.ModalBody>
    </Modal>
  );
};
