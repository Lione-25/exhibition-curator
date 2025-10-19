import styles from "../styles/ViewerModal.module.css";
import { useExhibition } from "../context/ExhibitionContext";

interface ViewerModalProps {
  art: any | null;
  onClose: () => void;
  inExhibition?: boolean;
}

export default function ViewerModal({
  art,
  onClose,
  inExhibition,
}: ViewerModalProps) {
  const { addArt, removeArt, exhibition } = useExhibition();

  if (!art) return null;

  const hasBeenAdded = exhibition.some(
    (a: any) => a.id === art.id && a.source === art.source
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        {art.image ? (
          <img
            src={art.largeImage || art.image}
            alt={art.title}
            className={styles.image}
          />
        ) : (
          <div className={styles.noImage}>No Image</div>
        )}
        <h2 style={{ margin: "10px 0", color: "#333" }}>{art.title}</h2>
        <p style={{ color: "#333" }}>{art.description}</p>
        <p style={{ color: "#333" }}>{art.artist || "Unknown Artist"}</p>

        {inExhibition ? (
          <button
            className={styles.addButton}
            onClick={() => {
              removeArt(art);
              onClose();
            }}
          >
            Remove from Exhibition
          </button>
        ) : (
          <button
            className={styles.addButton}
            disabled={hasBeenAdded}
            onClick={() => addArt(art)}
          >
            {hasBeenAdded ? "Added" : "Add to Exhibition"}
          </button>
        )}

        <p>
          <a href={art.link} target="_blank" rel="noopener noreferrer">
            View full details on museum website
          </a>
        </p>

        <small style={{ color: "#333" }}>{art.source}</small>
      </div>
    </div>
  );
}
