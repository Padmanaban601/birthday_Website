"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotate: number;
}

const HeartTrail = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.85) { // Only spawn occasionally
        const newHeart: Heart = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          scale: 0.5 + Math.random() * 0.5,
          rotate: (Math.random() - 0.5) * 45,
        };
        setHearts((prev) => [...prev.slice(-15), newHeart]); // Keep max 15 hearts
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 0, scale: 0, y: heart.y }}
            animate={{ opacity: [0, 1, 0], scale: heart.scale, y: heart.y - 100 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              position: 'absolute',
              left: heart.x,
              top: heart.y,
              transform: `translate(-50%, -50%) rotate(${heart.rotate}deg)`,
              color: '#c19a6b',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HeartTrail;
