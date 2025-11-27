import * as S from "./ShareButton.styled";
import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { generateAnalysisShareUrl } from "../../utils/pyramidEncoding";
import { usePyramid } from "../../context/PyramidContext/usePyramid";
import { useLocation } from "react-router-dom";
import { shortenUrlWithTinyUrl } from "../../utils/urlShortener";

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
  const [isShortening, setIsShortening] = useState(false);

  const handleShare = async () => {
    if (!analysisResult) return;

    setIsShortening(true);

    try {
      const analysisLevel = location.state?.analysisLevel || "beginner";

      const shareableState = {
        composition: pyramidState,
        analysisLevel: analysisLevel as "beginner" | "expert",
        analysis: analysisResult.analysis,
        timestamp: analysisResult.timestamp,
      };

      const longUrl = generateAnalysisShareUrl(shareableState);

      const shortUrl = await shortenUrlWithTinyUrl(longUrl);

      await navigator.clipboard.writeText(shortUrl);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to share:", error);
      alert("Failed to create share link. Please try again.");
    } finally {
      setIsShortening(false);
    }
  };

  if (!analysisResult) {
    return null;
  }

  return (
    <S.ShareButton
      onClick={handleShare}
      disabled={!analysisResult || isShortening}
    >
      {isShortening ? (
        <>
          <Share2 size={16} className="animate-pulse" /> Shortening...
        </>
      ) : copied ? (
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
