/**
 * servicesRepo — Firestore CRUD for the `services` collection.
 *
 *   services/{autoId}             ← service doc
 *   services/{autoId}/logs/{id}   ← audit trail written on every mutation
 *
 * The repo is the single mapping point between storage field names
 * (`imageurl`, `order`) and the UI/admin field names (`imageURL`, `sort_order`).
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
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';

const COL = 'services';

/** Stored shape in Firestore. */
interface ServiceDoc {
  id?: number; // legacy Supabase id, kept for reference
  title: string;
  slug: string;
  description: string;
  imageurl: string;
  icon: string;
  show_in_home: boolean;
  order: number;
}

/** Shape consumed by the admin UI (matches the `services` module field keys). */
export interface ServiceRecord {
  id: string; // Firestore document id
  title: string;
  slug: string;
  description: string;
  imageURL: string;
  icon: string;
  show_in_home: boolean;
  sort_order: number;
}

/* storage → UI record */
function toRecord(id: string, d: ServiceDoc): ServiceRecord {
  return {
    id,
    title: d.title ?? '',
    slug: d.slug ?? '',
    description: d.description ?? '',
    imageURL: d.imageurl ?? '',
    icon: d.icon ?? '',
    show_in_home: Boolean(d.show_in_home),
    sort_order: typeof d.order === 'number' ? d.order : 0,
  };
}

/* UI form data → storage fields (only the keys present in `data`) */
function toStorage(data: Record<string, unknown>): Partial<ServiceDoc> {
  const out: Partial<ServiceDoc> = {};
  if ('title' in data) out.title = String(data.title ?? '');
  if ('slug' in data) out.slug = String(data.slug ?? '');
  if ('description' in data) out.description = String(data.description ?? '');
  if ('imageURL' in data) out.imageurl = String(data.imageURL ?? '');
  if ('icon' in data) out.icon = String(data.icon ?? '');
  if ('show_in_home' in data) out.show_in_home = Boolean(data.show_in_home);
  if ('sort_order' in data) out.order = Number(data.sort_order ?? 0);
  return out;
}

async function writeLog(
  serviceId: string,
  by: string,
  action: 'create' | 'update',
  change: Record<string, unknown>
): Promise<void> {
  await addDoc(collection(db, COL, serviceId, 'logs'), {
    by,
    action,
    change,
    notification_ref: null, // wired later
    timestamp: serverTimestamp(),
  });
}

export async function listServices(): Promise<ServiceRecord[]> {
  const snap = await getDocs(query(collection(db, COL), orderBy('order')));
  return snap.docs.map((d) => toRecord(d.id, d.data() as ServiceDoc));
}

export async function getService(id: string): Promise<ServiceRecord | null> {
  const snap = await getDoc(doc(db, COL, id));
  return snap.exists() ? toRecord(snap.id, snap.data() as ServiceDoc) : null;
}

export async function createService(
  data: Record<string, unknown>,
  by = 'admin'
): Promise<ServiceRecord> {
  const storage = toStorage(data);
  if (storage.order === undefined) storage.order = 0;
  const ref = await addDoc(collection(db, COL), storage);
  await writeLog(ref.id, by, 'create', storage as Record<string, unknown>);
  return toRecord(ref.id, storage as ServiceDoc);
}

export async function updateService(
  id: string,
  data: Record<string, unknown>,
  by = 'admin'
): Promise<ServiceRecord> {
  const ref = doc(db, COL, id);
  const before = (await getDoc(ref)).data() as ServiceDoc | undefined;
  const patch = toStorage(data);
  await updateDoc(ref, patch);

  const change: Record<string, { from: unknown; to: unknown }> = {};
  const beforeMap = (before ?? {}) as unknown as Record<string, unknown>;
  for (const [k, v] of Object.entries(patch)) {
    const prev = beforeMap[k];
    if (prev !== v) change[k] = { from: prev ?? null, to: v };
  }
  await writeLog(id, by, 'update', change);

  return toRecord(id, { ...(before ?? {}), ...patch } as ServiceDoc);
}

export async function deleteService(id: string): Promise<void> {
  // Delete the doc and its logs subcollection in one batch.
  const logs = await getDocs(collection(db, COL, id, 'logs'));
  const batch = writeBatch(db);
  logs.forEach((l) => batch.delete(l.ref));
  batch.delete(doc(db, COL, id));
  await batch.commit();
}
