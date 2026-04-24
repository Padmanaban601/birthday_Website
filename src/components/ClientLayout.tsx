"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import MusicPlayer from './MusicPlayer';
import HeartTrail from './HeartTrail';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            key="overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center p-8 overflow-hidden"
          >
            {/* Background Glow for Overlay */}
            <div className="absolute inset-0 -z-10 opacity-30">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-primary/20 blur-[180px] rounded-full animate-aurora" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-secondary/20 blur-[150px] rounded-full animate-aurora" style={{ animationDirection: 'reverse' }} />
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-center space-y-12 max-w-2xl"
            >
              <div className="space-y-6">
                <span className="text-[10px] tracking-[1em] uppercase text-accent-tertiary block font-bold">Today is Special</span>
                <h2 className="text-5xl md:text-7xl font-serif italic leading-tight">
                  &quot;A simple gift <br />
                  <span className="text-accent-gradient not-italic font-normal">waiting for you.&quot;</span>
                </h2>
              </div>

              <button
                onClick={() => setHasStarted(true)}
                className="group relative px-12 py-6 glass rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 text-sm font-bold tracking-[0.4em] uppercase text-white/80 group-hover:text-white transition-colors">Open Your Surprise</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, filter: 'blur(30px)', scale: 0.98 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          exit={{ opacity: 0, filter: 'blur(30px)', scale: 1.02 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 relative z-10"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <MusicPlayer autoPlayTrigger={hasStarted} />
      <HeartTrail />
      
      {/* Immersive Background System */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden bg-background mesh-gradient transition-all duration-[2000ms]" style={{ filter: hasStarted ? 'blur(0px)' : 'blur(40px)' }}>
        {/* Dynamic Interactive Glow */}
        <motion.div 
          className="absolute w-[800px] h-[800px] bg-accent-primary/20 blur-[160px] rounded-full opacity-60"
          animate={{
            x: mousePos.x - 400,
            y: mousePos.y - 400,
          }}
          transition={{ type: "spring", damping: 40, stiffness: 40, mass: 2.5 }}
        />

        <div className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] bg-accent-secondary/10 blur-[180px] rounded-full opacity-40" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-accent-tertiary/10 blur-[180px] rounded-full opacity-30" />
        
        {/* Stellar Field */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
        
        {isMounted && (() => {
          const stars = Array.from({ length: 40 }, (_, i) => ({
            top: `${(i * 17) % 100}%`,
            left: `${(i * 23) % 100}%`,
            width: `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
            delay: (i * 0.1) % 5,
            duration: 2 + (i % 3)
          }));
          return stars.map((s, i) => (
            <div 
              key={i}
              className={`absolute rounded-full opacity-[0.4] blur-[1px] animate-pulse`}
              style={{
                top: s.top,
                left: s.left,
                width: s.width,
                height: s.height,
                backgroundColor: i % 2 === 0 ? '#ffd700' : '#f8c8dc',
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`
              }}
            />
          ));
        })()}
      </div>
    </>
  );
}
