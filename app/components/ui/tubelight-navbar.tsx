'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
}

export function NavBar({ items }: NavBarProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      {/* Desktop Navigation - Top */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 py-4">
        <div className="flex justify-center">
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full p-1">
            {items.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeIndex === index;
              
              return (
                <Link
                  key={item.name}
                  href={item.url}
                  onClick={() => setActiveIndex(index)}
                  className="relative px-5 py-2 rounded-full transition-colors group"
                >
                  {isActive && (
                    <motion.div
                      layoutId="desktop-active-pill"
                      className="absolute inset-0 bg-white rounded-full"
                      transition={{ type: 'spring', duration: 0.6, bounce: 0.2 }}
                    />
                  )}
                  
                  <div className="relative flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-white/60 group-hover:text-white'} transition-colors`} />
                    <span className={`text-sm font-medium ${isActive ? 'text-black' : 'text-white/60 group-hover:text-white'} transition-colors`}>
                      {item.name}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe">
        <div className="mx-4 mb-4">
          <div className="flex items-center justify-around bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-1 shadow-2xl">
            {items.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeIndex === index;
              
              return (
                <Link
                  key={item.name}
                  href={item.url}
                  onClick={() => setActiveIndex(index)}
                  className="relative flex flex-col items-center gap-1 px-4 py-2.5 rounded-2xl transition-all"
                >
                  {isActive && (
                    <motion.div
                      layoutId="mobile-active-pill"
                      className="absolute inset-0 bg-white rounded-2xl"
                      transition={{ type: 'spring', duration: 0.6, bounce: 0.2 }}
                    />
                  )}
                  
                  <div className="relative flex flex-col items-center gap-1">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-black' : 'text-white/60'} transition-colors`} />
                    <span className={`text-xs font-medium ${isActive ? 'text-black' : 'text-white/60'} transition-colors`}>
                      {item.name}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}

