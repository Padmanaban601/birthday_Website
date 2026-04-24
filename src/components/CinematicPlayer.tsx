"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucidePlay, LucidePause, LucideMaximize, LucideVolume2, LucideVolumeX, LucideRotateCcw } from "lucide-react";

interface CinematicPlayerProps {
  src: string;
  poster: string;
  onPlay?: () => void;
}

export default function CinematicPlayer({ src, poster, onPlay }: CinematicPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        if (onPlay) onPlay();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const restart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div 
      className="relative w-full h-full group overflow-hidden cursor-pointer"
      onMouseMove={handleMouseMove}
      onClick={togglePlay}
    >
      {/* Ambient Glow */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-accent-primary/20 blur-[100px] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <video
        ref={videoRef}
        src={src}
        poster={poster}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="w-full h-full object-cover"
        playsInline
      />

      {/* Overlay controls */}
      <AnimatePresence>
        {(!isPlaying || showControls) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex flex-col justify-between p-6 md:p-10"
          >
            {/* Top Info */}
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-bold">Now Playing</span>
                <h4 className="text-white font-serif italic text-2xl md:text-4xl">A Birthday Journey</h4>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-all"
                >
                  {isMuted ? <LucideVolumeX className="w-5 h-5" /> : <LucideVolume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Center Play Button */}
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full glass flex items-center justify-center border border-white/30 text-white shadow-2xl">
                {isPlaying ? <LucidePause className="w-10 h-10 fill-current" /> : <LucidePlay className="w-10 h-10 fill-current translate-x-1" />}
              </div>
            </motion.div>

            {/* Bottom Controls */}
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden backdrop-blur-md">
                <motion.div 
                  className="h-full bg-accent-primary shadow-[0_0_15px_rgba(255,175,189,1)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <div className="flex justify-between items-center">
                 <button 
                   onClick={(e) => { e.stopPropagation(); restart(); }}
                   className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-all font-bold"
                 >
                   <LucideRotateCcw className="w-4 h-4" /> Restart
                 </button>
                 <div className="flex items-center gap-6">
                    <span className="text-[10px] text-white/40 font-mono tracking-tighter">HD 1080P</span>
                    <LucideMaximize className="w-5 h-5 text-white/60 hover:text-white" />
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
