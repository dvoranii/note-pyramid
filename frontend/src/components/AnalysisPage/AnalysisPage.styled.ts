import styled from "styled-components";
import { colors } from "../../theme/colors";

export const AnalysisPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 1rem 2rem;
  background-color: ${colors.beige[100]};
`;

export const NavigationSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
  flex-shrink: 0;
`;

export const BackButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${colors.beige[300]};
  color: ${colors.brown[800]};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: ${colors.beige[400]};
  }
`;

export const MainContent = styled.div`
  display: flex;
  gap: 2rem;
  height: calc(100vh - 80px); /* Account for navigation */
  flex: 1;
  min-height: 0;
`;

export const Sidebar = styled.div`
  width: 280px;
  flex-shrink: 0;
  background-color: white;
  border-radius: 1rem;
  border: 1px solid ${colors.beige[300]};
  padding: 1.5rem;
  height: 90%;
  overflow-y: auto;
  margin-top: 4.6rem;
`;

export const SidebarTitle = styled.h3`
  color: ${colors.brown[800]};
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${colors.beige[300]};
  text-align: center;
`;

export const AnalysisSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-shrink: 0;
  border-bottom: 1px solid lightgrey;
  padding-bottom: 2rem;

  h1 {
    color: ${colors.brown[900]};
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    text-align: center;
  }
`;

export const AnalysisResult = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 1rem;
  border: 1px solid ${colors.beige[300]};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  padding: 2rem;

  /* Fade-in animation */
  animation: fadeInUp 0.5s ease-out forwards;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
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

export const ErrorMessage = styled.div`
  color: ${colors.red[600]};
  padding: 1rem;
  border: 1px solid ${colors.red[300]};
  border-radius: 0.5rem;
  background-color: ${colors.red[50]};
  width: 100%;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
`;

export const Timestamp = styled.p``;
