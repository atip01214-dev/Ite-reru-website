"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Newspaper } from "lucide-react";
import { news, newsCategories, type NewsCategory } from "@/data/site";
import SectionHeading from "./SectionHeading";

const badgeStyles: Record<NewsCategory, string> = {
  "ข่าวประชาสัมพันธ์": "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  "กิจกรรมนักศึกษา": "bg-yellow-400/20 text-amber-700 dark:text-yellow-400",
  "งานวิจัยและผลงาน": "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300",
};

export default function News() {
  const [filter, setFilter] = useState<(typeof newsCategories)[number]>("ทั้งหมด");
  const filtered = filter === "ทั้งหมด" ? news : news.filter((n) => n.category === filter);

  return (
    <section id="news" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="News &amp; Events" title="กิจกรรมและผลงาน" />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {newsCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                filter === cat
                  ? "bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "border border-blue-200 bg-white/60 text-slate-600 hover:border-blue-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                className="overflow-hidden rounded-2xl border border-blue-100 bg-white/80 shadow-xl shadow-blue-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
              >
                {item.image ? (
                  <div className="relative h-40 w-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-40 items-center justify-center bg-gradient-to-br from-blue-700 to-blue-900 dark:from-blue-900 dark:to-blue-950">
                    <Newspaper className="h-10 w-10 text-yellow-400/80" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[item.category]}`}
                    >
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {item.date}
                    </span>
                  </div>
                  <h3 className="mt-3 font-bold text-blue-900 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.excerpt}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 text-center">
          <a
            href="https://ite.reru.ac.th"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-yellow-500 dark:text-blue-300"
          >
            ดูข่าวทั้งหมดที่ ite.reru.ac.th
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
