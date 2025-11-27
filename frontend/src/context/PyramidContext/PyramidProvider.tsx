import type { ReactNode } from "react";
import { usePyramidState } from "../../hooks/usePyramidState";
import { PyramidContext } from "./PyramidContext";

export const PyramidProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const pyramidState = usePyramidState();

  return (
    <PyramidContext.Provider value={pyramidState}>
      {children}
    </PyramidContext.Provider>
  );
};
