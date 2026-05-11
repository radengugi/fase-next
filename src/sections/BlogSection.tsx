'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useCounter';
import { blogPosts } from '@/lib/data';
import Link from 'next/link';

export default function BlogSection() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="py-32 dark:bg-[#0F172A] bg-white">
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
              <span className="text-xs text-[#6366F1] font-semibold uppercase tracking-widest">Insights</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold dark:text-white text-[#0F172A]"
            >
              Latest <span className="gradient-text">Thinking</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Link href="/blog" className="text-sm text-[#6366F1] font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-200">
              View All Articles
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl overflow-hidden dark:bg-white/[0.03] bg-[#F8FAFC] border dark:border-white/[0.06] border-black/[0.06] hover:border-[#6366F1]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#6366F1]/10"
              >
                {/* Image Area */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-10 dark:text-white text-black font-black">{post.category.charAt(0)}</span>
                  </div>
                  <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-500 bg-gradient-to-br from-[#6366F1]/10 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-[#6366F1] text-white text-xs font-semibold">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs dark:text-white/40 text-black/40">{post.date}</span>
                    <span className="w-1 h-1 rounded-full dark:bg-white/20 bg-black/20" />
                    <span className="text-xs dark:text-white/40 text-black/40">{post.readTime}</span>
                  </div>
                  <h3 className="font-bold dark:text-white text-[#0F172A] text-lg mb-2 leading-tight group-hover:text-[#6366F1] transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="dark:text-white/50 text-black/60 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-[#6366F1] text-sm font-medium">
                    Read Article
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
