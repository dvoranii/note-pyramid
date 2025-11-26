import styled from "styled-components";
import { colors } from "../../theme/colors";

export const NoteBreakdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SectionTitle = styled.h4`
  color: ${colors.brown[700]};
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const NotesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const NoteItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background-color: ${colors.beige[50]};
  border-radius: 0.375rem;
  border: 1px solid ${colors.beige[300]};
`;

export const NoteImage = styled.img`
  width: 2rem;
  height: 2rem;
  object-fit: cover;
  border-radius: 0.25rem;
  flex-shrink: 0;
`;

export const NoteName = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${colors.brown[700]};
`;
