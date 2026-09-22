"use client";

import { motion } from "framer-motion";
import { Cpu, Monitor, Network, Shield, Users, Video } from "lucide-react";
import { facilities } from "@/data/site";
import SectionHeading from "./SectionHeading";

const icons: Record<string, typeof Monitor> = {
  monitor: Monitor,
  network: Network,
  shield: Shield,
  cpu: Cpu,
  users: Users,
  video: Video,
};

export default function Facilities() {
  return (
    <section id="facilities" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Facilities"
          title="สถานที่และห้องปฏิบัติการ"
          subtitle="สิ่งอำนวยความสะดวกทันสมัย รองรับการเรียนรู้เชิงปฏิบัติทุกรูปแบบ"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((f, i) => {
            const Icon = icons[f.icon];
            return (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -6 }}
                className="overflow-hidden rounded-2xl border border-blue-100 bg-white/80 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
              >
                <div
                  className={`flex h-40 items-center justify-center bg-gradient-to-br ${f.gradient}`}
                >
                  <Icon className="h-14 w-14 text-white/80" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-blue-900 dark:text-white">{f.name}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{f.nameEn}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
