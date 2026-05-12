'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { trustedBrands as staticTrustedBrands } from '@/lib/data';
import type { CmsHero } from '@/types/cms';

interface HeroSectionProps {
  data?: CmsHero | null
  trustedBrands?: string[]
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: 'easeOut' },
  }),
};

// Default hero data (fallback)
const defaultHero = {
  headline: 'Creative Agency for Modern Brands',
  subheadline: 'FASE helps brands grow through technology, creativity, and digital innovation. We craft experiences that define industries and inspire the world.',
  cta_primary_label: 'Start Your Project',
  cta_primary_href: '/contact',
  cta_secondary_label: 'View Our Works',
  cta_secondary_href: '/portfolio',
};

export default function HeroSection({ data: cmsHero, trustedBrands: cmsBrands }: HeroSectionProps) {
  const trustedBrands = cmsBrands && cmsBrands.length > 0 ? cmsBrands : staticTrustedBrands;

  // Use CMS data or fallback to defaults
  const hero = cmsHero
    ? {
        headline: cmsHero.headline || defaultHero.headline,
        subheadline: cmsHero.subheadline || defaultHero.subheadline,
        cta_primary_label: cmsHero.cta_primary_label || defaultHero.cta_primary_label,
        cta_primary_href: cmsHero.cta_primary_href || defaultHero.cta_primary_href,
        cta_secondary_label: cmsHero.cta_secondary_label || defaultHero.cta_secondary_label,
        cta_secondary_href: cmsHero.cta_secondary_href || defaultHero.cta_secondary_href,
      }
    : defaultHero;

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden dark:bg-[#0F172A] bg-white">
      {/* Animated Background */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#6366F1]/10 rounded-full blur-[80px] sm:blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-[#8B5CF6]/8 rounded-full blur-[60px] sm:blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[800px] h-[300px] sm:h-[800px] bg-[#6366F1]/5 rounded-full blur-[80px] sm:blur-[150px]" />
      </div>

      {/* Floating Shapes — hidden on mobile to avoid overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
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
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20 text-center">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border dark:border-white/10 border-black/10 mb-6 sm:mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#B9fA3C] animate-pulse flex-shrink-0" />
          <span className="text-xs sm:text-sm dark:text-white/70 text-[#0F172A]/70 font-medium">
            Award-Winning Digital Agency
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-[2rem] xs:text-4xl sm:text-5xl lg:text-7xl xl:text-[5.5rem] font-bold dark:text-white text-[#0F172A] leading-[1.1] sm:leading-[1.05] tracking-tight mb-5 sm:mb-8"
        >
          {hero.headline.split(' ').map((word, i) => {
            const lastWordIndex = hero.headline.split(' ').length - 1;
            return i === lastWordIndex ? (
              <span key={i} className="gradient-text">{word}</span>
            ) : (
              <span key={i}>{word} </span>
            );
          })}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-sm sm:text-lg lg:text-xl dark:text-white/60 text-[#0F172A]/60 max-w-xl sm:max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12"
        >
          {hero.subheadline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-14 sm:mb-20 w-full"
        >
          <Link
            href={hero.cta_primary_href}
            className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-2xl bg-[#B9fA3C] text-[#04045E] text-sm sm:text-base font-semibold overflow-hidden hover:shadow-2xl hover:shadow-[#6366F1]/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span className="relative z-10">{hero.cta_primary_label}</span>
            <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          <Link
            href={hero.cta_secondary_href}
            className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-2xl dark:bg-white/5 bg-black/5 dark:text-white text-[#0F172A] text-sm sm:text-base font-semibold dark:border-white/10 border-black/10 border hover:dark:bg-white/10 hover:bg-black/10 transition-all duration-300 hover:-translate-y-0.5"
          >
            {hero.cta_secondary_label}
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
          <p className="text-xs dark:text-white/30 text-black/40 uppercase tracking-widest font-medium mb-4 sm:mb-6">
            Trusted by innovative companies worldwide
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 z-10 dark:bg-gradient-to-r dark:from-[#0F172A] from-white to-transparent bg-gradient-to-r" />
            <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 z-10 dark:bg-gradient-to-l dark:from-[#0F172A] from-white to-transparent bg-gradient-to-l" />
            <div className="flex animate-marquee whitespace-nowrap">
              {[...trustedBrands, ...trustedBrands].map((brand, i) => (
                <span
                  key={i}
                  className="inline-flex items-center mx-5 sm:mx-8 text-xs sm:text-sm font-semibold dark:text-white/20 text-black/25 tracking-widest uppercase shrink-0"
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
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
