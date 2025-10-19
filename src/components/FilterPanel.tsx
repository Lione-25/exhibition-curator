import { useEffect, useState } from "react";
import { fetchMetDepartments } from "../api/met.ts";
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
  museum: "met" | "science";
  onApply: (option: string | null) => void;
}

export default function FilterPanel({ onApply, museum }: FilterPanelProps) {
  const [departments, setDepartments] = useState<
    { id: number; name: string }[]
  >([]);
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

  const handleSelectMet = ({ name, id }: { name: string; id: number }) => {
    // If the same one is clicked, unselect and clear filter
    if (selected === name) {
      setSelected(null);
      onApply(null);
    } else {
      setSelected(name);
      onApply(String(id));
    }
    setOpen(false);
  };

  useEffect(() => {
    async function loadDepartments() {
      try {
        const data = await fetchMetDepartments();
        setDepartments(data);
      } catch (err) {
        console.error("Failed to fetch departments:", err);
      }
    }
    loadDepartments();
  }, []);

  useEffect(() => {
    setSelected(null);
  }, [museum]);

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

        {open && museum === "science" && (
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

        {open && museum === "met" && (
          <div className="dropdown">
            {departments.map((option) => (
              <label
                key={option.id}
                className={`dropdown-option ${
                  selected === option.name ? "active" : ""
                }`}
                onClick={() => handleSelectMet(option)}
              >
                {option.name}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
