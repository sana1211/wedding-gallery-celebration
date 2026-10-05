import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StorySection from './components/StorySection';
import TimelineSection from './components/TimelineSection';
import GallerySection from './components/GallerySection';
import MemoriesSection from './components/MemoriesSection';
import GuestbookSection from './components/GuestbookSection';
import EventDetailsSection from './components/EventDetailsSection';
import Footer from './components/Footer';
import LightboxModal from './components/LightboxModal';
import UploadPhotoModal from './components/UploadPhotoModal';
import { INITIAL_PHOTOS, INITIAL_GUEST_MESSAGES } from './data/weddingData';
import { PhotoItem, GuestMessage } from './types/wedding';

const STORAGE_PHOTOS_KEY = 'wedding_photos_v1';
const STORAGE_GUEST_KEY = 'wedding_guestbook_v1';
const STORAGE_LIKES_KEY = 'wedding_likes_v1';

export default function App() {
  // Photos state
  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PHOTOS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_PHOTOS;
  });

  // Guest messages state
  const [guestMessages, setGuestMessages] = useState<GuestMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_GUEST_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_GUEST_MESSAGES;
  });

  // User liked photo IDs
  const [likedPhotoIds, setLikedPhotoIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LIKES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return ['photo-1', 'photo-3'];
  });

  // Lightbox & Modal states
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activeGalleryFilter, setActiveGalleryFilter] = useState('all');

  // Persist photos to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PHOTOS_KEY, JSON.stringify(photos));
    } catch (e) {
      console.warn('Failed to save photos to localStorage', e);
    }
  }, [photos]);

  // Persist guest messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_GUEST_KEY, JSON.stringify(guestMessages));
    } catch (e) {
      console.warn('Failed to save guest messages to localStorage', e);
    }
  }, [guestMessages]);

  // Persist likes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LIKES_KEY, JSON.stringify(likedPhotoIds));
    } catch (e) {
      console.warn('Failed to save likes to localStorage', e);
    }
  }, [likedPhotoIds]);

  // Like / Favorite handler
  const handleToggleLike = (photoId: string) => {
    const isCurrentlyLiked = likedPhotoIds.includes(photoId);

    if (isCurrentlyLiked) {
      setLikedPhotoIds((prev) => prev.filter((id) => id !== photoId));
      setPhotos((prev) =>
        prev.map((p) => (p.id === photoId ? { ...p, likes: Math.max(0, p.likes - 1) } : p))
      );
    } else {
      setLikedPhotoIds((prev) => [...prev, photoId]);
      setPhotos((prev) =>
        prev.map((p) => (p.id === photoId ? { ...p, likes: p.likes + 1 } : p))
      );
    }
  };

  const isLiked = (photoId: string) => likedPhotoIds.includes(photoId);

  // Add guest photo
  const handleAddPhoto = (newPhoto: PhotoItem) => {
    setPhotos((prev) => [newPhoto, ...prev]);
    setActiveGalleryFilter('all');
  };

  // Add guest message
  const handleAddGuestMessage = (
    msg: Omit<GuestMessage, 'id' | 'likes' | 'cheers' | 'date'>
  ) => {
    const newEntry: GuestMessage = {
      ...msg,
      id: `gm-${Date.now()}`,
      likes: 1,
      cheers: 0,
      date: 'Today',
    };
    setGuestMessages((prev) => [newEntry, ...prev]);
  };

  const handleLikeMessage = (id: string) => {
    setGuestMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m))
    );
  };

  const handleCheersMessage = (id: string) => {
    setGuestMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, cheers: m.cheers + 1 } : m))
    );
  };

  const handleDownloadAll = () => {
    // Open high-res download for the primary featured portrait
    const featured = photos.find((p) => p.featured) || photos[0];
    if (featured) {
      const a = document.createElement('a');
      a.href = featured.url;
      a.download = `aethel-julian-wedding-${featured.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C2724] selection:bg-[#E8D8C8]">
      {/* Navigation */}
      <Navbar
        onOpenUpload={() => setIsUploadModalOpen(true)}
        favoritesCount={likedPhotoIds.length}
        onFilterFavorites={() => {
          setActiveGalleryFilter('favorites');
          const galleryEl = document.getElementById('gallery');
          galleryEl?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Hero Header */}
      <Hero totalPhotosCount={photos.length} />

      {/* Couple's Story */}
      <StorySection />

      {/* Milestone & Event Timeline */}
      <TimelineSection />

      {/* Curated Photo Gallery */}
      <GallerySection
        photos={photos}
        onOpenLightbox={(idx) => setLightboxIndex(idx)}
        onOpenUpload={() => setIsUploadModalOpen(true)}
        onToggleLike={handleToggleLike}
        isLiked={isLiked}
        activeFilter={activeGalleryFilter}
        setActiveFilter={setActiveGalleryFilter}
      />

      {/* Memories & Polaroid Wall */}
      <MemoriesSection />

      {/* Guest Messages & Wishes */}
      <GuestbookSection
        messages={guestMessages}
        onAddMessage={handleAddGuestMessage}
        onLikeMessage={handleLikeMessage}
        onCheersMessage={handleCheersMessage}
      />

      {/* Event Details & Itinerary */}
      <EventDetailsSection />

      {/* Footer */}
      <Footer onDownloadAll={handleDownloadAll} />

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <LightboxModal
          photos={photos}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          onNext={() =>
            setLightboxIndex((prev) =>
              prev !== null ? (prev + 1) % photos.length : 0
            )
          }
          onPrev={() =>
            setLightboxIndex((prev) =>
              prev !== null ? (prev - 1 + photos.length) % photos.length : 0
            )
          }
          onToggleLike={handleToggleLike}
          isLiked={isLiked}
        />
      )}

      {/* Guest Upload Modal */}
      <UploadPhotoModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onAddPhoto={handleAddPhoto}
      />
    </div>
  );
}
