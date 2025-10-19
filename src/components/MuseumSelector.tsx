import { useState } from "react";
import "../styles/MuseumSelector.module.css";

function MuseumSelector() {
  const [museum, setMuseum] = useState<"met" | "science">("met");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div className="museum-selector">
      <button
        style={{
          //   background: "#f5f5f5",
          border: "1px solid #ccc",
          borderRadius: "6px",
          //   padding: "0.4rem 0.75rem",
          cursor: "pointer",
          fontSize: "0.9rem",
          //   color: "#333",
          transition: "background 0.2s",
          //   marginBottom: "1rem",
        }}
        // className="museum-button"
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        {museum === "met"
          ? "The Metropolitan Museum of Art Collection"
          : "The Science Museum"}{" "}
        ▼
      </button>
      {dropdownOpen && (
        <ul className="museum-dropdown">
          <li
            onClick={() => {
              setMuseum("met");
              setDropdownOpen(false);
            }}
          >
            The Metropolitan Museum of Art Collection
          </li>
          <li
            onClick={() => {
              setMuseum("science");
              setDropdownOpen(false);
            }}
          >
            The Science Museum
          </li>
        </ul>
      )}
    </div>
  );
}

export default MuseumSelector;
