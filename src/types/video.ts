
export interface VideoItem {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  url: string;
  duration?: string; // in seconds or formatted string
  watched: boolean;
  dateAdded: string;
}

export interface VideoPlaylist {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  source: 'youtube' | 'custom';
  playlistUrl?: string;
  videos: VideoItem[];
  dateAdded: string;
  lastUpdated: string;
  progress: number; // percentage of watched videos
}
