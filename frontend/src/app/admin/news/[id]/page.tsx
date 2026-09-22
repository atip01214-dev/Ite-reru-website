"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import NewsForm from "@/components/admin/NewsForm";
import { api, type NewsItem } from "@/lib/api";

export default function EditNewsPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getNewsItem(parseInt(id)).then((data) => {
      setItem(data);
      setLoading(false);
    });
  }, [id]);

  return (
    <AdminLayout>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-blue-900 dark:text-white">แก้ไขข่าว</h1>
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          {loading ? (
            <div className="py-10 text-center text-slate-400">กำลังโหลด...</div>
          ) : item ? (
            <NewsForm initial={item} />
          ) : (
            <p className="text-red-500">ไม่พบข้อมูล</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
