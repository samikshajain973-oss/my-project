// src/components/theme.js

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0a7f5a",
    },
    secondary: {
      main: "#96e6a1",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export default theme;