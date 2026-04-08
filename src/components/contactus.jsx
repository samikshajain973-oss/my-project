import { TextField } from "@mui/material";

export function Contactus() {
  return (
    <div style={{ padding: 40 }}>
      <h2>Contact Us</h2>
      <TextField label="Name" fullWidth sx={{ mb: 2 }} />
      <TextField label="Email" fullWidth sx={{ mb: 2 }} />
      <TextField label="Message" fullWidth multiline rows={4} />
    </div>
  );
}