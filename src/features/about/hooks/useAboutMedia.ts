import { useState, useEffect } from 'react';
import { createFlatRepo } from '../../../services/firebase/flatRepo';

export interface MediaItem {
  id: string | number;
  type: 'video' | 'image';
  url: string;
  title: string;
  sort_order: number;
}

const aboutMediaRepo = createFlatRepo('about_media');

let _cache: MediaItem[] | null = null;

export function useAboutMedia() {
  const [items, setItems] = useState<MediaItem[]>(_cache ?? []);
  const [loading, setLoading] = useState(_cache === null);

  useEffect(() => {
    if (_cache !== null) return;
    aboutMediaRepo.list().then((rows) => {
      _cache = rows as unknown as MediaItem[];
      setItems(_cache);
      setLoading(false);
    });
  }, []);

  return { items, loading };
}
