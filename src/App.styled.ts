import styled from "styled-components";
import { colors } from "./theme/colors";

export const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${colors.beige[100]};
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
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
