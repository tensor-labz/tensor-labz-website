import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

export interface MediaItem {
  id: number;
  type: 'video' | 'image';
  url: string;
  title: string;
  sort_order: number;
}

let _cache: MediaItem[] | null = null;

export function useAboutMedia() {
  const [items, setItems] = useState<MediaItem[]>(_cache ?? []);
  const [loading, setLoading] = useState(_cache === null);

  useEffect(() => {
    if (_cache !== null) return;
    supabase
      .from('about_media')
      .select('id, type, url, title, sort_order')
      .order('sort_order')
      .then(({ data }) => {
        _cache = (data as MediaItem[]) ?? [];
        setItems(_cache);
        setLoading(false);
      });
  }, []);

  return { items, loading };
}
