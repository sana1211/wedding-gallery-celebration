import { useState, useMemo } from 'react';
import {
  Heart,
  Grid,
  Columns,
  Search,
  Camera,
  Maximize2,
  Sparkles,
  MapPin,
  Clock,
  Filter,
} from 'lucide-react';
import { PhotoItem } from '../types/wedding';

interface GallerySectionProps {
  photos: PhotoItem[];
  onOpenLightbox: (index: number) => void;
  onOpenUpload: () => void;
  onToggleLike: (photoId: string) => void;
  isLiked: (photoId: string) => boolean;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function GallerySection({
  photos,
  onOpenLightbox,
  onOpenUpload,
  onToggleLike,
  isLiked,
  activeFilter,
  setActiveFilter,
}: GallerySectionProps) {
  const [layoutMode, setLayoutMode] = useState<'masonry' | 'columns'>('masonry');
  const [searchQuery, setSearchQuery] = useState('');

  const filterOptions = [
    { id: 'all', label: 'All Moments' },
    { id: 'ceremony', label: 'The Ceremony' },
    { id: 'portraits', label: 'Portraits' },
    { id: 'reception', label: 'Reception' },
    { id: 'party', label: 'First Dance & Party' },
    { id: 'candid', label: 'Candid Smiles' },
    { id: 'guest', label: 'Guest Snaps' },
    { id: 'favorites', label: 'Favorites' },
  ];

  // Filter and search logic
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      // Category match
      let matchesFilter = true;
      if (activeFilter === 'favorites') {
        matchesFilter = isLiked(photo.id);
      } else if (activeFilter !== 'all') {
        matchesFilter = photo.category === activeFilter;
      }

      if (!matchesFilter) return false;

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          photo.title.toLowerCase().includes(query) ||
          photo.caption.toLowerCase().includes(query) ||
          photo.location.toLowerCase().includes(query) ||
          photo.photographer.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [photos, activeFilter, searchQuery, isLiked]);

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#936E40] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Captured Memories</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2C2724] font-normal tracking-tight">
            The Wedding Gallery
          </h2>
          <div className="w-16 h-px bg-[#D5C2AA] mx-auto my-6" />
          <p className="text-sm sm:text-base text-[#6B5E54]">
            Every glance, tear, and dance step under the Mediterranean sky. Click any photograph to
            view in high resolution or start a cinematic slideshow.
          </p>
        </div>

        {/* Filter Bar & Controls */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#EDE5DA] pb-6">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {filterOptions.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide uppercase transition-all whitespace-nowrap ${
                  activeFilter === f.id
                    ? 'bg-[#2C2724] text-white shadow-xs'
                    : 'text-[#6C6054] hover:text-[#2C2724] hover:bg-[#F2ECE1]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Right Action Tools: Search, Layout & Upload */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search moments..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#E0D5C5] rounded-lg focus:outline-hidden focus:border-[#936E40] text-[#2C2724]"
              />
            </div>

            {/* Layout Mode Toggles */}
            <div className="flex items-center p-1 bg-[#F2ECE1] rounded-lg border border-[#E4DAC9]">
              <button
                onClick={() => setLayoutMode('masonry')}
                title="Masonry Grid"
                className={`p-1.5 rounded-md transition-all ${
                  layoutMode === 'masonry'
                    ? 'bg-white text-[#2C2724] shadow-xs'
                    : 'text-[#7C7166] hover:text-[#2C2724]'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setLayoutMode('columns')}
                title="Balanced Columns"
                className={`p-1.5 rounded-md transition-all ${
                  layoutMode === 'columns'
                    ? 'bg-white text-[#2C2724] shadow-xs'
                    : 'text-[#7C7166] hover:text-[#2C2724]'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Upload Button */}
            <button
              onClick={onOpenUpload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#936E40] hover:bg-[#7D5C32] text-white text-xs font-medium tracking-wide uppercase transition-colors shrink-0 shadow-xs"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Add Snaps</span>
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-[#DFD3C3] max-w-lg mx-auto p-8">
            <Camera className="w-10 h-10 text-[#C4B5A0] mx-auto mb-3" />
            <h3 className="font-serif text-2xl text-[#2C2724] mb-1">No Photos Found</h3>
            <p className="text-xs sm:text-sm text-[#7D6E60] mb-6">
              {activeFilter === 'favorites'
                ? 'You haven’t favorited any photos yet. Click the heart icon on any photo to save it here!'
                : 'No photos match your current filter or search criteria.'}
            </p>
            {activeFilter === 'favorites' ? (
              <button
                onClick={() => setActiveFilter('all')}
                className="px-4 py-2 rounded-lg bg-[#2C2724] text-white text-xs font-medium uppercase tracking-wider"
              >
                Browse All Photos
              </button>
            ) : (
              <button
                onClick={onOpenUpload}
                className="px-4 py-2 rounded-lg bg-[#936E40] text-white text-xs font-medium uppercase tracking-wider"
              >
                Upload First Photo in this Category
              </button>
            )}
          </div>
        ) : (
          <div
            className={
              layoutMode === 'masonry'
                ? 'columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            }
          >
            {filteredPhotos.map((photo) => {
              const fullIndex = photos.findIndex((p) => p.id === photo.id);
              const liked = isLiked(photo.id);

              return (
                <div
                  key={photo.id}
                  className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-white border border-[#EBE4D8] shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer"
                  onClick={() => onOpenLightbox(fullIndex >= 0 ? fullIndex : 0)}
                >
                  {/* Photo Container */}
                  <div className="relative overflow-hidden bg-[#F3ECE1]">
                    <img
                      src={photo.thumbnailUrl || photo.url}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient scrim for hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Quick Lightbox Action Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="p-3 rounded-full bg-white/25 backdrop-blur-md text-white border border-white/40 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Maximize2 className="w-5 h-5" />
                      </span>
                    </div>

                    {/* Top Right Like Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike(photo.id);
                      }}
                      title={liked ? 'Remove from favorites' : 'Add to favorites'}
                      className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
                        liked
                          ? 'bg-rose-600 text-white shadow-md'
                          : 'bg-black/30 hover:bg-black/50 text-white/90 hover:text-white'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform active:scale-125 ${
                          liked ? 'fill-white text-white' : ''
                        }`}
                      />
                    </button>

                    {/* Guest Upload Badge if from guests */}
                    {photo.category === 'guest' && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-500/90 text-white text-[10px] uppercase tracking-wider font-semibold backdrop-blur-xs">
                        Guest Snapshot
                      </div>
                    )}
                  </div>

                  {/* Caption & Metadata Footer */}
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-[#8A7D71] mb-1.5">
                      <span className="uppercase tracking-wider font-medium text-[#936E40]">
                        {photo.category}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                        {photo.likes}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg text-[#2C2724] font-medium mb-1 group-hover:text-[#936E40] transition-colors">
                      {photo.title}
                    </h3>

                    <p className="text-xs text-[#6B5E54] line-clamp-2 leading-relaxed">
                      {photo.caption}
                    </p>

                    <div className="mt-3 pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-[11px] text-[#8C7F72]">
                      <span className="flex items-center gap-1 truncate max-w-[170px]">
                        <MapPin className="w-3 h-3 text-[#B08953] shrink-0" />
                        <span className="truncate">{photo.location}</span>
                      </span>
                      {photo.time && (
                        <span className="flex items-center gap-1 shrink-0">
                          <Clock className="w-3 h-3 text-[#B08953]" />
                          <span>{photo.time}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
