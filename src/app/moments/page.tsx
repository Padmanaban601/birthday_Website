"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LucideEye, LucideSmile, LucideStar, LucideThumbsUp, LucideArrowRight } from 'lucide-react';
import Link from 'next/link';

const snapshots = [
  {
    icon: <LucideEye className="w-6 h-6" />,
    title: "How You Are",
    text: "I like how you can be honest and kind at the same time. You know how to keep things simple.",
    size: "col-span-1"
  },
  {
    icon: <LucideSmile className="w-6 h-6" />,
    title: "Your Kindness",
    text: "You were very nice when I was honest with you. It shows you are a really good person.",
    size: "col-span-1"
  },
  {
    icon: <LucideThumbsUp className="w-6 h-6" />,
    title: "Respect",
    text: "I just want to celebrate you today. Stay just the way you are, because you are amazing.",
    size: "col-span-1 md:col-span-2"
  }
];

export default function MomentsPage() {
  return (
    <div className="pt-32 md:pt-48 pb-32 min-h-screen relative overflow-hidden bg-background mesh-gradient">
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-20 md:mb-32 relative z-10">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 1.2 }}
        >
          <span className="text-[10px] tracking-[0.8em] uppercase text-accent-secondary mb-6 md:mb-8 block font-bold">About You</span>
          <h1 className="text-5xl md:text-[8rem] font-serif leading-none tracking-tighter mb-8 md:mb-12">
            Digital <br />
            <span className="italic text-accent-gradient">Notes</span>
          </h1>
          <p className="text-lg md:text-2xl text-foreground/40 font-light max-w-xl leading-relaxed italic px-2">
            &quot;Even if we only talk on screen, I can tell you are a special person. Happy to know you.&quot;
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
        {snapshots.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.1 }}
            className={item.size}
          >
            <div className="bg-white/40 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] h-full flex flex-col items-start hover:bg-white/60 transition-all duration-700 border border-white shadow-xl">
               <div className="mb-6 md:mb-8 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 text-accent-secondary">
                {item.icon}
              </div>
               <h2 className="text-2xl md:text-3xl font-serif mb-4 italic">{item.title}</h2>
               <p className="text-lg md:text-xl text-foreground/50 font-light leading-relaxed italic">
                 &quot;{item.text}&quot;
               </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-40 md:mt-64 text-center relative z-10">
         <Link href="/final" className="group relative inline-block">
            <h3 className="text-4xl md:text-7xl font-serif italic mb-8 md:mb-12 group-hover:text-accent-secondary transition-colors duration-700 leading-tight">
              Last <br />Thought
            </h3>
            <div className="flex items-center justify-center gap-4 md:gap-6">
               <div className="h-px w-16 md:w-24 bg-white/10 group-hover:w-32 md:group-hover:w-48 transition-all duration-700" />
               <LucideArrowRight className="w-6 h-6 md:w-8 md:h-8 text-accent-secondary animate-bounce-horizontal" />
            </div>
         </Link>
      </div>

      <div className="noise" />
    </div>
  );
}
