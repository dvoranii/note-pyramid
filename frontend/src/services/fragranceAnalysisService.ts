import type { PyramidState, AnalysisResult } from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || `${import.meta.env.BASE_URL}/api`;

export class FragranceAnalysisService {
  static async analyzeFragrance(
    pyramidState: PyramidState,
    analysisLevel: "beginner" | "expert"
  ): Promise<AnalysisResult> {
    const response = await fetch(`${API_BASE_URL}/fragrance/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        composition: pyramidState,
        analysisLevel,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate analysis");
    }

    return await response.json();
  }
}
