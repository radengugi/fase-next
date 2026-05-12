'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useCounter';
import { services as staticServices } from '@/lib/data';
import Link from 'next/link';
import type { CmsService } from '@/types/cms';

interface ServicesSectionProps {
  services?: CmsService[]
}

export default function ServicesSection({ services: cmsServices }: ServicesSectionProps) {
  const { ref, inView } = useInView();
  const services = cmsServices && cmsServices.length > 0
    ? cmsServices.map(s => ({ id: s.slug, slug: s.slug, icon: s.icon, title: s.title, description: s.description || '', color: s.color || '#B9fA3C' }))
    : staticServices.map(s => ({ id: s.id, slug: s.id, icon: s.icon, title: s.title, description: s.description, color: s.color || '#B9fA3C' }));

  return (
    <section ref={ref} className="py-32 bg-[#04045E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#B9fA3C] mb-4"
          >
            <span className="text-xs text-[#04045E] font-semibold uppercase tracking-widest">What We Do</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
          >
            Services Built for{' '}
            <span className="gradient-text">Impact</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-lg"
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
                href={`/services/${service.slug}`}
                className="group relative flex flex-col p-6 rounded-2xl bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.10] hover:border-[#B9fA3C]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#B9fA3C]/15 h-full"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-2xl" style={{ background: `${service.color}20` }}>
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-2 group-hover:text-[#B9fA3C] transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="relative z-10 mt-4 pt-4 border-t border-white/10">
                  <span className="text-xs text-[#B9fA3C] font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
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
