import * as S from "./Sidebar.styled";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import NoteCard from "./NoteCard/NoteCard";
import notesData from "../../data/fragrance_notes_with_images.json";
import { useKeyboardNavigation } from "../../context/KeyboardNavigationContext/useKeyboardNavigation";

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [displayCount, setDisplayCount] = useState(12);
  const { sidebarMode, setSidebarMode } = useKeyboardNavigation();

  const popularNoteNames = [
    "Bergamot",
    "Tonka Bean",
    "Amber",
    "Vanilla,",
    "Patchouli",
    "Oud",
    "Lavender",
    "Vetiver",
    "Sandalwood",
    "Rose",
    "Jasime",
    "Musk",
    "Cedarwood",
    "Neroli",
    "Orange Blossom",
    "Ylang Ylang",
    "Cardamom",
    "Pink Pepper",
    "Black Pepper",
    "Leather",
    "Tobacco",
    "Incense",
    "Oakmoss",
    "Grapefruit",
    "Mandarin",
    "Lemon",
    "Black Currant",
    "Fig",
    "Orris Root",
    "Saffron",
    "Cinnamon",
    "Lemon",
    "Apple",
    "Pineapple",
    "Ambroxan",
    "Iris",
    "Blood Orange",
    "Allspice",
    "Cloves",
    "Coconut",
    "Cypress",
    "Ginger",
    "Mint",
    "Coumarin",
  ];

  const categories = useMemo(() => {
    return ["All", ...notesData.map((cat) => cat.category)];
  }, []);

  const allNotes = useMemo(() => {
    const notes = notesData.flatMap((cat) =>
      cat.notes.map((note) => ({ ...note, category: cat.category }))
    );

    return notes.sort((a, b) => {
      const aIsPopular = popularNoteNames.includes(a.name);
      const bIsPopular = popularNoteNames.includes(b.name);

      if (aIsPopular && !bIsPopular) return -1;
      if (!aIsPopular && bIsPopular) return 1;

      return 0;
    });
  }, []);

  const filteredNotes = useMemo(() => {
    let notes = allNotes;

    if (selectedCategory !== "All") {
      notes = notes.filter((note) => note.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      notes = notes.filter((note) => note.name.toLowerCase().includes(query));
    }

    return notes;
  }, [allNotes, selectedCategory, searchQuery]);

  const displayedNotes = filteredNotes.slice(0, displayCount);
  const hasMore = displayCount < filteredNotes.length;

  return (
    <S.SidebarContainer>
      <S.SearchSection>
        <S.SearchWrapper $isFocused={sidebarMode === "search"}>
          <S.SearchIcon>
            <Search size={20} />
          </S.SearchIcon>
          <S.SearchInput
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSidebarMode("search")}
            onBlur={() => {
              setTimeout(() => {
                if (sidebarMode === "search") {
                  setSidebarMode("default");
                }
              }, 100);
            }}
          />
        </S.SearchWrapper>
      </S.SearchSection>

      <S.FilterSection>
        <S.Select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setDisplayCount(12);
          }}
          onFocus={() => setSidebarMode("filter")}
          onBlur={() => {
            setTimeout(() => {
              if (sidebarMode === "filter") {
                setSidebarMode("default");
              }
            }, 100);
          }}
          $isFocused={sidebarMode === "filter"}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </S.Select>
      </S.FilterSection>

      <S.NotesSection>
        <S.NotesGrid>
          {displayedNotes.map((note, index) => (
            <NoteCard key={note.id} note={note} index={index} />
          ))}
        </S.NotesGrid>

        {hasMore && (
          <S.LoadMoreButton
            onClick={() => setDisplayCount((prev) => prev + 12)}
            data-load-more-button="true"
          >
            Load More
          </S.LoadMoreButton>
        )}

        {filteredNotes.length === 0 && (
          <S.NoResults>No notes found</S.NoResults>
        )}
      </S.NotesSection>
    </S.SidebarContainer>
  );
};

export default Sidebar;
