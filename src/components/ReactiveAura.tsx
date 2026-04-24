"use client";

import React, { useRef, useEffect } from "react";
import { useAudio } from "./AudioProvider";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function ReactiveAura() {
  const { getFrequencyData, isPlaying } = useAudio();
  const intensity = useMotionValue(0);
  const smoothIntensity = useSpring(intensity, { stiffness: 100, damping: 20 });
  
  useEffect(() => {
    let animationFrame: number;
    
    const update = () => {
      if (isPlaying) {
        const data = getFrequencyData();
        if (data.length > 0) {
          const sum = data.reduce((a, b) => a + b, 0);
          const avg = sum / data.length;
          intensity.set(avg / 255);
        }
      } else {
        intensity.set(0);
      }
      animationFrame = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, getFrequencyData, intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Primary Aura */}
      <motion.div
        style={{
          scale: useSpring(smoothIntensity, { stiffness: 50, damping: 10 }),
          opacity: 0.3,
          background: `radial-gradient(circle at center, #ffafbd22 0%, #c2e9fb11 40%, transparent 70%)`,
          filter: "blur(100px)",
          x: "-50%",
          y: "-50%",
          left: "50%",
          top: "50%",
        }}
        className="absolute w-[150vw] h-[150vh] rounded-full"
      />
      
      {/* Secondary Pulse */}
      <motion.div
        style={{
          scale: smoothIntensity,
          opacity: smoothIntensity,
          filter: "blur(20px)",
          x: "-50%",
          y: "-50%",
          left: "50%",
          top: "50%",
        }}
        className="absolute w-[100vw] h-[100vh] rounded-full border-[2px] border-accent-primary/20"
      />
    </div>
  );
}

