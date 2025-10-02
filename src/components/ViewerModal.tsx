interface ViewerModalProps {
  art: any | null;
  onClose: () => void;
}

export default function ViewerModal({ art, onClose }: ViewerModalProps) {
  if (!art) return null;

  return (
    <div className="modal">
      <button onClick={onClose}>X</button>
      <img src={art.image} alt={art.title} />
      <h2>{art.title}</h2>
      <p>{art.artist}</p>
      <small>{art.source}</small>
    </div>
  );
}
