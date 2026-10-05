import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Camera, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynth';

interface NavbarProps {
  onOpenUpload: () => void;
  favoritesCount: number;
  onFilterFavorites: () => void;
}

export default function Navbar({ onOpenUpload, favoritesCount, onFilterFavorites }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMusic = () => {
    const playing = romanticAudio.toggle();
    setIsMusicPlaying(playing);
  };

  const navLinks = [
    { label: 'Our Story', href: '#story' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Memories', href: '#memories' },
    { label: 'Guestbook', href: '#guestbook' },
    { label: 'Event Details', href: '#details' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#EBE4D8] py-3.5 shadow-xs'
          : 'bg-gradient-to-b from-[#2C2724]/30 via-transparent to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monogram / Brand */}
        <a
          href="#"
          className="group flex items-center gap-3 transition-transform hover:opacity-90"
        >
          <span
            className={`font-script text-3xl sm:text-4xl transition-colors ${
              isScrolled ? 'text-[#8C6D38]' : 'text-amber-200'
            }`}
          >
            A & J
          </span>
          <div className="hidden sm:flex flex-col border-l border-current/25 pl-3">
            <span
              className={`font-serif tracking-widest text-xs uppercase font-medium ${
                isScrolled ? 'text-[#2C2724]' : 'text-white'
              }`}
            >
              Aethel & Julian
            </span>
            <span
              className={`text-[10px] tracking-wider uppercase ${
                isScrolled ? 'text-[#847A70]' : 'text-white/80'
              }`}
            >
              The Kingsbury Colombo · Oct 4, 2026
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs uppercase tracking-widest transition-colors font-medium relative group ${
                isScrolled
                  ? 'text-[#4A423A] hover:text-[#936E40]'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                  isScrolled ? 'bg-[#936E40]' : 'bg-white'
                }`}
              />
            </a>
          ))}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Ambient Music Player Toggle */}
          <button
            onClick={toggleMusic}
            title={isMusicPlaying ? 'Mute ambient melody' : 'Play romantic acoustic melody'}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              isMusicPlaying
                ? 'bg-[#EADECE] text-[#6A4E23] border border-[#D5C2AA]'
                : isScrolled
                ? 'bg-[#F2ECE1] text-[#5C5248] hover:bg-[#EBE2D4]'
                : 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-xs'
            }`}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                <span className="hidden sm:inline">Melody On</span>
                <span className="flex items-end gap-0.5 h-3 ml-0.5">
                  <span className="w-0.5 bg-[#8C6D38] h-full animate-[bounce_0.8s_infinite]" />
                  <span className="w-0.5 bg-[#8C6D38] h-2/3 animate-[bounce_1.2s_infinite]" />
                  <span className="w-0.5 bg-[#8C6D38] h-4/5 animate-[bounce_1s_infinite]" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 opacity-80" />
                <span className="hidden sm:inline">Play Melody</span>
              </>
            )}
          </button>

          {/* Favorites quick link if user liked any */}
          {favoritesCount > 0 && (
            <button
              onClick={onFilterFavorites}
              title="View my favorited photos"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                isScrolled
                  ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/60'
                  : 'bg-rose-500/30 text-white hover:bg-rose-500/40 backdrop-blur-xs'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>{favoritesCount}</span>
            </button>
          )}

          {/* Add Guest Photo Button */}
          <button
            onClick={onOpenUpload}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all shadow-xs ${
              isScrolled
                ? 'bg-[#2C2724] text-[#FDFBF7] hover:bg-[#433B36]'
                : 'bg-white text-[#2C2724] hover:bg-[#FDFBF7]'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Photos</span>
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg md:hidden transition-colors ${
              isScrolled ? 'text-[#2C2724] hover:bg-[#F2ECE1]' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-b border-[#EBE4D8] px-6 py-6 space-y-4 shadow-lg animate-in fade-in duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium tracking-wider uppercase text-[#4A423A] hover:text-[#936E40] py-2 border-b border-[#F4EFE6]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenUpload();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#2C2724] text-white text-xs font-medium uppercase tracking-wider"
            >
              <Camera className="w-4 h-4" />
              Upload Guest Photos
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
