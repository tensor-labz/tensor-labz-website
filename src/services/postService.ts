import { supabase } from '../lib/supabase';

export interface PostSocialLink {
  id: number;
  platform: string;
  url: string;
}

export type CoverMediaType = 'image' | 'video' | 'youtube' | 'drive_image' | 'drive_video';

export interface PostAdditionalMedia {
  id: number;
  post_id: number;
  url: string;
  type: CoverMediaType;
}

export interface Post {
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
  social_links: PostSocialLink[];
  additional_media: PostAdditionalMedia[];
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

function rowToPost(row: Record<string, unknown>): Post {
  const rawLinks = row.post_social_links;
  const social_links: PostSocialLink[] = Array.isArray(rawLinks)
    ? (rawLinks as Record<string, unknown>[]).map((l) => ({
        id: l.id as number,
        platform: (l.platform as string) ?? '',
        url: (l.url as string) ?? '',
      }))
    : [];

  const rawMedia = row.post_additional_media;
  const additional_media: PostAdditionalMedia[] = Array.isArray(rawMedia)
    ? (rawMedia as Record<string, unknown>[]).map((m) => ({
        id: m.id as number,
        post_id: m.post_id as number,
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
    status: (row.status as Post['status']) ?? 'draft',
    social_links,
    additional_media,
    created_at: (row.created_at as string) ?? '',
    updated_at: (row.updated_at as string) ?? '',
  };
}

const POST_SELECT = `
  *,
  post_social_links ( id, platform, url ),
  post_additional_media ( id, post_id, url, type )
`;

export async function fetchPublishedPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(POST_SELECT)
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => rowToPost(row as Record<string, unknown>));
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select(POST_SELECT)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) return null;
  return data ? rowToPost(data as Record<string, unknown>) : null;
}
