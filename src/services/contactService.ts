import { fetchSheet } from './sheetsClient';

export interface ContactItem {
  [key: string]: unknown;
}

export const fetchContactData = (signal?: AbortSignal): Promise<ContactItem[]> =>
  fetchSheet<ContactItem>('ContactData', signal);
