import styled from "styled-components";
import { colors } from "../../theme/colors";

export const SidebarContainer = styled.div`
  width: 20rem;
  background-color: ${colors.beige[50]};
  border-right: 1px solid ${colors.beige[300]};
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const SearchSection = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${colors.beige[300]};
`;

export const SearchWrapper = styled.div`
  position: relative;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border-radius: 9999px;
  border: 1px solid ${colors.beige[300]};
  background-color: ${colors.white};
  outline: none;
  transition: all 0.2s;

  &:focus {
    box-shadow: 0 0 0 2px ${colors.brown[600]};
  }

  &::placeholder {
    color: ${colors.brown[600]};
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.brown[600]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FilterSection = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${colors.beige[300]};
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${colors.beige[300]};
  background-color: ${colors.white};
  color: ${colors.brown[800]};
  outline: none;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    box-shadow: 0 0 0 2px ${colors.brown[600]};
  }
`;

export const NotesSection = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

export const NotesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
`;

export const LoadMoreButton = styled.button`
  width: 100%;
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: ${colors.beige[200]};
  color: ${colors.brown[700]};
  font-weight: 500;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.beige[300]};
  }
`;

export const NoResults = styled.div`
  text-align: center;
  color: ${colors.brown[600]};
  padding: 2rem 0;
`;
