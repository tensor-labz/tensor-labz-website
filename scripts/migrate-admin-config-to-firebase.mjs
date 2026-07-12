/**
 * migrate-admin-config-to-firebase.mjs
 *
 * Migrates the per-module admin layout config tables → Firestore, keyed by
 * module id (doc id = module_id):
 *
 *   table_config · form_config · page_config
 *
 * Run:
 *   node --env-file=.env scripts/migrate-admin-config-to-firebase.mjs
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

const TABLES = ['table_config', 'form_config', 'page_config'];

async function migrateTable(table) {
  const { data, error } = await supabase.from(table).select('*');
  if (error) {
    console.log(`  ! ${table}: ${error.message} (skipped)`);
    return;
  }
  let n = 0;
  for (const row of data ?? []) {
    const { id, module_id, ...rest } = row;
    void id;
    if (!module_id) continue;
    await db
      .collection(table)
      .doc(module_id)
      .set(
        { ...rest, updated_at: FieldValue.serverTimestamp() },
        { merge: true }
      );
    n++;
  }
  console.log(`✓ ${table}: migrated ${n} (doc id = module_id)`);
}

async function run() {
  for (const t of TABLES) await migrateTable(t);
  console.log('\nDone. Admin config migrated.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
