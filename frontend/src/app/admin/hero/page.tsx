"use client";

import { useEffect, useState, FormEvent } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { api, adminApi, type HeroData } from "@/lib/api";
import { Loader2, X } from "lucide-react";

export default function AdminHeroPage() {
  const [data, setData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    api.getHero().then((d) => { setData(d); setLoading(false); });
  }, []);

  function set(field: keyof HeroData, value: unknown) {
    setData((prev) => prev ? { ...prev, [field]: value } : prev);
  }

  function addTag() {
    const val = tagInput.trim();
    if (val && data && !data.tags.includes(val)) {
      set("tags", [...data.tags, val]);
    }
    setTagInput("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!data) return;
    setSaving(true);
    setError("");
    try {
      const updated = await adminApi.updateHero(data);
      setData(updated);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "บันทึกไม่สำเร็จ");
    } finally { setSaving(false); }
  }

  if (loading || !data) return <AdminLayout><div className="py-20 text-center text-slate-400">กำลังโหลด...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-blue-900 dark:text-white">Hero Banner</h1>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm space-y-5 dark:border-white/10 dark:bg-white/5">
          {error && <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>}
          {success && <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">✅ บันทึกสำเร็จ</div>}

          {[
            { label: "Badge (ประกาศ)", field: "badge" as const },
            { label: "Title (หัวเรื่อง)", field: "title" as const },
            { label: "Subtitle", field: "subtitle" as const },
            { label: "Highlight CWIE", field: "highlightCwie" as const },
            { label: "Highlight รายได้", field: "highlightIncome" as const },
            { label: "CTA หลัก (ข้อความปุ่ม)", field: "ctaPrimary" as const },
            { label: "CTA Admission (URL)", field: "ctaAdmission" as const },
            { label: "Background Image (path)", field: "bgImage" as const },
          ].map(({ label, field }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
              <input type="text" value={data[field] as string} onChange={(e) => set(field, e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white" />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Tags</label>
            <div className="flex gap-2 mb-2">
              <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                placeholder="เพิ่ม tag แล้วกด Enter"
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white" />
              <button type="button" onClick={addTag}
                className="rounded-xl border border-blue-200 px-4 py-3 text-sm text-blue-700 hover:bg-blue-50 dark:border-white/15 dark:text-blue-300">เพิ่ม</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-white/10 dark:text-blue-300">
                  {tag}
                  <button type="button" onClick={() => set("tags", data.tags.filter((t) => t !== tag))}><X className="h-3 w-3" /></button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-600 disabled:opacity-60">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {saving ? "กำลังบันทึก..." : "บันทึก"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
