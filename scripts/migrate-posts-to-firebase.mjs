/**
 * migrate-posts-to-firebase.mjs
 *
 * Migrates Supabase `posts` (+ child tables) → Firestore `posts` collection.
 *
 *   posts/{autoId}                ← doc id is the identifier (no id/slug fields)
 *   posts/{autoId}/logs/{autoId}  ← audit trail (seeded 'create')
 *
 * Child tables collapse into embedded arrays:
 *   post_social_links     → social_links:     [{ platform, url }]
 *   post_additional_media → additional_media: [{ img_url, type }]
 *
 * Run (published posts only — anon key + RLS):
 *   node --env-file=.env scripts/migrate-posts-to-firebase.mjs
 *
 * Idempotent: matches an existing post by `title`; auto-id for new ones.
 */
import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const KEY_PATH =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ??
  './tensor-labz-website-firebase-adminsdk-fbsvc-e6d67a02f0.json';
initializeApp({ credential: cert(JSON.parse(readFileSync(KEY_PATH, 'utf8'))) });
const db = getFirestore();

const POST_SELECT = `
  *,
  post_social_links ( id, platform, url ),
  post_additional_media ( id, post_id, url, type )
`;

function parseArray(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    const t = val.trim();
    if (t.startsWith('[')) {
      try {
        return JSON.parse(t);
      } catch {
        /* fall through */
      }
    }
    return t
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function detectCoverType(url) {
  if (!url) return 'image';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (url.includes('drive.google.com')) return 'drive_video';
  if (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(url)) return 'video';
  return 'image';
}

const ts = (iso) => (iso ? Timestamp.fromDate(new Date(iso)) : null);

async function migrate() {
  const { data, error } = await supabase
    .from('posts')
    .select(POST_SELECT)
    .order('sort_order', { ascending: true });

  if (error) throw new Error(error.message);
  if (!data?.length) {
    console.log('No posts returned (anon key returns published only).');
    return;
  }

  let n = 0;
  for (const row of data) {
    const coverUrl = row.cover_image || '';
    const doc = {
      title: row.title ?? '',
      cover_image: {
        img_url: coverUrl,
        type: row.cover_image_type || detectCoverType(coverUrl),
      },
      description: row.description ?? '',
      meta: {
        title: row.meta_title ?? '',
        description: row.description ?? '',
        keyword: parseArray(row.tags),
      },
      content: row.content ?? '',
      tags: parseArray(row.tags),
      status: row.status ?? 'draft',
      order: row.sort_order ?? 0,
      social_links: Array.isArray(row.post_social_links)
        ? row.post_social_links.map((l) => ({
            platform: l.platform ?? '',
            url: l.url ?? '',
          }))
        : [],
      additional_media: Array.isArray(row.post_additional_media)
        ? row.post_additional_media.map((m) => ({
            img_url: m.url ?? '',
            type: m.type ?? 'image',
          }))
        : [],
      created_at: ts(row.created_at) ?? FieldValue.serverTimestamp(),
      updated_at: ts(row.updated_at) ?? FieldValue.serverTimestamp(),
    };

    // Idempotent: match by title (no id/slug stored).
    const existing = await db
      .collection('posts')
      .where('title', '==', doc.title)
      .limit(1)
      .get();
    const ref = existing.empty
      ? db.collection('posts').doc()
      : existing.docs[0].ref;

    await ref.set(doc, { merge: true });
    if (existing.empty) {
      await ref.collection('logs').add({
        by: 'migration',
        action: 'create',
        timestamp: FieldValue.serverTimestamp(),
        change: {},
        notification_ref: null,
      });
    }
    n++;
    console.log(`✓ posts/${ref.id} — ${doc.title}`);
  }

  console.log(`\nDone. Migrated ${n} post(s).`);
}

migrate().catch((e) => {
  console.error(e);
  process.exit(1);
});
