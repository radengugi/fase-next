'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => setDone(true), 400);
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 80);
    return () => clearInterval(timer);
  }, []);

  if (done) return null;

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center dark:bg-[#0F172A] bg-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-8"
      >
        <div className="relative">
          <div className="relative w-12 h-12 rounded-lg bg-[#B9fA3C] flex items-center justify-center overflow-hidden">
            <Image
              src="/blue-fase.png"
              width={72}
              height={72}
              alt="FASE Logo"
              className="rounded-lg object-contain p-1.5"
            />
            <div className="absolute inset-0 rounded-lg bg-[#04045e] blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold dark:text-white text-[#0F172A] tracking-tight mb-1">FASE Creative</h1>
          <p className="text-sm dark:text-white/40 text-black/40">Digital Agency</p>
        </div>

        <div className="w-48 h-px dark:bg-white/10 bg-black/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#B9fA3C] rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
