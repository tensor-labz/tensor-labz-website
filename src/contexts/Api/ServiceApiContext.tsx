import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

interface ServiceDataContextType {
  service_data: any | null;
  isLoading: boolean;
  error: Error | null;
}

const ServiceDataContext = createContext<ServiceDataContextType>({
  service_data: null,
  isLoading: false,
  error: null,
});

type ServiceDataContextProviderProps = {
  children: React.ReactNode;
};

export default function ServiceDataContextProvider({ children }: ServiceDataContextProviderProps) {
  const [service_data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const contextValue = useMemo(
    () => ({
      service_data,
      isLoading,
      error,
    }),
    [service_data, isLoading, error]
  );


  return (
    <ServiceDataContext.Provider value={contextValue}>
      {children}
    </ServiceDataContext.Provider>
  );
}

export const useServiceDataContext = () => useContext(ServiceDataContext);
