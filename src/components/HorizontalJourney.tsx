"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const milestones = [
  { year: "2005", text: "A star was born.", color: "bg-accent-primary" },
  { year: "Growing", text: "Learning to shine.", color: "bg-accent-secondary" },
  { year: "Evolving", text: "Creating magic.", color: "bg-accent-tertiary" },
  { year: "2026", text: "The brightest chapter yet.", color: "bg-accent-primary" },
];

export default function HorizontalJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={containerRef} className="h-[400vh] relative">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-24 md:gap-48 px-[10vw]">
          {/* Intro Section */}
          <div className="min-w-[80vw] flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-[0.8em] text-accent-primary font-bold mb-8">The Timeline</span>
            <h2 className="text-6xl md:text-[10rem] font-serif italic leading-none tracking-tighter">
              The <br />
              <span className="text-accent-gradient not-italic">Journey.</span>
            </h2>
            <p className="text-xl md:text-2xl text-foreground/40 mt-12 max-w-xl italic">
              Scroll down to travel through time and see how the magic unfolded.
            </p>
          </div>

          {/* Milestone Items */}
          {milestones.map((m, i) => (
            <div key={i} className="min-w-[60vw] flex flex-col justify-center relative">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                className="space-y-8"
              >
                <span className="text-8xl md:text-[15rem] font-serif italic text-foreground/5 block select-none absolute -top-24 left-0">
                  {m.year}
                </span>
                <div className={`w-2 h-2 rounded-full ${m.color} mb-8`} />
                <h3 className="text-4xl md:text-7xl font-serif italic relative z-10">
                  {m.text}
                </h3>
                <div className="h-px w-32 bg-foreground/10" />
              </motion.div>
            </div>
          ))}

          {/* End Section */}
          <div className="min-w-[80vw] flex flex-col justify-center items-center text-center">
             <div className="w-32 h-32 rounded-full bg-accent-primary/10 flex items-center justify-center mb-12">
               <motion.div 
                 animate={{ scale: [1, 1.2, 1] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="w-4 h-4 rounded-full bg-accent-primary" 
               />
             </div>
             <h4 className="text-4xl md:text-6xl font-serif italic">To be continued...</h4>
          </div>
        </motion.div>
      </div>

      {/* Parallax Background Elements */}
      <motion.div 
        style={{ x: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]) }}
        className="absolute top-1/4 left-0 w-[200vw] h-[200px] pointer-events-none opacity-5"
      >
        <span className="text-[200px] font-black uppercase tracking-widest whitespace-nowrap">CELEBRATION • MOMENTS • MAGIC • JOY</span>
      </motion.div>
    </section>
  );
}
