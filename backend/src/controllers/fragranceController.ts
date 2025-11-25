import { Request, Response } from "express";

export const analyzeFragrance = async (req: Request, res: Response) => {
  try {
    console.log("📥 Received fragrance analysis request:");
    console.log("Request body:", JSON.stringify(req.body, null, 2));

    const { composition, analysisLevel } = req.body;

    // Log the structure for debugging
    console.log("🎯 Composition structure:");
    console.log("- Top notes:", composition?.top?.length || 0, "notes");
    console.log("- Middle notes:", composition?.middle?.length || 0, "notes");
    console.log("- Base notes:", composition?.base?.length || 0, "notes");
    console.log("- Analysis level:", analysisLevel);

    if (composition?.top) {
      console.log(
        "🔝 Top notes:",
        composition.top.map((n: any) => n.name)
      );
    }
    if (composition?.middle) {
      console.log(
        "💖 Middle notes:",
        composition.middle.map((n: any) => n.name)
      );
    }
    if (composition?.base) {
      console.log(
        "📦 Base notes:",
        composition.base.map((n: any) => n.name)
      );
    }

    // Send back a simple success response for now
    res.json({
      analysis:
        "Backend received your data successfully! Gemini integration coming soon.",
      timestamp: new Date().toISOString(),
      receivedData: {
        topNotes: composition?.top?.map((n: any) => n.name) || [],
        middleNotes: composition?.middle?.map((n: any) => n.name) || [],
        baseNotes: composition?.base?.map((n: any) => n.name) || [],
        analysisLevel,
      },
    });
  } catch (error) {
    console.error("❌ Error in analyzeFragrance:", error);
    res.status(500).json({
      error: "Internal server error",
      timestamp: new Date().toISOString(),
    });
  }
};
