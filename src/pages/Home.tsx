import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ArtGrid from "../components/ArtGrid";
import ViewerModal from "../components/ViewerModal";
import { fetchMetArt } from "../api/met";

export default function Home() {
  const [artworks, setArtworks] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);

  async function handleSearch(query: string) {
    const results = await fetchMetArt(query);
    setArtworks(results);
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ArtGrid artworks={artworks} onSelect={setSelected} />
      <ViewerModal art={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
