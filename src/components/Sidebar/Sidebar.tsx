import * as S from "./Sidebar.styled";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import NoteCard from "./NoteCard";
// import { NoteCategory } from "../../types";
import notesData from "../../data/fragrance_notes_with_images.json";

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [displayCount, setDisplayCount] = useState(12);

  const categories = useMemo(() => {
    return ["All", ...notesData.map((cat) => cat.category)];
  }, []);

  const allNotes = useMemo(() => {
    return notesData.flatMap((cat) =>
      cat.notes.map((note) => ({ ...note, category: cat.category }))
    );
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
        <S.SearchWrapper>
          <S.SearchIcon>
            <Search size={20} />
          </S.SearchIcon>
          <S.SearchInput
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
          {displayedNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </S.NotesGrid>

        {hasMore && (
          <S.LoadMoreButton
            onClick={() => setDisplayCount((prev) => prev + 12)}
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
