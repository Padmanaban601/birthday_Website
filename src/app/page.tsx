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
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showCakeMaker, setShowCakeMaker] = useState(false);
  const [isCakeFinished, setIsCakeFinished] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Handle locking state locally
  useEffect(() => {
    const unlocked = localStorage.getItem('birthday_unlocked');
    if (unlocked === 'true') setIsUnlocked(true);
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    localStorage.setItem('birthday_unlocked', 'true');
  };

  return (
    <div ref={containerRef} className="relative bg-[#020205] text-foreground min-h-screen">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="lock"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 1 }}
          >
            <PasscodeLock onSuccess={handleUnlock} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {/* Hero & Interaction Section */}
            <section className="relative h-[120svh] flex items-center justify-center overflow-hidden">
              <motion.div 
                style={{ opacity, scale, y }}
                className="absolute inset-0 z-0"
              >
                {/* Ambient Background Glows */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(255,175,189,0.1)_0%,_transparent_50%)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030305]/20 to-[#030305]" />
                <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-accent-primary/10 blur-[180px] rounded-full animate-aurora opacity-30 mix-blend-screen" />
                <div className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-accent-secondary/10 blur-[180px] rounded-full animate-aurora opacity-20 mix-blend-screen" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
              </motion.div>

              <div className="container mx-auto px-8 relative z-10">
                <AnimatePresence mode="wait">
                  {!showCakeMaker && !isCakeFinished ? (
                    <motion.div
                      key="welcome"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                      transition={{ duration: 1.2 }}
                      className="max-w-4xl mx-auto text-center space-y-12"
                    >
                      <div className="space-y-6">
                        <motion.span 
                          initial={{ letterSpacing: "1.5em", opacity: 0 }}
                          animate={{ letterSpacing: "0.8em", opacity: 1 }}
                          className="text-[10px] md:text-xs uppercase text-accent-secondary block font-black"
                        >
                          Est. 2026 • Chapter I
                        </motion.span>
                        <h1 className="text-7xl md:text-[10rem] font-serif leading-[0.8] tracking-tighter italic">
                          Sweet <br />
                          <span className="text-accent-gradient not-italic">Surprise.</span>
                        </h1>
                      </div>

                      <p className="text-xl md:text-2xl text-foreground/40 font-light max-w-xl mx-auto leading-relaxed italic">
                        &quot;I wanted to give you something sweet. <br />Why don&apos;t you bake your own birthday cake?&quot;
                      </p>

                      <button
                        onClick={() => setShowCakeMaker(true)}
                        className="group relative px-12 py-6 glass rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                      >
                        <span className="relative z-10 text-xs font-bold tracking-[0.4em] uppercase text-white/80 group-hover:text-white transition-colors">Start Baking</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </motion.div>
                  ) : showCakeMaker && !isCakeFinished ? (
                    <motion.div
                      key="cakemaker"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, y: -50, filter: 'blur(20px)' }}
                      className="flex justify-center"
                    >
                      <CakeMaker onComplete={() => {
                        setShowCakeMaker(false);
                        setIsCakeFinished(true);
                      }} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="final-reveal"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-16"
                    >
                      <div className="flex-1 space-y-12 text-center lg:text-left">
                        <span className="text-[10px] tracking-[0.8em] uppercase text-accent-tertiary block font-bold">The Reveal</span>
                        <h2 className="text-6xl md:text-[8rem] font-serif italic text-foreground leading-[0.9] tracking-tighter">
                          "The world feels <br />
                          <span className="text-accent-gradient not-italic">better."</span>
                        </h2>
                        <p className="text-2xl md:text-3xl text-foreground/40 font-light leading-relaxed max-w-xl italic">
                          &quot;I hope that cake was as sweet as your smile. Wishing you the happiest of days.&quot;
                        </p>
                        <div className="pt-8">
                          <button 
                            onClick={() => document.getElementById('soul-check')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group flex items-center gap-6 text-foreground/40 hover:text-foreground transition-all uppercase tracking-[0.4em] text-[10px] font-bold"
                          >
                            Continue Reading <LucideArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                          </button>
                        </div>
                      </div>
                      
                      <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative hidden lg:block"
                      >
                        <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-accent-primary/10 blur-[100px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        <LucideSparkles className="w-32 h-32 md:w-48 md:h-48 text-accent-secondary opacity-20" />
                      </motion.div>
                    </motion.div>
                  ) }
                </AnimatePresence>
              </div>
            </section>

            {/* Countdown Area */}
            <section className="py-32 relative flex justify-center">
              <div className="absolute inset-0 bg-accent-primary/5 blur-[120px] opacity-20 pointer-events-none" />
              <div className="glass px-12 py-16 rounded-[3rem] text-center max-w-4xl w-full mx-8">
                 <p className="text-[10px] uppercase tracking-[0.5em] text-foreground/30 mb-8 font-bold">Waiting for June 1st</p>
                 <Countdown targetDate="2026-06-01T00:00:00" />
              </div>
            </section>

            {/* Quote Section */}
            <Section className="py-64 relative overflow-hidden">
              <div className="max-w-5xl mx-auto px-8">
                <motion.div
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   transition={{ duration: 1.5 }}
                   className="relative"
                >
                  <span className="text-[12rem] font-serif absolute -top-40 -left-20 text-white/[0.03] pointer-events-none select-none">&quot;</span>
                  <h2 className="text-5xl md:text-8xl font-serif italic text-foreground leading-tight mb-16 text-center lg:text-left relative">
                    &quot;The world feels <br />
                    <span className="lg:ml-40 text-accent-primary drop-shadow-[0_0_15px_rgba(255,175,189,0.4)]">kinder when you smile.&quot;</span>
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute top-0 right-0 md:right-40"
                    >
                      <LucideSparkles className="w-12 h-12 text-accent-tertiary" />
                    </motion.div>
                  </h2>
                  <div className="flex justify-end mt-12">
                     <p className="text-xl text-foreground/40 max-w-lg leading-relaxed font-light italic text-right">
                      This is for you, because you make everything better just by being yourself. No pressure, just a simple thank you.
                    </p>
                  </div>
                </motion.div>
              </div>
            </Section>

            {/* Mood Check Section */}
            <section id="soul-check" className="py-48 px-8">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 flex flex-col justify-center">
                   <span className="text-[10px] uppercase tracking-[0.5em] text-accent-tertiary mb-6 font-bold">Your Mood</span>
                  <h2 className="text-5xl md:text-7xl font-serif mb-8 tracking-tighter leading-none">How are you <br />feeling?</h2>
                  <p className="text-foreground/40 text-xl font-light italic mb-12 max-w-md">
                    Let's see if you're having a good day today.
                  </p>
                </div>
                <div className="lg:col-span-7">
                  <div className="glass p-12 rounded-[4rem] flex justify-center items-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <Scanner />
                  </div>
                </div>
              </div>
            </section>

            {/* Question Section */}
            <section id="happiness-check" className="py-48 px-8 bg-[#050508]">
              <div className="max-w-4xl mx-auto text-center">
                <div className="mb-24">
                  <span className="text-[10px] tracking-[0.8em] uppercase text-accent-secondary block font-bold mb-8">Interaction</span>
                  <h2 className="text-5xl md:text-8xl font-serif italic mb-8">A Quiet <br /><span className="text-accent-gradient not-italic">Conversation.</span></h2>
                  <p className="text-foreground/20 text-xl font-light tracking-wide italic max-w-lg mx-auto leading-relaxed">
                    &quot;Honest answers are the only ones that truly matter. There are no wrong ones here.&quot;
                  </p>
                </div>
                <QuestionBox />
              </div>
            </section>

            {/* Next Section Link */}
            <section className="py-80 relative flex flex-col items-center justify-center overflow-hidden">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute w-[1000px] h-[1000px] bg-accent-secondary/5 blur-[200px] rounded-full opacity-30" 
              />
              
              <Link href="/thoughts" className="group relative px-16 py-12 text-center">
                <h3 className="text-4xl md:text-6xl font-serif italic mb-8 group-hover:text-accent-primary transition-colors duration-700 leading-tight">
                  Nice <br />Things
                </h3>
                <div className="flex items-center justify-center gap-4 opacity-40 group-hover:opacity-100 transition-all group-hover:translate-x-4">
                   <span className="text-sm font-bold uppercase tracking-[0.4em]">Read More</span>
                   <LucideArrowRight className="w-6 h-6" />
                </div>
              </Link>
            </section>

            <footer className="py-24 border-t border-white/5 text-center relative bg-background">
              <p className="text-[9px] uppercase tracking-[0.8em] text-foreground/20 mb-6 font-bold">Made for You • 2026</p>
              <p className="text-[10px] text-foreground/10 tracking-[0.2em]">BE HAPPY. NO PRESSURE.</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Texture */}
      <div className="noise" />
    </div>
  );
}
