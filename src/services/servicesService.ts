import { fetchSheet } from './sheetsClient';
import type { ServiceCardProps } from '../shared/types/service';

export const fetchServices = (
  signal?: AbortSignal
): Promise<ServiceCardProps[]> =>
  fetchSheet<ServiceCardProps>('ServiceData', signal);
