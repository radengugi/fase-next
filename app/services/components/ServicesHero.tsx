'use client';

import { motion } from 'framer-motion';

export default function ServicesHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center pt-24 pb-16 overflow-hidden dark:bg-[#0F172A] bg-white">
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#6366F1]/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full dark:bg-[#6366F1]/10 bg-[#6366F1]/8 mb-6"
          >
            <span className="text-xs text-[#6366F1] font-semibold uppercase tracking-widest">Services</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold dark:text-white text-[#0F172A] leading-tight mb-6"
          >
            Everything You Need to <span className="gradient-text">Dominate Digitally</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl dark:text-white/60 text-[#0F172A]/60 leading-relaxed"
          >
            A comprehensive suite of digital capabilities, each delivered with senior expertise and a relentless focus on results.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
