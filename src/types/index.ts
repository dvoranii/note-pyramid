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
