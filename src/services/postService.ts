import { type CoverTypeValue } from '../shared/components/ui/CoverTypeSelect';
import { listPublishedPosts, getPostPublic } from './firebase/postsRepo';

export interface PostSocialLink {
  id: number;
  platform: string;
  url: string;
}

export type CoverMediaType = CoverTypeValue;

export interface PostAdditionalMedia {
  id: number;
  post_id: number;
  url: string;
  type: CoverMediaType;
}

export interface Post {
  id: string;
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

/* A still-image URL usable as a card thumbnail for any cover.
 * YouTube → its thumbnail image; plain images → as-is; direct video → no thumb. */
export function coverThumbnail(
  url?: string,
  type?: CoverMediaType
): string | undefined {
  if (!url) return undefined;
  const kind = type ?? detectCoverType(url);
  if (kind === 'youtube') {
    const short = url.match(/youtu\.be\/([^?&]+)/);
    const watch = url.match(/[?&]v=([^&]+)/);
    const embed = url.match(/embed\/([^?&/]+)/);
    const id = short?.[1] ?? watch?.[1] ?? embed?.[1];
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : undefined;
  }
  if (kind === 'video' || kind === 'drive_video') return undefined;
  return url;
}

/* Data now lives in Firestore — these delegate to postsRepo. */

export async function fetchPublishedPosts(): Promise<Post[]> {
  return listPublishedPosts();
}

/** Fetch a single published post by its Firestore document id. */
export async function fetchPostById(id: string): Promise<Post | null> {
  return getPostPublic(id);
}
