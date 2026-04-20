"use client";

import React from 'react';
import Section from '@/components/Section';
import { LucideQuote, LucideHeart } from 'lucide-react';

const wishes = [
  {
    title: "Happiness",
    message: "May your day be filled with the kind of joy that stays with you, long after the stars come out.",
    icon: <LucideQuote className="w-8 h-8 text-primary-lavender/40" />
  },
  {
    title: "Peace",
    message: "I wish for you a path that is gentle, and a heart that feels light, today and every day.",
    icon: <LucideHeart className="w-8 h-8 text-soft-pink/40" />
  },
  {
    title: "Growth",
    message: "Watching you become who you are is a gift. May you continue to bloom in your own beautiful time.",
    icon: <LucideSparkles className="w-8 h-8 text-moonlight/40" />
  },
  {
    title: "The Quiet Wish",
    message: "No expectations, no noise—just a quiet hope that you are exactly where you want to be.",
    social: "— A quiet wish"
  }
];

import { LucideSparkles } from 'lucide-react';

export default function WishesPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 mb-20 text-center">
        <h1 className="text-5xl font-playfair mb-6">Heartfelt Wishes</h1>
        <p className="text-foreground/60 font-light">Words that I carry quietly, shared just for today.</p>
      </div>

      <div className="space-y-12">
        {wishes.map((wish, index) => (
          <Section key={index} className="flex justify-center">
            <div className="glass p-12 rounded-[2rem] w-full max-w-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                {wish.icon}
              </div>
              
              <h2 className="text-2xl font-playfair mb-4 text-primary-lavender">{wish.title}</h2>
              <p className="text-xl text-foreground/80 leading-relaxed font-light italic">
                "{wish.message}"
              </p>
              
              {wish.social && (
                <p className="mt-8 text-sm tracking-widest uppercase text-foreground/40">{wish.social}</p>
              )}
            </div>
          </Section>
        ))}
      </div>

      <Section className="text-center mt-20">
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary-lavender/30 to-transparent mx-auto mb-8" />
        <p className="text-foreground/40 italic font-light max-w-sm mx-auto">
          "Sometimes the most sincere wishes are the ones that don't need an answer."
        </p>
      </Section>
    </div>
  );
}
