import React, { useEffect, useState } from 'react';
import { Heart, RefreshCw, Share2, Check } from 'lucide-react';
import { weddingConfig } from '../config/wedding';
import { fireRoyalPetals } from '../utils/confetti';
import { SceneCountdown } from './SceneCountdown';

interface SceneBlessingsProps {
  onReplay: () => void;
  isActive: boolean;
}

export const SceneBlessings: React.FC<SceneBlessingsProps> = ({ onReplay, isActive }) => {
  const [shareSuccess, setShareSuccess] = useState(false);

  useEffect(() => {
    if (isActive) {
      fireRoyalPetals();
    }
  }, [isActive]);

  const handleShare = async () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://wedding.invitation';
    const text = weddingConfig.sharing.text;
    const title = weddingConfig.sharing.title;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: currentUrl,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
        return;
      } catch (err) {
        // Fall through to WhatsApp if user dismissed or cancelled native share
        if ((err as Error).name !== 'AbortError') {
          console.log('Native share error, using WhatsApp fallback');
        }
      }
    }

    // WhatsApp Fallback
    const waText = encodeURIComponent(`${text}\n\nExperience our 3D Wedding Invitation:\n${currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${waText}`, '_blank');
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 3000);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-between text-center overflow-hidden py-10 px-4">
      {/* Background Frame with Royal Scalloped Gold Arch & Hanging Lanterns */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url(/images/blessings.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#16080D]/85 via-[#2E0711]/70 to-[#16080D]/95" />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-2 flex flex-col items-center">
        <div className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#C6A15B]/50 flex items-center gap-2 shadow-lg">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#E7D4A2] font-semibold font-serif">
            WITH LOVE AND JOY
          </span>
        </div>
      </div>

      {/* Main Closing Card */}
      <div className="relative z-20 my-auto w-full max-w-md px-2 py-4 flex flex-col items-center">
        {/* Countdown Timer */}
        <SceneCountdown />

        {/* Closing Blessings Open Typography (NO CARD BACKGROUND) */}
        <div className="relative w-full text-center py-4">
          <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-serif text-crisp-gold font-semibold">
            WE INVITE YOU TO CELEBRATE WITH US
          </p>

          <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-[#FFE99E] to-transparent my-3" />

          {/* Names */}
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-glow-ivory tracking-wide leading-tight">
            {weddingConfig.bride.name}
            {weddingConfig.bride.qualification && (
              <span className="text-xs sm:text-sm font-serif text-crisp-gold font-normal block sm:inline sm:ml-1.5">
                ({weddingConfig.bride.qualification})
              </span>
            )}
          </h2>

          <div className="my-1.5">
            <span className="font-script text-3xl sm:text-4xl text-crisp-gold italic" style={{ textShadow: '0 2px 10px rgba(0,0,0,1), 0 0 24px rgba(255,233,158,0.9)' }}>
              {weddingConfig.connector}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-black text-glow-ivory tracking-wide leading-tight">
            {weddingConfig.groom.name}
          </h3>

          <div className="glow-pill rounded-full py-1.5 px-4 inline-block mt-3 mb-1">
            <p className="text-[11px] sm:text-xs font-serif font-black uppercase tracking-wider text-crisp-gold">
              RECEPTION: 4TH NOV • MARRIAGE: 5TH NOV 2026
            </p>
          </div>

          <p className="mt-3 text-xs sm:text-sm text-crisp-ivory font-serif italic max-w-xs mx-auto leading-relaxed">
            "Two lives, two hearts, joined together in friendship, united forever in love."
          </p>

          <p className="mt-2 text-xs text-crisp-ivory font-sans">
            Venue: <span className="font-bold text-crisp-gold">{weddingConfig.venue.name}</span>
          </p>

          {/* Action Controls: Share & Replay */}
          <div className="mt-6 pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            {/* Share Invitation */}
            <button
              onClick={handleShare}
              className="btn-whatsapp-action w-full sm:w-auto px-7 py-3 rounded-full gap-2 text-xs sm:text-sm"
            >
              {shareSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span className="text-white font-serif font-black">SHARED! 🎉</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-white" />
                  <span className="text-white font-serif font-black">SHARE INVITATION</span>
                </>
              )}
            </button>

            {/* Replay Invitation */}
            <button
              onClick={onReplay}
              className="btn-replay-action w-full sm:w-auto px-6 py-3 rounded-full gap-2 text-xs sm:text-sm"
            >
              <RefreshCw className="w-4 h-4 text-crisp-gold" />
              <span className="font-serif font-black text-crisp-gold">REPLAY FILM</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Blessing */}
      <div className="relative z-10 pb-4 text-center">
        <p className="text-[11px] text-[#E7D4A2]/70 font-sans tracking-widest uppercase">
          Blessings & Best Compliments from Family & Friends
        </p>
      </div>
    </div>
  );
};
