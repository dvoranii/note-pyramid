import type { PyramidState } from "../types";

export interface SavedComposition {
  id: string;
  name: string;
  pyramidState: PyramidState;
  timestamp: string;
}

const STORAGE_KEY = "fragrance_saved_compositions";

export const saveComposition = (
  name: string,
  pyramidState: PyramidState
): SavedComposition => {
  const saved: SavedComposition = {
    id: Date.now().toString(),
    name,
    pyramidState,
    timestamp: new Date().toISOString(),
  };

  const existing = getCompositions();
  existing.unshift(saved);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

  return saved;
};

export const getCompositions = (): SavedComposition[] => {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const deleteComposition = (id: string): void => {
  const existing = getCompositions();
  const filtered = existing.filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const loadComposition = (id: string): SavedComposition | null => {
  const compositions = getCompositions();
  return compositions.find((c) => c.id === id) || null;
};

export const clearAllCompositions = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
