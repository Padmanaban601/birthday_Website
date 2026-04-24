"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "/assets/memory-1.png",
    text: "Chapter XXI: Since 2005",
    subtext: "21 years of pure light and magic."
  },
  {
    image: "/assets/memory-2.png",
    text: "Finding beauty in every detail.",
    subtext: "The crystalline moments."
  },
  {
    image: "/assets/memory-3.png",
    text: "Written in the stars.",
    subtext: "Infinite wishes for your year ahead."
  },
  {
    image: "/assets/memory-5.png",
    text: "Wrapped in nostalgia.",
    subtext: "Cherishing every chapter of our journey."
  },
  {
    image: "/assets/video-poster.png",
    text: "The celebration has just begun.",
    subtext: "Happy Birthday, beautiful soul."
  }
];

export default function DigitalVideo() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Ken Burns Effect Image */}
          <motion.img
            src={slides[currentSlide].image}
            alt="Cinematic Memory"
            className="w-full h-full object-cover"
            animate={{ 
              scale: [1, 1.1],
              x: [0, -20],
              y: [0, -10]
            }}
            transition={{ duration: 5, ease: "linear" }}
          />
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-white text-3xl md:text-5xl font-serif italic mb-4 drop-shadow-2xl"
            >
              {slides[currentSlide].text}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-white/80 text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold"
            >
              {slides[currentSlide].subtext}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <div 
            key={i}
            className="h-1 rounded-full bg-white/20 overflow-hidden w-8 md:w-12"
          >
            {currentSlide === i && (
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-full bg-accent-primary"
              />
            )}
          </div>
        ))}
      </div>

      {/* Cinematic Film Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
