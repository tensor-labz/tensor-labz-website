import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

interface SocialMediaDataContextType {
  social_media_data: any | null;
  isLoading: boolean;
  error: Error | null;
}

const SocialMediaDataContext = createContext<SocialMediaDataContextType>({
  social_media_data: null,
  isLoading: false,
  error: null,
});

type SocialMediaDataContextProviderProps = {
  children: React.ReactNode;
};

export default function SocialMediaDataContextProvider({ children }: SocialMediaDataContextProviderProps) {
  const [social_media_data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbwdBVXLOhb25deUgMuURv4Y7OE11x6OMgsHHWVlj21sz7BHrltuOzjpcl_db2kN9pGgYg/exec?sheetName=SocialMediaData'
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result?.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      console.error('Error fetching social_media_data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const contextValue = useMemo(
    () => ({
      social_media_data,
      isLoading,
      error,
    }),
    [social_media_data, isLoading, error]
  );


  return (
    <SocialMediaDataContext.Provider value={contextValue}>
      {children}
    </SocialMediaDataContext.Provider>
  );
}

export const useSocialMediaDataContext = () => useContext(SocialMediaDataContext);
