"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Component-specific styles
const componentStyles = `
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

interface MusicArtworkProps {
  artist: string;
  music: string;
  albumArt: string;
  isSong?: boolean;
  isLoading?: boolean;
}

export default function MusicArtwork({
  artist,
  music,
  albumArt,
  isLoading = false
}: MusicArtworkProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        const tooltipWidth = 300;
        const tooltipHeight = 60;
        const offset = 20;
        
        let x = e.clientX + offset;
        let y = e.clientY - tooltipHeight - 10;
        
        // Prevent tooltip from going off right edge
        if (x + tooltipWidth > window.innerWidth) {
          x = e.clientX - tooltipWidth - offset;
        }
        
        // Prevent tooltip from going off top edge
        if (y < 0) {
          y = e.clientY + offset;
        }
        
        // Prevent tooltip from going off bottom edge
        if (y + tooltipHeight > window.innerHeight) {
          y = e.clientY - tooltipHeight - offset;
        }
        
        setMousePosition({ x, y });
      });
    };

    if (isHovered) {
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);

  if (isLoading) {
    return (
      <div className="relative">
        <div className="relative group">
          {/* Loading skeleton */}
          <div className="w-48 h-48 sm:w-64 sm:h-64 bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Component-specific styles */}
      <style jsx>{componentStyles}</style>
      
      {/* Enhanced Tooltip that follows cursor - Desktop only */}
      {isHovered && (
        <div
          className="fixed z-50 pointer-events-none hidden sm:block"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translateZ(0)',
          }}
        >
          <div className="bg-neutral-900/90 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg border border-neutral-700/50 animate-in fade-in zoom-in-95 duration-200">
            <span className="font-bold">{artist}</span> &nbsp;•&nbsp; {music}
          </div>
        </div>
      )}

      {/* Main container */}
      <div className="relative group">
        {/* Vinyl record with enhanced animation and glow */}
        <div
          className={`absolute -left-16 sm:-left-24 top-1/2 -translate-y-1/2 transition-all duration-500 ease-out ${
            isHovered
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-12 sm:translate-x-24'
          }`}
        >
          <div className="relative w-50 h-50 sm:w-70 sm:h-70">
            <div
              className={`w-full h-full ${isHovered ? 'animate-spin-slow' : ''}`}
              style={{
                animation: isHovered ? 'spin 1.33s linear infinite' : 'none', // 0.75 rev/sec
              }}
            >
              <Image
                src="https://pngimg.com/d/vinyl_PNG95.png"
                alt="Vinyl Record"
                width={80}
                height={80}
                className="w-full h-full object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Album artwork */}
        <div
          className="relative overflow-hidden rounded-lg shadow-2xl transition-all duration-300 ease-out hover:scale-105 hover:shadow-3xl cursor-pointer w-48 h-48 sm:w-64 sm:h-64"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={albumArt}
            alt={`${music} Cover`}
            width={256}
            height={256}
            className={`w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-110 ${
              !imageLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageLoaded(true);
            }}
            unoptimized
          />
          
          {/* Loading state overlay */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
          )}
          
          {/* Hover overlay with mobile text */}
          <div className={`absolute bottom-2 left-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="flex items-center gap-2">
              {/* Text for mobile only */}
              <div className="sm:hidden">
                <div className="text-white text-[10px] font-medium whitespace-nowrap bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
                  <span className="font-bold">{artist}</span> • {music}
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </div>
  );
}

