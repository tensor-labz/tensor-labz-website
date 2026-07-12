import type { ProjectItem } from '../shared/types/project';
import { listProjectsPublic } from './firebase/projectsRepo';

export const fetchProjects = async (
  _signal?: AbortSignal
): Promise<ProjectItem[]> => {
  void _signal; // Firestore one-shot read; AbortSignal not applicable
  return listProjectsPublic();
};
