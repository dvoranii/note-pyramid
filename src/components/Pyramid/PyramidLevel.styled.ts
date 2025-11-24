import styled from "styled-components";
import { colors } from "../../theme/colors";
import {
  getLevelAspectRatio,
  getLevelWidthPercentage,
  getLevelMaxWidth,
  getSlotScale,
  getSlotBackgroundColor,
  getSlotBorder,
} from "../../styles/pyramidStyleUtils";
// import { getHeaderPosition } from "../../utils/pyramidUtils";

export const LevelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
`;

export const LevelHeader = styled.div<{
  $isFull: boolean;
  //   $level: "top" | "middle" | "base";
}>`
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translateX(-50%) translateY(70%);
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${(props) => (props.$isFull ? "#f0f9ff" : "white")};
  color: ${(props) => (props.$isFull ? "#0369a1" : "#6b7280")};
  padding: 0px 12px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 12px;
  font-weight: ${(props) => (props.$isFull ? "600" : "400")};
  z-index: 10;
  border: 1px solid ${(props) => (props.$isFull ? "#bae6fd" : "transparent")};

  &::before {
    content: "${(props) => (props.$isFull ? "✓" : "•")}";
    font-size: 16px;
  }
`;

export const LevelBox = styled.div<{
  $level: "top" | "middle" | "base";
  $isOver: boolean;
}>`
  position: relative;
  width: ${(props) => getLevelWidthPercentage(props.$level)};
  aspect-ratio: ${(props) => getLevelAspectRatio(props.$level)};
  max-width: ${(props) => getLevelMaxWidth(props.$level)};
  transition: all 0.2s;
`;

// Background pyramid shape
export const PyramidBackground = styled.img<{
  $isOver: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const CombinedGrid = styled.div<{
  $level: "top" | "middle" | "base";
  $columns: number;
  $totalItems: number;
  $hasNotes: boolean;
  $width?: string;
  $gap?: string;
  $hasMultipleRows?: boolean;
  $hasExtraColumn?: boolean;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  width: ${(props) => props.$width || "80%"};
  grid-template-columns: ${(props) => `repeat(${props.$columns}, 1fr)`};
  gap: ${(props) => props.$gap || "clamp(1.2rem, 4vw, 2rem)"};
  z-index: ${(props) => (props.$hasNotes ? 1 : 0)};
  justify-items: center;
  align-items: center;
`;

// Single slot component that can be either a placeholder or a note
export const Slot = styled.div<{
  $level: "top" | "middle" | "base";
  $hasNote: boolean;
  $isPlaceholder?: boolean;
  $isEmpty?: boolean;
  $totalItems: number;
  $hasMultipleRows?: boolean;
  $hasExtraColumn?: boolean;
}>`
  width: 70px;
  height: 70px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    getSlotBackgroundColor(props.$hasNote, props.$isPlaceholder)};
  border: ${(props) => getSlotBorder(props.$isPlaceholder)};
  transform: ${(props) =>
    `scale(${getSlotScale(
      props.$level,
      props.$totalItems,
      props.$hasMultipleRows,
      props.$hasExtraColumn
    )})`};
  transform-origin: center;
  transition: all 0.2s;

  ${(props) =>
    props.$hasNote &&
    `
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  `}

  ${(props) =>
    props.$isPlaceholder &&
    `
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  `}

  @media screen and (max-width: 1128px) {
    width: 6.2vw;
    height: 6.2vw;
  }
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
