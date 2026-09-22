"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Eye, EyeOff } from "lucide-react";
import { adminApi } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token, username: user } = await adminApi.login(username, password);
      localStorage.setItem("ite_admin_token", token);
      localStorage.setItem("ite_admin_user", user);
      router.push("/admin");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
            <LockKeyhole className="h-8 w-8 text-yellow-400" />
          </span>
          <h1 className="mt-4 text-2xl font-bold text-white">Admin Login</h1>
          <p className="mt-1 text-sm text-blue-200">ITE RERU — ระบบจัดการเนื้อหา</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/15 bg-white/10 p-8 backdrop-blur-xl shadow-xl"
        >
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-1.5">
                ชื่อผู้ใช้
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-blue-300/60 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-1.5">
                รหัสผ่าน
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 pr-11 text-white placeholder-blue-300/60 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-yellow-400 py-3 text-sm font-bold text-blue-950 shadow-lg shadow-yellow-400/20 transition hover:bg-yellow-300 disabled:opacity-60"
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>
      </div>
    </div>
  );
}
