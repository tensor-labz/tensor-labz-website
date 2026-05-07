import { useRootContext } from '../RootContext';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';

interface SocialMediaDataContextType {
  link_data: any | null;
  isLoading: boolean;
  error: Error | null;
}

const SocialMediaDataContext = createContext<SocialMediaDataContextType>({
  link_data: null,
  isLoading: false,
  error: null,
});

type SocialMediaDataContextProviderProps = {
  children: React.ReactNode;
};

export default function SocialMediaDataContextProvider({
  children,
}: SocialMediaDataContextProviderProps) {
  const [link_data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { googleSheet_URl } = useRootContext();
  const fetchData = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${googleSheet_URl}LinkData`, { signal });

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
      console.error('Error fetching link_data:', err);
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
      link_data,
      isLoading,
      error,
    }),
    [link_data, isLoading, error]
  );

  return (
    <SocialMediaDataContext.Provider value={contextValue}>
      {children}
    </SocialMediaDataContext.Provider>
  );
}

export const useSocialMediaDataContext = () =>
  useContext(SocialMediaDataContext);
