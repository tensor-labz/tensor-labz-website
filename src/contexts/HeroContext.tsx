import {
  createContext,
  useContext,
  useEffect,
  useState,
  useReducer,
} from 'react';
import { useRootContext } from './RootContext';
// Define proper types
interface SliderState {
  currentSlide: number;
}

type SliderAction =
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'SET'; payload: number };

interface HeroContextType {
  currentSlide: number;
  setCurrentSlide: React.Dispatch<SliderAction>;
  slider: any;
  isLoading: boolean;
  error: Error | null;
}

// Normalise a slide index to the valid range [0, length)
const normalise = (value: number, length: number): number =>
  length > 0 ? ((value % length) + length) % length : 0;

// Reducer function to handle slider navigation actions
const sliderReducer = (
  state: SliderState,
  action: SliderAction & { length?: number }
): SliderState => {
  const length = action.length ?? 0;
  switch (action.type) {
    case 'NEXT':
      return {
        ...state,
        currentSlide: normalise(state.currentSlide + 1, length),
      };
    case 'PREV':
      return {
        ...state,
        currentSlide: normalise(state.currentSlide - 1, length),
      };
    case 'SET':
      return {
        ...state,
        currentSlide: normalise(action.payload, length),
      };
    default:
      return state;
  }
};

// Creating the HeroContext with default values
const HeroContext = createContext<HeroContextType>({
  currentSlide: 0,
  setCurrentSlide: () => {},
  slider: null,
  isLoading: false,
  error: null,
});

type HeroContextProviderProps = {
  children: React.ReactNode;
  delay?: number; // Make delay optional with a default value
};

// HeroContextProvider component
export default function HeroContextProvider({
  children,
  delay = 5000, // Default delay of 5 seconds if not provided
}: HeroContextProviderProps) {
  // State for fetched data
  const [sliderData, setSliderData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { googleSheet_URl } = useRootContext();
  // useReducer to manage the current slide
  const [state, dispatch] = useReducer(sliderReducer, { currentSlide: 0 });

  // Wrapper that automatically injects the current slide count so the reducer
  // can normalise in-place without a secondary effect.
  const dispatchWithLength = (action: SliderAction) => {
    dispatch({ ...action, length: sliderData.length } as SliderAction & {
      length: number;
    });
  };

  // Fetch slider data
  useEffect(() => {
    const fetchSliderData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${googleSheet_URl}HeroData`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        if (result?.data && Array.isArray(result.data)) {
          setSliderData(result.data);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('An unknown error occurred')
        );
        console.error('Error fetching slider data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSliderData();
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (sliderData.length <= 1) return; // Don't autoplay if we have 0 or 1 slides

    const interval = setInterval(() => {
      dispatchWithLength({ type: 'NEXT' });
    }, delay);

    return () => clearInterval(interval);
  }, [delay, sliderData.length]);

  // Get the current slide data
  const currentSliderItem =
    sliderData.length > 0 && state.currentSlide < sliderData.length
      ? sliderData[state.currentSlide]
      : null;

  // Context value
  const contextValue: HeroContextType = {
    currentSlide: state.currentSlide,
    setCurrentSlide: dispatchWithLength,
    slider: currentSliderItem,
    isLoading,
    error,
  };

  return (
    <HeroContext.Provider value={contextValue}>{children}</HeroContext.Provider>
  );
}

// Custom hook to use HeroContext in other components
export const useHeroContext = () => useContext(HeroContext);
