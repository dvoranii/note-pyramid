import LZString from "lz-string";
import type { PyramidState } from "../types";

export interface ShareableAnalysis {
  composition: PyramidState;
  analysisLevel: "beginner" | "expert";
  analysis: string;
  timestamp: string;
}

export const encodeShareableAnalysis = (state: ShareableAnalysis): string => {
  const json = JSON.stringify(state);
  return LZString.compressToEncodedURIComponent(json);
};

export const decodeShareableAnalysis = (
  encoded: string
): ShareableAnalysis | null => {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    return json ? JSON.parse(json) : null;
  } catch {
    return null;
  }
};

export const generateAnalysisShareUrl = (state: ShareableAnalysis): string => {
  const encoded = encodeShareableAnalysis(state);

  const basePath = import.meta.env.BASE_URL || "/";

  const normalizedBase = basePath.endsWith("/")
    ? basePath.slice(0, -1)
    : basePath;

  return `${window.location.origin}${normalizedBase}/analysis?share=${encoded}`;
};
