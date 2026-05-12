'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useCounter';
import { projects as staticProjects } from '@/lib/data';
import Link from 'next/link';
import type { CmsPortfolio } from '@/types/cms';

interface ProjectsSectionProps {
  projects?: CmsPortfolio[]
}

type ProjectItem = { id: string; title: string; category: string; description: string | null; tags: string[]; image: string | null; year: string | null; client: string | null; image_url?: string | null; updated_at?: string | null }

export default function ProjectsSection({ projects: cmsProjects }: ProjectsSectionProps) {
  const { ref, inView } = useInView();
  const allProjects: ProjectItem[] = cmsProjects && cmsProjects.length > 0
    ? cmsProjects.map(p => ({ id: p.id, title: p.title, category: p.category, description: p.description, tags: p.tags || [], image: p.image_url, year: p.year, client: p.client_name, image_url: p.image_url, updated_at: p.updated_at }))
    : staticProjects.map(p => ({ id: p.id, title: p.title, category: p.category, description: p.description, tags: p.tags, image: p.image || null, year: p.year || null, client: p.client || null, image_url: p.image || null, updated_at: null }));
  const featured = allProjects.slice(0, 3);

  // Helper function to add cache-busting parameter
  const getImageUrl = (project: ProjectItem) => {
    const url = project.image_url || project.image;
    if (!url) return null;
    // Use updated_at timestamp for cache busting (if available from CMS)
    const timestamp = project.updated_at ? new Date(project.updated_at).getTime() : 0;
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}v=${timestamp}`;
  };

  return (
    <section ref={ref} className="py-32 bg-[#04045E]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#B9fA3C] mb-4"
            >
              <span className="text-xs text-[#04045E] font-semibold uppercase tracking-widest">Our Work</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              Featured <span className="gradient-text">Projects</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/portfolio" className="text-sm text-[#B9fA3C] font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-200">
              View All Projects
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((project, i) => {
            const imageUrl = getImageUrl(project);
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link
                  href={`/portfolio/${project.id}`}
                  className="group block rounded-2xl overflow-hidden bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.10] hover:border-[#B9fA3C]/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#B9fA3C]/10"
                >
                  {/* Project Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#B9fA3C]/20 to-[#8B5CF6]/10 flex items-center justify-center">
                        <span className="text-[60px] font-black opacity-5 dark:text-white text-black">{project.title.charAt(0)}</span>
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-center gap-2 text-white text-sm font-medium">
                          <span>View Project</span>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-[#B9fA3C]">{project.category}</span>
                      {project.year && (
                        <>
                          <span className="text-neutral-300">·</span>
                          <span className="text-xs dark:text-white/40 text-black/40">{project.year}</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2 group-hover:text-[#B9fA3C] transition-colors">{project.title}</h3>
                    {project.description && (
                      <p className="text-white text-sm mb-4 line-clamp-2">{project.description}</p>
                    )}
                    {project.client && (
                      <p className="text-xs text-white">Client: {project.client}</p>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
