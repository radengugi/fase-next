import HeroSection from '@/sections/HeroSection';
import ServicesSection from '@/sections/ServicesSection';
import ProjectsSection from '@/sections/ProjectsSection';
import WhyUsSection from '@/sections/WhyUsSection';
import ProcessSection from '@/sections/ProcessSection';
import StatsSection from '@/sections/StatsSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import BlogSection from '@/sections/BlogSection';
import CTASection from '@/sections/CTASection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FASE — Premium Digital Agency',
  description: 'We build digital experiences for the future. FASE helps brands grow through technology, creativity, and digital innovation.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <ProjectsSection />
      <WhyUsSection />
      <ProcessSection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
    </>
  );
}
