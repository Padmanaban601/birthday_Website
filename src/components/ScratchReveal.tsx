"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScratchRevealProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  brushSize?: number;
  onComplete?: () => void;
  className?: string;
  coverColor?: string;
}

export default function ScratchReveal({
  children,
  width = 300,
  height = 200,
  brushSize = 30,
  onComplete,
  className = "",
  coverColor = "#ffafbd" // Iridescent Pinkish
}: ScratchRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Fill with cover color/gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, coverColor);
    gradient.addColorStop(0.5, "#ffc3a0");
    gradient.addColorStop(1, "#96e6a1");
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add some "texture" or text to the cover
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH TO REVEAL", width / 2, height / 2);
  }, [width, height, coverColor]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();

    checkCompletion();
  };

  const checkCompletion = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }

    const percentage = (transparentPixels / (pixels.length / 4)) * 100;
    if (percentage > 50 && !isComplete) {
      setIsComplete(true);
      if (onComplete) onComplete();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    scratch(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawing) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const touch = e.touches[0];
    scratch(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  return (
    <div className={`relative overflow-hidden rounded-[2rem] ${className}`} style={{ width, height }}>
      <div className="absolute inset-0 flex items-center justify-center p-6 bg-white/10 backdrop-blur-md">
        {children}
      </div>
      
      <AnimatePresence>
        {!isComplete && (
          <motion.canvas
            ref={canvasRef}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            onMouseDown={() => setIsDrawing(true)}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDrawing(true)}
            onTouchEnd={() => setIsDrawing(false)}
            onTouchMove={handleTouchMove}
            className="absolute inset-0 cursor-crosshair touch-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
