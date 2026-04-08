import { Typography } from "@mui/material";

export default function About() {
  return (
    <div style={{ padding: 40 }}>
      <Typography variant="h4">About Us</Typography>
      <Typography sx={{ mt: 2 }}>
        We are a passionate digital team helping brands grow online. Our mission
        is to create impactful digital experiences.
      </Typography>
    </div>
  );
}