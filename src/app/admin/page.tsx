import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BookOpen, LogOut, Newspaper, Users } from "lucide-react";
import { courses, faculty, news, programs } from "@/data/site";

export const dynamic = "force-dynamic";

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET ?? "dev-session";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("ite_admin_session");
  if (!session || session.value !== SESSION_SECRET) {
    redirect("/admin/login");
  }

  const cards = [
    { title: "จัดการข่าว/กิจกรรม", count: news.length, unit: "รายการ", icon: Newspaper },
    { title: "จัดการบุคลากร", count: faculty.length, unit: "คน", icon: Users },
    { title: "จัดการหลักสูตร", count: programs.length + courses.length, unit: "รายการ", icon: BookOpen },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/60 to-white px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold tracking-widest text-yellow-500 uppercase">
              ITE RERU
            </p>
            <h1 className="mt-1 text-3xl font-bold text-blue-900">Admin Dashboard</h1>
            <div className="mt-3 h-1 w-16 rounded bg-yellow-400" />
          </div>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-5 py-2 text-sm font-semibold text-blue-800 shadow-sm transition hover:border-yellow-400 hover:text-blue-950"
            >
              <LogOut className="h-4 w-4" />
              ออกจากระบบ
            </button>
          </form>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-blue-100 border-t-4 border-t-yellow-400 bg-white/80 p-6 shadow-xl shadow-blue-900/5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-blue-500 text-white">
                <card.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-bold text-blue-900">{card.title}</h2>
              <p className="mt-2 text-3xl font-bold text-yellow-500">
                {card.count}
                <span className="ml-1 text-sm font-medium text-slate-500">{card.unit}</span>
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 rounded-xl border border-blue-100 bg-white/80 p-4 text-center text-sm text-slate-500">
          ระบบจัดการเนื้อหา (ตัวอย่าง) — เชื่อมต่อฐานข้อมูลจริงในภายหลัง
        </p>
      </div>
    </main>
  );
}
