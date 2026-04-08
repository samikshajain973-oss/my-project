import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/aboutus";
import Services from "./components/services";
import Contact from "./components/contactus";

// ✅ THIS FIXES THE "PAGE OPENS AT FOOTER" BUG
// Place this inside Router so it can access useLocation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />   {/* ← must be INSIDE <Router> */}
      <Header />
      <Routes>
        <Route path="/"        element={<Home />}     />
        <Route path="/about"   element={<About />}    />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />}  />
      </Routes>
      <Footer />
    </Router>
  );
}