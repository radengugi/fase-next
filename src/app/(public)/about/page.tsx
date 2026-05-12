import type { Metadata } from 'next';
import AboutHero from './components/AboutHero';
import AboutStory from './components/AboutStory';
import AboutValues from './components/AboutValues';
import AboutTeam from './components/AboutTeam';
import AboutTimeline from './components/AboutTimeline';
import CTASection from '@/sections/CTASection';
import { cmsAboutRepository } from '@/server/repositories/cms.repository';

export const metadata: Metadata = {
  title: 'About FASE Creative',
  description: 'Learn about FASE Creative — a premium digital agency driven by creativity, strategy, and technology. Our story, mission, values, and the team behind the work.',
};

export default async function AboutPage() {
  const aboutResult = await cmsAboutRepository.findAll(false)
  const aboutData = aboutResult.data?.[0] ?? null

  return (
    <>
      <AboutHero data={aboutData} />
      <AboutStory data={aboutData} />
      <AboutValues />
      <AboutTimeline />
      <AboutTeam />
      <CTASection />
    </>
  );
}
