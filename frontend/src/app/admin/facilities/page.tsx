"use client";

import { useEffect, useState, FormEvent } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { api, adminApi, type FacilityData } from "@/lib/api";
import { Loader2, Pencil, Plus, Save, Trash2, X } from "lucide-react";

const GRADIENT_OPTIONS = [
  "from-blue-600 to-blue-800",
  "from-indigo-600 to-indigo-800",
  "from-amber-600 to-amber-700",
  "from-amber-500 to-amber-700",
  "from-blue-500 to-indigo-700",
  "from-indigo-600 to-blue-800",
  "from-green-600 to-green-800",
  "from-purple-600 to-purple-800",
];

const ICON_OPTIONS = ["monitor", "network", "shield", "cpu", "users", "video", "server", "database", "wifi", "cloud"];

export default function AdminFacilitiesPage() {
  const [items, setItems] = useState<FacilityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<FacilityData | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", nameEn: "", icon: "monitor", gradient: GRADIENT_OPTIONS[0], order: 0 });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getFacilities().then((d) => { setItems(d); setLoading(false); });
  }, []);

  function startEdit(f: FacilityData) {
    setEditing(f);
    setForm({ name: f.name, nameEn: f.nameEn, icon: f.icon, gradient: f.gradient, order: f.order });
    setAdding(false);
  }

  function startAdd() {
    setAdding(true);
    setEditing(null);
    setForm({ name: "", nameEn: "", icon: "monitor", gradient: GRADIENT_OPTIONS[0], order: items.length });
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true); setError("");
    try {
      if (editing) {
        const updated = await adminApi.updateFacility(editing.id, form);
        setItems(items.map((i) => i.id === updated.id ? updated : i));
        setEditing(null);
      } else {
        const created = await adminApi.createFacility(form);
        setItems([...items, created]);
        setAdding(false);
      }
    } catch (err) { setError(err instanceof Error ? err.message : "บันทึกไม่สำเร็จ"); }
    finally { setSaving(false); }
  }

  async function handleDelete(id: number) {
    if (!confirm("ลบห้องปฏิบัติการนี้?")) return;
    try {
      await adminApi.deleteFacility(id);
      setItems(items.filter((i) => i.id !== id));
    } catch (err) { alert(err instanceof Error ? err.message : "เกิดข้อผิดพลาด"); }
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-900 dark:text-white">ห้องปฏิบัติการ</h1>
          <button onClick={startAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-600">
            <Plus className="h-4 w-4" /> เพิ่ม
          </button>
        </div>

        {error && <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>}

        {(adding || editing) && (
          <form onSubmit={handleSave} className="mb-6 rounded-2xl border border-yellow-200 bg-yellow-50/60 p-5 shadow-sm dark:border-yellow-900/30 dark:bg-yellow-900/10">
            <h2 className="mb-4 font-semibold text-blue-900 dark:text-white">{editing ? "แก้ไข" : "เพิ่มใหม่"}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">ชื่อ (ภาษาไทย)</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">ชื่อ (ภาษาอังกฤษ)</label>
                <input type="text" value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} required
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Icon</label>
                <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white">
                  {ICON_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Gradient</label>
                <select value={form.gradient} onChange={(e) => setForm({ ...form, gradient: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white">
                  {GRADIENT_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
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
          <div className="space-y-3">
            {items.map((f) => (
              <div key={f.id} className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient} text-white text-xs font-bold`}>
                  {f.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-blue-900 dark:text-white">{f.name}</p>
                  <p className="text-xs text-slate-500">{f.nameEn}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(f)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-white/15 dark:text-blue-300">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(f.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-600 hover:bg-red-50">
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
