import { createContext, useContext, useState } from "react";

interface SearchContextType {
  query: string;
  setQuery: (q: string) => void;
  museum: "met" | "science";
  setMuseum: (m: "met" | "science") => void;
  selectedCategory: string | number | null;
  setSelectedCategory: (c: string | number | null) => void;
  artworks: any[];
  setArtworks: React.Dispatch<React.SetStateAction<any[]>>;
  objectIDs: any[];
  setObjectIDs: (ids: any[]) => void;
  page: number;
  setPage: (p: number) => void;
  hasMore: boolean;
  setHasMore: (h: boolean) => void;
  loading: boolean;
  setLoading: (l: boolean) => void;
  error: string | null;
  setError: (e: string | null) => void;
  scrollY: number;
  setScrollY: (y: number) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [museum, setMuseum] = useState<"met" | "science">("met");
  const [selectedCategory, setSelectedCategory] = useState<
    string | number | null
  >(null);
  const [artworks, setArtworks] = useState<any[]>([]);
  const [objectIDs, setObjectIDs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);

  return (
    <SearchContext.Provider
      value={{
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
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within SearchProvider");
  return context;
}
