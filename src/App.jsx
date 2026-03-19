import { useState, useEffect, useRef } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./components/theme";
import Header from "./components/header";
import Slideshow from "./components/slideshow";
import AboutUs from "./components/aboutus";
import Services from "./components/services";
import Contactus from "./components/contactus ";
const SECTIONS = ["home", "about", "services", "contact"];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const observerRef = useRef(null);

  useEffect(() => {
    // IntersectionObserver watches each section; whichever is >40% in viewport is "active"
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25, rootMargin: "-80px 0px -40% 0px" }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');
        @keyframes slowSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        * { box-sizing: border-box; }
        body { margin: 0; background: #0A0A0A; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0A0A; }
        ::-webkit-scrollbar-thumb { background: #C8A96E; border-radius: 0; }
      `}</style>

      {/* Sticky header receives current active section for nav highlight */}
      <Header activeSection={activeSection} />

      {/* Each section has its id set for scroll targets + IntersectionObserver */}
      <Slideshow />
      <AboutUs />
      <Services />
      <Contactus />
    </ThemeProvider>
  );
}