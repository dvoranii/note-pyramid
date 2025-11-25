import * as S from "./AnalysisPage.styled";
import { usePyramid } from "../../context/usePyramid";
import { useFragranceAnalysis } from "../../hooks/useFragranceAnalysis";
import { useState } from "react";

const AnalysisPage = () => {
  const { pyramidState } = usePyramid();
  const { isLoading, error, result, analyzeFragrance } = useFragranceAnalysis();
  const [analysisLevel, setAnalysisLevel] = useState<"beginner" | "expert">(
    "beginner"
  );

  const handleAnalyze = () => {
    analyzeFragrance(pyramidState, analysisLevel);
  };

  return (
    <S.AnalysisPageContainer>
      <h1>Fragrance Analysis</h1>

      <S.LevelSelector>
        <label>
          Analysis Level:
          <select
            value={analysisLevel}
            onChange={(e) =>
              setAnalysisLevel(e.target.value as "beginner" | "expert")
            }
          >
            <option value="beginner">Beginner</option>
            <option value="expert">Expert</option>
          </select>
        </label>
      </S.LevelSelector>

      <S.AnalyzeButton onClick={handleAnalyze} disabled={isLoading}>
        {isLoading ? "Analyzing..." : "Generate Analysis"}
      </S.AnalyzeButton>

      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

      {result && (
        <S.AnalysisResult>
          <h2>Analysis Result</h2>
          <pre>{result.analysis}</pre>
        </S.AnalysisResult>
      )}
    </S.AnalysisPageContainer>
  );
};

export default AnalysisPage;
