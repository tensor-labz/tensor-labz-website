/**
 * flatRepo — generic Firestore CRUD for simple flat collections.
 *
 * Used by the config collections that are 1:1 key/value rows (hero, about,
 * contact, social, about_media, company_info, site_settings). Each record is
 * `{ id: docId, ...fields }`; writes strip `id` and stamp timestamps, and every
 * mutation appends to a `logs` subcollection (same audit shape as the others).
 */
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';

export type FlatRecord = Record<string, unknown> & { id: string };

export function createFlatRepo(col: string) {
  const writeLog = async (
    id: string,
    by: string,
    action: 'create' | 'update',
    change: Record<string, unknown>
  ): Promise<void> => {
    await addDoc(collection(db, col, id, 'logs'), {
      by,
      action,
      change,
      notification_ref: null,
      timestamp: serverTimestamp(),
    });
  };

  const strip = (data: Record<string, unknown>): Record<string, unknown> => {
    const { id: _id, ...rest } = data;
    void _id;
    return rest;
  };

  async function list(): Promise<FlatRecord[]> {
    const snap = await getDocs(collection(db, col));
    const recs = snap.docs.map(
      (d) =>
        ({ id: d.id, ...(d.data() as Record<string, unknown>) }) as FlatRecord
    );
    return recs.sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
  }

  async function get(id: string): Promise<FlatRecord | null> {
    const snap = await getDoc(doc(db, col, id));
    return snap.exists()
      ? ({
          id: snap.id,
          ...(snap.data() as Record<string, unknown>),
        } as FlatRecord)
      : null;
  }

  async function create(
    data: Record<string, unknown>,
    by = 'admin'
  ): Promise<FlatRecord> {
    const payload = strip(data);
    const ref = await addDoc(collection(db, col), {
      ...payload,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
    await writeLog(ref.id, by, 'create', payload);
    return { id: ref.id, ...payload } as FlatRecord;
  }

  async function update(
    id: string,
    data: Record<string, unknown>,
    by = 'admin'
  ): Promise<FlatRecord> {
    const payload = strip(data);
    const ref = doc(db, col, id);
    const before = (await getDoc(ref)).data() as
      | Record<string, unknown>
      | undefined;
    await updateDoc(ref, { ...payload, updated_at: serverTimestamp() });
    const change: Record<string, { from: unknown; to: unknown }> = {};
    for (const [k, v] of Object.entries(payload)) {
      const prev = before?.[k];
      if (JSON.stringify(prev) !== JSON.stringify(v))
        change[k] = { from: prev ?? null, to: v };
    }
    await writeLog(id, by, 'update', change);
    return { id, ...(before ?? {}), ...payload } as FlatRecord;
  }

  async function remove(id: string): Promise<void> {
    const logs = await getDocs(collection(db, col, id, 'logs'));
    const batch = writeBatch(db);
    logs.forEach((l) => batch.delete(l.ref));
    batch.delete(doc(db, col, id));
    await batch.commit();
  }

  return { list, get, create, update, remove };
}
