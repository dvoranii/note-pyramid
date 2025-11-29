// components/HelpModal/HelpModal.styled.ts
import styled from "styled-components";
import { colors } from "../../theme/colors";

export const ModalBody = styled.div`
  padding: 0 1.5rem 1.5rem 1.5rem;
`;

export const Section = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h3`
  color: ${colors.brown[700]};
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
`;

export const SectionContent = styled.div`
  color: ${colors.brown[600]};
  line-height: 1.5;

  p {
    margin: 0 0 0.5rem 0;
  }
`;

export const ShortcutList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ShortcutItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.25rem 0;
`;

export const Keys = styled.code`
  background: ${colors.beige[200]};
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-family: monospace;
  font-size: 0.9rem;
  color: ${colors.brown[700]};
  min-width: 120px;
  text-align: center;
`;

export const Description = styled.span`
  color: ${colors.brown[600]};
  flex: 1;
`;

export const FeatureList = styled.ul`
  color: ${colors.brown[600]};
  margin: 0;
  padding-left: 1.5rem;
  line-height: 1.5;

  li {
    margin-bottom: 0.25rem;
  }
`;
