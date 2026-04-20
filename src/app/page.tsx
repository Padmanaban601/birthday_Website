"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { LucideChevronDown, LucideSparkles } from 'lucide-react';
import Section from '@/components/Section';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.to(heroRef.current, { opacity: 1, duration: 1.5, ease: "power2.inOut" })
      .from(titleRef.current, { 
        y: 100, 
        opacity: 0, 
        duration: 1.2, 
        ease: "power4.out" 
      }, "-=0.5")
      .from(subtitleRef.current, { 
        y: 20, 
        opacity: 0, 
        duration: 1, 
        ease: "power3.out" 
      }, "-=0.8");
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex flex-col items-center justify-center text-center opacity-0 overflow-hidden"
      >
        {/* Background Visual */}
        <div className="absolute inset-0 -z-10 bg-black">
          <Image 
            src="https://images.unsplash.com/photo-1532767153582-b1a0e5145009?q=80&w=1887&auto=format&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover opacity-40 blur-[2px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        </div>
        
        <div className="relative z-10 px-6">
          <div className="flex items-center justify-center gap-2 mb-6 animate-float">
            <LucideSparkles className="w-5 h-5 text-primary-lavender" />
            <span className="text-sm tracking-widest uppercase text-foreground/60">A Special Celebration</span>
          </div>
          
          <h1 
            ref={titleRef}
            className="text-6xl md:text-8xl font-playfair font-medium mb-8 leading-tight tracking-tight"
          >
            A Quiet Wish <br />
            <span className="text-gradient italic font-normal">For You</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed font-outfit"
          >
            "A quiet wish for someone special. No expectations, only happiness for you."
          </p>

          <Link href="/wishes">
            <button className="group relative px-8 py-4 bg-transparent text-foreground border border-glass-border rounded-full overflow-hidden transition-all hover:border-primary-lavender/50">
              <div className="absolute inset-0 bg-primary-lavender/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative font-medium tracking-wide">Step Inside</span>
            </button>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <LucideChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* Intro Quote Section */}
      <Section className="text-center">
        <h2 className="text-3xl md:text-4xl font-playfair italic text-foreground/90 mb-6">
          "The stars shine a little brighter today..."
        </h2>
        <p className="text-lg text-foreground/60 max-w-xl mx-auto leading-relaxed">
          In the quiet moments of life, some people leave an indelible mark. This is a small celebration of the person you are, without any noise, just pure appreciation.
        </p>
      </Section>

      {/* Aesthetic Spacer */}
      <div className="h-64 bg-[radial-gradient(ellipse_at_center,_rgba(177,156,217,0.05)_0%,_transparent_70%)]" />

      {/* Direct Invite to Memories */}
      <Section className="flex flex-col items-center">
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-primary-lavender/30 to-transparent mb-12" />
        <Link href="/memories" className="group text-2xl font-playfair hover:text-primary-lavender transition-colors">
          Explore Symbolic Memories →
        </Link>
      </Section>

      <footer className="py-12 border-t border-glass-border/50 text-center text-sm text-foreground/40">
        <p>© 2026 Crafted with care • No expectations</p>
      </footer>
    </div>
  );
}
