"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl text-center"
    >
      <p className="text-sm font-bold tracking-widest text-yellow-500 uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-bold text-blue-900 sm:text-4xl dark:text-white">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded bg-yellow-400" />
      {subtitle && (
        <p className="mt-4 text-slate-600 dark:text-slate-300">{subtitle}</p>
      )}
    </motion.div>
  );
}
