'use client';

import { motion } from 'framer-motion';

export default function AboutHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center pt-24 pb-16 overflow-hidden dark:bg-[#0F172A] bg-white">
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#6366F1]/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full dark:bg-[#6366F1]/10 bg-[#6366F1]/8 mb-6"
          >
            <span className="text-xs text-[#6366F1] font-semibold uppercase tracking-widest">About FASE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold dark:text-white text-[#0F172A] leading-[1.05] tracking-tight mb-8"
          >
            We Are Builders of{' '}
            <span className="gradient-text">Digital Futures</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl dark:text-white/60 text-[#0F172A]/60 leading-relaxed max-w-2xl"
          >
            FASE was born from a simple belief: that the best digital work happens at the intersection of bold strategy, human-centered design, and engineering excellence.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
