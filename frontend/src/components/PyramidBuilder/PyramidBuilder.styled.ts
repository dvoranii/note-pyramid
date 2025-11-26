import styled from "styled-components";
import { colors } from "../../theme/colors";

export const PyramidBuilderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

export const Title = styled.h1`
  color: ${colors.brown[900]};
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
`;

export const SaveNotesButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${colors.beige[300]};
  color: ${colors.brown[800]};
  border: 1px solid ${colors.beige[400]};
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: ${colors.beige[400]};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SavedNotesButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${colors.brown[600]};
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: ${colors.brown[700]};
    transform: translateY(-1px);
  }
`;

export const DragOverlayCard = styled.div`
  background-color: ${colors.white};
  border-radius: 0.5rem;
  padding: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 2px solid ${colors.brown[600]};
  opacity: 0.9;

  img {
    width: 3rem;
    height: 3rem;
    object-fit: cover;
    border-radius: 0.25rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.75rem;
    text-align: center;
    font-weight: 500;
    color: ${colors.brown[800]};
  }
`;

export const ControlSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
