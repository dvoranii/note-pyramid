import { useState } from "react";
import type { PyramidState, AnalysisResult } from "../types";
import { FragranceAnalysisService } from "../services/fragranceAnalysisService";

export const useFragranceAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeFragrance = async (
    pyramidState: PyramidState,
    analysisLevel: "beginner" | "expert"
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await FragranceAnalysisService.analyzeFragrance(
        pyramidState,
        analysisLevel
      );
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const clearResult = () => {
    setResult(null);
    setError(null);
  };

  return {
    isLoading,
    error,
    result,
    analyzeFragrance,
    clearResult,
  };
};
