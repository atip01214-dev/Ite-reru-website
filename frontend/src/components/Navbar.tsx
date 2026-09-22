"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { LockKeyhole, Menu, X } from "lucide-react";
import type { NavLinkData } from "@/lib/api";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  navLinks: NavLinkData[];
}

export default function Navbar({ navLinks }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-blue-100 bg-white/80 shadow-lg shadow-blue-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-[#0B1E3F]/85"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1 shadow-lg shadow-blue-500/20 ring-1 ring-blue-100">
            <Image
              src="/images/logo-it-reru.jpg"
              alt="ITE RERU"
              width={34}
              height={45}
              className="h-10 w-auto"
            />
            <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full bg-yellow-400" />
          </span>
          <span className="leading-tight">
            <span className={`block text-sm font-bold ${scrolled ? "text-blue-900 dark:text-white" : "text-white"}`}>
              ITE RERU
            </span>
            <span className={`block text-[11px] ${scrolled ? "text-slate-500 dark:text-slate-400" : "text-blue-100/80"}`}>
              Roi Et Rajabhat University
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`text-sm font-medium transition ${scrolled ? "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-300" : "text-blue-50 hover:text-yellow-300"}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/admin/login"
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition hover:scale-105 ${
              scrolled
                ? "border border-blue-200 text-blue-800 dark:border-white/15 dark:text-slate-200"
                : "border border-white/30 bg-white/10 text-white backdrop-blur"
            }`}
          >
            <LockKeyhole className="h-4 w-4" />
            Admin
          </Link>
          <ThemeToggle />
          <a
            href="#contact"
            className="rounded-full bg-yellow-400 px-5 py-2 text-sm font-bold text-blue-950 shadow-lg shadow-yellow-400/30 transition hover:scale-105 hover:bg-yellow-300"
          >
            สมัครเรียน
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label="เมนู"
            className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border ${scrolled ? "border-slate-300/50 text-slate-700 dark:border-white/10 dark:text-slate-200" : "border-white/30 text-white"}`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div className="h-0.5 w-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400" />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-blue-100 bg-white/95 backdrop-blur-xl lg:hidden dark:border-white/10 dark:bg-[#0B1E3F]/95"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full bg-yellow-400 px-5 py-2.5 text-center text-sm font-bold text-blue-950"
              >
                สมัครเรียน
              </a>
              <Link
                href="/admin/login"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-1.5 rounded-full border border-blue-200 px-5 py-2.5 text-sm font-medium text-blue-800 dark:border-white/15 dark:text-slate-200"
              >
                <LockKeyhole className="h-4 w-4" />
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
