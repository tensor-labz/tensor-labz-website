import { createFlatRepo } from './firebase/flatRepo';

export interface HeroSlide {
  id: string | number;
  img: string;
  title?: string;
  subtitle?: string;
  cta_label?: string;
  cta_link?: string;
  sort_order?: number;
}

const heroRepo = createFlatRepo('hero');

export const fetchHeroSlides = async (
  _signal?: AbortSignal
): Promise<HeroSlide[]> => {
  void _signal; // Firestore one-shot read
  return (await heroRepo.list()) as unknown as HeroSlide[];
};
