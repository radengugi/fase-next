'use client';

import { motion } from 'framer-motion';
import type { CmsAbout } from '@/types/cms';

interface AboutHeroProps {
  data: CmsAbout | null;
}

const defaultAbout: CmsAbout = {
  id: '',
  slug: 'about',
  hero_headline: 'We Are Builders of Digital Futures',
  hero_description: 'FASE was born from a simple belief: that the best digital work happens at the intersection of bold strategy, human-centered design, and engineering excellence.',
  hero_badge: 'About FASE',
  story_badge: 'Our Story',
  story_title: 'Built on Craft, Driven by Purpose',
  story_content: '',
  founded_year: '2019',
  countries: '20+',
  team_members: '40+',
  awards: '18',
  is_active: true,
  sort_order: 0,
  created_at: '',
  updated_at: '',
};

export default function AboutHero({ data }: AboutHeroProps) {
  const about = data ?? defaultAbout;

  return (
    <section className="relative min-h-[70vh] flex items-center pt-24 pb-16 overflow-hidden bg-[#04045E]">
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#B9fA3C]/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#B9fA3C] mb-6"
          >
            <span className="text-xs text-[#04045E] font-semibold uppercase tracking-widest">{about.hero_badge || 'About FASE'}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-[#0F172A] leading-[1.05] tracking-tight mb-8"
          >
            {about.hero_headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/60 text-[#0F172A]/60 leading-relaxed max-w-2xl"
          >
            {about.hero_description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
