import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export interface SocialLink {
  platform: string;
  url: string;
}

export interface ContactRow {
  type: string;   // raw value of the `contact` column (email / phone / address / hours …)
  title: string;
  value: string;
  link?: string;  // optional explicit URL; overrides auto-derived href
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
  contact_rows: ContactRow[];
  social_links: SocialLink[];
}

const DEFAULTS: CompanyInfo = {
  name: 'Tensor Labs',
  tagline: 'Creating Sustainable Impact Through Technology',
  description:
    'Empowering creators and problem-solvers through research, innovation, and practical application.',
  logo_url: '',
  logo_url_dark: '',
  available_hours: 'Mon – Fri: 8:00 AM – 6:00 PM',
  who_we_are: '',
  vision: '',
  mission: '',
  contact_rows: [
    { type: 'address', title: 'Address',         value: 'Jaffna, Sri Lanka' },
    { type: 'email',   title: 'Email',           value: 'tensoragri@gmail.com' },
    { type: 'phone',   title: 'Phone',           value: '+94 070-595-1199' },
    { type: 'hours',   title: 'Available Hours', value: 'Mon – Fri: 8:00 AM – 6:00 PM' },
  ],
  social_links: [
    { platform: 'WhatsApp',  url: 'https://wa.me/+94705359369' },
    { platform: 'Facebook',  url: 'https://www.facebook.com/tensorlabs.tech' },
    { platform: 'LinkedIn',  url: 'https://www.linkedin.com/company/tensoragri' },
    { platform: 'Instagram', url: 'https://www.instagram.com/tensorlabs.tech' },
    { platform: 'TikTok',    url: 'https://www.tiktok.com/@tensoragri' },
    { platform: 'YouTube',   url: 'https://www.youtube.com/@TENSORAGRI' },
  ],
};

/* Module-level cache — single fetch per page load shared across all consumers */
let _cache: CompanyInfo | null = null;
let _promise: Promise<void> | null = null;

async function load(): Promise<void> {
  const [{ data: ci }, { data: social }, { data: contact }] = await Promise.all([
    supabase.from('company_info').select('*').maybeSingle(),
    supabase.from('social').select('social_media, value').order('id'),
    supabase.from('contact').select('contact, title, value').order('id'),
  ]);

  const socialLinks: SocialLink[] =
    social && social.length > 0
      ? social.map((r) => ({ platform: r.social_media ?? '', url: r.value ?? '' }))
      : DEFAULTS.social_links;

  const contactRows: ContactRow[] =
    contact && contact.length > 0
      ? contact.map((r) => ({ type: r.contact ?? '', title: r.title ?? '', value: r.value ?? '', link: r.link ?? '' }))
      : DEFAULTS.contact_rows;

  _cache = {
    name:          (ci?.name          as string) || DEFAULTS.name,
    tagline:       (ci?.tagline       as string) || DEFAULTS.tagline,
    description:   (ci?.description   as string) || DEFAULTS.description,
    logo_url:        (ci?.logo_url        as string) || DEFAULTS.logo_url,
    logo_url_dark:   (ci?.logo_url_dark   as string) || DEFAULTS.logo_url_dark,
    available_hours: (ci?.available_hours as string) || DEFAULTS.available_hours,
    who_we_are:      (ci?.who_we_are      as string) || DEFAULTS.who_we_are,
    vision:       (ci?.vision      as string) || DEFAULTS.vision,
    mission:      (ci?.mission     as string) || DEFAULTS.mission,
    contact_rows: contactRows,
    social_links: socialLinks,
  };
}

/** Returns the correct logo URL for the given theme, falling back to local asset. */
export function resolveLogo(
  info: CompanyInfo,
  theme: string,
  fallback: string
): string {
  const light = info.logo_url;
  const dark  = info.logo_url_dark;
  if (light && dark) return theme === 'dark' ? dark : light;
  return light || dark || fallback;
}

export function useCompanyInfo(): CompanyInfo {
  const [info, setInfo] = useState<CompanyInfo>(_cache ?? DEFAULTS);

  useEffect(() => {
    if (_cache) { setInfo(_cache); return; }
    if (!_promise) {
      _promise = load().then(() => { if (_cache) setInfo(_cache); });
    } else {
      _promise.then(() => { if (_cache) setInfo(_cache); });
    }
  }, []);

  return info;
}
