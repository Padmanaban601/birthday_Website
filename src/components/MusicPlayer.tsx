"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideVolume2, LucideVolumeX, LucideSkipForward, LucideSkipBack, LucideListMusic, LucideCirclePlay, LucideCirclePause, LucideHeart } from 'lucide-react';
import { trackMilestone } from '@/lib/analytics';
import { useAudio } from './AudioProvider';

const playlist = [
  {
    title: "Happy Birthday",
    artist: "A Special Wish for You",
    url: "https://archive.org/download/HappyBirthday_201311/Happy%20Birthday.mp3"
  }
];

const MusicPlayer = ({ autoPlayTrigger }: { autoPlayTrigger?: boolean }) => {
  const { audioRef, isPlaying, setIsPlaying } = useAudio();
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    if (autoPlayTrigger) {
      setTimeout(() => setIsPlaying(true), 0);
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Auto-play failed:", e));
      }
    }
  }, [autoPlayTrigger, setIsPlaying, audioRef]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
    }
  }, [currentTrackIndex, isPlaying, audioRef]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        trackMilestone("Music Played", { track: currentTrack.title });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    trackMilestone("Music Skipped Forward", { to: playlist[nextIndex].title });
  };

  const prevTrack = () => {
    const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(prevIndex);
    trackMilestone("Music Skipped Backward", { to: playlist[prevIndex].title });
  };

  return (
    <div className="fixed bottom-12 right-12 z-[100] flex flex-col items-end gap-6">
      <AnimatePresence>
        {showPlaylist && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8, y: 40, filter: 'blur(10px)' }}
            className="bg-white/95 backdrop-blur-3xl p-8 rounded-[3rem] w-80 shadow-[0_30px_60px_rgba(255,175,189,0.1)] mb-4 relative z-10 overflow-hidden border border-white"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-primary to-accent-secondary opacity-50" />
            <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent-primary/60 mb-8 px-2">Stellar Playlist</h4>
            <div className="space-y-3">
              {playlist.map((track, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentTrackIndex(index);
                    setIsPlaying(true);
                  }}
                  className={`w-full text-left px-5 py-4 rounded-2xl transition-all flex items-center justify-between group ${
                    currentTrackIndex === index 
                    ? 'bg-white/10 border border-white/10' 
                    : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <span className={`text-sm font-medium ${currentTrackIndex === index ? 'text-white' : 'text-foreground/50 group-hover:text-foreground/80'}`}>
                      {track.title}
                    </span>
                    <span className="text-[10px] text-foreground/30">{track.artist}</span>
                  </div>
                  {currentTrackIndex === index && isPlaying && (
                    <div className="flex gap-0.5">
                       {[1, 2, 3].map(i => (
                         <motion.div 
                           key={i}
                           animate={{ height: [4, 12, 4] }}
                           transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                           className="w-0.5 bg-accent-primary"
                         />
                       ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4">
        {/* Main Player Pill */}
        <motion.div 
          layout
          className="bg-white/80 backdrop-blur-2xl rounded-full p-2 flex items-center gap-2 shadow-[0_20px_50px_rgba(255,175,189,0.1)] border border-white overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {isPlaying && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="flex items-center gap-4 px-4 overflow-hidden whitespace-nowrap"
              >
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-[0.3em] text-accent-tertiary">Live Now</span>
                  <span className="text-xs font-bold max-w-[100px] truncate">{currentTrack.title}</span>
                </div>
                
                <div className="flex items-center gap-3 border-l border-white/10 pl-4 h-6">
                  <button onClick={prevTrack} className="text-foreground/30 hover:text-foreground transition-colors">
                    <LucideSkipBack className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={nextTrack} className="text-foreground/30 hover:text-foreground transition-colors">
                    <LucideSkipForward className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-1">
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${showPlaylist ? 'bg-accent-primary text-white' : 'hover:bg-white/10 text-foreground/40 hover:text-foreground'}`}
            >
              <LucideListMusic className="w-5 h-5" />
            </button>

            <button
              onClick={async () => {
                trackMilestone("Heart Reaction Sent", { time: new Date().toLocaleTimeString() });
              }}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 text-accent-primary hover:bg-accent-primary/10 hover:scale-110 active:scale-95 transition-all"
            >
              <LucideHeart className="w-5 h-5 fill-current" />
            </button>

            <button
              onClick={togglePlay}
              className="relative w-12 h-12 bg-accent-primary text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,175,189,0.3)]"
            >
              <audio
                ref={audioRef}
                src={currentTrack.url}
                loop
                onEnded={nextTrack}
                crossOrigin="anonymous"
              />
              {isPlaying ? <LucideCirclePause className="w-6 h-6" /> : <LucideCirclePlay className="w-6 h-6" />}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MusicPlayer;

