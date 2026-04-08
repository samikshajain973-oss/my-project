// src/components/Slideshow.jsx
// ─── Digital Marketing Expertise Slideshow ───────────────────────────────────
// Can be dropped into any page. No props required.

import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const tokens = {
  green:      "#2E7D32",
  greenLight: "#4CAF50",
  black:      "#0A0A0A",
  white:      "#FFFFFF",
};

function Leaf({ top, bottom, left, right, size = 80, opacity = 0.07, rotate = 0 }) {
  return (
    <Box sx={{ position: "absolute", top, bottom, left, right, fontSize: size, opacity, transform: `rotate(${rotate}deg)`, pointerEvents: "none", userSelect: "none", lineHeight: 1 }}>
      🌿
    </Box>
  );
}

const slides = [
  {
    icon:  "📈",
    stat:  "+340% ROAS",
    title: "Performance Advertising",
    body:  "Precision-managed ad campaigns across Meta, Google, and LinkedIn—continuously optimised to deliver the highest return on every rupee spent.",
    tags:  ["Meta Ads", "Google Ads", "A/B Testing", "Retargeting"],
    color: "#66BB6A",
  },
  {
    icon:  "🔍",
    stat:  "Top 3 Rankings",
    title: "SEO & Organic Authority",
    body:  "From technical audits to content strategies—we build lasting organic visibility that drives qualified traffic month after month.",
    tags:  ["Technical SEO", "Keyword Research", "Link Building", "Core Web Vitals"],
    color: "#81C784",
  },
  {
    icon:  "📱",
    stat:  "12.4% Engagement",
    title: "Social Media Excellence",
    body:  "Scroll-stopping content, consistent community management, and data-driven campaigns that make your brand impossible to ignore.",
    tags:  ["Content Strategy", "Reels & Stories", "Community Mgmt", "Influencers"],
    color: "#A5D6A7",
  },
  {
    icon:  "✉️",
    stat:  "45% Open Rate",
    title: "Email & Automation",
    body:  "Drip campaigns, newsletters, and automations that nurture your leads around the clock—converting prospects into loyal customers.",
    tags:  ["Drip Campaigns", "Lead Nurturing", "Segmentation", "A/B Testing"],
    color: "#C8E6C9",
  },
];

export default function Slideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % slides.length), 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ bgcolor: tokens.black, py: { xs: 10, md: 14 }, position: "relative", overflow: "hidden", fontFamily: "'Georgia', serif" }}>
      {/* Background glow */}
      <Box sx={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${tokens.green}12, transparent 65%)`, pointerEvents: "none" }} />
      <Leaf top={-20}    right={-20} size={200} opacity={0.04} rotate={-25} />
      <Leaf bottom={-20} left={-20}  size={180} opacity={0.04} rotate={30}  />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>

        {/* Section heading */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography sx={{ color: tokens.green, fontWeight: 700, letterSpacing: 2.5, fontSize: "0.67rem", textTransform: "uppercase", mb: 1 }}>
            Digital Marketing Expertise
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: tokens.white, fontFamily: "'Georgia',serif", fontSize: { xs: "1.8rem", md: "2.4rem" } }}>
            Every Channel. Every Platform.
            <Box component="span" sx={{ color: tokens.greenLight }}> Every Result.</Box>
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">

          {/* ── Left: slide panel ── */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: "relative", minHeight: 280 }}>
              {slides.map((s, i) => (
                <Box
                  key={i}
                  sx={{
                    position: i === 0 ? "relative" : "absolute",
                    top: 0, left: 0, right: 0,
                    opacity: active === i ? 1 : 0,
                    transform: active === i ? "translateX(0)" : "translateX(28px)",
                    transition: "all 0.7s ease",
                    pointerEvents: active === i ? "auto" : "none",
                    bgcolor: "#0d0d0d",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "20px",
                    p: { xs: 4, md: 5 },
                  }}
                >
                  {/* Stat row */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                    <Box sx={{ width: 52, height: 52, borderRadius: "12px", bgcolor: `${s.color}18`, border: `1px solid ${s.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.7rem", flexShrink: 0 }}>
                      {s.icon}
                    </Box>
                    <Box>
                      <Typography sx={{ color: s.color, fontWeight: 900, fontSize: "1.4rem", fontFamily: "'Georgia',serif", lineHeight: 1 }}>{s.stat}</Typography>
                      <Typography sx={{ color: "#555", fontSize: "0.7rem", mt: 0.2 }}>Avg. client result</Typography>
                    </Box>
                  </Box>

                  <Typography sx={{ fontWeight: 800, color: tokens.white, fontSize: "1.2rem", fontFamily: "'Georgia',serif", mb: 1.5 }}>{s.title}</Typography>
                  <Typography sx={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.8, mb: 3 }}>{s.body}</Typography>

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                    {s.tags.map((tag) => (
                      <Box key={tag} sx={{ px: 1.6, py: 0.4, borderRadius: "100px", bgcolor: `${s.color}12`, border: `1px solid ${s.color}33`, color: s.color, fontSize: "0.66rem", fontWeight: 600 }}>
                        {tag}
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Dots */}
            <Box sx={{ display: "flex", gap: 1.5, mt: 4 }}>
              {slides.map((s, i) => (
                <Box key={i} onClick={() => setActive(i)} sx={{ width: active === i ? 28 : 8, height: 8, borderRadius: 4, bgcolor: active === i ? s.color : "rgba(255,255,255,0.11)", transition: "all 0.35s ease", cursor: "pointer" }} />
              ))}
            </Box>
          </Grid>

          {/* ── Right: clickable list ── */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {slides.map((s, i) => (
                <Box
                  key={i}
                  onClick={() => setActive(i)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2.5,
                    p: 2.5,
                    borderRadius: "14px",
                    border: `1.5px solid ${active === i ? s.color + "55" : "rgba(255,255,255,0.05)"}`,
                    bgcolor: active === i ? `${s.color}0c` : "transparent",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": { borderColor: s.color + "33" },
                  }}
                >
                  <Box sx={{ width: 40, height: 40, borderRadius: "10px", bgcolor: active === i ? `${s.color}18` : "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>
                    {s.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ color: active === i ? s.color : "#ccc", fontWeight: 700, fontSize: "0.87rem", transition: "color 0.3s ease" }}>{s.title}</Typography>
                    <Typography sx={{ color: "#555", fontSize: "0.7rem", mt: 0.15 }}>{s.stat}</Typography>
                  </Box>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: active === i ? s.color : "transparent", flexShrink: 0, transition: "background-color 0.3s ease" }} />
                </Box>
              ))}
            </Box>

            {/* Bottom strip */}
            <Box sx={{ mt: 4, p: 3, borderRadius: "16px", bgcolor: `${tokens.green}0d`, border: `1px solid ${tokens.green}28` }}>
              <Typography sx={{ color: tokens.greenLight, fontWeight: 700, fontSize: "0.75rem", letterSpacing: 1.5, textTransform: "uppercase", mb: 0.75 }}>
                🌳 One Ecosystem
              </Typography>
              <Typography sx={{ color: "#888", fontSize: "0.85rem", lineHeight: 1.75 }}>
                All channels managed together for cohesive, compounding results—no silos, no gaps.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}