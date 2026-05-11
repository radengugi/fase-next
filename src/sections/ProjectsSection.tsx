'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useCounter';
import { projects } from '@/lib/data';
import Link from 'next/link';

export default function ProjectsSection() {
  const { ref, inView } = useInView();
  const featured = projects.slice(0, 3);

  return (
    <section ref={ref} className="py-32 dark:bg-[#080D1A] bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full dark:bg-[#6366F1]/10 bg-[#6366F1]/8 mb-4"
            >
              <span className="text-xs text-[#6366F1] font-semibold uppercase tracking-widest">Our Work</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold dark:text-white text-[#0F172A] leading-tight"
            >
              Featured <span className="gradient-text">Projects</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/portfolio"
              className="flex items-center gap-2 text-sm text-[#6366F1] font-semibold hover:gap-3 transition-all duration-200"
            >
              View All Projects
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Large Feature Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:row-span-2"
          >
            <ProjectCard project={featured[0]} large />
          </motion.div>

          {featured.slice(1).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: (i + 1) * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, large = false }: { project: typeof projects[0]; large?: boolean }) {
  return (
    <Link
      href={`/portfolio/${project.id}`}
      className={`group relative block rounded-3xl overflow-hidden dark:bg-[#111827] bg-white border dark:border-white/[0.06] border-black/[0.06] hover:border-[#6366F1]/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#6366F1]/10 ${large ? 'h-full min-h-[500px]' : 'h-[240px]'}`}
    >
      {/* Placeholder Image Area */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/20 via-[#8B5CF6]/10 to-[#0F172A]/80 group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 mesh-gradient opacity-50" />
        {/* Abstract visual for placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-[120px] font-black opacity-5 dark:text-white text-[#0F172A] select-none">
            {project.title.charAt(0)}
          </div>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent">
        <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#6366F1]/20 text-[#A78BFA] border border-[#6366F1]/20">
              {project.category}
            </span>
            <span className="text-xs text-white/40">{project.year}</span>
          </div>
          <h3 className={`font-bold text-white mb-2 leading-tight ${large ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
            {project.title}
          </h3>
          {large && (
            <p className="text-white/60 text-sm mb-4 line-clamp-2">{project.description}</p>
          )}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-md text-xs bg-white/5 text-white/50 border border-white/10">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hover Arrow */}
      <div className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>
    </Link>
  );
}
