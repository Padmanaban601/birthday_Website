"use client";

import React, { useState } from 'react';
import Section from '@/components/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideHeart, LucideArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { trackMilestone } from '@/lib/analytics';

export default function FinalPage() {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    trackMilestone("Final Reveal Viewed");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#fffdfa] selection:bg-accent-primary/20">
      {/* Golden Hour Background Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-[#ffd700]/10 blur-[250px] rounded-full animate-aurora opacity-60" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#ff8e9e]/15 blur-[200px] rounded-full animate-aurora opacity-40" style={{ animationDirection: 'reverse' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10 text-center max-w-5xl px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white/40 backdrop-blur-3xl p-12 md:p-24 rounded-[4rem] md:rounded-[6rem] border border-white shadow-[0_40px_100px_rgba(255,215,0,0.1)] relative overflow-hidden group"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ffd700]/20 to-transparent blur-2xl" />
          
          <div className="relative z-10 space-y-12 md:space-y-20">
            <div className="space-y-6">
              <motion.span 
                initial={{ letterSpacing: "1em", opacity: 0 }}
                animate={{ letterSpacing: "0.6em", opacity: 1 }}
                className="text-[10px] md:text-xs uppercase text-[#ffd700] block font-black"
              >
                The Final Chapter
              </motion.span>
              <h1 className="text-6xl md:text-[10rem] font-serif leading-[0.8] tracking-tighter italic text-gray-900">
                Forever <br />
                <span className="bg-gradient-to-r from-[#ffd700] via-[#ff8e9e] to-[#ffd700] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x not-italic">Happy.</span>
              </h1>
            </div>
            
            <p className="text-xl md:text-3xl text-gray-800/40 font-light leading-relaxed italic max-w-2xl mx-auto border-l-2 border-[#ffd700]/20 pl-8 ml-auto mr-auto">
              &quot;I am so glad we crossed paths. May your life be filled with the same light you bring to others.&quot;
            </p>

            <button 
              onClick={() => setClicked(true)}
              className="group relative flex flex-col items-center gap-8"
            >
              <div className={`
                w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center border-2 transition-all duration-1000
                ${clicked ? 'bg-[#ffd700]/10 border-[#ffd700] scale-125 shadow-[0_0_80px_rgba(255,215,0,0.4)]' : 'border-gray-100 hover:border-[#ffd700]/40 hover:scale-110'}
              `}>
                <LucideHeart 
                  className={`w-10 h-10 md:w-12 md:h-12 transition-all duration-1000 ${clicked ? 'fill-[#ffd700] text-[#ffd700] scale-110' : 'text-gray-200 group-hover:text-[#ffd700]/60'}`} 
                />
              </div>
              <span className={`text-[11px] font-black tracking-[0.6em] uppercase transition-all duration-1000 ${clicked ? 'text-[#ffd700] opacity-100' : 'text-gray-300 opacity-40'}`}>
                {clicked ? 'Shared Forever' : 'Seal the Wish'}
              </span>
            </button>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="pt-12"
          >
             <Link href="/" className="group inline-flex items-center gap-4 text-foreground/20 hover:text-foreground/60 transition-all text-[10px] font-bold tracking-[0.4em] uppercase">
                <LucideArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
                Go Back
             </Link>
          </motion.div>
        </div>
      </motion.div>
      </div>

      {/* Floating Particles */}
      <AnimatePresence>
        {clicked && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {(() => {
              const particles = Array.from({ length: 40 }, (_, i) => ({
                x: (i % 10 - 5) * 60 + (i % 3 * 20),
                duration: 5 + (i % 5),
                delay: (i * 0.1) % 3
              }));
              return particles.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 0, x: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    y: -800,
                    x: p.x
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: p.duration, 
                    repeat: Infinity,
                    delay: p.delay
                  }}
                  className={`absolute left-1/2 bottom-0 w-1 h-1 rounded-full blur-[2px] ${i % 2 === 0 ? 'bg-accent-primary' : 'bg-accent-secondary'}`}
                />
              ));
            })()}
          </div>
        )}
      </AnimatePresence>

      <div className="noise" />
    </div>
  );
}
