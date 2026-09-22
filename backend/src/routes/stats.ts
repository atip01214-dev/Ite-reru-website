import { Router, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET /api/stats
router.get("/", async (_req: Request, res: Response) => {
  const stats = await prisma.stat.findMany({ orderBy: { order: "asc" } });
  res.json(stats);
});

// PUT /api/stats  — replace entire list
router.put("/", requireAuth, async (req: Request, res: Response) => {
  const schema = z.array(z.object({
    id: z.number().optional(),
    value: z.number(),
    suffix: z.string(),
    label: z.string(),
    order: z.number().optional(),
  }));
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }

  await prisma.stat.deleteMany();
  await prisma.stat.createMany({
    data: parsed.data.map((s, i) => ({ value: s.value, suffix: s.suffix, label: s.label, order: s.order ?? i })),
  });
  const stats = await prisma.stat.findMany({ orderBy: { order: "asc" } });
  res.json(stats);
});

export default router;
