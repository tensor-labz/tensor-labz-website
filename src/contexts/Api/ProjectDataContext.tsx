import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useRootContext } from '../RootContext';

// --- Types
export interface ProjectItem {
  id: string;
  service: string;
  [key: string]: any;
}

interface ProjectDataContextType {
  rawProjects: ProjectItem[] | null;
  isLoading: boolean;
  error: Error | null;
}

// --- Context
const ProjectDataContext = createContext<ProjectDataContextType | undefined>(
  undefined
);

// --- Provider
const ProjectDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [rawProjects, setRawProjects] = useState<ProjectItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { googleSheet_URl } = useRootContext();

  useEffect(() => {
    const controller = new AbortController();

    const fetchProjects = async () => {
      if (!googleSheet_URl) {
        setError(new Error('Google Sheet URL not defined'));
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`${googleSheet_URl}ProjectData`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);

        const result = await response.json();
        setRawProjects(result?.data || []);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
    return () => controller.abort();
  }, [googleSheet_URl]);

  const contextValue = useMemo(
    () => ({ rawProjects, isLoading, error }),
    [rawProjects, isLoading, error]
  );

  return (
    <ProjectDataContext.Provider value={contextValue}>
      {children}
    </ProjectDataContext.Provider>
  );
};

export default ProjectDataProvider;
export const useProjectDataContext = () => {
  const ctx = useContext(ProjectDataContext);
  if (!ctx) throw new Error('Must be inside ProjectDataProvider');
  return ctx;
};
