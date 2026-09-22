"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Cloud,
  CodeXml,
  Cpu,
  Download,
  GraduationCap,
  Layers,
  Shield,
  Smartphone,
  Brain,
} from "lucide-react";
import { careers, courses, otherPrograms, programs } from "@/data/site";
import SectionHeading from "./SectionHeading";

const courseIcons: Record<string, typeof CodeXml> = {
  code: CodeXml,
  smartphone: Smartphone,
  shield: Shield,
  cloud: Cloud,
  brain: Brain,
  cpu: Cpu,
};

export default function Curriculum() {
  const [toast, setToast] = useState(false);

  const onDownload = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <section id="curriculum" className="bg-blue-50/60 py-20 lg:py-28 dark:bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Curriculum"
          title="หลักสูตรการศึกษา"
          subtitle="หลักสูตรระดับปริญญาตรีที่ออกแบบให้ตรงความต้องการของตลาดแรงงานดิจิทัล"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {programs.map((program, i) => (
            <motion.div
              key={program.degree}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-blue-100 border-t-4 border-t-yellow-400 bg-white/80 p-8 shadow-xl shadow-blue-900/5 backdrop-blur-xl dark:border-white/10 dark:border-t-yellow-400 dark:bg-white/5"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 text-lg font-bold text-white">
                  {program.degree}
                </span>
                <div>
                  <h3 className="font-bold text-blue-900 dark:text-white">{program.name}</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-300">{program.nameEn}</p>
                  {program.badge && (
                    <span className="mt-2 inline-block rounded-full bg-yellow-400 px-3 py-0.5 text-xs font-bold text-blue-950">
                      {program.badge}
                    </span>
                  )}
                </div>
              </div>

              {program.majors ? (
                <div className="mt-5 space-y-3">
                  {program.majors.map((m) => (
                    <div
                      key={m.name}
                      className="rounded-xl border border-blue-100 bg-blue-50/60 p-4 dark:border-white/10 dark:bg-white/5"
                    >
                      <p className="font-semibold text-blue-900 dark:text-white">{m.name}</p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{m.detail}</p>
                      <p className="mt-1 text-sm font-medium text-amber-600 dark:text-yellow-400">
                        {m.focus}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {program.duration && (
                    <div className="mt-5 flex gap-4 text-sm text-slate-600 dark:text-slate-300">
                      <span className="rounded-full bg-blue-50 px-3 py-1 dark:bg-white/10">
                        ระยะเวลา {program.duration}
                      </span>
                    </div>
                  )}
                  <ul className="mt-5 space-y-2.5">
                    {program.highlights?.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-blue-100 bg-white/80 p-6 shadow-xl shadow-blue-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex items-center gap-3">
              <Layers className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h4 className="font-bold text-blue-900 dark:text-white">หลักสูตรอื่นในคณะ</h4>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {otherPrograms.map((p) => (
                <li key={p}>· {p}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-blue-100 bg-white/80 p-6 shadow-xl shadow-blue-900/5 backdrop-blur-xl lg:col-span-2 dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h4 className="font-bold text-blue-900 dark:text-white">อาชีพหลังสำเร็จการศึกษา</h4>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {careers.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:border-white/10 dark:bg-white/5 dark:text-blue-200"
                >
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <h3 className="mt-16 text-center text-2xl font-bold text-blue-900 dark:text-white">
          กลุ่มวิชาเด่น <span className="text-slate-400">/ Featured Courses</span>
        </h3>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {courses.map((course, i) => {
            const Icon = courseIcons[course.icon];
            return (
              <motion.div
                key={course.nameEn}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -5, scale: 1.03 }}
                className="rounded-2xl border border-blue-100 bg-white/80 p-5 text-center shadow-xl shadow-blue-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
              >
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-3 text-sm font-semibold text-blue-900 dark:text-slate-100">
                  {course.name}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {course.nameEn}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onDownload}
            className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-7 py-3 text-sm font-semibold text-blue-700 transition hover:scale-105 dark:text-blue-300"
          >
            <Download className="h-4 w-4" />
            ดาวน์โหลดแผนการเรียน (PDF)
          </button>
          {toast && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 inline-block rounded-full bg-yellow-400/15 px-4 py-1.5 text-sm font-medium text-amber-700 dark:text-yellow-400"
            >
              ไฟล์ตัวอย่าง (mock)
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
