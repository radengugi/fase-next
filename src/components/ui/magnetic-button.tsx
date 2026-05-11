'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useMagneticEffect(strength);

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
}
