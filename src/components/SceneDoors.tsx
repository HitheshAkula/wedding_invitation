import React, { useState } from 'react';
import { Volume2, Crown } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { fireRoyalPetals } from '../utils/confetti';
import { weddingConfig } from '../config/wedding';

interface SceneDoorsProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const SceneDoors: React.FC<SceneDoorsProps> = ({ onOpen, isOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = async () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    // 1. Play synthesized sacred bronze temple bell chime
    soundManager.playTempleChime();

    // 2. Start traditional wedding soundtrack
    soundManager.playMusic();

    // 3. Auspicious flower petal and gold dust shower
    setTimeout(() => {
      fireRoyalPetals();
    }, 450);

    // 4. Notify parent to progress scene
    setTimeout(() => {
      onOpen();
    }, 1500);
  };

  return (
    <div
      className={`fixed inset-0 z-30 flex items-center justify-center overflow-hidden transition-all duration-1200 ${
        isOpen ? 'pointer-events-none opacity-0 scale-125' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #3e0c1b 0%, #20040c 60%, #0d0105 100%)',
      }}
    >
      {/* 3D Doorway Stage */}
      <div
        className="relative w-full max-w-[460px] h-full max-h-[860px] flex items-center justify-center p-4 sm:p-6"
        style={{ perspective: '1600px' }}
      >
        {/* Soft volumetric light behind doors that bursts upon opening */}
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-1000 ${
            isOpening ? 'opacity-100 scale-150' : 'opacity-30 scale-95'
          }`}
        >
          <div
            className="w-72 h-96 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(255, 220, 130, 0.9) 0%, rgba(212, 160, 48, 0.4) 50%, transparent 80%)',
            }}
          />
        </div>

        {/* 3D Door Frame & Leaves */}
        <div className="relative w-full aspect-[9/16] max-h-[780px] rounded-t-full shadow-2xl overflow-hidden border-2 border-[#C6A15B]/40">
          {/* Background image inside doorway (revealed when doors swing open) */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1500 ease-out"
            style={{
              backgroundImage: 'url(/images/gopuram.jpg)',
              transform: isOpening ? 'scale(1.05)' : 'scale(1.0)',
            }}
          >
            <div className="absolute inset-0 bg-amber-900/20 backdrop-blur-[1px]" />
          </div>

          {/* Left Door Leaf (3D Transform) */}
          <div
            className="absolute top-0 bottom-0 left-0 w-1/2 z-10 origin-left transition-transform duration-1400 ease-in-out cursor-pointer shadow-2xl"
            style={{
              transform: isOpening || isOpen ? 'rotateY(-115deg)' : 'rotateY(0deg)',
              transformStyle: 'preserve-3d',
              backgroundImage: 'url(/images/door_left_half.jpg)',
              backgroundSize: '200% 100%',
              backgroundPosition: 'left center',
              boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.8), 5px 0 25px rgba(0,0,0,0.6)',
            }}
            onClick={handleOpenClick}
          >
            {/* Shading edge */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/60 pointer-events-none" />
          </div>

          {/* Right Door Leaf (3D Transform) */}
          <div
            className="absolute top-0 bottom-0 right-0 w-1/2 z-10 origin-right transition-transform duration-1400 ease-in-out cursor-pointer shadow-2xl"
            style={{
              transform: isOpening || isOpen ? 'rotateY(115deg)' : 'rotateY(0deg)',
              transformStyle: 'preserve-3d',
              backgroundImage: 'url(/images/door_right_half.jpg)',
              backgroundSize: '200% 100%',
              backgroundPosition: 'right center',
              boxShadow: 'inset 8px 0 20px rgba(0,0,0,0.8), -5px 0 25px rgba(0,0,0,0.6)',
            }}
            onClick={handleOpenClick}
          >
            {/* Shading edge */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-black/60 pointer-events-none" />
          </div>

          {/* Center Vertical Light Leak between closed doors */}
          <div
            className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 z-20 pointer-events-none transition-opacity duration-500 ${
              isOpening || isOpen ? 'opacity-0' : 'opacity-90'
            }`}
            style={{
              background: 'linear-gradient(to bottom, transparent 5%, #ffeaa7 30%, #fff 50%, #ffeaa7 70%, transparent 95%)',
              boxShadow: '0 0 16px 4px rgba(255, 230, 150, 0.9)',
            }}
          />

          {/* Outer Arch Floral Torana Garland & Gold Border */}
          <div className="absolute inset-0 pointer-events-none z-20 border-[6px] border-[#C6A15B]/70 rounded-t-full shadow-[inset_0_0_30px_rgba(0,0,0,0.7)]" />
        </div>

        {/* Foreground Royal Invitation Prompt & Button */}
        <div
          className={`absolute bottom-8 left-6 right-6 z-30 flex flex-col items-center text-center transition-all duration-700 ${
            isOpening || isOpen ? 'opacity-0 translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* Invitation Header Pill */}
          <div className="mb-3 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#C6A15B]/50 shadow-lg flex items-center gap-2">
            <Crown className="w-3.5 h-3.5 text-[#E7D4A2]" />
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#E7D4A2] font-semibold font-serif">
              {weddingConfig.invitationTitle}
            </span>
          </div>

          {/* Bride & Groom Teaser */}
          <h2 className="text-xl sm:text-2xl text-[#FFF5E5] font-serif font-bold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {weddingConfig.bride.name} <span className="text-[#C6A15B] font-script italic font-normal text-2xl sm:text-3xl px-1">weds</span> {weddingConfig.groom.name}
          </h2>

          <p className="mt-1 text-xs text-[#E7D4A2]/90 max-w-xs font-sans tracking-wide drop-shadow">
            {weddingConfig.invitationSubtitle}
          </p>

          {/* Refined Royal Button */}
          <button
            onClick={handleOpenClick}
            disabled={isOpening}
            className="group relative mt-5 px-8 py-3.5 rounded-full overflow-hidden transition-all duration-300 transform active:scale-95 shadow-[0_4px_25px_rgba(198,161,91,0.5)] border border-[#FFE79A]/80 hover:border-[#FFF]"
            style={{
              background: 'linear-gradient(135deg, #8A1C38 0%, #4D0F1F 50%, #2E0711 100%)',
            }}
          >
            {/* Shimmer sweep effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#FFE79A]/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <div className="relative flex items-center gap-3">
              <span className="text-xs sm:text-sm tracking-[0.2em] uppercase font-bold text-[#FFF5E5] font-serif drop-shadow">
                OPEN THE INVITATION
              </span>
              <Volume2 className="w-4 h-4 text-[#FFE79A] group-hover:scale-110 transition-transform" />
            </div>
          </button>

          <span className="mt-2 text-[10px] text-[#E7D4A2]/70 tracking-widest uppercase font-sans">
            🔊 Tap to experience with sacred music
          </span>
        </div>
      </div>
    </div>
  );
};
