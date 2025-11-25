import * as S from "./LevelSelector.styled";

interface LevelSelectorProps {
  analysisLevel: "beginner" | "expert";
  onLevelChange: (level: "beginner" | "expert") => void;
}

export const LevelSelector = ({
  analysisLevel,
  onLevelChange,
}: LevelSelectorProps) => {
  return (
    <S.LevelSelectorContainer>
      <S.Label>
        Analysis Level:
        <S.Select
          value={analysisLevel}
          onChange={(e) =>
            onLevelChange(e.target.value as "beginner" | "expert")
          }
        >
          <S.Option value="beginner">Beginner</S.Option>
          <S.Option value="expert">Expert</S.Option>
        </S.Select>
      </S.Label>
    </S.LevelSelectorContainer>
  );
};
