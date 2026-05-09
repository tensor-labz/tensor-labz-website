import { supabase } from '../lib/supabase';

export interface ContactItem {
  id: number;
  contact: string;
  title: string;
  value: string;
}

export const fetchContactData = async (
  signal?: AbortSignal
): Promise<ContactItem[]> => {
  const { data, error } = await supabase
    .from('contact')
    .select('*')
    .order('id')
    .abortSignal(signal);
  if (error) throw new Error(error.message);
  return (data ?? []) as ContactItem[];
};
