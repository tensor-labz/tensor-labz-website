import { supabase } from '../lib/supabase';

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
  twitter_url?: string;
  linkedin_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  media_images: string[]; // gallery images after content
  media_video?: string;   // optional video after content
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
    twitter_url: (row.twitter_url as string) || undefined,
    linkedin_url: (row.linkedin_url as string) || undefined,
    facebook_url: (row.facebook_url as string) || undefined,
    instagram_url: (row.instagram_url as string) || undefined,
    youtube_url: (row.youtube_url as string) || undefined,
    media_images: parseArray(row.media_images),
    media_video: (row.media_video as string) || undefined,
    created_at: (row.created_at as string) ?? '',
    updated_at: (row.updated_at as string) ?? '',
  };
}

export async function fetchPublishedBlogs(): Promise<Blog[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(rowToBlog);
}

export async function fetchBlogBySlug(slug: string): Promise<Blog | null> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) return null;
  return data ? rowToBlog(data as Record<string, unknown>) : null;
}
