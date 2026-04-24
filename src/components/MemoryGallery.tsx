"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LucideImage } from 'lucide-react';
import { trackMilestone } from '@/lib/analytics';
import ParallaxCard from './ParallaxCard';
import DigitalVideo from './DigitalVideo';
import LiquidHover from './LiquidHover';

const memories = [
  { id: 1, src: '/assets/memory-1.png', title: 'Ethereal Sunrise', size: 'large' },
  { id: 2, src: '/assets/memory-2.png', title: 'Crystalline Bloom', size: 'small' },
  { id: 3, src: '/assets/memory-3.png', title: 'Pastel Nebula', size: 'medium' },
  { id: 4, src: '/assets/memory-4.png', title: 'Pure Celebration', size: 'small' },
  { id: 5, src: '/assets/memory-5.png', title: 'Silk Nostalgia', size: 'medium' },
];

export default function MemoryGallery() {
  return (
    <section className="py-24 px-6 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.8em] text-accent-tertiary font-bold block mb-4"
          >
            The Collection
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif italic"
          >
            Captured <span className="text-accent-gradient not-italic">Moments.</span>
          </motion.h2>
        </div>

        {/* Cinematic Montage Feature */}
        <ParallaxCard className="mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative group rounded-[2.5rem] overflow-hidden glass border-white/20 aspect-video md:aspect-[21/9] shadow-2xl"
          >
            <DigitalVideo />
          </motion.div>
        </ParallaxCard>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {memories.map((memory, index) => (
            <ParallaxCard
              key={memory.id}
              className={`${
                memory.size === 'large' ? 'md:col-span-2 md:row-span-2' : 
                memory.size === 'medium' ? 'md:row-span-2' : ''
              }`}
            >

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => trackMilestone("Memory Viewed", { title: memory.title })}
                className="relative h-full w-full rounded-[2rem] overflow-hidden glass border-white/10 group cursor-pointer"
              >
                <LiquidHover className="w-full h-full">
                  <img 
                    src={memory.src} 
                    alt={memory.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                  />
                </LiquidHover>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-2 text-white/70 mb-1">
                    <LucideImage className="w-3 h-3" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Memory #{index + 1}</span>
                  </div>
                  <p className="text-white text-lg font-serif italic">{memory.title}</p>
                </div>
              </motion.div>
            </ParallaxCard>
          ))}
        </div>
      </div>
    </section>
  );
}
