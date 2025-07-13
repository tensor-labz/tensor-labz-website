import { useRootContext } from "../RootContext";
import { createContext, useContext, useEffect, useState, useRef, useMemo } from "react";
import { useServiceContext } from "../ServiceContext";

// Define proper types for project data
interface ProjectItem {
  id: string;
  service: string;
  is_top?: boolean;
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
  const [topData, setTopData] = useState<ProjectItem[] | null>(null);
  const [rawData, setRawData] = useState<ProjectItem[] | null>(null);

  const { googleSheet_URl } = useRootContext();
  const { activeTab } = useServiceContext();

  // Use refs to track URL parameters for comparison
  const urlParamsRef = useRef<string>("");
  const slugRef = useRef<string | undefined>(activeTab.slug);

  // Function to get current URL parameters
  const getCurrentUrlParams = () => {
    if (typeof window !== 'undefined') {
      return window.location.search;
    }
    return '';
  };

  // Function to filter and paginate data
  const filterAndPaginateData = (data: ProjectItem[], slug?: string, urlParams?: string) => {
    let filteredData = [...data];

    // Filter by service if slug is not "all" or undefined
    if (slug && slug !== "all") {
      filteredData = data.filter((item) => item.service === slug);
    }

    // Handle pagination using URL parameters
    if (urlParams) {
      const urlSearchParams = new URLSearchParams(urlParams);
      const page = urlSearchParams.get("page");

      if (page) {
        const pageNumber = parseInt(page, 10);
        const itemsPerPage = 6;
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        filteredData = filteredData.slice(startIndex, endIndex);
      }
    }

    return filteredData;
  };

  // Fetch data from API
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

      // Store raw data for future filtering
      setRawData(data);

      // Set top data (this doesn't change with filtering)
      setTopData(data.filter((item) => item.is_top === true));

      // Get current URL parameters and active slug
      const currentUrlParams = getCurrentUrlParams();
      const currentSlug = activeTab.slug;

      // Filter and paginate data
      const filteredData = filterAndPaginateData(data, currentSlug, currentUrlParams);
      setProjectData(filteredData);

      // Update refs
      urlParamsRef.current = currentUrlParams;
      slugRef.current = currentSlug;

    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      console.error('Error fetching project data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to handle initial data fetch
  useEffect(() => {
    fetchData();
  }, [googleSheet_URl]); // Only fetch when URL changes

  // Effect to handle slug changes and URL parameter changes
  useEffect(() => {
    if (!rawData) return; // Don't process if we don't have raw data yet

    const currentUrlParams = getCurrentUrlParams();
    const currentSlug = activeTab.slug;

    // Check if we need to re-filter data
    const shouldRefilter =
      currentUrlParams !== urlParamsRef.current ||
      currentSlug !== slugRef.current;

    if (shouldRefilter) {
      // Update refs
      urlParamsRef.current = currentUrlParams;
      slugRef.current = currentSlug;

      // Re-filter and paginate data
      const filteredData = filterAndPaginateData(rawData, currentSlug, currentUrlParams);
      setProjectData(filteredData);
    }
  }, [activeTab.slug, rawData]); // Re-run when slug or rawData changes

  // Effect to handle URL changes (back/forward navigation)
  useEffect(() => {
    const handleUrlChange = () => {
      if (!rawData) return;

      const newUrlParams = getCurrentUrlParams();
      if (newUrlParams !== urlParamsRef.current) {
        urlParamsRef.current = newUrlParams;

        // Re-filter data with new URL parameters
        const filteredData = filterAndPaginateData(rawData, activeTab.slug, newUrlParams);
        setProjectData(filteredData);
      }
    };

    window.addEventListener('popstate', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, [rawData, activeTab.slug]);

  const contextValue = useMemo(
    () => ({
      projectData,
      isLoading,
      error,
      topData
    }),
    [projectData, isLoading, error, topData]
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