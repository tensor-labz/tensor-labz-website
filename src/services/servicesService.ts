import { supabase } from '../lib/supabase';
import type { ServiceCardProps } from '../shared/types/service';

export const fetchServices = async (
  signal?: AbortSignal
): Promise<ServiceCardProps[]> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('id', { ascending: true })
    .abortSignal(signal!);
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    service_name: row.title,
    description: row.description,
    icon: row.imageurl ?? '',
    show_in_home: row.show_in_home,
  })) as ServiceCardProps[];
};
