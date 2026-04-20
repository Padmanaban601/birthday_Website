"use client";

import React, { useState } from 'react';
import Section from '@/components/Section';
import { motion } from 'framer-motion';
import { LucideHeart } from 'lucide-react';
import Link from 'next/link';

export default function FinalPage() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(177,156,217,0.1)_0%,_transparent_50%)]" />

      <Section className="text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="space-y-8"
        >
          <h1 className="text-4xl md:text-6xl font-playfair italic mb-8">
            "A quiet wish for someone special..."
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/60 font-light max-w-2xl mx-auto leading-relaxed">
            As this little digital journey ends, my message remains the same. 
            May you find all the happiness you deserve, and may your path always be lit 
            by the same light you bring into the world.
          </p>

          <div className="py-12">
            <button 
              onClick={() => setClicked(true)}
              className="group relative inline-flex flex-col items-center gap-4 transition-all"
            >
              <div className={`
                p-8 rounded-full border border-glass-border transition-all duration-700
                ${clicked ? 'bg-primary-lavender bg-opacity-20 scale-125 border-primary-lavender shadow-[0_0_30px_rgba(177,156,217,0.4)]' : 'hover:border-primary-lavender/40 hover:scale-110'}
              `}>
                <LucideHeart 
                  className={`w-12 h-12 transition-all duration-700 ${clicked ? 'fill-primary-lavender text-primary-lavender' : 'text-foreground/40 group-hover:text-primary-lavender/60'}`} 
                />
              </div>
              <span className={`text-sm tracking-widest uppercase transition-opacity duration-700 ${clicked ? 'opacity-100' : 'opacity-40 group-hover:opacity-60'}`}>
                {clicked ? 'Happiness to you' : 'Send a Quiet Wish'}
              </span>
            </button>
          </div>

          <div className="pt-8">
             <Link href="/" className="text-foreground/30 hover:text-foreground/60 transition-colors text-sm font-light tracking-wide">
                ← Return to the beginning
             </Link>
          </div>
        </motion.div>
      </Section>

      {/* Floating Particles for the end */}
      {clicked && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 0, x: 0 }}
              animate={{ 
                opacity: [0, 1, 0], 
                y: -500,
                x: (Math.random() - 0.5) * 400
              }}
              transition={{ 
                duration: 4 + Math.random() * 4, 
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="absolute left-1/2 bottom-0 w-1 h-1 bg-primary-lavender rounded-full blur-[1px]"
            />
          ))}
        </div>
      )}
    </div>
  );
}
