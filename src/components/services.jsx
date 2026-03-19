import { useState } from "react";
import {
  Box, Grid, Typography, Stack, Collapse, Divider, Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

/* ─── Data ──────────────────────────────────────────────── */
const services = [
  {
    num: "01", title: "Brand Strategy & Identity",
    tags: ["Research", "Positioning", "Identity"],
    description: "We build brands that occupy a distinct position in the minds of the people that matter. Starting from deep market and audience research, we define what you stand for, how you sound, and how you look — creating a system that scales from a business card to a billboard without losing coherence.\n\nThe result is not a logo. It is a competitive asset.",
    features: ["Brand audit & competitive mapping", "Positioning & messaging architecture", "Visual identity systems", "Brand guidelines & governance", "Verbal identity & tone of voice"],
  },
  {
    num: "02", title: "Digital Product Design",
    tags: ["UX/UI", "Prototyping", "Systems"],
    description: "Interfaces that feel inevitable — easy to use not because they were simplified, but because they were deeply thought through. We design complex digital products that balance usability with ambition, shipping design systems that enable your teams to build with speed and consistency.\n\nFrom concept to high-fidelity prototype, we work at every stage of the product lifecycle.",
    features: ["User research & journey mapping", "Information architecture", "Interaction & UI design", "Design system creation", "Accessibility & WCAG compliance"],
  },
  {
    num: "03", title: "Web Development",
    tags: ["React", "Next.js", "CMS"],
    description: "We engineer digital experiences that are as performant as they are beautiful. Our development practice covers everything from bespoke marketing sites built for conversion, to complex web applications requiring intricate state management and third-party integrations.\n\nWe write code that is clean, documented, and built for handover.",
    features: ["Marketing & editorial websites", "React / Next.js applications", "Headless CMS integration", "Performance optimisation", "API & third-party integrations"],
  },
  {
    num: "04", title: "Content & Creative Direction",
    tags: ["Copy", "Art Direction", "Production"],
    description: "Ideas need voices. We provide the creative direction and content production that brings brand narratives to life — from campaign concepts to long-form editorial, photography direction to motion.\n\nOur team of writers, photographers, and directors work seamlessly alongside design.",
    features: ["Creative campaign concepting", "Copywriting & editorial", "Photography & video direction", "Motion graphics & animation", "Social & channel strategy"],
  },
  {
    num: "05", title: "Growth & Experience Strategy",
    tags: ["Analytics", "CRO", "Strategy"],
    description: "Beautiful design must perform. We layer strategic thinking over creative execution — setting up measurement frameworks, running structured experiments, and continuously refining the customer experience based on evidence rather than assumption.\n\nWe partner with growth-stage companies who need both rigour and creativity in the same room.",
    features: ["Analytics setup & dashboarding", "Conversion rate optimisation", "A/B & multivariate testing", "Customer experience audits", "Strategic roadmapping"],
  },
];

const processSteps = [
  { num: "1", title: "Discovery & Diagnosis", body: "We start by listening. Stakeholder interviews, market analysis, and a thorough audit of the existing situation give us the foundation to ask better questions — and eventually, the right ones." },
  { num: "2", title: "Strategy & Direction",  body: "With a clear understanding of the challenge, we define a strategic direction. This is the north star against which every creative and executional decision is evaluated." },
  { num: "3", title: "Design & Production",   body: "Our multidisciplinary team executes with precision. Regular checkpoints and a collaborative review process ensure the work stays aligned with the strategy throughout production." },
  { num: "4", title: "Launch & Refinement",   body: "We don't disappear at go-live. Post-launch, we monitor performance, gather feedback, and make targeted refinements that ensure the work achieves its intended effect over time." },
];

/* ─── Sub-components ────────────────────────────────────── */
const Eyebrow = ({ children }) => (
  <Stack direction="row" alignItems="center" spacing={1.5} mb={2.5}>
    <Box sx={{ width: 28, height: 1, bgcolor: "primary.main" }} />
    <Typography variant="overline" color="primary">{children}</Typography>
  </Stack>
);

const Tag = ({ label, active }) => (
  <Box sx={{
    fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase",
    border: "1px solid",
    borderColor: active ? "rgba(200,169,110,0.5)" : "divider",
    color: active ? "primary.main" : "text.secondary",
    px: 1.5, py: 0.6,
    transition: "all .3s",
    display: { xs: "none", md: "block" },
  }}>
    {label}
  </Box>
);

const ServiceRow = ({ service, open, onToggle }) => (
  <Box
    onClick={onToggle}
    sx={{
      borderTop: "1px solid", borderColor: "divider",
      cursor: "pointer", position: "relative",
      bgcolor: open ? "rgba(200,169,110,0.04)" : "transparent",
      transition: "background .3s",
      "&::before": {
        content: '""', position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
        bgcolor: "primary.main",
        transform: open ? "scaleY(1)" : "scaleY(0)",
        transformOrigin: "top",
        transition: "transform .4s cubic-bezier(.4,0,.2,1)",
      },
      "&:hover::before": { transform: "scaleY(1)" },
      "&:hover .svc-num": { color: "primary.main" },
      "&:hover .svc-toggle": { borderColor: "primary.main", bgcolor: "rgba(200,169,110,0.08)" },
    }}
  >
    <Stack direction="row" alignItems="center" sx={{ px: { xs: 3, md: "8vw" }, minHeight: 88 }}>
      <Typography
        className="svc-num"
        sx={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "1rem", letterSpacing: ".05em",
          color: open ? "primary.main" : "divider",
          width: 60, flexShrink: 0, transition: "color .3s",
        }}
      >
        {service.num}
      </Typography>
      <Typography sx={{
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: { xs: "1.3rem", md: "1.8rem" },
        fontWeight: 400, color: "text.primary", flex: 1,
      }}>
        {service.title}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mx: { xs: 1, md: 4 } }}>
        {service.tags.map((t) => <Tag key={t} label={t} active={open} />)}
      </Stack>
      <Box
        className="svc-toggle"
        sx={{
          width: 38, height: 38, border: "1px solid",
          borderColor: open ? "primary.main" : "divider",
          bgcolor: open ? "rgba(200,169,110,0.1)" : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, transition: "all .3s",
        }}
      >
        <AddIcon sx={{
          color: open ? "primary.main" : "text.secondary",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform .4s cubic-bezier(.4,0,.2,1), color .3s",
          fontSize: 17,
        }} />
      </Box>
    </Stack>

    <Collapse in={open} timeout={500}>
      <Box
        sx={{ px: { xs: 3, md: "8vw" }, pl: { xs: 3, md: "calc(8vw + 60px)" }, pb: 6 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box sx={{ borderLeft: "1px solid rgba(200,169,110,0.35)", pl: 3 }}>
              {service.description.split("\n\n").map((para, i) => (
                <Typography key={i} sx={{ fontSize: ".875rem", lineHeight: 1.85, color: "text.secondary", fontWeight: 300, mb: i < 1 ? 2 : 0 }}>
                  {para}
                </Typography>
              ))}
              <Button
                endIcon={<ArrowForwardIcon sx={{ fontSize: "13px !important" }} />}
                sx={{
                  mt: 3, px: 0, color: "primary.main",
                  borderBottom: "1px solid rgba(200,169,110,0.35)",
                  borderRadius: 0, pb: 0.5,
                  "& .MuiButton-endIcon": { ml: 1, transition: "margin .3s" },
                  "&:hover .MuiButton-endIcon": { ml: 2 },
                  "&:hover": { borderBottomColor: "primary.main" },
                }}
              >
                Explore this service
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack divider={<Divider />}>
              {service.features.map((f) => (
                <Stack key={f} direction="row" alignItems="flex-start" spacing={1.5} sx={{ py: 1.25 }}>
                  <Typography sx={{ color: "primary.main", fontSize: ".75rem", mt: "2px", flexShrink: 0 }}>→</Typography>
                  <Typography sx={{ fontSize: ".78rem", color: "text.secondary", lineHeight: 1.6, fontWeight: 300 }}>{f}</Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Collapse>
  </Box>
);

const ProcessStep = ({ num, title, body }) => (
  <Box sx={{
    py: 4.5, borderTop: "1px solid", borderColor: "divider",
    display: "grid", gridTemplateColumns: "48px 1fr", gap: 3,
    "&:hover .proc-num": { color: "primary.main" },
  }}>
    <Typography className="proc-num" sx={{
      fontFamily: "'Cormorant Garamond',serif",
      fontSize: "1.8rem", fontWeight: 300,
      color: "divider", lineHeight: 1, transition: "color .3s",
    }}>
      {num}
    </Typography>
    <Box>
      <Typography variant="overline" sx={{ display: "block", color: "text.primary", mb: 1.25 }}>{title}</Typography>
      <Typography sx={{ fontSize: ".85rem", lineHeight: 1.8, color: "text.secondary", fontWeight: 300 }}>{body}</Typography>
    </Box>
  </Box>
);

/* ─── Main Component ────────────────────────────────────── */
export default function Services() {
  const [openIndex, setOpenIndex] = useState(0);
  const handleToggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <Box id="services" sx={{ bgcolor: "background.default" }}>

      {/* ── HEADER ── */}
      <Box sx={{
        px: { xs: 3, md: "8vw" },
        pt: { xs: 10, md: 14 }, pb: { xs: 7, md: 7.5 },
        borderBottom: "1px solid", borderColor: "divider",
      }}>
        <Grid container alignItems="flex-end" spacing={{ xs: 5, md: 10 }}>
          <Grid item xs={12} md={7}>
            <Eyebrow>What we do</Eyebrow>
            <Typography variant="h1" sx={{ fontSize: { xs: "2.8rem", md: "4.5rem", lg: "5rem" }, color: "text.primary" }}>
              Services built<br />
              for <Box component="em" sx={{ fontStyle: "italic", color: "primary.main" }}>ambition.</Box>
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography sx={{ fontSize: ".875rem", lineHeight: 1.8, color: "text.secondary", fontWeight: 300, mb: 4 }}>
              Every engagement is shaped around your specific challenges. We combine strategic depth with executional rigour to deliver outcomes that endure.
            </Typography>
            <Stack direction="row" spacing={4}>
              {[["8", "Disciplines"], ["40+", "Specialists"], ["15yr", "Experience"]].map(([num, label]) => (
                <Box key={label}>
                  <Typography sx={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 300, color: "text.primary", lineHeight: 1 }}>
                    {num}
                  </Typography>
                  <Typography variant="overline" sx={{ color: "text.secondary", display: "block", mt: 0.5 }}>{label}</Typography>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* ── SERVICE ACCORDION ── */}
      <Box sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
        {services.map((s, i) => (
          <ServiceRow key={s.num} service={s} open={openIndex === i} onToggle={() => handleToggle(i)} />
        ))}
      </Box>

      {/* ── PROCESS ── */}
      <Box sx={{ px: { xs: 3, md: "8vw" }, py: { xs: 8, md: 12 } }}>
        <Grid container spacing={{ xs: 6, md: 10 }} alignItems="flex-start">
          <Grid item xs={12} md={3}>
            <Box sx={{ position: { md: "sticky" }, top: 80 }}>
              <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.4rem" }, color: "text.primary", mb: 2 }}>
                How we work
              </Typography>
              <Typography sx={{ fontSize: ".85rem", lineHeight: 1.8, color: "text.secondary", fontWeight: 300 }}>
                Every engagement follows a deliberate structure — enough rigour to ensure quality, enough flexibility to accommodate complexity.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            {processSteps.map((s) => <ProcessStep key={s.num} {...s} />)}
          </Grid>
        </Grid>
      </Box>

      {/* ── CTA BAND ── */}
      <Box sx={{
        bgcolor: "primary.main",
        px: { xs: 3, md: "8vw" }, py: { xs: 7, md: 8 },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between", gap: 4,
      }}>
        <Typography variant="h2" sx={{ fontSize: { xs: "1.7rem", md: "2.4rem" }, color: "background.default" }}>
          Ready to start a <Box component="em" sx={{ fontStyle: "italic" }}>conversation?</Box>
        </Typography>
        <Button
          variant="outlined"
          sx={{
            borderColor: "background.default", color: "background.default",
            px: 4, py: 1.75, flexShrink: 0,
            "&:hover": { bgcolor: "background.default", color: "primary.main", borderColor: "background.default" },
          }}
        >
          Get in touch
        </Button>
      </Box>

    </Box>
  );
}