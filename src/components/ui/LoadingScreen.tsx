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
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#04045E]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-8"
      >
        <div className="w-48 h-20 rounded-lg flex items-center justify-center overflow-hidden group-hover:ring-[#B9fA3C]/50 transition-all duration-300">
          <Image
            src="/logo-fase.png"
            width={56}
            height={56}
            alt="FASE Logo"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="text-center -mt-4">
          <h1 className="text-3xl font-bold text-white text-[#0F172A] tracking-tight mb-1">FASE Creative</h1>
          <p className="text-sm text-white/40 text-black/40">Digital Agency</p>
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
