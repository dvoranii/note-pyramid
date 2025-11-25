import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { generateShareableUrl } from "../../utils/pyramidEncoding";
import { usePyramid } from "../../context/usePyramid";
import * as S from "./ShareButton.styled";

export const ShareButton = () => {
  const { pyramidState, canGenerate } = usePyramid();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = generateShareableUrl(pyramidState);
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <S.ShareButton onClick={handleShare} disabled={!canGenerate}>
      {copied ? (
        <>
          <Check size={16} /> Copied!
        </>
      ) : (
        <>
          <Share2 size={16} /> Share Composition
        </>
      )}
    </S.ShareButton>
  );
};
