'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useCounter';
import { services } from '@/lib/data';

export default function ServicesGrid() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="py-24 dark:bg-[#080D1A] bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group flex gap-6 p-8 rounded-2xl dark:bg-white/[0.03] bg-white border dark:border-white/[0.06] border-black/[0.06] hover:border-[#B9fA3C]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#B9fA3C]/10"
            >
              <div
                className="w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center text-2xl"
                style={{ background: `${service.color}15` }}
              >
                {service.icon}
              </div>
              <div>
                <h3 className="font-bold dark:text-white text-[#0F172A] text-lg mb-2 group-hover:text-[#B9fA3C] transition-colors duration-200">{service.title}</h3>
                <p className="dark:text-white/50 text-black/60 text-sm leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
