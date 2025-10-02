import ArtCard from "./ArtCard";
import styles from "../styles/ArtGrid.module.css";

interface ArtGridProps {
  artworks: any[];
  onSelect: (art: any) => void;
}

export default function ArtGrid({ artworks, onSelect }: ArtGridProps) {
  return (
    <div className={styles.grid}>
      {artworks.map((art) => (
        <ArtCard key={art.id} art={art} onClick={() => onSelect(art)} />
      ))}
    </div>
  );
}
