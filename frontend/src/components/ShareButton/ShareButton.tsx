import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { generateAnalysisShareUrl } from "../../utils/pyramidEncoding";
import { usePyramid } from "../../context/usePyramid";
import { useLocation } from "react-router-dom";
import * as S from "./ShareButton.styled";

interface ShareButtonProps {
  analysisResult?: {
    analysis: string;
    timestamp: string;
  };
}

export const ShareButton = ({ analysisResult }: ShareButtonProps) => {
  const { pyramidState } = usePyramid();
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (!analysisResult) return;

    const analysisLevel = location.state?.analysisLevel || "beginner";

    const shareableState = {
      composition: pyramidState,
      analysisLevel: analysisLevel as "beginner" | "expert",
      analysis: analysisResult.analysis,
      timestamp: analysisResult.timestamp,
    };

    const url = generateAnalysisShareUrl(shareableState);
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Only show share button when we have analysis results
  if (!analysisResult) {
    return null;
  }

  return (
    <S.ShareButton onClick={handleShare} disabled={!analysisResult}>
      {copied ? (
        <>
          <Check size={16} /> Copied!
        </>
      ) : (
        <>
          <Share2 size={16} /> Share Analysis
        </>
      )}
    </S.ShareButton>
  );
};
