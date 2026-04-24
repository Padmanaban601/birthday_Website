"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideHeart, LucideMenu, LucideX, LucideLogOut } from 'lucide-react';

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

  const handleLogout = () => {
    localStorage.removeItem('birthday_unlocked');
    window.location.href = '/';
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-4 md:py-8 transition-all duration-700">
      <div className={`max-w-7xl mx-auto flex justify-between items-center transition-all duration-700 ${scrolled ? 'bg-white/80 backdrop-blur-2xl rounded-full px-8 py-3 shadow-[0_20px_50px_rgba(255,175,189,0.15)] border border-white/50' : 'bg-white/20 backdrop-blur-md rounded-full px-8 py-5 border border-white/30'}`}>
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <LucideHeart className="w-5 h-5 text-accent-secondary group-hover:scale-125 transition-transform duration-500" />
            <motion.div 
               animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute inset-0 bg-accent-secondary rounded-full blur-sm"
            />
          </div>
          <span className="text-[11px] font-black tracking-[0.6em] uppercase text-gray-800 group-hover:text-accent-primary transition-colors">
            Quiet Wish
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className="relative text-[10px] font-black tracking-[0.4em] uppercase text-gray-400 hover:text-gray-800 transition-all duration-500 py-1"
            >
              {item.name}
              {pathname === item.path && (
                <motion.div 
                  layoutId="nav-glow"
                  className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-primary to-transparent shadow-[0_0_15px_rgba(255,175,189,0.5)]"
                />
              )}
            </Link>
          ))}
          
          <button 
            onClick={handleLogout}
            className="group flex items-center gap-2 text-[10px] font-black tracking-[0.4em] uppercase text-red-400/60 hover:text-red-500 transition-all duration-500 ml-4 border-l border-gray-100 pl-6 py-1"
          >
            <LucideLogOut className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Logout
          </button>
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
            className="md:hidden mt-4 bg-white/90 backdrop-blur-2xl rounded-[2rem] p-6 flex flex-col gap-4 shadow-2xl border border-white/50"
          >
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`text-xl font-serif italic py-2 border-b border-gray-100 last:border-0 ${pathname === item.path ? 'text-accent-primary' : 'text-gray-400'}`}
              >
                {item.name}
              </Link>
            ))}
            <button 
              onClick={handleLogout}
              className="text-xl font-serif italic py-4 text-red-500 flex items-center gap-4 border-t border-gray-100 mt-4"
            >
              <LucideLogOut className="w-5 h-5" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
