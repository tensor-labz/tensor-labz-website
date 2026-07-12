import { createFlatRepo } from './firebase/flatRepo';

export interface AboutItem {
  id: string | number;
  components: string;
  value: string;
}

const aboutRepo = createFlatRepo('about');

export const fetchAboutData = async (
  _signal?: AbortSignal
): Promise<AboutItem[]> => {
  void _signal; // Firestore one-shot read
  return (await aboutRepo.list()) as unknown as AboutItem[];
};
