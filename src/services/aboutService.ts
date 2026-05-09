import { supabase } from '../lib/supabase';

export interface AboutItem {
  id: number;
  components: string;
  value: string;
}

export const fetchAboutData = async (
  signal?: AbortSignal
): Promise<AboutItem[]> => {
  const { data, error } = await supabase
    .from('about')
    .select('*')
    .order('id')
    .abortSignal(signal!);
  if (error) throw new Error(error.message);
  return (data ?? []) as AboutItem[];
};
