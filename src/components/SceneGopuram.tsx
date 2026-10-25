import React from 'react';
import { ChevronDown, Bell } from 'lucide-react';
import { weddingConfig } from '../config/wedding';

interface SceneGopuramProps {
  onNext: () => void;
}

export const SceneGopuram: React.FC<SceneGopuramProps> = ({ onNext }) => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-between text-center overflow-hidden py-10 px-4">
      {/* Sky & Temple Gopuram Background with layered parallax */}
      <div
        className="absolute inset-0 bg-cover bg-bottom z-0 transition-transform duration-1000"
        style={{
          backgroundImage: 'url(/images/gopuram.jpg)',
          backgroundPosition: 'center 30%',
        }}
      >
        {/* Soft morning gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2E0711]/70 via-transparent to-[#16080D]/90" />
      </div>

      {/* Floating clouds / auspicious glow */}
      <div className="absolute top-10 w-full flex justify-center pointer-events-none z-10 opacity-70">
        <div className="w-80 h-32 rounded-full bg-amber-200/20 blur-3xl" />
      </div>

      {/* Header Section: Couple Announcement */}
      <div className="relative z-20 mt-6 sm:mt-10 flex flex-col items-center max-w-lg px-4 animate-fade-in-down">
        {/* Sacred Shloka or Auspicious Tag */}
        <div className="mb-4 px-4 py-1 rounded-full bg-black/40 backdrop-blur-md border border-[#C6A15B]/50 flex items-center gap-2">
          <Bell className="w-3.5 h-3.5 text-[#FFE79A]" />
          <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#E7D4A2] font-semibold font-serif">
            || SHRI GANESHAYA NAMAHA ||
          </span>
        </div>

        {/* Bride Name */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FFF5E5] tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          {weddingConfig.bride.name}
          {weddingConfig.bride.qualification && (
            <span className="block sm:inline text-lg sm:text-2xl font-serif text-[#E7D4A2] font-normal sm:ml-2">
              , {weddingConfig.bride.qualification}
            </span>
          )}
        </h1>

        {/* Weds Connector */}
        <div className="my-2 sm:my-3">
          <span className="font-script text-3xl sm:text-4xl text-[#C6A15B] tracking-wider italic drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {weddingConfig.connector}
          </span>
        </div>

        {/* Groom Name */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FFF5E5] tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          {weddingConfig.groom.name}
          {weddingConfig.groom.qualification && (
            <span className="block sm:inline text-lg sm:text-2xl font-serif text-[#E7D4A2] font-normal sm:ml-2">
              , {weddingConfig.groom.qualification}
            </span>
          )}
        </h2>

        <p className="mt-3 text-xs sm:text-sm text-[#FFE79A] tracking-[0.2em] uppercase font-sans font-medium drop-shadow">
          ARE GETTING MARRIED
        </p>
      </div>

      {/* Centerspacer for Gopuram view */}
      <div className="relative z-10 my-auto py-12"></div>

      {/* Bottom CTA to Step into the Mandapam */}
      <div className="relative z-20 mb-4 flex flex-col items-center">
        <button
          onClick={onNext}
          className="group flex flex-col items-center gap-2 text-[#E7D4A2] hover:text-[#FFF] transition-all transform hover:translate-y-1"
        >
          <span className="text-xs tracking-[0.25em] uppercase font-serif font-bold px-5 py-2 rounded-full bg-black/50 backdrop-blur-md border border-[#C6A15B]/60 shadow-lg group-hover:bg-[#390B18]/80 group-hover:border-[#FFE79A]">
            ENTER THE MANDAPAM
          </span>
          <ChevronDown className="w-5 h-5 text-[#C6A15B] animate-bounce" />
        </button>
      </div>
    </div>
  );
};
