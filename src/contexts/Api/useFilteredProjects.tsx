import { useMemo } from 'react';
import { useProjectDataContext } from './ProjectDataContext';
import { useServiceContext } from '../ServiceContext';
import { useLocation } from 'react-router-dom';

interface ProjectItem {
  id: string;
  service: string;
  [key: string]: any;
}

interface UseFilteredProjectsResult {
  filtered: ProjectItem[];
  totalItems: number;
  isLoading: boolean;
}

export const useFilteredProjects = (): UseFilteredProjectsResult => {
  const { rawProjects, isLoading } = useProjectDataContext();
  const { activeTab } = useServiceContext();
  const location = useLocation();

  const { filtered, totalItems } = useMemo(() => {
    if (!rawProjects) {
      return { filtered: [] as ProjectItem[], totalItems: 0 };
    }

    let result: ProjectItem[] = rawProjects;

    if (activeTab?.slug && activeTab.slug !== 'all') {
      result = result.filter((item) => item.service === activeTab.slug);
    }

    const totalItems = result.length;

    const urlSearchParams = new URLSearchParams(location.search);
    const page = urlSearchParams.get('page') ?? '1';
    const pageNumber = parseInt(page, 10) || 1;
    const perPage = 6;
    const start = (pageNumber - 1) * perPage;
    result = result.slice(start, start + perPage);

    return { filtered: result, totalItems };
  }, [rawProjects, activeTab?.slug, location.search]);

  return {
    filtered,
    totalItems,
    isLoading,
  };
};
