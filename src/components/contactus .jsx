import { Box, Grid, Typography, Stack, TextField, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Eyebrow = ({ children }) => (
  <Stack direction="row" alignItems="center" spacing={1.5} mb={3.5}>
    <Box sx={{ width: 28, height: 1, bgcolor: "primary.main" }} />
    <Typography variant="overline" color="primary">{children}</Typography>
  </Stack>
);

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 0,
    fontFamily: "'Montserrat', sans-serif",
    fontSize: ".85rem",
    fontWeight: 300,
    "& fieldset": { borderColor: "#242420" },
    "&:hover fieldset": { borderColor: "rgba(200,169,110,0.5)" },
    "&.Mui-focused fieldset": { borderColor: "#C8A96E", borderWidth: 1 },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: ".8rem", letterSpacing: ".05em",
    color: "#7A7570",
    "&.Mui-focused": { color: "#C8A96E" },
  },
  "& .MuiOutlinedInput-input": { color: "#F0EBE1" },
};

export default function Contact() {
  return (
    <Box
      id="contact"
      sx={{
        bgcolor: "background.default",
        borderTop: "1px solid", borderColor: "divider",
      }}
    >
      <Grid container sx={{ minHeight: "80vh" }}>
        {/* Left info panel */}
        <Grid
          item xs={12} md={5}
          sx={{
            px: { xs: 4, md: "6vw" }, py: { xs: 10, md: 14 },
            borderRight: { md: "1px solid" }, borderColor: { md: "divider" },
            background: "radial-gradient(ellipse 80% 60% at 20% 60%, rgba(200,169,110,0.05) 0%, transparent 70%)",
          }}
        >
          <Eyebrow>Let's talk</Eyebrow>
          <Typography variant="h1" sx={{ fontSize: { xs: "2.8rem", md: "3.8rem" }, mb: 4, color: "text.primary" }}>
            Start a<br />
            <Box component="em" sx={{ color: "primary.main", fontStyle: "italic" }}>conversation.</Box>
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.85, fontWeight: 300, mb: 8, maxWidth: 360 }}>
            Whether you have a brief, a vague idea, or just want to understand if we'd be a good fit — we'd love to hear from you.
          </Typography>

          <Stack spacing={5}>
            {[
              { label: "New Business",  value: "hello@studio.com" },
              { label: "General",       value: "info@studio.com" },
              { label: "Based in",      value: "London & Remote" },
            ].map(({ label, value }) => (
              <Box key={label}>
                <Typography variant="overline" color="text.secondary" sx={{ display: "block", mb: 0.75 }}>
                  {label}
                </Typography>
                <Typography sx={{ color: "text.primary", fontWeight: 300, letterSpacing: ".03em" }}>
                  {value}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Grid>

        {/* Right form panel */}
        <Grid item xs={12} md={7} sx={{ px: { xs: 4, md: "6vw" }, py: { xs: 10, md: 14 } }}>
          <Typography variant="h2" sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, mb: 6, color: "text.primary" }}>
            Tell us about your project
          </Typography>

          <Stack spacing={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Your name" variant="outlined" sx={inputSx} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Company" variant="outlined" sx={inputSx} />
              </Grid>
            </Grid>
            <TextField fullWidth label="Email address" type="email" variant="outlined" sx={inputSx} />
            <TextField
              fullWidth label="How can we help?" multiline rows={5}
              variant="outlined" sx={inputSx}
            />

            {/* Budget row */}
            <Box>
              <Typography variant="overline" sx={{ color: "text.secondary", display: "block", mb: 2 }}>
                Budget range
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {["< $10k", "$10k–$30k", "$30k–$80k", "$80k+"].map((b) => (
                  <Box
                    key={b}
                    sx={{
                      px: 2.5, py: 1, border: "1px solid", borderColor: "divider",
                      cursor: "pointer", transition: "all .2s",
                      "&:hover": { borderColor: "primary.main", color: "primary.main" },
                    }}
                  >
                    <Typography sx={{ fontSize: ".7rem", letterSpacing: ".1em", color: "text.secondary", transition: "color .2s" }}>
                      {b}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon sx={{ fontSize: "13px !important" }} />}
              sx={{
                bgcolor: "primary.main", color: "background.default",
                py: 1.75, px: 4, alignSelf: "flex-start",
                "&:hover": { bgcolor: "rgba(200,169,110,0.85)" },
              }}
            >
              Send message
            </Button>
          </Stack>
        </Grid>
      </Grid>

      {/* Footer strip */}
      <Box sx={{
        borderTop: "1px solid", borderColor: "divider",
        px: { xs: 4, md: "6vw" }, py: 4,
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2,
      }}>
        <Typography sx={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.1rem", color: "primary.main", letterSpacing: ".06em",
        }}>
          STUDIO
        </Typography>
        <Typography sx={{ fontSize: ".65rem", letterSpacing: ".15em", textTransform: "uppercase", color: "text.secondary" }}>
          © {new Date().getFullYear()} Studio. All rights reserved.
        </Typography>
        <Stack direction="row" spacing={3}>
          {["Instagram", "LinkedIn", "Twitter"].map((s) => (
            <Typography key={s} sx={{
              fontSize: ".65rem", letterSpacing: ".15em", textTransform: "uppercase",
              color: "text.secondary", cursor: "pointer",
              "&:hover": { color: "primary.main" }, transition: "color .2s",
            }}>
              {s}
            </Typography>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}