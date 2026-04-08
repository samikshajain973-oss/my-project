import { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Box, Button, IconButton,
  Drawer, List, ListItem, ListItemButton,
  ListItemText, useScrollTrigger, Slide,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation } from "react-router-dom";

// ─── IMPORTANT: Logo import ────────────────────────────────────────────────
// Option A (recommended) — put logo.png inside src/assets/ and import like this:
//   import LogoImg from "../assets/logo.png";
// Option B — put logo.png in public/ folder and use:
//   const LogoImg = "/logo.png";
//
// For now we use Option B (public folder). See LOGO INSTRUCTIONS at the bottom.
const LogoImg = "/logo.png";
// ──────────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Home",     to: "/" },
  { label: "About",    to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact",  to: "/contact" },
];

const tokens = {
  green:      "#2E7D32",
  greenLight: "#4CAF50",
  black:      "#0A0A0A",
  white:      "#FFFFFF",
};

// Hide header on scroll down, show on scroll up
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          bgcolor: scrolled ? "rgba(10,10,10,0.97)" : "rgba(10,10,10,0.85)",
          backdropFilter: "blur(14px)",
          borderBottom: scrolled ? "none" : `1px solid rgba(255,255,255,0.06)`,
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar sx={{ maxWidth: "lg", width: "100%", mx: "auto", px: { xs: 2, md: 4 }, minHeight: { xs: 64, md: 72 } }}>

          {/* ── LOGO ── */}
          <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none", mr: "auto" }}>
            <Box
              component="img"
              src={LogoImg}
              alt="Treevion"
              sx={{
                height: { xs: 38, md: 46 },
                width: "auto",
                objectFit: "contain",
                // Logo has white/olive colors — invert makes it visible on dark bg
                // Remove the filter line if your logo already looks good on dark backgrounds
                filter: "brightness(0) invert(1)",
                transition: "opacity 0.2s ease",
                "&:hover": { opacity: 0.85 },
              }}
            />
          </Box>

          {/* ── DESKTOP NAV ── */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5 }}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                component={Link}
                to={link.to}
                sx={{
                  color: isActive(link.to) ? tokens.greenLight : "rgba(255,255,255,0.75)",
                  fontSize: "0.875rem",
                  fontWeight: isActive(link.to) ? 700 : 500,
                  fontFamily: "'Georgia', serif",
                  letterSpacing: 0.3,
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  position: "relative",
                  textTransform: "none",
                  "&:hover": { color: tokens.white, bgcolor: "rgba(255,255,255,0.06)" },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 4,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: isActive(link.to) ? "24px" : "0px",
                    height: "2px",
                    bgcolor: tokens.greenLight,
                    borderRadius: 4,
                    transition: "width 0.3s ease",
                  },
                }}
              >
                {link.label}
              </Button>
            ))}

            {/* CTA button */}
            <Button
              component={Link}
              to="/contact"
              sx={{
                ml: 1.5,
                bgcolor: tokens.green,
                color: tokens.white,
                fontSize: "0.82rem",
                fontWeight: 700,
                fontFamily: "'Georgia', serif",
                px: 2.5,
                py: 1,
                borderRadius: "100px",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#1B5E20",
                  transform: "translateY(-1px)",
                  boxShadow: `0 8px 20px ${tokens.green}55`,
                },
                transition: "all 0.25s ease",
              }}
            >
              🌱 Get Started
            </Button>
          </Box>

          {/* ── MOBILE HAMBURGER ── */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: "flex", md: "none" }, color: tokens.white, ml: 1 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Spacer so content doesn't go behind fixed AppBar */}
      {/* NOTE: each page's hero already has pt to handle this */}
    </HideOnScroll>
  );

  // ─── MOBILE DRAWER (rendered outside HideOnScroll) ───
  // Actually we need to return both, so let's restructure:
}

// ─── We re-export as a combined component ──────────────────────────────────
export function HeaderWithDrawer() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          elevation={scrolled ? 4 : 0}
          sx={{
            bgcolor: scrolled ? "rgba(10,10,10,0.97)" : "rgba(10,10,10,0.85)",
            backdropFilter: "blur(14px)",
            borderBottom: scrolled ? "none" : "1px solid rgba(255,255,255,0.06)",
            transition: "all 0.3s ease",
          }}
        >
          <Toolbar
            sx={{
              maxWidth: "lg",
              width: "100%",
              mx: "auto",
              px: { xs: 2, md: 4 },
              minHeight: { xs: 64, md: 72 },
            }}
          >
            {/* LOGO */}
            <Box
              component={Link}
              to="/"
              sx={{ display: "flex", alignItems: "center", textDecoration: "none", mr: "auto" }}
            >
              <Box
                component="img"
                src={LogoImg}
                alt="Treevion"
                sx={{
                  height: { xs: 38, md: 46 },
                  width: "auto",
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                  "&:hover": { opacity: 0.85 },
                  transition: "opacity 0.2s ease",
                }}
              />
            </Box>

            {/* Desktop Nav */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  component={Link}
                  to={link.to}
                  sx={{
                    color: isActive(link.to) ? tokens.greenLight : "rgba(255,255,255,0.75)",
                    fontSize: "0.875rem",
                    fontWeight: isActive(link.to) ? 700 : 500,
                    fontFamily: "'Georgia', serif",
                    px: 2,
                    py: 1,
                    borderRadius: "8px",
                    textTransform: "none",
                    "&:hover": { color: tokens.white, bgcolor: "rgba(255,255,255,0.06)" },
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 4,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: isActive(link.to) ? "24px" : "0px",
                      height: "2px",
                      bgcolor: tokens.greenLight,
                      borderRadius: 4,
                      transition: "width 0.3s ease",
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
              <Button
                component={Link}
                to="/contact"
                sx={{
                  ml: 1.5,
                  bgcolor: tokens.green,
                  color: tokens.white,
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  fontFamily: "'Georgia', serif",
                  px: 2.5,
                  py: 1,
                  borderRadius: "100px",
                  textTransform: "none",
                  "&:hover": { bgcolor: "#1B5E20", transform: "translateY(-1px)", boxShadow: `0 8px 20px ${tokens.green}55` },
                  transition: "all 0.25s ease",
                }}
              >
                🌱 Get Started
              </Button>
            </Box>

            {/* Mobile hamburger */}
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { xs: "flex", md: "none" }, color: tokens.white }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 260, bgcolor: "#0d0d0d", color: tokens.white } }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ffffff10" }}>
          <Box component="img" src={LogoImg} alt="Treevion" sx={{ height: 34, filter: "brightness(0) invert(1)" }} />
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: tokens.white }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ pt: 2 }}>
          {navLinks.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                component={Link}
                to={link.to}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  px: 3,
                  py: 1.5,
                  color: isActive(link.to) ? tokens.greenLight : "rgba(255,255,255,0.75)",
                  fontFamily: "'Georgia', serif",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.05)", color: tokens.white },
                }}
              >
                <ListItemText primary={link.label} primaryTypographyProps={{ fontFamily: "'Georgia', serif", fontWeight: isActive(link.to) ? 700 : 400 }} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem sx={{ pt: 2, px: 3 }}>
            <Button
              fullWidth
              component={Link}
              to="/contact"
              onClick={() => setDrawerOpen(false)}
              sx={{ bgcolor: tokens.green, color: tokens.white, borderRadius: "100px", py: 1.25, fontFamily: "'Georgia', serif", fontWeight: 700, textTransform: "none", "&:hover": { bgcolor: "#1B5E20" } }}
            >
              🌱 Get Started
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}