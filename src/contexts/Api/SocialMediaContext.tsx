import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { fetchSocialLinks } from '../../services/socialService';

interface SocialMediaDataContextType {
  link_data: { social_media: { social_media: string; value: string }[] } | null;
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
  const [link_data, setData] = useState<SocialMediaDataContextType['link_data']>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);
    try {
      const rows = await fetchSocialLinks(signal);
      setData({ social_media: rows });
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
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
    () => ({ link_data, isLoading, error }),
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
