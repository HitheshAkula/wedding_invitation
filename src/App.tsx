import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  Bell,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Crown,
  ExternalLink,
  Flame,
  Flower2,
  Gift,
  Heart,
  HeartHandshake,
  Hourglass,
  MapPin,
  Navigation,
  PartyPopper,
  RefreshCw,
  Share2,
} from 'lucide-react';
import { ThreeCanvas, type ThreeCanvasHandle } from './components/ThreeCanvas';
import { MusicPlayer } from './components/MusicPlayer';
import { NavigationDots } from './components/NavigationDots';
import { weddingConfig, type WeddingEvent } from './config/wedding';
import { soundManager } from './utils/audio';
import { fireRoyalPetals } from './utils/confetti';

gsap.registerPlugin(ScrollTrigger);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyStageRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const threeCanvasRef = useRef<ThreeCanvasHandle>(null);

  // Scene 1 refs
  const scene1Ref = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const doorVolumetricRef = useRef<HTMLDivElement>(null);
  const doorSeamRef = useRef<HTMLDivElement>(null);
  const scene1TextRef = useRef<HTMLDivElement>(null);

  // Scene 2 refs
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene2BgRef = useRef<HTMLDivElement>(null);
  const scene2ContentRef = useRef<HTMLDivElement>(null);

  // Scene 3 refs
  const scene3Ref = useRef<HTMLDivElement>(null);
  const scene3BgRef = useRef<HTMLDivElement>(null);
  const scene3ContentRef = useRef<HTMLDivElement>(null);

  // Scene 4 refs
  const scene4Ref = useRef<HTMLDivElement>(null);
  const scene4BgRef = useRef<HTMLDivElement>(null);
  const scene4ContentRef = useRef<HTMLDivElement>(null);

  // Scene 5 refs
  const scene5Ref = useRef<HTMLDivElement>(null);
  const scene5BgRef = useRef<HTMLDivElement>(null);
  const scene5ContentRef = useRef<HTMLDivElement>(null);

  const [activeScene, setActiveScene] = useState<number>(0);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const hasTriggeredPetals = useRef<boolean>(false);

  // Initialize Audio & Live Countdown to 5th November 2026
  useEffect(() => {
    soundManager.initBackgroundMusic(weddingConfig.audio.trackUrl);
    soundManager.attachGestureUnlock();

    const target = new Date(weddingConfig.weddingDate).getTime();
    const calcTime = () => {
      const diff = target - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff / 3600000) % 24),
          minutes: Math.floor((diff / 60000) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    calcTime();
    const iv = setInterval(calcTime, 1000);
    return () => clearInterval(iv);
  }, []);

  const lenisRef = useRef<Lenis | null>(null);

  // Lenis Ultra-Smooth Scrolling with GSAP Synchronization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // GSAP ScrollTrigger Master Timeline
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1, // Smooth cinematic scrub
          onUpdate: (self) => {
            const p = self.progress;

            // Top Gold Progress Bar
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${p * 100}%`;
            }

            // Three.js ambient particles & depth
            if (threeCanvasRef.current) {
              threeCanvasRef.current.setScrollProgress(p);
            }

            // Scene index tracking (5 scenes: 0, 1, 2, 3, 4)
            const sceneIdx = p < 0.20 ? 0 : p < 0.42 ? 1 : p < 0.65 ? 2 : p < 0.85 ? 3 : 4;
            setActiveScene(sceneIdx);

            // Trigger auspicious flower petals when entering Scene 3
            if (p > 0.42 && p < 0.65 && !hasTriggeredPetals.current) {
              hasTriggeredPetals.current = true;
              fireRoyalPetals();
            } else if (p < 0.25 || p > 0.75) {
              hasTriggeredPetals.current = false;
            }
          },
        },
      });

      // ========================================================
      // SCENE 1: The Gateway (Royal Doors 0 -> 20)
      // ========================================================
      tl.to(scene1TextRef.current, { opacity: 0, y: -30, duration: 4, ease: 'power2.in' }, 2);
      tl.to(doorVolumetricRef.current, { opacity: 1, scale: 2, duration: 10, ease: 'power2.out' }, 3);
      tl.to(doorSeamRef.current, { opacity: 0, duration: 2 }, 3);
      tl.to(leftDoorRef.current, { rotateY: -115, duration: 13, ease: 'power1.inOut' }, 3);
      tl.to(rightDoorRef.current, { rotateY: 115, duration: 13, ease: 'power1.inOut' }, 3);
      tl.to(scene1Ref.current, { scale: 1.4, duration: 13, ease: 'power1.inOut' }, 3);
      tl.to(scene1Ref.current, { opacity: 0, duration: 4, ease: 'power2.in' }, 16);

      // ========================================================
      // SCENE 2: Gopuram Ceremony (20 -> 42)
      // ========================================================
      tl.fromTo(scene2Ref.current, { opacity: 0 }, { opacity: 1, duration: 4, ease: 'power2.out' }, 20);
      tl.fromTo(scene2BgRef.current, { scale: 1 }, { scale: 1.1, duration: 18, ease: 'none' }, 20);
      tl.fromTo(scene2ContentRef.current, { opacity: 0, y: 45 }, { opacity: 1, y: 0, duration: 5, ease: 'power2.out' }, 21);
      tl.to(scene2ContentRef.current, { opacity: 0, y: -25, duration: 4, ease: 'power2.in' }, 37);
      tl.to(scene2Ref.current, { opacity: 0, duration: 4, ease: 'power2.in' }, 38);

      // ========================================================
      // SCENE 3: Royal Wedding Invitation (42 -> 65)
      // ========================================================
      tl.fromTo(scene3Ref.current, { opacity: 0 }, { opacity: 1, duration: 4, ease: 'power2.out' }, 42);
      tl.fromTo(scene3BgRef.current, { scale: 1 }, { scale: 1.08, duration: 19, ease: 'none' }, 42);
      tl.fromTo(scene3ContentRef.current, { opacity: 0, y: 45, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 5, ease: 'power2.out' }, 43);
      tl.to(scene3ContentRef.current, { opacity: 0, y: -25, scale: 0.96, duration: 4, ease: 'power2.in' }, 60);
      tl.to(scene3Ref.current, { opacity: 0, duration: 4, ease: 'power2.in' }, 61);

      // ========================================================
      // SCENE 4: Auspicious Schedule & Venue (65 -> 85)
      // ========================================================
      tl.fromTo(scene4Ref.current, { opacity: 0 }, { opacity: 1, duration: 4, ease: 'power2.out' }, 65);
      tl.fromTo(scene4BgRef.current, { scale: 1 }, { scale: 1.08, duration: 16, ease: 'none' }, 65);
      tl.fromTo(scene4ContentRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 5, ease: 'power2.out' }, 66);
      tl.to(scene4ContentRef.current, { opacity: 0, y: -25, duration: 4, ease: 'power2.in' }, 80);
      tl.to(scene4Ref.current, { opacity: 0, duration: 4, ease: 'power2.in' }, 81);

      // ========================================================
      // SCENE 5: Blessings & Live Countdown (85 -> 100)
      // ========================================================
      tl.fromTo(scene5Ref.current, { opacity: 0 }, { opacity: 1, duration: 4, ease: 'power2.out' }, 85);
      tl.fromTo(scene5BgRef.current, { scale: 1 }, { scale: 1.08, duration: 15, ease: 'none' }, 85);
      tl.fromTo(scene5ContentRef.current, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 5, ease: 'power2.out' }, 86);
    }, container);

    return () => ctx.revert();
  }, []);

  const scrollToScene = (index: number) => {
    const track = containerRef.current;
    if (!track) return;
    const maxScroll = track.offsetHeight - window.innerHeight;
    const sceneRatios = [0, 0.28, 0.50, 0.72, 0.96];
    const target = maxScroll * (sceneRatios[index] ?? 0);

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  };

  const handleOpenMaps = () => {
    const url = weddingConfig.venue.googleMapsDirectionsUrl || weddingConfig.venue.googleMapsShareUrl;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    const currentUrl = window.location.href;
    const { title, text } = weddingConfig.sharing;
    if (navigator.share) {
      try { await navigator.share({ title, text, url: currentUrl }); } catch {}
    }
    const waText = encodeURIComponent(`${text}\n\nExperience our 3D Wedding Invitation:\n${currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${waText}`, '_blank');
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 3000);
  };

  const handleReplay = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.6 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAddToCalendar = (event: WeddingEvent) => {
    const title = encodeURIComponent(`${weddingConfig.bride.name} & ${weddingConfig.groom.name} - ${event.title}`);
    const details = encodeURIComponent(`${event.subtitle}\n${event.description}\nVenue: ${weddingConfig.venue.name}`);
    const location = encodeURIComponent(`${weddingConfig.venue.name}, ${weddingConfig.venue.city}`);
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`, '_blank', 'noopener,noreferrer');
  };

  const sceneLabels = [
    'The Gateway',
    'Gopuram Ceremony',
    'Royal Invitation',
    'Venue & Schedule',
    'Countdown & Blessings',
  ];

  return (
    <div className="relative w-full" style={{ background: '#0E0207', color: '#FFF7E8' }}>
      {/* Three.js ambient particles & 3D camera depth */}
      <ThreeCanvas ref={threeCanvasRef} />

      {/* Floating Music Player */}
      <MusicPlayer />

      {/* Floating Navigation Dots (Desktop & Tablet Friendly) */}
      <NavigationDots
        currentScene={activeScene}
        totalScenes={5}
        onSelectScene={scrollToScene}
        sceneLabels={sceneLabels}
      />

      {/* Gold Liquid Progress Bar */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 h-[3px] z-50 pointer-events-none"
        style={{
          width: '0%',
          background: 'linear-gradient(90deg, #C9A84C, #FFE99E, #C9A84C)',
          boxShadow: '0 0 14px #FFE99E, 0 0 28px rgba(255,233,158,0.7)',
        }}
      />

      {/* 500vh Scroll Track */}
      <div ref={containerRef} className="wedding-scroll-track">

        {/* Viewport Stage (Fixed overlay) */}
        <div ref={stickyStageRef} className="wedding-sticky-stage">

          {/* ================================================================
              SCENE 1: THE ROYAL DOORS — Floating Sacred Aesthetics
              ================================================================ */}
          <div
            ref={scene1Ref}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              perspective: '1600px',
              background: 'radial-gradient(ellipse at center, #3D0819 0%, #1E040D 60%, #0B0104 100%)',
            }}
          >
            {/* Volumetric gold light burst */}
            <div ref={doorVolumetricRef} className="absolute inset-0 flex items-center justify-center opacity-30">
              <div
                className="w-80 h-96 rounded-full blur-3xl"
                style={{
                  background: 'radial-gradient(circle, rgba(255,235,160,0.95) 0%, rgba(212,160,48,0.45) 50%, transparent 80%)',
                }}
              />
            </div>

            {/* 3D Doorway Frame */}
            <div className="wedding-door-frame">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(/images/gopuram.jpg)' }}
              />

              {/* Left Door Leaf */}
              <div
                ref={leftDoorRef}
                className="absolute top-0 bottom-0 left-0 w-1/2 z-10 origin-left shadow-2xl"
                style={{
                  transformStyle: 'preserve-3d',
                  backgroundImage: 'url(/images/door_left_half.jpg)',
                  backgroundSize: '200% 100%',
                  backgroundPosition: 'left center',
                  boxShadow: 'inset -8px 0 24px rgba(0,0,0,0.85)',
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 60%, rgba(0,0,0,0.7) 100%)' }}
                />
              </div>

              {/* Right Door Leaf */}
              <div
                ref={rightDoorRef}
                className="absolute top-0 bottom-0 right-0 w-1/2 z-10 origin-right shadow-2xl"
                style={{
                  transformStyle: 'preserve-3d',
                  backgroundImage: 'url(/images/door_right_half.jpg)',
                  backgroundSize: '200% 100%',
                  backgroundPosition: 'right center',
                  boxShadow: 'inset 8px 0 24px rgba(0,0,0,0.85)',
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.15) 0%, transparent 60%, rgba(0,0,0,0.7) 100%)' }}
                />
              </div>

              {/* Center seam golden light */}
              <div
                ref={doorSeamRef}
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1.5 z-20 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, transparent 5%, #ffeaa7 30%, #fff 50%, #ffeaa7 70%, transparent 95%)',
                  boxShadow: '0 0 22px 8px rgba(255,235,160,0.95)',
                }}
              />

              {/* Arch border */}
              <div
                className="absolute inset-0 pointer-events-none z-20 border-[6px] rounded-t-full"
                style={{ borderColor: 'rgba(212,175,85,0.75)', boxShadow: 'inset 0 0 32px rgba(0,0,0,0.7)' }}
              />
            </div>

            {/* Pure Floating Typography (NO CARDS, REAL ICONS, MOBILE & DESKTOP OPTIMIZED) */}
            <div
              ref={scene1TextRef}
              className="absolute bottom-5 sm:bottom-8 left-0 right-0 z-30 flex flex-col items-center text-center px-4 pointer-events-auto"
            >
              {/* Sacred top badge with Real Crown & Lotus Icons */}
              <div className="scene-badge mb-2.5">
                <Crown className="w-3.5 h-3.5 text-[#FFE99E]" />
                <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-black font-serif text-crisp-gold">
                  AN INVITATION TO CELEBRATE LOVE
                </span>
                <Flower2 className="w-3.5 h-3.5 text-[#FFE99E]" />
              </div>

              {/* Floating Names & Details — pure typography with deep contrast */}
              <div className="w-full max-w-md text-center py-1 sm:py-2">
                {/* Ornamental Top Motif with Real Crown Icon */}
                <div className="flex items-center justify-center gap-2 mb-1.5">
                  <div style={{ width: '45px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,233,158,0.8))' }} />
                  <Crown className="w-4 h-4 text-[#FFE99E]" />
                  <div style={{ width: '45px', height: '1px', background: 'linear-gradient(90deg, rgba(255,233,158,0.8), transparent)' }} />
                </div>

                <h1 className="font-serif font-black leading-tight" style={{ fontSize: 'clamp(1.4rem, 6vw, 2.2rem)' }}>
                  <span className="text-glow-ivory block tracking-wide">{weddingConfig.bride.name}</span>
                  {weddingConfig.bride.qualification && (
                    <span className="text-xs sm:text-sm font-semibold text-crisp-gold block mt-0.5">
                      ({weddingConfig.bride.qualification})
                    </span>
                  )}
                  <span
                    className="font-script italic block"
                    style={{
                      fontSize: 'clamp(1.8rem, 7vw, 2.7rem)',
                      color: '#FFE99E',
                      textShadow: '0 2px 8px rgba(0,0,0,1), 0 0 24px rgba(255,233,158,0.9)',
                      margin: '0.1rem 0',
                    }}
                  >
                    {weddingConfig.connector}
                  </span>
                  <span className="text-glow-ivory block tracking-wide">{weddingConfig.groom.name}</span>
                </h1>

                {/* Auspicious Dates Glowing Pill with Real Calendar Icon */}
                <div className="glow-pill rounded-full py-1.5 px-4 inline-flex items-center gap-2 mt-2.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-crisp-gold shrink-0" />
                  <p className="text-[11px] sm:text-xs font-serif font-black tracking-widest uppercase text-crisp-gold">
                    RECEPTION: 4TH NOV • MARRIAGE: 5TH NOV 2026
                  </p>
                </div>

                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-crisp-ivory shrink-0" />
                  <p className="text-xs sm:text-sm font-sans font-bold text-crisp-ivory">
                    {weddingConfig.venue.name}
                  </p>
                </div>
              </div>

              {/* Bold High-Contrast Gold Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundManager.playMusic();
                  scrollToScene(1);
                }}
                className="btn-gold-action mt-3 px-7 py-3 rounded-full gap-2 text-xs sm:text-sm min-h-[44px] pointer-events-auto cursor-pointer"
                aria-label="Scroll down to enter invitation"
              >
                <span className="tracking-widest font-serif font-black uppercase text-[#160409]">
                  SCROLL TO ENTER
                </span>
                <ChevronDown className="w-4 h-4 animate-bounce text-[#160409]" />
              </button>
            </div>
          </div>

          {/* ================================================================
              SCENE 2: DIVINE GOPURAM — Floating Celestial Names (NO CARDS)
              ================================================================ */}
          <div
            ref={scene2Ref}
            className="absolute inset-0 flex flex-col items-center justify-between text-center py-6 px-4 opacity-0 pointer-events-none"
          >
            {/* Background with Camera Zoom */}
            <div
              ref={scene2BgRef}
              className="absolute inset-0 bg-cover z-0 origin-center"
              style={{ backgroundImage: 'url(/images/gopuram.jpg)', backgroundPosition: 'center 30%' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(14,2,7,0.5) 0%, rgba(14,2,7,0.8) 70%, rgba(8,1,4,0.95) 100%)',
                }}
              />
            </div>

            {/* Pure Floating Couple Typography (NO CARDS, REAL BELL & LOTUS ICONS) */}
            <div
              ref={scene2ContentRef}
              className="relative z-10 my-auto flex flex-col items-center max-w-xl px-4 w-full pt-12 sm:pt-0"
            >
              {/* Sacred Temple Bell & Lotus Invocation */}
              <div className="scene-badge mb-3 sm:mb-4">
                <Bell className="w-3.5 h-3.5 text-[#FFE99E]" />
                <span className="text-[11px] sm:text-xs tracking-[0.3em] uppercase font-black font-serif text-crisp-gold">
                  ॥ श्री गणेशाय नमः ॥
                </span>
                <Flower2 className="w-3.5 h-3.5 text-[#FFE99E]" />
              </div>

              {/* Ornate Divider with Real Lotus Icon */}
              <div className="flex items-center justify-center gap-3 mb-3 w-full max-w-xs">
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #FFE99E)' }} />
                <Flower2 className="w-4 h-4 text-[#FFE99E]" />
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #FFE99E, transparent)' }} />
              </div>

              {/* Bride Name */}
              <h2
                className="font-serif font-black text-glow-ivory leading-tight"
                style={{ fontSize: 'clamp(2rem, 8vw, 3.4rem)' }}
              >
                {weddingConfig.bride.name}
              </h2>
              {weddingConfig.bride.qualification && (
                <span className="text-sm sm:text-base font-serif text-crisp-gold font-bold block mt-1">
                  ({weddingConfig.bride.qualification})
                </span>
              )}

              {/* Flowing Script Weds */}
              <div className="my-2">
                <span
                  className="font-script italic font-bold"
                  style={{
                    fontSize: 'clamp(2.4rem, 10vw, 4.2rem)',
                    color: '#FFE99E',
                    textShadow: '0 3px 12px rgba(0,0,0,1), 0 0 28px rgba(255,233,158,0.95)',
                  }}
                >
                  {weddingConfig.connector}
                </span>
              </div>

              {/* Groom Name */}
              <h3
                className="font-serif font-black text-glow-ivory leading-tight"
                style={{ fontSize: 'clamp(2rem, 8vw, 3.4rem)' }}
              >
                {weddingConfig.groom.name}
              </h3>

              {/* Auspicious Confirmed Dates Glow Pill with Calendar Icon */}
              <div className="mt-4 sm:mt-5 glow-pill rounded-2xl py-3 px-5 sm:px-6 max-w-md w-full">
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-crisp-gold shrink-0" />
                  <p className="text-xs sm:text-sm tracking-[0.18em] uppercase font-serif font-black text-crisp-gold">
                    WEDDING RECEPTION: 4TH NOVEMBER 2026
                  </p>
                </div>
                <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,233,158,0.5), transparent)', margin: '0.4rem 0' }} />
                <div className="flex items-center justify-center gap-2">
                  <Flame className="w-3.5 h-3.5 text-[#FFE99E] shrink-0" />
                  <p className="text-xs sm:text-sm tracking-[0.18em] uppercase font-serif font-black text-glow-ivory">
                    MARRIAGE CEREMONY: 5TH NOVEMBER 2026
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 mt-3">
                <MapPin className="w-3.5 h-3.5 text-crisp-gold shrink-0" />
                <p className="text-xs sm:text-sm font-serif italic font-bold text-crisp-ivory">
                  At {weddingConfig.venue.name}
                </p>
              </div>
            </div>

            {/* Continue CTA */}
            <div className="relative z-10 mb-4 pointer-events-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToScene(2);
                }}
                className="btn-scroll-prompt px-6 py-2.5 rounded-full gap-2 text-xs min-h-[44px] pointer-events-auto cursor-pointer"
                aria-label="Continue to Wedding Invitation"
              >
                <span className="tracking-widest uppercase font-serif font-bold text-crisp-gold">
                  READ INVITATION
                </span>
                <ChevronDown className="w-4 h-4 animate-bounce text-crisp-gold" />
              </button>
            </div>
          </div>

          {/* ================================================================
              SCENE 3: ROYAL WEDDING INVITATION — Ethereal Proclamation (NO CARDS)
              ================================================================ */}
          <div
            ref={scene3Ref}
            className="absolute inset-0 flex flex-col items-center justify-center text-center py-6 px-4 opacity-0 pointer-events-none"
          >
            {/* Mandapam Background */}
            <div
              ref={scene3BgRef}
              className="absolute inset-0 bg-cover bg-center z-0 origin-center"
              style={{ backgroundImage: 'url(/images/mandapam.jpg)' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(14,2,7,0.55) 0%, rgba(14,2,7,0.85) 75%, rgba(8,1,4,0.96) 100%)',
                }}
              />
            </div>

            {/* Ethereal Floating Proclamation — REAL CROWN & LOTUS ICONS */}
            <div
              ref={scene3ContentRef}
              className="relative z-20 w-full max-w-lg px-4 py-2 flex flex-col items-center text-center pt-10 sm:pt-2"
            >
              {/* Corner Real Lotus Icons */}
              <div className="w-full flex items-center justify-between text-crisp-gold px-2 mb-1">
                <Flower2 className="w-4 h-4 text-[#FFE99E]" />
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(255,233,158,0.7), transparent 30%, transparent 70%, rgba(255,233,158,0.7))' }} />
                <Flower2 className="w-4 h-4 text-[#FFE99E]" />
              </div>

              {/* Sacred Header with Crown Icon */}
              <div className="flex items-center justify-center gap-2 mb-1">
                <Crown className="w-3.5 h-3.5 text-[#FFE99E]" />
                <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-serif font-black text-crisp-gold">
                  With blessings of the Almighty &amp; beloved elders
                </p>
                <Crown className="w-3.5 h-3.5 text-[#FFE99E]" />
              </div>

              <p className="text-xs sm:text-sm font-serif italic text-crisp-ivory max-w-md mx-auto leading-relaxed mb-3">
                {weddingConfig.welcomeMessage}
              </p>

              {/* Divider */}
              <div style={{ width: '70%', height: '1px', background: 'linear-gradient(90deg, transparent, #FFE99E, transparent)', marginBottom: '0.75rem' }} />

              {/* Bride Name */}
              <h2
                className="font-serif font-black leading-tight text-glow-ivory"
                style={{ fontSize: 'clamp(1.6rem, 6.5vw, 2.5rem)' }}
              >
                {weddingConfig.bride.name}
              </h2>
              {weddingConfig.bride.qualification && (
                <span className="text-xs sm:text-sm font-serif font-bold text-crisp-gold block mt-0.5">
                  ({weddingConfig.bride.qualification})
                </span>
              )}
              {weddingConfig.bride.parents && (
                <p className="text-xs font-sans font-bold text-crisp-ivory mt-1">
                  {weddingConfig.bride.parents}
                </p>
              )}

              {/* Weds Connector with Real Heart Icon */}
              <div className="my-2 flex items-center justify-center gap-4 w-full max-w-xs">
                <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #FFE99E)' }} />
                <div className="flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-[#FFE99E] fill-[#FFE99E]" />
                  <span
                    className="font-script italic font-black"
                    style={{
                      fontSize: 'clamp(2rem, 7vw, 3rem)',
                      color: '#FFE99E',
                      textShadow: '0 2px 10px rgba(0,0,0,1), 0 0 24px rgba(255,233,158,0.9)',
                    }}
                  >
                    {weddingConfig.connector}
                  </span>
                  <Heart className="w-3.5 h-3.5 text-[#FFE99E] fill-[#FFE99E]" />
                </div>
                <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #FFE99E, transparent)' }} />
              </div>

              {/* Groom Name */}
              <h3
                className="font-serif font-black leading-tight text-glow-ivory"
                style={{ fontSize: 'clamp(1.6rem, 6.5vw, 2.5rem)' }}
              >
                {weddingConfig.groom.name}
              </h3>
              {weddingConfig.groom.parents && (
                <p className="text-xs font-sans font-bold text-crisp-ivory mt-1">
                  {weddingConfig.groom.parents}
                </p>
              )}

              {/* Confirmed Wedding Dates Glow Highlight with Calendar Icon */}
              <div className="mt-4 glow-pill rounded-full py-2 px-6 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-crisp-gold shrink-0" />
                <p className="text-xs sm:text-sm font-serif font-black uppercase tracking-wider text-crisp-gold">
                  RECEPTION: 4TH NOV • MARRIAGE: 5TH NOV 2026
                </p>
              </div>

              <p className="text-xs sm:text-sm font-serif leading-relaxed px-2 font-bold italic mt-3 text-crisp-ivory max-w-md">
                "{weddingConfig.blessingMessage}"
              </p>

              {/* Bottom Real Lotus Icons */}
              <div className="w-full flex items-center justify-between text-crisp-gold px-2 mt-2">
                <Flower2 className="w-4 h-4 text-[#FFE99E]" />
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(255,233,158,0.7), transparent 30%, transparent 70%, rgba(255,233,158,0.7))' }} />
                <Flower2 className="w-4 h-4 text-[#FFE99E]" />
              </div>

              {/* CTA button with MapPin Icon */}
              <div className="mt-3 pointer-events-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToScene(3);
                  }}
                  className="btn-gold-action px-6 py-2.5 rounded-full gap-2 text-xs sm:text-sm min-h-[44px] pointer-events-auto cursor-pointer"
                  aria-label="View Venue and Schedule"
                >
                  <MapPin className="w-4 h-4 text-[#160409]" />
                  <span className="tracking-wider uppercase font-serif font-black text-[#160409]">
                    VIEW VENUE &amp; SCHEDULE
                  </span>
                  <ChevronDown className="w-4 h-4 text-[#160409]" />
                </button>
              </div>
            </div>
          </div>

          {/* ================================================================
              SCENE 4: VENUE & CEREMONIES — Open Schedule (NO CARDS)
              ================================================================ */}
          <div
            ref={scene4Ref}
            className="absolute inset-0 flex flex-col items-center justify-between text-center py-6 px-4 opacity-0 pointer-events-none"
          >
            {/* Venue Background */}
            <div
              ref={scene4BgRef}
              className="absolute inset-0 bg-cover bg-center z-0 origin-center"
              style={{ backgroundImage: 'url(/images/venue.jpg)' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(14,2,7,0.55) 0%, rgba(14,2,7,0.85) 70%, rgba(8,1,4,0.96) 100%)',
                }}
              />
            </div>

            {/* Top Badge with Real Calendar & MapPin Icons */}
            <div className="relative z-10 pt-14 sm:pt-3 flex flex-col items-center">
              <div className="scene-badge">
                <Calendar className="w-3.5 h-3.5 text-[#FFE99E]" />
                <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-black font-serif text-crisp-gold">
                  AUSPICIOUS SCHEDULE &amp; VENUE
                </span>
                <MapPin className="w-3.5 h-3.5 text-[#FFE99E]" />
              </div>
            </div>

            {/* Open Floating Venue & Schedule (REAL PARTY POPPER & HEARTHANDSHAKE ICONS) */}
            <div
              ref={scene4ContentRef}
              className="relative z-20 my-auto w-full max-w-md px-2 flex flex-col items-center text-center"
            >
              <div className="flex items-center justify-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-crisp-gold shrink-0" />
                <span className="text-xs tracking-[0.3em] uppercase font-bold font-serif text-crisp-gold">
                  THE WEDDING VENUE
                </span>
              </div>
              <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #FFE99E, transparent)', margin: '0.4rem auto', width: '50%' }} />

              <h2
                className="font-serif font-black text-glow-ivory leading-tight mt-1"
                style={{ fontSize: 'clamp(1.5rem, 6vw, 2.2rem)' }}
              >
                {weddingConfig.venue.name}
              </h2>

              <div className="mt-2 flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 shrink-0 text-[#FFE99E]" />
                <span className="text-xs sm:text-sm font-sans font-bold text-crisp-ivory">
                  {weddingConfig.venue.address}, {weddingConfig.venue.city}
                </span>
              </div>

              {/* Events — Clean Minimal Floating Rows with Real Icons */}
              <div className="mt-4 sm:mt-5 flex flex-col gap-3 w-full text-left">
                {weddingConfig.events.map((evt, idx) => (
                  <div
                    key={evt.id}
                    className="glow-pill rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      {idx === 0 ? (
                        <PartyPopper className="w-4 h-4 shrink-0 mt-1 text-[#FFE99E]" />
                      ) : (
                        <HeartHandshake className="w-4 h-4 shrink-0 mt-1 text-[#FFE99E]" />
                      )}
                      <div>
                        <p className="text-xs sm:text-sm font-serif font-black text-glow-ivory">
                          {evt.title}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Clock className="w-3 h-3 text-crisp-gold shrink-0" />
                          <p className="text-[11px] sm:text-xs font-sans font-bold text-crisp-gold">
                            {evt.date} • {evt.time}
                          </p>
                        </div>
                        <p className="text-[10px] sm:text-[11px] font-sans text-crisp-ivory mt-0.5 line-clamp-1">
                          {evt.subtitle}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToCalendar(evt)}
                      className="btn-cal-action px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider shrink-0 flex items-center gap-1 min-h-[36px]"
                      title="Add to Google Calendar"
                    >
                      <Calendar className="w-3 h-3 text-[#160409]" />
                      <span>+ CAL</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Prominent High-Contrast Google Maps CTA Button */}
              <div className="mt-4 sm:mt-5 w-full pointer-events-auto">
                <button
                  onClick={handleOpenMaps}
                  className="btn-gold-action w-full py-3.5 px-6 rounded-full gap-2.5 text-xs sm:text-sm min-h-[44px] pointer-events-auto cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-[#160409] fill-[#160409]" />
                  <span className="font-serif font-black text-[#160409]">VIEW ON GOOGLE MAPS</span>
                  <ExternalLink className="w-4 h-4 text-[#160409]" />
                </button>
              </div>
            </div>

            {/* Bottom prompt */}
            <div className="relative z-10 pb-3 pointer-events-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToScene(4);
                }}
                className="btn-scroll-prompt px-6 py-2.5 rounded-full gap-2 text-xs min-h-[44px] pointer-events-auto cursor-pointer"
                aria-label="Final blessings"
              >
                <span className="tracking-widest uppercase font-serif font-bold text-crisp-gold">
                  FINAL BLESSINGS
                </span>
                <ChevronDown className="w-4 h-4 animate-bounce text-crisp-gold" />
              </button>
            </div>
          </div>

          {/* ================================================================
              SCENE 5: BLESSINGS & COUNTDOWN — Pure Celebration (NO CARDS)
              ================================================================ */}
          <div
            ref={scene5Ref}
            className="absolute inset-0 flex flex-col items-center justify-between text-center py-5 px-4 opacity-0 pointer-events-none"
          >
            {/* Blessings Background */}
            <div
              ref={scene5BgRef}
              className="absolute inset-0 bg-cover bg-center z-0 origin-center"
              style={{ backgroundImage: 'url(/images/blessings.jpg)' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(14,2,7,0.55) 0%, rgba(30,5,14,0.85) 70%, rgba(8,1,4,0.96) 100%)',
                }}
              />
            </div>

            {/* Top Badge with Real Heart & Gift Icons */}
            <div className="relative z-10 pt-14 sm:pt-3 flex flex-col items-center">
              <div className="scene-badge">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-heart" />
                <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-black font-serif text-crisp-gold">
                  WITH LOVE &amp; DIVINE BLESSINGS
                </span>
                <Gift className="w-3.5 h-3.5 text-[#FFE99E]" />
              </div>
            </div>

            {/* Floating Live Countdown & Blessings (REAL CLOCK, CALENDAR, FLAME ICONS) */}
            <div
              ref={scene5ContentRef}
              className="relative z-20 my-auto w-full max-w-md px-2 flex flex-col items-center gap-3.5 sm:gap-4 text-center"
            >
              {/* Live Countdown */}
              <div className="w-full flex flex-col items-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                  <span className="font-script italic font-black text-xl sm:text-2xl text-crisp-gold">
                    Counting the Auspicious Days
                  </span>
                  <Hourglass className="w-4 h-4 text-[#FFE99E]" />
                </div>
                <p className="text-xs font-serif font-black uppercase tracking-wider mb-2.5 sm:mb-3 text-glow-ivory">
                  UNTIL MARRIAGE CEREMONY · 5TH NOV 2026
                </p>

                {/* 4 Golden Countdown Jewel Rings with Real Icons */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full">
                  {[
                    { label: 'DAYS', val: timeLeft.days, icon: Calendar },
                    { label: 'HRS', val: timeLeft.hours, icon: Clock },
                    { label: 'MINS', val: timeLeft.minutes, icon: Hourglass },
                    { label: 'SECS', val: timeLeft.seconds, icon: Flame },
                  ].map((item, idx) => {
                    const IconComp = item.icon;
                    return (
                      <div key={idx} className="countdown-cell">
                        <IconComp className="w-3 h-3 text-crisp-gold mb-1 opacity-80" />
                        <span
                          className="countdown-number"
                          style={{ fontSize: 'clamp(1.3rem, 5.5vw, 1.85rem)' }}
                        >
                          {String(item.val).padStart(2, '0')}
                        </span>
                        <span className="countdown-label text-[9px] sm:text-[10px]">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Floating Closing Invitation Typography */}
              <div className="w-full flex flex-col items-center pt-1 sm:pt-2">
                <p className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-serif font-bold text-crisp-gold mb-1">
                  WE CORDIALLY INVITE YOU TO CELEBRATE WITH US
                </p>
                <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #FFE99E, transparent)', margin: '0.35rem auto', width: '60%' }} />

                <h2
                  className="font-serif font-black text-glow-ivory leading-tight"
                  style={{ fontSize: 'clamp(1.4rem, 6vw, 2rem)' }}
                >
                  {weddingConfig.bride.name}
                  {weddingConfig.bride.qualification && (
                    <span className="text-xs font-serif text-crisp-gold font-bold block">
                      ({weddingConfig.bride.qualification})
                    </span>
                  )}
                </h2>

                <div className="my-1">
                  <span
                    className="font-script italic font-bold"
                    style={{
                      fontSize: 'clamp(1.8rem, 7vw, 2.5rem)',
                      color: '#FFE99E',
                      textShadow: '0 2px 10px rgba(0,0,0,1), 0 0 24px rgba(255,233,158,0.9)',
                    }}
                  >
                    {weddingConfig.connector}
                  </span>
                </div>

                <h3
                  className="font-serif font-black text-glow-ivory leading-tight"
                  style={{ fontSize: 'clamp(1.4rem, 6vw, 2rem)' }}
                >
                  {weddingConfig.groom.name}
                </h3>

                <div className="glow-pill rounded-full py-1.5 px-4 mt-2 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-crisp-gold shrink-0" />
                  <p className="text-xs font-serif font-black uppercase tracking-wider text-crisp-gold">
                    RECEPTION: 4TH NOV • MARRIAGE: 5TH NOV 2026
                  </p>
                </div>

                <div className="flex items-center justify-center gap-1.5 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-crisp-gold shrink-0" />
                  <p className="text-xs font-sans font-bold text-crisp-ivory">
                    Venue: <span className="font-black text-crisp-gold">{weddingConfig.venue.name}</span>
                  </p>
                </div>

                {/* Prominent High-Contrast Action Buttons: WhatsApp Share & Replay */}
                <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row gap-3 w-full pointer-events-auto">
                  <button
                    onClick={handleShare}
                    className="btn-whatsapp-action flex-1 py-3.5 px-6 rounded-full gap-2 text-xs sm:text-sm min-h-[44px]"
                  >
                    {shareSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span className="font-serif font-black text-white">INVITATION SHARED! 🎉</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 text-white" />
                        <span className="font-serif font-black text-white">SHARE INVITATION</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleReplay}
                    className="btn-replay-action py-3.5 px-6 rounded-full gap-2 text-xs sm:text-sm min-h-[44px]"
                  >
                    <RefreshCw className="w-4 h-4 text-crisp-gold" />
                    <span className="font-serif font-black text-crisp-gold">REPLAY FILM</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Blessing Text with Flower Icon */}
            <div className="relative z-10 pb-3 flex items-center justify-center gap-1.5">
              <Flower2 className="w-3.5 h-3.5 text-crisp-gold" />
              <p
                className="text-[10px] sm:text-xs tracking-widest uppercase font-bold font-sans text-crisp-gold"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,1)' }}
              >
                Blessings &amp; Best Compliments from Family &amp; Friends
              </p>
              <Flower2 className="w-3.5 h-3.5 text-crisp-gold" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;
