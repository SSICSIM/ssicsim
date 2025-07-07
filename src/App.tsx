// src/App.tsx
import "./App.css";
import Lenis from "lenis";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./pages/landing";
// import About from "./pages/about";
import Committees from "./pages/committees";
// import Sponsors from "./pages/sponsors";
import Register from "./pages/register";
// import Contact from "./pages/contact";
import Openings from "./pages/openings";
import UnderConstruction from "./pages/underconstruction";

function App() {
  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div style={{ overflowX: "hidden" }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/committees" element={<Committees />} />
          <Route path="/register" element={<Register />} />
          <Route path="/staff/openings" element={<Openings />} />
          <Route path="*" element={<UnderConstruction />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;