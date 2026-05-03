import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  loadHeroSlides,
  nextSlide,
  prevSlide,
  setSlide,
  selectCurrentSlide,
  selectCurrentIndex,
  selectHeroSlides,
  selectHeroStatus,
} from '../../../store/heroSlice';

const SLIDE_INTERVAL_MS = 5000;

export const useHeroController = () => {
  const dispatch = useAppDispatch();
  const slides = useAppSelector(selectHeroSlides);
  const currentSlide = useAppSelector(selectCurrentSlide);
  const currentIndex = useAppSelector(selectCurrentIndex);
  const status = useAppSelector(selectHeroStatus);

  useEffect(() => {
    if (status === 'idle') dispatch(loadHeroSlides());
  }, [dispatch, status]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(
      () => dispatch(nextSlide()),
      SLIDE_INTERVAL_MS
    );
    return () => clearInterval(interval);
  }, [dispatch, slides.length]);

  return {
    slides,
    currentSlide,
    currentIndex,
    isLoading: status === 'idle' || status === 'loading',
    goNext: () => dispatch(nextSlide()),
    goPrev: () => dispatch(prevSlide()),
    goTo: (i: number) => dispatch(setSlide(i)),
  };
};
