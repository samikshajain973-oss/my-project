// src/pages/ContactUs.jsx  (or components/contactus.jsx — match your import in App.jsx)
import { Box, Container, Typography, Grid, TextField, Chip, InputAdornment, Avatar } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const tokens = {
  green:      "#2E7D32",
  greenLight: "#4CAF50",
  greenMid:   "#388E3C",
  greenPale:  "#E8F5E9",
  black:      "#0A0A0A",
  white:      "#FFFFFF",
  offWhite:   "#F9FBF9",
  gray:       "#ECEFEC",
  muted:      "#666666",
};

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}
function FadeIn({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useInView();
  const map = { up: "translateY(40px)", left: "translateX(-40px)", right: "translateX(40px)", none: "none" };
  return (
    <Box ref={ref} sx={{ opacity: visible ? 1 : 0, transform: visible ? "none" : map[direction], transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </Box>
  );
}
function Leaf({ top, bottom, left, right, size = 80, opacity = 0.07, rotate = 0 }) {
  return <Box sx={{ position: "absolute", top, bottom, left, right, fontSize: size, opacity, transform: `rotate(${rotate}deg)`, pointerEvents: "none", userSelect: "none", lineHeight: 1 }}>🌿</Box>;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const contactInfo = [
  { icon: "👤", label: "Owner",   value: "Samiksha Jain",                   sub: "Founder & CEO, Treevion"          },
  { icon: "📧", label: "Email",   value: "samikshajainffdl@gmail.com",       sub: "We reply within 24 hours",         href: "mailto:samikshajainffdl@gmail.com" },
  { icon: "📞", label: "Phone",   value: "+91 94146 96345",                  sub: "Mon–Sat, 10 AM – 7 PM IST",        href: "tel:+919414696345"                  },
  { icon: "📍", label: "Address", value: "16 Shivalik Vihar, Chamti Kheda Road", sub: "Chittaurgarh, Rajasthan – 312001" },
];

const serviceOptions = [
  "Digital Marketing Strategy", "SEO & SEM", "Social Media Marketing",
  "Branding & Design", "Web Development", "Paid Advertising", "Content & Email Marketing",
];

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    bgcolor: tokens.offWhite,
    fontFamily: "'Georgia', serif",
    fontSize: "0.95rem",
    "& fieldset":            { borderColor: tokens.gray,       borderWidth: 1.5 },
    "&:hover fieldset":      { borderColor: tokens.greenLight                    },
    "&.Mui-focused fieldset":{ borderColor: tokens.green,      borderWidth: 2   },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'Georgia', serif",
    fontSize: "0.92rem",
    color: tokens.muted,
    "&.Mui-focused": { color: tokens.green },
  },
  "& .MuiInputAdornment-root": { color: tokens.green },
};

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);
  const [selected,  setSelected]  = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", budget: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <Box sx={{ fontFamily: "'Georgia', serif", bgcolor: tokens.offWhite, color: tokens.black, overflowX: "hidden" }}>

      {/* ══ HERO ══ */}
      <Box sx={{ bgcolor: tokens.black, color: tokens.white, pt: { xs: 14, md: 18 }, pb: { xs: 8, md: 12 }, position: "relative", overflow: "hidden" }}>
        <Box sx={{ position: "absolute", top: -100, left: -80, width: 480, height: 480, borderRadius: "50%", background: `radial-gradient(circle, ${tokens.green}28, transparent 65%)`, pointerEvents: "none" }} />
        <Box sx={{ position: "absolute", bottom: -80, right: -60, width: 340, height: 340, borderRadius: "50%", background: `radial-gradient(circle, ${tokens.greenMid}18, transparent 65%)`, pointerEvents: "none" }} />
        <Leaf top={20}    right={60} size={72} opacity={0.08} rotate={-15} />
        <Leaf bottom={20} left={40}  size={56} opacity={0.05} rotate={20}  />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <FadeIn>
            <Chip label="🌿 Get In Touch" sx={{ bgcolor: `${tokens.green}22`, color: tokens.greenLight, border: `1px solid ${tokens.green}55`, fontSize: "0.7rem", letterSpacing: 1.5, mb: 3 }} />
          </FadeIn>
          <FadeIn delay={0.1}>
            <Typography variant="h1" sx={{ fontSize: { xs: "2.6rem", md: "4.8rem" }, fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", mb: 3, fontFamily: "inherit" }}>
              Let's Grow Your
              <Box component="span" sx={{ color: tokens.greenLight }}> Brand </Box>
              Together.
            </Typography>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Typography sx={{ color: "#888", fontSize: { xs: "1rem", md: "1.15rem" }, maxWidth: 540, lineHeight: 1.82 }}>
              Have a project in mind? Want a free strategy call? Or just want to say hello? We'd love to hear from you. Every great forest starts with a single seed—and every great brand starts with one conversation.
            </Typography>
          </FadeIn>
        </Container>
      </Box>

      {/* ══ MAIN CONTENT ══ */}
      <Box sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 8 }}>

            {/* ── LEFT: contact info ── */}
            <Grid item xs={12} md={5}>
              <FadeIn direction="left">
                <Typography sx={{ color: tokens.green, fontWeight: 700, letterSpacing: 2.5, fontSize: "0.68rem", textTransform: "uppercase", mb: 1.5 }}>Find Us Here</Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: "inherit", fontSize: { xs: "1.6rem", md: "2rem" }, mb: 4, lineHeight: 1.2 }}>
                  We're Always Ready<br />to Help You Grow.
                </Typography>
              </FadeIn>

              {/* Info cards */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                {contactInfo.map((info, i) => (
                  <FadeIn key={info.label} delay={i * 0.1} direction="left">
                    <Box
                      component={info.href ? "a" : "div"}
                      href={info.href}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2.5,
                        p: 3,
                        borderRadius: "16px",
                        border: `1.5px solid ${tokens.gray}`,
                        bgcolor: tokens.white,
                        textDecoration: "none",
                        color: "inherit",
                        transition: "all 0.3s ease",
                        "&:hover": { borderColor: tokens.greenLight, boxShadow: `0 12px 36px ${tokens.green}14`, transform: "translateY(-3px)" },
                      }}
                    >
                      <Box sx={{ width: 48, height: 48, borderRadius: "12px", bgcolor: tokens.greenPale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", flexShrink: 0 }}>
                        {info.icon}
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: "0.68rem", color: tokens.green, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", mb: 0.3 }}>{info.label}</Typography>
                        <Typography sx={{ fontWeight: 700, fontSize: "0.93rem", color: tokens.black, lineHeight: 1.4 }}>{info.value}</Typography>
                        <Typography sx={{ fontSize: "0.78rem", color: tokens.muted, mt: 0.25 }}>{info.sub}</Typography>
                      </Box>
                    </Box>
                  </FadeIn>
                ))}
              </Box>

              {/* Promise strip */}
              <FadeIn delay={0.5} direction="left">
                <Box sx={{ mt: 4, p: 3.5, borderRadius: "16px", bgcolor: tokens.black, color: tokens.white, position: "relative", overflow: "hidden" }}>
                  <Box sx={{ position: "absolute", top: -20, right: -20, fontSize: 80, opacity: 0.06 }}>🌳</Box>
                  <Typography sx={{ color: tokens.greenLight, fontWeight: 700, fontSize: "0.72rem", letterSpacing: 1.5, textTransform: "uppercase", mb: 1 }}>Our Promise</Typography>
                  <Typography sx={{ color: "#ccc", lineHeight: 1.8, fontSize: "0.88rem", fontStyle: "italic" }}>
                    "Your growth is our responsibility. Your challenges become our strategy. Your brand becomes a part of our Treevion family."
                  </Typography>
                  <Typography sx={{ color: tokens.greenLight, fontWeight: 700, mt: 2, fontSize: "0.8rem" }}>— Samiksha Jain, Founder</Typography>
                </Box>
              </FadeIn>
            </Grid>

            {/* ── RIGHT: form ── */}
            <Grid item xs={12} md={7}>
              <FadeIn direction="right">
                <Box sx={{ bgcolor: tokens.white, borderRadius: "24px", p: { xs: 4, md: 5 }, border: `1.5px solid ${tokens.gray}`, boxShadow: "0 8px 40px rgba(0,0,0,0.06)", position: "relative", overflow: "hidden" }}>
                  <Box sx={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${tokens.green}0d, transparent 70%)`, pointerEvents: "none" }} />

                  {!submitted ? (
                    <>
                      <Typography sx={{ color: tokens.green, fontWeight: 700, letterSpacing: 2.5, fontSize: "0.68rem", textTransform: "uppercase", mb: 1 }}>Send a Message</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: "inherit", mb: 4, color: tokens.black }}>Tell Us About Your Project 🌱</Typography>

                      <Grid container spacing={2.5}>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label="Your Name *" name="name" value={form.name} onChange={handleChange} sx={fieldSx} InputProps={{ startAdornment: <InputAdornment position="start">👤</InputAdornment> }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label="Email Address *" name="email" type="email" value={form.email} onChange={handleChange} sx={fieldSx} InputProps={{ startAdornment: <InputAdornment position="start">📧</InputAdornment> }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} sx={fieldSx} InputProps={{ startAdornment: <InputAdornment position="start">📞</InputAdornment> }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label="Monthly Budget (₹)" name="budget" value={form.budget} onChange={handleChange} sx={fieldSx} InputProps={{ startAdornment: <InputAdornment position="start">💰</InputAdornment> }} />
                        </Grid>

                        {/* Service selector */}
                        <Grid item xs={12}>
                          <Typography sx={{ fontSize: "0.8rem", color: tokens.muted, mb: 1.5, fontFamily: "inherit" }}>Which service are you interested in?</Typography>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {serviceOptions.map((s) => (
                              <Chip key={s} label={s} onClick={() => setSelected(selected === s ? "" : s)} sx={{ fontSize: "0.7rem", cursor: "pointer", fontFamily: "inherit", bgcolor: selected === s ? tokens.green : tokens.greenPale, color: selected === s ? tokens.white : tokens.green, border: `1.5px solid ${selected === s ? tokens.green : tokens.green + "44"}`, transition: "all 0.22s ease", "&:hover": { bgcolor: selected === s ? tokens.greenMid : tokens.green + "18" } }} />
                            ))}
                          </Box>
                        </Grid>

                        <Grid item xs={12}>
                          <TextField fullWidth multiline rows={4} label="Your Message *" name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your brand, goals, and what you're looking to achieve..." sx={{ ...fieldSx, "& .MuiOutlinedInput-root": { ...fieldSx["& .MuiOutlinedInput-root"], alignItems: "flex-start" } }} />
                        </Grid>

                        <Grid item xs={12}>
                          <Box component="button" onClick={handleSubmit} sx={{ width: "100%", bgcolor: tokens.green, color: tokens.white, border: "none", borderRadius: "12px", py: 2, fontSize: "1rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.4, transition: "all 0.3s ease", "&:hover": { bgcolor: tokens.greenMid, transform: "translateY(-2px)", boxShadow: `0 12px 32px ${tokens.green}40` } }}>
                            🌱 Plant Your Growth Seed →
                          </Box>
                          <Typography sx={{ textAlign: "center", fontSize: "0.73rem", color: tokens.muted, mt: 1.5 }}>
                            We'll get back to you within 24 hours. No spam, ever.
                          </Typography>
                        </Grid>
                      </Grid>
                    </>
                  ) : (
                    /* ── Success state ── */
                    <Box sx={{ textAlign: "center", py: 6 }}>
                      <Typography sx={{ fontSize: "4rem", mb: 2 }}>🌳</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: "inherit", mb: 2, color: tokens.green }}>Your Seed Has Been Planted!</Typography>
                      <Typography sx={{ color: tokens.muted, lineHeight: 1.85, mb: 4, fontSize: "0.95rem" }}>
                        Thank you for reaching out, <strong style={{ color: tokens.black }}>{form.name}</strong>!<br />
                        Samiksha and the Treevion team will get back to you at<br />
                        <strong style={{ color: tokens.green }}>{form.email}</strong> within 24 hours.
                      </Typography>
                      <Box sx={{ display: "inline-block", px: 4, py: 1.5, borderRadius: "100px", bgcolor: tokens.greenPale, color: tokens.green, fontWeight: 700, fontSize: "0.85rem", border: `1px solid ${tokens.green}33` }}>
                        🌿 Your brand is in good hands.
                      </Box>
                    </Box>
                  )}
                </Box>
              </FadeIn>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ══ MAP ══ */}
      <Box sx={{ bgcolor: tokens.white, py: { xs: 8, md: 10 }, borderTop: `1px solid ${tokens.gray}` }}>
        <Container maxWidth="lg">
          <FadeIn>
            <Box sx={{ borderRadius: "20px", overflow: "hidden", border: `1.5px solid ${tokens.gray}`, boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>
              <Box sx={{ bgcolor: tokens.black, px: 4, py: 2.5, display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ fontSize: "1.2rem" }}>📍</Typography>
                <Box>
                  <Typography sx={{ color: tokens.white, fontWeight: 700, fontSize: "0.9rem" }}>Treevion HQ</Typography>
                  <Typography sx={{ color: "#888", fontSize: "0.76rem" }}>16 Shivalik Vihar, Chamti Kheda Road, Chittaurgarh, Rajasthan – 312001</Typography>
                </Box>
              </Box>
              <iframe
                title="Treevion Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57961.88!2d74.6237!3d24.8887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3968c3e16a7e7e7f%3A0x1!2sChittaurgarh%2C+Rajasthan!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="340"
                style={{ border: "none", display: "block" }}
                allowFullScreen=""
                loading="lazy"
              />
            </Box>
          </FadeIn>
        </Container>
      </Box>

      {/* ══ FOOTER STRIP ══ */}
      <Box sx={{ bgcolor: tokens.green, py: { xs: 8, md: 10 }, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <Box sx={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.07), transparent 50%), radial-gradient(circle at 80% 50%, rgba(0,0,0,0.13), transparent 50%)", pointerEvents: "none" }} />
        <Leaf top={-30} right={40} size={120} opacity={0.06} rotate={-20} />
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <FadeIn>
            <Typography variant="h4" sx={{ fontWeight: 800, color: tokens.white, fontFamily: "inherit", mb: 2 }}>
              Treevion — Where Brands Don't Just Grow… They Flourish. 🌳
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.82)", fontSize: "0.95rem", lineHeight: 1.75 }}>
              Building digital forests, one brand at a time.<br />
              Chittaurgarh, Rajasthan &nbsp;·&nbsp; samikshajainffdl@gmail.com &nbsp;·&nbsp; +91 94146 96345
            </Typography>
          </FadeIn>
        </Container>
      </Box>
    </Box>
  );
}