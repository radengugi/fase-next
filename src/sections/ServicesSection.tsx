'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useCounter';
import { services } from '@/lib/data';
import Link from 'next/link';

export default function ServicesSection() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="py-32 dark:bg-[#0F172A] bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #6366F1 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full dark:bg-[#6366F1]/10 bg-[#6366F1]/8 mb-4"
          >
            <span className="text-xs text-[#6366F1] font-semibold uppercase tracking-widest">What We Do</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold dark:text-white text-[#0F172A] leading-tight mb-4"
          >
            Services Built for{' '}
            <span className="gradient-text">Impact</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="dark:text-white/60 text-[#0F172A]/60 text-lg"
          >
            A full spectrum of digital capabilities, crafted to move markets and build brands that last.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.06 }}
            >
              <Link
                href={`/services#${service.id}`}
                className="group relative flex flex-col p-6 rounded-2xl dark:bg-white/[0.03] bg-[#F8FAFC] border dark:border-white/[0.06] border-black/[0.06] hover:border-[#6366F1]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#6366F1]/10 h-full"
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at top left, ${service.color}08, transparent 70%)` }}
                />
                <div className="relative z-10">
                  <span className="text-3xl mb-4 block">{service.icon}</span>
                  <h3 className="font-semibold dark:text-white text-[#0F172A] text-sm mb-2 group-hover:text-[#6366F1] transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="dark:text-white/40 text-[#0F172A]/50 text-xs leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="relative z-10 mt-4 pt-4 border-t dark:border-white/5 border-black/5">
                  <span className="text-xs text-[#6366F1] font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                    Learn more
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
