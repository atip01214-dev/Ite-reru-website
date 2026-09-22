"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminLayout from "@/components/admin/AdminLayout";
import { api, adminApi, type FacultyMember } from "@/lib/api";
import { Crown, Pencil, Plus, Trash2 } from "lucide-react";

export default function AdminFacultyPage() {
  const [members, setMembers] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { setMembers(await api.getFaculty()); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id: number) {
    if (!confirm("ลบบุคลากรนี้?")) return;
    setDeleting(id);
    try {
      await adminApi.deleteFaculty(id);
      setMembers((prev) => prev.filter((m) => m.id !== id));
    } catch (err) { alert(err instanceof Error ? err.message : "เกิดข้อผิดพลาด"); }
    finally { setDeleting(null); }
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-900 dark:text-white">บุคลากร</h1>
            <p className="mt-1 text-sm text-slate-500">{members.length} คน</p>
          </div>
          <Link
            href="/admin/faculty/new"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-600"
          >
            <Plus className="h-4 w-4" /> เพิ่มบุคลากร
          </Link>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-400">กำลังโหลด...</div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {members.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-yellow-400/50">
                  <Image src={m.image} alt={m.name} fill sizes="56px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-blue-900 dark:text-white line-clamp-1">{m.name}</p>
                    {m.isDean && <Crown className="h-4 w-4 shrink-0 text-yellow-500" />}
                  </div>
                  <p className="text-xs text-amber-600 dark:text-yellow-400">{m.title}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {m.expertise.slice(0, 2).map((t) => (
                      <span key={t} className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600 dark:bg-white/10 dark:text-blue-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Link
                    href={`/admin/faculty/${m.id}`}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-200 text-blue-700 transition hover:bg-blue-50 dark:border-white/15 dark:text-blue-300"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(m.id)}
                    disabled={deleting === m.id}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
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
