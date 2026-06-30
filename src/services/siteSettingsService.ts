import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { createFlatRepo } from './firebase/flatRepo';

export type SiteSettings = Record<string, string>;

const settingsRepo = createFlatRepo('site_settings');

export async function fetchSiteSettings(): Promise<SiteSettings> {
  const rows = await settingsRepo.list();
  return Object.fromEntries(
    rows.map((r) => [String(r.key), String(r.value ?? '')])
  );
}

export async function upsertSiteSettings(
  settings: SiteSettings
): Promise<void> {
  // Map existing key → doc id, then update-or-create per key.
  const snap = await getDocs(collection(db, 'site_settings'));
  const idByKey = new Map<string, string>();
  snap.forEach((d) => {
    const key = (d.data() as Record<string, unknown>).key;
    if (key) idByKey.set(String(key), d.id);
  });

  for (const [key, value] of Object.entries(settings)) {
    const existingId = idByKey.get(key);
    if (existingId) {
      await updateDoc(doc(db, 'site_settings', existingId), {
        value,
        updated_at: serverTimestamp(),
      });
    } else {
      await addDoc(collection(db, 'site_settings'), {
        key,
        value,
        order: 0,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });
    }
  }
}
