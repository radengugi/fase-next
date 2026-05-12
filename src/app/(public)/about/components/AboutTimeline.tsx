'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useCounter';

const timeline = [
  { year: '2019', event: 'FASE Founded', desc: 'Started as a 3-person branding studio with a vision to become a full-service digital powerhouse.' },
  { year: '2020', event: 'First 10 Clients', desc: 'Scaled rapidly, signing our first major tech and finance clients. Expanded to a team of 12.' },
  { year: '2021', event: 'International Expansion', desc: 'Opened remote operations across Southeast Asia, Europe, and the Middle East.' },
  { year: '2022', event: 'Agency of the Year', desc: 'Recognized by multiple industry bodies as a top-performing creative and digital agency.' },
  { year: '2023', event: '50+ Projects Delivered', desc: 'Milestone reached. Expanded service offerings to include digital transformation consulting.' },
  { year: '2024', event: 'Global Scale', desc: 'Now operating across 20+ countries with 40+ team members and an ever-growing client roster.' },
];

export default function AboutTimeline() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="py-24 dark:bg-[#080D1A] bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full dark:bg-[#B9fA3C]/10 bg-[#B9fA3C]/8 mb-4"
          >
            <span className="text-xs text-[#B9fA3C] font-semibold uppercase tracking-widest">Our Journey</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold dark:text-white text-[#0F172A]"
          >
            Six Years of <span className="gradient-text">Growth</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px dark:bg-white/10 bg-black/10" />

          <div className="space-y-10">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative pl-16"
              >
                {/* Dot */}
                <div className="absolute left-[19px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#B9fA3C] ring-4 dark:ring-[#080D1A] ring-[#F8FAFC]" />
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-bold text-[#B9fA3C] uppercase tracking-widest">{item.year}</span>
                  <span className="font-semibold dark:text-white text-[#0F172A] text-sm">{item.event}</span>
                </div>
                <p className="dark:text-white/50 text-black/60 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
