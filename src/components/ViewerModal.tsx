import styles from "../styles/ViewerModal.module.css";

interface ViewerModalProps {
  art: any | null;
  onClose: () => void;
}

export default function ViewerModal({ art, onClose }: ViewerModalProps) {
  if (!art) return null;

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
