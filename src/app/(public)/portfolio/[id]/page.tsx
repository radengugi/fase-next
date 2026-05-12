export const dynamic = 'force-dynamic'

import { projects as staticProjects } from '@/lib/data';
import { cmsPortfolioRepository } from '@/server/repositories/cms.repository';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const result = await cmsPortfolioRepository.findById(id);
  if (result.data) return { title: result.data.title, description: result.data.description || '' };
  const project = staticProjects.find(p => p.id === id);
  if (!project) return { title: 'Project Not Found' };
  return { title: project.title, description: project.description };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;

  // Try CMS first
  const cmsResult = await cmsPortfolioRepository.findById(id);
  let project: { id: string; title: string; category: string; description: string; year: string; client: string; tags: string[]; image_url?: string | null; updated_at?: string | null } | null = null;

  if (cmsResult.data) {
    project = {
      id: cmsResult.data.id,
      title: cmsResult.data.title,
      category: cmsResult.data.category,
      description: cmsResult.data.description || '',
      year: cmsResult.data.year || '',
      client: cmsResult.data.client_name || '',
      tags: cmsResult.data.tags || [],
      image_url: cmsResult.data.image_url,
      updated_at: cmsResult.data.updated_at,
    };
  } else {
    const s = staticProjects.find(p => p.id === id);
    if (s) project = { id: s.id, title: s.title, category: s.category, description: s.description, year: s.year || '', client: s.client || '', tags: s.tags, image_url: s.image || null, updated_at: null };
  }

  if (!project) notFound();

  // Get other projects
  const allResult = await cmsPortfolioRepository.findAll(true);
  const others = (allResult.data || []).filter(p => p.id !== id).slice(0, 3);

  // Helper function to add cache-busting parameter
  const getImageUrl = (url: string | null | undefined, updatedAt?: string | null) => {
    if (!url) return null;
    const timestamp = updatedAt ? new Date(updatedAt).getTime() : 0;
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}v=${timestamp}`;
  };

  const projectImageUrl = getImageUrl(project.image_url, project.updated_at);

  return (
    <div className="min-h-screen dark:bg-[#0F172A] bg-white">
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link href="/portfolio" className="inline-flex items-center gap-2 dark:text-white/50 text-black/50 text-sm mb-8 hover:text-[#6366F1] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Portfolio
          </Link>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#6366F1] text-white">{project.category}</span>
            <span className="px-3 py-1 rounded-lg text-xs font-semibold dark:bg-white/10 bg-black/10 dark:text-white text-black">{project.year}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold dark:text-white text-[#0F172A] mb-6 leading-tight">{project.title}</h1>
          <p className="text-xl dark:text-white/60 text-black/60 max-w-2xl">{project.description}</p>
        </div>
      </section>

      {/* Project Image */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          {projectImageUrl ? (
            <div className="rounded-3xl overflow-hidden relative h-[400px] md:h-[600px]">
              <Image
                src={projectImageUrl}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="rounded-3xl overflow-hidden h-[400px] md:h-[600px] bg-gradient-to-br from-[#6366F1]/20 via-[#8B5CF6]/10 to-[#0F172A]/80 flex items-center justify-center">
              <span className="text-[200px] font-black opacity-5 dark:text-white text-[#0F172A]">{project.title.charAt(0)}</span>
            </div>
          )}
        </div>
      </section>

      {/* Details */}
      <section className="py-16 dark:bg-[#080D1A] bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold dark:text-white text-[#0F172A]">About the Project</h2>
              <p className="dark:text-white/60 text-black/60 text-base leading-relaxed">{project.description}</p>
              <p className="dark:text-white/60 text-black/60 text-base leading-relaxed">
                This project represents a landmark collaboration between FASE and {project.client}. Through a deeply collaborative process, we aligned on strategic objectives, user needs, and technical requirements before crafting a solution that exceeded every benchmark.
              </p>
            </div>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl dark:bg-white/[0.03] bg-white border dark:border-white/[0.06] border-black/[0.06]">
                <h3 className="font-semibold dark:text-white text-[#0F172A] mb-4 text-sm uppercase tracking-wide">Project Details</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-xs dark:text-white/40 text-black/40 mb-0.5">Client</dt>
                    <dd className="text-sm dark:text-white text-[#0F172A] font-medium">{project.client}</dd>
                  </div>
                  <div>
                    <dt className="text-xs dark:text-white/40 text-black/40 mb-0.5">Category</dt>
                    <dd className="text-sm dark:text-white text-[#0F172A] font-medium">{project.category}</dd>
                  </div>
                  <div>
                    <dt className="text-xs dark:text-white/40 text-black/40 mb-0.5">Year</dt>
                    <dd className="text-sm dark:text-white text-[#0F172A] font-medium">{project.year}</dd>
                  </div>
                </dl>
              </div>
              <div>
                <p className="text-xs dark:text-white/40 text-black/40 mb-3 uppercase tracking-wide">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-lg text-xs dark:bg-white/5 bg-black/5 dark:text-white/60 text-black/60 border dark:border-white/10 border-black/10">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Projects */}
      {others.length > 0 && (
        <section className="py-16 dark:bg-[#0F172A] bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold dark:text-white text-[#0F172A] mb-8">More Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {others.map(p => {
                const otherImageUrl = getImageUrl(p.image_url, p.updated_at);
                return (
                  <Link key={p.id} href={`/portfolio/${p.id}`} className="group block rounded-2xl overflow-hidden dark:bg-[#080D1A] bg-[#F8FAFC] border dark:border-white/[0.06] border-black/[0.06] hover:border-[#6366F1]/30 transition-all duration-300 hover:-translate-y-0.5">
                    {otherImageUrl ? (
                      <div className="h-36 relative">
                        <Image
                          src={otherImageUrl}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="h-36 bg-gradient-to-br from-[#6366F1]/15 to-[#8B5CF6]/8 flex items-center justify-center">
                        <span className="text-4xl font-black opacity-10 dark:text-white text-black">{p.title.charAt(0)}</span>
                      </div>
                    )}
                    <div className="p-5">
                      <p className="text-xs text-[#6366F1] font-medium mb-1">{p.category}</p>
                      <h3 className="font-bold dark:text-white text-[#0F172A] group-hover:text-[#6366F1] transition-colors">{p.title}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
