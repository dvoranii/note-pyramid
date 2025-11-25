// utils/pyramidUtils.ts

import type { Note } from "../types";

// Different placeholder counts per level
export const getPlaceholderCount = (level: "top" | "middle" | "base") => {
  if (level === "top") return 2;
  if (level === "middle") return 3;
  return 4;
};

// Grid column calculations
export const getGridColumns = (
  level: "top" | "middle" | "base",
  itemCount: number
) => {
  const baseColumns = getPlaceholderCount(level);

  if (level === "top") {
    if (itemCount <= 2) return 2;
    if (itemCount <= 3) return 3;
    if (itemCount <= 6) return 3;
    if (itemCount <= 9) return 3;
    if (itemCount <= 12) return 4;
    return 5;
  }

  if (level === "middle") {
    if (itemCount <= 6) return 3;
    if (itemCount <= 8) return 4;
    if (itemCount <= 10) return 5;
    if (itemCount <= 12) return 6;
    return 6;
  }

  if (level === "base") {
    if (itemCount <= 8) return 4;
    if (itemCount <= 10) return 5;
    if (itemCount <= 12) return 6;
    return 7;
  }

  return baseColumns;
};

// Row information calculations
export const getRowInfo = (
  level: "top" | "middle" | "base",
  itemCount: number
) => {
  const baseColumns = getPlaceholderCount(level);

  if (level === "top") {
    const hasMultipleRows = itemCount > 3;
    const hasExtraColumn = itemCount > 2;
    return { hasMultipleRows, hasExtraColumn };
  }

  const hasMultipleRows = itemCount > baseColumns;
  const hasExtraColumn = false;
  return { hasMultipleRows, hasExtraColumn };
};

// Grid width calculations
export const getGridWidth = (
  level: "top" | "middle" | "base",
  hasMultipleRows: boolean
) => {
  if (level === "top") return "fit-content";
  if (level === "middle") return hasMultipleRows ? "fit-content" : "60%";
  if (level === "base" && hasMultipleRows) return "fit-content";
  return "80%";
};

// Grid gap calculations
export const getGridGap = (
  level: "top" | "middle" | "base",
  hasMultipleRows: boolean,
  totalSlots: number
) => {
  const currentColumns = getGridColumns(level, totalSlots);

  if (level === "top" && hasMultipleRows) return "0";
  if (level === "middle" && hasMultipleRows) return "1.2rem";
  if (level === "base" && currentColumns >= 6) return "1.2rem";
  if (level === "base" && hasMultipleRows) return "1.8rem";

  return "clamp(1.2rem, 4vw, 2rem)";
};

export const getMaxNotesForLevel = (level: "top" | "middle" | "base") => {
  if (level === "top") return 15;
  if (level === "middle") return 12;
  if (level === "base") return 14;
  return 0;
};

export const canAddNoteToLevel = (
  level: "top" | "middle" | "base",
  currentNotes: Note[]
) => {
  const maxNotes = getMaxNotesForLevel(level);
  return currentNotes.length < maxNotes;
};
