"use client";

import React from 'react';
import Section from '@/components/Section';
import { LucideQuote, LucideHeart, LucideSparkles, LucideArrowRight } from 'lucide-react';
import Balloons from '@/components/Balloons';
import { motion } from 'framer-motion';
import Link from 'next/link';

const wishes = [
  {
    title: "Always Happy",
    message: "I hope you have a great day that makes you smile all the time. You deserve to be happy.",
    icon: <LucideQuote className="w-8 h-8 text-accent-primary/40" />,
    align: "left"
  },
  {
    title: "Be Calm",
    message: "I wish for you a simple life and a happy heart. Just like a quiet night.",
    icon: <LucideHeart className="w-8 h-8 text-accent-secondary/40" />,
    align: "right"
  },
  {
    title: "Keep Growing",
    message: "You are growing into an amazing person. Keep being yourself and following your dreams.",
    icon: <LucideSparkles className="w-8 h-8 text-accent-tertiary/40" />,
    align: "left"
  }
];


export default function WishesPage() {
  return (
    <div className="pt-48 pb-32 relative overflow-hidden bg-background">
      <Balloons />
      
      {/* Decorative Aura */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-secondary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-8 mb-40">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           className="relative"
        >
          <span className="text-[10px] tracking-[0.8em] uppercase text-accent-secondary mb-8 block font-bold">Part II</span>
          <h1 className="text-7xl md:text-[8rem] font-serif leading-none tracking-tighter mb-12">
            Good <br />
            <span className="italic font-normal text-accent-gradient">Wishes</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/40 font-light max-w-xl leading-relaxed italic">
            "Simple words coming from my heart to yours. I hope they make you smile."
          </p>
        </motion.div>
      </div>

      <div className="space-y-40 max-w-7xl mx-auto px-8">
        {wishes.map((wish, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: wish.align === 'left' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "circOut" }}
            className={`flex flex-col ${wish.align === 'left' ? 'items-start text-left' : 'items-end text-right'}`}
          >
            <div className="glass p-16 md:p-24 rounded-[4rem] w-full max-w-4xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-700">
              <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-100 transition-opacity duration-700">
                {wish.icon}
              </div>
              
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent-primary mb-10 block font-bold">Wish • 0{index + 1}</span>
              <h2 className="text-4xl md:text-6xl font-serif mb-12">{wish.title}</h2>
              <p className="text-2xl md:text-4xl text-foreground/80 leading-snug font-light italic">
                "{wish.message}"
              </p>
              
              <div className="mt-16 w-32 h-px bg-white/10 group-hover:w-full transition-all duration-1000" />
            </div>
          </motion.div>
        ))}
      </div>

      <section className="mt-64 text-center px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="p-16 glass rounded-[3rem] relative"
          >
             <LucideHeart className="w-12 h-12 text-accent-secondary/30 mx-auto mb-10 animate-pulse" />
             <h3 className="text-3xl font-serif italic mb-8">"Keep being you."</h3>
             <p className="text-foreground/40 font-light italic leading-relaxed">
              I wish the best for you today and always. You are a special person.
            </p>
          </motion.div>
          
          <div className="mt-24">
            <Link href="/thoughts" className="group inline-flex items-center gap-6">
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-foreground/40 group-hover:text-foreground transition-colors">Next</span>
              <LucideArrowRight className="w-5 h-5 text-accent-primary group-hover:translate-x-3 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <div className="noise" />
    </div>
  );
}
