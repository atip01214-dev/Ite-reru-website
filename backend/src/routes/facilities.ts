import { Router, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();
const schema = z.object({
  name: z.string(), nameEn: z.string(), icon: z.string(), gradient: z.string(), order: z.number().optional(),
});

// GET /api/facilities
router.get("/", async (_req, res: Response) => {
  res.json(await prisma.facility.findMany({ orderBy: { order: "asc" } }));
});

// POST /api/facilities
router.post("/", requireAuth, async (req: Request, res: Response) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }
  res.status(201).json(await prisma.facility.create({ data: parsed.data }));
});

// PUT /api/facilities/:id
router.put("/:id", requireAuth, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const parsed = schema.partial().safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }
  try { res.json(await prisma.facility.update({ where: { id }, data: parsed.data })); }
  catch { res.status(404).json({ error: "Not found" }); }
});

// DELETE /api/facilities/:id
router.delete("/:id", requireAuth, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  try { await prisma.facility.delete({ where: { id } }); res.json({ success: true }); }
  catch { res.status(404).json({ error: "Not found" }); }
});

export default router;
