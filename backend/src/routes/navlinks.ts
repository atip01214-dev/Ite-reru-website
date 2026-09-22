import { Router, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET /api/navlinks
router.get("/", async (_req, res: Response) => {
  res.json(await prisma.navLink.findMany({ orderBy: { order: "asc" } }));
});

// PUT /api/navlinks  — replace entire list
router.put("/", requireAuth, async (req: Request, res: Response) => {
  const schema = z.array(z.object({ label: z.string(), href: z.string(), order: z.number().optional() }));
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }
  await prisma.navLink.deleteMany();
  await prisma.navLink.createMany({ data: parsed.data.map((n, i) => ({ label: n.label, href: n.href, order: n.order ?? i })) });
  res.json(await prisma.navLink.findMany({ orderBy: { order: "asc" } }));
});

export default router;
