import React, { useEffect, useState } from 'react';
import { Hourglass, Heart } from 'lucide-react';
import { weddingConfig } from '../config/wedding';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const SceneCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // If no target date provided in config, default to an auspicious future date
    const target = weddingConfig.weddingDate
      ? new Date(weddingConfig.weddingDate).getTime()
      : new Date().getTime() + 30 * 24 * 60 * 60 * 1000;

    const calculate = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto my-4 px-2">
      <div className="relative text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          <span className="font-script italic font-black text-xl text-crisp-gold">
            Counting the Days
          </span>
          <Hourglass className="w-4 h-4 text-[#FFE99E]" />
        </div>

        <p className="text-xs font-serif font-black tracking-widest uppercase mb-3 text-glow-ivory">
          Until Marriage Ceremony · 5th Nov 2026
        </p>

        {/* 4 Golden Countdown Jewel Rings */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {[
            { label: 'DAYS', val: timeLeft.days },
            { label: 'HRS', val: timeLeft.hours },
            { label: 'MINS', val: timeLeft.minutes },
            { label: 'SECS', val: timeLeft.seconds },
          ].map((item, idx) => (
            <div key={idx} className="countdown-cell">
              <span className="countdown-number text-xl sm:text-2xl">
                {String(item.val).padStart(2, '0')}
              </span>
              <span className="countdown-label text-[9px] sm:text-[10px]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
