'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useCounter';

export default function AboutStory() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="py-24 dark:bg-[#080D1A] bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full dark:bg-[#6366F1]/10 bg-[#6366F1]/8 mb-6">
              <span className="text-xs text-[#6366F1] font-semibold uppercase tracking-widest">Our Story</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-[#0F172A] leading-tight mb-6">
              Built on Craft,<br />
              Driven by <span className="gradient-text">Purpose</span>
            </h2>
            <div className="space-y-5 dark:text-white/60 text-[#0F172A]/60 text-base leading-relaxed">
              <p>
                FASE was founded with a clear mission: to close the gap between business ambition and digital reality. We saw too many brands struggling with agencies that prioritized volume over craft — and we knew there was a better way.
              </p>
              <p>
                Today, FASE is a team of senior strategists, designers, and engineers united by a shared obsession with quality. We work with ambitious companies across 20+ countries, helping them build products and brands that define their industries.
              </p>
              <p>
                Every project we take on is treated as a partnership. We immerse ourselves in your business, your users, and your market — then bring the full weight of our expertise to bear on creating something extraordinary.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: 'Founded', value: '2019' },
              { label: 'Countries', value: '20+' },
              { label: 'Team Members', value: '40+' },
              { label: 'Awards', value: '18' },
            ].map(item => (
              <div key={item.label} className="p-6 rounded-2xl dark:bg-white/[0.03] bg-white border dark:border-white/[0.06] border-black/[0.06]">
                <div className="text-3xl font-bold gradient-text mb-1">{item.value}</div>
                <div className="text-sm dark:text-white/50 text-black/60">{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
