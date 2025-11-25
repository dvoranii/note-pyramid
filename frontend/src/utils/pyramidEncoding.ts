import LZString from "lz-string";
import type { PyramidState } from "../types/index";

export const encodePyramidState = (state: PyramidState): string => {
  const json = JSON.stringify(state);
  return LZString.compressToEncodedURIComponent(json);
};

export const decodePyramidState = (encoded: string): PyramidState | null => {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    return JSON.parse(json);
  } catch {
    return null;
  }
};

export const generateShareableUrl = (state: PyramidState): string => {
  const encoded = encodePyramidState(state);
  return `${window.location.origin}${window.location.pathname}?composition=${encoded}`;
};
