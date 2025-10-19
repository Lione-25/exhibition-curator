import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface ArtItem {
  id: string | number;
  title: string;
  artist?: string;
  image?: string;
  largeImage?: string;
  description?: string;
  link?: string;
  source?: string;
}

interface ExhibitionContextType {
  exhibition: ArtItem[];
  addArt: (art: ArtItem) => void;
  removeArt: (art: ArtItem) => void;
}

const ExhibitionContext = createContext<ExhibitionContextType | undefined>(
  undefined
);

export const ExhibitionProvider = ({ children }: { children: ReactNode }) => {
  const [exhibition, setExhibition] = useState<ArtItem[]>(() => {
    // Load from session storage on init
    const saved = sessionStorage.getItem("exhibition");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to session storage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("exhibition", JSON.stringify(exhibition));
  }, [exhibition]);

  const addArt = (art: ArtItem) => {
    setExhibition((prev) => {
      // avoid duplicates
      if (prev.find((a) => a.id === art.id)) return prev;
      return [...prev, art];
    });
  };

  const removeArt = (art: ArtItem) => {
    setExhibition((prev) =>
      prev.filter((a) => !(a.id === art.id && a.source === art.source))
    );
  };

  return (
    <ExhibitionContext.Provider value={{ exhibition, addArt, removeArt }}>
      {children}
    </ExhibitionContext.Provider>
  );
};

export const useExhibition = () => {
  const context = useContext(ExhibitionContext);
  if (!context)
    throw new Error("useExhibition must be used within ExhibitionProvider");
  return context;
};
