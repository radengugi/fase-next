'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { CmsValue } from '@/types/cms';

const staticAdvantages = [
  {
    icon: '⬡',
    title: 'International Standard',
    description: 'We apply global best practices and world-class methodologies refined from working with companies across 20+ countries.',
  },
  {
    icon: '◈',
    title: 'Fast Delivery',
    description: 'Our agile workflow and experienced team ensure rapid delivery without compromising an ounce of quality.',
  },
  {
    icon: '◎',
    title: 'Scalable Solutions',
    description: 'Everything we build is architected to scale with your growth — from startup to enterprise without friction.',
  },
  {
    icon: '◉',
    title: 'Creative Innovation',
    description: 'We constantly explore emerging technologies and design trends to give our clients a competitive edge.',
  },
  {
    icon: '◐',
    title: 'Dedicated Team',
    description: 'You get a senior, cross-functional team fully committed to your success — not junior generalists.',
  },
  {
    icon: '◑',
    title: 'Enterprise Quality',
    description: 'Our processes, code, and design systems meet enterprise standards for security, performance, and maintainability.',
  },
];

interface WhyUsSectionProps {
  values?: CmsValue[]
}

export default function WhyUsSection({ values: cmsValues }: WhyUsSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  // Use CMS data or fallback to static data
  const advantages = cmsValues && cmsValues.length > 0
    ? cmsValues.map(v => ({
        icon: v.icon,
        title: v.title,
        description: v.description || '',
      }))
    : staticAdvantages;

  return (
    <section ref={ref} className="py-32 dark:bg-[#080D1A] bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6366F1]/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full dark:bg-[#6366F1]/10 bg-[#6366F1]/8 mb-4"
            >
              <span className="text-xs text-[#6366F1] font-semibold uppercase tracking-widest">Why FASE</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold dark:text-white text-[#0F172A] leading-tight mb-6"
            >
              The Agency That{' '}
              <span className="gradient-text">Sets the Standard</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="dark:text-white/60 text-[#0F172A]/60 text-lg leading-relaxed mb-8"
            >
              FASE is not a typical agency. We are a team of strategists, designers, and engineers who obsess over the details that make the difference between good and extraordinary.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 dark:border-[#080D1A] border-[#F8FAFC] bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white text-xs font-bold"
                  >
                    {['A', 'S', 'P', 'L'][i]}
                  </div>
                ))}
              </div>
              <div>
                <p className="dark:text-white text-[#0F172A] text-sm font-semibold">50+ Global Clients</p>
                <p className="dark:text-white/40 text-black/50 text-xs">across 20+ countries</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {advantages.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="group p-5 rounded-2xl dark:bg-white/[0.03] bg-white border dark:border-white/[0.06] border-black/[0.06] hover:border-[#6366F1]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#6366F1]/10"
              >
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <h3 className="font-semibold dark:text-white text-[#0F172A] text-sm mb-1.5">{item.title}</h3>
                <p className="dark:text-white/40 text-[#0F172A]/50 text-xs leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
