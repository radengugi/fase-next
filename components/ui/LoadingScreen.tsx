'use client';

import { motion } from 'framer-motion';
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
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white text-2xl font-bold shadow-2xl shadow-[#6366F1]/40">
            F
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] blur-2xl opacity-40 animate-pulse" />
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold dark:text-white text-[#0F172A] tracking-tight mb-1">FASE</h1>
          <p className="text-sm dark:text-white/40 text-black/40">Digital Agency</p>
        </div>

        <div className="w-48 h-px dark:bg-white/10 bg-black/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#6366F1] to-[#A78BFA] rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
