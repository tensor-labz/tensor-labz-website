import { supabase } from '../lib/supabase';
import type { ProjectItem } from '../shared/types/project';

export const fetchProjects = async (
  signal?: AbortSignal
): Promise<ProjectItem[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('id')
    .abortSignal(signal!);
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    imageURL: row.imageurl ?? row.imageURL ?? '',
    description: row.description,
    service: row.service,
    is_top: row.is_top ?? false,
    content: row.content,
    vedio_demo: row.vedio_demo,
    tags: Array.isArray(row.tags)
      ? row.tags
      : typeof row.tags === 'string' && row.tags
        ? row.tags
            .split(',')
            .map((t: string) => t.trim())
            .filter(Boolean)
        : [],
    extraImages: Array.isArray(row.extraimages)
      ? row.extraimages
      : Array.isArray(row.extraImages)
        ? row.extraImages
        : [],
  })) as ProjectItem[];
};
