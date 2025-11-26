import * as S from "./NoteBreakdown.styled";
import type { PyramidState } from "../../types";

interface NoteBreakdownProps {
  pyramidState: PyramidState;
}

export const NoteBreakdown = ({ pyramidState }: NoteBreakdownProps) => {
  return (
    <S.NoteBreakdownContainer>
      <S.Section>
        <S.SectionTitle>Top Notes</S.SectionTitle>
        <S.NotesList>
          {pyramidState.top.map((note) => (
            <S.NoteItem key={note.id}>
              <S.NoteImage src={note.high_res_image} alt={note.name} />
              <S.NoteName>{note.name}</S.NoteName>
            </S.NoteItem>
          ))}
        </S.NotesList>
      </S.Section>

      <S.Section>
        <S.SectionTitle>Middle Notes</S.SectionTitle>
        <S.NotesList>
          {pyramidState.middle.map((note) => (
            <S.NoteItem key={note.id}>
              <S.NoteImage src={note.high_res_image} alt={note.name} />
              <S.NoteName>{note.name}</S.NoteName>
            </S.NoteItem>
          ))}
        </S.NotesList>
      </S.Section>

      <S.Section>
        <S.SectionTitle>Base Notes</S.SectionTitle>
        <S.NotesList>
          {pyramidState.base.map((note) => (
            <S.NoteItem key={note.id}>
              <S.NoteImage src={note.high_res_image} alt={note.name} />
              <S.NoteName>{note.name}</S.NoteName>
            </S.NoteItem>
          ))}
        </S.NotesList>
      </S.Section>
    </S.NoteBreakdownContainer>
  );
};
