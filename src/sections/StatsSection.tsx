'use client';

import { motion } from 'framer-motion';
import { useInView, useCounter } from '@/hooks/useCounter';
import { stats } from '@/lib/data';

export default function StatsSection() {
  const { ref, inView } = useInView(0.3);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden dark:bg-[#0F172A] bg-white">
      {/* BG */}
      <div className="absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6366F1]/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#6366F1]/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#6366F1]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} trigger={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, index, trigger }: { stat: typeof stats[0]; index: number; trigger: boolean }) {
  const numericEnd = parseInt(stat.value, 10);
  const count = useCounter(numericEnd, 2000, trigger);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col items-center text-center"
    >
      <div className="text-4xl md:text-5xl font-bold dark:text-white text-[#0F172A] mb-2">
        {trigger ? count : 0}
        <span className="gradient-text">{stat.suffix}</span>
      </div>
      <p className="dark:text-white/50 text-[#0F172A]/60 text-sm font-medium">{stat.label}</p>
    </motion.div>
  );
}
