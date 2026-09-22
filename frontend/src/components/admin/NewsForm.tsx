"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ImageUp, Loader2 } from "lucide-react";
import { adminApi, type NewsItem } from "@/lib/api";

type NewsCategory = "ข่าวประชาสัมพันธ์" | "กิจกรรมนักศึกษา" | "งานวิจัยและผลงาน";

const CATEGORIES: NewsCategory[] = ["ข่าวประชาสัมพันธ์", "กิจกรรมนักศึกษา", "งานวิจัยและผลงาน"];

interface NewsFormProps {
  initial?: NewsItem;
}

export default function NewsForm({ initial }: NewsFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    category: (initial?.category ?? "ข่าวประชาสัมพันธ์") as NewsCategory,
    date: initial?.date ?? "",
    title: initial?.title ?? "",
    excerpt: initial?.excerpt ?? "",
    image: initial?.image ?? "",
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    try {
      const { url } = await adminApi.uploadImage(file);
      set("image", url);
    } catch {
      setError("อัปโหลดรูปไม่สำเร็จ");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (initial) {
        await adminApi.updateNews(initial.id, form);
      } else {
        await adminApi.createNews(form);
      }
      router.push("/admin/news");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "บันทึกไม่สำเร็จ");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            หมวดหมู่ <span className="text-red-500">*</span>
          </label>
          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            วันที่ <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            required
            placeholder="เช่น 24 ต.ค. 2568"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          หัวข้อข่าว <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          required
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          เนื้อหาย่อ <span className="text-red-500">*</span>
        </label>
        <textarea
          value={form.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
          required
          rows={4}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          รูปภาพ
        </label>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={form.image}
            onChange={(e) => set("image", e.target.value)}
            placeholder="/images/news/example.jpg"
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
          <label className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-3 text-sm transition ${uploading ? "opacity-50" : "border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-white/15 dark:text-blue-300"}`}>
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageUp className="h-4 w-4" />}
            อัปโหลด
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
            />
          </label>
        </div>
        {form.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.image} alt="preview" className="mt-3 h-32 rounded-xl object-cover" />
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-600 disabled:opacity-60"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {saving ? "กำลังบันทึก..." : "บันทึก"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300"
        >
          ยกเลิก
        </button>
      </div>
    </form>
  );
}
