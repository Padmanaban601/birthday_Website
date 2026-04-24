"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Balloon = ({ delay, color, left, duration }: { delay: number; color: string; left: string; duration: number }) => {
  return (
    <motion.div
      initial={{ y: "110vh", x: 0, opacity: 0 }}
      animate={{ 
        y: "-110vh",
        x: [0, 20, -20, 0],
        opacity: [0, 1, 1, 0]
      }}
      transition={{ 
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute pointer-events-none"
      style={{ left: left }}
    >
      <div className="relative">
        {/* Balloon Body */}
        <div 
          className="w-12 h-14 rounded-[50%] blur-[0.5px]"
          style={{ backgroundColor: color, opacity: 0.6 }}
        />
        {/* Balloon String */}
        <div className="w-[1px] h-10 bg-white/20 mx-auto" />
      </div>
    </motion.div>
  );
};

const Balloons = () => {
  const [balloons, setBalloons] = useState<{ id: number; delay: number; color: string; left: string; duration: number }[]>([]);

  useEffect(() => {
    const colors = ['#b19cd9', '#f4c2c2', '#e6e6fa', '#ffccf9'];
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      delay: (i * 1.3) % 20,
      color: colors[i % colors.length],
      left: `${(i * 7) % 100}%`,
      duration: 15 + (i % 10)
    }));
    setTimeout(() => setBalloons(generated), 0);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {balloons.map((b) => (
        <Balloon key={b.id} {...b} />
      ))}
    </div>
  );
};

export default Balloons;
