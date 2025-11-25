import styled from "styled-components";
import { colors } from "../../theme/colors";

export const LevelSelectorContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: ${colors.brown[700]};
  font-size: 0.9rem;
`;

export const Select = styled.select`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${colors.beige[300]};
  background-color: ${colors.white};
  color: ${colors.brown[800]};
  outline: none;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;

  &:focus {
    box-shadow: 0 0 0 2px ${colors.brown[600]};
  }

  &:hover {
    border-color: ${colors.beige[400]};
  }
`;

export const Option = styled.option`
  padding: 0.5rem;
`;
