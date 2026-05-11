'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { trustedBrands } from '@/lib/data';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: 'easeOut' },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden dark:bg-[#0F172A] bg-white">
      {/* Animated Background */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#8B5CF6]/8 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6366F1]/5 rounded-full blur-[150px]" />
      </div>

      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[15%] left-[8%] w-20 h-20 rounded-2xl border dark:border-[#6366F1]/20 border-[#6366F1]/15 dark:bg-[#6366F1]/5 bg-[#6366F1]/5 backdrop-blur-sm"
        />
        <motion.div
          animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-[20%] right-[10%] w-14 h-14 rounded-full border dark:border-[#A78BFA]/20 border-[#A78BFA]/15"
        />
        <motion.div
          animate={{ y: [-15, 15, -15], x: [5, -5, 5] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[20%] left-[12%] w-10 h-10 rounded-lg bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/20 blur-sm"
        />
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [45, 55, 45] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-[30%] right-[8%] w-16 h-16 rounded-xl border dark:border-white/5 border-black/5 rotate-45"
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 text-center">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border dark:border-white/10 border-black/10 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-pulse" />
          <span className="text-sm dark:text-white/70 text-[#0F172A]/70 font-medium">
            Award-Winning Digital Agency
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold dark:text-white text-[#0F172A] leading-[1.05] tracking-tight text-balance mb-8"
        >
          Creative Agency for{' '}
          <span className="gradient-text">Modern Brands</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-lg sm:text-xl dark:text-white/60 text-[#0F172A]/60 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          FASE helps brands grow through technology, creativity, and digital innovation.
          We craft experiences that define industries and inspire the world.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Link
            href="/contact"
            className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#6366F1] text-white text-base font-semibold overflow-hidden hover:shadow-2xl hover:shadow-[#6366F1]/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span className="relative z-10">Start Your Project</span>
            <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          <Link
            href="/portfolio"
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl dark:bg-white/5 bg-black/5 dark:text-white text-[#0F172A] text-base font-semibold dark:border-white/10 border-black/10 border hover:dark:bg-white/10 hover:bg-black/10 transition-all duration-300 hover:-translate-y-0.5"
          >
            View Our Works
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>

        {/* Trusted By */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <p className="text-xs dark:text-white/30 text-black/40 uppercase tracking-widest font-medium mb-6">
            Trusted by innovative companies worldwide
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 dark:bg-gradient-to-r dark:from-[#0F172A] from-white to-transparent bg-gradient-to-r" />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 dark:bg-gradient-to-l dark:from-[#0F172A] from-white to-transparent bg-gradient-to-l" />
            <div className="flex animate-marquee whitespace-nowrap">
              {[...trustedBrands, ...trustedBrands].map((brand, i) => (
                <span
                  key={i}
                  className="inline-flex items-center mx-8 text-sm font-semibold dark:text-white/20 text-black/25 tracking-widest uppercase shrink-0"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs dark:text-white/30 text-black/30 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-[#6366F1] to-transparent"
        />
      </motion.div>
    </section>
  );
}
