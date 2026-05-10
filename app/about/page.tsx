import type { Metadata } from 'next';
import AboutHero from './components/AboutHero';
import AboutStory from './components/AboutStory';
import AboutValues from './components/AboutValues';
import AboutTeam from './components/AboutTeam';
import AboutTimeline from './components/AboutTimeline';
import CTASection from '@/sections/CTASection';

export const metadata: Metadata = {
  title: 'About FASE',
  description: 'Learn about FASE — a premium digital agency driven by creativity, strategy, and technology. Our story, mission, values, and the team behind the work.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutTimeline />
      <AboutTeam />
      <CTASection />
    </>
  );
}
