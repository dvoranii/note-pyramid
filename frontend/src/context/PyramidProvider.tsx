import type { ReactNode } from "react";
import { usePyramidState } from "../hooks/usePyramidState";
import { PyramidContext } from "./PyramidContext";
import { useEffect } from "react";
import { decodePyramidState } from "../utils/pyramidEncoding";

export const PyramidProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const pyramidState = usePyramidState();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("composition");

    if (encoded) {
      const decoded = decodePyramidState(encoded);
      if (decoded) {
        pyramidState.loadPyramidState(decoded);
      }
    }
  }, []);

  return (
    <PyramidContext.Provider value={pyramidState}>
      {children}
    </PyramidContext.Provider>
  );
};
