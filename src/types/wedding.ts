export interface PhotoItem {
  id: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  category: 'ceremony' | 'portraits' | 'reception' | 'party' | 'candid' | 'guest';
  caption: string;
  date: string;
  time?: string;
  location: string;
  photographer: string;
  likes: number;
  featured?: boolean;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  cameraInfo?: {
    camera: string;
    lens: string;
    focalLength: string;
    aperture: string;
    iso: string;
  };
}

export interface TimelineMilestone {
  id: string;
  date: string;
  title: string;
  location: string;
  description: string;
  quote?: string;
  image: string;
  type: 'milestone' | 'wedding_day';
  badge?: string;
}

export interface GuestMessage {
  id: string;
  name: string;
  relation: string;
  message: string;
  blessingTag: string;
  date: string;
  avatarUrl?: string;
  photoUrl?: string;
  likes: number;
  cheers: number;
}

export interface PolaroidMemory {
  id: string;
  imageUrl: string;
  caption: string;
  date: string;
  rotation: string;
  note: string;
  pinColor?: string;
}

export interface WeddingVow {
  author: string;
  role: string;
  excerpt: string;
  fullVow: string;
}
