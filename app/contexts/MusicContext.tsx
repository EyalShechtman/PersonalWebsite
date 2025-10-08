"use client";

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface Song {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  audioUrl: string;
}

interface MusicContextType {
  currentSongIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  songs: Song[];
  setCurrentSongIndex: (index: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  handlePlayPause: () => void;
  handleNext: () => void;
  handlePrevious: () => void;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const songs: Song[] = [
  {
    id: "1",
    title: "Crystallized",
    artist: "The xx",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2733b7f67a357dd1e49df13eb6d",
    audioUrl: "/music/crystallized.mp3"
  },
  {
    id: "2",
    title: "Desire",
    artist: "Years & Years",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2732b46e68e0f28e55e67bccce5",
    audioUrl: "/music/Desire.mp3"
  }
];

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [autoplayAttempted, setAutoplayAttempted] = useState(false);

  // Auto-play on mount - more aggressive approach with fallback
  useEffect(() => {
    const attemptAutoplay = async () => {
      if (audioRef.current && !autoplayAttempted) {
        setAutoplayAttempted(true);
        try {
          // Set the source first
          audioRef.current.src = songs[currentSongIndex].audioUrl;
          audioRef.current.load();
          
          // First try: play with sound
          audioRef.current.muted = false;
          await audioRef.current.play();
          setIsPlaying(true);
          console.log("Autoplay successful with sound!");
        } catch (err) {
          console.log("Autoplay with sound prevented. Trying muted autoplay...", err);
          
          // Fallback: Try muted autoplay (browsers usually allow this)
          try {
            if (audioRef.current) {
              audioRef.current.muted = true;
              await audioRef.current.play();
              setIsPlaying(true);
              console.log("Muted autoplay successful. Waiting for user interaction to unmute...");
              
              // Unmute on first user interaction
              const unmuteOnInteraction = () => {
                if (audioRef.current) {
                  audioRef.current.muted = false;
                  console.log("Audio unmuted!");
                }
              };
              
              document.addEventListener('click', unmuteOnInteraction, { once: true });
              document.addEventListener('touchstart', unmuteOnInteraction, { once: true });
              document.addEventListener('keydown', unmuteOnInteraction, { once: true });
            }
          } catch (mutedErr) {
            console.log("Even muted autoplay prevented. Setting up interaction listeners...", mutedErr);
            
            // Last resort: play on any user interaction
            const enableAudioOnInteraction = async () => {
              if (audioRef.current) {
                try {
                  audioRef.current.muted = false;
                  await audioRef.current.play();
                  setIsPlaying(true);
                  console.log("Audio started on user interaction!");
                } catch (e) {
                  console.error("Failed to play on interaction:", e);
                }
              }
            };
            
            document.addEventListener('click', enableAudioOnInteraction, { once: true });
            document.addEventListener('touchstart', enableAudioOnInteraction, { once: true });
            document.addEventListener('keydown', enableAudioOnInteraction, { once: true });
          }
        }
      }
    };

    // Try immediately
    attemptAutoplay();

    // Also try after a short delay (sometimes helps with browser policies)
    const timeout = setTimeout(() => {
      if (!isPlaying && audioRef.current) {
        attemptAutoplay();
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [autoplayAttempted, currentSongIndex, isPlaying]);

  // Update audio element when song changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songs[currentSongIndex].audioUrl;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error("Playback error:", err));
      }
    }
  }, [currentSongIndex, isPlaying]);

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.error("Playback error:", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const value = {
    currentSongIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    audioRef,
    songs,
    setCurrentSongIndex,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    setVolume,
    handlePlayPause,
    handleNext,
    handlePrevious,
    handleSeek,
    handleVolumeChange,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
      {/* Global Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
        onEnded={handleNext}
      />
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}

