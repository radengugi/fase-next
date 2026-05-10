import type { Metadata } from 'next';
import ServicesHero from './components/ServicesHero';
import ServicesGrid from './components/ServicesGrid';
import CTASection from '@/sections/CTASection';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Full-spectrum digital services from branding to development. Explore how FASE can elevate your brand and accelerate your growth.',
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <CTASection />
    </>
  );
}
