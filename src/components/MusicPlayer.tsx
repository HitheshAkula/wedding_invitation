import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { weddingConfig } from '../config/wedding';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Initialize track URL
    soundManager.initBackgroundMusic(weddingConfig.audio.trackUrl);

    // Subscribe to sound updates
    const unsubscribe = soundManager.subscribe((playing, muted) => {
      setIsPlaying(playing);
      setIsMuted(muted);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggle = () => {
    if (!isPlaying) {
      soundManager.playMusic();
    } else {
      soundManager.toggleMute();
    }
  };

  return (
    <div
      className="fixed z-50 flex items-center gap-2 pointer-events-auto"
      style={{
        top: 'max(env(safe-area-inset-top, 0px) + 8px, 12px)',
        right: 'max(env(safe-area-inset-right, 0px) + 8px, 12px)',
      }}
    >
      {/* Backgroundless floating music button */}
      <button
        onClick={handleToggle}
        className="group relative flex items-center gap-2 p-1.5 transition-all transform hover:scale-110 active:scale-95 cursor-pointer bg-transparent border-0 outline-none shadow-none"
        style={{
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          outline: 'none',
        }}
        title={isMuted ? 'Unmute Wedding Music' : 'Mute Wedding Music'}
        aria-label="Toggle Wedding Music"
      >
        {/* Animated Music Vinyl / Disc Indicator */}
        <div
          className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center transition-transform ${
            isPlaying && !isMuted ? 'animate-spin' : ''
          }`}
          style={{
            animationDuration: '6s',
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.95)) drop-shadow(0 0 10px rgba(255,233,158,0.7))',
          }}
        >
          <Music className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFE99E]" />
        </div>

        {/* Audio Volume Icon */}
        <div
          style={{
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.95)) drop-shadow(0 0 8px rgba(255,233,158,0.5))',
          }}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
          ) : (
            <Volume2 className={`w-4 h-4 sm:w-5 sm:h-5 text-[#FFE99E] ${isPlaying ? 'animate-pulse' : ''}`} />
          )}
        </div>

        <span
          className="hidden sm:inline text-xs font-serif tracking-widest font-bold text-crisp-gold uppercase"
          style={{
            textShadow: '0 2px 6px rgba(0,0,0,1), 0 0 12px rgba(255,233,158,0.6)',
          }}
        >
          {isMuted ? 'MUTED' : isPlaying ? 'PLAYING' : 'MUSIC'}
        </span>
      </button>
    </div>
  );
};

export default MusicPlayer;
