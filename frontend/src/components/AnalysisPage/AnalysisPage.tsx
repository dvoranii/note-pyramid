import * as S from "./AnalysisPage.styled";
import { usePyramid } from "../../context/usePyramid";
import { useFragranceAnalysis } from "../../hooks/useFragranceAnalysis";
import { useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { useLocation, useNavigate } from "react-router-dom";
import { ShareButton } from "../ShareButton/ShareButton";
import { NoteBreakdown } from "../NoteBreakdown/NoteBreakdown";
import { decodeShareableAnalysis } from "../../utils/pyramidEncoding";
import type { ShareableAnalysis } from "../../utils/pyramidEncoding";

const AnalysisPage = () => {
  const { pyramidState, loadPyramidState } = usePyramid();
  const { isLoading, error, result, analyzeFragrance } = useFragranceAnalysis();
  const location = useLocation();
  const navigate = useNavigate();

  const sharedData = useMemo<ShareableAnalysis | null>(() => {
    const params = new URLSearchParams(window.location.search);
    const shareEncoded = params.get("share");

    if (shareEncoded) {
      const decoded = decodeShareableAnalysis(shareEncoded);
      if (decoded) {
        window.history.replaceState({}, "", window.location.pathname);
        return decoded;
      }
    }
    return null;
  }, []);

  const analysisLevel =
    sharedData?.analysisLevel ||
    (location.state?.analysisLevel as "beginner" | "expert") ||
    "beginner";

  const handleBackToPyramid = () => {
    navigate("/");
  };

  useEffect(() => {
    if (sharedData) {
      loadPyramidState(sharedData.composition);
    } else if (
      pyramidState.top.length > 0 &&
      pyramidState.middle.length > 0 &&
      pyramidState.base.length > 0
    ) {
      analyzeFragrance(pyramidState, analysisLevel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayAnalysis = sharedData?.analysis || result?.analysis;
  const displayTimestamp = sharedData?.timestamp || result?.timestamp;

  const analysisResult =
    displayAnalysis && displayTimestamp
      ? { analysis: displayAnalysis, timestamp: displayTimestamp }
      : undefined;

  return (
    <S.AnalysisPageContainer>
      <S.NavigationSection>
        <S.BackButton onClick={handleBackToPyramid}>
          ← Back to Pyramid
        </S.BackButton>
        <ShareButton analysisResult={analysisResult} />
      </S.NavigationSection>

      <S.MainContent>
        <S.Sidebar>
          <S.SidebarTitle>Composition</S.SidebarTitle>
          <NoteBreakdown pyramidState={pyramidState} />
        </S.Sidebar>

        <S.AnalysisSection>
          <S.HeaderSection>
            <h1>Fragrance Analysis</h1>

            {isLoading && (
              <S.LoadingState>
                Generating your fragrance analysis...
              </S.LoadingState>
            )}
          </S.HeaderSection>

          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

          {displayAnalysis && (
            <S.AnalysisResult>
              <h2>Analysis Result</h2>
              {displayTimestamp && (
                <S.Timestamp>
                  Generated: {new Date(displayTimestamp).toLocaleString()}
                </S.Timestamp>
              )}
              <S.AnalysisContent>
                <ReactMarkdown>{displayAnalysis}</ReactMarkdown>
              </S.AnalysisContent>
            </S.AnalysisResult>
          )}
        </S.AnalysisSection>
      </S.MainContent>
    </S.AnalysisPageContainer>
  );
};

export default AnalysisPage;
