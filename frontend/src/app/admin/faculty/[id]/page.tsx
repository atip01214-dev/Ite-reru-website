"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import FacultyForm from "@/components/admin/FacultyForm";
import { api, type FacultyMember } from "@/lib/api";

export default function EditFacultyPage() {
  const { id } = useParams<{ id: string }>();
  const [member, setMember] = useState<FacultyMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get all faculty then find by id (getFaculty returns full list)
    api.getFaculty().then((list) => {
      setMember(list.find((m) => m.id === parseInt(id)) ?? null);
      setLoading(false);
    });
  }, [id]);

  return (
    <AdminLayout>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-blue-900 dark:text-white">แก้ไขบุคลากร</h1>
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          {loading ? (
            <div className="py-10 text-center text-slate-400">กำลังโหลด...</div>
          ) : member ? (
            <FacultyForm initial={member} />
          ) : (
            <p className="text-red-500">ไม่พบข้อมูล</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
