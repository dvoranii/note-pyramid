import styled from "styled-components";
import { colors } from "../../theme/colors";

export const SidebarOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: all 0.3s ease;
`;

export const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  background-color: white;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  transform: ${(props) =>
    props.$isOpen ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.3s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

export const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${colors.beige[300]};
  flex-shrink: 0;
`;

export const SidebarTitle = styled.h2`
  color: ${colors.brown[800]};
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${colors.brown[600]};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;

  &:hover {
    background-color: ${colors.beige[200]};
  }
`;

export const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  color: ${colors.brown[600]};

  p {
    margin: 0.5rem 0 0 0;
    font-size: 0.9rem;
  }
`;

export const CompositionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const CompositionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${colors.beige[50]};
  border: 1px solid ${colors.beige[300]};
  border-radius: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${colors.beige[100]};
    border-color: ${colors.beige[400]};
  }
`;

export const CompositionInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const CompositionName = styled.h3`
  color: ${colors.brown[800]};
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CompositionMeta = styled.p`
  color: ${colors.brown[600]};
  font-size: 0.8rem;
  margin: 0;
`;

export const CompositionActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ActionButton = styled.button<{ $variant?: "load" | "delete" }>`
  padding: 0.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s;

  ${(props) =>
    props.$variant === "load"
      ? `
    background-color: ${colors.brown[600]};
    color: white;

    &:hover {
      background-color: ${colors.brown[700]};
    }
  `
      : `
    background-color: ${colors.red[100]};
    color: ${colors.red[700]};

    &:hover {
      background-color: ${colors.red[200]};
    }
  `}
`;

export const ClearAllButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${colors.red[50]};
  color: ${colors.red[700]};
  border: 1px solid ${colors.red[200]};
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 1rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${colors.red[100]};
    border-color: ${colors.red[300]};
  }
`;
