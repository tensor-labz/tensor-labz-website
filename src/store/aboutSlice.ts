import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAboutData, AboutItem } from '../services/aboutService';
import type { RootState } from '../app/store';

interface AboutState {
  data: AboutItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AboutState = { data: [], status: 'idle', error: null };

export const loadAboutData = createAsyncThunk(
  'about/load',
  (_: void, { signal }) => fetchAboutData(signal)
);

export const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAboutData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadAboutData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(loadAboutData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load about data';
      });
  },
});

export default aboutSlice.reducer;

export const selectAboutData = (state: RootState) => state.about.data;
export const selectAboutStatus = (state: RootState) => state.about.status;
