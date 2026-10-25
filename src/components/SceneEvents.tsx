import React from 'react';
import { Calendar, ChevronDown, Clock, MapPin } from 'lucide-react';
import { weddingConfig, type WeddingEvent } from '../config/wedding';

interface SceneEventsProps {
  onNext: () => void;
}

export const SceneEvents: React.FC<SceneEventsProps> = ({ onNext }) => {
  const handleAddToCalendar = (event: WeddingEvent) => {
    // Generate Google Calendar Link
    const title = encodeURIComponent(`${weddingConfig.bride.name} & ${weddingConfig.groom.name} - ${event.title}`);
    const details = encodeURIComponent(`${event.subtitle}\n${event.description}\nVenue: ${weddingConfig.venue.name}`);
    const location = encodeURIComponent(`${weddingConfig.venue.name}, ${weddingConfig.venue.city}`);

    // If date is set, use it; otherwise link generic event
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-between text-center overflow-hidden py-10 px-4">
      {/* Background with royal Indian architecture and arches */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url(/images/blessings.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#16080D]/90 via-[#2E0711]/80 to-[#16080D]/95" />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-4 flex flex-col items-center max-w-lg px-2">
        <div className="mb-2 px-4 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#C6A15B]/50 flex items-center gap-2 shadow-lg">
          <Calendar className="w-3.5 h-3.5 text-[#FFE79A]" />
          <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#E7D4A2] font-semibold font-serif">
            AUSPICIOUS CEREMONIES
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFF5E5] tracking-wide drop-shadow">
          Wedding Celebrations
        </h2>
        <p className="mt-1 text-xs text-[#E7D4A2]/90 font-serif italic max-w-sm">
          Please join us with your family to celebrate these sacred rituals
        </p>
      </div>

      {/* Events Grid */}
      <div className="relative z-20 my-auto w-full max-w-md flex flex-col gap-4 py-4 px-2">
        {weddingConfig.events.map((evt, idx) => (
          <div
            key={evt.id}
            className="group relative rounded-2xl p-5 text-left border border-[#C6A15B]/60 shadow-xl overflow-hidden transition-all duration-300 hover:border-[#FFE79A] hover:scale-[1.01]"
            style={{
              background: 'linear-gradient(135deg, rgba(57, 11, 24, 0.85) 0%, rgba(32, 4, 12, 0.95) 100%)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Top gold corner accent */}
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
              <div className="absolute transform rotate-45 bg-[#C6A15B]/20 w-16 h-4 -top-1 -right-6" />
            </div>

            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] tracking-widest text-[#E7D4A2] font-semibold uppercase">
                  Event 0{idx + 1}
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#FFF5E5] mt-0.5">
                  {evt.title}
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B]/50 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-[#FFE79A]" />
              </div>
            </div>

            <p className="text-xs text-[#FFE79A] font-medium mt-1 font-serif italic">
              {evt.subtitle}
            </p>

            <p className="text-xs text-[#FFF5E5]/80 font-sans mt-2 leading-relaxed">
              {evt.description}
            </p>

            {/* Timing & Location row */}
            <div className="mt-4 pt-3 border-t border-[#C6A15B]/30 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-[#E7D4A2]">
                <Clock className="w-3.5 h-3.5 text-[#FFE79A]" />
                <span className="font-semibold">{evt.date || 'Auspicious Muhurtham'}</span>
                {evt.time && <span className="text-[#FFF5E5]/70 font-sans">• {evt.time}</span>}
              </div>

              <button
                onClick={() => handleAddToCalendar(evt)}
                className="px-3 py-1 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B]/60 text-[#FFE79A] text-[11px] font-sans font-medium hover:bg-[#C6A15B]/40 transition-colors flex items-center gap-1"
              >
                <span>Save to Calendar</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA to Venue */}
      <div className="relative z-20 pb-4 flex flex-col items-center">
        <button
          onClick={onNext}
          className="group flex flex-col items-center gap-2 text-[#E7D4A2] hover:text-[#FFF] transition-all transform hover:translate-y-1"
        >
          <span className="text-xs tracking-[0.2em] uppercase font-serif font-bold px-6 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-[#C6A15B]/70 shadow-lg group-hover:bg-[#390B18]/90 group-hover:border-[#FFE79A] flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#FFE79A]" />
            VIEW WEDDING VENUE
          </span>
          <ChevronDown className="w-5 h-5 text-[#C6A15B] animate-bounce" />
        </button>
      </div>
    </div>
  );
};
