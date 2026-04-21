"use client";

import React, { useState, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { LucideSearch, LucideHeart, LucideCheckCircle } from 'lucide-react';

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScan = () => {
    if (scanComplete) return;
    setIsScanning(true);
    let currentProgress = 0;
    intervalRef.current = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(intervalRef.current!);
        setIsScanning(false);
        setScanComplete(true);
      }
    }, 30);
  };

  const stopScan = () => {
    if (scanComplete) return;
    setIsScanning(false);
    clearInterval(intervalRef.current!);
    setProgress(0);
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 glass rounded-[3rem] max-w-md mx-auto relative overflow-hidden group">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(177,156,217,0.05),_transparent_70%)]" />
      
      <div className="mb-10 text-center relative z-10">
        <h3 className="text-3xl font-playfair mb-3 tracking-tight">Soul Scanner</h3>
        <p className="text-sm text-foreground/50 font-light max-w-[200px] mx-auto">Place your intent here to reveal a hidden cosmic truth</p>
      </div>

      <div className="relative w-56 h-72 border border-white/5 bg-white/[0.02] rounded-[2.5rem] mb-10 flex items-center justify-center overflow-hidden">
        {/* Scanning Laser */}
        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ top: "0%" }}
              animate={{ top: ["0%", "100%", "0%"] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary-lavender to-transparent shadow-[0_0_20px_#b19cd9] z-10"
            />
          )}
        </AnimatePresence>

        <div className="flex flex-col items-center gap-6 relative z-10">
          {scanComplete ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              className="text-primary-lavender flex flex-col items-center"
            >
              <div className="relative">
                <LucideHeart className="w-20 h-20 mb-6 fill-primary-lavender/20 animate-pulse" />
                <LucideCheckCircle className="absolute -bottom-2 -right-2 w-8 h-8 text-white bg-primary-lavender rounded-full border-4 border-background" />
              </div>
              <div className="text-2xl font-playfair italic tracking-wide text-gradient">100% Pure Soul</div>
            </motion.div>
          ) : (
            <>
              <div className="relative group-hover:scale-110 transition-transform duration-700">
                <LucideSearch className={`w-16 h-16 transition-colors duration-500 ${isScanning ? 'text-primary-lavender' : 'text-white/10'}`} />
                {isScanning && (
                   <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-primary-lavender/30 rounded-full scale-150"
                   />
                )}
              </div>
              <div className="text-xl font-mono text-foreground/20 tabular-nums">
                {String(progress).padStart(2, '0')}%
              </div>
            </>
          )}
        </div>
      </div>

      <div className="w-full relative z-10">
        {!scanComplete && (
          <button
            onMouseDown={startScan}
            onMouseUp={stopScan}
            onMouseLeave={stopScan}
            onTouchStart={startScan}
            onTouchEnd={stopScan}
            className={`w-full py-5 rounded-2xl font-semibold tracking-wide transition-all duration-700 select-none ${
              isScanning 
              ? 'bg-primary-lavender text-background shadow-[0_0_30px_rgba(177,156,217,0.3)]' 
              : 'bg-white/5 border border-white/10 text-foreground/40 hover:text-foreground/70 hover:bg-white/10 shadow-sm'
            }`}
          >
            {isScanning ? 'Syncing...' : 'Hold to Synchronize'}
          </button>
        )}

        {scanComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-foreground/80 italic font-playfair text-lg mb-6 leading-relaxed">
              "The stars confirm: You possess a light that makes the world remarkably brighter."
            </p>
            <button 
              onClick={() => { setScanComplete(false); setProgress(0); }}
              className="text-xs uppercase tracking-[0.2em] text-foreground/20 hover:text-primary-lavender hover:text-foreground/50 transition-all duration-300"
            >
              Recalibrate
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Scanner;
