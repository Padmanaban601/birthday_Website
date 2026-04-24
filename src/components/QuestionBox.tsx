"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideHeart, LucideSparkles, LucideMoon, LucideGhost } from 'lucide-react';
import { trackMilestone } from '@/lib/analytics';

interface Question {
  id: number;
  text: string;
  subtext: string;
  icon?: React.ReactNode;
  image: string;
  yesLabel: string;
  noLabel: string;
}


const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Does this digital world feel warm to you?",
    subtext: "I tried to capture a bit of sunshine in these pixels, just for you.",
    image: "/assets/q-warmth.png",
    yesLabel: "It feels like home ✨",
    noLabel: "A bit chilly"
  },
  {
    id: 2,
    text: "Do you like the little details?",
    subtext: "Every sparkle and soft shadow was placed thinking of your smile.",
    image: "/assets/q-details.png",
    yesLabel: "They are lovely",
    noLabel: "Didn't notice"
  },
  {
    id: 3,
    text: "Is your heart smiling right now?",
    subtext: "Because that was the whole point of this entire quiet wish.",
    image: "/assets/q-heart.png",
    yesLabel: "It really is",
    noLabel: "Not yet..."
  },
  {
    id: 4,
    text: "Final check... are you happy you came here today?",
    subtext: "Your presence is the most beautiful part of this entire surprise.",
    image: "/assets/q-joy.png",
    yesLabel: "I'm so glad! 💝",
    noLabel: "No"
  }
];


const QuestionBox = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [finalMessage, setFinalMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleNext = (label?: string) => {
    if (label) {
      setAnswers(prev => ({ ...prev, [QUESTIONS[currentStep].id]: label }));
    }

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
      setNoCount(0);
      setNoButtonPos({ x: 0, y: 0 });
    } else {
      setIsFinished(true);
    }
  };

  const handleFinalSubmit = async () => {
    setIsSending(true);
    await trackMilestone("Birthday Response Received", {
      answers,
      message: finalMessage,
      browser: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
    });
    setIsSending(false);
    setIsSent(true);
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
    <div className="relative w-full max-w-2xl mx-auto min-h-[450px] md:min-h-[550px] flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {isFinished ? (
          <motion.div
            key="finish"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-3xl p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] text-center space-y-6 md:space-y-8 relative overflow-hidden group w-full border border-white shadow-[0_40px_100px_-20px_rgba(255,175,189,0.2)]"
          >
            {/* Background Animated Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-transparent to-accent-secondary/10 opacity-50 mix-blend-overlay" />
            
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="relative z-10 w-48 h-48 mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/20"
            >
              <img src="/assets/cat-happy.png" alt="Happy Cat" className="w-full h-full object-cover" />
            </motion.div>
            
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none"
            >
               <img src="/assets/success.png" alt="Success Bloom" className="w-full h-full object-contain opacity-20 blur-xl" />
            </motion.div>


            <div className="space-y-4">
              <h3 className="text-3xl md:text-6xl font-playfair italic relative z-10 text-accent-gradient">
                {isSent ? "Message Sent! 💝" : "Leave a Note?"}
              </h3>
              <p className="text-lg md:text-xl text-foreground/60 font-light leading-relaxed max-w-sm mx-auto relative z-10 italic">
                {isSent 
                  ? "Thank you for the beautiful response. I'll cherish it forever." 
                  : "If you'd like to say something back, I'd love to hear it. This stays between us."
                }
              </p>
            </div>

            {!isSent ? (
              <div className="space-y-6 relative z-10">
                <textarea
                  value={finalMessage}
                  onChange={(e) => setFinalMessage(e.target.value)}
                  placeholder="Write a little something..."
                  className="w-full bg-white/20 backdrop-blur-md border border-white/40 rounded-3xl p-6 text-foreground placeholder:text-foreground/20 focus:outline-none focus:ring-2 focus:ring-accent-primary/30 transition-all min-h-[120px] text-lg font-light italic"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFinalSubmit}
                  disabled={isSending}
                  className="w-full py-5 bg-accent-primary text-white rounded-full font-bold text-lg tracking-widest shadow-xl disabled:opacity-50"
                >
                  {isSending ? "Sending..." : "Send Message"}
                </motion.button>
              </div>
            ) : (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => {
                  setIsFinished(false);
                  setCurrentStep(0);
                  setNoCount(0);
                  setNoButtonPos({ x: 0, y: 0 });
                  setIsSent(false);
                  setFinalMessage("");
                }}
                className="px-10 py-4 text-[10px] uppercase tracking-[0.4em] text-foreground/40 hover:text-foreground transition-all font-bold relative z-10 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] rounded-full"
              >
                Start Over
              </motion.button>
            )}

          </motion.div>
        ) : (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30, filter: 'blur(15px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -30, filter: 'blur(15px)' }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="bg-white/40 backdrop-blur-3xl p-8 md:p-20 rounded-[2.5rem] md:rounded-[4rem] text-center w-full relative z-10 border border-white shadow-xl overflow-hidden"
          >
            {/* Internal Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {(() => {
                // Pre-generating random values to avoid Math.random() in render
                const particles = Array.from({ length: 8 }, (_, i) => ({
                  top: `${(i * 13) % 100}%`,
                  left: `${(i * 27) % 100}%`,
                  duration: 3 + (i % 5),
                  delay: i * 0.5,
                  xOffset: (i % 2 === 0 ? 15 : -15)
                }));
                
                return particles.map((p, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -40, 0],
                      x: [0, p.xOffset, 0],
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                      duration: p.duration,
                      repeat: Infinity,
                      delay: p.delay
                    }}
                    className="absolute w-1 h-1 bg-accent-primary rounded-full blur-[1px]"
                    style={{
                      top: p.top,
                      left: p.left
                    }}
                  />
                ));
              })()}
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
                 <div className="absolute inset-0 bg-accent-primary/20 blur-3xl rounded-full opacity-0 group-hover/icon:opacity-100 transition-opacity duration-700" />
                 <div className="w-24 h-24 md:w-40 md:h-40 rounded-3xl md:rounded-[2.5rem] bg-white/10 flex items-center justify-center border border-white/20 shadow-2xl backdrop-blur-sm relative z-10 overflow-hidden">
                    <img 
                      src={
                        (noCount > 8 && currentStep === QUESTIONS.length - 1) ? "/assets/cat-gun.png" :
                        (noCount > 0 && currentStep === QUESTIONS.length - 1) ? "/assets/cat-angry.png" :
                        currentQuestion.image
                      } 
                      alt="Step Visual" 
                      className={`w-full h-full object-cover transition-all duration-700 ${noCount > 5 ? 'scale-125 saturate-150' : 'group-hover/icon:scale-110'}`} 
                    />
                 </div>

              </div>

            </motion.div>

            <div className="space-y-4 md:space-y-6 min-h-[140px] md:min-h-[180px] flex flex-col justify-center relative z-10">
              <h3 className="text-2xl md:text-5xl font-playfair italic leading-tight tracking-tight">
                {noCount > 0 && currentStep === QUESTIONS.length - 1 ? getNoMessage() : currentQuestion.text}
              </h3>
              <p className="text-foreground/30 text-base md:text-xl font-light italic leading-relaxed max-w-sm mx-auto px-4">
                {currentQuestion.subtext}
              </p>
            </div>

            <div className="mt-10 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 relative z-20 px-4">
              <motion.button
                style={{ scale: currentStep === QUESTIONS.length - 1 ? yesButtonScale : 1 }}
                whileHover={{ 
                  scale: (currentStep === QUESTIONS.length - 1 ? yesButtonScale : 1) * 1.05,
                  boxShadow: "0 20px 40px rgba(255, 175, 189, 0.3)"
                }}
                whileTap={{ scale: (currentStep === QUESTIONS.length - 1 ? yesButtonScale : 1) * 0.95 }}
                onClick={() => handleNext(currentQuestion.yesLabel)}
                className="w-full sm:w-auto px-8 md:px-16 py-4 md:py-7 bg-accent-primary text-white rounded-full font-bold text-base md:text-lg tracking-wider shadow-2xl transition-all duration-300 transform"
              >
                {currentQuestion.yesLabel}
              </motion.button>
              
              <motion.button
                animate={{
                  x: noButtonPos.x,
                  y: noButtonPos.y,
                  opacity: (currentStep === QUESTIONS.length - 1 && noCount > 12) ? 0 : 1,
                  scale: (currentStep === QUESTIONS.length - 1 && noCount > 10) ? 0.6 : 1,
                  rotate: noButtonPos.x / 10
                }}
                onMouseEnter={handleNoHover}
                onClick={() => {
                   if (currentStep < QUESTIONS.length - 1) handleNext(currentQuestion.noLabel);
                }}
                className="w-full sm:w-auto px-6 md:px-10 py-4 md:py-6 bg-gray-100/50 backdrop-blur-md border border-white text-gray-400 hover:text-gray-600 transition-all font-medium text-base md:text-lg rounded-full"
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

