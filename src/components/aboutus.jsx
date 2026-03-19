import { useState } from "react";
import {
  Box, Container, Grid, Typography, Stack, Button, Divider,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

/* ─── Data ────────────────────────────────────────────────── */
const stats = [
  { num: "14+", label: "Years of practice" },
  { num: "320", label: "Projects shipped" },
  { num: "92%", label: "Clients return" },
];

const values = [
  {
    num: "01", title: "Craft",
    body: "We obsess over the details others overlook. Quality is not a feature — it is the foundation upon which everything else is built.",
  },
  {
    num: "02", title: "Clarity",
    body: "Complexity is easy; clarity is hard. We distil the essential and communicate it with precision, removing everything superfluous.",
  },
  {
    num: "03", title: "Courage",
    body: "The best work requires the confidence to challenge convention. We bring rigorous thinking and the boldness to follow truth.",
  },
];

const team = [
  { name: "Isabelle Morin", role: "Founder & Creative Director", bio: "Isabelle leads the studio's creative vision with 15 years shaping identities for Fortune 500 companies and cultural institutions alike.", bg: "linear-gradient(160deg,#1c1a16,#141210)", shape: "linear-gradient(180deg,#4a3828,#2a1e14)", head: "#6a5040" },
  { name: "Marcus Chen",    role: "Head of Strategy",           bio: "Marcus bridges research and intuition, translating complex organisational challenges into elegant, actionable brand strategies.", bg: "linear-gradient(160deg,#141c1e,#0e1618)", shape: "linear-gradient(180deg,#2a3c48,#1a2830)", head: "#4a6070" },
  { name: "Priya Nair",     role: "Lead Product Designer",      bio: "Priya's background in cognitive science informs her meticulous approach to building interfaces that feel entirely effortless.", bg: "linear-gradient(160deg,#1c1a14,#141208)", shape: "linear-gradient(180deg,#4a3820,#2a2010)", head: "#6a5030" },
  { name: "Elias Ström",    role: "Engineering Lead",           bio: "Elias ensures every pixel of our design reaches the world perfectly intact — his care for code quality mirrors our care for craft.", bg: "linear-gradient(160deg,#141c14,#0e160e)", shape: "linear-gradient(180deg,#2a3828,#1a2818)", head: "#4a6040" },
];

/* ─── Sub-components ──────────────────────────────────────── */
const Eyebrow = ({ children }) => (
  <Stack direction="row" alignItems="center" spacing={1.5} mb={3.5}>
    <Box sx={{ width: 28, height: 1, bgcolor: "primary.main" }} />
    <Typography variant="overline" color="primary">{children}</Typography>
  </Stack>
);

const StatPill = ({ num, label }) => (
  <Box
    sx={{
      bgcolor: "background.paper",
      border: "1px solid", borderColor: "divider",
      px: 3.5, py: 2.5, textAlign: "right",
      transition: "border-color .3s",
      "&:hover": { borderColor: "primary.main" },
    }}
  >
    <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.6rem", fontWeight: 300, lineHeight: 1, color: "text.primary" }}>
      {num}
    </Typography>
    <Typography variant="overline" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
      {label}
    </Typography>
  </Box>
);

const ValueCard = ({ num, title, body }) => {
  const [hover, setHover] = useState(false);
  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        bgcolor: "background.paper",
        border: "1px solid", borderColor: hover ? "primary.main" : "divider",
        p: { xs: 4, md: 5 },
        position: "relative", overflow: "hidden",
        cursor: "default", transition: "border-color .3s",
        "&::after": {
          content: '""', position: "absolute",
          bottom: 0, left: 0, right: 0, height: 2,
          bgcolor: "primary.main",
          transform: hover ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left", transition: "transform .4s ease",
        },
      }}
    >
      <Typography sx={{
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: "3.8rem", fontWeight: 300, lineHeight: 1,
        color: hover ? "primary.main" : "divider",
        display: "block", mb: 3, transition: "color .3s",
      }}>
        {num}
      </Typography>
      <Typography variant="overline" sx={{ display: "block", color: "text.primary", mb: 1.5 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">{body}</Typography>
    </Box>
  );
};

const AvatarBlock = ({ bg, shape, head }) => (
  <Box sx={{ width: "100%", aspectRatio: "3/4", background: bg, position: "relative", overflow: "hidden", mb: 2.5 }}>
    <Box sx={{ position: "absolute", top: "22%", left: "50%", transform: "translateX(-50%)", width: "38%", aspectRatio: 1, borderRadius: "50%", background: head, zIndex: 2 }} />
    <Box sx={{ position: "absolute", bottom: 0, left: "15%", width: "70%", height: "85%", borderRadius: "50% 50% 0 0 / 60% 60% 0 0", background: shape }} />
  </Box>
);

const TeamCard = ({ member }) => (
  <Box sx={{ "&:hover .member-name": { color: "primary.main" } }}>
    <AvatarBlock bg={member.bg} shape={member.shape} head={member.head} />
    <Typography
      className="member-name"
      sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", fontWeight: 400, mb: 0.5, color: "text.primary", transition: "color .2s" }}
    >
      {member.name}
    </Typography>
    <Typography variant="overline" color="primary" sx={{ display: "block", mb: 1.5 }}>
      {member.role}
    </Typography>
    <Typography variant="body2" color="text.secondary">{member.bio}</Typography>
  </Box>
);

/* ─── Main Component ──────────────────────────────────────── */
export default function AboutUs() {
  return (
    <Box id="about" sx={{ bgcolor: "background.default" }}>

      {/* ── HERO ── */}
      <Box
        sx={{
          minHeight: "88vh",
          display: "flex", alignItems: "center",
          px: { xs: 4, md: "8vw" },
          py: { xs: 12, md: 14 },
          position: "relative", overflow: "hidden",
          background: `
            radial-gradient(ellipse 60% 60% at 80% 50%, rgba(200,169,110,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 10% 80%, rgba(200,169,110,0.04) 0%, transparent 60%),
            #0A0A0A
          `,
        }}
      >
        <Box sx={{
          display: { xs: "none", lg: "block" },
          position: "absolute", top: 0, bottom: 0, left: "52%", width: 1,
          background: "linear-gradient(to bottom, transparent, rgba(200,169,110,0.3) 30%, rgba(200,169,110,0.3) 70%, transparent)",
        }} />

        <Grid container alignItems="center" spacing={4}>
          <Grid item xs={12} lg={6}>
            <Eyebrow>About Us</Eyebrow>
            <Typography variant="h1" sx={{ fontSize: { xs: "3rem", md: "4.5rem", lg: "5.2rem" }, mb: 3.5, color: "text.primary" }}>
              Crafted with<br />
              <Box component="em" sx={{ color: "primary.main", fontStyle: "italic" }}>intention,</Box>
              <br />built to last.
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 420, lineHeight: 1.75, fontWeight: 300, mb: 5 }}>
              We are a studio of designers and strategists who believe that great work is the product of curiosity, rigour, and a deep respect for the people we serve.
            </Typography>
            <Button
              variant="outlined"
              endIcon={<ArrowForwardIcon sx={{ fontSize: "13px !important" }} />}
              sx={{
                borderColor: "primary.main", color: "primary.main",
                "&:hover": { bgcolor: "primary.main", color: "background.default", borderColor: "primary.main" },
              }}
            >
              Our Story
            </Button>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Stack spacing={3} alignItems={{ xs: "flex-start", lg: "flex-end" }}>
              {stats.map((s, i) => (
                <Box key={i} sx={{ ml: i === 1 ? { lg: 3 } : 0 }}>
                  <StatPill {...s} />
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* ── MISSION ── */}
      <Container maxWidth={false} sx={{ px: { xs: 4, md: "8vw" }, py: { xs: 8, md: 12 } }}>
        <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{
              borderLeft: "2px solid", borderColor: "primary.main", pl: 4,
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: { xs: "1.6rem", md: "2.2rem" },
              fontWeight: 300, lineHeight: 1.45, fontStyle: "italic", color: "text.primary",
            }}>
              "We don't just design products — we craft experiences that resonate long after the first impression."
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="overline" sx={{ display: "block", mb: 2.5, color: "text.secondary" }}>
              Our Philosophy
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.85, fontWeight: 300, mb: 2 }}>
              Founded in 2010, our studio has always operated at the intersection of rigorous strategy and refined aesthetics. We believe every detail carries meaning — from the weight of a typeface to the pause between interactions.
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.85, fontWeight: 300 }}>
              Our multidisciplinary team brings together expertise in brand identity, digital product design, and experience strategy to help ambitious organisations realise their full potential.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Divider sx={{ mx: "8vw" }} />

      {/* ── VALUES ── */}
      <Container maxWidth={false} sx={{ px: { xs: 4, md: "8vw" }, py: { xs: 8, md: 12 } }}>
        <Eyebrow>What drives us</Eyebrow>
        <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.8rem" }, mb: 7, color: "text.primary" }}>
          Core Values
        </Typography>
        <Grid container spacing={0.3}>
          {values.map((v) => (
            <Grid item xs={12} md={4} key={v.num}>
              <ValueCard {...v} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ── TEAM ── */}
      <Container maxWidth={false} sx={{ px: { xs: 4, md: "8vw" }, pb: { xs: 8, md: 12 } }}>
        <Eyebrow>The people</Eyebrow>
        <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.8rem" }, mb: 7, color: "text.primary" }}>
          Meet the Team
        </Typography>
        <Grid container spacing={3.5}>
          {team.map((m) => (
            <Grid item xs={12} sm={6} lg={3} key={m.name}>
              <TeamCard member={m} />
            </Grid>
          ))}
        </Grid>
      </Container>

    </Box>
  );
}