"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface LiquidHoverProps {
  children: ReactNode;
  className?: string;
}

export default function LiquidHover({ children, className = "" }: LiquidHoverProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* SVG Filter for Liquid Effect */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="liquid-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01"
              numOctaves="3"
              result="noise"
              seed="1"
            >
              <animate
                attributeName="baseFrequency"
                values="0.01;0.015;0.01"
                dur="10s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" result="dist">
              <animate
                attributeName="scale"
                values="0;20;0"
                dur="0.5s"
                begin="mouseover"
                fill="freeze"
              />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>

      <motion.div
        className="relative overflow-hidden"
        style={{ filter: "url(#liquid-filter)" }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
