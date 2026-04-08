// src/components/Footer.jsx
import { Box, Container, Typography, Grid, IconButton, Divider } from "@mui/material";
import { Link } from "react-router-dom";

const tokens = {
  green:      "#2E7D32",
  greenLight: "#4CAF50",
  greenPale:  "#E8F5E9",
  black:      "#0A0A0A",
  white:      "#FFFFFF",
  muted:      "#555555",
};

// ── Logo path — same as Header ──────────────────────────────────────────────
// Option A (public folder): "/logo.png"
// Option B (src/assets):    import LogoImg from "../assets/logo.png";
const LogoImg = "/logo.png";

const navLinks = [
  { label: "Home",     to: "/" },
  { label: "About",    to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact",  to: "/contact" },
];

const serviceLinks = [
  "Digital Marketing Strategy",
  "SEO & SEM",
  "Social Media Marketing",
  "Branding & Design",
  "Web Development",
  "Paid Advertising",
  "Content & Email Marketing",
];

const socialLinks = [
  { label: "Instagram", icon: "📸", href: "https://instagram.com" },
  { label: "LinkedIn",  icon: "💼", href: "https://linkedin.com"  },
  { label: "Facebook",  icon: "📘", href: "https://facebook.com"  },
  { label: "Twitter",   icon: "🐦", href: "https://twitter.com"   },
  { label: "YouTube",   icon: "▶️", href: "https://youtube.com"   },
];

const contactInfo = [
  { icon: "📧", text: "samikshajainffdl@gmail.com", href: "mailto:samikshajainffdl@gmail.com" },
  { icon: "📞", text: "+91 94146 96345",             href: "tel:+919414696345"                 },
  { icon: "📍", text: "16 Shivalik Vihar, Chamti Kheda Road,\nChittaurgarh, Rajasthan – 312001" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#080808",
        color: tokens.white,
        pt: { xs: 8, md: 12 },
        pb: 4,
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* Background glow */}
      <Box sx={{ position: "absolute", top: -80, left: -80, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${tokens.green}12, transparent 65%)`, pointerEvents: "none" }} />
      <Box sx={{ position: "absolute", bottom: -60, right: -60, width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle, ${tokens.green}0a, transparent 65%)`, pointerEvents: "none" }} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={{ xs: 5, md: 6 }}>

          {/* ── Col 1 : Brand ── */}
          <Grid item xs={12} md={4}>
            {/* Logo */}
            <Box component={Link} to="/" sx={{ display: "inline-flex", alignItems: "center", textDecoration: "none", mb: 3 }}>
              <Box
                component="img"
                src={LogoImg}
                alt="Treevion"
                sx={{
                  height: 42,
                  width: "auto",
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                }}
              />
            </Box>

            <Typography sx={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.85, mb: 3, maxWidth: 300 }}>
              Treevion is your all-in-one digital growth ecosystem—where strategy,
              creativity, branding, advertising, and analytics grow together under
              one strong, stable trunk.
            </Typography>

            {/* Tagline badge */}
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, px: 2.5, py: 1, borderRadius: "100px", border: `1px solid ${tokens.green}44`, bgcolor: `${tokens.green}0f` }}>
              <Typography sx={{ fontSize: "1rem" }}>🌱</Typography>
              <Typography sx={{ color: tokens.greenLight, fontSize: "0.75rem", fontWeight: 700, letterSpacing: 0.5 }}>
                Rooted in Data. Powered by AI.
              </Typography>
            </Box>

            {/* Social icons */}
            <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
              {socialLinks.map((s) => (
                <Box
                  key={s.label}
                  component="a"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  sx={{
                    width: 40, height: 40, borderRadius: "10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.1rem",
                    bgcolor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    textDecoration: "none",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      bgcolor: `${tokens.green}22`,
                      borderColor: `${tokens.green}55`,
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  {s.icon}
                </Box>
              ))}
            </Box>
          </Grid>

          {/* ── Col 2 : Quick Links ── */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography sx={{ color: tokens.greenLight, fontWeight: 700, fontSize: "0.68rem", letterSpacing: 2, textTransform: "uppercase", mb: 3 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {navLinks.map((link) => (
                <Box
                  key={link.label}
                  component={Link}
                  to={link.to}
                  sx={{
                    color: "#999",
                    textDecoration: "none",
                    fontSize: "0.88rem",
                    fontFamily: "'Georgia', serif",
                    transition: "all 0.2s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.8,
                    "&:hover": { color: tokens.greenLight, paddingLeft: "4px" },
                  }}
                >
                  <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: tokens.green, flexShrink: 0 }} />
                  {link.label}
                </Box>
              ))}
            </Box>
          </Grid>

          {/* ── Col 3 : Services ── */}
          <Grid item xs={6} sm={4} md={3}>
            <Typography sx={{ color: tokens.greenLight, fontWeight: 700, fontSize: "0.68rem", letterSpacing: 2, textTransform: "uppercase", mb: 3 }}>
              Our Services
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {serviceLinks.map((s) => (
                <Box
                  key={s}
                  component={Link}
                  to="/services"
                  sx={{
                    color: "#999",
                    textDecoration: "none",
                    fontSize: "0.84rem",
                    fontFamily: "'Georgia', serif",
                    transition: "all 0.2s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.8,
                    "&:hover": { color: tokens.greenLight, paddingLeft: "4px" },
                  }}
                >
                  <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: `${tokens.green}77`, flexShrink: 0 }} />
                  {s}
                </Box>
              ))}
            </Box>
          </Grid>

          {/* ── Col 4 : Contact ── */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography sx={{ color: tokens.greenLight, fontWeight: 700, fontSize: "0.68rem", letterSpacing: 2, textTransform: "uppercase", mb: 3 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              {contactInfo.map((info) => (
                <Box
                  key={info.text}
                  component={info.href ? "a" : "div"}
                  href={info.href}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.5,
                    textDecoration: "none",
                    color: "inherit",
                    transition: "all 0.2s ease",
                    "&:hover .contact-text": info.href ? { color: tokens.greenLight } : {},
                  }}
                >
                  <Box sx={{ width: 34, height: 34, borderRadius: "8px", bgcolor: `${tokens.green}15`, border: `1px solid ${tokens.green}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.95rem", flexShrink: 0, mt: 0.1 }}>
                    {info.icon}
                  </Box>
                  <Typography className="contact-text" sx={{ color: "#888", fontSize: "0.82rem", lineHeight: 1.65, whiteSpace: "pre-line", transition: "color 0.2s ease", fontFamily: "'Georgia', serif" }}>
                    {info.text}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Owner */}
            <Box sx={{ mt: 3.5, pt: 3, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <Typography sx={{ color: "#666", fontSize: "0.72rem", mb: 0.5 }}>Founded by</Typography>
              <Typography sx={{ color: tokens.white, fontWeight: 700, fontSize: "0.9rem" }}>Samiksha Jain</Typography>
              <Typography sx={{ color: tokens.greenLight, fontSize: "0.75rem" }}>Founder & CEO, Treevion</Typography>
            </Box>
          </Grid>
        </Grid>

        {/* ── Bottom bar ── */}
        <Box sx={{ mt: { xs: 6, md: 8 }, pt: 3, borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" }, gap: 2 }}>
          <Typography sx={{ color: "#444", fontSize: "0.78rem", fontFamily: "'Georgia', serif" }}>
            © {year} Treevion Digital Marketing Agency. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Box sx={{ fontSize: "0.95rem" }}>🌳</Box>
            <Typography sx={{ color: "#555", fontSize: "0.75rem", fontStyle: "italic" }}>
              Where Brands Don't Just Grow—They Flourish.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}