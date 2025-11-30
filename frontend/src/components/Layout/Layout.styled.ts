import styled from "styled-components";
import { colors } from "../../theme/colors";

export const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  /* background-color: ${colors.beige[100]}; */
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
  position: relative;
  background: radial-gradient(
    circle at center,
    #ffffff 0%,
    ${colors.beige[200]} 100%
  );

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

export const HelpIconWrapper = styled.div`
  position: absolute;
  top: 12px;
  left: 18px;
`;

export const HelpIcon = styled.button`
  border-radius: 50%;
  border: 2px solid black;
  width: 20px;
  height: 20px;
  background: transparent;
  color: black;
  font-size: 12px;
  font-weight: bold;
  transition: all 200ms ease;

  &:hover {
    cursor: pointer;
    background: ${colors.brown[900]};
    color: white;
  }
`;
