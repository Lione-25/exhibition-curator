import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Exhibition from "./pages/Exhibition";
import { ExhibitionProvider } from "./context/ExhibitionContext";
import { SearchProvider } from "./context/SearchContext";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <SearchProvider>
        <ExhibitionProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exhibition" element={<Exhibition />} />
          </Routes>
        </ExhibitionProvider>
      </SearchProvider>
    </BrowserRouter>
  );
}

export default App;
