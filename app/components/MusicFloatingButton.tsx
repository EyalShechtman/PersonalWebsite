"use client";

import { useMusic } from '../contexts/MusicContext';
import { useRouter, usePathname } from 'next/navigation';

export default function MusicFloatingButton() {
  const { isPlaying } = useMusic();
  const router = useRouter();
  const pathname = usePathname();

  const scrollToMusic = () => {
    // Check if we're on the home page
    const isHomePage = pathname === '/';
    
    if (isHomePage) {
      // Scroll to music section on home page
      const musicSection = document.getElementById('music');
      if (musicSection) {
        musicSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to home page with music hash
      router.push('/#music');
      // After navigation, scroll to music section
      setTimeout(() => {
        const musicSection = document.getElementById('music');
        if (musicSection) {
          musicSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <button
      onClick={scrollToMusic}
      className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-white hover:bg-white/90 transition-all hover:scale-110 flex items-center justify-center text-black shadow-lg hover:shadow-white/30 group"
      aria-label="Go to music section"
    >
      {/* Music Icon with Animation */}
      <svg 
        className={`w-6 h-6 ${isPlaying ? 'animate-pulse' : ''}`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" 
        />
      </svg>
      
      {/* Tooltip */}
      <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-black/90 backdrop-blur-sm text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Music Player
      </div>
    </button>
  );
}

