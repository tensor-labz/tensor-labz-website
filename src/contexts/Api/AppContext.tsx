import { createContext, useContext, useEffect, useState, useCallback } from "react";
import ServiceDataContextProvider from "./ServiceApiContext";
import SocialMediaDataContextProvider from "./SocialMediaContext";
import ProjectDataContextProvider from "./ProjectDataContext";
import HeroContextProvider from "../HeroContext";
import AboutusCont from "./AboutusDataContext";
import {useRootContext} from "../RootContext";

// Define proper types for context
interface AppContextType {
  data: any | null;
  isLoading: boolean;
  error: Error | null;
  refreshData: () => void;
}

// Creating the AppContext with default values
const AppContext = createContext<AppContextType>({
  data: null,
  isLoading: false,
  error: null,
  refreshData: () => {}
});

type AppContextProviderProps = {
  children: React.ReactNode;
};

// Debounce function
const debounce = (fn: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

// AppContextProvider component that provides the context to its children
export default function AppContextProvider({ children }: AppContextProviderProps) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const {googleSheet_URl}=useRootContext();
  // Define fetchData function outside useEffect
  const fetchData = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${googleSheet_URl}ContactData`,
        { signal }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result?.data);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create debounced version of fetchData
  const debouncedFetchData = useCallback(
    debounce((signal?: AbortSignal) => {
      fetchData(signal);
    }, 500),
    [fetchData]
  );

  // Initial data fetch (no debounce — fires once on mount)
  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  // Function to manually refresh data if needed
  const refreshData = useCallback(() => {
    debouncedFetchData();
  }, [debouncedFetchData]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = {
    data,
    isLoading,
    error,
    refreshData
  };

  return (
    <AppContext.Provider value={contextValue}>
      <AboutusCont>
      <ServiceDataContextProvider>
        <ProjectDataContextProvider>
          <SocialMediaDataContextProvider>
            <HeroContextProvider delay={5000}>
            {children}
            </HeroContextProvider>
          </SocialMediaDataContextProvider>
          </ProjectDataContextProvider>
        </ServiceDataContextProvider>
        </AboutusCont>
    </AppContext.Provider>
  );
}

// Custom hook to use AppContext in other components
export const useAppContext = () => useContext(AppContext);