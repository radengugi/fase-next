'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useCounter';
import Link from 'next/link';

export default function CTASection() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="py-32 dark:bg-[#080D1A] bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0F172A]" />
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#B9fA3C]/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#8B5CF6]/20 rounded-full blur-[80px]" />
          </div>
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />

          {/* Content */}
          <div className="relative z-10 px-8 py-20 md:px-16 md:py-24 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#B9fA3C] animate-pulse" />
              <span className="text-xs text-white/70 font-medium">Available for new projects</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance"
            >
              Let&rsquo;s Build Something{' '}
              <span className="gradient-text">Extraordinary</span>
              {' '}Together
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-white/60 text-lg max-w-2xl mx-auto mb-10"
            >
              Whether you are launching a new brand, rebuilding a product, or scaling your digital presence — we are the team that makes it exceptional.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/contact"
                className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#B9fA3C] text-[#04045E] text-base font-semibold hover:shadow-2xl hover:shadow-[#B9fA3C]/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                Start Your Project
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/10 text-white text-base font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                Learn About Us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
