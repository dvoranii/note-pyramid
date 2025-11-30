import styled from "styled-components";
import { colors } from "../../theme/colors";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div<{ $maxWidth: string }>`
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: ${(props) => props.$maxWidth};
  max-height: 92vh;
  overflow-y: auto;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  border-bottom: 1px solid ${colors.beige[200]};
`;

export const ModalTitle = styled.h2`
  color: ${colors.brown[800]};
  margin: 0;
  font-size: 1.25rem;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${colors.brown[600]};
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:hover {
    background-color: ${colors.beige[200]};
  }
`;

export const ModalBody = styled.div`
  padding: 1rem 1.5rem 1.5rem 1.5rem;
`;
