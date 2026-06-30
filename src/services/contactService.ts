import { createFlatRepo } from './firebase/flatRepo';

export interface ContactItem {
  id: string | number;
  contact: string;
  title: string;
  value: string;
  link?: string;
}

const contactRepo = createFlatRepo('contact');

export const fetchContactData = async (
  _signal?: AbortSignal
): Promise<ContactItem[]> => {
  void _signal; // Firestore one-shot read
  return (await contactRepo.list()) as unknown as ContactItem[];
};
