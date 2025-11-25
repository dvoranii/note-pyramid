import styled from "styled-components";
import { colors } from "../../theme/colors";

export const PyramidBuilderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
