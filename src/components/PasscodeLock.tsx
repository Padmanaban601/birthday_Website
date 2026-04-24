"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LucideDelete, 
  LucideLock, 
  LucideHeart, 
  LucideScan, 
  LucideXCircle, 
  LucideGift, 
  LucideAlertCircle,
  LucideShieldAlert,
  LucideGhost
} from 'lucide-react';

interface PasscodeLockProps {
  onSuccess: () => void;
}

const CORRECT_PASSCODE = "1506"; 

const getReaction = (wrongCount: number) => {
  const reactions = [
    { 
      icon: <LucideShieldAlert className="w-24 h-24 text-red-500" />, 
      title: "HOW DARE YOU!", 
      subtitle: "Wrong code detected. Are you an intruder?",
      color: "from-red-50 to-red-100"
    },
    { 
      icon: <LucideGhost className="w-24 h-24 text-orange-500" />, 
      title: "NICE TRY!", 
      subtitle: "The bunny is watching you. Try again...",
      color: "from-orange-50 to-orange-100"
    },
    { 
      icon: <LucideXCircle className="w-24 h-24 text-pink-600" />, 
      title: "REALLY?", 
      subtitle: "The cat is not amused. Think harder!",
      color: "from-pink-50 to-pink-100"
    }
  ];
  
  return reactions[wrongCount % reactions.length];
};

const WrongReactionDisplay = ({ count }: { count: number }) => {
  const reaction = getReaction(count);

  return (
    <div className={`w-full aspect-square rounded-[2rem] bg-gradient-to-br ${reaction.color} flex flex-col items-center justify-center p-8 space-y-6 border-4 border-white shadow-inner`}>
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
      >
        {reaction.icon}
      </motion.div>
      <div className="space-y-2">
          <h3 className="text-2xl font-black text-gray-800 tracking-tight">{reaction.title}</h3>
          <p className="text-sm text-gray-500 font-medium italic">{reaction.subtitle}</p>
      </div>
    </div>
  );
};

export default function PasscodeLock({ onSuccess }: PasscodeLockProps) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showGiftAccept, setShowGiftAccept] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);

  const handleNumberClick = (num: string) => {
    if (passcode.length < 4) {
      setPasscode(prev => prev + num);
      setError(null);
    }
  };

  const handleDelete = () => {
    setPasscode(prev => prev.slice(0, -1));
  };

  useEffect(() => {
    if (passcode.length === 4) {
      if (passcode === CORRECT_PASSCODE) {
        setTimeout(() => setShowGiftAccept(true), 0);
      } else {
        const timer = setTimeout(() => {
          setWrongCount(prev => prev + 1);
          setError("incorrect");
          setPasscode("");
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [passcode]);

  if (showGiftAccept) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[100] bg-[#FFDEE9] flex flex-col items-center justify-center p-8"
      >
        <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="max-w-md w-full bg-white rounded-[3rem] p-12 shadow-2xl text-center space-y-8 border-8 border-[#FF8E9E]/20"
        >
            <motion.div 
                animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-48 h-48 mx-auto flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 rounded-[3rem] shadow-lg border-4 border-white"
            >
                <LucideGift className="w-24 h-24 text-[#FF4D6D] drop-shadow-lg" />
                <div className="absolute inset-0 bg-white/30 blur-2xl rounded-full scale-50 animate-pulse" />
            </motion.div>
            
            <div className="space-y-4">
                <h2 className="text-3xl font-black text-[#FF4D6D] uppercase tracking-tight">Pls Accept the Gift</h2>
                <p className="text-[#FF8E9E] font-bold italic leading-relaxed">
                    &quot;I spent a lot of time on this <br />just for you...&quot;
                </p>
            </div>
            
            <div className="flex gap-4">
                <button 
                    onClick={onSuccess}
                    className="flex-1 py-4 bg-[#FF4D6D] text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-[#FF4D6D]/40 active:scale-95"
                >
                    Yes
                </button>
                <button 
                    onClick={() => {
                        setWrongCount(prev => prev + 1);
                        setShowGiftAccept(false);
                        setPasscode("");
                    }}
                    className="flex-1 py-4 bg-[#FFE5E9] text-[#FF4D6D] rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:border-[#FF4D6D] border-2 border-transparent transition-all active:scale-95"
                >
                    No
                </button>
            </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#FFDEE9] flex items-center justify-center overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-20">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF8E9E] blur-[150px] rounded-full animate-pulse" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FF8E9E] blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
            className="fixed inset-0 z-[110] bg-black/80 flex flex-col items-center justify-center p-8 backdrop-blur-sm"
          >
            <div className="max-w-sm w-full bg-white rounded-[3.5rem] p-10 text-center space-y-8 shadow-[0_0_50px_rgba(255,77,109,0.3)] border-4 border-white">
                <WrongReactionDisplay count={wrongCount} />
                <button 
                    onClick={() => setError(null)}
                    className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-transform active:scale-95"
                >
                    Try Again
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md px-6 flex flex-col items-center"
      >
        <div className="mb-12 text-center space-y-4">
            <motion.div 
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto shadow-xl mb-6 border-4 border-white"
            >
                <LucideLock className="w-10 h-10 text-[#FF4D6D]" />
            </motion.div>
            <h1 className="text-4xl font-black text-[#FF4D6D] tracking-tight uppercase">Entre a passcode</h1>
            <p className="text-[#FF8E9E] font-medium tracking-wide">A secret just for us...</p>
        </div>

        <div className="flex gap-4 mb-16">
          {[0, 1, 2, 3].map((idx) => (
            <motion.div
              key={idx}
              animate={passcode.length > idx ? { scale: [1, 1.2, 1], backgroundColor: '#FF4D6D' } : { scale: 1, backgroundColor: '#FFFFFF' }}
              className="w-5 h-5 rounded-full shadow-inner border-2 border-[#FF8E9E]/30"
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className="w-full aspect-square rounded-[2rem] bg-white text-3xl font-black text-[#FF4D6D] shadow-lg shadow-[#FF8E9E]/20 hover:bg-[#FF4D6D] hover:text-white transition-all active:scale-90 flex items-center justify-center border-4 border-transparent hover:border-white/50"
            >
              {num}
            </button>
          ))}
          <div className="w-full aspect-square rounded-[2rem] flex items-center justify-center text-[#FF8E9E]/30">
             <LucideHeart className="w-8 h-8 fill-current" />
          </div>
          <button
            onClick={() => handleNumberClick("0")}
            className="w-full aspect-square rounded-[2rem] bg-white text-3xl font-black text-[#FF4D6D] shadow-lg shadow-[#FF8E9E]/20 hover:bg-[#FF4D6D] hover:text-white transition-all active:scale-90 flex items-center justify-center border-4 border-transparent hover:border-white/50"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="w-full aspect-square rounded-[2rem] bg-[#FFE5E9] flex items-center justify-center text-[#FF4D6D] shadow-lg shadow-[#FF8E9E]/10 hover:bg-[#FF4D6D] hover:text-white transition-all active:scale-90"
          >
            <LucideDelete className="w-8 h-8" />
          </button>
        </div>

        <div className="mt-16 text-center space-y-4">
            <div className="w-16 h-16 bg-white/40 rounded-full mx-auto flex items-center justify-center border-2 border-dashed border-[#FF8E9E] relative overflow-hidden">
                <LucideScan className="w-8 h-8 text-[#FF8E9E] opacity-60" />
                <motion.div 
                    animate={{ y: [-20, 20, -20] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-x-0 h-px bg-[#FF4D6D] shadow-[0_0_10px_#FF4D6D]"
                />
            </div>
            <p className="text-[10px] uppercase font-black tracking-[0.4em] text-[#FF8E9E]">Security Check</p>
        </div>
      </motion.div>
    </div>
  );
}
