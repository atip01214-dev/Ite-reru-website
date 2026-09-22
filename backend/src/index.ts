import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import authRouter from "./routes/auth";
import heroRouter from "./routes/hero";
import statsRouter from "./routes/stats";
import aboutRouter from "./routes/about";
import newsRouter from "./routes/news";
import facultyRouter from "./routes/faculty";
import curriculumRouter from "./routes/curriculum";
import facilitiesRouter from "./routes/facilities";
import contactRouter from "./routes/contact";
import partnersRouter from "./routes/partners";
import navlinksRouter from "./routes/navlinks";
import uploadRouter from "./routes/upload";

const app = express();
const PORT = parseInt(process.env.PORT ?? "4000", 10);
const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:3000";

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: [FRONTEND_URL, "http://localhost:3000", "http://localhost:3001"],
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth", authRouter);
app.use("/api/hero", heroRouter);
app.use("/api/stats", statsRouter);
app.use("/api/about", aboutRouter);
app.use("/api/news", newsRouter);
app.use("/api/faculty", facultyRouter);
app.use("/api/curriculum", curriculumRouter);
app.use("/api/facilities", facilitiesRouter);
app.use("/api/contact", contactRouter);
app.use("/api/partners", partnersRouter);
app.use("/api/navlinks", navlinksRouter);
app.use("/api/upload", uploadRouter);

// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── 404 handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`   CORS allowed origin: ${FRONTEND_URL}`);
});
