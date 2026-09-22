import { Router, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET /api/hero
router.get("/", async (_req: Request, res: Response) => {
  const hero = await prisma.hero.findFirst();
  if (!hero) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...hero, tags: JSON.parse(hero.tags) });
});

// PUT /api/hero  (admin only)
router.put("/", requireAuth, async (req: Request, res: Response) => {
  const schema = z.object({
    badge: z.string().optional(),
    title: z.string().optional(),
    subtitle: z.string().optional(),
    tags: z.array(z.string()).optional(),
    highlightCwie: z.string().optional(),
    highlightIncome: z.string().optional(),
    ctaPrimary: z.string().optional(),
    ctaAdmission: z.string().optional(),
    bgImage: z.string().optional(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }

  const existing = await prisma.hero.findFirst();
  const data = {
    ...parsed.data,
    tags: parsed.data.tags ? JSON.stringify(parsed.data.tags) : undefined,
  };

  const hero = existing
    ? await prisma.hero.update({ where: { id: existing.id }, data })
    : await prisma.hero.create({ data: { ...data, tags: data.tags ?? "[]", badge: data.badge ?? "", title: data.title ?? "", subtitle: data.subtitle ?? "", highlightCwie: data.highlightCwie ?? "", highlightIncome: data.highlightIncome ?? "", ctaPrimary: data.ctaPrimary ?? "", ctaAdmission: data.ctaAdmission ?? "", bgImage: data.bgImage ?? "" } });

  res.json({ ...hero, tags: JSON.parse(hero.tags) });
});

export default router;
