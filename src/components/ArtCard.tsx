import styles from "../styles/ArtCard.module.css";

interface ArtCardProps {
  art: any;
  onClick: () => void;
}

export default function ArtCard({ art, onClick }: ArtCardProps) {
  return (
    <div className={styles.card} onClick={onClick}>
      {art.image ? (
        <img src={art.image} alt={art.title} />
      ) : (
        <div className={styles.noImage}>No Image</div>
      )}
      <h3>{art.title}</h3>
      <p>{art.artist || "Unknown Artist"}</p>
      <small>{art.source}</small>
    </div>
  );
}
