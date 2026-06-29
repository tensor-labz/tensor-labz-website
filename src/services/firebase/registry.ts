/**
 * Firestore repo registry — maps an admin module/table id to its Firestore
 * CRUD repo. Modules absent from this map stay on Supabase (adminSlice).
 */
import * as servicesRepo from './servicesRepo';
import * as postsRepo from './postsRepo';

export interface FirestoreRepo {
  list: () => Promise<unknown[]>;
  get: (id: string) => Promise<unknown>;
  create: (data: Record<string, unknown>, by: string) => Promise<unknown>;
  update: (
    id: string,
    data: Record<string, unknown>,
    by: string
  ) => Promise<unknown>;
  remove: (id: string) => Promise<void>;
}

export const FIRESTORE_REPOS: Record<string, FirestoreRepo> = {
  services: {
    list: servicesRepo.listServices,
    get: servicesRepo.getService,
    create: servicesRepo.createService,
    update: servicesRepo.updateService,
    remove: servicesRepo.deleteService,
  },
  posts: {
    list: postsRepo.listPostsForAdmin,
    get: postsRepo.getPostAdmin,
    create: postsRepo.createPost,
    update: postsRepo.updatePost,
    remove: postsRepo.deletePost,
  },
};

/** True if the given module/table id is backed by Firestore (not Supabase). */
export const isFirestoreModule = (tableId: string): boolean =>
  tableId in FIRESTORE_REPOS;
