import { Grid, Card, CardContent } from "@mui/material";

export function Services() {
  const services = [
    { title: "Web Development", desc: "Modern responsive websites" },
    { title: "SEO Optimization", desc: "Rank higher on Google" },
    { title: "UI/UX Design", desc: "Attractive and user-friendly design" },
  ];

  return (
    <Grid container spacing={3} sx={{ p: 5 }}>
      {services.map((s, i) => (
        <Grid item xs={12} md={4} key={i}>
          <Card sx={{ borderRadius: 4, boxShadow: 5 }}>
            <CardContent>
              <h2>{s.title}</h2>
              <p>{s.desc}</p>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
