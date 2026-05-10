import type { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Explore our portfolio of premium digital projects — from brand identities to web platforms, mobile apps, and creative campaigns.',
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen dark:bg-[#0F172A] bg-white">
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#6366F1]/8 rounded-full blur-[120px]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full dark:bg-[#6366F1]/10 bg-[#6366F1]/8 mb-6">
            <span className="text-xs text-[#6366F1] font-semibold uppercase tracking-widest">Portfolio</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold dark:text-white text-[#0F172A] leading-tight mb-6">
            Work That <span className="gradient-text">Moves Markets</span>
          </h1>
          <p className="text-xl dark:text-white/60 text-[#0F172A]/60 max-w-2xl leading-relaxed">
            A curated selection of projects where strategy, design, and technology came together to deliver extraordinary outcomes.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pb-32 dark:bg-[#080D1A] bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 pt-16">
          <PortfolioClient />
        </div>
      </section>
    </div>
  );
}
