import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { fetchServices } from '../services/servicesService';
import type { ServiceCardProps } from '../shared/types/service';
import type { RootState } from '../app/store';

interface ServicesState {
  items: ServiceCardProps[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ServicesState = {
  items: [],
  status: 'idle',
  error: null,
};

export const loadServices = createAsyncThunk(
  'services/load',
  (_: void, { signal }) => fetchServices(signal)
);

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadServices.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load services';
      });
  },
});

export default servicesSlice.reducer;

export const selectServices = (state: RootState) => state.services.items;
export const selectServicesStatus = (state: RootState) => state.services.status;
export const selectHomeServices = createSelector(selectServices, (items) =>
  items.filter((s) => s.show_in_home === 'true' || s.show_in_home === '1')
);
