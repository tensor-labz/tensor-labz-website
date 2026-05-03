import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { useRootContext } from '../RootContext';
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

export default function ServiceDataContextProvider({
  children,
}: ServiceDataContextProviderProps) {
  const [service_data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { googleSheet_URl } = useRootContext();
  const fetchData = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${googleSheet_URl}ServiceData`, { signal });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result?.data);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(
        err instanceof Error ? err : new Error('An unknown error occurred')
      );
      console.error('Error fetching service_data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
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
