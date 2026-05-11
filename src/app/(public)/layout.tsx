'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/ui/BackToTop';
import CursorEffect from '@/components/ui/CursorEffect';
import LoadingScreen from '@/components/ui/LoadingScreen';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    // Show loading screen for at least 1.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Show custom cursor only on desktop
    const checkCursor = () => {
      setShowCursor(window.innerWidth > 768 && window.matchMedia('(pointer: fine)').matches);
    };
    checkCursor();
    window.addEventListener('resize', checkCursor);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkCursor);
    };
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      {showCursor && <CursorEffect />}
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
