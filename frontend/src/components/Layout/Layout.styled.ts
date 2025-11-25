import styled from "styled-components";
import { colors } from "../../theme/colors";

export const LayoutContainer = styled.div`
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
