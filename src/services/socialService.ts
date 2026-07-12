import { createFlatRepo } from './firebase/flatRepo';

export interface SocialLink {
  id: string | number;
  social_media: string;
  value: string;
}

const socialRepo = createFlatRepo('social');

export const fetchSocialLinks = async (
  _signal?: AbortSignal
): Promise<SocialLink[]> => {
  void _signal; // Firestore one-shot read
  return (await socialRepo.list()) as unknown as SocialLink[];
};
