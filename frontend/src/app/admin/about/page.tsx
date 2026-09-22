"use client";

import { useEffect, useState, FormEvent } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { api, adminApi, type AboutData, type StatData } from "@/lib/api";
import { Loader2, Plus, Trash2 } from "lucide-react";

export default function AdminAboutPage() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [stats, setStats] = useState<StatData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api.getAbout(), api.getStats()]).then(([a, s]) => {
      setAbout(a); setStats(s); setLoading(false);
    });
  }, []);

  function setAboutField(field: keyof AboutData, value: unknown) {
    setAbout((prev) => prev ? { ...prev, [field]: value } : prev);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!about) return;
    setSaving(true);
    setError("");
    try {
      const [updatedAbout, updatedStats] = await Promise.all([
        adminApi.updateAbout(about),
        adminApi.updateStats(stats.map((s) => ({ value: s.value, suffix: s.suffix, label: s.label, order: s.order }))),
      ]);
      setAbout(updatedAbout);
      setStats(updatedStats);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "บันทึกไม่สำเร็จ");
    } finally { setSaving(false); }
  }

  if (loading || !about) return <AdminLayout><div className="py-20 text-center text-slate-400">กำลังโหลด...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-2xl font-bold text-blue-900 dark:text-white">เกี่ยวกับเรา</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>}
          {success && <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">✅ บันทึกสำเร็จ</div>}

          {/* Stats */}
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold text-blue-900 dark:text-white">สถิติ</h2>
              <button type="button" onClick={() => setStats([...stats, { id: Date.now(), value: 0, suffix: "", label: "", order: stats.length }])}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 dark:bg-white/10 dark:text-blue-300">
                <Plus className="h-3.5 w-3.5" /> เพิ่ม
              </button>
            </div>
            <div className="space-y-3">
              {stats.map((s, i) => (
                <div key={s.id} className="flex items-center gap-3">
                  <input type="number" value={s.value} onChange={(e) => setStats(stats.map((x, j) => j === i ? { ...x, value: parseInt(e.target.value) || 0 } : x))}
                    className="w-24 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white" placeholder="ตัวเลข" />
                  <input type="text" value={s.suffix} onChange={(e) => setStats(stats.map((x, j) => j === i ? { ...x, suffix: e.target.value } : x))}
                    className="w-16 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white" placeholder="suffix" />
                  <input type="text" value={s.label} onChange={(e) => setStats(stats.map((x, j) => j === i ? { ...x, label: e.target.value } : x))}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white" placeholder="ป้ายชื่อ" />
                  <button type="button" onClick={() => setStats(stats.filter((_, j) => j !== i))}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* About fields */}
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm space-y-5 dark:border-white/10 dark:bg-white/5">
            <h2 className="font-bold text-blue-900 dark:text-white">ข้อมูลหลัก</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">วิสัยทัศน์</label>
              <textarea value={about.vision} onChange={(e) => setAboutField("vision", e.target.value)} rows={2}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">ปรัชญา</label>
              <input type="text" value={about.philosophy} onChange={(e) => setAboutField("philosophy", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">รางวัล/Badge</label>
              <input type="text" value={about.awardBadge} onChange={(e) => setAboutField("awardBadge", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white" />
            </div>

            {/* Mission points */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">พันธกิจ</label>
                <button type="button" onClick={() => setAboutField("missionPoints", [...about.missionPoints, ""])}
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"><Plus className="h-3.5 w-3.5" /> เพิ่ม</button>
              </div>
              <div className="space-y-2">
                {about.missionPoints.map((pt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">{i + 1}</span>
                    <input type="text" value={pt} onChange={(e) => setAboutField("missionPoints", about.missionPoints.map((p, j) => j === i ? e.target.value : p))}
                      className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white" />
                    <button type="button" onClick={() => setAboutField("missionPoints", about.missionPoints.filter((_, j) => j !== i))}
                      className="flex h-8 w-8 items-center justify-center rounded-xl border border-red-200 text-red-600 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* ICT Values */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">ค่านิยม ICT</label>
              <div className="space-y-2">
                {about.ictValues.map((v, i) => (
                  <div key={v.letter} className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-400 text-sm font-black text-blue-950">{v.letter}</span>
                    <input type="text" value={v.term} onChange={(e) => setAboutField("ictValues", about.ictValues.map((x, j) => j === i ? { ...x, term: e.target.value } : x))}
                      className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-600 disabled:opacity-60">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {saving ? "กำลังบันทึก..." : "บันทึกทั้งหมด"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
