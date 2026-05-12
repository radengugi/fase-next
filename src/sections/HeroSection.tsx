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
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#04045E]">
      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20 text-center">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-white/10 mb-6 sm:mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#B9fA3C] animate-pulse flex-shrink-0" />
          <span className="text-xs sm:text-sm text-white/70 font-medium">
            Award-Winning Digital Agency
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-[2rem] xs:text-4xl sm:text-5xl lg:text-7xl xl:text-[5.5rem] font-bold text-white leading-[1.1] sm:leading-[1.05] tracking-tight mb-5 sm:mb-8"
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
          className="text-sm sm:text-lg lg:text-xl text-white/60 max-w-xl sm:max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12"
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
            className="relative flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-2xl bg-[#B9fA3C] text-[#04045E] text-sm sm:text-base font-semibold overflow-hidden hover:shadow-2xl hover:shadow-[#6366F1]/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span className="relative z-10">{hero.cta_primary_label}</span>
            <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          <Link
            href={hero.cta_secondary_href}
            className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-2xl bg-white/10 text-white text-sm sm:text-base font-semibold border border-white/10 hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
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
          <p className="text-xs text-white/30 uppercase tracking-widest font-medium mb-4 sm:mb-6">
            Trusted by innovative companies worldwide
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 z-10 bg-gradient-to-r from-[#04045E] to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 z-10 bg-gradient-to-l from-[#04045E] to-transparent" />
            <div className="flex animate-marquee whitespace-nowrap">
              {[...trustedBrands, ...trustedBrands].map((brand, i) => (
                <span
                  key={i}
                  className="inline-flex items-center mx-5 sm:mx-8 text-xs sm:text-sm font-semibold text-white/20 tracking-widest uppercase shrink-0"
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
        <span className="text-xs text-white/30 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-[#6366F1] to-transparent"
        />
      </motion.div>
    </section>
  );
}
