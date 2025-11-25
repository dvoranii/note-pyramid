import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export class GeminiService {
  private model;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  }

  async analyzeFragrance(
    composition: any,
    analysisLevel: "beginner" | "expert"
  ): Promise<string> {
    try {
      const prompt = this.buildPrompt(composition, analysisLevel);
      console.log("🤖 Sending prompt to Gemini API...");

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const analysis = response.text();

      console.log("✅ Gemini API response received");
      return analysis;
    } catch (error) {
      console.error("❌ Gemini API Error:", error);
      throw new Error("Failed to generate fragrance analysis");
    }
  }

  private buildPrompt(
    composition: any,
    analysisLevel: "beginner" | "expert"
  ): string {
    const systemPrompt = `
  You are an expert perfumer and fragrance analyst with 20 years of experience. Analyze the given fragrance composition with BALANCE and OBJECTIVITY. Provide insightful analysis about how the notes work together, noting both strengths and limitations.
  
  BALANCED ANALYSIS GUIDELINES:
  - Start with a neutral, objective assessment of the composition
  - Acknowledge what works well in the composition before noting limitations
  - Only provide constructive criticism when there are clear compositional issues
  - If the composition resembles successful commercial fragrances, focus on why those structures work
  - Consider that fragrance preference is subjective - focus on objective structural analysis
  - For compositions that follow proven successful patterns, highlight their commercial viability
  - Reserve critical feedback for genuinely problematic combinations (clashing notes, structural imbalances, etc.)
  
  FRAGRANCE COMPARISON REQUIREMENTS:
  - Compare this composition to well-known existing fragrances when clear similarities exist
  - Look for similar note structures, accords, or overall profiles
  - Mention specific fragrance names when the resemblance is strong
  - Note both similarities AND differences between this composition and referenced fragrances
  - Include comparisons to popular niche, designer, and celebrity fragrances
  - If the composition matches a known successful fragrance profile, acknowledge this positively
  
  For BEGINNER level:
  - Use accessible, educational language
  - Focus on helping the user understand how fragrances work
  - Explain concepts clearly without overwhelming with criticism
  - Be encouraging and focus on learning opportunities
  - When noting limitations, frame them as "considerations" rather than "flaws"
  
  For EXPERT level:
  - Use appropriate perfumery terminology
  - Provide technical insights about note interactions
  - Discuss structural considerations professionally
  - Offer sophisticated comparisons and market context
  - Maintain an objective, analytical tone rather than judgmental
  
  SPECIAL ANALYSIS CASES:
  - If composition closely matches a successful fragrance: "This structure follows the proven profile of [Fragrance Name], which is known for..."
  - If all notes are from the same category: "This creates a focused, linear fragrance that emphasizes [category] notes. While this approach creates clarity, it may have less evolution than more complex compositions."
  - If composition is minimalist: "This streamlined approach creates a clear, unambiguous scent profile that's easy to understand and wear."
  - Only if notes clearly clash: "These notes may create challenging interactions because [specific reason]. Consider [adjustment] for better harmony."
  - If composition lacks structural balance: "The distribution of notes across the pyramid might benefit from [suggestion] to improve longevity and development."
  
  Structure your analysis with these sections:
  1. Overall Composition Profile (Neutral assessment)
  2. Opening Experience (Top Notes) 
  3. Heart Development (Middle Notes)
  4. Foundation & Evolution (Base Notes)
  5. Market Context & Comparisons (When applicable)
  6. Wearability & Recommendations
  7. Considerations & Alternatives (Only if needed)
  `;

    const compositionText = `
  FRAGRANCE COMPOSITION TO ANALYZE:
  
  TOP NOTES:
  ${composition.top
    .map((note: any) => `- ${note.name} (${note.category})`)
    .join("\n")}
  
  MIDDLE NOTES:
  ${composition.middle
    .map((note: any) => `- ${note.name} (${note.category})`)
    .join("\n")}
  
  BASE NOTES:
  ${composition.base
    .map((note: any) => `- ${note.name} (${note.category})`)
    .join("\n")}
  
  ANALYSIS LEVEL: ${analysisLevel.toUpperCase()}
  
  IMPORTANT: 
  1. Provide balanced, objective analysis. Start with what works before noting considerations.
  2. When the composition resembles successful fragrances, focus on why those structures work.
  3. Only provide critical feedback for clear compositional issues.
  4. Remember that fragrance is subjective - focus on structural analysis rather than judgment.
  5. If this resembles known fragrances, mention them and note the similarities/differences.
  `;

    return `${systemPrompt}\n\n${compositionText}`;
  }
}
