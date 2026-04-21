"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Balloon = ({ delay, color, left }: { delay: number; color: string; left: string }) => {
  return (
    <motion.div
      initial={{ y: "110vh", x: 0, opacity: 0 }}
      animate={{ 
        y: "-110vh",
        x: [0, 20, -20, 0],
        opacity: [0, 1, 1, 0]
      }}
      transition={{ 
        duration: 15 + Math.random() * 10,
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
  const [balloons, setBalloons] = useState<{ id: number; delay: number; color: string; left: string }[]>([]);

  useEffect(() => {
    const colors = ['#b19cd9', '#f4c2c2', '#e6e6fa', '#ffccf9'];
    const newBalloons = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: `${Math.random() * 100}%`
    }));
    setBalloons(newBalloons);
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
