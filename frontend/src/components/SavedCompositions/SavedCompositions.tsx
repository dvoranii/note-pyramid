import * as S from "./SavedCompositions.styled";
import type { SavedComposition } from "../../utils/compositionStorage";
import {
  deleteComposition,
  clearAllCompositions,
} from "../../utils/compositionStorage";

interface SavedCompositionsProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadComposition: (composition: SavedComposition) => void;
  compositions: SavedComposition[];
  onDeleteComposition: (id: string) => void;
  onClearAllCompositions: () => void;
  onRefreshCompositions?: () => void;
}

export const SavedCompositions = ({
  isOpen,
  onClose,
  onLoadComposition,
  compositions, // Now using the prop instead of internal state
  onDeleteComposition,
  onClearAllCompositions,
}: SavedCompositionsProps) => {
  const handleLoad = (composition: SavedComposition) => {
    onLoadComposition(composition);
    onClose();
  };

  const handleDelete = (id: string) => {
    deleteComposition(id);
    onDeleteComposition(id); // Call parent to update state
  };

  const handleClearAll = () => {
    if (
      window.confirm("Are you sure you want to delete all saved compositions?")
    ) {
      clearAllCompositions();
      onClearAllCompositions(); // Call parent to update state
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getNoteCount = (composition: SavedComposition) => {
    const { top, middle, base } = composition.pyramidState;
    return top.length + middle.length + base.length;
  };

  return (
    <>
      <S.SidebarOverlay $isOpen={isOpen} onClick={onClose} />

      <S.SidebarContainer $isOpen={isOpen}>
        <S.SidebarHeader>
          <S.SidebarTitle>Saved Compositions</S.SidebarTitle>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.SidebarHeader>

        <S.SidebarContent>
          {compositions.length === 0 ? (
            <S.EmptyState>
              <p>No saved compositions yet</p>
              <p>Save your first composition to see it here!</p>
            </S.EmptyState>
          ) : (
            <>
              <S.CompositionList>
                {compositions.map((composition) => (
                  <S.CompositionItem key={composition.id}>
                    <S.CompositionInfo>
                      <S.CompositionName title={composition.name}>
                        {composition.name}
                      </S.CompositionName>
                      <S.CompositionMeta>
                        {getNoteCount(composition)} notes •{" "}
                        {formatDate(composition.timestamp)}
                      </S.CompositionMeta>
                    </S.CompositionInfo>

                    <S.CompositionActions>
                      <S.ActionButton
                        $variant="load"
                        onClick={() => handleLoad(composition)}
                        title="Load composition"
                      >
                        Load
                      </S.ActionButton>
                      <S.ActionButton
                        $variant="delete"
                        onClick={() => handleDelete(composition.id)}
                        title="Delete composition"
                      >
                        Delete
                      </S.ActionButton>
                    </S.CompositionActions>
                  </S.CompositionItem>
                ))}
              </S.CompositionList>

              {compositions.length > 1 && (
                <S.ClearAllButton onClick={handleClearAll}>
                  Clear All Compositions
                </S.ClearAllButton>
              )}
            </>
          )}
        </S.SidebarContent>
      </S.SidebarContainer>
    </>
  );
};
