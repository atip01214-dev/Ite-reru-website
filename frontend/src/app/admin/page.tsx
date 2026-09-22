"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import {
  BookOpen,
  Building2,
  FileText,
  Handshake,
  Info,
  Phone,
  Sparkles,
  Users,
} from "lucide-react";

const sections = [
  { href: "/admin/hero", label: "Hero Banner", icon: Sparkles, desc: "แก้ไข badge, title, tags, CTA" },
  { href: "/admin/about", label: "เกี่ยวกับเรา", icon: Info, desc: "วิสัยทัศน์, พันธกิจ, สถิติ" },
  { href: "/admin/news", label: "ข่าว/กิจกรรม", icon: FileText, desc: "เพิ่ม แก้ไข ลบข่าว" },
  { href: "/admin/faculty", label: "บุคลากร", icon: Users, desc: "จัดการอาจารย์และบุคลากร" },
  { href: "/admin/curriculum", label: "หลักสูตร", icon: BookOpen, desc: "โปรแกรม, วิชา, อาชีพ" },
  { href: "/admin/facilities", label: "ห้องปฏิบัติการ", icon: Building2, desc: "ห้องแล็บและสถานที่" },
  { href: "/admin/contact", label: "ข้อมูลติดต่อ", icon: Phone, desc: "ที่อยู่, โทรศัพท์, อีเมล" },
  { href: "/admin/partners", label: "พันธมิตร", icon: Handshake, desc: "หน่วยงานภายนอก" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-yellow-500">ITE RERU</p>
          <h1 className="mt-1 text-3xl font-bold text-blue-900 dark:text-white">Admin Dashboard</h1>
          <div className="mt-2 h-1 w-16 rounded bg-yellow-400" />
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            จัดการเนื้อหาทั้งหมดของเว็บไซต์ ITE RERU
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group rounded-2xl border border-blue-100 border-t-4 border-t-yellow-400 bg-white p-5 shadow-lg shadow-blue-900/5 transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:border-t-yellow-400 dark:bg-white/5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-blue-500 text-white">
                <s.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-3 font-bold text-blue-900 dark:text-white">{s.label}</h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{s.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
