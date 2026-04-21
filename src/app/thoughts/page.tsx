"use client";

import React from 'react';
import { LucideShieldCheck, LucideSparkles, LucideHeart, LucideArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const thoughts = [
  {
    category: "You",
    title: "Your Style",
    content: "I like how you talk to people. You are honest but also very kind. It shows who you really are.",
  },
  {
    category: "Us",
    title: "Being Nice",
    content: "I am happy we connected. I will always respect you and your choices, even if we only talk through a screen.",
  },
  {
    category: "Wish",
    title: "My Wish",
    content: "I hope you are always happy. I want you to find joy and peace in everything you do.",
  },
  {
    category: "Special",
    title: "Your Smile",
    content: "The world feels a little kinder whenever you smile. It is a quiet kind of magic.",
  }
];

export default function ThoughtsPage() {
  return (
    <div className="pt-48 pb-32 min-h-screen relative overflow-hidden bg-background mesh-gradient">
      <div className="max-w-4xl mx-auto px-8 mb-32 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2 }}
        >
          <span className="text-[10px] tracking-[0.8em] uppercase text-accent-tertiary mb-8 block font-bold">Thoughts</span>
          <h1 className="text-6xl md:text-[7rem] font-serif leading-none tracking-tighter mb-12">
            Nice <br />
            <span className="italic text-accent-gradient">Things</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/40 font-light leading-relaxed max-w-xl">
            &quot;Thinking about why you are a great person and why I appreciate our digital connection.&quot;
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-8 space-y-16 relative z-10">
        {thoughts.map((thought, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="glass p-12 md:p-16 rounded-[3rem] relative overflow-hidden group hover:bg-white/[0.04] transition-all duration-700 font-sans">
               <div className="flex items-center gap-4 mb-8">
                  <LucideShieldCheck className="w-5 h-5 text-accent-primary opacity-40" />
                  <span className="text-[10px] uppercase tracking-[0.4em] text-accent-primary font-bold">{thought.category}</span>
               </div>
               
               <h2 className="text-3xl md:text-4xl font-serif mb-6 italic">{thought.title}</h2>
               <p className="text-2xl text-foreground/70 font-light leading-relaxed italic">
                 &quot;{thought.content}&quot;
               </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-64 text-center relative z-10">
        <Link href="/moments" className="group flex flex-col items-center gap-8">
          <h3 className="text-4xl md:text-6xl font-serif italic mb-4 group-hover:text-accent-secondary transition-colors duration-700">
            A Few Notes
          </h3>
          <LucideArrowRight className="w-10 h-10 text-accent-secondary group-hover:translate-x-4 transition-transform duration-700" />
        </Link>
      </div>

      <div className="noise" />
    </div>
  );
}
