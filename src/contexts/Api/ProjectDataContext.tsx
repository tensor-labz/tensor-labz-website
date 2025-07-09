
import { useRootContext } from "../RootContext";
import { createContext, useContext, useEffect, useState, useRef, useMemo } from "react";
import { useServiceContext } from "../ServiceContext";

// Define proper types for project data
interface ProjectItem {
  id: string;
  service: string;
  // Add other properties that exist in your project data
  [key: string]: any;
}

interface ProjectDataContextType {
  projectData: ProjectItem[] | null;
  isLoading: boolean;
  error: Error | null;
  topData: ProjectItem[] | null;
}

const ProjectDataContext = createContext<ProjectDataContextType>({
  projectData: null,
  isLoading: false,
  error: null,
  topData: null,
});

interface ProjectDataContextProviderProps {
  children: React.ReactNode;
}

export default function ProjectDataContextProvider({ children }: ProjectDataContextProviderProps) {
  const [projectData, setProjectData] = useState<ProjectItem[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [topData,setTopData]=useState<ProjectItem[] | null>(null)

  const { googleSheet_URl } = useRootContext();
  const { activeTab }= useServiceContext();
  // Use refs to track URL parameters for comparison
  const urlParamsRef = useRef<string>("");
  const slugRef = useRef<string | undefined>(activeTab.slug);

  // Single useEffect to handle all data fetching scenarios
  useEffect(() => {
    // Get current URL search params
    const currentUrlParams = window.location.search;
    const currentSlug = activeTab.slug;

    // Check if we need to fetch new data
    const shouldFetch =
      !projectData ||
      currentUrlParams !== urlParamsRef.current ||
      currentSlug !== slugRef.current;

    if (shouldFetch) {
      // Update refs
      urlParamsRef.current = currentUrlParams;
      slugRef.current = currentSlug;

      const fetchData = async () => {
        if (!googleSheet_URl) {
          setError(new Error("Google Sheet URL is not defined"));
          return;
        }

        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch(`${googleSheet_URl}ProjectData`);

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const result = await response.json();
          const data: ProjectItem[] = result?.data || [];
          setTopData(data.filter((item) => item.is_top === true))
          // Filter by service if slug is not "all"
          let filteredData = data;
          if (currentSlug && currentSlug !== "all") {
            filteredData = data.filter((item) => item.service === currentSlug);
          }

          // Handle pagination using window.location.search
          const urlSearchParams = new URLSearchParams(currentUrlParams);
          const page = urlSearchParams.get("page");

          if (page) {
            const pageNumber = parseInt(page, 10);
            const itemsPerPage = 9;
            const startIndex = (pageNumber - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            filteredData = filteredData.slice(startIndex, endIndex);
          }
          setProjectData(filteredData);
        } catch (err) {
          setError(err instanceof Error ? err : new Error('An unknown error occurred'));
          console.error('Error fetching project data:', err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }

    // Set up listener for URL changes (back/forward navigation)
    const handleUrlChange = () => {
      const newUrlParams = window.location.search;
      if (newUrlParams !== urlParamsRef.current) {
        urlParamsRef.current = newUrlParams;

        // Don't need to call fetchData() here - we'll rely on React's
        // re-render after state change to trigger the effect again
        // This ensures we're not fetching twice unnecessarily
        setProjectData(null); // Force a re-fetch
      }
    };

    window.addEventListener('popstate', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, [ activeTab, projectData]);

  const contextValue = useMemo(
    () => ({
      projectData,
      isLoading,
      error,
      topData
    }),
    [projectData, isLoading, error,topData]
  );

  return (
    <ProjectDataContext.Provider value={contextValue}>
      {children}
    </ProjectDataContext.Provider>
  );
}

export const useProjectDataContext = () => {
  const context = useContext(ProjectDataContext);

  if (!context) {
    throw new Error('useProjectDataContext must be used within a ProjectDataContextProvider');
  }

  return context;
};