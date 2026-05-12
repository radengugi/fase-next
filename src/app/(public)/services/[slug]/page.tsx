export const dynamic = 'force-dynamic'

import { services as staticServices } from '@/lib/data';
import { cmsServicesRepository } from '@/server/repositories/cms.repository';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await cmsServicesRepository.findAll(true);
  const service = result.data?.find(s => s.slug === slug);
  if (!service) return { title: 'Service Not Found' };
  return { title: `${service.title} - FASE Services`, description: service.description };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;

  // Try CMS first
  const cmsResult = await cmsServicesRepository.findAll(true);
  let service: { id: string; slug: string; title: string; description: string; icon: string; color: string } | null = null;

  if (cmsResult.data) {
    const found = cmsResult.data.find(s => s.slug === slug);
    if (found) {
      service = {
        id: found.slug,
        slug: found.slug,
        title: found.title,
        description: found.description || '',
        icon: found.icon,
        color: '#B9fA3C',
      };
    }
  }

  // Fallback to static data
  if (!service) {
    const s = staticServices.find(srv => srv.id === slug || srv.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);
    if (s) {
      service = {
        id: s.id,
        slug: s.id,
        title: s.title,
        description: s.description,
        icon: s.icon,
        color: s.color || '#B9fA3C',
      };
    }
  }

  if (!service) notFound();

  // Get all services for "More Services" section
  const allResult = await cmsServicesRepository.findAll(true);
  const allServices = (allResult.data || [])
    .filter(s => s.slug !== slug)
    .map(s => ({
      id: s.slug,
      slug: s.slug,
      title: s.title,
      description: s.description || '',
      icon: s.icon,
      color: s.color || '#B9fA3C',
    }))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#04045E]">
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#B9fA3C]/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 dark:text-white/50 text-black/50 text-sm mb-8 hover:text-[#B9fA3C] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Services
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold dark:text-white text-[#0F172A] mb-6 leading-tight">
            {service.title}
          </h1>
          <p className="text-xl dark:text-white/60 text-black/60 max-w-2xl">
            {service.description}
          </p>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 bg-[#04045E]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold dark:text-white text-[#0F172A] mb-6">What We Offer</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="dark:text-white/70 text-black/70 text-base leading-relaxed mb-4">
              Our {service.title} service is designed to help your business achieve its full potential. We combine strategic thinking with creative execution to deliver results that exceed expectations.
            </p>
            <p className="dark:text-white/70 text-black/70 text-base leading-relaxed mb-4">
              Whether you're looking to launch a new product, rebrand your business, or scale your digital presence, our team of experts is ready to guide you through every step of the journey.
            </p>
          </div>

          {/* Key Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.06] border border-white/[0.12]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${service.color}15` }}>
                  <svg className="w-5 h-5" style={{ color: service.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold dark:text-white text-[#0F172A]">Expert Team</h3>
              </div>
              <p className="dark:text-white/60 text-black/60 text-sm">Senior specialists with years of experience in {service.title.toLowerCase()}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.06] border border-white/[0.12]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${service.color}15` }}>
                  <svg className="w-5 h-5" style={{ color: service.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold dark:text-white text-[#0F172A]">Fast Delivery</h3>
              </div>
              <p className="dark:text-white/60 text-black/60 text-sm">Agile methodology with quick turnarounds without compromising quality</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.06] border border-white/[0.12]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${service.color}15` }}>
                  <svg className="w-5 h-5" style={{ color: service.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold dark:text-white text-[#0F172A]">Scalable Solutions</h3>
              </div>
              <p className="dark:text-white/60 text-black/60 text-sm">Built to grow with your business from startup to enterprise</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.06] border border-white/[0.12]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${service.color}15` }}>
                  <svg className="w-5 h-5" style={{ color: service.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold dark:text-white text-[#0F172A]">24/7 Support</h3>
              </div>
              <p className="dark:text-white/60 text-black/60 text-sm">Dedicated support and maintenance after project completion</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#04045E]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold dark:text-white text-[#0F172A] mb-4">
            Ready to Get Started?
          </h2>
          <p className="dark:text-white/60 text-black/60 text-lg mb-8">
            Let's discuss how we can help you achieve your goals with our {service.title} service.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-[#04045E] font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: service.color }}
          >
            Start a Project
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* More Services */}
      {allServices.length > 0 && (
        <section className="py-16 bg-[#04045E]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold dark:text-white text-[#0F172A] mb-8">More Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {allServices.map(srv => (
                <Link
                  key={srv.slug}
                  href={`/services/${srv.slug}`}
                  className="group flex flex-col p-5 rounded-xl bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.10] hover:border-[#B9fA3C]/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="text-2xl mb-2">{srv.icon}</span>
                  <h3 className="font-semibold dark:text-white text-[#0F172A] text-sm mb-1 group-hover:text-[#B9fA3C] transition-colors">{srv.title}</h3>
                  <p className="dark:text-white/40 text-[#0F172A]/50 text-xs line-clamp-2">{srv.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
