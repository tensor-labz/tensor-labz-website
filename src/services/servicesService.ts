import type { ServiceCardProps } from '../shared/types/service';
import { listServices } from './firebase/servicesRepo';

export const fetchServices = async (
  signal?: AbortSignal
): Promise<ServiceCardProps[]> => {
  void signal; // Firestore one-shot read; AbortSignal not applicable
  const rows = await listServices();
  return rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    service_name: r.title,
    description: r.description,
    icon: r.imageURL ?? '',
    show_in_home: r.show_in_home,
  }));
};
