export interface Note {
  name: string;
  id: string;
  high_res_image: string;
  url: string;
  image?: string | null;
  category?: string;
}

export interface NoteCategory {
  category: string;
  notes: Note[];
}

export interface PyramidState {
  top: Note[];
  middle: Note[];
  base: Note[];
}

export type PyramidLevel = "top" | "middle" | "base";

export interface AnalysisResult {
  analysis: string;
  timestamp: string;
}

export interface StructuredAnalysis {
  overallProfile: string;
  openingExperience: string;
  heartDevelopment: string;
  foundationEvolution: string;
  marketContext: string;
  wearability: string;
  considerations: string;
  timestamp: string;
}

export interface AnalysisResult {
  analysis: string;
  structuredAnalysis?: StructuredAnalysis;
  timestamp: string;
}
