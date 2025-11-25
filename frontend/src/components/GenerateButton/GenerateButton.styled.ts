import styled from "styled-components";
import { colors } from "../../theme/colors";

export const Button = styled.button<{ $disabled: boolean }>`
  padding: 1rem 3rem;
  border-radius: 9999px;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${colors.white};
  background-color: ${(props) =>
    props.$disabled ? colors.beige[400] : colors.brown[800]};
  border: none;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  transition: all 0.2s;
  box-shadow: ${(props) =>
    props.$disabled ? "none" : "0 10px 15px -3px rgba(0, 0, 0, 0.1)"};

  &:hover {
    background-color: ${(props) =>
      props.$disabled ? colors.beige[400] : colors.brown[900]};
    transform: ${(props) => (props.$disabled ? "none" : "scale(1.05)")};
  }

  &:active {
    transform: ${(props) => (props.$disabled ? "none" : "scale(0.95)")};
  }
`;
