import { useState, useEffect, useRef } from "react";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import ArtGrid from "../components/ArtGrid";
import ViewerModal from "../components/ViewerModal";
import { searchMetArt, fetchMetObjects } from "../api/met";
import {
  searchScienceMuseum,
  fetchScienceMuseumObjects,
} from "../api/theScienceMuseum";
import { useSearch } from "../context/SearchContext";

export default function Home() {
  //   const [artworks, setArtworks] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  //   const [query, setQuery] = useState("");
  //   const [museum, setMuseum] = useState<"met" | "science">("met");
  //   const [selectedCategory, setSelectedCategory] = useState<
  //     string | number | null
  //   >(null);
  //   const [page, setPage] = useState(1);
  //   const [loading, setLoading] = useState(false);
  //   const [objectIDs, setObjectIDs] = useState<
  //     number[] | { id: string; type: string; link: string }[]
  //   >([]);
  //   // For Met: number[]
  //   // For Science Museum: { id: string; type: string; link: string }[]
  //   const [hasMore, setHasMore] = useState(false);
  //   const [error, setError] = useState<string | null>(null);

  const {
    query,
    setQuery,
    museum,
    setMuseum,
    selectedCategory,
    setSelectedCategory,
    artworks,
    setArtworks,
    objectIDs,
    setObjectIDs,
    page,
    setPage,
    hasMore,
    setHasMore,
    loading,
    setLoading,
    error,
    setError,
    scrollY,
    setScrollY,
  } = useSearch();

  const loaderRef = useRef<HTMLDivElement | null>(null);

  async function handleSearch(
    newQuery: string,
    selectedMuseum: "met" | "science",
    category?: string | number | null
  ) {
    setQuery(newQuery);
    setMuseum(selectedMuseum);
    setPage(1);
    setLoading(true);
    setError(null);

    try {
      let ids;
      if (selectedMuseum === "met") {
        ids = await searchMetArt(
          newQuery,
          category ? String(category) : undefined
        );
      } else {
        ids = await searchScienceMuseum(
          newQuery,
          0,
          50,
          category ? String(category) : undefined
        );
      }

      setObjectIDs(ids);

      if (ids.length) {
        const results =
          selectedMuseum === "met"
            ? await fetchMetObjects(ids as number[], 1, 10)
            : await fetchScienceMuseumObjects(
                ids.slice(0, 10) as { id: string; type: string }[]
              );

        setArtworks(results);
        setHasMore(ids.length > 10);
      } else {
        setArtworks([]);
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while searching. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function loadMore(nextPage: number) {
    if (!objectIDs.length) return;
    setLoading(true);
    setError(null);

    try {
      //   const results = await fetchMetObjects(objectIDs, nextPage, 10);
      const results =
        museum === "met"
          ? await fetchMetObjects(objectIDs as number[], nextPage, 10)
          : await fetchScienceMuseumObjects(
              (objectIDs as { id: string; type: string }[]).slice(
                (nextPage - 1) * 10,
                nextPage * 10
              )
            );

      setArtworks((prev) => [...prev, ...results]);
      setHasMore(nextPage * 10 < objectIDs.length);
      setPage(nextPage);
    } catch (err) {
      console.error(err);
      setError("Failed to load more artworks. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Infinite scroll observer
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

  useEffect(() => {
    if (query) {
      handleSearch(query, museum, selectedCategory);
      // } else if (selectedCategory) {
      //   handleSearch("*", museum, selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    setSelectedCategory(null);
  }, [museum]);

  useEffect(() => {
    // Restore scroll
    window.scrollTo(0, scrollY);

    // Save scroll before navigating away
    const handleBeforeUnload = () => setScrollY(window.scrollY);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      setScrollY(window.scrollY);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div>
      <SearchBar
        onSearch={(q, m) => handleSearch(q, m, selectedCategory)}
        museum={museum}
        setMuseum={setMuseum}
      />
      <FilterPanel museum={museum} onApply={setSelectedCategory} />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      <ArtGrid artworks={artworks} onSelect={setSelected} />

      {artworks.length === 0 && query && !error && !loading && (
        <p>No items found</p>
      )}

      {artworks.length > 0 && (
        <>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {loading && <p>Loading...</p>}

          <div ref={loaderRef} style={{ height: "30px" }} />

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
                color: "#333",
              }}
            >
              {error ? "Try Again" : "Load More"}
            </button>
          )}
        </>
      )}

      <ViewerModal art={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
