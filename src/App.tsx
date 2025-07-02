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
// import Contact from "./pages/contact";

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
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/committees" element={<Committees />} />

        {/* <Route path="/about" element={<About />} />
        <Route path="/committees" element={<Committees />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/contact" element={<Contact />} />  */}
      </Routes>
    </Router>
  );
}

export default App;
