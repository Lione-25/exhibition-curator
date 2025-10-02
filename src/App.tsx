import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Exhibition from "./pages/Exhibition";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/exhibition">Exhibition</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exhibition" element={<Exhibition />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
