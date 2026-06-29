/**
 * configRepo — per-module admin layout config in Firestore.
 *
 * Collections `table_config`, `form_config`, `page_config` hold one document
 * per module, keyed by the module id (doc id = module_id).
 */
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';

export async function getConfig<T = Record<string, unknown>>(
  col: string,
  moduleId: string
): Promise<T | null> {
  const snap = await getDoc(doc(db, col, moduleId));
  return snap.exists() ? (snap.data() as T) : null;
}

export async function listConfigs(
  col: string
): Promise<Array<Record<string, unknown> & { module_id: string }>> {
  const snap = await getDocs(collection(db, col));
  return snap.docs.map((d) => ({
    module_id: d.id,
    ...(d.data() as Record<string, unknown>),
  }));
}

export async function setConfig(
  col: string,
  moduleId: string,
  data: Record<string, unknown>
): Promise<void> {
  await setDoc(
    doc(db, col, moduleId),
    { ...data, updated_at: serverTimestamp() },
    { merge: true }
  );
}
