import { fetchSheet } from './sheetsClient';
import type { ProjectItem } from '../shared/types/project';

export const fetchProjects = (signal?: AbortSignal): Promise<ProjectItem[]> =>
  fetchSheet<ProjectItem>('ProjectData', signal);
