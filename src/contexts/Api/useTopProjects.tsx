import { useProjectDataContext } from './ProjectDataContext';

export const useTopProjects = () => {
  const { rawProjects } = useProjectDataContext();
  if (!rawProjects) return [];
  return rawProjects.filter((item) => item.is_top);
};
