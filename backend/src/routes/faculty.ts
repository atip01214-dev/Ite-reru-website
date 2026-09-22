import { Router, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

const facultySchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  degree: z.string().min(1),
  image: z.string(),
  expertise: z.array(z.string()),
  link: z.string().optional().nullable(),
  isDean: z.boolean().optional(),
  order: z.number().optional(),
});

// GET /api/faculty
router.get("/", async (_req: Request, res: Response) => {
  const members = await prisma.faculty.findMany({ orderBy: { order: "asc" } });
  res.json(members.map((m) => ({ ...m, expertise: JSON.parse(m.expertise) })));
});

// GET /api/faculty/dean
router.get("/dean", async (_req: Request, res: Response) => {
  const dean = await prisma.faculty.findFirst({ where: { isDean: true } });
  if (!dean) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...dean, expertise: JSON.parse(dean.expertise) });
});

// GET /api/faculty/:id
router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const member = await prisma.faculty.findUnique({ where: { id } });
  if (!member) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...member, expertise: JSON.parse(member.expertise) });
});

// POST /api/faculty  (admin)
router.post("/", requireAuth, async (req: Request, res: Response) => {
  const parsed = facultySchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }
  const { expertise, ...rest } = parsed.data;
  const member = await prisma.faculty.create({ data: { ...rest, expertise: JSON.stringify(expertise) } });
  res.status(201).json({ ...member, expertise: JSON.parse(member.expertise) });
});

// PUT /api/faculty/:id  (admin)
router.put("/:id", requireAuth, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const parsed = facultySchema.partial().safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }
  const { expertise, ...rest } = parsed.data;
  try {
    const member = await prisma.faculty.update({
      where: { id },
      data: { ...rest, ...(expertise ? { expertise: JSON.stringify(expertise) } : {}) },
    });
    res.json({ ...member, expertise: JSON.parse(member.expertise) });
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});

// DELETE /api/faculty/:id  (admin)
router.delete("/:id", requireAuth, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  try {
    await prisma.faculty.delete({ where: { id } });
    res.json({ success: true });
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});

export default router;
