import { useState } from "react";
import styles from "../styles/MuseumSelector.module.css";

function MuseumSelector() {
  const [museum, setMuseum] = useState<"met" | "science">("met");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div className={styles.museumSelector}>
      <button
        // style={{
        //   //   background: "#f5f5f5",
        //   border: "2px solid #333",
        //   borderRadius: "6px",
        //   //   padding: "0.4rem 0.75rem",
        //   cursor: "pointer",
        //   fontSize: "0.9rem",
        //   //   color: "#333",
        //   transition: "background 0.2s",
        //   //   marginBottom: "1rem",
        // }}
        className={styles.museumButton}
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        {museum === "met"
          ? "The Metropolitan Museum of Art Collection"
          : "The Science Museum"}{" "}
        ▼
      </button>
      {dropdownOpen && (
        <ul className={styles.museumDropdown}>
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
