import { useState, useEffect } from "react";
import { Box, Stack, Typography, IconButton, Drawer, List, ListItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NAV_ITEMS = [
  { label: "Home",     id: "home" },
  { label: "About",    id: "about" },
  { label: "Services", id: "services" },
  { label: "Contact",  id: "contact" },
];

export default function Header({ activeSection }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [drawerOpen,  setDrawerOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setDrawerOpen(false);
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1200,
          px: { xs: 3, md: "6vw" },
          height: scrolled ? 64 : 80,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          bgcolor: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid" : "1px solid transparent",
          borderColor: scrolled ? "divider" : "transparent",
          transition: "all .4s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {/* Logo */}
        <Box onClick={() => scrollTo("home")} sx={{ cursor: "pointer", userSelect: "none" }}>
          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.5rem", fontWeight: 400, letterSpacing: ".06em",
              color: "primary.main", lineHeight: 1,
            }}
          >
            STUDIO
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.5rem", letterSpacing: ".35em", textTransform: "uppercase",
              color: "text.secondary", mt: 0.3, lineHeight: 1,
            }}
          >
            Design & Strategy
          </Typography>
        </Box>

        {/* Desktop Nav */}
        <Stack
          direction="row"
          spacing={0}
          sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Box
                key={item.id}
                onClick={() => scrollTo(item.id)}
                sx={{
                  px: 3, py: 1, cursor: "pointer", position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute", bottom: -2, left: "50%",
                    transform: isActive ? "translateX(-50%) scaleX(1)" : "translateX(-50%) scaleX(0)",
                    width: "60%", height: 1,
                    bgcolor: "primary.main",
                    transition: "transform .3s cubic-bezier(.4,0,.2,1)",
                    transformOrigin: "center",
                  },
                  "&:hover::after": { transform: "translateX(-50%) scaleX(1)" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.65rem", letterSpacing: ".2em", textTransform: "uppercase",
                    fontWeight: 500,
                    color: isActive ? "primary.main" : "text.secondary",
                    transition: "color .3s",
                    "&:hover": { color: "text.primary" },
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            );
          })}

          {/* CTA */}
          <Box
            onClick={() => scrollTo("contact")}
            sx={{
              ml: 2, px: 3, py: 1.2,
              border: "1px solid",
              borderColor: "primary.main",
              cursor: "pointer",
              transition: "all .3s",
              "&:hover": { bgcolor: "primary.main" },
              "&:hover .cta-text": { color: "background.default" },
            }}
          >
            <Typography
              className="cta-text"
              sx={{
                fontSize: "0.6rem", letterSpacing: ".2em", textTransform: "uppercase",
                fontWeight: 500, color: "primary.main", transition: "color .3s",
              }}
            >
              Get in touch
            </Typography>
          </Box>
        </Stack>

        {/* Mobile hamburger */}
        <IconButton
          onClick={() => setDrawerOpen(true)}
          sx={{ display: { xs: "flex", md: "none" }, color: "text.primary" }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280, bgcolor: "background.paper",
            borderLeft: "1px solid", borderColor: "divider",
            pt: 2,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, mb: 4 }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "text.secondary" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {NAV_ITEMS.map((item) => (
            <ListItem
              key={item.id}
              onClick={() => scrollTo(item.id)}
              sx={{
                px: 4, py: 2, cursor: "pointer",
                borderLeft: activeSection === item.id ? "2px solid" : "2px solid transparent",
                borderColor: activeSection === item.id ? "primary.main" : "transparent",
                transition: "border-color .2s",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.7rem", letterSpacing: ".22em", textTransform: "uppercase",
                  fontWeight: 500,
                  color: activeSection === item.id ? "primary.main" : "text.secondary",
                }}
              >
                {item.label}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}