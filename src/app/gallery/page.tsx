"use client";

import React from 'react';
import Section from '@/components/Section';
import Image from 'next/image';

const items = [
  {
    src: "https://images.unsplash.com/photo-1470252649358-96753a780fa1?q=80&w=2070&auto=format&fit=crop",
    title: "Moonlight Serenade",
    description: "A soft glow in the quietest part of the night."
  },
  {
    src: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=2070&auto=format&fit=crop", 
    title: "Celestial Dream",
    description: "Finding beauty in the vastness of the unknown."
  },
  {
    src: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1780&auto=format&fit=crop",
    title: "Whispering Flowers",
    description: "Delicate and resilient, just like your spirit."
  },
  {
    src: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?q=80&w=1974&auto=format&fit=crop",
    title: "The Starry Path",
    description: "Every wish is a step on a journey of light."
  }
];

export default function GalleryPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 mb-20 text-center">
        <h1 className="text-5xl font-playfair mb-6 tracking-tight">Artistic Gallery</h1>
        <p className="text-foreground/60 font-light max-w-lg mx-auto leading-relaxed">
          Visual echoes of a quiet wish. A blend of moonlight, stars, and soft silhouettes.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {items.map((item, index) => (
          <Section key={index} className="py-0">
            <div className="group relative overflow-hidden rounded-[2.5rem] glass aspect-[4/5] md:aspect-square flex items-center justify-center">
              {item.src ? (
                <Image 
                  src={item.src} 
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjYjE5Y2Q5MTUiLz48L3N2Zz4="
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${item.gradient} flex items-center justify-center p-12`}>
                   <div className="w-full h-full border border-white/5 rounded-3xl flex items-center justify-center italic text-foreground/20 font-light text-center">
                      Artistically Inspired <br /> Representation
                   </div>
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-12">
                <h3 className="text-2xl font-playfair mb-2 text-white">{item.title}</h3>
                <p className="text-white/60 font-light text-sm">{item.description}</p>
              </div>
            </div>
          </Section>
        ))}
      </div>

      <Section className="mt-20 text-center">
        <p className="text-foreground/30 font-light tracking-widest uppercase text-xs">
          More moments being captured in the moonlight...
        </p>
      </Section>
    </div>
  );
}
