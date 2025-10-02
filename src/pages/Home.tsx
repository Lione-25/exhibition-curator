import { useState, useEffect, useRef } from "react";
import SearchBar from "../components/SearchBar";
import ArtGrid from "../components/ArtGrid";
import ViewerModal from "../components/ViewerModal";
import { searchMetArt, fetchMetObjects } from "../api/met";

export default function Home() {
  const [artworks, setArtworks] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [objectIDs, setObjectIDs] = useState<number[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  async function handleSearch(newQuery: string) {
    setQuery(newQuery);
    setPage(1);
    setLoading(true);

    const ids = await searchMetArt(newQuery);
    setObjectIDs(ids);

    if (ids.length) {
      const results = await fetchMetObjects(ids, 1, 10);
      setArtworks(results);
      setHasMore(ids.length > 10);
    } else {
      setArtworks([]);
      setHasMore(false);
    }

    setLoading(false);
  }

  async function loadMore(nextPage: number) {
    if (!objectIDs.length) return;
    setLoading(true);

    const results = await fetchMetObjects(objectIDs, nextPage, 10);
    setArtworks((prev) => [...prev, ...results]);

    setHasMore(nextPage * 10 < objectIDs.length);
    setPage(nextPage);
    setLoading(false);
  }

  // Watch loader with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          loadMore(page + 1);
        }
      },
      { threshold: 1.0 }
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasMore, loading, page, objectIDs]);

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ArtGrid artworks={artworks} onSelect={setSelected} />

      {loading && <p>Loading...</p>}

      {artworks.length > 0 && (
        <>
          {/* Invisible loader for scroll-based infinite loading */}
          <div ref={loaderRef} style={{ height: "30px" }} />

          {/* Fallback button */}
          {hasMore && !loading && (
            <button
              onClick={() => loadMore(page + 1)}
              style={{
                margin: "20px auto",
                display: "block",
                padding: "10px 20px",
                borderRadius: "6px",
                border: "1px solid #333",
                background: "#f5f5f5",
                cursor: "pointer",
              }}
            >
              Load More
            </button>
          )}
        </>
      )}

      <ViewerModal art={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
