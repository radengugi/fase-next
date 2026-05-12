'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useCounter';
import { processSteps as staticProcessSteps } from '@/lib/data';
import type { CmsProcessStep } from '@/types/cms';

interface ProcessSectionProps {
  steps?: CmsProcessStep[]
}

export default function ProcessSection({ steps: cmsSteps }: ProcessSectionProps) {
  const { ref, inView } = useInView();
  const processSteps = cmsSteps && cmsSteps.length > 0
    ? cmsSteps.map(s => ({ number: s.number, title: s.title, description: s.description || '' }))
    : staticProcessSteps;

  return (
    <section ref={ref} className="py-32 dark:bg-[#0F172A] bg-white relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full dark:bg-[#B9fA3C]/10 bg-[#B9fA3C]/8 mb-4"
          >
            <span className="text-xs text-[#B9fA3C] font-semibold uppercase tracking-widest">How We Work</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold dark:text-white text-[#0F172A] leading-tight"
          >
            Our <span className="gradient-text">Process</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative p-7 rounded-2xl dark:bg-white/[0.03] bg-[#F8FAFC] border dark:border-white/[0.06] border-black/[0.06] hover:border-[#B9fA3C]/30 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#B9fA3C]/5 rounded-full blur-2xl group-hover:bg-[#B9fA3C]/10 transition-all duration-500" />
              <div className="relative z-10">
                <div className="text-5xl font-black gradient-text mb-5 leading-none opacity-60">
                  {step.number}
                </div>
                <h3 className="font-bold dark:text-white text-[#0F172A] text-lg mb-3">{step.title}</h3>
                <p className="dark:text-white/50 text-[#0F172A]/60 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
