'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { projects } from '@/lib/data';

const categories = ['All', 'Web Development', 'Branding', 'Mobile Development', 'UI/UX Design', 'Creative Campaign'];

export default function PortfolioClient() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <div>
      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              active === cat
                ? 'bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/25'
                : 'dark:bg-white/5 bg-black/5 dark:text-white/70 text-black/70 hover:dark:bg-white/10 hover:bg-black/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={`/portfolio/${project.id}`}
                className="group block rounded-2xl overflow-hidden dark:bg-[#111827] bg-[#F8FAFC] border dark:border-white/[0.06] border-black/[0.06] hover:border-[#6366F1]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#6366F1]/10"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[80px] font-black opacity-5 dark:text-white text-black">{project.title.charAt(0)}</span>
                  </div>
                  <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-[#6366F1]">{project.category}</span>
                    <span className="text-xs dark:text-white/30 text-black/40">{project.year}</span>
                  </div>
                  <h3 className="font-bold dark:text-white text-[#0F172A] text-lg mb-2 group-hover:text-[#6366F1] transition-colors">{project.title}</h3>
                  <p className="dark:text-white/50 text-black/60 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-md text-xs dark:bg-white/5 bg-black/5 dark:text-white/50 text-black/60 border dark:border-white/10 border-black/10">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
