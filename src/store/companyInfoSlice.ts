import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  type CompanyInfo,
  DEFAULTS,
  fetchCompanyInfo,
} from '../services/companyInfoService';
import type { RootState } from '../app/store';

interface CompanyInfoState {
  data: CompanyInfo;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CompanyInfoState = {
  data: DEFAULTS,
  status: 'idle',
  error: null,
};

export const loadCompanyInfo = createAsyncThunk(
  'companyInfo/load',
  (_, { signal }) => fetchCompanyInfo(signal)
);

const companyInfoSlice = createSlice({
  name: 'companyInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCompanyInfo.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCompanyInfo.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(loadCompanyInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load company info';
      });
  },
});

export const selectCompanyInfo = (state: RootState): CompanyInfo =>
  state.companyInfo.data;

export const selectCompanyInfoStatus = (
  state: RootState
): CompanyInfoState['status'] => state.companyInfo.status;

export default companyInfoSlice.reducer;
