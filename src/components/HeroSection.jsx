// src/components/HeroSection.jsx
// ─── Reusable Hero with 4-slide digital marketing slideshow ─────────────────
// Props:
//   onStartGrowing    — callback for "Start Growing Today" button (opens form)
//   onExploreServices — callback for "Explore Services" button (scroll/navigate)

import { Box, Container, Grid, Typography, Chip } from "@mui/material";
import { useEffect, useState } from "react";

const tokens = {
  green:      "#2E7D32",
  greenLight: "#4CAF50",
  greenMid:   "#388E3C",
  black:      "#0A0A0A",
  white:      "#FFFFFF",
  muted:      "#999999",
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
    badge:    "🚀 Performance Marketing",
    headline: ["Scale Your Brand", "With Data-Driven", "Digital Marketing"],
    sub:      "From SEO to paid ads, social to automation—Treevion manages your entire digital ecosystem under one roof.",
    accent:   "#4CAF50",
    visual:   { icon: "📈", label: "ROAS Growth",    value: "+340%", sub: "Last 90 days"        },
    tags:     ["Google Ads", "Meta Ads", "Analytics"],
  },
  {
    badge:    "🔍 SEO & Organic Growth",
    headline: ["Rank Higher.", "Get Found First.", "Convert More."],
    sub:      "AI-powered SEO strategies that build lasting organic authority and drive qualified traffic to your business.",
    accent:   "#66BB6A",
    visual:   { icon: "🔍", label: "Organic Traffic", value: "+218%", sub: "Month over month"    },
    tags:     ["Technical SEO", "Content Strategy", "Link Building"],
  },
  {
    badge:    "📱 Social Media Marketing",
    headline: ["Build a Community.", "Spark Conversations.", "Grow Your Brand."],
    sub:      "Strategic content, community management, and influencer campaigns that turn followers into loyal customers.",
    accent:   "#81C784",
    visual:   { icon: "📱", label: "Engagement Rate", value: "12.4%", sub: "Above industry avg"  },
    tags:     ["Instagram", "LinkedIn", "YouTube"],
  },
  {
    badge:    "🎯 Paid Advertising",
    headline: ["Every Rupee", "Spent Smarter.", "Results Guaranteed."],
    sub:      "Precision-managed Meta, Google, and LinkedIn Ads with continuous A/B testing to maximise every rupee.",
    accent:   "#A5D6A7",
    visual:   { icon: "🎯", label: "Cost Per Lead",   value: "↓62%",  sub: "vs industry average" },
    tags:     ["PPC", "Retargeting", "Lookalike Ads"],
  },
];

const stats = [
  { value: "7+",   label: "Core Services"    },
  { value: "1",    label: "Unified Partner"  },
  { value: "360°", label: "Digital Coverage" },
  { value: "∞",    label: "Growth Potential" },
];

export default function HeroSection({ onStartGrowing, onExploreServices }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setActive((p) => (p + 1) % slides.length), 4500);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <Box
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      sx={{
        position: "relative",
        bgcolor: tokens.black,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        pt: { xs: 10, md: 0 },
        pb: { xs: 8,  md: 0 },
      }}
    >
      {/* Per-slide colour glow */}
      {slides.map((s, i) => (
        <Box key={i} sx={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse at 18% 50%, ${s.accent}16, transparent 55%), radial-gradient(ellipse at 82% 30%, ${s.accent}0a, transparent 50%)`, opacity: active === i ? 1 : 0, transition: "opacity 1.1s ease" }} />
      ))}

      {/* Subtle grid */}
      <Box sx={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <Leaf top={40}   right={60}  size={100} opacity={0.07} rotate={-18} />
      <Leaf bottom={60} right={280} size={60}  opacity={0.04} rotate={25}  />
      <Leaf top="42%"  left={18}   size={46}  opacity={0.04} rotate={40}  />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">

          {/* ── LEFT: text ── */}
          <Grid item xs={12} md={7}>

            {/* Badge */}
            <Box sx={{ mb: 2.5, height: 32, position: "relative" }}>
              {slides.map((s, i) => (
                <Chip key={i} label={s.badge} sx={{ position: "absolute", bgcolor: `${tokens.green}22`, color: tokens.greenLight, border: `1px solid ${tokens.green}55`, fontSize: "0.68rem", letterSpacing: 1.2, opacity: active === i ? 1 : 0, transform: active === i ? "translateY(0)" : "translateY(10px)", transition: "all 0.6s ease", pointerEvents: "none" }} />
              ))}
            </Box>

            {/* Headline */}
            <Box sx={{ mb: 3, minHeight: { xs: 152, md: 192 }, position: "relative" }}>
              {slides.map((s, i) => (
                <Box key={i} sx={{ position: i === 0 ? "relative" : "absolute", top: 0, opacity: active === i ? 1 : 0, transform: active === i ? "translateY(0)" : "translateY(18px)", transition: "all 0.7s ease", pointerEvents: active === i ? "auto" : "none" }}>
                  {s.headline.map((line, li) => (
                    <Typography key={li} variant="h1" sx={{ fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.4rem" }, fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", fontFamily: "'Georgia',serif", color: li === 1 ? s.accent : tokens.white, display: "block" }}>
                      {line}
                    </Typography>
                  ))}
                </Box>
              ))}
            </Box>

            {/* Sub */}
            <Box sx={{ mb: 4.5, minHeight: { xs: 80, md: 70 }, position: "relative" }}>
              {slides.map((s, i) => (
                <Typography key={i} sx={{ position: i === 0 ? "relative" : "absolute", top: 0, color: tokens.muted, fontSize: { xs: "0.95rem", md: "1.08rem" }, maxWidth: 500, lineHeight: 1.82, opacity: active === i ? 1 : 0, transition: "opacity 0.7s ease 0.1s", pointerEvents: active === i ? "auto" : "none" }}>
                  {s.sub}
                </Typography>
              ))}
            </Box>

            {/* CTA buttons */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 5 }}>
              <Box component="button" onClick={onStartGrowing}
                sx={{ bgcolor: tokens.green, color: tokens.white, border: "none", borderRadius: "100px", px: { xs: 3.5, md: 4.5 }, py: { xs: 1.5, md: 1.75 }, fontSize: { xs: "0.88rem", md: "0.95rem" }, fontWeight: 700, cursor: "pointer", fontFamily: "'Georgia',serif", transition: "all 0.3s ease", "&:hover": { bgcolor: tokens.greenMid, transform: "translateY(-3px)", boxShadow: `0 14px 36px ${tokens.green}50` } }}>
                🌱 Start Growing Today
              </Box>
              <Box component="button" onClick={onExploreServices}
                sx={{ bgcolor: "transparent", color: tokens.white, border: "1.5px solid rgba(255,255,255,0.28)", borderRadius: "100px", px: { xs: 3.5, md: 4.5 }, py: { xs: 1.5, md: 1.75 }, fontSize: { xs: "0.88rem", md: "0.95rem" }, fontWeight: 600, cursor: "pointer", fontFamily: "'Georgia',serif", transition: "all 0.3s ease", "&:hover": { borderColor: tokens.greenLight, color: tokens.greenLight, transform: "translateY(-2px)" } }}>
                Explore Services →
              </Box>
            </Box>

            {/* Tags */}
            <Box sx={{ minHeight: 36, position: "relative" }}>
              {slides.map((s, i) => (
                <Box key={i} sx={{ position: i === 0 ? "relative" : "absolute", top: 0, display: "flex", gap: 1, flexWrap: "wrap", opacity: active === i ? 1 : 0, transition: "opacity 0.5s ease", pointerEvents: active === i ? "auto" : "none" }}>
                  {s.tags.map((tag) => (
                    <Box key={tag} sx={{ px: 1.8, py: 0.5, borderRadius: "100px", border: "1px solid rgba(255,255,255,0.11)", color: "#aaa", fontSize: "0.68rem", letterSpacing: 0.4 }}>{tag}</Box>
                  ))}
                </Box>
              ))}
            </Box>
          </Grid>

          {/* ── RIGHT: metric card (desktop) ── */}
          <Grid item xs={12} md={5} sx={{ display: { xs: "none", md: "block" } }}>
            <Box sx={{ position: "relative" }}>
              <Box sx={{ bgcolor: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "24px", p: 4, textAlign: "center", position: "relative", overflow: "hidden" }}>
                <Box sx={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle,${tokens.green}1c,transparent 70%)`, pointerEvents: "none" }} />

                {slides.map((s, i) => (
                  <Box key={i} sx={{ opacity: active === i ? 1 : 0, transform: active === i ? "scale(1)" : "scale(0.94)", transition: "all 0.6s ease", position: i === 0 ? "relative" : "absolute", top: 0, left: 0, right: 0, px: 4, pt: 4, pointerEvents: active === i ? "auto" : "none" }}>
                    <Typography sx={{ fontSize: "4rem", mb: 1, filter: `drop-shadow(0 0 24px ${s.accent}55)`, animation: "float 3.5s ease-in-out infinite", "@keyframes float": { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } } }}>
                      {s.visual.icon}
                    </Typography>
                    <Typography sx={{ color: "#666", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: 2, mb: 0.4 }}>{s.visual.label}</Typography>
                    <Typography sx={{ color: s.accent, fontWeight: 900, fontSize: "3.2rem", lineHeight: 1, mb: 0.4, fontFamily: "'Georgia',serif" }}>{s.visual.value}</Typography>
                    <Typography sx={{ color: "#555", fontSize: "0.76rem" }}>{s.visual.sub}</Typography>
                  </Box>
                ))}

                <Box sx={{ display: "flex", justifyContent: "space-around", mt: 12, pt: 3, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  {[{ v: "7+", l: "Services" }, { v: "360°", l: "Coverage" }, { v: "1", l: "Partner" }].map((s) => (
                    <Box key={s.l} sx={{ textAlign: "center" }}>
                      <Typography sx={{ color: tokens.greenLight, fontWeight: 800, fontSize: "1.4rem" }}>{s.v}</Typography>
                      <Typography sx={{ color: "#444", fontSize: "0.68rem", mt: 0.25 }}>{s.l}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Corner badges */}
              {[
                { label: "🧭 Strategy", top: -14, left: -14   },
                { label: "📣 Ads",      top: -14, right: -14  },
                { label: "🔍 SEO",      bottom: -14, left: -14  },
                { label: "🎨 Design",   bottom: -14, right: -14 },
              ].map((b) => (
                <Box key={b.label} sx={{ position: "absolute", top: b.top, bottom: b.bottom, left: b.left, right: b.right, bgcolor: tokens.black, border: `1px solid ${tokens.green}44`, borderRadius: "100px", px: 2, py: 0.7, fontSize: "0.68rem", color: tokens.greenLight, fontWeight: 600, whiteSpace: "nowrap", boxShadow: `0 4px 14px ${tokens.green}16` }}>
                  {b.label}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Stats bar */}
        <Box sx={{ display: "flex", gap: { xs: 4, md: 8 }, flexWrap: "wrap", mt: { xs: 7, md: 10 }, pt: 4, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {stats.map((s) => (
            <Box key={s.label}>
              <Typography sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, fontWeight: 900, color: tokens.greenLight, lineHeight: 1, fontFamily: "'Georgia',serif" }}>{s.value}</Typography>
              <Typography sx={{ color: "#444", fontSize: "0.65rem", letterSpacing: 1.8, mt: 0.5, textTransform: "uppercase" }}>{s.label}</Typography>
            </Box>
          ))}
        </Box>

        {/* Dots */}
        <Box sx={{ display: "flex", gap: 1.5, mt: 4 }}>
          {slides.map((_, i) => (
            <Box key={i} onClick={() => setActive(i)} sx={{ width: active === i ? 32 : 8, height: 8, borderRadius: 4, bgcolor: active === i ? tokens.greenLight : "rgba(255,255,255,0.13)", transition: "all 0.4s ease", cursor: "pointer" }} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}