"use client";

import React, { useRef, useState, useEffect } from 'react';
import { LucideArrowRight, LucideSparkles } from 'lucide-react';
import Section from '@/components/Section';
import Link from 'next/link';
import Countdown from '@/components/Countdown';
import Scanner from '@/components/Scanner';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import QuestionBox from '@/components/QuestionBox';
import CakeMaker from '@/components/CakeMaker';
import PasscodeLock from '@/components/PasscodeLock';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Handle locking state locally
  // Passcode state handled locally, no auto-unlock

  return (
    <div ref={containerRef} className="relative bg-background text-foreground min-h-screen">
      {/* Hero Section */}
            <section className="relative h-svh flex items-center justify-center overflow-hidden">
              <motion.div 
                style={{ opacity, scale, y }}
                className="absolute inset-0 z-0"
              >
                {/* Ambient Background Glows */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(255,175,189,0.2)_0%,_transparent_60%)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/10" />
                <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-accent-primary/20 blur-[180px] rounded-full animate-aurora opacity-40 mix-blend-multiply" />
                <div className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-accent-secondary/20 blur-[180px] rounded-full animate-aurora opacity-30 mix-blend-multiply" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
              </motion.div>

              <div className="container mx-auto px-6 md:px-8 relative z-10 pt-20">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2 }}
                  className="max-w-4xl mx-auto text-center space-y-12"
                >
                  <div className="space-y-8 md:space-y-12">
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center justify-center gap-4 mb-8"
                    >
                      <div className="h-px w-8 md:w-12 bg-accent-primary/30" />
                      <LucideSparkles className="w-4 h-4 text-accent-secondary animate-pulse" />
                      <div className="h-px w-8 md:w-12 bg-accent-primary/30" />
                    </motion.div>

                    <motion.div 
                      initial={{ letterSpacing: "2em", opacity: 0 }}
                      animate={{ letterSpacing: "1.2em", opacity: 1 }}
                      className="space-y-4 md:space-y-6"
                    >
                      <span className="text-[9px] md:text-xs uppercase text-accent-secondary block font-black">
                        Est. 2026 • Chapter I
                      </span>
                    </motion.div>

                    <h1 className="text-[14vw] md:text-[10rem] lg:text-[12rem] font-serif leading-[0.85] md:leading-[0.8] tracking-tighter italic">
                      Sweet <br />
                      <span className="text-accent-gradient not-italic">Surprise.</span>
                    </h1>
                  </div>

                  <p className="text-lg md:text-2xl lg:text-3xl text-foreground/50 font-light max-w-2xl mx-auto leading-relaxed italic px-4 border-l-2 border-accent-primary/10 pl-8 ml-auto mr-auto">
                    &quot;I wanted to give you something as unique as you are. <br className="hidden md:block" />Wishing you the most wonderful day.&quot;
                  </p>

                  <div className="pt-8">
                    <button 
                      onClick={() => document.getElementById('soul-check')?.scrollIntoView({ behavior: 'smooth' })}
                      className="group flex items-center justify-center gap-6 text-foreground/40 hover:text-foreground transition-all uppercase tracking-[0.4em] text-[10px] font-bold mx-auto"
                    >
                      Explore More <LucideArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Countdown Area */}
            <section className="py-20 md:py-32 relative flex justify-center">
              <div className="absolute inset-0 bg-accent-primary/5 blur-[120px] opacity-20 pointer-events-none" />
              <div className="glass px-6 md:px-12 py-10 md:py-16 rounded-[2.5rem] md:rounded-[3rem] text-center max-w-4xl w-full mx-6 md:mx-8">
                 <p className="text-[10px] uppercase tracking-[0.5em] text-foreground/30 mb-6 md:mb-8 font-bold">Waiting for June 1st</p>
                 <Countdown targetDate="2026-06-01T00:00:00" />
              </div>
            </section>

            {/* Quote Section */}
            <Section className="py-32 md:py-64 relative overflow-hidden">
              <div className="max-w-5xl mx-auto px-6 md:px-8">
                <motion.div
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   transition={{ duration: 1.5 }}
                   className="relative"
                >
                  <span className="text-[8rem] md:text-[12rem] font-serif absolute -top-24 md:-top-40 -left-10 md:-left-20 text-white/[0.03] pointer-events-none select-none">&quot;</span>
                  <h2 className="text-4xl sm:text-5xl md:text-8xl font-serif italic text-foreground leading-tight mb-8 md:mb-16 text-center lg:text-left relative">
                    &quot;The world feels <br />
                    <span className="lg:ml-40 text-accent-primary drop-shadow-[0_0_15px_rgba(255,175,189,0.4)]">kinder when you smile.&quot;</span>
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -top-10 md:top-0 right-0 md:right-40"
                    >
                      <LucideSparkles className="w-8 h-8 md:w-12 md:h-12 text-accent-tertiary" />
                    </motion.div>
                  </h2>
                  <div className="flex justify-center md:justify-end mt-8 md:mt-12">
                     <p className="text-lg md:text-xl text-foreground/40 max-w-lg leading-relaxed font-light italic text-center md:text-right">
                      This is for you, because you make everything better just by being yourself. No pressure, just a simple thank you.
                    </p>
                  </div>
                </motion.div>
              </div>
            </Section>

            {/* Mood Check Section */}
            <section id="soul-check" className="py-24 md:py-48 px-6 md:px-8">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left">
                   <span className="text-[10px] uppercase tracking-[0.5em] text-accent-tertiary mb-6 font-bold">Your Mood</span>
                  <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif mb-8 tracking-tighter leading-none">How are you <br />feeling?</h2>
                  <p className="text-foreground/40 text-lg md:text-xl font-light italic mb-8 md:mb-12 max-w-md mx-auto lg:mx-0">
                    Let&apos;s see if you&apos;re having a good day today.
                  </p>
                </div>
                <div className="lg:col-span-7">
                  <div className="glass p-6 md:p-12 rounded-[2.5rem] md:rounded-[4rem] flex justify-center items-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <Scanner />
                  </div>
                </div>
              </div>
            </section>

            {/* Question Section */}
            <section id="happiness-check" className="py-24 md:py-48 px-6 md:px-8 bg-white/5">
              <div className="max-w-4xl mx-auto text-center">
                <div className="mb-12 md:mb-24">
                  <span className="text-[10px] tracking-[0.8em] uppercase text-accent-secondary block font-bold mb-6 md:mb-8">Interaction</span>
                  <h2 className="text-4xl sm:text-5xl md:text-8xl font-serif italic mb-6 md:mb-8 text-gray-900">A Quiet <br /><span className="text-accent-gradient not-italic">Conversation.</span></h2>
                  <p className="text-gray-400 text-lg md:text-xl font-light tracking-wide italic max-w-lg mx-auto leading-relaxed px-4">
                    &quot;Honest answers are the only ones that truly matter. There are no wrong ones here.&quot;
                  </p>
                </div>
                <QuestionBox />
              </div>
            </section>

            {/* Next Section Link - Premium Reveal */}
            <section className="py-40 md:py-80 relative flex flex-col items-center justify-center overflow-hidden px-6 md:px-8">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-accent-primary/5 blur-[150px] md:blur-[200px] rounded-full opacity-30" 
              />
              
              <Link 
                href="/thoughts" 
                className="group bg-white/40 backdrop-blur-2xl px-8 md:px-24 py-16 md:py-32 rounded-[3rem] md:rounded-[6rem] border border-white shadow-2xl text-center relative z-10 hover:bg-white/60 transition-all duration-700 max-w-4xl w-full"
              >
                <span className="text-[10px] md:text-xs uppercase tracking-[0.8em] text-accent-tertiary block font-black mb-8 md:mb-12">Next Chapter</span>
                <h3 className="text-4xl md:text-8xl font-serif italic mb-8 md:mb-16 group-hover:text-accent-primary transition-colors duration-700 leading-none tracking-tighter text-gray-900">
                  Digital <br />
                  <span className="text-accent-gradient not-italic">Notes.</span>
                </h3>
                <div className="flex items-center justify-center gap-6 opacity-40 group-hover:opacity-100 transition-all">
                   <div className="h-px w-8 md:w-16 bg-accent-primary/30" />
                   <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]">Read the Thoughts</span>
                   <LucideArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            </section>

            <footer className="py-24 border-t border-black/5 text-center relative bg-white/5">
              <p className="text-[9px] uppercase tracking-[0.8em] text-gray-400 mb-6 font-bold">Made for You • 2026</p>
              <p className="text-[10px] text-gray-300 tracking-[0.2em]">BE HAPPY. NO PRESSURE.</p>
            </footer>

      {/* Texture */}
      <div className="noise" />
    </div>
  );
}
