import { useState, useEffect } from 'react';
import { ArrowDown, Heart, Calendar, MapPin, Sparkles } from 'lucide-react';
import { COUPLE_DATA } from '../data/weddingData';

interface HeroProps {
  totalPhotosCount: number;
}

export default function Hero({ totalPhotosCount }: HeroProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(COUPLE_DATA.weddingDateISO).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        // Married! Show celebration duration or wedding day
        const elapsed = Math.abs(diff);
        setTimeLeft({
          days: Math.floor(elapsed / (1000 * 60 * 60 * 24)),
          hours: Math.floor((elapsed / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((elapsed / 1000 / 60) % 60),
          seconds: Math.floor((elapsed / 1000) % 60),
          isPast: true,
        });
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
          isPast: false,
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=88"
          alt="Aethel & Julian Wedding"
          className="w-full h-full object-cover object-center scale-105 animate-[zoom_25s_infinite_alternate]"
        />
        {/* Editorial gradient scrims */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1815]/65 via-[#1C1815]/40 to-[#1C1815]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#1C1815]/20 to-[#1C1815]/70" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-24 sm:py-32 flex flex-col items-center">
        {/* Monogram Crest */}
        <div className="mb-4 inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-amber-200/30 bg-black/25 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="text-[11px] sm:text-xs tracking-[0.28em] uppercase font-medium text-amber-100">
            The Wedding of
          </span>
        </div>

        {/* Primary Couple Headline */}
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-white drop-shadow-md my-2 sm:my-4">
          <span className="inline-block hover:scale-[1.01] transition-transform">Aethel Morgan</span>
          <span className="block font-script text-4xl sm:text-6xl text-amber-200/90 my-1 sm:-my-2 font-normal">
            &
          </span>
          <span className="inline-block hover:scale-[1.01] transition-transform">Julian Vance</span>
        </h1>

        {/* Date and Location */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-neutral-200 mt-2 mb-8 tracking-wider uppercase">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-300/80" />
            {COUPLE_DATA.weddingDate}
          </span>
          <span className="opacity-40">·</span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-300/80" />
            {COUPLE_DATA.venue}
          </span>
          <span className="opacity-40">·</span>
          <span>{COUPLE_DATA.region}</span>
        </div>

        {/* Countdown / Milestone Timer Cards */}
        <div className="mb-10 w-full max-w-xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.25em] text-amber-200/80 mb-3 font-medium">
            {timeLeft.isPast ? 'Celebrating Forever Together' : 'Countdown to Forever'}
          </div>

          <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hours', val: timeLeft.hours },
              { label: 'Minutes', val: timeLeft.minutes },
              { label: 'Seconds', val: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-black/40 backdrop-blur-md border border-white/15 rounded-xl py-3 px-2 sm:py-4 flex flex-col items-center shadow-lg"
              >
                <span className="font-serif text-2xl sm:text-4xl text-white font-medium">
                  {String(item.val).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[11px] uppercase tracking-widest text-neutral-300 font-sans mt-0.5">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href="#gallery"
            className="px-6 py-3 rounded-full bg-white text-[#2C2724] font-medium text-xs sm:text-sm tracking-wider uppercase hover:bg-amber-50 hover:shadow-lg transition-all"
          >
            Explore Gallery ({totalPhotosCount} Photos)
          </a>
          <a
            href="#story"
            className="px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white font-medium text-xs sm:text-sm tracking-wider uppercase transition-all"
          >
            Read Our Story
          </a>
          <a
            href="#guestbook"
            className="px-5 py-3 rounded-full bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/40 text-amber-100 font-medium text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center gap-1.5"
          >
            <Heart className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            Leave a Wish
          </a>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <a
        href="#story"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white flex flex-col items-center gap-1 transition-colors animate-bounce"
        aria-label="Scroll down to story"
      >
        <span className="text-[10px] tracking-widest uppercase font-medium">Scroll</span>
        <ArrowDown className="w-4 h-4" />
      </a>
    </section>
  );
}
