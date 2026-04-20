"use client";

import React from 'react';
import Section from '@/components/Section';
import { LucideCloudRain, LucideCoffee, LucideStar, LucidePlane, LucideMusic } from 'lucide-react';

const memories = [
  {
    icon: <LucideCloudRain className="w-10 h-10" />,
    title: "The Subtle Spark",
    description: "That unexpected moment when everything felt a little clearer, even if it was just for a second.",
    color: "text-blue-300"
  },
  {
    icon: <LucideCoffee className="w-10 h-10" />,
    title: "A Shared Quiet",
    description: "The comfort in not needing to fill the silence. A simple presence that spoke more than words.",
    color: "text-orange-200"
  },
  {
    icon: <LucidePlane className="w-10 h-10" />,
    title: "Passing Thoughts",
    description: "Like a paper plane drifting in the breeze—gentle thoughts of you that come and go, always light.",
    color: "text-primary-lavender"
  },
  {
    icon: <LucideMusic className="w-10 h-10" />,
    title: "A Background Melody",
    description: "The way your laugh reminds me of a song I can't quite name but never want to forget.",
    color: "text-soft-pink"
  }
];

export default function MemoriesPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 mb-24 text-center">
        <h1 className="text-5xl font-playfair mb-6 tracking-tight">Symbolic Memories</h1>
        <p className="text-foreground/60 font-light max-w-lg mx-auto leading-relaxed">
          Small fragments of time that remain vivid. Not as a weight, but as a gentle constellation.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {memories.map((memory, index) => (
          <Section key={index} className="py-0">
            <div className="glass p-10 rounded-[2.5rem] h-full flex flex-col items-start hover:-translate-y-2 transition-transform duration-500">
              <div className={`mb-8 p-4 rounded-2xl bg-white/5 ${memory.color}`}>
                {memory.icon}
              </div>
              <h2 className="text-2xl font-playfair mb-4 text-white/90">{memory.title}</h2>
              <p className="text-foreground/60 font-light leading-relaxed">
                {memory.description}
              </p>
            </div>
          </Section>
        ))}
      </div>

      <Section className="mt-32 text-center">
        <div className="relative inline-block">
          <LucideStar className="w-12 h-12 text-primary-lavender/30 animate-pulse absolute -top-16 left-1/2 -translate-x-1/2" />
          <h3 className="text-2xl font-playfair italic mb-4">"Keep dreaming, keep being."</h3>
          <p className="text-foreground/40 font-light italic">Every memory is a star in a quiet sky.</p>
        </div>
      </Section>
    </div>
  );
}
