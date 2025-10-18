import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Header.css";

function Header() {
  const [museum, setMuseum] = useState<"met" | "science">("met");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="app-title">Art Explorer</h1>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/exhibition">Exhibition</Link>
        </nav>
      </div>

      <div className="museum-selector">
        <button
          className="museum-button"
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
    </header>
  );
}

export default Header;
