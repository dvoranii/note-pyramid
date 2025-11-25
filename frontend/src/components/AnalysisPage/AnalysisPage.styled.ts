import styled from "styled-components";
import { colors } from "../../theme/colors";

export const AnalysisPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  height: 100%;
  max-height: 100%;
`;

export const ContentWrapper = styled.div<{ $hasResult: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  height: 100%;

  justify-content: ${(props) => (props.$hasResult ? "flex-start" : "center")};
  padding: 2rem 0;
`;

// In AnalysisPage.styled.ts
export const ScrollContainer = styled.div`
  width: 100%;
  /* 👇 This is the essential fix! */
  flex: 1;
  min-height: 0;

  overflow-y: auto;
  padding: 1rem 0;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${colors.beige[200]};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.beige[400]};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${colors.beige[400]};
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  text-align: center;
  flex-shrink: 0; /* Prevent shrinking when content is long */
`;

export const LevelSelector = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    color: ${colors.brown[700]};
  }

  select {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid ${colors.beige[300]};
    background-color: ${colors.white};
    color: ${colors.brown[800]};
    outline: none;
    cursor: pointer;
    transition: all 0.2s;

    &:focus {
      box-shadow: 0 0 0 2px ${colors.brown[600]};
    }
  }
`;

export const AnalyzeButton = styled.button`
  padding: 1rem 2rem;
  background-color: ${colors.brown[600]};
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s;
  min-width: 200px;

  &:hover:not(:disabled) {
    background-color: ${colors.brown[700]};
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: ${colors.brown[600]};
    cursor: not-allowed;
    transform: none;
  }
`;

export const ErrorMessage = styled.div`
  color: ${colors.red[600]};
  padding: 1rem;
  border: 1px solid ${colors.red[300]};
  border-radius: 0.5rem;
  background-color: ${colors.red[50]};
  width: 100%;
  text-align: center;
  max-width: 500px;
  flex-shrink: 0;
`;

export const AnalysisResult = styled.div`
  width: 100%;
  padding: 2rem;
  background-color: white;
  border-radius: 1rem;
  border: 1px solid ${colors.beige[300]};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  flex-shrink: 0; /* Prevent shrinking */
`;

export const AnalysisContent = styled.div`
  font-family: inherit;
  line-height: 1.8;
  color: ${colors.brown[700]};
  font-size: 0.95rem;

  /* Headers */
  h1,
  h2 {
    color: ${colors.brown[900]};
    font-size: 1.5rem;
    font-weight: 700;
    margin: 2rem 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid ${colors.beige[300]};
  }

  h3 {
    color: ${colors.brown[800]};
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1.75rem 0 0.75rem 0;
  }

  h4 {
    color: ${colors.brown[700]};
    font-size: 1.1rem;
    font-weight: 600;
    margin: 1.25rem 0 0.5rem 0;
  }

  /* Paragraphs */
  p {
    margin-bottom: 1.25rem;
    line-height: 1.8;
  }

  /* Lists */
  ul,
  ol {
    margin: 1rem 0 1.5rem 1.5rem;
    padding-left: 0.5rem;
  }

  li {
    margin-bottom: 0.75rem;
    line-height: 1.7;
  }

  ul li {
    list-style-type: disc;
  }

  /* Nested lists */
  ul ul,
  ol ol {
    margin: 0.5rem 0 0.5rem 1rem;
  }

  /* Bold text */
  strong {
    color: ${colors.brown[900]};
    font-weight: 600;
  }

  /* Italic text */
  em {
    font-style: italic;
    color: ${colors.brown[600]};
  }

  /* Blockquotes */
  blockquote {
    border-left: 4px solid ${colors.beige[400]};
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: ${colors.brown[600]};
  }

  /* Code blocks (if any) */
  code {
    background-color: ${colors.beige[100]};
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-family: "Courier New", monospace;
    font-size: 0.9em;
  }

  pre {
    background-color: ${colors.beige[100]};
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1rem 0;
  }

  pre code {
    background: none;
    padding: 0;
  }

  /* Links */
  a {
    color: ${colors.brown[600]};
    text-decoration: underline;

    &:hover {
      color: ${colors.brown[800]};
    }
  }

  /* Horizontal rule */
  hr {
    border: none;
    border-top: 1px solid ${colors.beige[300]};
    margin: 2rem 0;
  }
`;

export const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  color: ${colors.brown[600]};
  flex-shrink: 0;

  &::after {
    content: "";
    width: 2rem;
    height: 2rem;
    border: 2px solid ${colors.beige[300]};
    border-top: 2px solid ${colors.brown[600]};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
