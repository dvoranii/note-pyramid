import styled from "styled-components";
import { colors } from "../../theme/colors";

export const ModalBody = styled.div`
  padding: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 500;
  color: ${colors.brown[700]};
  font-size: 0.9rem;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${colors.beige[300]};
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${colors.brown[600]};
    box-shadow: 0 0 0 2px ${colors.brown[600]};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.2rem;
`;

export const Button = styled.button<{ $variant?: "primary" | "secondary" }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.$variant === "primary"
      ? `
    background-color: ${colors.brown[600]};
    color: white;
    
    &:hover:not(:disabled) {
      background-color: ${colors.brown[700]};
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

export const RadioGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;

  input[type="radio"] {
    margin: 0;
    accent-color: ${colors.brown[600]};
    cursor: pointer;

    &:focus {
      outline: 2px solid ${colors.brown[600]};
      outline-offset: 2px;
    }
  }

  label {
    font-size: 0.9rem;
    color: ${colors.brown[700]};
    cursor: pointer;
    line-height: 1.4;

    &:hover {
      color: ${colors.brown[800]};
    }
  }
`;

export const HelpTextContainer = styled.div`
  min-height: 1.25rem;
  display: flex;
  align-items: center;
`;

export const HelpText = styled.p`
  font-size: 0.8rem;
  color: ${colors.brown[600]};
  margin: 0.25rem 0 0 0;
  font-style: italic;
  line-height: 1.3;
`;
