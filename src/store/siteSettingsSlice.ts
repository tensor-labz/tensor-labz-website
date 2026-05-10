import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchSiteSettings,
  upsertSiteSettings,
  type SiteSettings,
} from '../services/siteSettingsService';
import type { RootState } from '../app/store';

interface SiteSettingsState {
  settings: SiteSettings;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: SiteSettingsState = {
  settings: {},
  status: 'idle',
};

export const loadSiteSettings = createAsyncThunk(
  'siteSettings/load',
  async () => fetchSiteSettings()
);

export const saveMultipleSiteSettings = createAsyncThunk(
  'siteSettings/saveMultiple',
  async (settings: SiteSettings) => {
    await upsertSiteSettings(settings);
    return settings;
  }
);

const siteSettingsSlice = createSlice({
  name: 'siteSettings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadSiteSettings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadSiteSettings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.settings = action.payload;
      })
      .addCase(loadSiteSettings.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(saveMultipleSiteSettings.fulfilled, (state, action) => {
        Object.assign(state.settings, action.payload);
      });
  },
});

export const selectSiteSettings = (state: RootState) =>
  state.siteSettings.settings;
export const selectSiteSettingsStatus = (state: RootState) =>
  state.siteSettings.status;

export default siteSettingsSlice.reducer;
