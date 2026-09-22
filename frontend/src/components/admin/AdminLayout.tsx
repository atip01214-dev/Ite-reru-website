"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  Building2,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Phone,
  Sparkles,
  Users,
  X,
  Handshake,
  Info,
} from "lucide-react";
import { adminApi } from "@/lib/api";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/hero", label: "Hero Banner", icon: Sparkles },
  { href: "/admin/about", label: "เกี่ยวกับเรา", icon: Info },
  { href: "/admin/news", label: "ข่าว/กิจกรรม", icon: FileText },
  { href: "/admin/faculty", label: "บุคลากร", icon: Users },
  { href: "/admin/curriculum", label: "หลักสูตร", icon: BookOpen },
  { href: "/admin/facilities", label: "ห้องปฏิบัติการ", icon: Building2 },
  { href: "/admin/contact", label: "ข้อมูลติดต่อ", icon: Phone },
  { href: "/admin/partners", label: "พันธมิตร", icon: Handshake },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("ite_admin_token");
    const user = localStorage.getItem("ite_admin_user");
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    setUsername(user);
    // Verify token is still valid
    adminApi.me().catch(() => {
      localStorage.removeItem("ite_admin_token");
      localStorage.removeItem("ite_admin_user");
      router.replace("/admin/login");
    });
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem("ite_admin_token");
    localStorage.removeItem("ite_admin_user");
    router.replace("/admin/login");
  }, [router]);

  const isActive = (item: { href: string; exact?: boolean }) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const Sidebar = () => (
    <aside className="flex h-full w-64 flex-col border-r border-blue-100 bg-white dark:border-white/10 dark:bg-[#0B1E3F]">
      <div className="flex items-center gap-3 border-b border-blue-100 px-5 py-4 dark:border-white/10">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-blue-500 text-white font-bold text-sm">
          ITE
        </span>
        <div className="leading-tight">
          <p className="text-sm font-bold text-blue-900 dark:text-white">Admin CMS</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{username ?? "—"}</p>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive(item)
                ? "bg-blue-700 text-white shadow-md shadow-blue-700/20"
                : "text-slate-600 hover:bg-blue-50 dark:text-slate-300 dark:hover:bg-white/5"
            }`}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-blue-100 px-3 py-4 space-y-2 dark:border-white/10">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-blue-50 dark:text-slate-300 dark:hover:bg-white/5"
        >
          <Home className="h-4 w-4" />
          ดูหน้าเว็บไซต์
        </Link>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <LogOut className="h-4 w-4" />
          ออกจากระบบ
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-50">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar (mobile) */}
        <div className="flex h-14 items-center justify-between border-b border-blue-100 bg-white px-4 lg:hidden dark:border-white/10 dark:bg-[#0B1E3F]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg border border-slate-200 p-2 dark:border-white/10"
          >
            <Menu className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </button>
          <span className="text-sm font-bold text-blue-900 dark:text-white">Admin CMS</span>
          <button onClick={logout} className="rounded-lg border border-slate-200 p-2 dark:border-white/10">
            <LogOut className="h-4 w-4 text-red-500" />
          </button>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
