import styled from "styled-components";
import { colors } from "../../theme/colors";

export const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${colors.beige[100]};
  overflow: hidden;
`;

export const MainContent = styled.main<{
  $fullWidth?: boolean;
  $isActive?: boolean;
}>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  ${(props) =>
    props.$fullWidth &&
    `
    margin-left: 0;
    width: 100%;
  `}

  ${(props) =>
    !props.$fullWidth &&
    props.$isActive &&
    `
    outline: 2px solid ${colors.brown[900]};
    outline-offset: -2px;
    border-radius: 8px;
    transition: outline-color 0.2s ease;
  `}
`;

export const SidebarWrapper = styled.div<{ $isActive?: boolean }>`
  outline: ${(props) =>
    props.$isActive
      ? `2px solid ${colors.brown[900]}`
      : "2px solid transparent"};
  outline-offset: -2px;
  border-radius: 8px;
  transition: border-color 0.2s ease;

  box-sizing: border-box;
`;
