import { blogPosts } from '@/lib/data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };
  return { title: post.title, description: post.excerpt };
}

export async function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen dark:bg-[#0F172A] bg-white">
      {/* Hero */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-50" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 dark:text-white/50 text-black/50 text-sm mb-8 hover:text-[#6366F1] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
          <div className="flex flex-wrap gap-3 items-center mb-6">
            <span className="px-3 py-1 rounded-lg bg-[#6366F1] text-white text-xs font-semibold">{post.category}</span>
            <span className="text-sm dark:text-white/40 text-black/40">{post.date}</span>
            <span className="w-1 h-1 rounded-full dark:bg-white/20 bg-black/20" />
            <span className="text-sm dark:text-white/40 text-black/40">{post.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold dark:text-white text-[#0F172A] leading-tight mb-6">{post.title}</h1>
          <p className="text-xl dark:text-white/60 text-black/60 leading-relaxed">{post.excerpt}</p>
        </div>
      </section>

      {/* Cover Image */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="rounded-2xl overflow-hidden h-72 bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/10 flex items-center justify-center">
            <span className="text-[100px] font-black opacity-5 dark:text-white text-black">{post.category.charAt(0)}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 pb-32">
        <div className="max-w-2xl mx-auto px-6">
          <div className="prose dark:prose-invert prose-lg max-w-none dark:text-white/70 text-black/70">
            <p className="text-xl leading-relaxed font-medium dark:text-white text-[#0F172A]">{post.excerpt}</p>
            <p className="leading-relaxed">
              The digital landscape is evolving at an unprecedented pace. Brands that understand this shift and respond with strategic agility are the ones that will define the next decade. At FASE, we have a front-row seat to this transformation, working with companies across industries as they navigate the complexities of building a meaningful digital presence.
            </p>
            <p className="leading-relaxed">
              What separates top-performing brands from the rest is not simply their budget or their team — it is the depth of their thinking. Strategic clarity, executed with creative precision, consistently outperforms volume-driven approaches.
            </p>
            <h2 className="text-2xl font-bold dark:text-white text-[#0F172A] mt-10 mb-4">The Strategic Imperative</h2>
            <p className="leading-relaxed">
              Every brand decision should be rooted in a clear understanding of your audience, your competitive landscape, and your long-term vision. The brands that invest in this foundational work are the ones that build lasting equity — not just short-term performance spikes.
            </p>
            <p className="leading-relaxed">
              This means investing time in discovery before execution. It means asking difficult questions. It means being willing to challenge assumptions and surface insights that might be uncomfortable but ultimately transformative.
            </p>
            <h2 className="text-2xl font-bold dark:text-white text-[#0F172A] mt-10 mb-4">Looking Forward</h2>
            <p className="leading-relaxed">
              The brands that will define the next decade are already building — quietly, methodically, with a long-term orientation that prioritizes compounding value over immediate gratification. They are investing in their digital infrastructure, their brand story, and their customer relationships.
            </p>
            <p className="leading-relaxed">
              At FASE, we are privileged to partner with these brands and be part of their journey. The work is demanding, but the outcomes — for our clients, their customers, and the industries they serve — are extraordinary.
            </p>
          </div>

          {/* Author */}
          <div className="mt-16 pt-8 border-t dark:border-white/10 border-black/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white font-bold">F</div>
              <div>
                <p className="font-semibold dark:text-white text-[#0F172A]">{post.author}</p>
                <p className="text-sm dark:text-white/40 text-black/50">FASE Digital Agency</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
