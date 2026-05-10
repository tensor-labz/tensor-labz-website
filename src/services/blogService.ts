import { supabase } from '../lib/supabase';

export interface BlogSocialLink {
  id: number;
  platform: string;
  url: string;
}

export type CoverMediaType = 'image' | 'video' | 'youtube' | 'drive_image' | 'drive_video';

export interface BlogAdditionalMedia {
  id: number;
  blog_id: number;
  url: string;
  type: CoverMediaType;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  cover_image?: string;
  cover_media_type: CoverMediaType;
  description?: string;
  meta_title?: string;
  content?: string;
  tags: string[];
  status: 'draft' | 'published' | 'hidden';
  social_links: BlogSocialLink[];
  additional_media: BlogAdditionalMedia[];
  created_at: string;
  updated_at: string;
}

/* ── Media type detection (used as fallback) ── */
export function detectCoverType(url?: string): CoverMediaType {
  if (!url) return 'image';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (url.includes('drive.google.com')) return 'drive_video';
  if (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(url)) return 'video';
  return 'image';
}

/* Convert any YouTube URL to embed URL */
export function toYouTubeEmbed(url: string): string {
  const short = url.match(/youtu\.be\/([^?&]+)/);
  if (short) return `https://www.youtube.com/embed/${short[1]}`;
  const watch = url.match(/[?&]v=([^&]+)/);
  if (watch) return `https://www.youtube.com/embed/${watch[1]}`;
  return url;
}

/* Parse comma-separated string OR JSON array OR PostgreSQL array → string[] */
function parseArray(val: unknown): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val as string[];
  if (typeof val === 'string') {
    const t = val.trim();
    if (t.startsWith('[')) {
      try { return JSON.parse(t) as string[]; } catch { /* fall through */ }
    }
    return t.split(',').map((s) => s.trim()).filter(Boolean);
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

  const rawMedia = row.blog_additional_media;
  const additional_media: BlogAdditionalMedia[] = Array.isArray(rawMedia)
    ? (rawMedia as Record<string, unknown>[]).map((m) => ({
        id: m.id as number,
        blog_id: m.blog_id as number,
        url: (m.url as string) ?? '',
        type: (m.type as CoverMediaType) ?? 'image',
      }))
    : [];

  const cover_image = (row.cover_image as string) || undefined;

  return {
    id: row.id as number,
    title: (row.title as string) ?? '',
    slug: (row.slug as string) ?? '',
    cover_image,
    cover_media_type: (row.cover_image_type as CoverMediaType) || detectCoverType(cover_image),
    description: (row.description as string) || undefined,
    meta_title: (row.meta_title as string) || undefined,
    content: (row.content as string) || undefined,
    tags: parseArray(row.tags),
    status: (row.status as Blog['status']) ?? 'draft',
    social_links,
    additional_media,
    created_at: (row.created_at as string) ?? '',
    updated_at: (row.updated_at as string) ?? '',
  };
}

const BLOG_SELECT = `
  *,
  blog_social_links ( id, platform, url ),
  blog_additional_media ( id, blog_id, url, type )
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
