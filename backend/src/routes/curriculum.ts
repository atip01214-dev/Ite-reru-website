import { Router, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

// Helper to parse program
function parseProgram(p: { highlights?: string | null; majors?: { id: number; programId: number; name: string; detail: string; focus: string; order: number }[] }) {
  return {
    ...p,
    highlights: p.highlights ? JSON.parse(p.highlights) : undefined,
  };
}

// ── Programs ──────────────────────────────────────────────────────────────────

// GET /api/curriculum/programs
router.get("/programs", async (_req, res: Response) => {
  const programs = await prisma.program.findMany({
    include: { majors: { orderBy: { order: "asc" } } },
    orderBy: { order: "asc" },
  });
  res.json(programs.map(parseProgram));
});

// POST /api/curriculum/programs
router.post("/programs", requireAuth, async (req: Request, res: Response) => {
  const schema = z.object({
    degree: z.string(), name: z.string(), nameEn: z.string(),
    badge: z.string().optional(), duration: z.string().optional(), credits: z.string().optional(),
    highlights: z.array(z.string()).optional(), order: z.number().optional(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }
  const { highlights, ...rest } = parsed.data;
  const program = await prisma.program.create({
    data: { ...rest, highlights: highlights ? JSON.stringify(highlights) : undefined },
    include: { majors: true },
  });
  res.status(201).json(parseProgram(program));
});

// PUT /api/curriculum/programs/:id
router.put("/programs/:id", requireAuth, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const schema = z.object({
    degree: z.string().optional(), name: z.string().optional(), nameEn: z.string().optional(),
    badge: z.string().optional().nullable(), duration: z.string().optional().nullable(), credits: z.string().optional().nullable(),
    highlights: z.array(z.string()).optional(), order: z.number().optional(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }
  const { highlights, ...rest } = parsed.data;
  try {
    const program = await prisma.program.update({
      where: { id },
      data: { ...rest, ...(highlights !== undefined ? { highlights: JSON.stringify(highlights) } : {}) },
      include: { majors: { orderBy: { order: "asc" } } },
    });
    res.json(parseProgram(program));
  } catch { res.status(404).json({ error: "Not found" }); }
});

// DELETE /api/curriculum/programs/:id
router.delete("/programs/:id", requireAuth, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  try {
    await prisma.program.delete({ where: { id } });
    res.json({ success: true });
  } catch { res.status(404).json({ error: "Not found" }); }
});

// ── Majors ────────────────────────────────────────────────────────────────────

const majorSchema = z.object({
  name: z.string(), detail: z.string(), focus: z.string(), order: z.number().optional(),
});

router.post("/programs/:programId/majors", requireAuth, async (req: Request, res: Response) => {
  const programId = parseInt(req.params.programId);
  if (isNaN(programId)) { res.status(400).json({ error: "Invalid id" }); return; }
  const parsed = majorSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }
  const major = await prisma.major.create({ data: { ...parsed.data, programId } });
  res.status(201).json(major);
});

router.put("/majors/:id", requireAuth, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const parsed = majorSchema.partial().safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }
  try {
    const major = await prisma.major.update({ where: { id }, data: parsed.data });
    res.json(major);
  } catch { res.status(404).json({ error: "Not found" }); }
});

router.delete("/majors/:id", requireAuth, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  try {
    await prisma.major.delete({ where: { id } });
    res.json({ success: true });
  } catch { res.status(404).json({ error: "Not found" }); }
});

// ── Courses ───────────────────────────────────────────────────────────────────

router.get("/courses", async (_req, res: Response) => {
  res.json(await prisma.course.findMany({ orderBy: { order: "asc" } }));
});

router.post("/courses", requireAuth, async (req: Request, res: Response) => {
  const schema = z.object({ name: z.string(), nameEn: z.string(), icon: z.string(), order: z.number().optional() });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }
  res.status(201).json(await prisma.course.create({ data: parsed.data }));
});

router.put("/courses/:id", requireAuth, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const schema = z.object({ name: z.string().optional(), nameEn: z.string().optional(), icon: z.string().optional(), order: z.number().optional() });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }
  try { res.json(await prisma.course.update({ where: { id }, data: parsed.data })); }
  catch { res.status(404).json({ error: "Not found" }); }
});

router.delete("/courses/:id", requireAuth, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  try { await prisma.course.delete({ where: { id } }); res.json({ success: true }); }
  catch { res.status(404).json({ error: "Not found" }); }
});

// ── Other Programs ────────────────────────────────────────────────────────────

router.get("/other-programs", async (_req, res: Response) => {
  res.json(await prisma.otherProgram.findMany({ orderBy: { order: "asc" } }));
});

router.put("/other-programs", requireAuth, async (req: Request, res: Response) => {
  const schema = z.array(z.object({ name: z.string(), order: z.number().optional() }));
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }
  await prisma.otherProgram.deleteMany();
  await prisma.otherProgram.createMany({ data: parsed.data.map((p, i) => ({ name: p.name, order: p.order ?? i })) });
  res.json(await prisma.otherProgram.findMany({ orderBy: { order: "asc" } }));
});

// ── Careers ───────────────────────────────────────────────────────────────────

router.get("/careers", async (_req, res: Response) => {
  res.json(await prisma.career.findMany({ orderBy: { order: "asc" } }));
});

router.put("/careers", requireAuth, async (req: Request, res: Response) => {
  const schema = z.array(z.object({ name: z.string(), order: z.number().optional() }));
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }
  await prisma.career.deleteMany();
  await prisma.career.createMany({ data: parsed.data.map((c, i) => ({ name: c.name, order: c.order ?? i })) });
  res.json(await prisma.career.findMany({ orderBy: { order: "asc" } }));
});

export default router;
