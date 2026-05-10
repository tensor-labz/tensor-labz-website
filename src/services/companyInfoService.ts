import { supabase } from '../lib/supabase';

export interface SocialLink {
  platform: string;
  url: string;
}

export interface ContactRow {
  type: string; // raw value of the `contact` column (email / phone / address / hours …)
  title: string;
  value: string;
  link?: string; // optional explicit URL; overrides auto-derived href
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  logo_url: string;
  logo_url_dark: string;
  available_hours: string;
  who_we_are: string;
  vision: string;
  mission: string;
  domains: string; // comma-separated capability tags e.g. "Mechatronics,PCB Design"
  contact_rows: ContactRow[];
  social_links: SocialLink[];
}

export const DEFAULTS: CompanyInfo = {
  name: '',
  tagline: '',
  description: '',
  logo_url: '',
  logo_url_dark: '',
  available_hours: '',
  who_we_are: '',
  vision: '',
  mission: '',
  domains: '',
  contact_rows: [],
  social_links: [],
};

export async function fetchCompanyInfo(signal?: AbortSignal): Promise<CompanyInfo> {
  const [{ data: ci }, { data: social }, { data: contact }] = await Promise.all(
    [
      supabase.from('company_info').select('*').maybeSingle(),
      supabase.from('social').select('social_media, value').order('id'),
      supabase
        .from('contact')
        .select('contact, title, value, link')
        .order('id'),
    ]
  );

  // AbortSignal is accepted for future use / cancellation signalling;
  // the supabase-js v2 client does not yet propagate it, but the parameter
  // keeps the signature compatible with createAsyncThunk's { signal }.
  void signal;

  const socialLinks: SocialLink[] =
    social && social.length > 0
      ? social.map((r) => ({
          platform: r.social_media ?? '',
          url: r.value ?? '',
        }))
      : DEFAULTS.social_links;

  const contactRows: ContactRow[] =
    contact && contact.length > 0
      ? contact.map((r) => ({
          type: r.contact ?? '',
          title: r.title ?? '',
          value: r.value ?? '',
          link: r.link ?? '',
        }))
      : DEFAULTS.contact_rows;

  return {
    name: (ci?.name as string) || DEFAULTS.name,
    tagline: (ci?.tagline as string) || DEFAULTS.tagline,
    description: (ci?.description as string) || DEFAULTS.description,
    logo_url: (ci?.logo_url as string) || DEFAULTS.logo_url,
    logo_url_dark: (ci?.logo_url_dark as string) || DEFAULTS.logo_url_dark,
    available_hours:
      (ci?.available_hours as string) || DEFAULTS.available_hours,
    who_we_are: (ci?.who_we_are as string) || DEFAULTS.who_we_are,
    vision: (ci?.vision as string) || DEFAULTS.vision,
    mission: (ci?.mission as string) || DEFAULTS.mission,
    domains: (ci?.domains as string) || DEFAULTS.domains,
    contact_rows: contactRows,
    social_links: socialLinks,
  };
}
