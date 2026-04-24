"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import MusicPlayer from './MusicPlayer';
import HeartTrail from './HeartTrail';
import PasscodeLock from './PasscodeLock';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    const unlocked = localStorage.getItem('birthday_unlocked');
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    localStorage.setItem('birthday_unlocked', 'true');
  };

  return (
    <>
      <AnimatePresence>
      {/* PasscodeLock is now the initial screen handled in page.tsx */}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="lock-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[200]"
          >
            <PasscodeLock onSuccess={handleUnlock} />
          </motion.div>
        ) : (
          <motion.div
            key="unlocked-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="contents"
          >
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
            <MusicPlayer autoPlayTrigger={true} />
            <HeartTrail />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Immersive Background System */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden bg-background mesh-gradient transition-all duration-[2000ms]">
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
        
        {/* Light Particles */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
        
        {isMounted && (() => {
          const particles = Array.from({ length: 40 }, (_, i) => ({
            top: `${(i * 17) % 100}%`,
            left: `${(i * 23) % 100}%`,
            width: `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
            delay: (i * 0.1) % 5,
            duration: 2 + (i % 3)
          }));
          return particles.map((p, i) => (
            <div 
              key={i}
              className={`absolute rounded-full opacity-[0.4] blur-[1px] animate-pulse`}
              style={{
                top: p.top,
                left: p.left,
                width: p.width,
                height: p.height,
                backgroundColor: i % 2 === 0 ? '#ffd700' : '#f8c8dc',
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`
              }}
            />
          ));
        })()}
      </div>
    </>
  );
}
