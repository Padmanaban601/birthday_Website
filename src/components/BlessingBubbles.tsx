"use client";

import React, { useRef, useEffect } from "react";

interface Bubble {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  color: string;
  opacity: number;
}

export default function BlessingBubbles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubbles = useRef<Bubble[]>([]);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBubbles();
    };

    const initBubbles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 30000);
      bubbles.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 40 + 10,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: ["#ffafbd", "#c2e9fb", "#a18cd1", "#ffc3a0"][Math.floor(Math.random() * 4)],
        opacity: Math.random() * 0.2 + 0.05,
      }));
    };

    window.addEventListener("resize", resize);
    resize();

    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.current.forEach((b) => {
        // Apply velocity
        b.x += b.vx;
        b.y += b.vy;

        // Mouse avoidance
        const dx = mouse.current.x - b.x;
        const dy = mouse.current.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
          const angle = Math.atan2(dy, dx);
          const force = (200 - dist) / 2000;
          b.vx -= Math.cos(angle) * force;
          b.vy -= Math.sin(angle) * force;
        }

        // Bound check
        if (b.x < -b.size) b.x = canvas.width + b.size;
        if (b.x > canvas.width + b.size) b.x = -b.size;
        if (b.y < -b.size) b.y = canvas.height + b.size;
        if (b.y > canvas.height + b.size) b.y = -b.size;

        // Draw
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.size);
        gradient.addColorStop(0, b.color);
        gradient.addColorStop(1, "transparent");
        
        ctx.globalAlpha = b.opacity;
        ctx.fillStyle = gradient;
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-50"
      style={{ filter: "blur(20px)" }}
    />
  );
}
