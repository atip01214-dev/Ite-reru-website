"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { api, adminApi, type NewsItem } from "@/lib/api";
import { CalendarDays, Pencil, Plus, Trash2 } from "lucide-react";

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setNews(await api.getNews());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id: number) {
    if (!confirm("ลบข่าวนี้?")) return;
    setDeleting(id);
    try {
      await adminApi.deleteNews(id);
      setNews((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      setDeleting(null);
    }
  }

  const categoryBadge: Record<string, string> = {
    "ข่าวประชาสัมพันธ์": "bg-blue-100 text-blue-700",
    "กิจกรรมนักศึกษา": "bg-yellow-100 text-amber-700",
    "งานวิจัยและผลงาน": "bg-indigo-100 text-indigo-700",
  };

  return (
    <AdminLayout>
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-900 dark:text-white">ข่าว / กิจกรรม</h1>
            <p className="mt-1 text-sm text-slate-500">{news.length} รายการ</p>
          </div>
          <Link
            href="/admin/news/new"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-600"
          >
            <Plus className="h-4 w-4" />
            เพิ่มข่าวใหม่
          </Link>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-400">กำลังโหลด...</div>
        ) : (
          <div className="space-y-3">
            {news.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                {item.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-24 shrink-0 rounded-lg object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${categoryBadge[item.category] ?? "bg-slate-100 text-slate-600"}`}>
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <CalendarDays className="h-3 w-3" />
                      {item.date}
                    </span>
                  </div>
                  <h3 className="mt-1 font-semibold text-blue-900 dark:text-white line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">{item.excerpt}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Link
                    href={`/admin/news/${item.id}`}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-200 text-blue-700 transition hover:bg-blue-50 dark:border-white/15 dark:text-blue-300 dark:hover:bg-white/5"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deleting === item.id}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-900/50 dark:text-red-400"
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
