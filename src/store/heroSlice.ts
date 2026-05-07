import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchHeroSlides, HeroSlide } from '../services/heroService';
import type { RootState } from '../app/store';

interface HeroState {
  slides: HeroSlide[];
  currentIndex: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: HeroState = {
  slides: [],
  currentIndex: 0,
  status: 'idle',
  error: null,
};

export const loadHeroSlides = createAsyncThunk(
  'hero/loadSlides',
  (_: void, { signal }) => fetchHeroSlides(signal)
);

const normalise = (value: number, length: number) =>
  length > 0 ? ((value % length) + length) % length : 0;

export const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    nextSlide(state) {
      state.currentIndex = normalise(
        state.currentIndex + 1,
        state.slides.length
      );
    },
    prevSlide(state) {
      state.currentIndex = normalise(
        state.currentIndex - 1,
        state.slides.length
      );
    },
    setSlide(state, action: PayloadAction<number>) {
      state.currentIndex = normalise(action.payload, state.slides.length);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadHeroSlides.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadHeroSlides.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.slides = action.payload;
        state.currentIndex = 0;
      })
      .addCase(loadHeroSlides.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load hero slides';
      });
  },
});

export const { nextSlide, prevSlide, setSlide } = heroSlice.actions;
export default heroSlice.reducer;

export const selectHeroSlides = (state: RootState) => state.hero.slides;
export const selectCurrentSlide = (state: RootState) =>
  state.hero.slides[state.hero.currentIndex] ?? null;
export const selectCurrentIndex = (state: RootState) => state.hero.currentIndex;
export const selectHeroStatus = (state: RootState) => state.hero.status;
