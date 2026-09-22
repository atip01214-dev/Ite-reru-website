"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link2, Mail } from "lucide-react";
import type { FacultyMember } from "@/lib/api";
import SectionHeading from "./SectionHeading";

interface FacultyProps {
  members: FacultyMember[];
  dean: FacultyMember | null;
}

export default function Faculty({ members, dean }: FacultyProps) {
  // Exclude dean from main grid (dean has its own card)
  const regularMembers = members.filter((m) => !m.isDean);

  return (
    <section id="faculty" className="bg-blue-50/60 py-20 lg:py-28 dark:bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Faculty"
          title="บุคลากรของเรา"
          subtitle="อาจารย์ผู้เชี่ยวชาญในหลากหลายสาขาพร้อมถ่ายทอดประสบการณ์จริง"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regularMembers.map((member, i) => {
            const card = (
              <>
                <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-yellow-400/60 shadow-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 font-bold text-blue-900 dark:text-white">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-amber-600 dark:text-yellow-400">
                  {member.title}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{member.degree}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {member.expertise.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-blue-300/50 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {member.link && (
                  <span className="mt-3 inline-flex items-center gap-1 text-xs text-blue-500 dark:text-blue-300">
                    <Link2 className="h-3 w-3" /> เว็บไซต์ส่วนตัว
                  </span>
                )}
              </>
            );
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -8 }}
                className="rounded-2xl border border-blue-100 border-t-4 border-t-yellow-400 bg-white/80 p-7 text-center shadow-xl shadow-blue-900/5 backdrop-blur-xl dark:border-white/10 dark:border-t-yellow-400 dark:bg-white/5"
              >
                {member.link ? (
                  <a href={member.link} target="_blank" rel="noopener noreferrer" className="block">
                    {card}
                  </a>
                ) : (
                  card
                )}
              </motion.div>
            );
          })}

          {dean && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-blue-900 to-blue-800 p-7 text-center shadow-xl"
            >
              <p className="text-xs font-bold tracking-widest text-yellow-400 uppercase">
                สายตรงคณบดี
              </p>
              <div className="relative mt-4 h-20 w-20 overflow-hidden rounded-full border-4 border-yellow-400 shadow-lg">
                <Image
                  src={dean.image}
                  alt={dean.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 font-bold text-white">{dean.name}</p>
              <p className="mt-1 text-sm text-blue-200">{dean.title}</p>
              <a
                href={`mailto:${dean.link ?? "ite@reru.ac.th"}`}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2 text-sm font-bold text-blue-950 transition hover:scale-105 hover:bg-yellow-300"
              >
                <Mail className="h-4 w-4" />
                ส่งข้อความถึงคณบดี
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
