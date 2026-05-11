'use client';

import { useState } from 'react';
import Link from 'next/link';
import { blogPosts } from '@/lib/data';

const categories = ['All', 'Branding', 'UI/UX Design', 'Web Development', 'Digital Marketing'];

export default function BlogClient() {
  const [active, setActive] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = blogPosts.filter(post => {
    const matchCat = active === 'All' || post.category === active;
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-white/30 text-black/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl dark:bg-white/5 bg-black/5 dark:text-white text-[#0F172A] text-sm placeholder:dark:text-white/30 placeholder:text-black/30 border dark:border-white/10 border-black/10 focus:outline-none focus:border-[#6366F1] transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? 'bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/25'
                  : 'dark:bg-white/5 bg-black/5 dark:text-white/70 text-black/70 hover:dark:bg-white/10 hover:bg-black/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="dark:text-white/40 text-black/40">No articles found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(post => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl overflow-hidden dark:bg-white/[0.03] bg-white border dark:border-white/[0.06] border-black/[0.06] hover:border-[#6366F1]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#6366F1]/10"
            >
              <div className="relative h-48 bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-black opacity-5 dark:text-white text-black">{post.category.charAt(0)}</span>
                </div>
                <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-[#6366F1] text-white text-xs font-semibold">{post.category}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs dark:text-white/40 text-black/40">{post.date}</span>
                  <span className="w-1 h-1 rounded-full dark:bg-white/20 bg-black/20" />
                  <span className="text-xs dark:text-white/40 text-black/40">{post.readTime}</span>
                </div>
                <h3 className="font-bold dark:text-white text-[#0F172A] text-lg mb-2 leading-tight group-hover:text-[#6366F1] transition-colors">{post.title}</h3>
                <p className="dark:text-white/50 text-black/60 text-sm line-clamp-3">{post.excerpt}</p>
                <div className="mt-5 flex items-center gap-2 text-[#6366F1] text-sm font-medium">
                  Read Article
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
