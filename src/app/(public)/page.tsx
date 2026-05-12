import HeroSection from '@/sections/HeroSection';
import ServicesSection from '@/sections/ServicesSection';
import ProjectsSection from '@/sections/ProjectsSection';
import WhyUsSection from '@/sections/WhyUsSection';
import ProcessSection from '@/sections/ProcessSection';
import StatsSection from '@/sections/StatsSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import CTASection from '@/sections/CTASection';
import type { Metadata } from 'next';
import {
  cmsHeroRepository,
  cmsServicesRepository,
  cmsPortfolioRepository,
  cmsTestimonialsRepository,
  cmsStatsRepository,
  cmsProcessRepository,
  cmsValuesRepository,
  globalSettingsRepository,
} from '@/server/repositories/cms.repository';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await globalSettingsRepository.getMap();
  return {
    title: settings.seo_title || 'FASE Creative — Premium Digital Agency',
    description: settings.seo_description || 'We build digital experiences for the future.',
    keywords: settings.seo_keywords,
    openGraph: {
      images: settings.og_image ? [settings.og_image] : [],
    },
  };
}

export default async function HomePage() {
  const [
    heroData,
    servicesResult,
    portfolioResult,
    testimonialsResult,
    statsResult,
    processResult,
    valuesResult,
    settings,
  ] = await Promise.all([
    cmsHeroRepository.getActive(),
    cmsServicesRepository.findAll(true),
    cmsPortfolioRepository.findAll(true),
    cmsTestimonialsRepository.findAll(true),
    cmsStatsRepository.findAll(true),
    cmsProcessRepository.findAll(true),
    cmsValuesRepository.findAll(true),
    globalSettingsRepository.getMap(),
  ]);

  const trustedBrands = settings.trusted_brands
    ? settings.trusted_brands.split(',').map(b => b.trim()).filter(Boolean)
    : undefined;

  return (
    <>
      <HeroSection data={heroData} trustedBrands={trustedBrands} />
      <StatsSection stats={statsResult.data || undefined} />
      <ServicesSection services={servicesResult.data || undefined} />
      <ProjectsSection projects={portfolioResult.data || undefined} />
      <WhyUsSection values={valuesResult.data || undefined} />
      <ProcessSection steps={processResult.data || undefined} />
      <TestimonialsSection testimonials={testimonialsResult.data || undefined} />
      <CTASection />
    </>
  );
}
