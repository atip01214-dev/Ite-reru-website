"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ImageUp, Loader2, X } from "lucide-react";
import { adminApi, type FacultyMember } from "@/lib/api";

interface FacultyFormProps {
  initial?: FacultyMember;
}

export default function FacultyForm({ initial }: FacultyFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    title: initial?.title ?? "",
    degree: initial?.degree ?? "",
    image: initial?.image ?? "",
    expertise: initial?.expertise ?? [] as string[],
    link: initial?.link ?? "",
    isDean: initial?.isDean ?? false,
    order: initial?.order ?? 0,
  });
  const [expertiseInput, setExpertiseInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(field: string, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function addExpertise() {
    const val = expertiseInput.trim();
    if (val && !form.expertise.includes(val)) {
      set("expertise", [...form.expertise, val]);
    }
    setExpertiseInput("");
  }

  function removeExpertise(tag: string) {
    set("expertise", form.expertise.filter((e) => e !== tag));
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    try {
      const { url } = await adminApi.uploadImage(file);
      set("image", url);
    } catch { setError("อัปโหลดรูปไม่สำเร็จ"); }
    finally { setUploading(false); }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = { ...form, link: form.link || null };
      if (initial) {
        await adminApi.updateFaculty(initial.id, payload);
      } else {
        await adminApi.createFaculty(payload);
      }
      router.push("/admin/faculty");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "บันทึกไม่สำเร็จ");
    } finally { setSaving(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            ชื่อ-นามสกุล <span className="text-red-500">*</span>
          </label>
          <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">ตำแหน่ง <span className="text-red-500">*</span></label>
          <input type="text" value={form.title} onChange={(e) => set("title", e.target.value)} required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">วุฒิการศึกษา <span className="text-red-500">*</span></label>
          <input type="text" value={form.degree} onChange={(e) => set("degree", e.target.value)} required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">รูปภาพ</label>
        <div className="flex items-center gap-3">
          <input type="text" value={form.image} onChange={(e) => set("image", e.target.value)}
            placeholder="/images/faculty/name.jpg"
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white" />
          <label className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-3 text-sm transition ${uploading ? "opacity-50" : "border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-white/15 dark:text-blue-300"}`}>
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageUp className="h-4 w-4" />}
            อัปโหลด
            <input type="file" accept="image/*" className="hidden" disabled={uploading}
              onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
          </label>
        </div>
        {form.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.image} alt="preview" className="mt-3 h-20 w-20 rounded-full object-cover border-2 border-yellow-400" />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">ความเชี่ยวชาญ</label>
        <div className="flex gap-2">
          <input type="text" value={expertiseInput} onChange={(e) => setExpertiseInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addExpertise(); } }}
            placeholder="เพิ่มความเชี่ยวชาญ แล้วกด Enter"
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white" />
          <button type="button" onClick={addExpertise}
            className="rounded-xl border border-blue-200 px-4 py-3 text-sm text-blue-700 hover:bg-blue-50 dark:border-white/15 dark:text-blue-300">เพิ่ม</button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {form.expertise.map((tag) => (
            <span key={tag} className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-white/10 dark:text-blue-300">
              {tag}
              <button type="button" onClick={() => removeExpertise(tag)}><X className="h-3 w-3" /></button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">เว็บไซต์ส่วนตัว</label>
        <input type="url" value={form.link} onChange={(e) => set("link", e.target.value)} placeholder="https://"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">ลำดับที่แสดง</label>
          <input type="number" value={form.order} onChange={(e) => set("order", parseInt(e.target.value))}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white" />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.isDean} onChange={(e) => set("isDean", e.target.checked)}
              className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">เป็นคณบดี</span>
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-600 disabled:opacity-60">
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {saving ? "กำลังบันทึก..." : "บันทึก"}
        </button>
        <button type="button" onClick={() => router.back()}
          className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300">ยกเลิก</button>
      </div>
    </form>
  );
}
