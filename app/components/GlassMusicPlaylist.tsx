"use client";

import Image from 'next/image';
import MusicArtwork from './MusicArtwork';
import { useMusic } from '../contexts/MusicContext';

// Format time helper
const formatTime = (time: number) => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export default function GlassMusicPlaylist() {
  const {
    currentSongIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    songs,
    setCurrentSongIndex,
    handlePlayPause,
    handleNext,
    handlePrevious,
    handleSeek,
    handleVolumeChange,
  } = useMusic();

  const currentSong = songs[currentSongIndex];

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Glass Container - Optimized for performance */}
      <div className="bg-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        
        {/* Album Artwork Grid */}
        <div className="p-8 bg-gradient-to-br from-white/5 to-transparent">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            My Liked Songs
          </h2>
          
          <div className="flex justify-center gap-8 flex-wrap mb-8">
            {songs.map((song, index) => (
              <div
                key={song.id}
                onClick={() => {
                  setCurrentSongIndex(index);
                  if (!isPlaying) handlePlayPause();
                }}
                className={`cursor-pointer transition-all duration-300 ${
                  index === currentSongIndex 
                    ? 'scale-110 opacity-100' 
                    : 'scale-90 opacity-60 hover:opacity-100 hover:scale-95'
                }`}
              >
                <MusicArtwork
                  artist={song.artist}
                  music={song.title}
                  albumArt={song.albumArt}
                  isSong={true}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Player Controls */}
        <div className="bg-black/20 p-6 border-t border-white/10">
          
          {/* Progress Bar */}
          <div className="mb-4">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.9) ${(currentTime / duration) * 100}%, rgba(255, 255, 255, 0.2) ${(currentTime / duration) * 100}%, rgba(255, 255, 255, 0.2) 100%)`
              }}
            />
            <div className="flex justify-between text-sm text-white/60 mt-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Song Info & Controls */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            
            {/* Current Song Info */}
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 relative">
                <Image 
                  src={currentSong.albumArt} 
                  alt={currentSong.title}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-semibold truncate">{currentSong.title}</h3>
                <p className="text-white/60 text-sm truncate">{currentSong.artist}</p>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevious}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center text-white"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                </svg>
              </button>

              <button
                onClick={handlePlayPause}
                className="w-14 h-14 rounded-full bg-white hover:bg-white/90 transition-all flex items-center justify-center text-black shadow-lg"
              >
                {isPlaying ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6zm8 0h4v16h-4z"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center text-white"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 18h2V6h-2zM6 18l8.5-6L6 6z"/>
                </svg>
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2 min-w-[120px]">
              <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider-volume"
                style={{
                  background: `linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.9) ${volume * 100}%, rgba(255, 255, 255, 0.2) ${volume * 100}%, rgba(255, 255, 255, 0.2) 100%)`
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .slider-volume::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .slider-volume::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}

