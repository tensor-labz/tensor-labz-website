import { supabase } from '../lib/supabase';

export type SiteSettings = Record<string, string>;

export async function fetchSiteSettings(): Promise<SiteSettings> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('key, value');
  if (error) throw error;
  return Object.fromEntries(
    (data ?? []).map((r: { key: string; value: string }) => [r.key, r.value])
  );
}

export async function upsertSiteSettings(
  settings: SiteSettings
): Promise<void> {
  const rows = Object.entries(settings).map(([key, value]) => ({ key, value }));
  const { error } = await supabase
    .from('site_settings')
    .upsert(rows, { onConflict: 'key' });
  if (error) throw error;
}
