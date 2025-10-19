import { useState, useEffect } from "react";
import { useExhibition } from "../context/ExhibitionContext";
import ArtGrid from "../components/ArtGrid";
import ViewerModal from "../components/ViewerModal";

export default function Exhibition() {
  const [selected, setSelected] = useState<any | null>(null);
  const { exhibition } = useExhibition();
  if (exhibition.length === 0) return <p>No artworks added yet.</p>;

  useEffect(() => {
    document.title = "My Exhibition | The Virtual Gallery";
  }, []);

  return (
    <div>
      <h1>My Exhibition</h1>
      <ArtGrid artworks={exhibition} onSelect={setSelected} />
      <ViewerModal
        art={selected}
        onClose={() => setSelected(null)}
        inExhibition={true}
      />
    </div>
  );
}
