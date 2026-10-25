import React, { useState } from 'react';
import { Check, ChevronDown, Copy, ExternalLink, MapPin, Navigation } from 'lucide-react';
import { weddingConfig } from '../config/wedding';

interface SceneVenueProps {
  onNext: () => void;
}

export const SceneVenue: React.FC<SceneVenueProps> = ({ onNext }) => {
  const [copied, setCopied] = useState(false);

  const handleOpenMaps = () => {
    const url = weddingConfig.venue.googleMapsDirectionsUrl || weddingConfig.venue.googleMapsShareUrl;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyAddress = () => {
    const fullAddress = `${weddingConfig.venue.name}, ${weddingConfig.venue.address}, ${weddingConfig.venue.city}, ${weddingConfig.venue.state}`;
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-between text-center overflow-hidden py-8 px-4">
      {/* Background Frame: Golden Temple & Peacocks on Maroon Velvet */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url(/images/venue.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#16080D]/80 via-transparent to-[#16080D]/90" />
      </div>

      {/* Header Pill */}
      <div className="relative z-10 pt-4 flex flex-col items-center">
        <div className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#C6A15B]/50 flex items-center gap-2 shadow-lg">
          <MapPin className="w-3.5 h-3.5 text-[#FFE79A]" />
          <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#E7D4A2] font-semibold font-serif">
            SACRED DESTINATION
          </span>
        </div>
      </div>

      {/* Center Spacer to showcase the 24k Golden Gopuram & Peacocks */}
      <div className="relative z-10 my-auto w-full max-w-sm sm:max-w-md pt-32 sm:pt-40 pb-4 px-2">
        {/* Venue Information Plaque */}
        <div
          className="relative rounded-2xl p-6 sm:p-7 border border-[#C6A15B]/80 shadow-[0_15px_40px_rgba(0,0,0,0.8)] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(46, 7, 17, 0.94) 0%, rgba(22, 4, 10, 0.98) 100%)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Ornate Gold Border Outline */}
          <div className="absolute inset-2 border border-[#C6A15B]/40 rounded-xl pointer-events-none" />

          <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#E7D4A2] font-semibold font-serif">
            THE WEDDING VENUE
          </span>

          <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-[#C6A15B] to-transparent my-2" />

          {/* Exact Verified Venue Name */}
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#FFF5E5] tracking-wide mt-1">
            {weddingConfig.venue.name}
          </h2>

          {weddingConfig.venue.subname && (
            <p className="text-xs sm:text-sm text-[#FFE79A] font-serif italic mt-0.5">
              {weddingConfig.venue.subname}
            </p>
          )}

          {/* Address */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs sm:text-sm text-[#FFF5E5]/90 font-sans max-w-xs mx-auto">
            <MapPin className="w-4 h-4 text-[#FFE79A] shrink-0" />
            <span>
              {weddingConfig.venue.address}, {weddingConfig.venue.city}, {weddingConfig.venue.state}
            </span>
          </div>

          {/* Interactive Action Buttons */}
          <div className="mt-5 pt-4 border-t border-[#C6A15B]/40 flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* VIEW LOCATION Primary Button */}
            <button
              onClick={handleOpenMaps}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C6A15B] via-[#E7D4A2] to-[#C6A15B] text-[#24050E] font-serif font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_20px_rgba(198,161,91,0.5)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4 fill-[#24050E]" />
              <span>VIEW LOCATION</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Copy Address Button */}
            <button
              onClick={handleCopyAddress}
              className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-black/40 border border-[#C6A15B]/60 text-[#E7D4A2] hover:text-[#FFF] font-sans text-xs tracking-wider transition-colors flex items-center justify-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom CTA to Countdown */}
      <div className="relative z-20 pb-4 flex flex-col items-center">
        <button
          onClick={onNext}
          className="group flex flex-col items-center gap-2 text-[#E7D4A2] hover:text-[#FFF] transition-all transform hover:translate-y-1"
        >
          <span className="text-xs tracking-[0.2em] uppercase font-serif font-bold px-6 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-[#C6A15B]/70 shadow-lg group-hover:bg-[#390B18]/90 group-hover:border-[#FFE79A]">
            COUNTDOWN & BLESSINGS
          </span>
          <ChevronDown className="w-5 h-5 text-[#C6A15B] animate-bounce" />
        </button>
      </div>
    </div>
  );
};
