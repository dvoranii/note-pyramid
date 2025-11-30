import styled from "styled-components";
import { colors } from "../../../theme/colors";

export const Card = styled.div<{
  $isDragging: boolean;
  $isHighlighted?: boolean;
}>`
  background-color: ${colors.white};
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: grab;
  transition: all 0.2s;
  opacity: ${(props) => (props.$isDragging ? 0.5 : 1)};
  min-width: 88px;

  ${(props) =>
    props.$isHighlighted &&
    `
    transform: translateY(-4px);
    box-shadow: 
      0 0 0 3px #10b981,
      0 10px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
    z-index: 10;
  `}

  &:active {
    cursor: grabbing;
  }

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

export const NoteImage = styled.img`
  width: 100%;
  height: 4rem;
  object-fit: cover;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
  user-select: none;
  pointer-events: none;
`;

export const NoteName = styled.p`
  font-size: 0.75rem;
  text-align: center;
  font-weight: 500;
  color: ${colors.brown[800]};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
