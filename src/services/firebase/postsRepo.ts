/**
 * postsRepo — Firestore CRUD for the `posts` collection.
 *
 *   posts/{autoId}              ← post doc (doc id is the identifier)
 *   posts/{autoId}/logs/{id}    ← audit trail on every mutation
 *
 * Two read shapes:
 *  - admin record (flat keys matching the posts module form fields)
 *  - public `Post` (consumed by the public pages — shape preserved)
 *
 * Child sets are embedded arrays: social_links[{platform,url}],
 * additional_media[{img_url,type}].
 */
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { Post, CoverMediaType } from '../postService';

const COL = 'posts';

interface CoverImage {
  img_url: string;
  type: string;
}
interface PostDoc {
  title: string;
  cover_image: CoverImage;
  description: string;
  meta: { title: string; description: string; keyword: string[] };
  content: string;
  tags: string[];
  status: 'draft' | 'published' | 'hidden';
  order: number;
  social_links: { platform: string; url: string }[];
  additional_media: { img_url: string; type: string }[];
  created_at?: Timestamp;
  updated_at?: Timestamp;
}

/** Admin record — flat keys mirroring the posts module form fields. */
export interface PostAdminRecord {
  id: string;
  title: string;
  cover_image: string;
  cover_image_type: string;
  description: string;
  meta_title: string;
  content: string;
  tags: string[];
  status: 'draft' | 'published' | 'hidden';
  sort_order: number;
  social_links: { platform: string; url: string }[];
  additional_media: { type: string; url: string }[];
}

const isoFrom = (t?: Timestamp): string =>
  t && typeof t.toDate === 'function' ? t.toDate().toISOString() : '';

/* storage → admin record (flat keys for the form/table) */
function toAdminRecord(id: string, d: PostDoc): PostAdminRecord {
  return {
    id,
    title: d.title ?? '',
    cover_image: d.cover_image?.img_url ?? '',
    cover_image_type: d.cover_image?.type ?? 'image',
    description: d.description ?? '',
    meta_title: d.meta?.title ?? '',
    content: d.content ?? '',
    tags: d.tags ?? [],
    status: d.status ?? 'draft',
    sort_order: typeof d.order === 'number' ? d.order : 0,
    social_links: (d.social_links ?? []).map((l) => ({
      platform: l.platform ?? '',
      url: l.url ?? '',
    })),
    additional_media: (d.additional_media ?? []).map((m) => ({
      type: m.type ?? 'image',
      url: m.img_url ?? '',
    })),
  };
}

/* storage → public Post (shape preserved for the public pages) */
function toPost(id: string, d: PostDoc): Post {
  return {
    id,
    title: d.title ?? '',
    slug: id, // routing now uses the doc id
    cover_image: d.cover_image?.img_url || undefined,
    cover_media_type: (d.cover_image?.type ?? 'image') as CoverMediaType,
    description: d.description || undefined,
    meta_title: d.meta?.title || undefined,
    content: d.content || undefined,
    tags: d.tags ?? [],
    status: d.status ?? 'draft',
    social_links: (d.social_links ?? []).map((l, i) => ({
      id: i,
      platform: l.platform ?? '',
      url: l.url ?? '',
    })),
    additional_media: (d.additional_media ?? []).map((m, i) => ({
      id: i,
      post_id: 0,
      url: m.img_url ?? '',
      type: (m.type ?? 'image') as CoverMediaType,
    })),
    created_at: isoFrom(d.created_at),
    updated_at: isoFrom(d.updated_at),
  };
}

/* admin form data → storage fields (only keys present in `data`) */
function toStorage(data: Record<string, unknown>): Partial<PostDoc> {
  const out: Partial<PostDoc> = {};
  if ('title' in data) out.title = String(data.title ?? '');
  if ('cover_image' in data || 'cover_image_type' in data) {
    out.cover_image = {
      img_url: String(data.cover_image ?? ''),
      type: String(data.cover_image_type ?? 'image'),
    };
  }
  if ('description' in data) out.description = String(data.description ?? '');
  if ('content' in data) out.content = String(data.content ?? '');
  if ('tags' in data)
    out.tags = Array.isArray(data.tags) ? (data.tags as string[]) : [];
  if ('status' in data) out.status = data.status as PostDoc['status'];
  if ('sort_order' in data) out.order = Number(data.sort_order ?? 0);
  if ('meta_title' in data || 'description' in data || 'tags' in data) {
    out.meta = {
      title: String(data.meta_title ?? ''),
      description: String(data.description ?? ''),
      keyword: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    };
  }
  if ('social_links' in data && Array.isArray(data.social_links)) {
    out.social_links = (data.social_links as Record<string, unknown>[])
      .filter((r) => !r._deleted)
      .map((r) => ({
        platform: String(r.platform ?? ''),
        url: String(r.url ?? ''),
      }));
  }
  if ('additional_media' in data && Array.isArray(data.additional_media)) {
    out.additional_media = (data.additional_media as Record<string, unknown>[])
      .filter((r) => !r._deleted)
      .map((r) => ({
        img_url: String(r.url ?? ''),
        type: String(r.type ?? 'image'),
      }));
  }
  return out;
}

async function writeLog(
  postId: string,
  by: string,
  action: 'create' | 'update',
  change: Record<string, unknown>
): Promise<void> {
  await addDoc(collection(db, COL, postId, 'logs'), {
    by,
    action,
    change,
    notification_ref: null,
    timestamp: serverTimestamp(),
  });
}

/* ── Admin (CRUD) ── */

export async function listPostsForAdmin(): Promise<PostAdminRecord[]> {
  const snap = await getDocs(query(collection(db, COL), orderBy('order')));
  return snap.docs.map((d) => toAdminRecord(d.id, d.data() as PostDoc));
}

export async function getPostAdmin(
  id: string
): Promise<PostAdminRecord | null> {
  const snap = await getDoc(doc(db, COL, id));
  return snap.exists() ? toAdminRecord(snap.id, snap.data() as PostDoc) : null;
}

export async function createPost(
  data: Record<string, unknown>,
  by = 'admin'
): Promise<PostAdminRecord> {
  const storage = toStorage(data);
  if (storage.order === undefined) storage.order = 0;
  const ref = await addDoc(collection(db, COL), {
    ...storage,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  });
  await writeLog(ref.id, by, 'create', storage as Record<string, unknown>);
  const fresh = await getDoc(ref);
  return toAdminRecord(ref.id, fresh.data() as PostDoc);
}

export async function updatePost(
  id: string,
  data: Record<string, unknown>,
  by = 'admin'
): Promise<PostAdminRecord> {
  const ref = doc(db, COL, id);
  const before = (await getDoc(ref)).data() as PostDoc | undefined;
  const patch = toStorage(data);
  await updateDoc(ref, { ...patch, updated_at: serverTimestamp() });

  const change: Record<string, { from: unknown; to: unknown }> = {};
  const beforeMap = (before ?? {}) as unknown as Record<string, unknown>;
  for (const [k, v] of Object.entries(patch)) {
    if (JSON.stringify(beforeMap[k]) !== JSON.stringify(v))
      change[k] = { from: beforeMap[k] ?? null, to: v };
  }
  await writeLog(id, by, 'update', change);

  const fresh = await getDoc(ref);
  return toAdminRecord(id, fresh.data() as PostDoc);
}

export async function deletePost(id: string): Promise<void> {
  const logs = await getDocs(collection(db, COL, id, 'logs'));
  const batch = writeBatch(db);
  logs.forEach((l) => batch.delete(l.ref));
  batch.delete(doc(db, COL, id));
  await batch.commit();
}

/* ── Public ── */

export async function listPublishedPosts(): Promise<Post[]> {
  const snap = await getDocs(
    query(collection(db, COL), where('status', '==', 'published'))
  );
  // Sort on the raw docs (order asc, then created_at desc) to avoid a
  // composite index, then map to the public shape.
  const docs = snap.docs.slice().sort((a, b) => {
    const da = a.data() as PostDoc;
    const dbb = b.data() as PostDoc;
    const ao = da.order ?? 0;
    const bo = dbb.order ?? 0;
    if (ao !== bo) return ao - bo;
    return isoFrom(dbb.created_at).localeCompare(isoFrom(da.created_at));
  });
  return docs.map((d) => toPost(d.id, d.data() as PostDoc));
}

export async function getPostPublic(id: string): Promise<Post | null> {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  const d = snap.data() as PostDoc;
  if (d.status !== 'published') return null;
  return toPost(snap.id, d);
}
