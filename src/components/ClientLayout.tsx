"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Basic GSAP configuration for smooth scrolling or shared effects
    gsap.to('body', { opacity: 1, duration: 1 });
  }, []);

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex-1"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      
      {/* Background stars/particles */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-lavender/10 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-soft-pink/10 blur-[120px] rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </>
  );
}
