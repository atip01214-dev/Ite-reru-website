"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Cpu, GraduationCap, Shield, Sparkles, Trophy } from "lucide-react";

const tags = ["AI", "Cybersecurity", "Cloud", "IoT"];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-blue-950 pt-32 pb-20 text-white lg:pt-40 lg:pb-28"
    >
      <div className="absolute inset-y-0 right-0 -z-20 w-[70%] [mask-image:linear-gradient(to_right,transparent,black_20%)]">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          priority
          sizes="70vw"
          className="object-fill opacity-90"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-950/95 via-blue-900/80 to-blue-900/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-blue-950 via-transparent to-blue-950/40" />
      <div className="bg-grid absolute inset-0 -z-10 opacity-40" />
      <div className="absolute right-0 bottom-0 -z-10 h-72 w-72 rounded-full bg-yellow-400/20 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-1.5 text-xs font-semibold text-yellow-300">
            <Sparkles className="h-3.5 w-3.5 text-yellow-400" />
            รับสมัครนักศึกษาใหม่ ปีการศึกษา 2569 · รอบรับตรง 5-6 ถึง 29 พ.ค. 2569
          </span>
          <h1 className="mt-6 text-3xl leading-snug font-bold tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
            สาขาวิชา
            <span className="bg-gradient-to-r from-sky-300 to-yellow-300 bg-clip-text text-transparent">
              วิศวกรรมคอมพิวเตอร์
            </span>
            และเทคโนโลยีสารสนเทศ
          </h1>
          <p className="mt-5 max-w-xl text-base text-blue-100 sm:text-lg">
            Innovate, Cyber Security, Software Engineering &amp; AI for the Future
          </p>
          <p className="mt-2 max-w-xl text-sm text-blue-200/80">
            มหาวิทยาลัยราชภัฏร้อยเอ็ด (RERU)
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-semibold text-yellow-300">
              CWIE เรียนควบคู่ทำงานจริง
            </span>
            <span className="rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-semibold text-yellow-300">
              มีรายได้ระหว่างเรียน
            </span>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#curriculum"
              className="rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition hover:scale-105 hover:bg-white/20"
            >
              ดูหลักสูตรการศึกษา
            </a>
            <a
              href="https://admission.reru.ac.th"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-yellow-400 px-7 py-3 text-sm font-bold text-blue-950 shadow-lg shadow-yellow-400/30 transition hover:scale-105 hover:bg-yellow-300"
            >
              สมัครเรียนปี 2026
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-blue-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-md">
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                <Trophy className="h-6 w-6" />
              </span>
              <div>
                <p className="font-bold text-white">
                  IT RERU Cyber Hackathon 2026
                </p>
                <p className="text-sm text-blue-200">
                  ชิงเงินรางวัลรวมกว่า 100,000 บาท
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="mt-6 ml-8 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 text-blue-950">
                <Cpu className="h-6 w-6" />
              </span>
              <div>
                <p className="font-bold text-white">
                  กิจกรรมนวัตกรรมดิจิทัล
                </p>
                <p className="text-sm text-blue-200">
                  Digital Innovation Showcase
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -top-8 -right-2 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-xl sm:-right-8"
          >
            <Shield className="h-6 w-6 text-sky-300" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute -bottom-6 -left-2 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-xl sm:-left-8"
          >
            <GraduationCap className="h-6 w-6 text-yellow-400" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
