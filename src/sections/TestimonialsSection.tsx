'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useCounter';
import { testimonials as staticTestimonials } from '@/lib/data';
import type { CmsTestimonial } from '@/types/cms';

interface TestimonialsSectionProps {
  testimonials?: CmsTestimonial[]
}

export default function TestimonialsSection({ testimonials: cmsTestimonials }: TestimonialsSectionProps) {
  const { ref, inView } = useInView();
  const [active, setActive] = useState(0);
  const testimonials = cmsTestimonials && cmsTestimonials.length > 0
    ? cmsTestimonials.map(t => ({ id: t.id, name: t.name, role: t.role || '', company: t.company || '', quote: t.quote, avatar: t.avatar_url || '', rating: t.rating }))
    : staticTestimonials;

  return (
    <section ref={ref} className="py-32 dark:bg-[#080D1A] bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#6366F1]/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full dark:bg-[#6366F1]/10 bg-[#6366F1]/8 mb-4"
          >
            <span className="text-xs text-[#6366F1] font-semibold uppercase tracking-widest">Testimonials</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold dark:text-white text-[#0F172A]"
          >
            What Our <span className="gradient-text">Clients Say</span>
          </motion.h2>
        </div>

        {/* Testimonial Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative p-8 md:p-12 rounded-3xl dark:bg-white/[0.03] bg-white border dark:border-white/[0.08] border-black/[0.06] overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-[#6366F1]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#8B5CF6]/10 rounded-full blur-3xl" />

            {/* Quote Icon */}
            <div className="absolute top-8 right-8 text-6xl text-[#6366F1]/10 font-serif leading-none select-none">&quot;</div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[active].rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#6366F1]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl dark:text-white text-[#0F172A] font-medium leading-relaxed mb-8">
                  &ldquo;{testimonials[active].quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white font-bold">
                    {testimonials[active].name.charAt(0)}
                  </div>
                  <div>
                    <p className="dark:text-white text-[#0F172A] font-semibold">{testimonials[active].name}</p>
                    <p className="dark:text-white/50 text-black/50 text-sm">
                      {testimonials[active].role} · {testimonials[active].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === active
                    ? 'w-8 h-2 bg-[#6366F1]'
                    : 'w-2 h-2 dark:bg-white/20 bg-black/20 hover:dark:bg-white/40 hover:bg-black/40'
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
