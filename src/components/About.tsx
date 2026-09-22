"use client";

import { motion } from "framer-motion";
import { Award, CircleCheck, Eye, Quote, Target } from "lucide-react";
import { ictValues, missionPoints, philosophy, stats, vision } from "@/data/site";
import CountUp from "./CountUp";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About Us"
          title="เกี่ยวกับเรา"
          subtitle="คณะเทคโนโลยีสารสนเทศ มุ่งผลิตบุคลากรดิจิทัลคุณภาพ พร้อมขับเคลื่อนนวัตกรรมเพื่ออนาคต"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 rounded-3xl bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-10 sm:px-10"
        >
          <div className="mb-8 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-1.5 text-sm font-bold text-blue-950">
              <Award className="h-4 w-4" />
              Top 10 สถาบันราชภัฏด้านไอที (TER 2020)
            </span>
          </div>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center"
              >
                <p className="text-3xl font-bold text-yellow-400 sm:text-4xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm text-blue-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-blue-100 bg-white/80 p-8 shadow-xl shadow-blue-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-blue-500 text-white">
                <Eye className="h-5 w-5" />
              </span>
              <h3 className="text-xl font-bold text-blue-900 dark:text-white">วิสัยทัศน์</h3>
            </div>
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
              {vision}
            </p>
            <div className="mt-6 rounded-xl border-l-4 border-yellow-400 bg-blue-50/80 p-4 dark:bg-white/5">
              <p className="flex items-start gap-2 text-sm font-medium text-blue-900 dark:text-blue-100">
                <Quote className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
                ปรัชญา: {philosophy}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-blue-100 bg-white/80 p-8 shadow-xl shadow-blue-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 text-blue-950">
                <Target className="h-5 w-5" />
              </span>
              <h3 className="text-xl font-bold text-blue-900 dark:text-white">พันธกิจ</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {missionPoints.map((point, i) => (
                <li key={point} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                  <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                  <span className="text-sm leading-relaxed">
                    <span className="font-semibold text-blue-800 dark:text-blue-200">{i + 1}.</span>{" "}
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {ictValues.map((v, i) => (
            <motion.div
              key={v.letter}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-4 rounded-2xl border border-blue-100 border-t-4 border-t-yellow-400 bg-white/80 p-5 shadow-xl shadow-blue-900/5 backdrop-blur-xl dark:border-white/10 dark:border-t-yellow-400 dark:bg-white/5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-xl font-black text-blue-950">
                {v.letter}
              </span>
              <div>
                <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
                  ค่านิยม ICT
                </p>
                <p className="font-bold text-blue-900 dark:text-white">{v.term}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
