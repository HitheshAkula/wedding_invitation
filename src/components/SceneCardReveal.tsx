import React, { useEffect, useState } from 'react';
import { Calendar, ChevronDown, Crown, Flower2 } from 'lucide-react';
import { weddingConfig } from '../config/wedding';
import { fireRoyalPetals } from '../utils/confetti';

interface SceneCardRevealProps {
  onNext: () => void;
  isActive: boolean;
}

export const SceneCardReveal: React.FC<SceneCardRevealProps> = ({ onNext, isActive }) => {
  const [step, setStep] = useState(0);

  // Sequential Name Reveal Sequence
  useEffect(() => {
    if (!isActive) return;

    // Reset and sequence smoothly
    setStep(0);
    const t1 = setTimeout(() => setStep(1), 600); // Blessings intro
    const t2 = setTimeout(() => setStep(2), 1400); // Bride reveal
    const t3 = setTimeout(() => setStep(3), 2200); // "Weds" reveal
    const t4 = setTimeout(() => {
      setStep(4); // Groom reveal
      fireRoyalPetals(); // Celebrate full reveal
    }, 3000);
    const t5 = setTimeout(() => setStep(5), 3800); // Details & Continue

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [isActive]);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-between text-center overflow-hidden py-6 px-4">
      {/* South Indian Temple Mandapam Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url(/images/mandapam.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#16080D]/70 via-black/40 to-[#16080D]/85" />
      </div>

      {/* Top Auspicious Invocation */}
      <div className="relative z-10 pt-2 flex flex-col items-center">
        <div className="px-4 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#C6A15B]/40 flex items-center gap-2 shadow-lg">
          <Crown className="w-3.5 h-3.5 text-[#E7D4A2]" />
          <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#E7D4A2] font-semibold font-serif">
            SHUBHA VIVAAHA MAHOTSAVA
          </span>
        </div>
      </div>

      {/* Central 3D Royal Wedding Card */}
      <div className="relative z-20 my-auto w-full max-w-[420px] px-2 py-4">
        <div
          className={`relative w-full rounded-2xl p-6 sm:p-8 transition-all duration-1000 transform ${
            step >= 1 ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-6'
          }`}
          style={{
            background: 'linear-gradient(135deg, #FFFDF8 0%, #FFF5E5 50%, #FAF0DF 100%)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), inset 0 0 25px rgba(198, 161, 91, 0.25), 0 0 0 2px rgba(198, 161, 91, 0.6)',
          }}
        >
          {/* Inner Ornate Gold Border */}
          <div className="absolute inset-3 border border-[#C6A15B]/50 rounded-xl pointer-events-none" />
          <div className="absolute inset-4 border border-[#C6A15B]/30 rounded-lg pointer-events-none" />

          {/* Corner Real Flower2 Icons */}
          <div className="absolute top-2 left-2 text-[#C6A15B] opacity-70"><Flower2 className="w-3.5 h-3.5" /></div>
          <div className="absolute top-2 right-2 text-[#C6A15B] opacity-70"><Flower2 className="w-3.5 h-3.5" /></div>
          <div className="absolute bottom-2 left-2 text-[#C6A15B] opacity-70"><Flower2 className="w-3.5 h-3.5" /></div>
          <div className="absolute bottom-2 right-2 text-[#C6A15B] opacity-70"><Flower2 className="w-3.5 h-3.5" /></div>

          {/* Sacred Blessings & Welcome Line */}
          <div
            className={`transition-all duration-700 ${
              step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}
          >
            <p className="text-[11px] sm:text-xs text-[#5A3825] font-serif uppercase tracking-[0.2em] font-semibold mb-2">
              With the divine blessings of Sri Venkateshwara & our beloved elders
            </p>
            <p className="text-[11px] sm:text-xs text-[#64172A] font-serif italic mb-4 leading-relaxed">
              {weddingConfig.welcomeMessage}
            </p>
          </div>

          {/* Ornamental Divider */}
          <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-[#C6A15B] to-transparent my-2" />

          {/* Sequential Reveal 1: BRIDE */}
          <div
            className={`transition-all duration-700 ${
              step >= 2 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-3'
            }`}
          >
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#390B18] tracking-wide">
              {weddingConfig.bride.name}
            </h2>
            {weddingConfig.bride.qualification && (
              <span className="inline-block text-xs sm:text-sm font-serif font-medium text-[#7A5618] mt-0.5 tracking-wider">
                ({weddingConfig.bride.qualification})
              </span>
            )}
            {weddingConfig.bride.parents && (
              <p className="text-[10px] sm:text-[11px] text-[#7A5618]/80 font-sans mt-0.5">
                {weddingConfig.bride.parents}
              </p>
            )}
          </div>

          {/* Sequential Reveal 2: WEDS */}
          <div
            className={`my-2 sm:my-3 transition-all duration-700 ${
              step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-[#C6A15B]/60" />
              <span className="font-script text-3xl sm:text-4xl text-[#C6A15B] font-normal italic">
                {weddingConfig.connector}
              </span>
              <span className="w-8 h-px bg-[#C6A15B]/60" />
            </div>
          </div>

          {/* Sequential Reveal 3: GROOM */}
          <div
            className={`transition-all duration-700 ${
              step >= 4 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-3'
            }`}
          >
            <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#390B18] tracking-wide">
              {weddingConfig.groom.name}
            </h3>
            {weddingConfig.groom.qualification && (
              <span className="inline-block text-xs sm:text-sm font-serif font-medium text-[#7A5618] mt-0.5 tracking-wider">
                ({weddingConfig.groom.qualification})
              </span>
            )}
            {weddingConfig.groom.parents && (
              <p className="text-[10px] sm:text-[11px] text-[#7A5618]/80 font-sans mt-0.5">
                {weddingConfig.groom.parents}
              </p>
            )}
          </div>

          {/* Ornamental Divider */}
          <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-[#C6A15B] to-transparent my-3" />

          {/* Blessing Footer on Card */}
          <div
            className={`transition-all duration-700 ${
              step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <p className="text-[11px] sm:text-xs text-[#5A3825] font-serif leading-relaxed px-2">
              {weddingConfig.blessingMessage}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation CTA */}
      <div className="relative z-20 pb-4 flex flex-col items-center">
        <button
          onClick={onNext}
          className="group flex flex-col items-center gap-2 text-[#E7D4A2] hover:text-[#FFF] transition-all transform hover:translate-y-1"
        >
          <span className="text-xs tracking-[0.2em] uppercase font-serif font-bold px-6 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-[#C6A15B]/70 shadow-lg group-hover:bg-[#390B18]/90 group-hover:border-[#FFE79A] flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#FFE79A]" />
            VIEW CELEBRATIONS & VENUE
          </span>
          <ChevronDown className="w-5 h-5 text-[#C6A15B] animate-bounce" />
        </button>
      </div>
    </div>
  );
};
