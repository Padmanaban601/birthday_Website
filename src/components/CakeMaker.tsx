"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideFlame, LucideSparkles, LucideCake, LucidePartyPopper } from 'lucide-react';

const flavors = [
  { name: 'Vanilla', color: '#FFF9E3', secondary: '#F3E5AB' },
  { name: 'Chocolate', color: '#4B3621', secondary: '#3D2B1F' },
  { name: 'Strawberry', color: '#FFB7C5', secondary: '#FF91A4' },
  { name: 'Red Velvet', color: '#8B0000', secondary: '#720000' },
];

const toppings = [
  { name: 'Sprinkles', icon: '✨' },
  { name: 'Hearts', icon: '💖' },
  { name: 'Berries', icon: '🍓' },
  { name: 'Stars', icon: '⭐' },
];

export default function CakeMaker({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [isBaked, setIsBaked] = useState(false);
  const [candlesLit, setCandlesLit] = useState(false);

  const toggleTopping = (topping: string) => {
    setSelectedToppings(prev => 
      prev.includes(topping) ? prev.filter(t => t !== topping) : [...prev, topping]
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto min-h-[600px] md:min-h-[750px] glass rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-10 flex flex-col relative overflow-hidden backdrop-blur-3xl border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary opacity-40" />
      
      {/* Header - Fixed Height Area (100px) */}
      <div className="h-24 flex flex-col justify-center text-center mb-4">
        <motion.span 
          key={step}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[10px] tracking-[0.6em] uppercase text-accent-secondary font-black mb-3 block"
        >
          Chapter {step}
        </motion.span>
        <AnimatePresence mode="wait">
          <motion.h3 
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-2xl md:text-4xl font-serif italic text-white leading-tight"
          >
            {step === 1 && "Choose a Flavor"}
            {step === 2 && "Sprinkle with Love"}
            {step === 3 && "Make a Big Wish"}
          </motion.h3>
        </AnimatePresence>
      </div>

      {/* Cake Display - Expanded flexible space */}
      <div className="flex-1 flex flex-col items-center justify-center relative py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFlavor.name + (step === 3 ? 'ready' : 'making')}
            initial={{ scale: 0.6, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.1, opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 12, stiffness: 90 }}
            className="relative"
          >
            {/* The Cake Visual - Real-time 3D Look */}
            <div className="relative w-48 h-40 sm:w-64 sm:h-56 md:w-80 md:h-64 group flex items-center justify-center">
              {/* Cake Shadow */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-black/40 blur-2xl rounded-full" />
              
              {/* Cake Base Layer */}
              <motion.div 
                layoutId="cake-body"
                animate={{ 
                  background: `linear-gradient(135deg, ${selectedFlavor.color}, ${selectedFlavor.secondary})`,
                }}
                className="absolute bottom-8 w-full h-24 sm:h-32 md:h-40 rounded-t-[1.5rem] md:rounded-t-[2rem] rounded-b-[1rem] shadow-2xl border-b-8 border-black/20 overflow-hidden z-20"
              >
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/sandpaper.png')]" />
                <div className="absolute top-0 left-0 w-full h-3 bg-white/10" />
              </motion.div>

              {/* Frosting / Drip Effect */}
              <motion.div 
                layoutId="frosting"
                animate={{ backgroundColor: selectedFlavor.secondary }}
                className="absolute top-12 sm:top-16 md:top-20 w-full h-16 sm:h-20 md:h-24 rounded-full shadow-lg z-30 flex items-end justify-around px-4 sm:px-8"
              >
                {/* Real-time Drips */}
                {[1, 2, 3, 4, 5].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ backgroundColor: selectedFlavor.secondary }}
                    className="w-4 h-10 md:w-6 md:h-14 rounded-full shadow-xl"
                    style={{ marginBottom: `-${15 + ((i * 7) % 15)}px` }}
                  />
                ))}
                {/* Frosting Shine */}
                <div className="absolute top-3 left-6 right-6 h-6 bg-white/15 blur-md rounded-full" />
              </motion.div>
              
              {/* Toppings Layer - Improved Positioning */}
              <div className="absolute inset-x-4 inset-y-12 z-40 pointer-events-none">
                {selectedToppings.map((t, i) => (
                  <motion.span
                    key={t + i}
                    initial={{ scale: 0, opacity: 0, y: -150 }}
                    animate={{ scale: 1, opacity: 1, y: 0, rotate: i * 35 }}
                    className="absolute text-4xl drop-shadow-2xl"
                    style={{ 
                      top: `${(i * 13) % 40}%`, 
                      left: `${(i * 17) % 80}%`,
                    }}
                  >
                    {toppings.find(it => it.name === t)?.icon}
                  </motion.span>
                ))}
              </div>

              {/* Candles - Scaled and Fixed */}
              {step === 3 && (
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex gap-8 z-50">
                  {[1, 2, 3].map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ type: "spring", delay: i * 0.1 }}
                      className="w-4 h-28 bg-gradient-to-r from-accent-primary/20 via-white to-accent-primary/10 rounded-full relative shadow-2xl border-x border-white/40"
                    >
                      <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,#ffafbd_6px,#ffafbd_12px)] rounded-full" />
                      {candlesLit && (
                        <motion.div
                          animate={{ 
                            scale: [1, 1.5, 1.2, 1.5, 1], 
                            opacity: [0.9, 1, 0.9],
                            rotate: [-5, 5, -5]
                          }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="absolute -top-8 md:-top-12 left-1/2 -translate-x-1/2"
                        >
                          <div className="w-6 h-10 md:w-10 md:h-14 bg-orange-400 rounded-full blur-[3px] shadow-[0_0_30px_#fb923c]" />
                          <div className="w-3 h-5 md:w-5 md:h-8 bg-yellow-200 rounded-full absolute top-2 md:top-3 left-1/2 -translate-x-1/2 blur-[1px]" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Premium Gold Stand */}
            <motion.div 
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="w-64 sm:w-80 h-4 bg-gradient-to-r from-accent-primary/10 via-white/30 to-accent-primary/10 blur-md rounded-full mt-6 md:mt-10 active:scale-105 transition-transform" 
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls Container - Fixed Height (160px) */}
      <div className="h-40 flex flex-col justify-center relative z-10">
        {step === 1 && (
          <div className="grid grid-cols-4 gap-4 px-2">
            {flavors.map(f => (
              <motion.button
                key={f.name}
                whileHover={{ scale: 1.15, y: -8 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedFlavor(f)}
                className={`flex flex-col items-center gap-3 transition-all ${selectedFlavor.name === f.name ? 'opacity-100' : 'opacity-25 hover:opacity-50'}`}
              >
                <div 
                  className={`w-10 h-10 md:w-14 md:h-14 rounded-full border-2 md:border-4 shadow-2xl transition-all ${selectedFlavor.name === f.name ? 'border-white scale-110' : 'border-white/5'}`} 
                  style={{ backgroundColor: f.color }} 
                />
                <span className="text-[9px] uppercase tracking-[0.2em] font-black">{f.name}</span>
              </motion.button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-4 gap-6 px-2">
            {toppings.map(t => (
              <motion.button
                key={t.name}
                whileHover={{ scale: 1.15, y: -8, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleTopping(t.name)}
                className={`flex flex-col items-center gap-3 transition-all ${selectedToppings.includes(t.name) ? 'opacity-100 scale-110' : 'opacity-25 hover:opacity-50'}`}
              >
                <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-4xl shadow-2xl transition-all ${selectedToppings.includes(t.name) ? 'glass bg-white/20' : 'glass-dark'}`}>
                  {t.icon}
                </div>
                <span className="text-[9px] uppercase tracking-[0.2em] font-black">{t.name}</span>
              </motion.button>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="flex justify-center px-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(251,146,60,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCandlesLit(true)}
              className={`w-full py-4 md:py-7 rounded-2xl transition-all flex items-center justify-center gap-4 md:gap-6 shadow-3xl border border-white/5 ${candlesLit ? 'bg-accent-primary text-white scale-105' : 'glass-dark hover:bg-white/5'}`}
            >
              <LucideFlame className={`w-5 h-5 md:w-6 md:h-6 ${candlesLit ? 'animate-pulse text-white' : 'text-foreground/20'}`} />
              <span className="text-xs md:text-sm font-black uppercase tracking-[0.4em] md:tracking-[0.6em]">{candlesLit ? "Spark Joy!" : "Light Wishes"}</span>
            </motion.button>
          </div>
        )}
      </div>

      {/* Navigation Footer - Fixed Height (100px) */}
      <div className="h-24 flex justify-between items-center relative z-20 mt-4 border-t border-white/5 px-4">
         <motion.button 
           whileHover={{ x: -10 }}
           onClick={() => setStep(s => Math.max(1, s - 1))}
           className={`text-[10px] uppercase tracking-[0.4em] font-black transition-all ${step === 1 ? 'invisible' : 'text-foreground/30 hover:text-accent-secondary'}`}
         >
           Back
         </motion.button>
         
         <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${step === i ? 'w-6 bg-accent-primary' : 'bg-white/10'}`} />
            ))}
         </div>

         {step < 3 ? (
           <motion.button 
             whileHover={{ scale: 1.1, x: 10 }}
             whileTap={{ scale: 0.9 }}
             onClick={() => setStep(s => s + 1)}
             className="px-10 py-4 glass bg-white/10 hover:bg-white/20 rounded-full text-[10px] uppercase tracking-[0.6em] font-black transition-all text-white shadow-xl"
           >
             Continue
           </motion.button>
         ) : (
           <AnimatePresence>
             {candlesLit && (
                <motion.button 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, boxShadow: "0 0 50px rgba(255,255,255,0.4)" }}
                  onClick={onComplete}
                  className="px-10 py-4 bg-white text-black rounded-full text-[10px] uppercase tracking-[0.6em] font-black hover:bg-accent-tertiary transition-all shadow-2xl"
                >
                  Deliver Gift
                </motion.button>
             )}
           </AnimatePresence>
         )}
      </div>

      {/* Confetti - Positioned outside the main flex flow */}
      {candlesLit && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {(() => {
            const sparkles = Array.from({ length: 40 }, (_, i) => ({
              x: (i % 10 - 5) * 80 + (i % 3 * 20),
              rotate: i * 18,
              duration: 3 + (i % 3),
              delay: (i * 0.05) % 2
            }));
            return sparkles.map((s, i) => (
              <motion.div
                key={i}
                initial={{ y: 800, opacity: 0 }}
                animate={{ 
                  y: -1200, 
                  opacity: [0, 1, 0], 
                  x: s.x,
                  rotate: s.rotate,
                  scale: [0.5, 1.2, 0.5]
                }}
                transition={{ 
                  duration: s.duration, 
                  repeat: Infinity, 
                  delay: s.delay,
                  ease: "easeOut"
                }}
                className="absolute bottom-0 left-1/2"
              >
                <LucideSparkles className="w-5 h-5 text-accent-tertiary shadow-[0_0_20px_rgba(255,175,189,0.5)]" />
              </motion.div>
            ));
          })()}
        </div>
      )}
    </div>
  );
}
