"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideHeart, LucideSparkles, LucideMoon, LucideGhost } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  subtext: string;
  icon: React.ReactNode;
  yesLabel: string;
  noLabel: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Is your heart feeling light today?",
    subtext: "I hope you've found a moment of peace in the noise of the day.",
    icon: <LucideHeart className="w-12 h-12 text-pink-400" />,
    yesLabel: "It is now ✨",
    noLabel: "Not yet..."
  },
  {
    id: 2,
    text: "Do you believe in digital magic?",
    subtext: "Small pixels, when put together with love, can hold a lot of warmth.",
    icon: <LucideSparkles className="w-12 h-12 text-amber-300" />,
    yesLabel: "Absolutely",
    noLabel: "Maybe?"
  },
  {
    id: 3,
    text: "Are you comfortable in this corner of the internet?",
    subtext: "I built this specifically to be a safe, quiet space just for you.",
    icon: <LucideMoon className="w-12 h-12 text-indigo-300" />,
    yesLabel: "Very much so",
    noLabel: "Where am I?"
  },
  {
    id: 4,
    text: "Finally... do you truly like this surprise?",
    subtext: "Every detail was crafted thinking of what might make you smile.",
    icon: <LucideSparkles className="w-12 h-12 text-accent-primary" />,
    yesLabel: "I love it! 💝",
    noLabel: "No"
  }
];

const QuestionBox = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
      setNoCount(0);
      setNoButtonPos({ x: 0, y: 0 });
    } else {
      setIsFinished(true);
    }
  };

  const handleNoHover = useCallback(() => {
    if (currentStep === QUESTIONS.length - 1) {
      const radius = 150 + (noCount * 20);
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      setNoButtonPos({ x, y });
      setNoCount(prev => prev + 1);
    }
  }, [currentStep, noCount]);

  const getNoMessage = () => {
    const messages = [
      "Wait, what? Are you sure? 😟",
      "That actually hurt a bit... try again? 😢",
      "Please don't do this to me! 💔",
      "I worked so hard on this... 🥺",
      "Is it the colors? I can change them! 😔",
      "Are you just testing my patience now? 😒",
      "Okay, that's enough. Click Yes! 😠",
      "I'm going to cry for real... 😤",
      "My heart is literally melting... 🫠",
      "I'll ignore you if you keep doing this! 🛑"
    ];
    return messages[Math.min(noCount - 1, messages.length - 1)];
  };

  const yesButtonScale = 1 + (noCount * 0.15);

  const currentQuestion = QUESTIONS[currentStep];

  return (
    <div className="relative w-full max-w-2xl mx-auto min-h-[550px] flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {isFinished ? (
          <motion.div
            key="finish"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass p-16 rounded-[4rem] text-center space-y-8 relative overflow-hidden group w-full border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
          >
            {/* Background Animated Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-transparent to-accent-secondary/10 opacity-50 mix-blend-overlay" />
            
            <motion.div 
              animate={{ 
                scale: [1, 1.15, 1],
                filter: ["drop-shadow(0 0 10px rgba(255,175,189,0.3))", "drop-shadow(0 0 30px rgba(255,175,189,0.6))", "drop-shadow(0 0 10px rgba(255,175,189,0.3))"]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-8xl relative z-10"
            >
              💝✨💖
            </motion.div>
            <div className="space-y-4">
              <h3 className="text-5xl md:text-6xl font-playfair italic relative z-10 text-accent-gradient">Yay! My Heart is Full!</h3>
              <p className="text-foreground/60 text-xl font-light leading-relaxed max-w-sm mx-auto relative z-10 italic">
                "Small pixels, when put together with love, can hold a lot of warmth. Thank you for smiling."
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, letterSpacing: "0.5em" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsFinished(false);
                setCurrentStep(0);
                setNoCount(0);
                setNoButtonPos({ x: 0, y: 0 });
              }}
              className="px-10 py-4 text-[10px] uppercase tracking-[0.4em] text-foreground/40 hover:text-foreground transition-all font-bold relative z-10 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] rounded-full"
            >
              Start Over
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30, filter: 'blur(15px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -30, filter: 'blur(15px)' }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="glass p-12 md:p-20 rounded-[4rem] text-center w-full relative z-10 border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Internal Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -40, 0],
                    x: [0, (i % 2 === 0 ? 15 : -15), 0],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                  className="absolute w-1 h-1 bg-accent-primary rounded-full blur-[1px]"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`
                  }}
                />
              ))}
            </div>

            {/* Step Indicator */}
            <div className="absolute top-10 left-0 w-full flex justify-center gap-3">
              {QUESTIONS.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-700 ${
                    idx === currentStep 
                    ? 'w-12 bg-gradient-to-r from-accent-primary to-accent-secondary' 
                    : 'w-3 bg-white/5'
                  }`}
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12 flex justify-center"
            >
              <div className="relative group/icon">
                 <div className="absolute inset-0 bg-accent-primary/20 blur-2xl rounded-full opacity-0 group-hover/icon:opacity-100 transition-opacity duration-700" />
                 <div className="w-28 h-28 rounded-[2rem] bg-white/5 flex items-center justify-center border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] backdrop-blur-sm relative z-10">
                    {currentQuestion.icon}
                 </div>
              </div>
            </motion.div>

            <div className="space-y-6 min-h-[180px] flex flex-col justify-center relative z-10">
              <h3 className="text-3xl md:text-5xl font-playfair italic leading-tight tracking-tight">
                {noCount > 0 && currentStep === QUESTIONS.length - 1 ? getNoMessage() : currentQuestion.text}
              </h3>
              <p className="text-foreground/30 text-lg md:text-xl font-light italic leading-relaxed max-w-sm mx-auto">
                {currentQuestion.subtext}
              </p>
            </div>

            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 relative z-20">
              <motion.button
                style={{ scale: currentStep === QUESTIONS.length - 1 ? yesButtonScale : 1 }}
                whileHover={{ 
                  scale: (currentStep === QUESTIONS.length - 1 ? yesButtonScale : 1) * 1.05,
                  boxShadow: "0 20px 40px rgba(255, 175, 189, 0.2)"
                }}
                whileTap={{ scale: (currentStep === QUESTIONS.length - 1 ? yesButtonScale : 1) * 0.95 }}
                onClick={handleNext}
                className="px-16 py-7 bg-white text-black rounded-full font-bold text-lg tracking-wider shadow-2xl transition-all duration-300 transform"
              >
                {currentQuestion.yesLabel}
              </motion.button>
              
              <motion.button
                animate={{
                  x: noButtonPos.x,
                  y: noButtonPos.y,
                  opacity: (currentStep === QUESTIONS.length - 1 && noCount > 12) ? 0 : 1,
                  scale: (currentStep === QUESTIONS.length - 1 && noCount > 10) ? 0.8 : 1
                }}
                onMouseEnter={handleNoHover}
                onClick={() => {
                   if (currentStep < QUESTIONS.length - 1) handleNext();
                }}
                className="px-10 py-6 glass border-white/10 text-foreground/40 hover:text-foreground hover:bg-white/5 transition-all font-medium text-lg rounded-full"
              >
                {currentStep === QUESTIONS.length - 1 ? (noCount > 15 ? "Fine..." : currentQuestion.noLabel) : currentQuestion.noLabel}
              </motion.button>
            </div>
            
            {/* Subtle glow follows current icon flavor */}
            <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-accent-primary/5 blur-[100px] rounded-full pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Decorative Orbs outside */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-10 -right-10 w-32 h-32 bg-accent-secondary/10 blur-3xl rounded-full" 
      />
    </div>
  );
};

export default QuestionBox;

