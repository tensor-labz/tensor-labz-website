import { createFlatRepo } from './firebase/flatRepo';

const ciRepo = createFlatRepo('company_info');
const socialRepo = createFlatRepo('social');
const contactRepo = createFlatRepo('contact');

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

export async function fetchCompanyInfo(
  _signal?: AbortSignal
): Promise<CompanyInfo> {
  void _signal; // Firestore one-shot read
  const [ciRows, social, contact] = await Promise.all([
    ciRepo.list(),
    socialRepo.list(),
    contactRepo.list(),
  ]);
  const ci = (ciRows[0] ?? {}) as Record<string, unknown>;

  const socialLinks: SocialLink[] =
    social && social.length > 0
      ? social.map((r) => ({
          platform: (r.social_media as string) ?? '',
          url: (r.value as string) ?? '',
        }))
      : DEFAULTS.social_links;

  const contactRows: ContactRow[] =
    contact && contact.length > 0
      ? contact.map((r) => ({
          type: (r.contact as string) ?? '',
          title: (r.title as string) ?? '',
          value: (r.value as string) ?? '',
          link: (r.link as string) ?? '',
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
