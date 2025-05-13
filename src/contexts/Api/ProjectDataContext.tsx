import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

interface ProjectDataContextType {
  project_data: any | null;
  isLoading: boolean;
  error: Error | null;
}

const ProjectDataContext = createContext<ProjectDataContextType>({
  project_data: null,
  isLoading: false,
  error: null,
});

type ProjectDataContextProviderProps = {
  children: React.ReactNode;
};

export default function ProjectDataContextProvider({ children }: ProjectDataContextProviderProps) {
  const [project_data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbwdBVXLOhb25deUgMuURv4Y7OE11x6OMgsHHWVlj21sz7BHrltuOzjpcl_db2kN9pGgYg/exec?sheetName=ProjectData'
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result?.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      console.error('Error fetching project_data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const contextValue = useMemo(
    () => ({
      project_data,
      isLoading,
      error,
    }),
    [project_data, isLoading, error]
  );


  return (
    <ProjectDataContext.Provider value={contextValue}>
      {children}
    </ProjectDataContext.Provider>
  );
}

export const useProjectDataContext = () => useContext(ProjectDataContext);
