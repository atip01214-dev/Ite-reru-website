"use client";

import { useEffect, useState, FormEvent } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { api, adminApi, type ContactData } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function AdminContactPage() {
  const [data, setData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getContact().then((d) => { setData(d); setLoading(false); });
  }, []);

  function set(field: keyof ContactData, value: string) {
    setData((prev) => prev ? { ...prev, [field]: value } : prev);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!data) return;
    setSaving(true); setError("");
    try {
      const updated = await adminApi.updateContact(data);
      setData(updated);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "บันทึกไม่สำเร็จ");
    } finally { setSaving(false); }
  }

  const fields: { label: string; field: keyof ContactData; type?: string }[] = [
    { label: "ชื่อคณะ", field: "faculty" },
    { label: "ที่อยู่", field: "address" },
    { label: "โทรศัพท์", field: "phone", type: "tel" },
    { label: "โทรสาร (Fax)", field: "fax", type: "tel" },
    { label: "อีเมล", field: "email", type: "email" },
    { label: "เว็บไซต์", field: "website", type: "url" },
  ];

  if (loading || !data) return <AdminLayout><div className="py-20 text-center text-slate-400">กำลังโหลด...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-blue-900 dark:text-white">ข้อมูลติดต่อ</h1>
        <form onSubmit={handleSubmit} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm space-y-5 dark:border-white/10 dark:bg-white/5">
          {error && <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>}
          {success && <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">✅ บันทึกสำเร็จ</div>}
          {fields.map(({ label, field, type = "text" }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
              <input type={type} value={data[field] as string} onChange={(e) => set(field, e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white" />
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-600 disabled:opacity-60">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {saving ? "กำลังบันทึก..." : "บันทึก"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
