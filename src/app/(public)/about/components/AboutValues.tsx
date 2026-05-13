'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useCounter';
import { values as staticValues } from '@/lib/data';
import type { CmsValue } from '@/types/cms';

interface AboutValuesProps {
  values?: CmsValue[]
}

export default function AboutValues({ values: cmsValues }: AboutValuesProps) {
  const { ref, inView } = useInView();

  const values = cmsValues && cmsValues.length > 0
    ? cmsValues.map(v => ({ title: v.title, description: v.description ?? '' }))
    : staticValues.map(v => ({ title: v.title, description: v.description }));

  return (
    <section ref={ref} className="py-24 bg-[#04045E]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#B9fA3C] mb-4"
          >
            <span className="text-xs text-[#04045E] font-semibold uppercase tracking-widest">Our Values</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            What We <span className="gradient-text">Stand For</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.10] hover:border-[#B9fA3C]/30 transition-all duration-300"
            >
              <h3 className="font-bold text-white text-lg mb-2">{value.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
