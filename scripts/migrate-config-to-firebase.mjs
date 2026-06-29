/**
 * migrate-config-to-firebase.mjs
 *
 * Migrates the simple Supabase config tables → Firestore collections of the
 * same name (auto doc-ids; original `id` dropped; an `order` field added for
 * stable sorting; a seeded `logs` entry per row).
 *
 *   hero · about · contact · social · about_media · company_info · site_settings
 *
 * Wipe + reseed (these tables are small and fully re-creatable):
 *   node --env-file=.env scripts/migrate-config-to-firebase.mjs
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

const TABLES = [
  'hero',
  'about',
  'contact',
  'social',
  'about_media',
  'company_info',
  'site_settings',
];

async function wipe(col) {
  const snap = await db.collection(col).get();
  for (const d of snap.docs) await db.recursiveDelete(d.ref);
  return snap.size;
}

async function migrateTable(table) {
  const { data, error } = await supabase.from(table).select('*');
  if (error) {
    console.log(`  ! ${table}: ${error.message} (skipped)`);
    return;
  }
  const deleted = await wipe(table);
  let n = 0;
  const rows = data ?? [];
  for (let i = 0; i < rows.length; i++) {
    const { id, ...rest } = rows[i];
    const order = rest.sort_order ?? id ?? i;
    const ref = db.collection(table).doc();
    await ref.set({ ...rest, order });
    await ref.collection('logs').add({
      by: 'migration',
      action: 'create',
      timestamp: FieldValue.serverTimestamp(),
      change: {},
      notification_ref: null,
    });
    n++;
  }
  console.log(`✓ ${table}: wiped ${deleted}, migrated ${n}`);
}

async function run() {
  for (const t of TABLES) await migrateTable(t);
  console.log('\nDone. Config collections migrated.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
