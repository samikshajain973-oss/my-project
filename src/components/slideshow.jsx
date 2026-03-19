import { useState, useEffect, useCallback } from "react";
import { Box, Typography, Stack, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const slides = [
  {
    eyebrow: "Welcome to Studio",
    headline: ["Design that", "moves the", "world forward."],
    italic: 1, // which line index gets italic + gold
    sub: "We craft brands, products, and experiences for companies with the ambition to lead their industries.",
    cta: "Explore our work",
    ctaTarget: "services",
    accent: "#C8A96E",
    bg: "radial-gradient(ellipse 80% 60% at 70% 40%, #1a1508 0%, #0A0A0A 65%)",
  },
  {
    eyebrow: "About the Studio",
    headline: ["Crafted with", "intention,", "built to last."],
    italic: 1,
    sub: "A multidisciplinary studio operating at the intersection of strategy, identity, and digital craft.",
    cta: "Our story",
    ctaTarget: "about",
    accent: "#C8A96E",
    bg: "radial-gradient(ellipse 70% 60% at 20% 60%, #0d1a14 0%, #0A0A0A 65%)",
  },
  {
    eyebrow: "Our Services",
    headline: ["Services built", "for", "ambition."],
    italic: 2,
    sub: "From brand strategy to digital products — end-to-end capabilities for organisations that refuse to compromise.",
    cta: "See services",
    ctaTarget: "services",
    accent: "#C8A96E",
    bg: "radial-gradient(ellipse 70% 70% at 80% 30%, #1a0d0d 0%, #0A0A0A 65%)",
  },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Slideshow() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const go = useCallback((idx) => {
    if (animating) return;
    setDirection(idx > current ? 1 : -1);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 500);
  }, [animating, current]);

  const next = () => go((current + 1) % slides.length);
  const prev = () => go((current - 1 + slides.length) % slides.length);

  // Auto-advance
  useEffect(() => {
    const t = setTimeout(next, 5500);
    return () => clearTimeout(t);
  }, [current]); // eslint-disable-line

  const slide = slides[current];

  return (
    <Box
      id="home"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: slide.bg,
        transition: "background 0.8s ease",
        overflow: "hidden",
      }}
    >
      {/* Decorative grid lines */}
      <Box sx={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(200,169,110,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(200,169,110,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }}/>

      {/* Large background number */}
      <Typography
        sx={{
          position: "absolute",
          right: { xs: "-5vw", md: "4vw" },
          bottom: "5vh",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(12rem, 22vw, 22rem)",
          fontWeight: 700,
          lineHeight: 1,
          color: "rgba(200,169,110,0.04)",
          userSelect: "none",
          transition: "opacity .5s",
          opacity: animating ? 0 : 1,
        }}
      >
        {String(current + 1).padStart(2, "0")}
      </Typography>

      {/* Content */}
      <Box
        sx={{
          px: { xs: 4, md: "8vw" },
          pt: 14, pb: 10,
          position: "relative", zIndex: 1,
          opacity: animating ? 0 : 1,
          transform: animating
            ? `translateY(${direction * 20}px)`
            : "translateY(0)",
          transition: "opacity .5s ease, transform .5s ease",
          maxWidth: 860,
        }}
      >
        {/* Eyebrow */}
        <Stack direction="row" alignItems="center" spacing={1.5} mb={4}>
          <Box sx={{ width: 28, height: 1, bgcolor: "primary.main" }} />
          <Typography variant="overline" color="primary">{slide.eyebrow}</Typography>
        </Stack>

        {/* Headline */}
        <Box mb={4}>
          {slide.headline.map((line, i) => (
            <Typography
              key={i}
              variant="h1"
              sx={{
                fontSize: { xs: "3rem", sm: "4.5rem", md: "6rem", lg: "7rem" },
                color: i === slide.italic ? "primary.main" : "text.primary",
                fontStyle: i === slide.italic ? "italic" : "normal",
                display: "block",
                lineHeight: 1.08,
              }}
            >
              {line}
            </Typography>
          ))}
        </Box>

        {/* Sub */}
        <Typography
          color="text.secondary"
          sx={{ maxWidth: 480, mb: 6, fontSize: ".95rem", lineHeight: 1.8, fontWeight: 300 }}
        >
          {slide.sub}
        </Typography>

        {/* CTA */}
        <Box
          onClick={() => scrollTo(slide.ctaTarget)}
          sx={{
            display: "inline-flex", alignItems: "center", gap: 1.5,
            border: "1px solid", borderColor: "primary.main",
            px: 3.5, py: 1.75,
            cursor: "pointer",
            transition: "all .3s",
            "&:hover": { bgcolor: "primary.main" },
            "&:hover .cta-lbl": { color: "background.default" },
            "&:hover .cta-ico": { transform: "translateX(4px)", color: "background.default" },
          }}
        >
          <Typography
            className="cta-lbl"
            sx={{
              fontSize: "0.65rem", letterSpacing: ".2em",
              textTransform: "uppercase", fontWeight: 500, color: "primary.main",
              transition: "color .3s",
            }}
          >
            {slide.cta}
          </Typography>
          <ArrowForwardIcon
            className="cta-ico"
            sx={{ fontSize: 14, color: "primary.main", transition: "all .3s" }}
          />
        </Box>
      </Box>

      {/* Slide counter + controls */}
      <Box
        sx={{
          position: "absolute", bottom: 40, right: { xs: 24, md: "6vw" },
          display: "flex", alignItems: "center", gap: 2, zIndex: 2,
        }}
      >
        <Typography sx={{ fontSize: ".65rem", letterSpacing: ".2em", color: "text.secondary" }}>
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </Typography>
        <Box sx={{ width: 40, height: 1, bgcolor: "divider" }} />
        <IconButton
          onClick={prev}
          size="small"
          sx={{
            border: "1px solid", borderColor: "divider",
            color: "text.secondary", borderRadius: 0, p: 0.8,
            "&:hover": { borderColor: "primary.main", color: "primary.main" },
            transition: "all .2s",
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 14 }} />
        </IconButton>
        <IconButton
          onClick={next}
          size="small"
          sx={{
            border: "1px solid", borderColor: "divider",
            color: "text.secondary", borderRadius: 0, p: 0.8,
            "&:hover": { borderColor: "primary.main", color: "primary.main" },
            transition: "all .2s",
          }}
        >
          <ArrowForwardIcon sx={{ fontSize: 14 }} />
        </IconButton>
      </Box>

      {/* Slide dots */}
      <Stack
        spacing={1}
        sx={{
          position: "absolute", left: { xs: 16, md: "2vw" }, top: "50%",
          transform: "translateY(-50%)", zIndex: 2,
        }}
      >
        {slides.map((_, i) => (
          <Box
            key={i}
            onClick={() => go(i)}
            sx={{
              width: i === current ? 2 : 1,
              height: i === current ? 28 : 12,
              bgcolor: i === current ? "primary.main" : "divider",
              cursor: "pointer",
              transition: "all .4s cubic-bezier(.4,0,.2,1)",
              "&:hover": { bgcolor: "primary.light" },
            }}
          />
        ))}
      </Stack>

      {/* Scroll hint */}
      <Box
        sx={{
          position: "absolute", bottom: 40, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
          zIndex: 2,
        }}
      >
        <Typography sx={{ fontSize: "0.55rem", letterSpacing: ".25em", textTransform: "uppercase", color: "text.secondary" }}>
          Scroll
        </Typography>
        <Box
          sx={{
            width: 1, height: 40, bgcolor: "divider",
            position: "relative", overflow: "hidden",
            "&::after": {
              content: '""', position: "absolute",
              top: 0, left: 0, right: 0, height: "50%",
              bgcolor: "primary.main",
              animation: "scrollHint 1.8s ease-in-out infinite",
            },
            "@keyframes scrollHint": {
              "0%":   { transform: "translateY(-100%)" },
              "100%": { transform: "translateY(200%)" },
            },
          }}
        />
      </Box>
    </Box>
  );
}