/**
 * migrate-services-to-firebase.mjs
 *
 * Migrates the Supabase `services` table → Firestore `services` collection.
 *
 *   services/{id}                       ← doc id = original Supabase id
 *   services/{id}/logs/{autoId}         ← audit trail (seeded with a 'create' entry)
 *
 * Run (Node 20+, reads .env automatically):
 *   node --env-file=.env scripts/migrate-services-to-firebase.mjs
 *
 * Requires: GOOGLE_APPLICATION_CREDENTIALS or the admin SDK JSON at repo root.
 * Idempotent: re-running overwrites services/{id} (merge) and adds a log entry.
 */
import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// ── Supabase ──
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// ── Firebase Admin ──
const KEY_PATH =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ??
  './tensor-labz-website-firebase-adminsdk-fbsvc-e6d67a02f0.json';
initializeApp({ credential: cert(JSON.parse(readFileSync(KEY_PATH, 'utf8'))) });
const db = getFirestore();

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

async function migrate() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw new Error(error.message);
  if (!data?.length) {
    console.log('No services returned from Supabase (check RLS / keys).');
    return;
  }

  let n = 0;
  for (const row of data) {
    const doc = {
      id: row.id, // original Supabase id kept as a field
      title: row.title ?? '',
      slug: row.slug || slugify(row.title), // keep existing slug; fallback from title
      description: row.description ?? '',
      imageurl: row.imageurl ?? row.imageURL ?? '',
      icon: row.icon ?? '',
      show_in_home: Boolean(row.show_in_home),
      order: row.id, // services table has no order column → default to id
    };

    // Idempotent: match on the `id` field; auto-id for new docs.
    const existing = await db
      .collection('services')
      .where('id', '==', row.id)
      .limit(1)
      .get();
    const ref = existing.empty
      ? db.collection('services').doc() // auto Firestore id
      : existing.docs[0].ref;

    await ref.set(doc, { merge: true });
    if (existing.empty) {
      await ref.collection('logs').add({
        by: 'migration',
        action: 'create',
        timestamp: FieldValue.serverTimestamp(),
        change: {},
        notification_ref: null, // wired later
      });
    }
    n++;
    console.log(`✓ services/${ref.id} — ${doc.title}`);
  }

  console.log(`\nDone. Migrated ${n} service(s).`);
}

migrate().catch((e) => {
  console.error(e);
  process.exit(1);
});
