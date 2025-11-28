import styled from "styled-components";

export const SwitchContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 20px;
  font-size: 0.75rem;
  z-index: 1000;
  cursor: pointer;
  user-select: none;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`;

export const SwitchLabel = styled.span`
  font-weight: 500;
`;

export const Switch = styled.div<{ $isOn: boolean }>`
  width: 40px;
  height: 20px;
  background: ${(props) => (props.$isOn ? "green" : "#666")};
  border-radius: 20px;
  padding: 2px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
`;

export const SwitchThumb = styled.div<{ $isOn: boolean }>`
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s ease;
  transform: ${(props) => (props.$isOn ? "translateX(20px)" : "translateX(0)")};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;
