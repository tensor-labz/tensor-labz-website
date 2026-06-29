/**
 * Firestore repo registry — maps an admin module/table id to its Firestore
 * CRUD repo. Modules absent from this map stay on Supabase (adminSlice).
 */
import * as servicesRepo from './servicesRepo';
import * as postsRepo from './postsRepo';
import * as projectsRepo from './projectsRepo';
import { createFlatRepo } from './flatRepo';

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
  projects: {
    list: projectsRepo.listProjectsForAdmin,
    get: projectsRepo.getProjectAdmin,
    create: projectsRepo.createProject,
    update: projectsRepo.updateProject,
    remove: projectsRepo.deleteProject,
  },
  // Flat config collections (1:1 rows).
  hero: createFlatRepo('hero'),
  about: createFlatRepo('about'),
  contact: createFlatRepo('contact'),
  social: createFlatRepo('social'),
  about_media: createFlatRepo('about_media'),
  company_info: createFlatRepo('company_info'),
  site_settings: createFlatRepo('site_settings'),
};

/** True if the given module/table id is backed by Firestore (not Supabase). */
export const isFirestoreModule = (tableId: string): boolean =>
  tableId in FIRESTORE_REPOS;
