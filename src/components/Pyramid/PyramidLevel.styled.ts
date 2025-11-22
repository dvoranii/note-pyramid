import styled from "styled-components";
import { colors } from "../../theme/colors";

export const LevelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LevelLabel = styled.div`
  color: ${colors.brown[800]};
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
`;

const getLevelWidth = (level: "top" | "middle" | "base") => {
  if (level === "top") return "66.666667%";
  if (level === "middle") return "83.333333%";
  return "100%";
};

const getGradientColors = (level: "top" | "middle" | "base") => {
  if (level === "top") {
    return `linear-gradient(to bottom, ${colors.beige[200]}, ${colors.beige[300]})`;
  }
  if (level === "middle") {
    return `linear-gradient(to bottom, ${colors.beige[300]}, ${colors.beige[400]})`;
  }
  return `linear-gradient(to bottom, ${colors.brown[700]}, ${colors.brown[800]})`;
};

export const LevelBox = styled.div<{
  $level: "top" | "middle" | "base";
  $isOver: boolean;
}>`
  background: ${(props) => getGradientColors(props.$level)};
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  width: ${(props) => getLevelWidth(props.$level)};

  ${(props) =>
    props.$isOver &&
    `
    box-shadow: 0 0 0 4px ${colors.brown[600]};
    transform: scale(1.05);
  `}
`;

const getGridColumns = (level: "top" | "middle" | "base") => {
  if (level === "top") return "repeat(4, 1fr)";
  if (level === "middle") return "repeat(6, 1fr)";
  return "repeat(4, 1fr)";
};

export const SlotsGrid = styled.div<{ $level: "top" | "middle" | "base" }>`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: ${(props) => getGridColumns(props.$level)};
`;

export const Slot = styled.div<{ $hasNote: boolean }>`
  aspect-ratio: 1;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.$hasNote ? colors.white : "rgba(255, 255, 255, 0.3)"};
  ${(props) =>
    !props.$hasNote &&
    `
    border: 2px dashed rgba(255, 255, 255, 0.5);
  `}
  ${(props) =>
    props.$hasNote &&
    `
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  `}
`;

export const NoteContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0.5rem;

  &:hover button {
    opacity: 1;
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background-color: ${colors.red};
  color: ${colors.white};
  border-radius: 9999px;
  padding: 0.25rem;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #dc2626;
  }
`;

export const NoteImageInSlot = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.25rem;
`;
