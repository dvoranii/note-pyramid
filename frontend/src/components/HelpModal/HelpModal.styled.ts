// components/HelpModal/HelpModal.styled.ts
import styled from "styled-components";
import { colors } from "../../theme/colors";

export const ModalBody = styled.div`
  padding: 1.5rem;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 1.2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const GridColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

interface GridSectionProps {
  $borderTop?: boolean;
  $borderRight?: boolean;
  $borderBottom?: boolean;
  $borderLeft?: boolean;
}

export const GridSection = styled.div<GridSectionProps>`
  /* border: 1px solid ${colors.beige[400]}; */
  padding: 1.25rem;
  background: ${colors.beige[50]};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  height: 100%;

  border-top: ${(props) =>
    props.$borderTop ? `1px solid ${colors.beige[400]}` : "none"};
  border-right: ${(props) =>
    props.$borderRight ? `1px solid ${colors.beige[400]}` : "none"};
  border-bottom: ${(props) =>
    props.$borderBottom ? `1px solid ${colors.beige[400]}` : "none"};
  border-left: ${(props) =>
    props.$borderLeft ? `1px solid ${colors.beige[400]}` : "none"};
`;

export const Section = styled.div`
  margin-bottom: 0;
`;

// export const SectionTitle = styled.h3`
//   color: ${colors.brown[700]};
//   margin: 0 0 0.75rem 0;
//   font-size: 1.1rem;
//   font-weight: 600;
// `;

export const SectionTitle = styled.h3`
  color: ${colors.brown[700]};
  margin: 0 0 0.75rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${colors.beige[300]};
`;

export const SectionContent = styled.div`
  color: ${colors.brown[600]};
  line-height: 1.5;

  /* p {
    margin: 0 0 0.5rem 0;
  } */
`;

export const ShortcutList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ShortcutItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.25rem 0;
`;

export const Keys = styled.code`
  background: ${colors.beige[200]};
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-family: monospace;
  font-size: 0.75rem;
  color: ${colors.brown[700]};
  text-align: center;
  white-space: nowrap;
`;

export const Description = styled.span`
  color: ${colors.brown[600]};
  flex: 1;
  font-size: 0.75rem;
  line-height: 1.4;
`;

export const FeatureList = styled.ul`
  color: ${colors.brown[600]};
  margin: 0;
  padding-left: 1rem;
  line-height: 1.5;
  font-size: 0.9rem;

  li {
    margin-bottom: 0.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
