import { Router, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET /api/about
router.get("/", async (_req: Request, res: Response) => {
  const about = await prisma.about.findFirst();
  if (!about) { res.status(404).json({ error: "Not found" }); return; }
  res.json({
    ...about,
    missionPoints: JSON.parse(about.missionPoints),
    ictValues: JSON.parse(about.ictValues),
  });
});

// PUT /api/about
router.put("/", requireAuth, async (req: Request, res: Response) => {
  const schema = z.object({
    vision: z.string().optional(),
    philosophy: z.string().optional(),
    missionPoints: z.array(z.string()).optional(),
    ictValues: z.array(z.object({ letter: z.string(), term: z.string() })).optional(),
    awardBadge: z.string().optional(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }

  const existing = await prisma.about.findFirst();
  const data = {
    ...parsed.data,
    missionPoints: parsed.data.missionPoints ? JSON.stringify(parsed.data.missionPoints) : undefined,
    ictValues: parsed.data.ictValues ? JSON.stringify(parsed.data.ictValues) : undefined,
  };

  const about = existing
    ? await prisma.about.update({ where: { id: existing.id }, data })
    : await prisma.about.create({
        data: {
          vision: data.vision ?? "",
          philosophy: data.philosophy ?? "",
          missionPoints: data.missionPoints ?? "[]",
          ictValues: data.ictValues ?? "[]",
          awardBadge: data.awardBadge ?? "",
        },
      });

  res.json({
    ...about,
    missionPoints: JSON.parse(about.missionPoints),
    ictValues: JSON.parse(about.ictValues),
  });
});

export default router;
