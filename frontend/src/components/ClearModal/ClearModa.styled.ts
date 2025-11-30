import styled from "styled-components";
import { colors } from "../../theme/colors";

export const ModalBody = styled.div`
  padding: 1rem 1.5rem 1.5rem 1.5rem;
`;

export const ConfirmationText = styled.p`
  color: ${colors.brown[600]};
  margin: 0 0 1.5rem 0;
  text-align: center;
  line-height: 1.5;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

export const Button = styled.button<{ $variant?: "primary" | "secondary" }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 120px;

  ${(props) =>
    props.$variant === "primary"
      ? `
    background-color: ${colors.brown[600]};
    color: white;
    
    &:hover:not(:disabled) {
      background-color: ${colors.brown[900]};
    }
  `
      : `
    background-color: ${colors.beige[200]};
    color: ${colors.brown[700]};
    
    &:hover {
      background-color: ${colors.beige[300]};
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
