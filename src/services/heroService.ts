import { supabase } from '../lib/supabase';

export interface HeroSlide {
  id: number;
  img: string;
  title?: string;
  subtitle?: string;
  cta_label?: string;
  cta_link?: string;
  sort_order?: number;
}

export const fetchHeroSlides = async (
  signal?: AbortSignal
): Promise<HeroSlide[]> => {
  const { data, error } = await supabase
    .from('hero')
    .select('*')
    .order('id')
    .abortSignal(signal!);
  if (error) throw new Error(error.message);
  return (data ?? []) as HeroSlide[];
};
