import { fetchSheet } from './sheetsClient';

export interface HeroSlide {
  id: string;
  img: string;
  title?: string;
  subtitle?: string;
  [key: string]: unknown;
}

export const fetchHeroSlides = (signal?: AbortSignal): Promise<HeroSlide[]> =>
  fetchSheet<HeroSlide>('HeroData', signal);
