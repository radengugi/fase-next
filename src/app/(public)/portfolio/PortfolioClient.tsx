'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { cmsPortfolioApi } from '@/services/api/cms';
import type { CmsPortfolio } from '@/types/cms';

export default function PortfolioClient() {
  const [projects, setProjects] = useState<CmsPortfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      const result = await cmsPortfolioApi.getAll(false);
      if (result.data && !result.error) {
        setProjects(result.data);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  // Extract unique categories from projects
  const projectCategories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-[#B9fA3C] animate-spin" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-neutral-400">No projects found.</p>
      </div>
    );
  }

  // Helper function to add cache-busting parameter using updated_at timestamp
  const getImageUrl = (url: string | null, updatedAt: string | null) => {
    if (!url) return null;
    // Use updated_at timestamp from database for cache busting
    const timestamp = updatedAt ? new Date(updatedAt).getTime() : 0;
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}v=${timestamp}`;
  };

  return (
    <div>
      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-12">
        {projectCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              active === cat
                ? 'bg-[#B9fA3C] text-[#04045E] shadow-lg shadow-[#B9fA3C]/25'
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
          {filtered.map((project) => {
            const imageUrl = getImageUrl(project.image_url, project.updated_at);
            return (
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
                  className="group block rounded-2xl overflow-hidden dark:bg-[#111827] bg-[#F8FAFC] border dark:border-white/[0.06] border-black/[0.06] hover:border-[#B9fA3C]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#B9fA3C]/10"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#B9fA3C]/20 to-[#8B5CF6]/10">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[80px] font-black opacity-5 dark:text-white text-black">{project.title.charAt(0)}</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-[#B9fA3C]">{project.category}</span>
                      <span className="text-xs dark:text-white/30 text-black/40">{project.year}</span>
                    </div>
                    <h3 className="font-bold dark:text-white text-[#0F172A] text-lg mb-2 group-hover:text-[#B9fA3C] transition-colors">{project.title}</h3>
                    <p className="dark:text-white/50 text-black/60 text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags?.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-md text-xs dark:bg-white/5 bg-black/5 dark:text-white/50 text-black/60 border dark:border-white/10 border-black/10">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
