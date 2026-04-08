import { Box, Container, Typography, Grid, Chip, Avatar, Dialog, DialogContent, TextField, InputAdornment, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

// ─── Design tokens ─────────────────────────────────────────────────────────
const tk = {
  green:      "#2E7D32",
  greenLight: "#4CAF50",
  greenMid:   "#388E3C",
  greenPale:  "#E8F5E9",
  greenDark:  "#1B5E20",
  black:      "#0A0A0A",
  white:      "#FFFFFF",
  offWhite:   "#F9FBF9",
  gray:       "#ECEFEC",
  muted:      "#666666",
};

// ─── Animation helpers ──────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useInView();
  const map = { up: "translateY(40px)", left: "translateX(-40px)", right: "translateX(40px)", none: "none" };
  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : map[direction],
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </Box>
  );
}

function Leaf({ top, bottom, left, right, size = 80, opacity = 0.07, rotate = 0 }) {
  return (
    <Box sx={{ position: "absolute", top, bottom, left, right, fontSize: size, opacity, transform: `rotate(${rotate}deg)`, pointerEvents: "none", userSelect: "none", lineHeight: 1 }}>
      🌿
    </Box>
  );
}

// ─── Static data ────────────────────────────────────────────────────────────
const heroSlides = [
  {
    badge: "🚀 Performance Marketing",
    headline: ["Scale Your Brand", "With Data-Driven", "Digital Marketing"],
    sub: "From SEO to paid ads, social to automation—Treevion manages your entire digital ecosystem under one roof.",
    accent: "#4CAF50",
    visual: { icon: "📈", label: "ROAS Growth", value: "+340%", sub: "Last 90 days" },
    tags: ["Google Ads", "Meta Ads", "Analytics"],
  },
  {
    badge: "🔍 SEO & Organic Growth",
    headline: ["Rank Higher.", "Get Found First.", "Convert More."],
    sub: "AI-powered SEO strategies that build lasting organic authority and drive qualified traffic to your business.",
    accent: "#66BB6A",
    visual: { icon: "🔍", label: "Organic Traffic", value: "+218%", sub: "Month over month" },
    tags: ["Technical SEO", "Content Strategy", "Link Building"],
  },
  {
    badge: "📱 Social Media Marketing",
    headline: ["Build a Community.", "Spark Conversations.", "Grow Your Brand."],
    sub: "Strategic content, community management, and influencer campaigns that turn followers into loyal customers.",
    accent: "#81C784",
    visual: { icon: "📱", label: "Engagement Rate", value: "12.4%", sub: "Above industry avg" },
    tags: ["Instagram", "LinkedIn", "YouTube"],
  },
  {
    badge: "🎯 Paid Advertising",
    headline: ["Every Rupee", "Spent Smarter.", "Results Guaranteed."],
    sub: "Precision-managed Meta, Google, and LinkedIn Ads with continuous A/B testing to maximise every rupee.",
    accent: "#A5D6A7",
    visual: { icon: "🎯", label: "Cost Per Lead", value: "↓62%", sub: "vs industry average" },
    tags: ["PPC", "Retargeting", "Lookalike Ads"],
  },
];

const services = [
  { icon: "📊", gradient: "linear-gradient(135deg,#1B5E20,#2E7D32)", title: "Digital Marketing Strategy", tagline: "AI-backed growth roadmap", desc: "Data-driven strategies tailored to your brand. Every move intentional, measurable, and built for sustainable growth.", tags: ["AI Planning","KPI Mapping","Omnichannel"] },
  { icon: "🔍", gradient: "linear-gradient(135deg,#004D40,#00695C)", title: "SEO & SEM", tagline: "Get found. Get clicked.", desc: "Technical SEO audits to high-intent Google Ads. Organic authority meets paid precision—driving traffic that converts.", tags: ["Technical SEO","Google Ads","PPC"] },
  { icon: "📱", gradient: "linear-gradient(135deg,#1A237E,#283593)", title: "Social Media Marketing", tagline: "Build community. Drive loyalty.", desc: "Strategic content calendars, community engagement, and trend-driven campaigns that turn followers into brand advocates.", tags: ["Instagram","LinkedIn","Content"] },
  { icon: "🎨", gradient: "linear-gradient(135deg,#4A148C,#6A1B9A)", title: "Branding & Design", tagline: "Identity that leaves a mark", desc: "Visual systems—logos, brand guides, UI kits—that tell your story at a glance and leave a lasting impression.", tags: ["Logo Design","Brand Guide","UI Kits"] },
  { icon: "💻", gradient: "linear-gradient(135deg,#BF360C,#D84315)", title: "Web Development", tagline: "Websites that work hard", desc: "Fast, responsive, conversion-optimised websites from landing pages to full e-commerce—every pixel crafted with purpose.", tags: ["React","E-Commerce","Performance"] },
  { icon: "📣", gradient: "linear-gradient(135deg,#E65100,#F57C00)", title: "Paid Advertising", tagline: "Spend smarter. Scale faster.", desc: "Meta, Google, LinkedIn ads managed with laser precision. Continuous testing and optimization to maximise every rupee.", tags: ["Meta Ads","Google Display","Retargeting"] },
  { icon: "✍️", gradient: "linear-gradient(135deg,#1565C0,#1976D2)", title: "Content & Email Marketing", tagline: "Stories that sell", desc: "Compelling blogs, newsletters, and email sequences that nurture leads, build authority, and drive real revenue.", tags: ["Copywriting","Email Drips","Newsletters"] },
];

const stats = [
  { value: "7+",   label: "Core Services" },
  { value: "1",    label: "Unified Partner" },
  { value: "360°", label: "Digital Coverage" },
  { value: "∞",   label: "Growth Potential" },
];

const whyUs = [
  { icon: "🎯", title: "One Partner, Everything Done",  desc: "No more juggling agencies. Strategy, creative, ads, tech—all under one roof." },
  { icon: "🤖", title: "AI-Powered Insights",           desc: "Every decision backed by data, AI analytics, and real-time performance signals." },
  { icon: "🌱", title: "We Treat You Like Family",      desc: "Every brand is a seed. We nurture it with care, consistency, and clarity." },
  { icon: "📊", title: "Full Transparency",             desc: "Clear reporting, honest communication, and zero hidden surprises. Always." },
  { icon: "🔄", title: "Adapts to Every Season",        desc: "Like a tree, Treevion adapts to every challenge and opportunity." },
  { icon: "🏆", title: "Result-Driven Culture",         desc: "We celebrate milestones and every root of your success." },
];

const testimonials = [
  { name: "Rahul Sharma",  role: "E-Commerce Founder", avatar: "R", text: "Treevion transformed our digital presence completely. In 6 months, our organic traffic tripled and ROAS doubled. They truly feel like an extension of our team." },
  { name: "Priya Mehta",   role: "Startup CEO",         avatar: "P", text: "What sets Treevion apart is the clarity. No jargon, no confusion—just a clear strategy and results we can see in our revenue." },
  { name: "Vikram Joshi",  role: "Brand Director",      avatar: "V", text: "The branding work Treevion did was exceptional. Our identity is now cohesive, modern, and instantly recognisable. Couldn't be happier." },
];

const serviceOptions = ["Digital Marketing Strategy","SEO & SEM","Social Media Marketing","Branding & Design","Web Development","Paid Advertising","Content & Email Marketing"];

const dmSlides = [
  { icon: "📈", stat: "+340% ROAS",     title: "Performance Advertising",  body: "Precision-managed ad campaigns across Meta, Google, and LinkedIn—continuously optimised to deliver the highest return on every rupee spent.", tags: ["Meta Ads","Google Ads","A/B Testing","Retargeting"], color: "#66BB6A" },
  { icon: "🔍", stat: "Top 3 Rankings", title: "SEO & Organic Authority",  body: "From technical audits to content strategies—we build lasting organic visibility that drives qualified traffic month after month.", tags: ["Technical SEO","Keyword Research","Link Building","Core Web Vitals"], color: "#81C784" },
  { icon: "📱", stat: "12.4% Engage",   title: "Social Media Excellence",  body: "Scroll-stopping content, consistent community management, and data-driven campaigns that make your brand impossible to ignore.", tags: ["Content Strategy","Reels & Stories","Community Mgmt","Influencers"], color: "#A5D6A7" },
  { icon: "✉️", stat: "45% Open Rate",  title: "Email & Automation",       body: "Drip campaigns, newsletters, and automations that nurture your leads around the clock—converting prospects into loyal customers.", tags: ["Drip Campaigns","Lead Nurturing","Segmentation","A/B Testing"], color: "#C8E6C9" },
];

// ─── Form Dialog ─────────────────────────────────────────────────────────────
function GrowthFormDialog({ open, onClose }) {
  const [form, setForm]         = useState({ name:"", email:"", phone:"", business:"", budget:"", message:"" });
  const [service, setService]   = useState("");
  const [submitted, setSubmit]  = useState(false);

  const change = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSubmit(true);
  };

  const close = () => {
    onClose();
    setTimeout(() => { setSubmit(false); setForm({ name:"", email:"", phone:"", business:"", budget:"", message:"" }); setService(""); }, 400);
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius:"10px", bgcolor: tk.offWhite, fontFamily:"'Georgia',serif",
      "& fieldset":{ borderColor: tk.gray, borderWidth:1.5 },
      "&:hover fieldset":{ borderColor: tk.greenLight },
      "&.Mui-focused fieldset":{ borderColor: tk.green, borderWidth:2 },
    },
    "& .MuiInputLabel-root":{ fontFamily:"'Georgia',serif", fontSize:"0.9rem", color: tk.muted, "&.Mui-focused":{ color: tk.green } },
  };

  return (
    <Dialog open={open} onClose={close} maxWidth="sm" fullWidth PaperProps={{ sx:{ borderRadius:"20px", overflow:"hidden" } }}>
      {/* Header */}
      <Box sx={{ bgcolor: tk.black, px:4, py:2.5, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Box>
          <Typography sx={{ color: tk.greenLight, fontSize:"0.65rem", fontWeight:700, letterSpacing:2, textTransform:"uppercase", mb:0.3 }}>Free Strategy Consultation</Typography>
          <Typography sx={{ color: tk.white, fontWeight:800, fontSize:"1.05rem", fontFamily:"'Georgia',serif" }}>🌱 Start Your Growth Journey</Typography>
        </Box>
        <IconButton onClick={close} sx={{ color:"rgba(255,255,255,0.45)", "&:hover":{ color: tk.white } }}><CloseIcon /></IconButton>
      </Box>

      <DialogContent sx={{ p:{ xs:3, sm:4 }, bgcolor: tk.white }}>
        {!submitted ? (
          <Box>
            <Typography sx={{ color: tk.muted, fontSize:"0.87rem", mb:3, lineHeight:1.7 }}>
              Tell us about your brand — we'll reply within <strong style={{ color: tk.green }}>24 hours</strong> with a personalised strategy.
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Your Name *" name="name" value={form.name} onChange={change} sx={fieldSx} InputProps={{ startAdornment:<InputAdornment position="start">👤</InputAdornment> }} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Email Address *" name="email" type="email" value={form.email} onChange={change} sx={fieldSx} InputProps={{ startAdornment:<InputAdornment position="start">📧</InputAdornment> }} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Phone Number" name="phone" type="tel" value={form.phone} onChange={change} sx={fieldSx} InputProps={{ startAdornment:<InputAdornment position="start">📞</InputAdornment> }} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Business Name" name="business" value={form.business} onChange={change} sx={fieldSx} InputProps={{ startAdornment:<InputAdornment position="start">🏢</InputAdornment> }} /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Monthly Budget (₹)" name="budget" value={form.budget} onChange={change} sx={fieldSx} InputProps={{ startAdornment:<InputAdornment position="start">💰</InputAdornment> }} /></Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontSize:"0.78rem", color: tk.muted, mb:1.2, fontFamily:"'Georgia',serif" }}>Which service interests you?</Typography>
                <Box sx={{ display:"flex", flexWrap:"wrap", gap:0.8 }}>
                  {serviceOptions.map((s) => (
                    <Chip key={s} label={s} onClick={() => setService(service===s?"":s)}
                      sx={{ fontSize:"0.68rem", cursor:"pointer", fontFamily:"'Georgia',serif", bgcolor: service===s ? tk.green : tk.greenPale, color: service===s ? tk.white : tk.green, border:`1.5px solid ${service===s ? tk.green : tk.green+"44"}`, transition:"all 0.2s ease" }}
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth multiline rows={3} label="Your Goals & Message *" name="message" value={form.message} onChange={change} placeholder="What are you looking to achieve?" sx={{ ...fieldSx, "& .MuiOutlinedInput-root":{ ...fieldSx["& .MuiOutlinedInput-root"], alignItems:"flex-start" } }} />
              </Grid>
              <Grid item xs={12}>
                <Box component="button" onClick={submit} sx={{ width:"100%", bgcolor: tk.green, color: tk.white, border:"none", borderRadius:"10px", py:1.75, fontSize:"0.95rem", fontWeight:700, cursor:"pointer", fontFamily:"'Georgia',serif", transition:"all 0.3s ease", "&:hover":{ bgcolor: tk.greenMid, transform:"translateY(-2px)", boxShadow:`0 10px 28px ${tk.green}40` } }}>
                  🌱 Plant My Growth Seed →
                </Box>
                <Typography sx={{ textAlign:"center", fontSize:"0.71rem", color: tk.muted, mt:1 }}>No spam, ever. We reply within 24 hours.</Typography>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box sx={{ textAlign:"center", py:5 }}>
            <Typography sx={{ fontSize:"3.5rem", mb:2 }}>🌳</Typography>
            <Typography sx={{ fontWeight:800, fontSize:"1.3rem", fontFamily:"'Georgia',serif", color: tk.green, mb:1.5 }}>Your Seed Has Been Planted!</Typography>
            <Typography sx={{ color: tk.muted, lineHeight:1.8, fontSize:"0.92rem", mb:3 }}>
              Thank you, <strong style={{ color: tk.black }}>{form.name}</strong>!<br />
              We'll reach you at <strong style={{ color: tk.green }}>{form.email}</strong> within 24 hours.
            </Typography>
            <Box sx={{ display:"inline-block", px:3, py:1.2, borderRadius:"100px", bgcolor: tk.greenPale, color: tk.green, fontWeight:700, fontSize:"0.82rem", border:`1px solid ${tk.green}33` }}>
              🌿 Your brand is in good hands.
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Hero Slideshow ────────────────────────────────────────────────────────
function HeroSlideshow({ onStartGrowing, onExploreServices }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setActive((p) => (p + 1) % heroSlides.length), 4500);
    return () => clearInterval(timer);
  }, [paused]);

  const slide = heroSlides[active];

  return (
    <Box
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      sx={{ position:"relative", bgcolor: tk.black, minHeight:"100vh", display:"flex", alignItems:"center", overflow:"hidden", pt:{ xs:10, md:0 }, pb:{ xs:8, md:0 } }}
    >
      {/* Per-slide background glow */}
      {heroSlides.map((s, i) => (
        <Box key={i} sx={{ position:"absolute", inset:0, pointerEvents:"none", background:`radial-gradient(ellipse at 18% 50%, ${s.accent}16, transparent 55%), radial-gradient(ellipse at 82% 30%, ${s.accent}0a, transparent 50%)`, opacity: active===i ? 1 : 0, transition:"opacity 1.1s ease" }} />
      ))}
      {/* Grid lines */}
      <Box sx={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px)`, backgroundSize:"60px 60px", pointerEvents:"none" }} />
      <Leaf top={40}    right={60}  size={100} opacity={0.07} rotate={-18} />
      <Leaf bottom={60} right={280} size={60}  opacity={0.04} rotate={25}  />
      <Leaf top="42%"   left={18}   size={46}  opacity={0.04} rotate={40}  />

      <Container maxWidth="lg" sx={{ position:"relative", zIndex:2 }}>
        <Grid container spacing={{ xs:5, md:8 }} alignItems="center">

          {/* LEFT */}
          <Grid item xs={12} md={7}>
            {/* Badge */}
            <Box sx={{ mb:2.5, height:32, position:"relative" }}>
              {heroSlides.map((s, i) => (
                <Chip key={i} label={s.badge} sx={{ position:"absolute", bgcolor:`${tk.green}22`, color: tk.greenLight, border:`1px solid ${tk.green}55`, fontSize:"0.68rem", letterSpacing:1.2, opacity: active===i?1:0, transform: active===i?"translateY(0)":"translateY(10px)", transition:"all 0.6s ease", pointerEvents:"none" }} />
              ))}
            </Box>

            {/* Headline */}
            <Box sx={{ mb:3, minHeight:{ xs:150, md:188 }, position:"relative" }}>
              {heroSlides.map((s, i) => (
                <Box key={i} sx={{ position: i===0?"relative":"absolute", top:0, opacity: active===i?1:0, transform: active===i?"translateY(0)":"translateY(18px)", transition:"all 0.7s ease", pointerEvents: active===i?"auto":"none" }}>
                  {s.headline.map((line, li) => (
                    <Typography key={li} variant="h1" sx={{ fontSize:{ xs:"2.5rem", sm:"3.5rem", md:"4.4rem" }, fontWeight:900, lineHeight:1.05, letterSpacing:"-0.03em", fontFamily:"'Georgia',serif", color: li===1 ? s.accent : tk.white, display:"block" }}>
                      {line}
                    </Typography>
                  ))}
                </Box>
              ))}
            </Box>

            {/* Sub text */}
            <Box sx={{ mb:4.5, minHeight:{ xs:80, md:70 }, position:"relative" }}>
              {heroSlides.map((s, i) => (
                <Typography key={i} sx={{ position: i===0?"relative":"absolute", top:0, color:"#999", fontSize:{ xs:"0.96rem", md:"1.1rem" }, maxWidth:500, lineHeight:1.8, opacity: active===i?1:0, transition:"opacity 0.7s ease 0.1s", pointerEvents: active===i?"auto":"none" }}>
                  {s.sub}
                </Typography>
              ))}
            </Box>

            {/* ── Buttons ── */}
            <Box sx={{ display:"flex", gap:2, flexWrap:"wrap", mb:5 }}>
              {/* ✅ OPENS FORM */}
              <Box component="button" onClick={onStartGrowing}
                sx={{ bgcolor: tk.green, color: tk.white, border:"none", borderRadius:"100px", px:{ xs:3.5, md:4.5 }, py:{ xs:1.5, md:1.75 }, fontSize:{ xs:"0.88rem", md:"0.95rem" }, fontWeight:700, cursor:"pointer", fontFamily:"'Georgia',serif", transition:"all 0.3s ease", "&:hover":{ bgcolor: tk.greenMid, transform:"translateY(-3px)", boxShadow:`0 14px 36px ${tk.green}50` } }}>
                🌱 Start Growing Today
              </Box>
              {/* ✅ SCROLLS TO SERVICES */}
              <Box component="button" onClick={onExploreServices}
                sx={{ bgcolor:"transparent", color: tk.white, border:"1.5px solid rgba(255,255,255,0.28)", borderRadius:"100px", px:{ xs:3.5, md:4.5 }, py:{ xs:1.5, md:1.75 }, fontSize:{ xs:"0.88rem", md:"0.95rem" }, fontWeight:600, cursor:"pointer", fontFamily:"'Georgia',serif", transition:"all 0.3s ease", "&:hover":{ borderColor: tk.greenLight, color: tk.greenLight, transform:"translateY(-2px)" } }}>
                Explore Services →
              </Box>
            </Box>

            {/* Tags */}
            <Box sx={{ minHeight:36, position:"relative" }}>
              {heroSlides.map((s, i) => (
                <Box key={i} sx={{ position: i===0?"relative":"absolute", top:0, display:"flex", gap:1, flexWrap:"wrap", opacity: active===i?1:0, transition:"opacity 0.5s ease", pointerEvents: active===i?"auto":"none" }}>
                  {s.tags.map((tag) => (
                    <Box key={tag} sx={{ px:1.8, py:0.5, borderRadius:"100px", border:"1px solid rgba(255,255,255,0.11)", color:"#aaa", fontSize:"0.68rem", letterSpacing:0.4 }}>{tag}</Box>
                  ))}
                </Box>
              ))}
            </Box>
          </Grid>

          {/* RIGHT — metric card (desktop only) */}
          <Grid item xs={12} md={5} sx={{ display:{ xs:"none", md:"block" } }}>
            <Box sx={{ position:"relative" }}>
              <Box sx={{ bgcolor:"#111", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"24px", p:4, textAlign:"center", position:"relative", overflow:"hidden" }}>
                <Box sx={{ position:"absolute", top:-40, right:-40, width:200, height:200, borderRadius:"50%", background:`radial-gradient(circle,${tk.green}1c,transparent 70%)`, pointerEvents:"none" }} />
                {/* Animated metric */}
                {heroSlides.map((s, i) => (
                  <Box key={i} sx={{ opacity: active===i?1:0, transform: active===i?"scale(1)":"scale(0.94)", transition:"all 0.6s ease", position: i===0?"relative":"absolute", top:0, left:0, right:0, px:4, pt:4, pointerEvents: active===i?"auto":"none" }}>
                    <Typography sx={{ fontSize:"4rem", mb:1, filter:`drop-shadow(0 0 24px ${s.accent}55)`, animation:"float 3.5s ease-in-out infinite", "@keyframes float":{ "0%,100%":{ transform:"translateY(0)" }, "50%":{ transform:"translateY(-10px)" } } }}>
                      {s.visual.icon}
                    </Typography>
                    <Typography sx={{ color:"#666", fontSize:"0.7rem", textTransform:"uppercase", letterSpacing:2, mb:0.4 }}>{s.visual.label}</Typography>
                    <Typography sx={{ color: s.accent, fontWeight:900, fontSize:"3.2rem", lineHeight:1, mb:0.4, fontFamily:"'Georgia',serif" }}>{s.visual.value}</Typography>
                    <Typography sx={{ color:"#555", fontSize:"0.76rem" }}>{s.visual.sub}</Typography>
                  </Box>
                ))}
                <Box sx={{ display:"flex", justifyContent:"space-around", mt:12, pt:3, borderTop:"1px solid rgba(255,255,255,0.06)" }}>
                  {[{ v:"7+", l:"Services" },{ v:"360°", l:"Coverage" },{ v:"1", l:"Partner" }].map((s) => (
                    <Box key={s.l} sx={{ textAlign:"center" }}>
                      <Typography sx={{ color: tk.greenLight, fontWeight:800, fontSize:"1.4rem" }}>{s.v}</Typography>
                      <Typography sx={{ color:"#444", fontSize:"0.68rem", mt:0.25 }}>{s.l}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
              {/* Corner badges */}
              {[{ label:"🧭 Strategy", top:-14, left:-14 },{ label:"📣 Ads", top:-14, right:-14 },{ label:"🔍 SEO", bottom:-14, left:-14 },{ label:"🎨 Design", bottom:-14, right:-14 }].map((b) => (
                <Box key={b.label} sx={{ position:"absolute", top:b.top, bottom:b.bottom, left:b.left, right:b.right, bgcolor: tk.black, border:`1px solid ${tk.green}44`, borderRadius:"100px", px:2, py:0.7, fontSize:"0.68rem", color: tk.greenLight, fontWeight:600, whiteSpace:"nowrap", boxShadow:`0 4px 14px ${tk.green}16` }}>
                  {b.label}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Stats bar */}
        <Box sx={{ display:"flex", gap:{ xs:4, md:8 }, flexWrap:"wrap", mt:{ xs:7, md:10 }, pt:4, borderTop:"1px solid rgba(255,255,255,0.07)" }}>
          {stats.map((s) => (
            <Box key={s.label}>
              <Typography sx={{ fontSize:{ xs:"2rem", md:"2.5rem" }, fontWeight:900, color: tk.greenLight, lineHeight:1, fontFamily:"'Georgia',serif" }}>{s.value}</Typography>
              <Typography sx={{ color:"#444", fontSize:"0.65rem", letterSpacing:1.8, mt:0.5, textTransform:"uppercase" }}>{s.label}</Typography>
            </Box>
          ))}
        </Box>

        {/* Slide dots */}
        <Box sx={{ display:"flex", gap:1.5, mt:4 }}>
          {heroSlides.map((_, i) => (
            <Box key={i} onClick={() => setActive(i)} sx={{ width: active===i?32:8, height:8, borderRadius:4, bgcolor: active===i ? tk.greenLight : "rgba(255,255,255,0.13)", transition:"all 0.4s ease", cursor:"pointer" }} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// ─── Services Section ──────────────────────────────────────────────────────
function ServicesSection({ sectionRef }) {
  const [hovered, setHovered] = useState(null);
  return (
    <Box ref={sectionRef} id="services-section" sx={{ py:{ xs:10, md:14 }, bgcolor: tk.white }}>
      <Container maxWidth="lg">
        <FadeIn>
          <Box sx={{ display:"flex", flexDirection:{ xs:"column", md:"row" }, justifyContent:"space-between", alignItems:{ md:"flex-end" }, mb:{ xs:6, md:8 }, gap:3 }}>
            <Box>
              <Typography sx={{ color: tk.green, fontWeight:700, letterSpacing:2.5, fontSize:"0.67rem", textTransform:"uppercase", mb:1.5 }}>What We Do</Typography>
              <Typography variant="h3" sx={{ fontWeight:800, fontFamily:"'Georgia',serif", fontSize:{ xs:"1.9rem", md:"2.8rem" }, lineHeight:1.12 }}>
                Seven Branches.<br />One Strong Tree.
              </Typography>
            </Box>
            <Typography sx={{ color: tk.muted, maxWidth:340, lineHeight:1.85, fontSize:"0.93rem" }}>
              Every service is a branch of the same tree—interconnected, unified, growing toward one goal: your success.
            </Typography>
          </Box>
        </FadeIn>

        <Grid container spacing={2.5}>
          {services.map((s, i) => (
            <Grid item xs={12} sm={6} md={i===3 ? 12 : 4} key={s.title}>
              <FadeIn delay={i * 0.065}>
                <Box
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  sx={{
                    height:"100%",
                    borderRadius:"20px",
                    overflow:"hidden",
                    border:`1.5px solid ${hovered===i ? tk.greenLight+"77" : tk.gray}`,
                    transition:"all 0.35s ease",
                    transform: hovered===i ? "translateY(-6px)" : "none",
                    boxShadow: hovered===i ? `0 20px 50px ${tk.green}18` : "none",
                    cursor:"default",
                    display:"flex",
                    flexDirection: i===3 ? { xs:"column", md:"row" } : "column",
                  }}
                >
                  {/* Coloured header band */}
                  <Box sx={{ background: s.gradient, p: i===3 ? { xs:4, md:5 } : 3, display:"flex", alignItems: i===3 ? "center" : "flex-start", justifyContent:"space-between", minWidth: i===3 ? { md:280 } : "auto", flexDirection: i===3 ? "column" : "row", gap:1 }}>
                    <Typography sx={{ fontSize: i===3 ? "3rem" : "2.2rem", filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }}>{s.icon}</Typography>
                    <Box sx={{ display:"flex", flexWrap:"wrap", gap:0.6, justifyContent:"flex-end" }}>
                      {s.tags.map((tag) => (
                        <Box key={tag} sx={{ px:1.2, py:0.3, borderRadius:"100px", bgcolor:"rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.9)", fontSize:"0.6rem", fontWeight:600 }}>{tag}</Box>
                      ))}
                    </Box>
                  </Box>
                  {/* Content */}
                  <Box sx={{ p: i===3 ? { xs:4, md:5 } : 3, bgcolor: hovered===i ? tk.black : tk.offWhite, transition:"background-color 0.35s ease", flex:1, display:"flex", flexDirection:"column", justifyContent:"center" }}>
                    <Typography sx={{ fontWeight:700, fontSize: i===3 ? "1.22rem" : "1rem", color: hovered===i ? tk.white : tk.black, fontFamily:"'Georgia',serif", mb:0.5, transition:"color 0.35s ease" }}>{s.title}</Typography>
                    <Typography sx={{ color: tk.greenLight, fontSize:"0.75rem", fontWeight:600, fontStyle:"italic", mb:1.5 }}>{s.tagline}</Typography>
                    <Typography sx={{ color: hovered===i ? "#999" : tk.muted, fontSize:"0.87rem", lineHeight:1.75, transition:"color 0.35s ease" }}>{s.desc}</Typography>
                  </Box>
                </Box>
              </FadeIn>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ─── DM Slideshow ──────────────────────────────────────────────────────────
function DMSlideshow() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % dmSlides.length), 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ bgcolor: tk.black, py:{ xs:10, md:14 }, position:"relative", overflow:"hidden" }}>
      <Box sx={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at 50% 50%,${tk.green}12,transparent 65%)`, pointerEvents:"none" }} />
      <Leaf top={-20} right={-20} size={200} opacity={0.04} rotate={-25} />
      <Leaf bottom={-20} left={-20} size={180} opacity={0.04} rotate={30}  />
      <Container maxWidth="lg" sx={{ position:"relative", zIndex:1 }}>
        <FadeIn>
          <Typography sx={{ color: tk.green, fontWeight:700, letterSpacing:2.5, fontSize:"0.67rem", textTransform:"uppercase", textAlign:"center", mb:1 }}>Digital Marketing Expertise</Typography>
          <Typography variant="h3" sx={{ fontWeight:800, color: tk.white, fontFamily:"'Georgia',serif", fontSize:{ xs:"1.8rem", md:"2.4rem" }, textAlign:"center", mb:{ xs:6, md:8 } }}>
            Every Channel. Every Platform.
            <Box component="span" sx={{ color: tk.greenLight }}> Every Result.</Box>
          </Typography>
        </FadeIn>
        <Grid container spacing={{ xs:4, md:8 }} alignItems="center">
          {/* Slide panel */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position:"relative", minHeight:280 }}>
              {dmSlides.map((s, i) => (
                <Box key={i} sx={{ position: i===0?"relative":"absolute", top:0, left:0, right:0, opacity: active===i?1:0, transform: active===i?"translateX(0)":"translateX(28px)", transition:"all 0.7s ease", pointerEvents: active===i?"auto":"none", bgcolor:"#0d0d0d", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"20px", p:{ xs:4, md:5 } }}>
                  <Box sx={{ display:"flex", alignItems:"center", gap:2, mb:3 }}>
                    <Box sx={{ width:52, height:52, borderRadius:"12px", bgcolor:`${s.color}18`, border:`1px solid ${s.color}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.7rem", flexShrink:0 }}>{s.icon}</Box>
                    <Box>
                      <Typography sx={{ color: s.color, fontWeight:900, fontSize:"1.4rem", fontFamily:"'Georgia',serif", lineHeight:1 }}>{s.stat}</Typography>
                      <Typography sx={{ color:"#555", fontSize:"0.7rem", mt:0.2 }}>Avg. client result</Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ fontWeight:800, color: tk.white, fontSize:"1.2rem", fontFamily:"'Georgia',serif", mb:1.5 }}>{s.title}</Typography>
                  <Typography sx={{ color:"#888", fontSize:"0.9rem", lineHeight:1.8, mb:3 }}>{s.body}</Typography>
                  <Box sx={{ display:"flex", flexWrap:"wrap", gap:0.8 }}>
                    {s.tags.map((tag) => (
                      <Box key={tag} sx={{ px:1.6, py:0.4, borderRadius:"100px", bgcolor:`${s.color}12`, border:`1px solid ${s.color}33`, color: s.color, fontSize:"0.66rem", fontWeight:600 }}>{tag}</Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
            {/* Dots */}
            <Box sx={{ display:"flex", gap:1.5, mt:4 }}>
              {dmSlides.map((s, i) => (
                <Box key={i} onClick={() => setActive(i)} sx={{ width: active===i?28:8, height:8, borderRadius:4, bgcolor: active===i ? s.color : "rgba(255,255,255,0.11)", transition:"all 0.35s ease", cursor:"pointer" }} />
              ))}
            </Box>
          </Grid>
          {/* Clickable list */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display:"flex", flexDirection:"column", gap:2 }}>
              {dmSlides.map((s, i) => (
                <Box key={i} onClick={() => setActive(i)} sx={{ display:"flex", alignItems:"center", gap:2.5, p:2.5, borderRadius:"14px", border:`1.5px solid ${active===i ? s.color+"55" : "rgba(255,255,255,0.05)"}`, bgcolor: active===i ? `${s.color}0c` : "transparent", cursor:"pointer", transition:"all 0.3s ease", "&:hover":{ borderColor: s.color+"33" } }}>
                  <Box sx={{ width:40, height:40, borderRadius:"10px", bgcolor: active===i ? `${s.color}18` : "rgba(255,255,255,0.04)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem", flexShrink:0 }}>{s.icon}</Box>
                  <Box sx={{ flex:1 }}>
                    <Typography sx={{ color: active===i ? s.color : "#ccc", fontWeight:700, fontSize:"0.87rem", transition:"color 0.3s ease" }}>{s.title}</Typography>
                    <Typography sx={{ color:"#555", fontSize:"0.7rem", mt:0.15 }}>{s.stat}</Typography>
                  </Box>
                  <Box sx={{ width:6, height:6, borderRadius:"50%", bgcolor: active===i ? s.color : "transparent", flexShrink:0, transition:"background-color 0.3s ease" }} />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ─── Main Export ───────────────────────────────────────────────────────────
export default function Home() {
  const [formOpen, setFormOpen] = useState(false);
  const servicesRef             = useRef(null);
  const navigate                = useNavigate();

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior:"smooth", block:"start" });
  };

  return (
    <Box sx={{ fontFamily:"'Georgia',serif", bgcolor: tk.offWhite, color: tk.black, overflowX:"hidden" }}>

      {/* 1 ── Hero Slideshow */}
      <HeroSlideshow onStartGrowing={() => setFormOpen(true)} onExploreServices={scrollToServices} />

      {/* 2 ── Services */}
      <ServicesSection sectionRef={servicesRef} />

      {/* 3 ── DM Slideshow */}
      <DMSlideshow />

      {/* 4 ── About Strip */}
      <Box sx={{ py:{ xs:10, md:14 }, bgcolor: tk.offWhite, position:"relative", overflow:"hidden" }}>
        <Leaf top={-20} right={-20} size={220} opacity={0.04} rotate={-30} />
        <Container maxWidth="lg">
          <Grid container spacing={{ xs:6, md:10 }} alignItems="center">
            <Grid item xs={12} md={5}>
              <FadeIn direction="left">
                <Box sx={{ position:"relative" }}>
                  <Box sx={{ bgcolor: tk.black, borderRadius:"24px", p:5, color: tk.white, position:"relative", overflow:"hidden" }}>
                    <Box sx={{ position:"absolute", top:-40, right:-40, width:200, height:200, borderRadius:"50%", background:`radial-gradient(circle,${tk.green}30,transparent 70%)` }} />
                    <Typography sx={{ fontSize:"5rem", mb:2, filter:"drop-shadow(0 0 20px #4CAF5044)" }}>🌱</Typography>
                    <Typography variant="h5" sx={{ fontWeight:800, fontFamily:"inherit", mb:2 }}>Born from the Gap</Typography>
                    <Typography sx={{ color:"#888", lineHeight:1.8, fontSize:"0.9rem" }}>Brands needed to grow—but their digital ecosystem wasn't growing together. From this gap, Treevion was born.</Typography>
                    <Box sx={{ display:"flex", gap:3, mt:4, pt:3, borderTop:"1px solid rgba(255,255,255,0.07)" }}>
                      {[{ v:"2024", l:"Founded" },{ v:"Jaipur", l:"India" }].map((x) => (
                        <Box key={x.l}><Typography sx={{ color: tk.greenLight, fontWeight:800 }}>{x.v}</Typography><Typography sx={{ color:"#555", fontSize:"0.7rem" }}>{x.l}</Typography></Box>
                      ))}
                    </Box>
                  </Box>
                  <Box sx={{ position:"absolute", bottom:-20, right:-20, bgcolor: tk.white, borderRadius:"16px", p:2, display:"flex", alignItems:"center", gap:1.5, boxShadow:"0 12px 40px rgba(0,0,0,0.12)", border:`1px solid ${tk.gray}` }}>
                    <Avatar sx={{ bgcolor: tk.green, width:40, height:40 }}>S</Avatar>
                    <Box><Typography sx={{ fontWeight:700, fontSize:"0.82rem", color: tk.black }}>Samiksha Jain</Typography><Typography sx={{ color: tk.muted, fontSize:"0.7rem" }}>Founder & CEO</Typography></Box>
                  </Box>
                </Box>
              </FadeIn>
            </Grid>
            <Grid item xs={12} md={7}>
              <FadeIn direction="right">
                <Typography sx={{ color: tk.green, fontWeight:700, letterSpacing:2.5, fontSize:"0.67rem", textTransform:"uppercase", mb:2 }}>About Treevion</Typography>
                <Typography variant="h3" sx={{ fontWeight:800, fontFamily:"inherit", fontSize:{ xs:"1.8rem", md:"2.4rem" }, lineHeight:1.2, mb:3 }}>
                  We Don't Just Build Digital Presence—
                  <Box component="span" sx={{ color: tk.green }}> We Build Digital Forests.</Box>
                </Typography>
                <Typography sx={{ color: tk.muted, lineHeight:1.9, fontSize:"0.97rem", mb:4 }}>
                  Just like a tree grows from a single seed into a unified structure—Treevion gives your brand one powerful place where everything grows in harmony, rooted in data and shaped with AI-powered insights.
                </Typography>
                <Box sx={{ display:"flex", flexWrap:"wrap", gap:1.5 }}>
                  {[{ icon:"🌱", label:"Roots", sub:"Strategy" },{ icon:"🪵", label:"Trunk", sub:"Unified Services" },{ icon:"🌿", label:"Branches", sub:"Creativity" },{ icon:"🍃", label:"Leaves", sub:"Results" }].map((item) => (
                    <Box key={item.label} sx={{ display:"flex", alignItems:"center", gap:1.5, px:2.5, py:1.5, borderRadius:"100px", bgcolor: tk.greenPale, border:`1px solid ${tk.green}33` }}>
                      <Typography sx={{ fontSize:"1.1rem" }}>{item.icon}</Typography>
                      <Box><Typography sx={{ fontSize:"0.68rem", fontWeight:700, color: tk.green, lineHeight:1 }}>{item.label}</Typography><Typography sx={{ fontSize:"0.62rem", color: tk.muted }}>{item.sub}</Typography></Box>
                    </Box>
                  ))}
                </Box>
              </FadeIn>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 5 ── Why Treevion */}
      <Box sx={{ py:{ xs:10, md:14 }, bgcolor: tk.black, color: tk.white, position:"relative", overflow:"hidden" }}>
        <Box sx={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at 30% 50%,${tk.green}11,transparent 60%)`, pointerEvents:"none" }} />
        <Leaf top={0} right={20} size={180} opacity={0.04} rotate={-20} />
        <Container maxWidth="lg" sx={{ position:"relative", zIndex:1 }}>
          <FadeIn>
            <Box sx={{ textAlign:"center", mb:{ xs:6, md:8 } }}>
              <Typography sx={{ color: tk.green, fontWeight:700, letterSpacing:2.5, fontSize:"0.67rem", textTransform:"uppercase", mb:1.5 }}>Why Choose Us</Typography>
              <Typography variant="h3" sx={{ fontWeight:800, fontFamily:"inherit", fontSize:{ xs:"2rem", md:"2.8rem" } }}>
                What Makes Treevion<Box component="span" sx={{ color: tk.greenLight }}> Different?</Box>
              </Typography>
            </Box>
          </FadeIn>
          <Grid container spacing={2.5}>
            {whyUs.map((w, i) => (
              <Grid item xs={12} sm={6} md={4} key={w.title}>
                <FadeIn delay={i * 0.07}>
                  <Box sx={{ p:3.5, borderRadius:"18px", border:"1px solid rgba(255,255,255,0.06)", bgcolor:"rgba(255,255,255,0.03)", transition:"all 0.3s ease", "&:hover":{ bgcolor:"rgba(255,255,255,0.06)", borderColor:`${tk.greenLight}33`, transform:"translateY(-4px)" }, height:"100%" }}>
                    <Typography sx={{ fontSize:"2rem", mb:2 }}>{w.icon}</Typography>
                    <Typography sx={{ fontWeight:700, fontSize:"1rem", mb:1.25, fontFamily:"inherit" }}>{w.title}</Typography>
                    <Typography sx={{ color:"#777", fontSize:"0.87rem", lineHeight:1.8 }}>{w.desc}</Typography>
                  </Box>
                </FadeIn>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 6 ── Testimonials */}
      <Box sx={{ py:{ xs:10, md:14 }, bgcolor: tk.white }}>
        <Container maxWidth="lg">
          <FadeIn>
            <Box sx={{ textAlign:"center", mb:{ xs:6, md:8 } }}>
              <Typography sx={{ color: tk.green, fontWeight:700, letterSpacing:2.5, fontSize:"0.67rem", textTransform:"uppercase", mb:1.5 }}>What Clients Say</Typography>
              <Typography variant="h3" sx={{ fontWeight:800, fontFamily:"inherit", fontSize:{ xs:"2rem", md:"2.6rem" } }}>Brands That Grew With Us 🌿</Typography>
            </Box>
          </FadeIn>
          <Grid container spacing={3}>
            {testimonials.map((item, i) => (
              <Grid item xs={12} md={4} key={item.name}>
                <FadeIn delay={i * 0.1}>
                  <Box sx={{ p:4, borderRadius:"20px", border:`1.5px solid ${tk.gray}`, bgcolor: tk.offWhite, height:"100%", transition:"all 0.3s ease", "&:hover":{ borderColor: tk.greenLight, boxShadow:`0 16px 48px ${tk.green}12`, transform:"translateY(-5px)" } }}>
                    <Typography sx={{ color: tk.greenLight, fontSize:"2rem", mb:2, lineHeight:1 }}>"</Typography>
                    <Typography sx={{ color:"#444", lineHeight:1.85, fontSize:"0.92rem", mb:3, fontStyle:"italic" }}>{item.text}</Typography>
                    <Box sx={{ display:"flex", alignItems:"center", gap:2, pt:3, borderTop:`1px solid ${tk.gray}` }}>
                      <Avatar sx={{ bgcolor: tk.green, width:44, height:44, fontWeight:800 }}>{item.avatar}</Avatar>
                      <Box>
                        <Typography sx={{ fontWeight:700, fontSize:"0.9rem" }}>{item.name}</Typography>
                        <Typography sx={{ color: tk.muted, fontSize:"0.75rem" }}>{item.role}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </FadeIn>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 7 ── Final CTA */}
      <Box sx={{ bgcolor: tk.green, py:{ xs:10, md:14 }, textAlign:"center", position:"relative", overflow:"hidden" }}>
        <Box sx={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 20% 50%,rgba(255,255,255,0.06),transparent 50%),radial-gradient(circle at 80% 50%,rgba(0,0,0,0.12),transparent 50%)", pointerEvents:"none" }} />
        <Leaf top={-30} right={30} size={200} opacity={0.06} rotate={-20} />
        <Leaf bottom={-30} left={30} size={180} opacity={0.06} rotate={30}  />
        <Container maxWidth="md" sx={{ position:"relative", zIndex:1 }}>
          <FadeIn>
            <Typography sx={{ fontSize:"4rem", mb:3 }}>🌳</Typography>
            <Typography variant="h2" sx={{ fontWeight:900, color: tk.white, fontFamily:"inherit", fontSize:{ xs:"2rem", md:"3.2rem" }, lineHeight:1.1, mb:3 }}>
              Ready to Grow Your<br />Digital Forest?
            </Typography>
            <Typography sx={{ color:"rgba(255,255,255,0.8)", fontSize:"1.05rem", lineHeight:1.85, mb:6 }}>
              Stop juggling agencies. Stop wasting budget. Start growing—<br />
              with Treevion as your one unified digital growth partner.
            </Typography>
            <Box sx={{ display:"flex", gap:2, justifyContent:"center", flexWrap:"wrap" }}>
              <Box component="button" onClick={() => setFormOpen(true)} sx={{ bgcolor: tk.white, color: tk.green, border:"none", borderRadius:"100px", px:5, py:2, fontSize:"1rem", fontWeight:800, cursor:"pointer", fontFamily:"'Georgia',serif", transition:"all 0.3s ease", "&:hover":{ transform:"scale(1.04)", boxShadow:"0 16px 40px rgba(0,0,0,0.25)" } }}>
                🌱 Get a Free Strategy Call
              </Box>
              <Box component="button" onClick={() => navigate("/services")} sx={{ bgcolor:"transparent", color: tk.white, border:"2px solid rgba(255,255,255,0.4)", borderRadius:"100px", px:5, py:2, fontSize:"1rem", fontWeight:700, cursor:"pointer", fontFamily:"'Georgia',serif", transition:"all 0.3s ease", "&:hover":{ borderColor: tk.white } }}>
                View All Services →
              </Box>
            </Box>
            <Typography sx={{ color:"rgba(255,255,255,0.55)", mt:4, fontSize:"0.78rem" }}>
              📍 Chittaurgarh, Rajasthan &nbsp;·&nbsp; samikshajainffdl@gmail.com &nbsp;·&nbsp; +91 94146 96345
            </Typography>
          </FadeIn>
        </Container>
      </Box>

      {/* Form Dialog */}
      <GrowthFormDialog open={formOpen} onClose={() => setFormOpen(false)} />
    </Box>
  );
}