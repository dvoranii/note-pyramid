import styled from "styled-components";
import { colors } from "../../theme/colors";

export const AnalysisPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  overflow-y: scroll;
`;

export const LevelSelector = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const AnalyzeButton = styled.button`
  padding: 1rem 2rem;
  background-color: ${colors.brown[600]};
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;

  &:disabled {
    background-color: ${colors.brown[600]};
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  padding: 1rem;
  border: 1px solid red;
  border-radius: 0.5rem;
  background-color: #ffe6e6;
`;

export const AnalysisResult = styled.div`
  width: 100%;
  padding: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid ${colors.beige[300]};

  pre {
    white-space: pre-wrap;
    font-family: inherit;
    line-height: 1.5;
  }
`;
