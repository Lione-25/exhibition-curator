import { useState } from "react";
import MuseumSelector from "./MuseumSelector";

interface SearchBarProps {
  onSearch: (query: string, museum: "met" | "science") => void;
  museum: "met" | "science";
  setMuseum: (museum: "met" | "science") => void;
}

export default function SearchBar({
  onSearch,
  museum,
  setMuseum,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  // const [museum, setMuseum] = useState<"met" | "science">("met");

  function handleSearch() {
    if (query.trim() === "") return; // ignore empty searches
    onSearch(query.trim(), museum);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div style={{ textAlign: "right" }}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        <MuseumSelector museum={museum} setMuseum={setMuseum} />
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
