import { useState, useEffect, useRef } from "react";
import SearchBar from "../components/SearchBar";
import ArtGrid from "../components/ArtGrid";
import ViewerModal from "../components/ViewerModal";
import { fetchMetArt } from "../api/met";

export default function Home() {
  const [artworks, setArtworks] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  async function loadArtworks(
    newQuery?: string,
    reset = false,
    customPage?: number
  ) {
    if (!newQuery && !query) return;

    setLoading(true);
    const searchTerm = newQuery ?? query;
    const currentPage = customPage ?? page;

    const { results, total } = await fetchMetArt(searchTerm, currentPage, 10);

    if (reset) {
      setArtworks(results);
    } else {
      setArtworks((prev) => [...prev, ...results]);
    }

    setHasMore(currentPage * 10 < total);
    setLoading(false);
  }

  function handleSearch(newQuery: string) {
    setQuery(newQuery);
    setPage(1);
    loadArtworks(newQuery, true, 1); // <-- force page=1
  }

  // Watch loader with IntersectionObserver

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 } // triggers when loader is fully visible
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el); // <-- always cleans up the same element
    };
  }, [hasMore, loading]);

  // Fetch when page changes
  useEffect(() => {
    if (page > 1) loadArtworks();
  }, [page]);

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ArtGrid artworks={artworks} onSelect={setSelected} />
      {loading && <p>Loading...</p>}
      <div ref={loaderRef} style={{ height: "30px" }} />
      <ViewerModal art={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
