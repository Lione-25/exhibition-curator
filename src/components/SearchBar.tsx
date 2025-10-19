import { useState } from "react";
import MuseumSelector from "./MuseumSelector";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  function handleSearch() {
    if (query.trim() === "") return; // ignore empty searches
    onSearch(query.trim());
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div style={{ textAlign: "right" }}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        <MuseumSelector />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search artworks..."
          style={{
            padding: "8px",
            flexGrow: 1,
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <button
          onClick={handleSearch}
          style={{
            padding: "8px 16px",
            border: "1px solid #333",
            borderRadius: "4px",
            background: "#333",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}
