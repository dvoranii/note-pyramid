// styles/pyramidStyleUtils.ts
import { colors } from "../theme/colors";

// Aspect ratios for each level based on your original dimensions
export const getLevelAspectRatio = (level: "top" | "middle" | "base") => {
  if (level === "top") return 340 / 289;
  if (level === "middle") return 606 / 222;
  return 874 / 221;
};

// Relative width percentages for each level (based on base being ~100%)
export const getLevelWidthPercentage = (level: "top" | "middle" | "base") => {
  if (level === "top") return "39%";
  if (level === "middle") return "69%";
  return "100%";
};

// Max widths for each level
export const getLevelMaxWidth = (level: "top" | "middle" | "base") => {
  if (level === "top") return "340px";
  if (level === "middle") return "606px";
  return "874px";
};

// Base sizes for each level
export const getBaseSlotSize = (level: "top" | "middle" | "base") => {
  if (level === "top") return 1;
  if (level === "middle") return 1.25;
  if (level === "base") return 1.75;
  return 1;
};

// Calculate the scale factor based on total items and level
export const getSlotScale = (
  level: "top" | "middle" | "base",
  totalItems: number,
  hasMultipleRows?: boolean,
  hasExtraColumn?: boolean
) => {
  const baseSize = getBaseSlotSize(level);

  // Special scaling for top level
  if (level === "top") {
    if (hasExtraColumn && !hasMultipleRows) {
      return baseSize * 0.85; // Shrink slightly for 3-column layout
    }
    if (hasMultipleRows) {
      return baseSize * 0.7; // Shrink more for multi-row
    }
    return baseSize * 1; // Normal 2-column layout
  }

  // Special scaling for middle level
  if (level === "middle") {
    if (hasMultipleRows) {
      return baseSize * 0.75; // Shrink immediately when breaking to second row
    }
    return baseSize * 1; // Single row
  }

  // Base level scaling
  if (totalItems <= 4) return baseSize * 1;
  if (totalItems <= 10) return baseSize * 0.65;
  if (totalItems <= 12) return baseSize * 0.55;
  return baseSize * 0.55;
};

// Slot background color calculation
export const getSlotBackgroundColor = (
  hasNote: boolean,
  isPlaceholder?: boolean
) => {
  if (hasNote) return colors.white;
  if (isPlaceholder) return "rgba(255, 255, 255, 0.3)";
  return "transparent";
};

// Slot border calculation
export const getSlotBorder = (isPlaceholder?: boolean) => {
  return isPlaceholder ? "2px dashed rgba(255, 255, 255, 0.5)" : "none";
};
