/**
 * projectsRepo — Firestore CRUD for the `projects` collection.
 *
 *   projects/{autoId}            ← project doc
 *   projects/{autoId}/logs/{id}  ← audit trail on every mutation
 *
 * `service` is stored as a DocumentReference → services/{docId}; the app layer
 * reads it back as the service doc-id (string) so it stays Redux-serializable.
 *
 * The admin form keeps its flat fields (imageURL, service_id, extraImages,
 * vedio_demo, …); the repo splits/merges those into the stored
 * cover_image{img_url,type} + additional_media[{img_url,type}] shape.
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
  type DocumentReference,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { detectCoverType } from '../postService';
import type { ProjectItem } from '../../shared/types/project';

const COL = 'projects';

interface Media {
  img_url: string;
  type: string;
}
interface ProjectDoc {
  title: string;
  cover_image: { img_url: string; type: string };
  description: string;
  content: string;
  service: DocumentReference | null;
  tags: string[];
  additional_media: Media[];
  is_top: boolean;
  order: number;
}

/** Admin record — flat keys mirroring the projects module form fields. */
export interface ProjectAdminRecord {
  id: string;
  imageURL: string;
  title: string;
  service_id: string;
  sort_order: number;
  tags: string[];
  description: string;
  content: string;
  vedio_demo: string;
  extraImages: string[];
  is_top: boolean;
}

/* storage → admin record (flat keys for the form/table) */
function toAdminRecord(id: string, d: ProjectDoc): ProjectAdminRecord {
  const media = d.additional_media ?? [];
  return {
    id,
    imageURL: d.cover_image?.img_url ?? '',
    title: d.title ?? '',
    service_id: d.service?.id ?? '',
    sort_order: typeof d.order === 'number' ? d.order : 0,
    tags: d.tags ?? [],
    description: d.description ?? '',
    content: d.content ?? '',
    vedio_demo: media.find((m) => m.type !== 'image')?.img_url ?? '',
    extraImages: media.filter((m) => m.type === 'image').map((m) => m.img_url),
    is_top: Boolean(d.is_top),
  };
}

/* storage → public ProjectItem */
function toProject(id: string, d: ProjectDoc): ProjectItem {
  return {
    id,
    slug: id, // routing uses the doc id; slug echoes it for existing links
    title: d.title ?? '',
    imageURL: d.cover_image?.img_url ?? '',
    description: d.description ?? '',
    service: d.service?.id ?? '',
    tags: d.tags ?? [],
    content: d.content || undefined,
    is_top: Boolean(d.is_top),
    additional_media: (d.additional_media ?? []).map((m) => ({
      url: m.img_url,
      type: m.type,
    })),
  };
}

/* admin form data → storage (only keys present in `data`) */
function toStorage(data: Record<string, unknown>): Partial<ProjectDoc> {
  const out: Partial<ProjectDoc> = {};
  if ('title' in data) out.title = String(data.title ?? '');
  if ('imageURL' in data)
    out.cover_image = { img_url: String(data.imageURL ?? ''), type: 'image' };
  if ('description' in data) out.description = String(data.description ?? '');
  if ('content' in data) out.content = String(data.content ?? '');
  if ('tags' in data)
    out.tags = Array.isArray(data.tags) ? (data.tags as string[]) : [];
  if ('is_top' in data) out.is_top = Boolean(data.is_top);
  if ('sort_order' in data) out.order = Number(data.sort_order ?? 0);
  if ('service_id' in data) {
    const sid = String(data.service_id ?? '');
    out.service = sid ? doc(db, 'services', sid) : null;
  }
  if ('extraImages' in data || 'vedio_demo' in data) {
    const images = Array.isArray(data.extraImages)
      ? (data.extraImages as string[])
      : [];
    const media: Media[] = images.map((url) => ({
      img_url: url,
      type: 'image',
    }));
    const video = String(data.vedio_demo ?? '');
    if (video) media.push({ img_url: video, type: detectCoverType(video) });
    out.additional_media = media;
  }
  return out;
}

async function writeLog(
  projectId: string,
  by: string,
  action: 'create' | 'update',
  change: Record<string, unknown>
): Promise<void> {
  await addDoc(collection(db, COL, projectId, 'logs'), {
    by,
    action,
    change,
    notification_ref: null,
    timestamp: serverTimestamp(),
  });
}

/* ── Admin (CRUD) ── */

export async function listProjectsForAdmin(): Promise<ProjectAdminRecord[]> {
  const snap = await getDocs(query(collection(db, COL), orderBy('order')));
  return snap.docs.map((d) => toAdminRecord(d.id, d.data() as ProjectDoc));
}

export async function getProjectAdmin(
  id: string
): Promise<ProjectAdminRecord | null> {
  const snap = await getDoc(doc(db, COL, id));
  return snap.exists()
    ? toAdminRecord(snap.id, snap.data() as ProjectDoc)
    : null;
}

export async function createProject(
  data: Record<string, unknown>,
  by = 'admin'
): Promise<ProjectAdminRecord> {
  const storage = toStorage(data);
  if (storage.order === undefined) storage.order = 0;
  const ref = await addDoc(collection(db, COL), {
    ...storage,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  });
  await writeLog(ref.id, by, 'create', logChange(storage));
  const fresh = await getDoc(ref);
  return toAdminRecord(ref.id, fresh.data() as ProjectDoc);
}

export async function updateProject(
  id: string,
  data: Record<string, unknown>,
  by = 'admin'
): Promise<ProjectAdminRecord> {
  const ref = doc(db, COL, id);
  const before = (await getDoc(ref)).data() as ProjectDoc | undefined;
  const patch = toStorage(data);
  await updateDoc(ref, { ...patch, updated_at: serverTimestamp() });

  const change: Record<string, { from: unknown; to: unknown }> = {};
  const beforeLog = logChange(before ?? {});
  const patchLog = logChange(patch);
  for (const [k, v] of Object.entries(patchLog)) {
    if (JSON.stringify(beforeLog[k]) !== JSON.stringify(v))
      change[k] = { from: beforeLog[k] ?? null, to: v };
  }
  await writeLog(id, by, 'update', change);

  const fresh = await getDoc(ref);
  return toAdminRecord(id, fresh.data() as ProjectDoc);
}

export async function deleteProject(id: string): Promise<void> {
  const logs = await getDocs(collection(db, COL, id, 'logs'));
  const batch = writeBatch(db);
  logs.forEach((l) => batch.delete(l.ref));
  batch.delete(doc(db, COL, id));
  await batch.commit();
}

/* Serialize a storage patch for the audit log (refs → their id). */
function logChange(p: Partial<ProjectDoc>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...p };
  if ('service' in p) out.service = p.service ? p.service.id : null;
  return out;
}

/* ── Public ── */

export async function listProjectsPublic(): Promise<ProjectItem[]> {
  const snap = await getDocs(query(collection(db, COL), orderBy('order')));
  return snap.docs.map((d) => toProject(d.id, d.data() as ProjectDoc));
}
