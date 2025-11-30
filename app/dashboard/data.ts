/* ---------------------------
   TEXT WIDGET CONTENT
---------------------------- */
export const textData = {
  Skills: ["JavaScript", "React", "TypeScript", "Node.js"],

  Roles: ["Full Stack Developer", "AI Engineer", "Cloud Architect"],

  Salary: ["$105,000 / yr"],

  Locations: ["San Francisco", "London", "Berlin"],

  Reports: ["Monthly Hiring Trends", "Market Movement Summary"],
};

/* ---------------------------
   HOURLY + DAILY TREND DATA
---------------------------- */
const now = new Date();

/** 24-hour series */
const hourly: { timestamp: string; value: number }[] = [];
for (let i = 0; i < 24; i++) {
  const d = new Date();
  d.setHours(now.getHours() - (23 - i));

  hourly.push({
    timestamp: d.toISOString(),
    value: Math.floor(50 + Math.sin(i / 3) * 30 + Math.random() * 10),
  });
}

/** 365-day series */
const daily: { date: string; value: number }[] = [];
for (let i = 0; i < 365; i++) {
  const d = new Date();
  d.setDate(now.getDate() - (364 - i));

  daily.push({
    date: d.toISOString().split("T")[0],
    value: Math.floor(70 + Math.sin(i / 15) * 50 + Math.random() * 20),
  });
}

export const hourlyData = hourly;
export const dailyData = daily;

/* ---------------------------
   PIE CHART
---------------------------- */
export const pieChartData = [
  { name: "Frontend", value: 40 },
  { name: "Backend", value: 25 },
  { name: "AI/ML", value: 20 },
  { name: "UI/UX", value: 15 },
];

/* ---------------------------
   BAR CHART
---------------------------- */
export const barChartData = [
  { name: "React", value: 90 },
  { name: "Vue", value: 60 },
  { name: "Angular", value: 45 },
  { name: "Svelte", value: 30 },
];
