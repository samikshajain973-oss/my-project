// src/pages/AboutUs.jsx  (or components/aboutus.jsx — match your import in App.jsx)
import { Box, Container, Typography, Grid, Chip, Avatar } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const tokens = {
  green:      "#2E7D32",
  greenLight: "#4CAF50",
  greenMid:   "#388E3C",
  greenPale:  "#E8F5E9",
  black:      "#0A0A0A",
  white:      "#FFFFFF",
  offWhite:   "#F9FBF9",
  gray:       "#ECEFEC",
  muted:      "#666666",
};

// ── helpers ──────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}
function FadeIn({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useInView();
  const map = { up: "translateY(40px)", left: "translateX(-40px)", right: "translateX(40px)", none: "none" };
  return (
    <Box ref={ref} sx={{ opacity: visible ? 1 : 0, transform: visible ? "none" : map[direction], transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </Box>
  );
}
function Leaf({ top, bottom, left, right, size = 80, opacity = 0.07, rotate = 0 }) {
  return <Box sx={{ position: "absolute", top, bottom, left, right, fontSize: size, opacity, transform: `rotate(${rotate}deg)`, pointerEvents: "none", userSelect: "none", lineHeight: 1 }}>🌿</Box>;
}

// ── data ─────────────────────────────────────────────────────────────────────
const stats = [
  { value: "1",    suffix: " Place", label: "For All Digital Needs" },
  { value: "360",  suffix: "°",      label: "Full Ecosystem View"   },
  { value: "∞",    suffix: "",       label: "Growth Possibilities"  },
];

const treeValues = [
  { icon: "🌱", label: "Roots",    desc: "Strategy — every campaign starts with deep research and clear direction."    },
  { icon: "🪵", label: "Trunk",    desc: "Unified Services — one partner, one plan, zero fragmentation."               },
  { icon: "🌿", label: "Branches", desc: "Creativity & Ads — beautiful work that performs across every channel."       },
  { icon: "🍃", label: "Leaves",   desc: "Measurable Results — clear reports, real numbers, visible growth."           },
];

const teamValues = [
  { icon: "🎯", title: "Data-First Thinking",   desc: "Every decision we make is grounded in analytics, not guesswork." },
  { icon: "🤝", title: "Partnership Mentality",  desc: "We embed ourselves in your team—your goals become our goals."    },
  { icon: "🔄", title: "Continuous Iteration",   desc: "We test, learn, and optimise every week—never settling."         },
  { icon: "💚", title: "Genuine Care",           desc: "We celebrate your milestones as our own. Your growth is personal." },
];

const palette = [
  { color: tokens.green, label: "Green",      meaning: "Trust. Growth. A fresh spark of creativity.", border: false },
  { color: tokens.white, label: "White",      meaning: "Clarity, transparency, and a stress-free journey.", border: true  },
  { color: tokens.black, label: "Black",      meaning: "Bold innovation and strong, future-ready strategy.", border: false },
];

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <Box sx={{ fontFamily: "'Georgia', serif", bgcolor: tokens.offWhite, color: tokens.black, overflowX: "hidden" }}>

      {/* ══ HERO ══ */}
      <Box sx={{ bgcolor: tokens.black, color: tokens.white, pt: { xs: 14, md: 18 }, pb: { xs: 10, md: 14 }, position: "relative", overflow: "hidden" }}>
        <Box sx={{ position: "absolute", top: -80, left: -80, width: 420, height: 420, borderRadius: "50%", background: `radial-gradient(circle, ${tokens.greenMid}33, transparent 70%)`, pointerEvents: "none" }} />
        <Box sx={{ position: "absolute", bottom: -100, right: -60, width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, ${tokens.green}22, transparent 70%)`, pointerEvents: "none" }} />
        <Leaf top={20}    right={60}  size={64} opacity={0.12} rotate={-20} />
        <Leaf top="50%"   left={30}   size={40} opacity={0.07} rotate={30}  />
        <Leaf bottom={20} right={200} size={52} opacity={0.09} rotate={-45} />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <FadeIn>
            <Chip label="🌿 Our Story" sx={{ bgcolor: `${tokens.green}22`, color: tokens.greenLight, border: `1px solid ${tokens.green}55`, fontSize: "0.7rem", letterSpacing: 1.5, mb: 3 }} />
          </FadeIn>
          <FadeIn delay={0.1}>
            <Typography variant="h1" sx={{ fontSize: { xs: "2.8rem", sm: "4rem", md: "5.5rem" }, fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", mb: 3, fontFamily: "'Georgia',serif" }}>
              Where Brands Don't
              <br />Just Grow—
              <Box component="span" sx={{ color: tokens.greenLight }}> They Flourish.</Box>
            </Typography>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Typography sx={{ fontSize: { xs: "1rem", md: "1.2rem" }, color: "#aaa", maxWidth: 600, lineHeight: 1.8, mb: 5 }}>
              In a fragmented digital world, Treevion is the single, living ecosystem where strategy, creativity, automation, and analytics grow together—as one unified tree.
            </Typography>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Box sx={{ display: "flex", gap: { xs: 4, md: 8 }, flexWrap: "wrap" }}>
              {stats.map((s) => (
                <Box key={s.label}>
                  <Typography sx={{ fontSize: { xs: "2rem", md: "2.8rem" }, fontWeight: 800, color: tokens.greenLight, lineHeight: 1, fontFamily: "'Georgia',serif" }}>
                    {s.value}<span style={{ fontSize: "1.4rem" }}>{s.suffix}</span>
                  </Typography>
                  <Typography sx={{ fontSize: "0.72rem", color: "#888", letterSpacing: 1.2, mt: 0.5, textTransform: "uppercase" }}>{s.label}</Typography>
                </Box>
              ))}
            </Box>
          </FadeIn>
        </Container>
      </Box>

      {/* ══ BRAND STORY ══ */}
      <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: tokens.white }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
            <Grid item xs={12} md={5}>
              <FadeIn direction="left">
                <Box sx={{ position: "relative", bgcolor: tokens.black, borderRadius: "24px", p: { xs: 4, md: 6 }, overflow: "hidden", minHeight: 380, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: "60%", background: `radial-gradient(ellipse at 50% 0%, ${tokens.green}33, transparent 70%)` }} />
                  <Typography sx={{ fontSize: "6rem", textAlign: "center", mb: 2, filter: "drop-shadow(0 0 24px #4CAF5066)", animation: "float 4s ease-in-out infinite", "@keyframes float": { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } } }}>🌳</Typography>
                  <Typography sx={{ color: tokens.greenLight, fontWeight: 700, fontSize: "1.1rem", mb: 1 }}>One Seed. Infinite Growth.</Typography>
                  <Typography sx={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.75 }}>Just like a tree grows from a single seed into a strong, unified structure—Treevion gives your brand one powerful place where everything grows in harmony.</Typography>
                </Box>
              </FadeIn>
            </Grid>
            <Grid item xs={12} md={7}>
              <FadeIn direction="right">
                <Typography sx={{ color: tokens.green, fontWeight: 700, letterSpacing: 2.5, fontSize: "0.7rem", textTransform: "uppercase", mb: 2 }}>Our Origin</Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.4rem" }, lineHeight: 1.2, mb: 3, fontFamily: "inherit" }}>
                  Born from the Gap<br />Between Growth & Chaos
                </Typography>
                <Typography sx={{ color: "#555", lineHeight: 1.9, fontSize: "1rem", mb: 3 }}>
                  Businesses were forced to manage multiple agencies, juggle scattered strategies, and deal with delays, inconsistencies, and zero accountability. Brands needed to grow—but their digital ecosystem wasn't growing together.
                </Typography>
                <Typography sx={{ color: "#555", lineHeight: 1.9, fontSize: "1rem", mb: 4 }}>
                  From this gap, <strong style={{ color: tokens.black }}>Treevion</strong> was born. We built an all-in-one digital growth ecosystem where strategy, creativity, branding, advertising, automation, and analytics come together under one strong, stable trunk—every solution rooted in data, nurtured with creativity, and shaped with AI-powered insights.
                </Typography>
                {/* Founder chip */}
                <Box sx={{ display: "inline-flex", alignItems: "center", gap: 2, px: 3, py: 1.5, borderRadius: "100px", bgcolor: tokens.greenPale, border: `1px solid ${tokens.green}33` }}>
                  <Avatar sx={{ bgcolor: tokens.green, width: 36, height: 36, fontSize: "0.9rem" }}>S</Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", color: tokens.black }}>Samiksha Jain</Typography>
                    <Typography sx={{ color: tokens.muted, fontSize: "0.72rem" }}>Founder & CEO, Treevion</Typography>
                  </Box>
                </Box>
              </FadeIn>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ══ MISSION & VISION ══ */}
      <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: tokens.offWhite, position: "relative", overflow: "hidden" }}>
        <Leaf top={0} right={-10} size={180} opacity={0.04} rotate={-30} />
        <Container maxWidth="lg">
          <FadeIn>
            <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
              <Typography sx={{ color: tokens.green, fontWeight: 700, letterSpacing: 2.5, fontSize: "0.68rem", textTransform: "uppercase", mb: 1.5 }}>Purpose & Direction</Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, fontFamily: "inherit", fontSize: { xs: "1.8rem", md: "2.4rem" } }}>
                What Drives Everything We Do
              </Typography>
            </Box>
          </FadeIn>
          <Grid container spacing={4}>
            {[
              { icon: "🌱", tag: "Mission", title: "Empowering Brands with Unified Intelligence", body: "To empower brands with unified, intelligent, and result-driven digital solutions that simplify growth, enhance visibility, and create meaningful connections—through creativity, innovation, strategy, and AI-backed insights.", bg: tokens.black, color: tokens.white, accent: tokens.greenLight },
              { icon: "🌳", tag: "Vision",  title: "The World's Most Trusted Growth Ecosystem",   body: "To become the world's most trusted all-in-one digital growth ecosystem, where every brand—big or small—can grow like a strong tree with deep strategy roots, creative branches, and limitless digital possibilities.", bg: tokens.green, color: tokens.white, accent: "#A5D6A7" },
            ].map((card, i) => (
              <Grid item xs={12} md={6} key={card.tag}>
                <FadeIn delay={i * 0.15}>
                  <Box sx={{ bgcolor: card.bg, color: card.color, borderRadius: "24px", p: { xs: 4, md: 5 }, height: "100%", position: "relative", overflow: "hidden" }}>
                    <Box sx={{ position: "absolute", top: -20, right: -20, fontSize: 120, opacity: 0.06 }}>{card.icon}</Box>
                    <Chip label={card.tag} sx={{ bgcolor: `${card.accent}22`, color: card.accent, border: `1px solid ${card.accent}44`, fontSize: "0.68rem", letterSpacing: 1.5, mb: 3 }} />
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, fontFamily: "inherit", lineHeight: 1.3 }}>{card.title}</Typography>
                    <Typography sx={{ opacity: 0.82, lineHeight: 1.85, fontSize: "0.95rem" }}>{card.body}</Typography>
                  </Box>
                </FadeIn>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ══ TREE ANATOMY ══ */}
      <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: tokens.white }}>
        <Container maxWidth="lg">
          <FadeIn>
            <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
              <Typography sx={{ color: tokens.green, fontWeight: 700, letterSpacing: 2.5, fontSize: "0.68rem", textTransform: "uppercase", mb: 1.5 }}>Why The Tree?</Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.4rem" }, fontFamily: "inherit" }}>
                Every Part of a Tree,<br />Every Part of Your Growth
              </Typography>
            </Box>
          </FadeIn>
          <Grid container spacing={3}>
            {treeValues.map((v, i) => (
              <Grid item xs={12} sm={6} md={3} key={v.label}>
                <FadeIn delay={i * 0.1}>
                  <Box sx={{ border: `1.5px solid ${tokens.gray}`, borderRadius: "18px", p: 3.5, textAlign: "center", transition: "all 0.3s ease", cursor: "default", height: "100%", "&:hover": { borderColor: tokens.greenLight, transform: "translateY(-6px)", boxShadow: `0 16px 40px ${tokens.green}18` } }}>
                    <Typography sx={{ fontSize: "2.5rem", mb: 2 }}>{v.icon}</Typography>
                    <Typography sx={{ fontWeight: 700, color: tokens.green, fontSize: "0.75rem", letterSpacing: 1.5, textTransform: "uppercase", mb: 0.75 }}>{v.label}</Typography>
                    <Typography sx={{ fontSize: "0.88rem", color: "#555", lineHeight: 1.75 }}>{v.desc}</Typography>
                  </Box>
                </FadeIn>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ══ OUR VALUES ══ */}
      <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: tokens.black, position: "relative", overflow: "hidden" }}>
        <Box sx={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 50%, ${tokens.green}12, transparent 60%)`, pointerEvents: "none" }} />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <FadeIn>
            <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
              <Typography sx={{ color: tokens.green, fontWeight: 700, letterSpacing: 2.5, fontSize: "0.68rem", textTransform: "uppercase", mb: 1.5 }}>How We Work</Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, color: tokens.white, fontFamily: "inherit", fontSize: { xs: "1.8rem", md: "2.4rem" } }}>
                The Values Behind<Box component="span" sx={{ color: tokens.greenLight }}> Our Work</Box>
              </Typography>
            </Box>
          </FadeIn>
          <Grid container spacing={3}>
            {teamValues.map((v, i) => (
              <Grid item xs={12} sm={6} key={v.title}>
                <FadeIn delay={i * 0.1}>
                  <Box sx={{ display: "flex", gap: 3, p: 3.5, borderRadius: "18px", border: "1px solid rgba(255,255,255,0.07)", bgcolor: "rgba(255,255,255,0.03)", transition: "all 0.3s ease", "&:hover": { bgcolor: "rgba(255,255,255,0.06)", borderColor: `${tokens.greenLight}33`, transform: "translateY(-4px)" }, height: "100%" }}>
                    <Box sx={{ width: 52, height: 52, borderRadius: "14px", bgcolor: `${tokens.green}18`, border: `1px solid ${tokens.green}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", flexShrink: 0 }}>{v.icon}</Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: tokens.white, mb: 0.75, fontFamily: "inherit" }}>{v.title}</Typography>
                      <Typography sx={{ color: "#777", fontSize: "0.88rem", lineHeight: 1.8 }}>{v.desc}</Typography>
                    </Box>
                  </Box>
                </FadeIn>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ══ BRAND IDENTITY ══ */}
      <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: tokens.offWhite }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <FadeIn direction="left">
                <Typography sx={{ color: tokens.green, fontWeight: 700, letterSpacing: 2.5, fontSize: "0.68rem", textTransform: "uppercase", mb: 2 }}>Our Identity</Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.2rem" }, fontFamily: "inherit", mb: 4 }}>Colors That Carry Our Promise</Typography>
                {palette.map((c) => (
                  <Box key={c.label} sx={{ display: "flex", alignItems: "center", gap: 2.5, mb: 3 }}>
                    <Box sx={{ width: 48, height: 48, borderRadius: "50%", bgcolor: c.color, flexShrink: 0, border: c.border ? `2px solid ${tokens.gray}` : "none", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }} />
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: "0.9rem" }}>{c.label}</Typography>
                      <Typography sx={{ color: tokens.muted, fontSize: "0.86rem" }}>{c.meaning}</Typography>
                    </Box>
                  </Box>
                ))}
              </FadeIn>
            </Grid>
            <Grid item xs={12} md={6}>
              <FadeIn direction="right">
                <Box sx={{ bgcolor: tokens.black, borderRadius: "24px", p: { xs: 4, md: 5 }, color: tokens.white, position: "relative", overflow: "hidden" }}>
                  <Box sx={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, background: `radial-gradient(ellipse at 80% 20%, ${tokens.green}22, transparent 60%)`, pointerEvents: "none" }} />
                  <Typography sx={{ color: tokens.greenLight, fontWeight: 700, letterSpacing: 2, fontSize: "0.7rem", textTransform: "uppercase", mb: 2 }}>💚 You + Treevion</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, fontFamily: "inherit", lineHeight: 1.3 }}>Every Brand is a Seed with Potential</Typography>
                  <Typography sx={{ color: "#aaa", lineHeight: 1.9, fontSize: "0.95rem", mb: 3 }}>
                    We nurture it with care, consistency, and clarity—helping it grow into its strongest form. Your growth is our responsibility. Your challenges become our strategy.
                  </Typography>
                  <Box sx={{ pt: 3, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    <Typography sx={{ color: tokens.greenLight, fontStyle: "italic", fontSize: "0.95rem", lineHeight: 1.75 }}>
                      "We stand by our clients not as service providers,<br />but as growth partners who believe in long-term relationships, trust, and shared success."
                    </Typography>
                    <Typography sx={{ color: "#555", fontSize: "0.8rem", mt: 1.5 }}>— Samiksha Jain, Founder</Typography>
                  </Box>
                </Box>
              </FadeIn>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ══ CTA ══ */}
      <Box sx={{ bgcolor: tokens.green, py: { xs: 10, md: 14 }, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <Leaf top={-20} left={-30}  size={200} opacity={0.07} rotate={20}  />
        <Leaf bottom={-20} right={-30} size={200} opacity={0.07} rotate={-20} />
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <FadeIn>
            <Typography sx={{ fontSize: "4rem", mb: 2 }}>🌳</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: tokens.white, fontFamily: "inherit", fontSize: { xs: "2rem", md: "3rem" }, lineHeight: 1.15, mb: 3 }}>
              Ready to Grow Your<br />Digital Forest?
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: "1.05rem", mb: 5, lineHeight: 1.8 }}>
              We are not just building digital presence.<br />
              We are building digital forests—ever-growing, ever-evolving, ever-inspired.
            </Typography>
            <Box component="button" onClick={() => navigate("/contact")} sx={{ bgcolor: tokens.white, color: tokens.green, border: "none", borderRadius: "100px", px: 5, py: 2, fontSize: "1rem", fontWeight: 800, cursor: "pointer", fontFamily: "inherit", transition: "all 0.25s ease", "&:hover": { transform: "scale(1.04)", boxShadow: "0 12px 36px rgba(0,0,0,0.2)" } }}>
              Start Growing with Treevion →
            </Box>
          </FadeIn>
        </Container>
      </Box>
    </Box>
  );
}