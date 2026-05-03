import { fetchSheet } from './sheetsClient';

export interface AboutItem {
  [key: string]: unknown;
}

export const fetchAboutData = (signal?: AbortSignal): Promise<AboutItem[]> =>
  fetchSheet<AboutItem>('AboutData', signal);
