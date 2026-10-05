import { ArrowUp, Heart, Download } from 'lucide-react';
import { COUPLE_DATA } from '../data/weddingData';

interface FooterProps {
  onDownloadAll: () => void;
}

export default function Footer({ onDownloadAll }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#24201D] text-[#ECE5D8] py-16 sm:py-20 border-t border-[#3A332E] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Monogram */}
        <div className="mb-6">
          <span className="font-script text-5xl sm:text-6xl text-amber-200">
            A & J
          </span>
          <div className="font-serif uppercase tracking-[0.3em] text-xs text-neutral-400 mt-2">
            Aethel Morgan & Julian Vance
          </div>
        </div>

        {/* Date & Location */}
        <p className="text-xs sm:text-sm text-neutral-300 tracking-wider uppercase mb-8">
          {COUPLE_DATA.weddingDate} · {COUPLE_DATA.venue} · {COUPLE_DATA.region}
        </p>

        {/* Download All Gallery button */}
        <div className="mb-10 inline-flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onDownloadAll}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium uppercase tracking-wider transition-colors border border-white/20"
          >
            <Download className="w-3.5 h-3.5 text-amber-300" />
            <span>Download Selected High-Res Album</span>
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-widest text-neutral-400 mb-12">
          <a href="#story" className="hover:text-amber-200 transition-colors">
            Our Story
          </a>
          <span>·</span>
          <a href="#timeline" className="hover:text-amber-200 transition-colors">
            Timeline
          </a>
          <span>·</span>
          <a href="#gallery" className="hover:text-amber-200 transition-colors">
            Gallery
          </a>
          <span>·</span>
          <a href="#memories" className="hover:text-amber-200 transition-colors">
            Memories
          </a>
          <span>·</span>
          <a href="#guestbook" className="hover:text-amber-200 transition-colors">
            Guestbook
          </a>
          <span>·</span>
          <a href="#details" className="hover:text-amber-200 transition-colors">
            Event Guide
          </a>
        </div>

        <div className="w-24 h-px bg-white/15 mx-auto mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p className="flex items-center gap-1.5 justify-center sm:justify-start">
            <span>Create By</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>Sankalpa Sithmina</span>
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
