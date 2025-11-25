import styled from "styled-components";
import { colors } from "../../theme/colors";

export const ShareButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: ${colors.beige[300]};
  color: ${colors.brown[800]};
  border: 1px solid ${colors.beige[400]};
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: ${colors.beige[400]};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
