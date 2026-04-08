import { Box, Typography, Button } from "@mui/material";

export default function HeroSection() {
  return (
    <Box
      sx={{
        height: "90vh",
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography variant="h2" fontWeight="bold">
        Grow Your Digital Presence 🚀
      </Typography>
      <Typography sx={{ mt: 2, maxWidth: 600 }}>
        We help businesses scale with modern design, marketing strategies,
        and powerful web solutions.
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 4, backgroundColor: "black" }}
      >
        Get Started
      </Button>
    </Box>
  );
}
