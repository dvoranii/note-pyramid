import { Request, Response } from "express";
import { GeminiService } from "../services/geminiService.js";

const geminiService = new GeminiService();

export const analyzeFragrance = async (req: Request, res: Response) => {
  try {
    console.log("📥 Received fragrance analysis request:");

    const { composition, analysisLevel } = req.body;

    // Log the structure for debugging
    console.log("🎯 Composition structure:");
    console.log("- Top notes:", composition?.top?.length || 0, "notes");
    console.log("- Middle notes:", composition?.middle?.length || 0, "notes");
    console.log("- Base notes:", composition?.base?.length || 0, "notes");
    console.log("- Analysis level:", analysisLevel);

    // Validate request
    if (
      !composition ||
      !composition.top ||
      !composition.middle ||
      !composition.base
    ) {
      return res.status(400).json({
        error:
          "Invalid composition structure - must include top, middle, and base notes",
        timestamp: new Date().toISOString(),
      });
    }

    if (analysisLevel !== "beginner" && analysisLevel !== "expert") {
      return res.status(400).json({
        error: 'Analysis level must be either "beginner" or "expert"',
        timestamp: new Date().toISOString(),
      });
    }

    // Generate AI analysis
    console.log("🚀 Generating AI analysis...");
    const analysis = await geminiService.analyzeFragrance(
      composition,
      analysisLevel
    );

    console.log("✅ Analysis generated successfully");

    res.json({
      analysis,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Error in analyzeFragrance:", error);

    // Provide more specific error messages
    let errorMessage = "Internal server error";
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        errorMessage = "Gemini API configuration error - check your API key";
      } else if (error.message.includes("Failed to generate")) {
        errorMessage = "AI service temporarily unavailable - please try again";
      } else {
        errorMessage = error.message;
      }
    }

    res.status(500).json({
      error: errorMessage,
      timestamp: new Date().toISOString(),
    });
  }
};
