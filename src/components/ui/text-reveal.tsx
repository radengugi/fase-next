'use client';

import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
  const words = text.split(' ');

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      transition={{ delay }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={itemVariants}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

interface CharacterRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function CharacterReveal({ text, className = '', delay = 0 }: CharacterRevealProps) {
  const characters = text.split('');

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="show"
      transition={{ delay }}
      className={className}
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          variants={itemVariants}
          className="inline-block"
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
