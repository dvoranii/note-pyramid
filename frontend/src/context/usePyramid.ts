import { useContext } from "react";
import { PyramidContext } from "./PyramidContext";

export const usePyramid = () => {
  const context = useContext(PyramidContext);
  if (context === undefined) {
    throw new Error("usePyramid must be used within a PyramidProvider");
  }
  return context;
};
