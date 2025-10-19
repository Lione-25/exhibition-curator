import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Exhibition from "./pages/Exhibition";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exhibition" element={<Exhibition />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
