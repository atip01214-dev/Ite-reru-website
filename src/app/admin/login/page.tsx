"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, LockKeyhole, LogIn, User } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push("/admin");
      } else {
        setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-blue-50/60 to-white px-4">
      <div className="bg-grid absolute inset-0 -z-10" />
      <div className="absolute -top-24 left-1/2 -z-10 h-72 w-96 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute right-10 bottom-10 -z-10 h-56 w-56 rounded-full bg-yellow-400/20 blur-3xl" />

      <div className="w-full max-w-md rounded-2xl border border-blue-100 border-t-4 border-t-yellow-400 bg-white/80 p-8 shadow-xl shadow-blue-900/10 backdrop-blur-xl">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/logo-it-reru.jpg"
            alt="ITE RERU"
            width={56}
            height={74}
            className="h-16 w-auto rounded-md"
          />
          <h1 className="mt-4 text-xl font-bold text-blue-900">
            เข้าสู่ระบบผู้ดูแลระบบ ITE RERU
          </h1>
          <p className="mt-1 text-sm text-slate-500">Admin Panel</p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-blue-900">ชื่อผู้ใช้</span>
            <div className="relative">
              <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-blue-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full rounded-xl border border-blue-200 bg-white py-2.5 pr-3 pl-10 text-sm text-blue-950 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="username"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-blue-900">รหัสผ่าน</span>
            <div className="relative">
              <LockKeyhole className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-blue-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-blue-200 bg-white py-2.5 pr-3 pl-10 text-sm text-blue-950 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="••••••••"
              />
            </div>
          </label>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:scale-[1.01] disabled:opacity-60"
          >
            <LogIn className="h-4 w-4" />
            {loading ? "กำลังเข้าสู่ระบบ…" : "เข้าสู่ระบบ"}
          </button>
        </form>

        <Link
          href="/"
          className="mt-6 flex items-center justify-center gap-1.5 text-sm font-medium text-blue-700 transition hover:text-yellow-500"
        >
          <ArrowLeft className="h-4 w-4" />
          กลับหน้าแรก
        </Link>
      </div>
    </main>
  );
}
