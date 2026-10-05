import { useState } from 'react';
import { X, Upload, Camera, Image as ImageIcon, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PhotoItem } from '../types/wedding';

interface UploadPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPhoto: (photo: PhotoItem) => void;
}

export default function UploadPhotoModal({
  isOpen,
  onClose,
  onAddPhoto,
}: UploadPhotoModalProps) {
  const [title, setTitle] = useState('');
  const [photographer, setPhotographer] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState<PhotoItem['category']>('guest');
  const [imageDataUrl, setImageDataUrl] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select an image file (JPEG, PNG, WebP).');
      return;
    }

    // Limit client-side size to ~6MB
    if (file.size > 6 * 1024 * 1024) {
      setErrorMsg('Image size should be under 6MB.');
      return;
    }

    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = () => {
      setImageDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageDataUrl) {
      setErrorMsg('Please select a photo to upload.');
      return;
    }

    const newPhoto: PhotoItem = {
      id: `guest-${Date.now()}`,
      url: imageDataUrl,
      thumbnailUrl: imageDataUrl,
      title: title.trim() || 'Wedding Memory',
      category: category,
      caption: caption.trim() || 'Captured with love during the celebration.',
      date: 'October 4, 2026',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      location: 'Villa Cimbrone, Ravello',
      photographer: photographer.trim() || 'Guest Snapshot',
      likes: 1,
      aspectRatio: 'landscape',
    };

    onAddPhoto(newPhoto);

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#936E40', '#F2ECE1'],
    });

    // Reset and close
    setTitle('');
    setPhotographer('');
    setCaption('');
    setImageDataUrl('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FDFBF7] rounded-3xl border border-[#EDE5DA] max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-[#F2ECE1] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#936E40] font-semibold mb-1">
            <Camera className="w-3.5 h-3.5" />
            <span>Guest Contributions</span>
          </div>
          <h3 className="font-serif text-3xl text-[#2C2724]">
            Share Your Wedding Snaps
          </h3>
          <p className="text-xs text-[#7A6D60] mt-1">
            Did you capture a spontaneous laugh, a quiet dance, or a sunset toast? Add it to the couple’s gallery!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Upload Box */}
          <div className="border-2 border-dashed border-[#D6C7B2] rounded-2xl p-6 text-center hover:bg-[#FAF6EE] transition-colors relative cursor-pointer">
            <input
              type="file"
              accept="image/*"
              required={!imageDataUrl}
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            {imageDataUrl ? (
              <div className="space-y-3">
                <div className="max-h-48 mx-auto rounded-xl overflow-hidden border border-[#D5C2AA] inline-block shadow-xs">
                  <img
                    src={imageDataUrl}
                    alt="Preview"
                    className="max-h-48 w-auto object-contain mx-auto"
                  />
                </div>
                <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-700 font-medium">
                  <Check className="w-4 h-4" />
                  <span>Photo selected! Tap to change</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2 py-4">
                <Upload className="w-8 h-8 text-[#936E40] mx-auto opacity-80" />
                <div className="text-xs font-medium text-[#463D36]">
                  Click to select or drag and drop a photograph
                </div>
                <div className="text-[11px] text-[#8C7F72]">
                  JPEG, PNG, HEIC up to 6MB
                </div>
              </div>
            )}
          </div>

          {errorMsg && (
            <p className="text-xs text-rose-600 text-center">{errorMsg}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#6B5E54] font-medium mb-1">
                Photo Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Midnight Confetti Dance"
                className="w-full px-4 py-2.5 text-sm bg-white border border-[#E0D5C5] rounded-xl focus:outline-hidden focus:border-[#936E40]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#6B5E54] font-medium mb-1">
                Your Name / Photographer
              </label>
              <input
                type="text"
                value={photographer}
                onChange={(e) => setPhotographer(e.target.value)}
                placeholder="e.g. Aunt Claire"
                className="w-full px-4 py-2.5 text-sm bg-white border border-[#E0D5C5] rounded-xl focus:outline-hidden focus:border-[#936E40]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#6B5E54] font-medium mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as PhotoItem['category'])}
              className="w-full px-4 py-2.5 text-sm bg-white border border-[#E0D5C5] rounded-xl focus:outline-hidden focus:border-[#936E40]"
            >
              <option value="guest">Guest Snapshot</option>
              <option value="candid">Candid Moment</option>
              <option value="reception">Reception & Dinner</option>
              <option value="party">Dancefloor & Party</option>
              <option value="ceremony">Ceremony</option>
              <option value="portraits">Portraits</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#6B5E54] font-medium mb-1">
              Caption / Story Behind the Shot
            </label>
            <textarea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Tell Aethel & Julian what happened in this moment..."
              className="w-full px-4 py-2.5 text-sm bg-white border border-[#E0D5C5] rounded-xl focus:outline-hidden focus:border-[#936E40]"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-medium text-[#6B5E54] hover:bg-[#F2ECE1]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#936E40] hover:bg-[#7D5C32] text-white text-xs font-medium uppercase tracking-wider transition-colors shadow-xs"
            >
              Add to Gallery
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
