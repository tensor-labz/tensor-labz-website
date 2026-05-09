import { supabase } from '../lib/supabase';

export interface SocialLink {
  id: number;
  social_media: string;
  value: string;
}

export const fetchSocialLinks = async (
  signal?: AbortSignal
): Promise<SocialLink[]> => {
  const { data, error } = await supabase
    .from('social')
    .select('*')
    .order('id')
    .abortSignal(signal!);
  if (error) throw new Error(error.message);
  return (data ?? []) as SocialLink[];
};
