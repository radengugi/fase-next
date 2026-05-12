'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useCounter';
import { teamMembers } from '@/lib/data';

export default function AboutTeam() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="py-24 bg-[#04045E]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#B9fA3C] mb-4"
          >
            <span className="text-xs text-[#04045E] font-semibold uppercase tracking-widest">The Team</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Meet the <span className="gradient-text">Minds</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group p-6 rounded-2xl bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.10] hover:border-[#B9fA3C]/30 transition-all duration-300 text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#B9fA3C] to-[#8B5CF6] flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="font-bold text-white text-[#0F172A] mb-1">{member.name}</h3>
              <p className="text-xs text-[#B9fA3C] font-medium mb-3">{member.role}</p>
              <p className="text-white/40 text-black/50 text-xs leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
