"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideHeart, LucideMenu, LucideX } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Wishes', path: '/wishes' },
  { name: 'Thoughts', path: '/thoughts' },
  { name: 'Moments', path: '/moments' },
  { name: 'Final', path: '/final' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-6 transition-all duration-500">
      <div className={`max-w-7xl mx-auto flex justify-between items-center transition-all duration-700 ${scrolled ? 'glass rounded-full px-8 py-3' : 'px-4'}`}>
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <LucideHeart className="w-5 h-5 text-accent-secondary group-hover:scale-125 transition-transform duration-500" />
            <motion.div 
               animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute inset-0 bg-accent-secondary rounded-full blur-sm"
            />
          </div>
          <span className="text-sm font-bold tracking-[0.4em] uppercase text-foreground/80 group-hover:text-foreground transition-colors">
            Quiet Wish
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className="relative text-[11px] font-bold tracking-[0.3em] uppercase text-foreground/40 hover:text-foreground transition-all duration-500"
            >
              {item.name}
              {pathname === item.path && (
                <motion.div 
                  layoutId="nav-glow"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent-primary rounded-full shadow-[0_0_8px_rgba(230,190,138,0.8)]"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground/60 hover:text-foreground transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <LucideX className="w-5 h-5" /> : <LucideMenu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="md:hidden mt-4 glass rounded-[2.5rem] p-8 flex flex-col gap-6 shadow-2xl overflow-hidden"
          >
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-serif italic ${pathname === item.path ? 'text-accent-primary' : 'text-foreground/60'}`}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
