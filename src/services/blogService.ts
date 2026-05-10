import { supabase } from '../lib/supabase';

export interface BlogSocialLink {
  id: number;
  platform: string;
  url: string;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  cover_image?: string;
  description?: string;   // internal / meta description
  meta_title?: string;    // SEO title override
  content?: string;       // rich text HTML
  tags: string[];
  status: 'draft' | 'published' | 'hidden';
  social_links: BlogSocialLink[];
  media_images: string[];
  media_video?: string;
  created_at: string;
  updated_at: string;
}

/* Parse comma-separated string OR JSON array OR PostgreSQL array → string[] */
function parseArray(val: unknown): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val as string[];
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (trimmed.startsWith('[')) {
      try { return JSON.parse(trimmed) as string[]; } catch { /* fall through */ }
    }
    return trimmed.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

function rowToBlog(row: Record<string, unknown>): Blog {
  const rawLinks = row.blog_social_links;
  const social_links: BlogSocialLink[] = Array.isArray(rawLinks)
    ? (rawLinks as Record<string, unknown>[]).map((l) => ({
        id: l.id as number,
        platform: (l.platform as string) ?? '',
        url: (l.url as string) ?? '',
      }))
    : [];

  return {
    id: row.id as number,
    title: (row.title as string) ?? '',
    slug: (row.slug as string) ?? '',
    cover_image: (row.cover_image as string) || undefined,
    description: (row.description as string) || undefined,
    meta_title: (row.meta_title as string) || undefined,
    content: (row.content as string) || undefined,
    tags: parseArray(row.tags),
    status: (row.status as Blog['status']) ?? 'draft',
    social_links,
    media_images: parseArray(row.media_images),
    media_video: (row.media_video as string) || undefined,
    created_at: (row.created_at as string) ?? '',
    updated_at: (row.updated_at as string) ?? '',
  };
}

const BLOG_SELECT = `
  *,
  blog_social_links ( id, platform, url )
`;

export async function fetchPublishedBlogs(): Promise<Blog[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select(BLOG_SELECT)
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => rowToBlog(row as Record<string, unknown>));
}

export async function fetchBlogBySlug(slug: string): Promise<Blog | null> {
  const { data, error } = await supabase
    .from('blogs')
    .select(BLOG_SELECT)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) return null;
  return data ? rowToBlog(data as Record<string, unknown>) : null;
}
