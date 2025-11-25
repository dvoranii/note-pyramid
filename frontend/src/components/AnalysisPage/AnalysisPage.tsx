import * as S from "./AnalysisPage.styled";
import { usePyramid } from "../../context/usePyramid";
import { useFragranceAnalysis } from "../../hooks/useFragranceAnalysis";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useLocation, useNavigate } from "react-router-dom";
import { ShareButton } from "../ShareButton/ShareButton";

const AnalysisPage = () => {
  const { pyramidState } = usePyramid();
  const { isLoading, error, result, analyzeFragrance } = useFragranceAnalysis();
  const location = useLocation();
  const navigate = useNavigate();

  const analysisLevel =
    (location.state?.analysisLevel as "beginner" | "expert") || "beginner";

  const handleBackToPyramid = () => {
    navigate("/");
  };

  useEffect(() => {
    if (
      pyramidState.top.length > 0 &&
      pyramidState.middle.length > 0 &&
      pyramidState.base.length > 0
    ) {
      analyzeFragrance(pyramidState, analysisLevel);
    }
  }, []);

  const hasResult = !!result;

  return (
    <S.AnalysisPageContainer>
      <S.ContentWrapper $hasResult={hasResult}>
        <S.HeaderSection>
          <S.NavigationSection>
            <S.BackButton onClick={handleBackToPyramid}>
              ← Back to Pyramid
            </S.BackButton>
            <ShareButton />
          </S.NavigationSection>
          <h1>Fragrance Analysis</h1>

          {isLoading && (
            <S.LoadingState>
              Generating your fragrance analysis...
            </S.LoadingState>
          )}
        </S.HeaderSection>

        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

        {result && (
          <S.AnalysisResult>
            <h2>Analysis Result</h2>
            <S.AnalysisContent>
              <ReactMarkdown>{result.analysis}</ReactMarkdown>
            </S.AnalysisContent>
          </S.AnalysisResult>
        )}
      </S.ContentWrapper>
    </S.AnalysisPageContainer>
  );
};

export default AnalysisPage;
