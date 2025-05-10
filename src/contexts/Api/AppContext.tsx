import { createContext, useContext, useEffect, useState, useCallback } from "react";

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

  // Define fetchData function outside useEffect
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbxvsfZvJNDHQbm2piBoqD863Hpo5v65SzUrnjfvjxH852iH1RFw4j0-YsHiaIWLo-Txyg/exec?sheetName=AppData'
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result?.data[0]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create debounced version of fetchData
  const debouncedFetchData = useCallback(
    debounce(() => {
      fetchData();
    }, 500),
    [fetchData]
  );

  // Initial data fetch
  useEffect(() => {
    debouncedFetchData();
  }, [debouncedFetchData]);

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
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use AppContext in other components
export const useAppContext = () => useContext(AppContext);