"use client";

import React, { useState } from 'react';
import Section from '@/components/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideHeart, LucideArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FinalPage() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background mesh-gradient">
      {/* Background Glows */}
      <div className="absolute inset-0 z-0 text-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-primary/10 blur-[200px] rounded-full animate-aurora mix-blend-screen opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-secondary/10 blur-[180px] rounded-full animate-aurora mix-blend-screen opacity-30" style={{ animationDirection: 'reverse' }} />
      </div>

      <div className="relative z-10 text-center max-w-5xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="space-y-12"
        >
          <span className="text-[10px] tracking-[1em] uppercase text-accent-tertiary font-bold mb-12 block">The End</span>
          <h1 className="text-5xl md:text-8xl font-serif italic mb-12 tracking-tighter leading-tight">
            &quot;A simple wish <br />
            <span className="text-accent-gradient not-italic font-normal">for you.&quot;</span>
          </h1>
          
          <p className="text-xl md:text-3xl text-foreground/40 font-light max-w-3xl mx-auto leading-relaxed italic">
            I hope you stay happy forever. You deserve the best in life, 
            and I am glad I could share this with you today.
          </p>

          <div className="py-16">
            <button 
              onClick={() => setClicked(true)}
              className="group relative flex flex-col items-center gap-6"
            >
              <div className={`
                w-24 h-24 rounded-full flex items-center justify-center border transition-all duration-1000
                ${clicked ? 'bg-accent-secondary/20 border-accent-secondary scale-125 shadow-[0_0_60px_rgba(255,105,180,0.3)]' : 'border-white/10 hover:border-accent-secondary/40 hover:scale-110'}
              `}>
                <LucideHeart 
                  className={`w-10 h-10 transition-all duration-1000 ${clicked ? 'fill-accent-secondary text-accent-secondary animate-pulse' : 'text-foreground/20 group-hover:text-accent-secondary/60'}`} 
                />
              </div>
              <span className={`text-[10px] font-bold tracking-[0.5em] uppercase transition-all duration-1000 ${clicked ? 'text-accent-secondary opacity-100 translate-y-2' : 'text-foreground/30 opacity-40'}`}>
                {clicked ? 'Sent! • ♡' : 'Send a Wish'}
              </span>
            </button>
          </div>

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
        </motion.div>
      </div>

      {/* Floating Particles */}
      <AnimatePresence>
        {clicked && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  y: -800,
                  x: (Math.random() - 0.5) * 600
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 5 + Math.random() * 5, 
                  repeat: Infinity,
                  delay: Math.random() * 3
                }}
                className={`absolute left-1/2 bottom-0 w-1 h-1 rounded-full blur-[2px] ${i % 2 === 0 ? 'bg-accent-primary' : 'bg-accent-secondary'}`}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="noise" />
    </div>
  );
}
