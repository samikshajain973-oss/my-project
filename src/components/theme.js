import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary:    { main: "#C8A96E" },
    background: { default: "#0A0A0A", paper: "#141414" },
    text:       { primary: "#F0EBE1", secondary: "#7A7570" },
    divider:    "#242420",
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h1: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, lineHeight: 1.05 },
    h2: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 },
    h3: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 },
    overline: { letterSpacing: "0.22em", fontWeight: 500, fontSize: "0.65rem" },
    body1: { fontWeight: 300, lineHeight: 1.8 },
    body2: { fontWeight: 300, lineHeight: 1.75, fontSize: "0.875rem" },
  },
  shape: { borderRadius: 0 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontSize: "0.65rem",
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 500,
        },
      },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: "#242420" } },
    },
  },
});