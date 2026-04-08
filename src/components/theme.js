// src/theme.js
import { createTheme } from "@mui/material/styles";

// ─── Treevion brand tokens (shared across all components) ───────────────────
export const tokens = {
  green:      "#2E7D32",
  greenLight: "#4CAF50",
  greenMid:   "#388E3C",
  greenDark:  "#1B5E20",
  greenPale:  "#E8F5E9",
  black:      "#0A0A0A",
  white:      "#FFFFFF",
  offWhite:   "#F9FBF9",
  gray:       "#ECEFEC",
  muted:      "#666666",
  darkMuted:  "#999999",
};

// ─── MUI Theme ───────────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main:        tokens.green,
      light:       tokens.greenLight,
      dark:        tokens.greenDark,
      contrastText: tokens.white,
    },
    secondary: {
      main:        tokens.greenLight,
      contrastText: tokens.black,
    },
    background: {
      default: tokens.offWhite,
      paper:   tokens.white,
    },
    text: {
      primary:   tokens.black,
      secondary: tokens.muted,
    },
    divider: tokens.gray,
  },

  typography: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    h1: { fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05 },
    h2: { fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.08 },
    h3: { fontWeight: 800, letterSpacing: "-0.02em",  lineHeight: 1.15 },
    h4: { fontWeight: 700, lineHeight: 1.25 },
    h5: { fontWeight: 700, lineHeight: 1.3  },
    h6: { fontWeight: 700, lineHeight: 1.4  },
    body1: { lineHeight: 1.8, fontSize: "1rem"    },
    body2: { lineHeight: 1.75, fontSize: "0.9rem" },
    button: {
      textTransform: "none",
      fontFamily: "'Georgia', serif",
      fontWeight: 700,
    },
  },

  shape: { borderRadius: 12 },

  components: {
    // ── AppBar ──────────────────────────────────────────────────────────────
    MuiAppBar: {
      defaultProps:  { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: "rgba(10,10,10,0.92)",
          backdropFilter:  "blur(14px)",
          borderBottom:    "1px solid rgba(255,255,255,0.06)",
        },
      },
    },

    // ── Button ──────────────────────────────────────────────────────────────
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: "100px",
          padding: "10px 24px",
          fontFamily: "'Georgia', serif",
          fontWeight: 700,
          transition: "all 0.25s ease",
        },
        containedPrimary: {
          background: tokens.green,
          "&:hover": {
            background: tokens.greenMid,
            transform: "translateY(-2px)",
            boxShadow: `0 10px 28px ${tokens.green}50`,
          },
        },
        outlinedPrimary: {
          borderColor: tokens.green,
          borderWidth: "1.5px",
          "&:hover": {
            borderWidth: "1.5px",
            borderColor: tokens.greenLight,
            backgroundColor: tokens.greenPale,
          },
        },
      },
    },

    // ── Chip ────────────────────────────────────────────────────────────────
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: "'Georgia', serif",
          fontWeight: 600,
          borderRadius: "100px",
        },
      },
    },

    // ── TextField ───────────────────────────────────────────────────────────
    MuiTextField: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            fontFamily: "'Georgia', serif",
            backgroundColor: tokens.offWhite,
            "& fieldset": {
              borderColor: tokens.gray,
              borderWidth: "1.5px",
            },
            "&:hover fieldset":   { borderColor: tokens.greenLight },
            "&.Mui-focused fieldset": {
              borderColor: tokens.green,
              borderWidth: "2px",
            },
          },
          "& .MuiInputLabel-root": {
            fontFamily: "'Georgia', serif",
            fontSize: "0.92rem",
            color: tokens.muted,
            "&.Mui-focused": { color: tokens.green },
          },
        },
      },
    },

    // ── Card ────────────────────────────────────────────────────────────────
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: `1.5px solid ${tokens.gray}`,
          borderRadius: "18px",
          backgroundColor: tokens.offWhite,
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: tokens.greenLight,
            boxShadow: `0 16px 48px ${tokens.green}15`,
            transform: "translateY(-4px)",
          },
        },
      },
    },

    // ── Divider ─────────────────────────────────────────────────────────────
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: tokens.gray },
      },
    },

    // ── Link ────────────────────────────────────────────────────────────────
    MuiLink: {
      defaultProps: { underline: "hover" },
      styleOverrides: {
        root: {
          color: tokens.greenLight,
          fontFamily: "'Georgia', serif",
          "&:hover": { color: tokens.green },
        },
      },
    },

    // ── Dialog ──────────────────────────────────────────────────────────────
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "20px",
          overflow: "hidden",
          fontFamily: "'Georgia', serif",
        },
      },
    },
  },
});

export default theme;