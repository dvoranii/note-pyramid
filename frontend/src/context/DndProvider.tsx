import type { ReactNode } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { usePyramid } from "./PyramidContext/usePyramid";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useSensors, useSensor, PointerSensor } from "@dnd-kit/core";

interface DndProviderProps {
  children: ReactNode;
}

export const DndProvider: React.FC<DndProviderProps> = ({ children }) => {
  const { pyramidState, addNoteToLevel } = usePyramid();
  const { activeNote, handleDragStart, handleDragEnd } =
    useDragAndDrop(addNoteToLevel);

  const sensors = useSensors(useSensor(PointerSensor));

  const onDragStart = (event: DragStartEvent) => {
    handleDragStart(event);
  };

  const onDragEnd = (event: DragEndEvent) => {
    handleDragEnd(event, pyramidState);
  };

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      sensors={sensors}
    >
      {children}
      <DragOverlay>
        {activeNote && (
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "0.5rem",
              padding: "0.75rem",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              border: "2px solid #7C2D12",
              opacity: 0.9,
            }}
          >
            <img
              src={activeNote.high_res_image}
              alt={activeNote.name}
              style={{
                width: "3rem",
                height: "3rem",
                objectFit: "cover",
                borderRadius: "0.25rem",
                marginBottom: "0.5rem",
              }}
            />
            <p
              style={{
                fontSize: "0.75rem",
                textAlign: "center",
                fontWeight: 500,
                color: "#7C2D12",
              }}
            >
              {activeNote.name}
            </p>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};
