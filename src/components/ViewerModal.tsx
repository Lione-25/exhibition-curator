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
          <img src={art.image} alt={art.title} className={styles.image} />
        ) : (
          <div className={styles.noImage}>No Image</div>
        )}
        <h2 style={{ margin: "10px 0" }}>{art.title}</h2>
        <p>{art.artist || "Unknown Artist"}</p>
        <small>{art.source}</small>
      </div>
    </div>
  );
}
