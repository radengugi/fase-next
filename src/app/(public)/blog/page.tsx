import type { Metadata } from 'next';
import BlogClient from './BlogClient';
import { blogPosts } from '@/lib/data';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, strategy, and thought leadership from the FASE team on branding, design, technology, and digital growth.',
};

export default function BlogPage() {
  const featured = blogPosts[0];

  return (
    <div className="min-h-screen dark:bg-[#0F172A] bg-white">
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full dark:bg-[#6366F1]/10 bg-[#6366F1]/8 mb-6">
            <span className="text-xs text-[#6366F1] font-semibold uppercase tracking-widest">Blog & Insights</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold dark:text-white text-[#0F172A] leading-tight mb-6">
            Ideas That <span className="gradient-text">Shape Industries</span>
          </h1>
          <p className="text-xl dark:text-white/60 text-[#0F172A]/60 max-w-2xl">Thought leadership, strategy, and insights from the FASE team.</p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden dark:bg-white/[0.03] bg-[#F8FAFC] border dark:border-white/[0.06] border-black/[0.06] hover:border-[#6366F1]/30 transition-all duration-300"
          >
            <div className="relative h-64 lg:h-auto bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/10 flex items-center justify-center overflow-hidden">
              <span className="text-[120px] font-black opacity-5 dark:text-white text-black">{featured.category.charAt(0)}</span>
              <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute top-6 left-6 px-3 py-1 rounded-lg bg-[#6366F1] text-white text-xs font-semibold">Featured</span>
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="text-xs text-[#6366F1] font-semibold uppercase tracking-widest mb-3">{featured.category}</span>
              <h2 className="text-2xl md:text-3xl font-bold dark:text-white text-[#0F172A] mb-4 leading-tight group-hover:text-[#6366F1] transition-colors">{featured.title}</h2>
              <p className="dark:text-white/60 text-black/60 text-base leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm dark:text-white/40 text-black/50">{featured.date}</span>
                  <span className="w-1 h-1 rounded-full dark:bg-white/20 bg-black/20" />
                  <span className="text-sm dark:text-white/40 text-black/50">{featured.readTime}</span>
                </div>
                <span className="text-sm text-[#6366F1] font-medium flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  Read Article
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 dark:bg-[#080D1A] bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <BlogClient />
        </div>
      </section>
    </div>
  );
}
