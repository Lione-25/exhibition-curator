import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="app-title">The Virtual Gallery</h1>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/exhibition">Exhibition</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
