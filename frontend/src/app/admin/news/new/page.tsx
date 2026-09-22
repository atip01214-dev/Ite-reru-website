"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import NewsForm from "@/components/admin/NewsForm";

export default function NewNewsPage() {
  return (
    <AdminLayout>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-blue-900 dark:text-white">เพิ่มข่าวใหม่</h1>
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <NewsForm />
        </div>
      </div>
    </AdminLayout>
  );
}
