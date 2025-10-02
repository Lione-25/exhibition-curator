import ArtCard from "./ArtCard";

interface ArtGridProps {
  artworks: any[];
  onSelect: (art: any) => void;
}

export default function ArtGrid({ artworks, onSelect }: ArtGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1rem",
      }}
    >
      {artworks.map((art) => (
        <ArtCard key={art.id} art={art} onClick={() => onSelect(art)} />
      ))}
    </div>
  );
}
