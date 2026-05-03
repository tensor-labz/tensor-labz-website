import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContactData, ContactItem } from '../services/contactService';
import type { RootState } from '../app/store';

interface ContactState {
  data: ContactItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ContactState = { data: [], status: 'idle', error: null };

export const loadContactData = createAsyncThunk(
  'contact/load',
  (_: void, { signal }) => fetchContactData(signal)
);

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadContactData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadContactData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(loadContactData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load contact data';
      });
  },
});

export default contactSlice.reducer;

export const selectContactData = (state: RootState) => state.contact.data;
export const selectContactStatus = (state: RootState) => state.contact.status;
