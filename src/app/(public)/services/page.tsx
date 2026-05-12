import type { Metadata } from 'next';
import { cmsServicesRepository } from '@/server/repositories/cms.repository';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Full-spectrum digital services from branding to development. Explore how FASE can elevate your brand and accelerate your growth.',
};

export default async function ServicesPage() {
  const servicesResult = await cmsServicesRepository.findAll(true);
  const services = servicesResult.data || [];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 dark:bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full dark:bg-[#6366F1]/10 bg-[#6366F1]/8 mb-6">
            <span className="text-xs text-[#6366F1] font-semibold uppercase tracking-widest">Our Services</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold dark:text-white text-[#0F172A] mb-6 leading-tight">
            Services That{' '}
            <span className="gradient-text">Drive Results</span>
          </h1>
          <p className="text-xl dark:text-white/60 text-black/60 max-w-2xl">
            From brand strategy to full-scale digital transformation, we partner with ambitious companies to create work that shapes culture and drives growth.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 dark:bg-[#080D1A] bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          {services.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-neutral-400">No services available at the moment.</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold dark:text-white text-[#0F172A] mb-4">
                  What We Do Best
                </h2>
                <p className="dark:text-white/60 text-black/60 max-w-2xl mx-auto">
                  Comprehensive digital services crafted to elevate your brand and accelerate your business growth.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group flex flex-col p-6 rounded-2xl dark:bg-white/[0.03] bg-white border dark:border-white/[0.06] border-black/[0.06] hover:border-[#6366F1]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#6366F1]/10"
                  >
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `radial-gradient(circle at top left, ${(service.color || '#6366F1')}08, transparent 70%)` }}
                    />
                    <div className="relative z-10">
                      <span className="text-3xl mb-4 block">{service.icon}</span>
                      <h3 className="font-semibold dark:text-white text-[#0F172A] text-base mb-2 group-hover:text-[#6366F1] transition-colors duration-200">
                        {service.title}
                      </h3>
                      <p className="dark:text-white/40 text-[#0F172A]/50 text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>
                    </div>
                    <div className="relative z-10 mt-auto">
                      <span className="text-sm text-[#6366F1] font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                        Learn more
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 dark:bg-[#0F172A] bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#6366F1]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#8B5CF6]/8 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-[#0F172A] mb-6">
            Ready to Start Your{' '}
            <span className="gradient-text">Project?</span>
          </h2>
          <p className="text-xl dark:text-white/60 text-black/60 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your goals with our comprehensive digital services.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#6366F1] text-white font-semibold hover:bg-[#6366F1]/80 transition-all duration-300 hover:-translate-y-0.5"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl dark:bg-white/5 bg-black/5 dark:text-white text-[#0F172A] font-semibold dark:border-white/10 border-black/10 hover:dark:bg-white/10 hover:bg-black/10 transition-all duration-300"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
