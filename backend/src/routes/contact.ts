import { Router, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET /api/contact
router.get("/", async (_req, res: Response) => {
  const contact = await prisma.contact.findFirst();
  if (!contact) { res.status(404).json({ error: "Not found" }); return; }
  res.json(contact);
});

// PUT /api/contact
router.put("/", requireAuth, async (req: Request, res: Response) => {
  const schema = z.object({
    faculty: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    fax: z.string().optional(),
    email: z.string().email().optional(),
    website: z.string().url().optional(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }

  const existing = await prisma.contact.findFirst();
  const contact = existing
    ? await prisma.contact.update({ where: { id: existing.id }, data: parsed.data })
    : await prisma.contact.create({ data: { faculty: "", address: "", phone: "", fax: "", email: "", website: "", ...parsed.data } });
  res.json(contact);
});

export default router;
