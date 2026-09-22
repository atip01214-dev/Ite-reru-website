"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    () =>
      typeof window !== "undefined" &&
      localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label="สลับโหมดสว่าง/มืด"
      suppressHydrationWarning
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300/50 bg-white/60 text-slate-700 backdrop-blur transition hover:scale-105 hover:border-blue-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
