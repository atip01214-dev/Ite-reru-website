"use client";

import { useEffect, useState, FormEvent } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { api, adminApi, type PartnerData } from "@/lib/api";
import { ImageUp, Loader2, Pencil, Plus, Save, Trash2, X } from "lucide-react";

export default function AdminPartnersPage() {
  const [items, setItems] = useState<PartnerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<PartnerData | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", image: "", order: 0 });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getPartners().then((d) => { setItems(d); setLoading(false); });
  }, []);

  function startEdit(p: PartnerData) {
    setEditing(p); setAdding(false);
    setForm({ name: p.name, image: p.image, order: p.order });
  }

  function startAdd() {
    setAdding(true); setEditing(null);
    setForm({ name: "", image: "", order: items.length });
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    try { setForm({ ...form, image: (await adminApi.uploadImage(file)).url }); }
    catch { setError("อัปโหลดรูปไม่สำเร็จ"); }
    finally { setUploading(false); }
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault(); setSaving(true); setError("");
    try {
      if (editing) {
        const updated = await adminApi.updatePartner(editing.id, form);
        setItems(items.map((i) => i.id === updated.id ? updated : i));
        setEditing(null);
      } else {
        const created = await adminApi.createPartner(form);
        setItems([...items, created]);
        setAdding(false);
      }
    } catch (err) { setError(err instanceof Error ? err.message : "บันทึกไม่สำเร็จ"); }
    finally { setSaving(false); }
  }

  async function handleDelete(id: number) {
    if (!confirm("ลบพันธมิตรนี้?")) return;
    try { await adminApi.deletePartner(id); setItems(items.filter((i) => i.id !== id)); }
    catch (err) { alert(err instanceof Error ? err.message : "เกิดข้อผิดพลาด"); }
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-900 dark:text-white">พันธมิตร</h1>
          <button onClick={startAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-600">
            <Plus className="h-4 w-4" /> เพิ่ม
          </button>
        </div>

        {error && <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>}

        {(adding || editing) && (
          <form onSubmit={handleSave} className="mb-6 rounded-2xl border border-yellow-200 bg-yellow-50/60 p-5 shadow-sm dark:border-yellow-900/30 dark:bg-yellow-900/10">
            <h2 className="mb-4 font-semibold text-blue-900 dark:text-white">{editing ? "แก้ไข" : "เพิ่มพันธมิตรใหม่"}</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">ชื่อ</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">รูปภาพ (โลโก้)</label>
                <div className="flex items-center gap-2">
                  <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white" />
                  <label className={`flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm ${uploading ? "opacity-50" : "border-blue-200 text-blue-700 hover:bg-blue-50"}`}>
                    {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageUp className="h-4 w-4" />}
                    <input type="file" accept="image/*" className="hidden" disabled={uploading}
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
                  </label>
                </div>
                {form.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.image} alt="preview" className="mt-2 h-14 rounded-lg object-contain border" />
                )}
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button type="submit" disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-60">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {saving ? "กำลังบันทึก..." : "บันทึก"}
              </button>
              <button type="button" onClick={() => { setEditing(null); setAdding(false); }}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                <X className="h-4 w-4" /> ยกเลิก
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="py-20 text-center text-slate-400">กำลังโหลด...</div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((p) => (
              <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
                {p.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt={p.name} className="h-12 w-20 rounded-lg object-contain border border-slate-100" />
                )}
                <p className="flex-1 font-semibold text-blue-900 dark:text-white">{p.name}</p>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(p)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-white/15 dark:text-blue-300">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
