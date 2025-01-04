import { home } from "../data/page_data";
import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

// Reducer function to handle next and previous slide actions
const sliderReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'NEXT':
      return { ...state, currentSlide: (state.currentSlide + 1) % home.hero.slider.length };
    case 'PREV':
      return { ...state, currentSlide: (state.currentSlide - 1 + home.hero.slider.length) % home.hero.slider.length };
    default:
      return state;
  }
};

// Creating the HeroContext
const HeroContext = createContext<any>(null);

type HeroContextProviderProps = {
  children: React.ReactNode;
  delay: number;
};

// HeroContextProvider component that provides the context to its children
export default function HeroContextProvider({ children, delay }: HeroContextProviderProps) {
  // useReducer to manage the current slide
  const [state, dispatch] = useReducer(sliderReducer, { currentSlide: 0 });

  // Memoize the slider data based on the current slide
  const slider = useMemo(() => home.hero.slider[state.currentSlide], [state.currentSlide]);

  // UseEffect to automatically change slides at the specified delay
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'NEXT' }); // Change to the next slide
    }, delay);
    return () => clearInterval(interval); // Clear interval on cleanup
  }, [state.currentSlide, delay]); // Dependency on currentSlide and delay

  return (
    <HeroContext.Provider value={{ currentSlide: state.currentSlide, setCurrentSlide: dispatch, slider }}>
      {children}
    </HeroContext.Provider>
  );
}

// Custom hook to use HeroContext in other components
export const useHeroContext = () => useContext(HeroContext);
