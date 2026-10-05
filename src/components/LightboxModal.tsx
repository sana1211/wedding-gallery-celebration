import { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Info,
  Download,
  Share2,
  Play,
  Pause,
  MapPin,
  Clock,
  Camera as CameraIcon,
  Check,
} from 'lucide-react';
import { PhotoItem } from '../types/wedding';

interface LightboxModalProps {
  photos: PhotoItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onToggleLike: (photoId: string) => void;
  isLiked: (photoId: string) => boolean;
}

export default function LightboxModal({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
  onToggleLike,
  isLiked,
}: LightboxModalProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showInfo, setShowInfo] = useState<boolean>(true);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const currentPhoto = photos[currentIndex];

  // Handle keyboard events (Left, Right, Escape, Space for play)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === ' ') {
        e.preventDefault();
        setIsSlideshowPlaying((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onNext, onPrev, onClose]);

  // Slideshow timer
  useEffect(() => {
    if (!isOpen || !isSlideshowPlaying) return;

    const interval = setInterval(() => {
      onNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [isOpen, isSlideshowPlaying, onNext]);

  // Reset zoom on photo switch
  useEffect(() => {
    setZoomLevel(1);
  }, [currentIndex]);

  if (!isOpen || !currentPhoto) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // Download image
    const a = document.createElement('a');
    a.href = currentPhoto.url;
    a.download = `${currentPhoto.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md select-none">
      {/* Top Bar Controls */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/80 to-transparent">
        {/* Counter and Title */}
        <div className="flex items-center gap-3 text-white">
          <span className="text-xs font-mono tracking-wider text-amber-200">
            {currentIndex + 1} / {photos.length}
          </span>
          <span className="text-neutral-500">|</span>
          <span className="font-serif text-sm sm:text-base tracking-wide hidden sm:inline truncate max-w-sm">
            {currentPhoto.title}
          </span>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-3 text-white">
          {/* Slideshow button */}
          <button
            onClick={() => setIsSlideshowPlaying(!isSlideshowPlaying)}
            title={isSlideshowPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
            className={`p-2 rounded-full transition-colors ${
              isSlideshowPlaying ? 'bg-amber-400 text-black' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {isSlideshowPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Zoom toggle */}
          <button
            onClick={() => setZoomLevel((z) => (z === 1 ? 1.75 : 1))}
            title={zoomLevel > 1 ? 'Zoom Out' : 'Zoom In'}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors hidden sm:block"
          >
            {zoomLevel > 1 ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>

          {/* Info toggle */}
          <button
            onClick={() => setShowInfo(!showInfo)}
            title="Toggle Details"
            className={`p-2 rounded-full transition-colors ${
              showInfo ? 'bg-white/30 text-white' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            title="Share Photo Link"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          {/* Download */}
          <button
            onClick={handleDownload}
            title="Open/Download Image"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            title="Close Lightbox (Esc)"
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-14 overflow-hidden">
        <img
          src={currentPhoto.url}
          alt={currentPhoto.title}
          style={{ transform: `scale(${zoomLevel})` }}
          className="max-h-[85vh] max-w-[92vw] object-contain transition-transform duration-300 shadow-2xl rounded-sm cursor-zoom-in"
          onClick={() => setZoomLevel((z) => (z === 1 ? 1.75 : 1))}
        />
      </div>

      {/* Prev / Next Arrows */}
      <button
        onClick={onPrev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white border border-white/20 transition-all z-20 backdrop-blur-xs"
        aria-label="Previous Photo"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white border border-white/20 transition-all z-20 backdrop-blur-xs"
        aria-label="Next Photo"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Info Bar / Drawer */}
      {showInfo && (
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/75 to-transparent text-white">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-3 text-xs text-amber-200">
                <span className="uppercase tracking-widest font-medium">
                  {currentPhoto.category}
                </span>
                <span className="text-neutral-500">·</span>
                <span className="flex items-center gap-1 text-neutral-300">
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  {currentPhoto.location}
                </span>
                {currentPhoto.time && (
                  <>
                    <span className="text-neutral-500">·</span>
                    <span className="flex items-center gap-1 text-neutral-300">
                      <Clock className="w-3.5 h-3.5" />
                      {currentPhoto.time}
                    </span>
                  </>
                )}
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-white">
                {currentPhoto.title}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                {currentPhoto.caption}
              </p>

              {currentPhoto.cameraInfo && (
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-neutral-400 font-mono">
                  <span className="flex items-center gap-1">
                    <CameraIcon className="w-3 h-3 text-amber-400" />
                    {currentPhoto.cameraInfo.camera}
                  </span>
                  <span>·</span>
                  <span>{currentPhoto.cameraInfo.lens}</span>
                  <span>·</span>
                  <span>{currentPhoto.cameraInfo.aperture}</span>
                  <span>·</span>
                  <span>ISO {currentPhoto.cameraInfo.iso}</span>
                </div>
              )}
            </div>

            {/* Like button in Lightbox */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onToggleLike(currentPhoto.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide uppercase transition-all ${
                  isLiked(currentPhoto.id)
                    ? 'bg-rose-600 text-white'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    isLiked(currentPhoto.id) ? 'fill-white text-white' : ''
                  }`}
                />
                <span>{currentPhoto.likes} Favorites</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
