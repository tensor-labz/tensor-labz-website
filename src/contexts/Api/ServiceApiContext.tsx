import { createContext, useContext, useEffect, useState, useCallback } from "react";

// Define proper types for context
interface ServiceDataContextType {
  service_data: any | null;
  isLoading: boolean;
  error: Error | null;
  refreshData: () => void;
}

// Creating the ServiceDataContext with default values
const ServiceDataContext = createContext<ServiceDataContextType>({
  service_data: null,
  isLoading: false,
  error: null,
  refreshData: () => {}
});

type ServiceDataContextProviderProps = {
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

// ServiceDataContextProvider component that provides the context to its children
export default function ServiceDataContextProvider({ children }: ServiceDataContextProviderProps) {
  const [service_data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Define fetchData function outside useEffect
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbz0BNE5xIcE5A23-oLYh0f0r2uut3tqNd2zmG4kSZcZpd_KZnMqiUYVyrVatnErEZb4mw/exec?sheetName=ServiceData'
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result?.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      console.error('Error fetching service_data:', err);
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

  // Initial service_data fetch
  useEffect(() => {
    debouncedFetchData();
  }, [debouncedFetchData]);

  // Function to manually refresh service_data if needed
  const refreshData = useCallback(() => {
    debouncedFetchData();
  }, [debouncedFetchData]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = {
    service_data,
    isLoading,
    error,
    refreshData
  };

  return (
    <ServiceDataContext.Provider value={contextValue}>
      {children}
    </ServiceDataContext.Provider>
  );
}

// Custom hook to use ServiceDataContext in other components
export const useServiceDataContext = () => useContext(ServiceDataContext);