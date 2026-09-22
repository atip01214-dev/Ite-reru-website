import { Router, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

const newsSchema = z.object({
  category: z.enum(["ข่าวประชาสัมพันธ์", "กิจกรรมนักศึกษา", "งานวิจัยและผลงาน"]),
  date: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  image: z.string().optional().nullable(),
});

// GET /api/news?category=xxx
router.get("/", async (req: Request, res: Response) => {
  const category = req.query.category as string | undefined;
  const news = await prisma.news.findMany({
    where: category && category !== "ทั้งหมด" ? { category } : undefined,
    orderBy: { createdAt: "desc" },
  });
  res.json(news);
});

// GET /api/news/:id
router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id));
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const item = await prisma.news.findUnique({ where: { id } });
  if (!item) { res.status(404).json({ error: "Not found" }); return; }
  res.json(item);
});

// POST /api/news  (admin)
router.post("/", requireAuth, async (req: Request, res: Response) => {
  const parsed = newsSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }
  const item = await prisma.news.create({ data: parsed.data });
  res.status(201).json(item);
});

// PUT /api/news/:id  (admin)
router.put("/:id", requireAuth, async (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id));
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const parsed = newsSchema.partial().safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }
  try {
    const item = await prisma.news.update({ where: { id }, data: parsed.data });
    res.json(item);
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});

// DELETE /api/news/:id  (admin)
router.delete("/:id", requireAuth, async (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id));
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  try {
    await prisma.news.delete({ where: { id } });
    res.json({ success: true });
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});

export default router;
