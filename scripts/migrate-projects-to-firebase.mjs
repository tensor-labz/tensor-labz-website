/**
 * migrate-projects-to-firebase.mjs
 *
 * Migrates Supabase `projects` → Firestore `projects` collection.
 *
 *   projects/{autoId}              ← doc id is the identifier (no id/slug fields)
 *   projects/{autoId}/logs/{id}    ← audit trail (seeded 'create')
 *
 * - imageurl                  → cover_image { img_url, type:'image' }
 * - extraimages + vedio_demo  → additional_media [{ img_url, type }]
 * - service_id (legacy)       → service (DocumentReference → services/{docId})
 * - sort_order                → order
 *
 * Run (all projects — table has no status):
 *   node --env-file=.env scripts/migrate-projects-to-firebase.mjs
 *
 * Idempotent: matches an existing project by `title`.
 */
import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const KEY_PATH =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ??
  './tensor-labz-website-firebase-adminsdk-fbsvc-e6d67a02f0.json';
initializeApp({ credential: cert(JSON.parse(readFileSync(KEY_PATH, 'utf8'))) });
const db = getFirestore();

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

async function migrate() {
  // Build legacy service id → Firestore service doc ref map.
  const servicesSnap = await db.collection('services').get();
  const serviceRefByLegacyId = new Map();
  servicesSnap.forEach((s) => {
    const legacy = s.data().id;
    if (legacy !== undefined && legacy !== null)
      serviceRefByLegacyId.set(Number(legacy), s.ref);
  });
  console.log(`Loaded ${serviceRefByLegacyId.size} services for ref mapping.`);

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw new Error(error.message);
  if (!data?.length) {
    console.log('No projects returned.');
    return;
  }

  let n = 0;
  for (const row of data) {
    const coverUrl = row.imageurl || row.imageURL || '';
    const extra = (
      Array.isArray(row.extraimages)
        ? row.extraimages
        : Array.isArray(row.extraImages)
          ? row.extraImages
          : []
    ).map((url) => ({ img_url: url, type: 'image' }));
    if (row.vedio_demo)
      extra.push({
        img_url: row.vedio_demo,
        type: detectCoverType(row.vedio_demo),
      });

    const serviceRef = serviceRefByLegacyId.get(Number(row.service_id)) ?? null;

    const doc = {
      title: row.title ?? '',
      cover_image: { img_url: coverUrl, type: 'image' },
      description: row.description ?? '',
      content: row.content ?? '',
      service: serviceRef,
      tags: parseArray(row.tags),
      additional_media: extra,
      is_top: Boolean(row.is_top),
      order: row.sort_order ?? row.id ?? 0,
      created_at: FieldValue.serverTimestamp(),
      updated_at: FieldValue.serverTimestamp(),
    };

    const existing = await db
      .collection('projects')
      .where('title', '==', doc.title)
      .limit(1)
      .get();
    const ref = existing.empty
      ? db.collection('projects').doc()
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
    console.log(
      `✓ projects/${ref.id} — ${doc.title} (service: ${serviceRef ? serviceRef.id : 'none'})`
    );
  }

  console.log(`\nDone. Migrated ${n} project(s).`);
}

migrate().catch((e) => {
  console.error(e);
  process.exit(1);
});
