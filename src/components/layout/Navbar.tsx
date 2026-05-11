'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollY } from '@/hooks/useScrollY';
import { useTheme } from '@/hooks/useTheme';
import { navItems } from '@/lib/data';
import Image from 'next/image';

export default function Navbar() {
  const scrollY = useScrollY();
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const isScrolled = scrollY > 20;

  useEffect(() => {
    const updateProgress = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const servicesNav = navItems.find(n => n.label === 'Services');

  return (
    <>
      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-transparent">
        <motion.div
          className="h-full bg-gradient-to-r from-[#6366F1] to-[#A78BFA]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'py-3 glass border-b border-white/10 shadow-xl shadow-black/10'
          : 'py-5 bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-12 h-12 rounded-lg bg-[#04045e] flex items-center justify-center overflow-hidden">
              <Image
                src="/logo-fase.png"
                width={72}
                height={72}
                alt="FASE Logo"
                className="rounded-lg object-contain p-1.5"
              />
              <div className="absolute inset-0 rounded-lg bg-[#04045e] blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold tracking-tight dark:text-white text-[#0F172A]">
              FASE Creative
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) =>
              item.label === 'Services' ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button className="flex items-center gap-1 text-sm font-medium dark:text-white/70 text-[#0F172A]/70 hover:text-[#6366F1] dark:hover:text-[#6366F1] transition-colors duration-200">
                    {item.label}
                    <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] glass rounded-2xl p-5 border border-white/10 shadow-2xl shadow-black/20"
                      >
                        <div className="grid grid-cols-2 gap-1">
                          {servicesNav?.children?.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl dark:hover:bg-white/5 hover:bg-black/5 transition-colors group"
                            >
                              <div className="w-6 h-6 rounded-md bg-[#6366F1]/10 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-[#6366F1]" />
                              </div>
                              <span className="text-sm dark:text-white/80 text-[#0F172A]/80 group-hover:text-[#6366F1] transition-colors">
                                {child.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium dark:text-white/70 text-[#0F172A]/70 hover:text-[#6366F1] dark:hover:text-[#6366F1] transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#6366F1] group-hover:w-full transition-all duration-300" />
                </Link>
              )
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-xl dark:bg-white/5 bg-black/5 flex items-center justify-center dark:hover:bg-white/10 hover:bg-black/10 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-[#0F172A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <Link
              href="/contact"
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6366F1] text-white text-sm font-medium hover:bg-[#5254CC] transition-all duration-200 hover:shadow-lg hover:shadow-[#6366F1]/25"
            >
              Start Project
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 rounded-xl dark:bg-white/5 bg-black/5 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
                className="w-5 h-px dark:bg-white bg-[#0F172A] block"
              />
              <motion.span
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                className="w-5 h-px dark:bg-white bg-[#0F172A] block"
              />
              <motion.span
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
                className="w-5 h-px dark:bg-white bg-[#0F172A] block"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 dark:bg-[#0F172A] bg-white flex flex-col pt-24 px-6 pb-10"
          >
            <nav className="flex flex-col gap-1 flex-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-4 border-b dark:border-white/10 border-black/10 dark:text-white text-[#0F172A] text-xl font-medium hover:text-[#6366F1] transition-colors"
                  >
                    {item.label}
                    <svg className="w-4 h-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full py-4 rounded-2xl bg-[#6366F1] text-white text-base font-semibold hover:bg-[#5254CC] transition-colors"
              >
                Start Your Project
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
