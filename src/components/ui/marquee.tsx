'use client';

import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  speed = 25,
  direction = 'left',
  className = '',
  pauseOnHover = false,
}: MarqueeProps) {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const content = container.firstElementChild as HTMLElement;
    if (!content) return;

    const width = content.offsetWidth;
    const distance = direction === 'left' ? -width : width;

    controls.start({
      x: [0, distance],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: speed,
          ease: 'linear',
        },
      },
    });

    return () => controls.stop();
  }, [children, direction, speed, controls]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      onMouseEnter={pauseOnHover ? () => controls.stop() : undefined}
      onMouseLeave={pauseOnHover ? () => {
        const container = containerRef.current;
        if (!container) return;

        const content = container.firstElementChild as HTMLElement;
        if (!content) return;

        const width = content.offsetWidth;
        const distance = direction === 'left' ? -width : width;

        controls.start({
          x: [x.get(), distance],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: speed,
              ease: 'linear',
            },
          },
        });
      } : undefined}
    >
      <motion.div
        style={{ x }}
        className="flex items-center gap-4 whitespace-nowrap"
        animate={controls}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface MarqueeItemProps {
  children: React.ReactNode;
  className?: string;
}

export function MarqueeItem({ children, className = '' }: MarqueeItemProps) {
  return <div className={className}>{children}</div>;
}
