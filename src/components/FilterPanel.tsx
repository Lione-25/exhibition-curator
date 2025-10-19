import { useState } from "react";
import "../styles/FilterPanel.css";

const categories = [
  "Photographs",
  "Printing & Writing",
  "Materia Medica & Pharmacology",
  "Surgery",
  "Railway Posters, Notices & Handbills",
  "Photographic Technology",
  "Cinematography",
  "Classical & Medieval Medicine",
  "Documents",
  "Art",
];

interface FilterPanelProps {
  onApply: (option: string | null) => void;
}

export default function FilterPanel({ onApply }: FilterPanelProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    // If the same one is clicked, unselect and clear filter
    if (selected === option) {
      setSelected(null);
      onApply(null);
    } else {
      setSelected(option);
      onApply(option);
    }
    setOpen(false);
  };

  return (
    <div className="filter-panel">
      <div className="filter-category">
        <button
          className={`filter-button ${selected ? "filtered" : ""}`}
          onClick={() => setOpen(!open)}
        >
          Category
          {selected && <span className="selected-option"> • {selected}</span>}
        </button>

        {open && (
          <div className="dropdown">
            {categories.map((option) => (
              <label
                key={option}
                className={`dropdown-option ${
                  selected === option ? "active" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
