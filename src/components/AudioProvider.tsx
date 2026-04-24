"use client";

import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";

interface AudioContextType {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  analyserRef: React.RefObject<AnalyserNode | null>;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  getFrequencyData: () => Uint8Array;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isPlaying && !audioContextRef.current && audioRef.current) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        const src = ctx.createMediaElementSource(audioRef.current);
        const ana = ctx.createAnalyser();
        
        src.connect(ana);
        ana.connect(ctx.destination);
        
        ana.fftSize = 256;
        const bufferLength = ana.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);
        
        analyserRef.current = ana;
        audioContextRef.current = ctx;

        if (ctx.state === 'suspended') {
          ctx.resume();
        }
      } catch (e) {
        console.warn("Audio context creation failed:", e);
      }
    }
  }, [isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const getFrequencyData = useCallback(() => {
    const ana = analyserRef.current;
    const data = dataArrayRef.current;
    if (ana && data && data.length > 0) {
      (ana as any).getByteFrequencyData(data);
    }
    return data || new Uint8Array(0);
  }, []);

  return (
    <AudioContext.Provider value={{ audioRef, analyserRef, isPlaying, setIsPlaying, getFrequencyData }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}


