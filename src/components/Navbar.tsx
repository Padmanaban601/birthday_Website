"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LucideHeart, LucideMenu, LucideX } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Wishes', path: '/wishes' },
  { name: 'Memories', path: '/memories' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Final Wish', path: '/final' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center glass rounded-full px-6 py-3 px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <LucideHeart className="w-5 h-5 text-primary-lavender group-hover:scale-110 transition-transform" />
          <span className="text-lg font-semibold text-gradient tracking-tight">For Someone Special</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors group"
            >
              {item.name}
              {pathname === item.path && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-lavender"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <LucideX /> : <LucideMenu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-4 glass rounded-3xl p-6 flex flex-col gap-4"
        >
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-foreground/80"
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
