import styled from "styled-components";

export const PyramidContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 48rem;
  margin-bottom: 2rem;
`;

export const LevelWrapper = styled.div<{ $isSelected?: boolean }>`
  margin-bottom: 1.5rem;
  border-radius: 8px;
  transition: outline 0.2s ease;

  ${(props) =>
    props.$isSelected &&
    `
    outline: 2px solid green;
    outline-offset: 2px;
  `}

  &:last-child {
    margin-bottom: 2rem;
  }
`;
