"use client";

import { useEffect, useState, FormEvent } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { api, adminApi, type ProgramData, type CourseData, type CareerData, type OtherProgramData } from "@/lib/api";
import { Loader2, Pencil, Plus, Save, Trash2, X } from "lucide-react";

export default function AdminCurriculumPage() {
  const [programs, setPrograms] = useState<ProgramData[]>([]);
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [careers, setCareers] = useState<CareerData[]>([]);
  const [otherPrograms, setOtherPrograms] = useState<OtherProgramData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Course inline editor
  const [editingCourse, setEditingCourse] = useState<CourseData | null>(null);
  const [courseForm, setCourseForm] = useState({ name: "", nameEn: "", icon: "code" });
  const [addingCourse, setAddingCourse] = useState(false);

  useEffect(() => {
    Promise.all([
      api.getPrograms(),
      api.getCourses(),
      api.getCareers(),
      api.getOtherPrograms(),
    ]).then(([p, c, car, op]) => {
      setPrograms(p); setCourses(c); setCareers(car); setOtherPrograms(op);
      setLoading(false);
    });
  }, []);

  // ── Careers bulk save ───────────────────────────────────────────────────────
  async function saveAllCareers(e: FormEvent) {
    e.preventDefault(); setSaving(true); setError(""); setSuccess("");
    try {
      const updated = await adminApi.updateCareers(careers.map((c) => ({ name: c.name })));
      setCareers(updated); setSuccess("บันทึกอาชีพสำเร็จ");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) { setError(err instanceof Error ? err.message : "บันทึกไม่สำเร็จ"); }
    finally { setSaving(false); }
  }

  // ── Other programs bulk save ────────────────────────────────────────────────
  async function saveOtherPrograms(e: FormEvent) {
    e.preventDefault(); setSaving(true); setError(""); setSuccess("");
    try {
      const updated = await adminApi.updateOtherPrograms(otherPrograms.map((p) => ({ name: p.name })));
      setOtherPrograms(updated); setSuccess("บันทึกหลักสูตรอื่นสำเร็จ");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) { setError(err instanceof Error ? err.message : "บันทึกไม่สำเร็จ"); }
    finally { setSaving(false); }
  }

  // ── Course CRUD ─────────────────────────────────────────────────────────────
  function startEditCourse(c: CourseData) {
    setEditingCourse(c); setAddingCourse(false);
    setCourseForm({ name: c.name, nameEn: c.nameEn, icon: c.icon });
  }

  async function saveCourse(e: FormEvent) {
    e.preventDefault(); setSaving(true); setError("");
    try {
      if (editingCourse) {
        const updated = await adminApi.updateCourse(editingCourse.id, courseForm);
        setCourses(courses.map((c) => c.id === updated.id ? updated : c));
        setEditingCourse(null);
      } else {
        const created = await adminApi.createCourse({ ...courseForm, order: courses.length });
        setCourses([...courses, created]);
        setAddingCourse(false);
      }
    } catch (err) { setError(err instanceof Error ? err.message : "บันทึกไม่สำเร็จ"); }
    finally { setSaving(false); }
  }

  async function deleteCourse(id: number) {
    if (!confirm("ลบวิชานี้?")) return;
    try { await adminApi.deleteCourse(id); setCourses(courses.filter((c) => c.id !== id)); }
    catch (err) { alert(err instanceof Error ? err.message : "เกิดข้อผิดพลาด"); }
  }

  if (loading) return <AdminLayout><div className="py-20 text-center text-slate-400">กำลังโหลด...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-2xl font-bold text-blue-900 dark:text-white">หลักสูตรการศึกษา</h1>

        {error && <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>}
        {success && <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">✅ {success}</div>}

        {/* Programs (read only for now — show summary) */}
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="mb-4 font-bold text-blue-900 dark:text-white">โปรแกรม ({programs.length})</h2>
          <div className="space-y-3">
            {programs.map((p) => (
              <div key={p.id} className="rounded-xl border border-slate-200 p-4 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-blue-500 text-xs font-bold text-white">{p.degree}</span>
                  <div>
                    <p className="font-semibold text-blue-900 dark:text-white">{p.name}</p>
                    <p className="text-xs text-slate-500">{p.nameEn}</p>
                  </div>
                </div>
                {p.majors && p.majors.length > 0 && (
                  <ul className="mt-3 space-y-1 pl-14">
                    {p.majors.map((m) => (
                      <li key={m.id} className="text-xs text-slate-600 dark:text-slate-400">· {m.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400">ติดต่อผู้ดูแลระบบสำหรับการเพิ่ม/ลบโปรแกรม</p>
        </div>

        {/* Featured Courses */}
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-blue-900 dark:text-white">กลุ่มวิชาเด่น</h2>
            <button onClick={() => { setAddingCourse(true); setEditingCourse(null); setCourseForm({ name: "", nameEn: "", icon: "code" }); }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100">
              <Plus className="h-3.5 w-3.5" /> เพิ่ม
            </button>
          </div>

          {(addingCourse || editingCourse) && (
            <form onSubmit={saveCourse} className="mb-4 grid gap-3 rounded-xl border border-yellow-200 bg-yellow-50/60 p-4 sm:grid-cols-3 dark:border-yellow-900/30 dark:bg-yellow-900/10">
              <input type="text" value={courseForm.name} onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })} required placeholder="ชื่อวิชา (ไทย)"
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white" />
              <input type="text" value={courseForm.nameEn} onChange={(e) => setCourseForm({ ...courseForm, nameEn: e.target.value })} required placeholder="Course Name (EN)"
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white" />
              <input type="text" value={courseForm.icon} onChange={(e) => setCourseForm({ ...courseForm, icon: e.target.value })} required placeholder="icon (e.g. code)"
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white" />
              <div className="flex gap-2 sm:col-span-3">
                <button type="submit" disabled={saving} className="inline-flex items-center gap-1.5 rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-60">
                  {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />} บันทึก
                </button>
                <button type="button" onClick={() => { setEditingCourse(null); setAddingCourse(false); }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                  <X className="h-3.5 w-3.5" /> ยกเลิก
                </button>
              </div>
            </form>
          )}

          <div className="space-y-2">
            {courses.map((c) => (
              <div key={c.id} className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 dark:border-white/10">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-600 dark:bg-white/10 dark:text-blue-300">{c.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900 dark:text-white">{c.name}</p>
                  <p className="text-xs text-slate-500">{c.nameEn}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEditCourse(c)} className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-white/15 dark:text-blue-300">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => deleteCourse(c.id)} className="flex h-8 w-8 items-center justify-center rounded-xl border border-red-200 text-red-600 hover:bg-red-50">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other programs */}
        <form onSubmit={saveOtherPrograms} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-blue-900 dark:text-white">หลักสูตรอื่นในคณะ</h2>
            <button type="button" onClick={() => setOtherPrograms([...otherPrograms, { id: Date.now(), name: "", order: otherPrograms.length }])}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100">
              <Plus className="h-3.5 w-3.5" /> เพิ่ม
            </button>
          </div>
          <div className="space-y-2">
            {otherPrograms.map((p, i) => (
              <div key={p.id} className="flex items-center gap-2">
                <input type="text" value={p.name} onChange={(e) => setOtherPrograms(otherPrograms.map((x, j) => j === i ? { ...x, name: e.target.value } : x))}
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white" />
                <button type="button" onClick={() => setOtherPrograms(otherPrograms.filter((_, j) => j !== i))}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
          <button type="submit" disabled={saving} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-60">
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null} บันทึก
          </button>
        </form>

        {/* Careers */}
        <form onSubmit={saveAllCareers} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-blue-900 dark:text-white">อาชีพหลังสำเร็จการศึกษา</h2>
            <button type="button" onClick={() => setCareers([...careers, { id: Date.now(), name: "", order: careers.length }])}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100">
              <Plus className="h-3.5 w-3.5" /> เพิ่ม
            </button>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {careers.map((c, i) => (
              <div key={c.id} className="flex items-center gap-2">
                <input type="text" value={c.name} onChange={(e) => setCareers(careers.map((x, j) => j === i ? { ...x, name: e.target.value } : x))}
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white" />
                <button type="button" onClick={() => setCareers(careers.filter((_, j) => j !== i))}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
          <button type="submit" disabled={saving} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-60">
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null} บันทึก
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
